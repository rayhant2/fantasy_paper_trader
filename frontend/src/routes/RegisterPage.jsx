import React from "react";
import Navbar from "../components/Navbar";
import Registration from "../components/Registration";

const RegisterPage = () => {
  return (
    <>
    <div className="w-screen">
      <div><Navbar /></div>
        <div>
          <Registration/>
        </div>
      </div>


    </>
  );
};

export default RegisterPage;
