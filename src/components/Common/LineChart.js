import React from "react";
import ReactEcharts from "echarts-for-react";
import PropTypes from 'prop-types'

const Line = ({ 
        day1,
        day2,
        day3,
        day4,
        day5,
        day6,
        day7,
        day8,
        day9,
        day10,
        day11,
        day12,
        day13,
        day14,
        day15,
        day16,
        day17,
        day18,
        day19,
        day20,
        day21,
        day22,
        day23,
        day24,
        day25,
        day26,
        day27,
        day28,
        day29,
        day30,
        day31
}) => {
  const options = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      zlevel: 0,
      x: 50,
      x2: 50,
      y: 30,
      y2: 30,
      borderWidth: 0,
    },
    xAxis: {
      type: "category",
      data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12","13", "14","15", "16", "17", "18", "19", "20", "21", "22","23", "24", "25", "26", "27", "28", "29", "30","31"],
      axisLable: {
        color: "#ffffff",
      },
      axisLine: {
        lineStyle: {
          color: "#74788d",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLable: {
        color: "#ffffff",
      },
      axisLine: {
        lineStyle: {
          color: "#74788d",
        },
      },
    },
    series: [
      {
        data: [day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,day11,day12,day13,day14,day15,day16,day17,day18,day19,day20,day21,day22,day23,day24,day25,day26,day27,day28,day29,day30,day31],
        type: "line",
      },
    ],
    color: ["#556ee6"],
    textStyle: {
      color: ["#74788d"],
    },
  };
  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "200px" }} option={options} />
    </React.Fragment>
  );
};

Line.propTypes = {
  day1: PropTypes.any,
  day2: PropTypes.any,
  day3: PropTypes.any,
  day4: PropTypes.any,
  day5: PropTypes.any,
  day6: PropTypes.any,
  day7: PropTypes.any,
  day8: PropTypes.any,
  day9: PropTypes.any,
  day10: PropTypes.any,
  day11: PropTypes.any,
  day12: PropTypes.any,
  day13: PropTypes.any,
  day14: PropTypes.any,
  day15: PropTypes.any,
  day16: PropTypes.any,
  day17: PropTypes.any,
  day18: PropTypes.any,
  day19: PropTypes.any,
  day20: PropTypes.any,
  day21: PropTypes.any,
  day22: PropTypes.any,
  day23: PropTypes.any,
  day24: PropTypes.any,
  day25: PropTypes.any,
  day26: PropTypes.any,
  day27: PropTypes.any,
  day28: PropTypes.any,
  day29: PropTypes.any,
  day30: PropTypes.any,
  day31: PropTypes.any
  }
export default Line;
