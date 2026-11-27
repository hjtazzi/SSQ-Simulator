import type { EChartsOption } from "echarts";


export const customChartOptions = (): EChartsOption => ({
  width: '100%',
  backgroundColor: 'transparent',
  grid: {
    top: 15,
    left: 0,
    right: 0,
    bottom: 30,
    containLabel: true
  },
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'filter',
      bottom: 0,
      height: 25,
      start: 0
    },
    {
      type: 'inside',
      xAxisIndex: 0,
      filterMode: 'filter'
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: '#021012',
    borderColor: '#1e3030',
    textStyle: {
      color: '#f2f4f2',
      fontFamily: 'var(--font-firaCode, var(--font-vazirmatn, var(--font-sans)))'
    }
  },
  xAxis: {
    type: 'category',
    splitLine: { show: false },
  },
  yAxis: {
    type: 'value',
    scale: true,
    splitLine: {
      lineStyle: {
        color: '#1e3030',
        opacity: 0.75
      }
    }
  }
});
