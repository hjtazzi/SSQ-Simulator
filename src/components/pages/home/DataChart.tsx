import { useEffect, useMemo, useRef, useState } from 'react';
import { init as echartsInit, type ECharts, type EChartsOption } from 'echarts';
import { VscRunCoverage, VscChevronDown } from 'react-icons/vsc';
import type { TChartData, TData, TMetrics } from '../../../types';
import { calcMetrics, classCombiner, customChartOptions } from '../../../utils';


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
      chartData.arrivals.push(parseFloat(data.arrival.toFixed(4)));
      chartData.services.push(parseFloat(data.service.toFixed(4)));
      chartData.waitings.push(parseFloat(data.waite.toFixed(4)));
    });

    return chartData;
  }, [dataset]);
  const chartOptions = useMemo<EChartsOption>(() => {
    const _options = customChartOptions();
    return {
      ..._options,
      dataZoom: {
        end: chartData.arrivals.length > 100 ? 7 : 100
      },
      xAxis: {
        data: [...Array.from({ length: chartData.arrivals.length }).map((_, i) => `c${i}`)]
      },
      series: [
        {
          name: 'Arrival',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: '#1e3030',
            borderRadius: 2,
            opacity: 0.35
          },
          label: { show: false },
          data: chartData.arrivals
        },
        {
          name: 'Waiting',
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
          name: 'Service',
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
    }
  }, [chartData]);
  const metrics = useMemo<TMetrics>(() => calcMetrics(dataset), [dataset]);


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
          <VscChevronDown size='1.15em' className={classCombiner(`transition-all duration-300 rotate-0`, winOpen && 'rotate-180')} />
        </h2>
      </button>
      <i className={classCombiner(`block w-full h-px bg-primary-500 m-0 p-0 transition opacity-100`, !winOpen && 'opacity-0 h-0 delay-200')}></i>

      <div className={classCombiner(`overflow-hidden w-full flex flex-col md:flex-row transition-all duration-300 px-4 m-0 gap-0`, winOpen ? 'max-h-dvh' : 'max-h-0')}>
        <div ref={chartRef} className='ChartRef relative isolate w-full md:w-1/2 max-h-dvh aspect-4/3 md:aspect-video py-4'></div>

        <div className='relative isolate w-full flex flex-row items-center justify-center md:w-1/2 max-h-dvh aspect-video mt-2 py-4 gap-2 md:px-4'>
          <div className='flex flex-col gap-1 text-sm md:text-base text-primary-50'>
            <p className='line-clamp-1'>{`Total Simulation Time (T):`}</p>
            <p className='line-clamp-1'>{`Avg. Number in System (L):`}</p>
            <p className='line-clamp-1'>{`Avg. Number in Queue (LQ):`}</p>
            <p className='line-clamp-1'>{`Avg. Time in System (W):`}</p>
            <p className='line-clamp-1'>{`Avg. Waiting Time (WQ):`}</p>
            <p className='line-clamp-1'>{`Utilization (ρ):`}</p>
            <p className='line-clamp-1'>{`Throughput:`}</p>
          </div>

          <div className='flex flex-col gap-1 text-sm md:text-base'>
            <p>{parseFloat(metrics.T.toFixed(4))}</p>
            <p>{parseFloat(metrics.L.toFixed(4))}</p>
            <p>{parseFloat(metrics.LQ.toFixed(4))}</p>
            <p>{parseFloat(metrics.W.toFixed(4))}</p>
            <p>{parseFloat(metrics.WQ.toFixed(4))}</p>
            <p>{parseFloat(metrics.utilization.toFixed(4))}</p>
            <p>{parseFloat(metrics.throughput.toFixed(4))}</p>
          </div>
        </div>
      </div>
      <div className='clear-both'></div>
    </div>
  )
}

export default DataChart;
