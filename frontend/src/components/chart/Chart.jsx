import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { formatStockData } from "./ChartUtils";
import { testData } from "./testData";
import { candleStickOptions } from "./ChartOptions";

const Chart = () => {
    return (
        <ReactApexChart
            series={[{ data: formatStockData(testData) }]}
            options={candleStickOptions}
            type="candlestick"
            width={500}
            height={500}
        />
    );
};

export default React.memo(Chart);
