//const db = require("./"); TODO: Link database in models directory in backend
import { stockHolding, cryptoHolding } from "./holdings.js";

class Portfolio {
  constructor(portfolioId, userId, stocks, cryptos) {
    this.portfolioId = portfolioId;
    this.userId = userId;
    this.stocks = stocks;
    this.cryptos = cryptos;
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
    return totalValue;
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
          return new stockHolding(stock.symbol, stock.quantity + quantity);
        }
        return stock;
      });
    } else {
      this.stocks.push(new stockHolding(symbol, quantity));
    }
  }

  addCryptoHolding(symbol, quantity) {
    if (this.isCryptoInPortfolio(symbol)) {
      this.cryptos = this.cryptos.map((crypto) => {
        if (crypto.symbol === symbol) {
          return new cryptoHolding(crypto.symbol, crypto.quantity + quantity);
        }
        return crypto;
      });
    } else {
      this.cryptos.push(new cryptoHolding(symbol, quantity));
    }
  }
}

export default Portfolio;
