import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api.js";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data.js";
import SelectButton from "../Components/SelectButton";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  return (
    <div className="w-[68%]">
      {!historicalData ? (
        <h3 className="bg-[#a1abff]">LOADING...</h3>
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,

                  borderColor: "#a1abff",
                },
              ],
            }}
            options={{ elements: { point: { radius: 1 } } }}
          />

          <div className="flex justify-around	mt-[20px] w-[100%]">
            {chartDays.map((day) => (
              <SelectButton
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
