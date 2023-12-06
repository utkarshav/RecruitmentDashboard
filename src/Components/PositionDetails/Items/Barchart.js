// BarChart.js
import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

// Register ECharts components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  CanvasRenderer,
]);

function BarChartComponent({ data }) {
  useEffect(() => {
    const chartDom = document.getElementById('bar-chart');
    const myChart = echarts.init(chartDom);

    const xAxisData = data.map(entry => entry.position); // Assuming you have a 'position' field in your data

    const option = {
      title: {
        text: 'Delay Analysis for Positions',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    //   legend: {
    //     data: ['Offer Date', 'Joining Date', 'Actual Joining Date'],
    //   },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
        name: 'Days',
      },
      series: [
        {
          name: 'Offer Date',
          type: 'bar',
          data: data.map(entry => entry.offerDateDelay),
        },
        {
          name: 'Joining Date',
          type: 'bar',
          data: data.map(entry => entry.joiningDateDelay),
        },
        {
          name: 'Actual Joining Date',
          type: 'bar',
          data: data.map(entry => entry.actualJoiningDateDelay),
        },
      ],
    };

    myChart.setOption(option);

    // Cleanup when the component unmounts
    return () => {
      myChart.dispose();
    };
  }, [data]);

  return (
    <div id="bar-chart" style={{ width: '100%', height: '400px', margin: 'auto', marginTop: '10px' }}></div>
  );
}

export default BarChartComponent;
