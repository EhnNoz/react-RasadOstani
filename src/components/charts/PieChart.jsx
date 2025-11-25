import React, { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import exportingModule from 'highcharts/modules/exporting'
import exportDataModule from 'highcharts/modules/export-data'


function PieChart({

    data,
    height,
    color,
    marginRight,
    param,
    marginTop,
    backgroundButton,
    marginBot,
    marginLeft,
    datatest,
    url,
    type,
    bgcolor,
    width, legend, center, size
}) {





    const options = useMemo(() => (
        {
            exporting: {
                enabled: true,
                buttons: {
                    contextButton: {
                        menuItems: [
                            "viewFullscreen",
                            "printChart",
                            "downloadPNG",
                            "downloadSVG",
                            "downloadPDF",
                            "downloadCSV",   // اینجا CSV اضافه شده
                        ]
                    }
                }
            },
            lang: {
                viewFullscreen: "نمایش در کل صفحه",
                printChart: "پرینت نمودار",
                downloadPNG: "PNG دانلود",
                downloadSVG: "SVG دانلود",
                downloadPDF: "PDF دانلود ",
                downloadCSV: "CSV دانلود",
                noData: 'دیتایی وجود ندارد '
            },
            chart: {
                type: 'pie',
                zooming: {
                    type: 'xy'
                },
                panning: {
                    enabled: true,
                    type: 'xy'
                },

                height: height ? height : '',
                width: width ? width : '',
                styleMode: true,
                marginTop: marginTop ? marginTop : 50,
                marginRight: marginRight ? marginRight : 50,
                marginBot: marginBot ? marginBot : 1,
                marginLeft: marginLeft ? marginLeft : null,
                backgroundColor: bgcolor ? bgcolor : null,
                style: {
                    borderBottomLeftRadius: '25px',
                    borderBottomRightRadius: '25px',
                    fontFamily: 'YekanBakh_Regular',

                },
                panKey: 'shift'
            },
            title: {
                text: ''
            },
            tooltip: {
                valueSuffix: ''
            },
            subtitle: {
                text:
                    ''
            },
            credits: {
                // Remove highcharts.com credits link from chart footer.
                enabled: false,
            },
            plotOptions: {
                pie: {
                    startAngle: type === 'semipie' ? -90 : 0,
                    endAngle: type === 'semipie' ? 90 : 0,
                    center: center ? center : ['50%', '45%'],
                    size: size ? size : '120%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 10,
                        style: {
                            color: 'black',
                            fontSize: '16px'
                        }
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            series: [
                {

                    colorByPoint: true,
                    data: data ? data : null
                }
            ]
        }
    ), [data]
    )

    return (
        <>

            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                key={JSON.stringify(data)}
            />
        </>
    )
}




export default PieChart
