import React from "react";
import Navbar from "../components/Navbar";

const PortfolioPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <p className="text-left text-3xl mt-7 mx-5">Hello, Tahseen.</p>

      <div className="flex flex-row w-screen h-screen">
  {/* Left Section */}
  <div className="flex flex-col gap-5 my-5 ml-5 w-1/2">
    <div className="text-[#000000] bg-[#fcd46a] hover:shadow-md rounded-2xl p-4 flex-[0.25] transition-shadow duration-300 ease-in-out text-left items-center">
      <p className="text-s ml-2">Balance</p>
      <div className="flex flex-row gap-2 ml-2 items-center">
        <div className="flex flex-row items-end gap-2">
            <p className="text-[23px]">$</p>
            <p className="font-bold text-3xl">120,600</p>
        </div>
        <p className="ml-0.5">(▲  130%)</p>
      </div>
      
    </div>

    {/* Best/Worst Performing Stock */}
    <div className="flex flex-row gap-6">
      <div className="bg-[#fcd46a] text-[#000000] hover:shadow-md rounded-2xl p-5 flex-1 transition-shadow duration-300 ease-in-out text-left">
        <p className="text-s">Strongest Performer</p>
        <div className="flex flex-row items-center gap-2">
            <p className="font-bold text-3xl">NVDA</p>
            <p>(▲  12%)</p>

        </div>
      </div>

      <div className="bg-[#fcd46a] text-[#000000] hover:shadow-md rounded-2xl p-5 flex-1 transition-shadow duration-300 ease-in-out text-left">
        <p className="text-s">Weakest Performer</p>
        <div className="flex flex-row items-center gap-2">
            <p className="font-bold text-3xl">TSLA</p>
            <p>(▼  20%)</p>

        </div>
      </div>
    </div>

    {/* Recent Transactions */}
    <div className="shadow-[inset_0_0_3px_5px_#F0F0F0] rounded-2xl p-3 flex-[0.75] text-left">
      <p className="text-s font-medium ml-2 mt-2 mb-4 text-[#000000]">Recent transactions:</p>
    </div>
  </div>

  {/* Right Section */}
  <div className="bg-[#fcd46a] hover:shadow-lg rounded-2xl m-5 w-1/2 flex items-center justify-center transition-shadow duration-300 ease-in-out">
    <h1 className="text-[#000000]">Graph Goes Here</h1>
  </div>
</div>


    </div>
  );
};

export default PortfolioPage;
