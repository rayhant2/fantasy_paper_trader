import React, { useState } from "react";
import Navbar from "../components/Navbar";
import StockInfo from "../components/StockInfo";

const PortfolioPage = () => {
  const [name, setName] = useState("Tahseen");
  const [balance, setBalance] = useState(120000);
  const [balanceMonthStart, setBalanceMonthStart] = useState(3000);
  const [timeInterval, setTimeInterval] = useState("month");

  const [strongest, setStrongest] = useState("NVDA");
  const [strongestStart, setStrongestStart] = useState(20);
  const [strongestEnd, setStrongestEnd] = useState(50);

  const [weakest, setWeakest] = useState("TSLA");
  const [weakestStart, setWeakestStart] = useState(100);
  const [weakestEnd, setWeakestEnd] = useState(0);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState(""); // State to store the ticker

  const calculateReturn = (start, end) => {
    const percentReturn = ((end - start) / start) * 100;
    if (percentReturn > 0) {
      return (
        <p className="flex flex-row ml-1 mr-2 text-green-700">
          ▲ {percentReturn.toFixed(2)}%
        </p>
      );
    } else {
      return (
        <p className="flex flex-row ml-1 text-red-600">
          ▼ {percentReturn.toFixed(2)}%
        </p>
      );
    }
  };

  const handleOpenDialog = (ticker) => {
    setSelectedTicker(ticker); // Set the selected ticker
    setIsDialogOpen(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <p className="text-left text-3xl mt-7 mx-8 text-[#000000]">
        Hello, {name}.
      </p>

      <div className="flex flex-row w-screen h-screen p-3">
        <div className="flex flex-col gap-5 my-5 ml-5 w-1/2">
          <div className="text-[#000000] bg-[#fcd46a30] hover:shadow-md rounded-2xl p-4 flex-[0.2] transition-shadow duration-300 ease-in-out text-left items-center">
            <p className="text-s ml-2">Balance</p>
            <div className="flex flex-row gap-2 ml-2 items-center">
              <div className="flex flex-row items-end gap-2">
                <p className="text-[23px]">$</p>
                <p className="font-bold text-3xl">
                  {balance.toLocaleString()}
                </p>
              </div>
              <p className="ml-0.5 flex flex-row items-center">
                ({calculateReturn(balanceMonthStart, balance)} last{" "}
                {timeInterval})
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <div
              onClick={() => handleOpenDialog(strongest)}
              className="bg-[#fcd46a30] text-[#000000] hover:shadow-md rounded-2xl p-5 flex-1 transition-shadow duration-300 ease-in-out text-left cursor-pointer"
            >
              <p className="text-s">Strongest Performer</p>
              <div className="flex flex-row items-center gap-2">
                <p className="font-bold text-3xl">{strongest}</p>
                <p>{calculateReturn(strongestStart, strongestEnd)}</p>
              </div>
            </div>

            <div onClick={() => handleOpenDialog(weakest)}
              className="bg-[#fcd46a30] text-[#000000] hover:shadow-md rounded-2xl p-5 flex-1 transition-shadow duration-300 ease-in-out text-left">
              <p className="text-s">Weakest Performer</p>
              <div className="flex flex-row items-center gap-2">
                <p className="font-bold text-3xl">{weakest}</p>
                <p>{calculateReturn(weakestStart, weakestEnd)}</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="shadow-[inset_0_0_3px_5px_#F0F0F0] rounded-2xl p-3 flex-[0.8] text-left ">
            <p className="text-s font-medium ml-2 mt-2 mb-4 text-[#000000]">
              Recent transactions:
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#fcd46a30] hover:shadow-md rounded-2xl m-5 w-1/2 flex items-center justify-center transition-shadow duration-300 ease-in-out">
          <h1 className="text-[#000000]">Graph Goes Here</h1>
        </div>
      </div>

      {/* Stock Info Dialog */}
      <StockInfo
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        ticker={selectedTicker} // Pass the selected ticker to the dialog
      />
    </div>
  );
};

export default PortfolioPage;
