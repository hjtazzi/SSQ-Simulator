import { useEffect, useMemo, useRef, useState } from 'react';
import { init as echartsInit, type ECharts, type EChartsOption } from 'echarts';
import { VscRunCoverage, VscChevronDown } from 'react-icons/vsc';
import type { TChartData, TData } from '../../../types';
import { classCombiner } from '../../../utils';


interface DataChartProps {
  dataset: TData[];
  title: string;
}

const DataChart = ({ dataset, title }: DataChartProps) => {
  const [winOpen, setWinOpen] = useState<boolean>(true);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ECharts | null>(null);
  const chartData = useMemo<TChartData>(() => {
    const chartData: TChartData = {
      arrivals: [],
      services: [],
      waitings: []
    }

    dataset.forEach((data) => {
      chartData.arrivals.push(data.arrival);
      chartData.services.push(data.service);
      chartData.waitings.push(data.waite);
    });

    return chartData;
  }, [dataset]);
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
      axisPointer: { type: 'shadow' },
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
          borderRadius: 2,
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
          color: '#e11d48',
          borderRadius: 2,
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
          borderRadius: 2
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
      setWinOpen(true);
    }

    init();

    return () => {
      cancelled = true;
      chartInstance.current?.dispose();
    };
  }, [chartOptions]);


  return (
    <div className='overflow-hidden w-full flex flex-col border border-primary-500 rounded-lg'>
      <button onClick={() => setWinOpen(prev => !prev)}
        className={classCombiner(`w-full flex flex-col gap-2 p-4 transition bg-transparent hover:bg-primary-950/15 cursor-pointer`)}>
        <h2 className={'flex flex-row w-full gap-3 items-center'}>
          <VscRunCoverage size='1.15em' />
          {title}
          <i className='flex-auto opacity-0 h-0'></i>
          <VscChevronDown size='1.15em' className={classCombiner(`transition-all duration-300 rotate-0`, !winOpen && 'rotate-180')} />
        </h2>
      </button>
      <i className={classCombiner(`block w-full h-px bg-primary-500 m-0 p-0 transition opacity-100`, !winOpen && 'opacity-0 delay-200')}></i>

      <div className={classCombiner(`overflow-hidden w-full transition-all duration-300 px-4`, winOpen ? 'max-h-dvh' : 'max-h-0')}>
        <div ref={chartRef} className='ChartRef relative isolate w-full max-h-dvh aspect-video'></div>
      </div>
      <div className='clear-both'></div>
    </div>
  )
}

export default DataChart;
