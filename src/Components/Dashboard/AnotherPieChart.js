import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// Register ECharts components
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

function AnotherPieChart() {
  useEffect(() => {
    const chartDom = document.getElementById('another-chart');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Total Job Openings',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
     
      series: [
        {
          name: 'Sales',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 150, name: 'Product A' },
            { value: 250, name: 'Product B' },
            { value: 180, name: 'Product C' },
            { value: 320, name: 'Product D' },
            { value: 120, name: 'Product E' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);

    // Cleanup when the component unmounts
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div id="another-chart" style={{ width: '400px', height: '400px', margin: 'auto', marginTop: '10' }}></div>
  );
}

export default AnotherPieChart;
