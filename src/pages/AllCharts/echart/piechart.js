import React from "react";
import ReactEcharts from "echarts-for-react";
import PropTypes from "prop-types";
const Pie = ({totalGiftCardSells,totalCryptoSell }) => {
  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Cryto",  "GiftCards"],
      textStyle: {
        color: ["#74788d"],
      },
    },
    color: ["#02a499", "#6028E6", "#ec4561", "#38a4f8"],
    "series": [
      {
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: totalCryptoSell || 0, name: "Cryto" },
          { value: totalGiftCardSells || 0, name: "GiftCards" },
        
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={options} />
    </React.Fragment>
  );
};

Pie.propTypes = {
  totalCryptoSell: PropTypes.any,
  totalGiftCardSells: PropTypes.any,
};
export default Pie;
