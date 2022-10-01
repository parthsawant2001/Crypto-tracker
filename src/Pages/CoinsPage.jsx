import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinInfo from "../Components/CoinInfo";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api.js";
import { numberWithCommas } from "../Components/CoinsTable";

// import ReactHtmlParser from "react-html-parser";
// import HtmlReactParser from "html-react-parser";

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <p style={{ backgroundColor: "gold" }}>loading</p>;

  return (
    <div className="container flex flex-row ">
      <div className="mx-[25px]  w-[27%] flex flex-col items-center py-[25px] px-[25px]  border-2px rounded-xl bg-[#080d38] ">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          style={{ height: 200, marginBottom: 20 }}
        />
        <h1 className="text-[#a1abff] font-bold text-[35px]">{coin?.name}</h1>
        <p className="text-[#a1aaffb3] text-center text-[15px]">
          {coin?.description.en.split(".")[0]}
        </p>
        <div className="justify-start self-start py-10">
          <span className="flex flex-row text-[25px] text-white">
            <p className="text-white font-bold">Rank:</p> &nbsp; &nbsp;
            <p>{coin?.market_cap_rank}</p>
          </span>
          <span className="flex flex-row text-[25px] text-white">
            <p className="text-white font-bold">Current Price:</p>&nbsp; &nbsp;
            <p>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </p>
          </span>
          <span className="flex flex-row text-[25px] text-white">
            <p className="text-white font-bold">Market Cap:</p>&nbsp; &nbsp;
            <p>
              {symbol}&nbsp;&nbsp;
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </p>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinsPage;
