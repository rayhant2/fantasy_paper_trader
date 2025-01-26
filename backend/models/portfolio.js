import { getCollection } from "../utils/mongoDBUtil.js";
import { stockHolding, cryptoHolding } from "./holdings.js";

class Portfolio {
    constructor(
        portfolioId,
        userId,
        name,
        stocks,
        cryptos,
        cash,
        transactions = [],
        usedIn = []
    ) {
        this.portfolioId = portfolioId;
        this.userId = userId;
        this.name = name;
        this.stocks = stocks;
        this.cryptos = cryptos;
        this.cash = cash;
        this.transactions = transactions;
        this.usedIn = usedIn;
    }

    async getPortfolioValue() {
        let totalValue = 0;

        for (const stock in this.stocks) {
            const currentPrice = await db.StockPrice.findOne({
                symbol: stock.symbol,
            });
            if (!currentPrice) {
                console.error(`Stock price not found for ${stock.symbol}`);
                continue;
            }

            totalValue += stock.quantity * currentPrice;
        }

        for (const crypto in this.cryptos) {
            const currentPrice = await db.StockPrice.findOne({
                symbol: crypto.symbol,
            });
            if (!currentPrice) {
                console.error(`Exchange rate not found for ${crypto.symbol}`);
                continue;
            }

            totalValue += crypto.quantity * currentPrice;
        }
        return totalValue + this.cash;
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

    addTransaction(type, symbol, shares) {
        const remainingShares =
            this.stocks.find((stock) => stock.symbol === symbol)?.quantity || 0;
        this.transactions.push({
            type,
            symbol,
            shares,
            remainingShares,
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
