import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrendingCoins } from "../../config/api.js";
import { CryptoState } from "../../CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
// import "./carousel.css";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin?.id}`}>
        <div className="flex flex-col rounded-md mt-[20px] w-[200px]	h-[250px]  container text-center items-center p-[20px]	justify-center text-white cursor-pointer">
          <img
            className="self-center m-auto pb-[15px]	"
            src={coin?.image}
            alt={coin.name}
            style={{ marginBottom: 10, height: 120 }}
          />
          <span className="text-white text-center flex flex-col">
            {coin?.symbol}&nbsp;
            <span
              style={{
                color: profit > 0 ? "#0ecb6d" : "red",
                fontWeight: "500",
              }}
              className="text-white text-center"
            >
              {profit && "+"}
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
            <span>
              {symbol}
              {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
          </span>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <>
      <div className="h-3/6 flex mx-[20px] items-center justify-center">
        <AliceCarousel
          infinite
          mouseTracking
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />

        {/* <Carousel></Carousel> */}
      </div>
    </>
  );
};

export default Carousel;

// 33884
