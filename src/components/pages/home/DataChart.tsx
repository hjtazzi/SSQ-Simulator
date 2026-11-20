import { useEffect, useMemo, useRef } from 'react';
import { init as echartsInit, type ECharts, type EChartsOption } from 'echarts';
import { VscRunCoverage } from 'react-icons/vsc';


interface DataChartProps {
  title: string;
  arrivals: number[];
  services: number[];
}

const DataChart = ({ title, arrivals, services }: DataChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ECharts | null>(null);
  const chartData = useMemo<{ arrivals: number[]; services: number[]; }>(() => {
    let totalArrival = 0;
    const _arrivals: number[] = [];
    const _services: number[] = [];

    arrivals.forEach((_val, i) => {
      const value = parseFloat(_val.toFixed(4));
      const service = parseFloat(services[i].toFixed(4));

      totalArrival += value;
      _arrivals.push(totalArrival * 1000);
      _services.push((value + service) * 1000);
    });

    return {
      arrivals: _arrivals,
      services: _services
    }
  }, [arrivals, services]);
  const chartOptions = useMemo<EChartsOption>(() => ({
    width: '100%',
    backgroundColor: 'transparent',
    grid: {
      top: 15,
      left: 0,
      right: 0,
      bottom: 30,
      containLabel: true,
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        bottom: 0,
        height: 25,
        start: 0,
        end: 8
      },
      {
        type: 'inside',
        xAxisIndex: 0
      }
    ],
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: [...Array.from({ length: chartData.arrivals.length }).map((_, i) => i)]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
        data: chartData.arrivals
      },
      {
        name: 'Services',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          color: '#2563eb',
          borderRadius: 4
        },
        label: { show: false },
        data: chartData.services
      }
    ]
  }), [chartData]);


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
    <div className='w-full flex flex-col border border-primary-500 rounded-lg m-0 p-4'>
      <div className='w-full flex flex-col gap-2 mb-8'>
        <h2 className={'flex flex-row w-full gap-3 items-center'}>
          <VscRunCoverage size='1.15em' />
          {title}
        </h2>
        <i className={'block w-full h-px bg-primary-500'}></i>
      </div>

      <div ref={chartRef} className='ChartRef w-full aspect-video'></div>
      <div className='clear-both'></div>
    </div>
  )
}

export default DataChart;
