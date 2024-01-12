import React from "react"
import ReactApexChart from "react-apexcharts"
import PropTypes from 'prop-types'

const dountchart = ({ giftcard, crypto}) => {
  const series = [giftcard, crypto]
  const options = {
    labels: ["Giftcard", "Crypto"],
    colors: ["#000000", "#717171"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height="380"
    />
  )
}

dountchart.propTypes = {
    giftcard: PropTypes.any,
    crypto: PropTypes.any,
  }

export default dountchart
