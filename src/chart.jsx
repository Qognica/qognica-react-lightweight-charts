import React from "react";
import { createChart } from "lightweight-charts";
import equal from "fast-deep-equal";
import { addSeriesFunctions, colors, defaultDarkTheme, lightTheme } from "./util/consts";
import usePrevious from "./util/hooks/usePrevious";
import { mergeDeep } from "./util/helpers";

const Chart = (props) => {
    const { candlestickSeries, lineSeries, areaSeries, barSeries, histogramSeries, width, height, options, autoWidth, autoHeight, legend, from, to, onClick, onCrosshairMove, onTimeRangeMove, darkTheme, chartRef } = props;

    const prevProps = usePrevious(props);
    const [legends, setLegends] = React.useState([]);
    const [series, setSeries] = React.useState([]);
    const [chart, setChart] = React.useState(null);
    const [color, setColor] = React.useState(lightTheme.layout.textColor);
    const chartDiv = React.createRef();
    const legendDiv = React.createRef();

    React.useEffect(() => {
        if (chart) return;
        const newChart = createChart(chartDiv.current)
        setChart(newChart)
        chartRef?.(newChart);
        
    }, [chart]);
    React.useEffect(() => {
        if (!chart) return;
        const ls = chartRef.current?.addLineSeries();
        ls.setData([
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 76.64 },
    { time: '2019-04-14', value: 81.89 },
    { time: '2019-04-15', value: 74.43 },
    { time: '2019-04-16', value: 80.01 },
    { time: '2019-04-17', value: 96.63 },
    { time: '2019-04-18', value: 76.64 },
    { time: '2019-04-19', value: 81.89 },
    { time: '2019-04-20', value: 74.43 },
]);
    }, [chartRef.current]);

    return (
        <div ref={chartDiv} style={{ position: "relative" }}>
            <div
                ref={legendDiv}
                style={{
                    position: "absolute",
                    zIndex: 2,
                    color,
                    padding: 10,
                }}
            />
        </div>
    );
}

export default Chart;
export * from "lightweight-charts";
