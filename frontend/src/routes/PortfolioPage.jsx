import React from "react";
import Navbar from "../components/Navbar";

const PortfolioPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <p className="text-left text-3xl mt-7 mx-5">Hello, Tahseen.</p>

      <div className="flex flex-row">
        <div className="flex flex-col gap-5 m-5 w-1/2">
          <div className="bg-red-400 rounded-2xl p-5 flex-1">
            <h4>Account</h4>
            <p>$ - - - - -</p>
          </div>
          <div className="bg-red-400 rounded-2xl p-5 flex-1">
            <h4>Best Performing Stock</h4>
            <p>TCKR +$ - -</p>
          </div>
          <div className="bg-red-400 rounded-2xl p-5 flex-1">
            <h4>Worst Performing Stock</h4>
            <p>TCKR -$ - -</p>
          </div>
        </div>

        <div className="bg-blue-400 rounded-2xl m-5 w-1/2 flex items-center justify-center">
          <h1>Graph Goes Here</h1>
        </div>
      </div>

      <div className="flex flex-1 gap-5 m-5">
        <div className="bg-red-400 rounded-2xl flex-1 p-5">
          <h3>Note pad</h3>
        </div>
        <div className="bg-blue-400 rounded-2xl flex-1 p-5">
          <h2>Recent transactions:</h2>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
