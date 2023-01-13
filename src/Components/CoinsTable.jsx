import React, { useState, useEffect } from "react";
import { CoinList } from "../config/api.js";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
import ReactPaginate from "react-paginate";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div className=" flex flex-col  items-center justify-center font-montserrat">
      <h2 className="text-[#818ad5] text-center text-[30px]">
        Cryptocurrency Prices by Market Cap
      </h2>
      <input
        type="text"
        className=" bg-[#00052e] border-2 border-[#3a4179]  text-white text-lg my-[20px] rounded-md outline-0 p-[20px] w-[50%] hover:border-[#5a629e]  focus:border-[#5a629e]"
        placeholder=" Search for a Cryptocurrency"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-md  w-[90%] relative">
        <table className="w-full text-sm rounded-md text-left  ">
          <thead className="text-sm rounded-md uppercase bg-[#818ad5] text-[#00052e]">
            <tr>
              {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                <th
                  className="py-4 px-8"
                  key={head}
                  align={head === "Coin" ? "" : "right"}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" hover:cursor-pointer  ">
            {handleSearch()
              // .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((row) => {
                let profit = row.price_change_percentage_24h >= 0;
                return (
                  <tr
                    onClick={() => navigate(`/coins/${row.id}`)}
                    key={row.name}
                    className=" border-b text-white bg-[#080d38] border-gray-700 hover:bg-[#141948] focus:bg-[#141948]"
                  >
                    <th
                      scope="row"
                      className="font-medium flex justify-start items-center   text-white"
                    >
                      <img
                        className="self-center "
                        src={row?.image}
                        alt={row.name}
                        style={{ margin: 15, height: 50 }}
                      />
                      <div className="items-left justify-start flex flex-col ">
                        <span className="  uppercase text-[22px]">
                          {row.symbol}
                        </span>
                        <span className="text-[#d9d9d9bf] pt-2">
                          {row.name}
                        </span>
                      </div>
                    </th>

                    <td align="right">
                      {symbol}
                      {numberWithCommas(row.current_price.toFixed(2))}
                    </td>
                    <td
                      align="right"
                      style={{ color: profit > 0 ? "rgb(14,203,129)" : "red" }}
                      className="py-4 px-6"
                    >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td align="right" className="py-4 px-6">
                      {symbol}
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <ReactPaginate />
    </div>
  );
};

export default CoinsTable;