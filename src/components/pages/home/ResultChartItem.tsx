import { useEffect, useRef } from 'react';
import { init as echartsInit, type ECharts, type EChartsOption } from 'echarts';


interface ResultChartItemProps {
  chartOptions: EChartsOption;
}

const ResultChartItem = ({ chartOptions }: ResultChartItemProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ECharts | null>(null);


  useEffect(() => {
    if (!chartRef.current) return;
    let cancelled = false;

    const init = () => {
      if (cancelled) {
        chartInstance.current?.dispose();
        return;
      }

      chartInstance.current = echartsInit(chartRef.current);
      chartInstance.current.setOption(chartOptions);
    }

    init();

    return () => {
      cancelled = true;
      chartInstance.current?.dispose();
    };
  }, [chartOptions]);


  return (
    <div ref={chartRef} className='ChartRef relative isolate w-full aspect-4/3 md:aspect-video'></div>
  )
}

export default ResultChartItem;
