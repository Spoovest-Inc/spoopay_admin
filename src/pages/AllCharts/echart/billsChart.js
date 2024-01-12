import React from "react";
import ReactEcharts from "echarts-for-react";
import PropTypes from "prop-types";

const BillCharts = ({totalAirtimeSells, totalElectricitySells, totalCableSells, totalDataSells}) => {
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
      data: ["Airtime", "Data", "Cable", "Electricity"],
      textStyle: {
        color: ["#74788d"],
      },
    },
    color: ["#D9EBCF", "#f8b425", "#ec4561", "#38a4f8", "#4D0FE2"],
       "series":[
      {
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: totalAirtimeSells || 0, name: "Airtime" },
          { value: totalDataSells || 0, name: "Data" },
          { value: totalCableSells || 0, name: "Cable" },
          { value: totalElectricitySells || 0, name: "Electricity" },
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

BillCharts.propTypes = {
  totalAirtimeSells: PropTypes.any,
  totalElectricitySells: PropTypes.any,
  totalCableSells: PropTypes.any,
  totalDataSells: PropTypes.any
};
export default BillCharts;
