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
  const chartData = useMemo<{ arrivals: number[]; waitings: number[]; services: number[]; }>(() => {
    let totalArrivals = 0;
    let lastCompleted = 0;

    const _arrivals: number[] = [];
    const _waitings: number[] = [];
    const _services: number[] = [];

    arrivals.forEach((_arrival, i) => {
      const arrival = parseFloat(_arrival.toFixed(8)) * 1000;
      const service = parseFloat(services[i].toFixed(8)) * 1000;
      totalArrivals += arrival;
      const serviceStart = Math.max(totalArrivals, lastCompleted);
      const completed = serviceStart + service;
      const waite = serviceStart - totalArrivals;

      lastCompleted = completed;
      _arrivals.push(totalArrivals);
      _waitings.push(waite);
      _services.push(service);
    });

    return {
      arrivals: _arrivals,
      waitings: _waitings,
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
        filterMode: 'filter',
        bottom: 0,
        height: 25,
        start: 0,
        end: chartData.arrivals.length > 100 ? 10 : 100
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'filter',
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: [...Array.from({ length: chartData.arrivals.length }).map((_, i) => `c${i}`)]
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [
      {
        name: 'Arrival (ms)',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: '#1e3030',
          borderRadius: 4,
          opacity: 0.5
        },
        label: { show: false },
        data: chartData.arrivals
      },
      {
        name: 'Waiting (ms)',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: '#ec003f',
          borderRadius: 4,
          opacity: 0.5
        },
        label: { show: false },
        data: chartData.waitings
      },
      {
        name: 'Service (ms)',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
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
