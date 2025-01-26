import dayjs from "dayjs"

export const candleStickOptions = {
    chart: {
        height: 500,
        width: 700,
        
        type: "candlestick",
        toolbar: {
            show: false,
        }
    },
    title: {
        align: "left",
    },
    annotations: {
        xaxis: [
            {
                x: "Oct 06 14:00",
                borderColor: "#00E396",
                label: {
                    borderColor: "#00E396",
                    style: {
                        fontSize: "16px",
                        color: "#fff",
                        background: "#00E396",
                    },
                    orientation: "horizontal",
                    offsetY: 7,
                    text: "Annotation Test",
                },
            },
        ],
    },


    
    tooltip: {
        enabled: true,
    },
    xaxis: {
        type: "datetime",
        labels: {
            formatter: (val) => {
                return dayjs(val).format('YYYY MM')
            },
            style: {
                fontSize: '16px'
            },
            rotate: -30,
            rotateAlways: true,
            show: true,
        },
        tickAmount: 3
    },
    yaxis: {
        tooltip: {
            enabled: true,
        },
    },
};
