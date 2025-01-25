import React from "react";
import Navbar from "../components/Navbar";
import PreviewStocks from "../components/StockPreview";
import PreviewCrypto from "../components/CryptoPreview";

const StockPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <h1>Stock Page</h1>

        <div className="flex flex-row gap-x-6 w-screen p-10">
          <div className="bg-red-50 w-full">
            <h4>Stocks</h4>
            <PreviewStocks/>
          </div>
          <div className="bg-red-50 w-full">
            <h4>Crypto</h4>

            <PreviewCrypto/>
            </div>

        </div>
      </div>
    </>
  );
};

export default StockPage;
