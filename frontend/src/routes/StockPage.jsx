import { React, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PreviewStocks from "../components/StockPreview";
import { stocks } from "../data/stocks";
import { cryptos } from "../data/cryptos";

function StockPage() {
    const [data, setData] = useState([]);
    const [stockList, setStockList] = useState(stocks);

    useEffect(() => {
        // query backend for stock lists
        setData({
            stocks: stocks,
            cryptos: cryptos,
        });
    }, []);

    const setStocks = (stocksName) => {
        if (data && data[stocksName]) {
            setStockList(data[stocksName]);
            return;
        }
        console.error("Stocks not found");
    };

    return (
        <>
            <div>
                <Navbar />
                <h1>Stock Page</h1>
                <div className="flex justify-start">
                    <button
                        onClick={() => setStocks("stocks")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Stocks
                    </button>
                    <button
                        onClick={() => setStocks("cryptos")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cryptos
                    </button>
                </div>
                <div className="flex flex-row justify-center gap-x-6 w-screen h-[50%] px-12">
                    <div className="w-[100%]">
                        <PreviewStocks dataSet={stockList} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default StockPage;
