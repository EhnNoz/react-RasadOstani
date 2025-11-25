import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'
import HC_more from 'highcharts/highcharts-more' //module
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsBoost from "highcharts/modules/boost";
import streamgraph from "highcharts/modules/streamgraph"
function StreamgraphChart({ data, height }) {

    const colors = Highcharts.getOptions().colors;
    const options = {

        chart: {
            type: 'streamgraph',
            marginBottom: 30
            ,
            height: height ? height : null,
            zooming: {
                type: 'x'
            }
        },

        credits: {
            // Remove highcharts.com credits link from chart footer.
            enabled: false,
        },
        // Make sure connected countries have similar colors
        colors: [
            colors[0],
            colors[1],
            colors[2],
            colors[3],
            colors[4],
            // East Germany, West Germany and Germany
            Highcharts.color(colors[5]).brighten(0.2).get(),
            Highcharts.color(colors[5]).brighten(0.1).get(),

            colors[5],
            colors[6],
            colors[7],
            colors[8],
            colors[9],
            colors[0],
            colors[1],
            colors[3],
            // Soviet Union, Russia
            Highcharts.color(colors[2]).brighten(-0.1).get(),
            Highcharts.color(colors[2]).brighten(-0.2).get(),
            Highcharts.color(colors[2]).brighten(-0.3).get(),
            Highcharts.color(colors[2]).brighten(-0.4).get()
        ],

        title: {
            floating: true,
            align: 'left',
            text: ''
        },
        subtitle: {
            floating: true,
            align: 'left',
            y: 30,
            text: ''
        },

        xAxis: {
            maxPadding: 0,
            type: 'category',
            crosshair: true,
            categories: data?.categories,
            labels: {
                align: 'left',
                reserveSpace: false,
                rotation: 270
            },
            lineWidth: 0,
            margin: 20,
            tickWidth: 0
        },

        yAxis: {
            visible: false,
            startOnTick: false,
            endOnTick: false,
            minPadding: 0.1,
            maxPadding: 0.15
        },

        legend: {
            enabled: false
        },

        annotations: [{
            labels: [{
                point: {
                    x: 5.5,
                    xAxis: 0,
                    y: 30,
                    yAxis: 0
                },
                text: ''
            }, {
                point: {
                    x: 18,
                    xAxis: 0,
                    y: 90,
                    yAxis: 0
                },
                text: ''
            }, {
                point: {
                    x: 24.25,
                    xAxis: 0,
                    y: 140,
                    yAxis: 0
                },
                text: ''
            }],
            labelOptions: {
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderColor: 'silver'
            }
        }],

        plotOptions: {
            series: {
                label: {
                    minFontSize: 5,
                    maxFontSize: 15,
                    style: {
                        color: 'rgba(255,255,255,0.75)'
                    }
                },
                accessibility: {
                    exposeAsGroupOnly: true
                }
            }
        },

        // Data parsed with olympic-medals.node.js
        series: data?.series,


        exporting: {
            sourceWidth: 800,
            sourceHeight: 600
        }

    }


    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default StreamgraphChart
