import { getCollection } from "../utils/mongoDBUtil.js";
import { stockHolding, cryptoHolding } from "./holdings.js";
import { getCurrentPrice } from "../routes/stocks.js";

class Portfolio {
    constructor(
        portfolioId,
        userId,
        name,
        stocks,
        cryptos,
        initialFunding,
        transactions = [],
        usedIn = [],
        netWorth = initialFunding
    ) {
        this.portfolioId = portfolioId;
        this.userId = userId;
        this.name = name;
        this.stocks = stocks;
        this.cryptos = cryptos;
        this.initialFunding = initialFunding; // Initial funding amount
        this.transactions = transactions;
        this.usedIn = usedIn;
        this.netWorth = netWorth;
    }

    async getPortfolioValue() {
        let totalValue = 0;

        for (const stock of this.stocks) {
            const currentPrice = await getCurrentPrice(stock.symbol);
            totalValue += stock.quantity * currentPrice;
        }

        for (const crypto of this.cryptos) {
            const currentPrice = await getCurrentPrice(crypto.symbol);
            totalValue += crypto.quantity * currentPrice;
        }
        return totalValue + this.initialFunding;
    }

    async updateNetWorth() {
        this.netWorth = await this.getPortfolioValue();
    }

    isStockInPortfolio(symbol) {
        for (const stock of this.stocks) {
            if (stock.symbol == symbol) {
                return true;
            }
        }
        return false;
    }

    isCryptoInPortfolio(symbol) {
        for (const crypto of this.cryptos) {
            console.log(crypto);
            if (crypto.symbol == symbol) {
                return true;
            }
        }
        return false;
    }

    addStockHolding(symbol, quantity) {
        if (this.isStockInPortfolio(symbol)) {
            this.stocks = this.stocks.map((stock) => {
                if (stock.symbol === symbol) {
                    return new stockHolding(
                        stock.symbol,
                        stock.quantity + quantity
                    );
                }
                return stock;
            });
        } else {
            this.stocks.push(new stockHolding(symbol, quantity));
        }
    }

    async removeStockHolding(symbol, quantity) {
        this.stocks = this.stocks
            .map((stock) => {
                if (stock.symbol === symbol) {
                    return new stockHolding(
                        stock.symbol,
                        stock.quantity - quantity
                    );
                }
                return stock;
            })
            .filter((stock) => stock.quantity > 0);
    }

    async addCryptoHolding(symbol, quantity) {
        if (this.isCryptoInPortfolio(symbol)) {
            this.cryptos = this.cryptos.map((crypto) => {
                if (crypto.symbol === symbol) {
                    return new cryptoHolding(
                        crypto.symbol,
                        crypto.quantity + quantity
                    );
                }
                return crypto;
            });
        } else {
            this.cryptos.push(new cryptoHolding(symbol, quantity));
        }
    }

    addTransaction(type, symbol, shares, price) {
        const remainingShares =
            this.stocks.find((stock) => stock.symbol === symbol)?.quantity || 0;
        this.transactions.push({
            type,
            symbol,
            shares,
            price,
            remainingShares,
            netWorth: this.netWorth,
            date: new Date().getTime(),
        });
    }

    canSellStock(symbol, shares) {
        const stock = this.stocks.find((stock) => stock.symbol === symbol);
        return stock && stock.quantity >= shares;
    }

    async save() {
        const collection = getCollection("portfolios");
        await collection.updateOne(
            { portfolioId: this.portfolioId },
            { $set: this },
            { upsert: true }
        );
    }

    static async findById(portfolioId) {
        const collection = getCollection("portfolios");
        return await collection.findOne({ portfolioId });
    }

    static async deleteById(portfolioId) {
        const collection = getCollection("portfolios");
        await collection.deleteOne({ portfolioId });
    }
}

export default Portfolio;
