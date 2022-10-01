import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  console.log(currency);

  return (
    <div>
      <nav className=" px-2 sm:px-4 py-2.5">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <p
            onClick={() => navigate("/")}
            className=" self-center font-montserrat my-[10px] mx-[50px] text-2xl font-bold whitespace-nowrap md:pl-10 text-white flex items-center cursor-pointer"
          >
            Crypto-Tracker
          </p>

          <div className=" w-full md:block md:w-auto" id="navbar-default">
            <select
              id="countries"
              className="bg-[#00052e] cursor-pointer border-2 border-[#3a4179] text-white text-sm rounded-md outline-0 focus:ring-0 hover:border-[#5a629e]  focus:border-[#5a629e] block w-full p-2"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option
                className=" border-gradient block w-full p-2"
                value={"USD"}
              >
                USD
              </option>
              <option
                className=" border-gradient block w-full p-2"
                value={"INR"}
              >
                INR
              </option>
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
