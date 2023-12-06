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

function RecruitmentPieChart() {
  useEffect(() => {
    const chartDom = document.getElementById('recruitment-chart');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Job Opend This Month',
       
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine', itemStyle: { color: '#8d61a5' } },
            { value: 735, name: 'Direct', itemStyle: { color: '#6382d8' } },
            { value: 580, name: 'Email', itemStyle: { color: '#2794eb' } },
            { value: 484, name: 'Union Ads', itemStyle: { color: '#ff7f50' } },
            { value: 300, name: 'Video Ads', itemStyle: { color: '#ffd700' } }
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
    <div id="recruitment-chart" style={{ width: '400px', height: '400px', margin:'auto' , marginTop:'10' }}></div>
  );
}

export default RecruitmentPieChart;
