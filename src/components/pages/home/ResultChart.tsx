import { useMemo, useRef, useState } from 'react';
import type { EChartsOption, SeriesOption } from 'echarts';
import { VscRunCoverage, VscChevronDown, VscGraphLine } from 'react-icons/vsc';
import type { TData, TMetrics } from '../../../types';
import { calcMetrics, classCombiner, customChartOptions } from '../../../utils';
import ResultChartItem from './ResultChartItem';
import useAutoMaxHeight from '../../../hooks/useAutoMaxHeight';


interface ResultChartProps {
  datasets: TData[][];
  serviceRate: number;
  arrivalRate: number;
}

const ResultChart = ({ datasets, arrivalRate }: ResultChartProps) => {
  const [winOpen, setWinOpen] = useState<boolean>(true);
  const chartsRef = useRef<HTMLDivElement | null>(null);
  const { maxHeight } = useAutoMaxHeight({ contentRef: chartsRef, open: winOpen });

  const metricsData = useMemo<Record<string, EChartsOption>>(() => {
    const metrics: TMetrics[] = [];
    datasets.forEach(data => metrics.push(calcMetrics(data)));

    const _options: EChartsOption = {
      ...customChartOptions(),
      dataZoom: undefined,
      xAxis: {
        data: [...Array.from({ length: datasets.length }).map((_, i) => `λ${arrivalRate + i}`)]
      }
    };
    const _itemOps: SeriesOption = {
      type: 'bar',
      stack: 'Total',
      itemStyle: {
        borderColor: 'transparent',
        color: '#2563eb',
        borderRadius: 2
      },
      label: { show: false },
    }

    const chartOps: Record<string, EChartsOption> = {
      "Avg. Number in System (L)": {
        ..._options,
        series: [
          {
            ..._itemOps,
            name: 'L',
            data: metrics.map(data => parseFloat(data.L.toFixed(4)))
          }
        ]
      },
      "Avg. Number in Queue (LQ)": {
        ..._options,
        series: [
          {
            ..._itemOps,
            name: 'LQ',
            data: metrics.map(data => parseFloat(data.LQ.toFixed(4)))
          }
        ]
      },
      "Avg. Time in System (W)": {
        ..._options,
        series: [
          {
            ..._itemOps,
            name: 'W',
            data: metrics.map(data => parseFloat(data.W.toFixed(4)))
          }
        ]
      },
      "Avg. Waiting Time (WQ)": {
        ..._options,
        series: [
          {
            ..._itemOps,
            name: 'WQ',
            data: metrics.map(data => parseFloat(data.WQ.toFixed(4)))
          }
        ]
      },
      "Utilization (ρ)": {
        ..._options,
        series: [
          {
            ..._itemOps,
            name: 'Utilization',
            data: metrics.map(data => parseFloat(data.utilization.toFixed(4)))
          }
        ]
      },
      "Throughput": {
        ..._options,
        series: [
          {
            ..._itemOps,
            name: 'Throughput',
            data: metrics.map(data => parseFloat(data.throughput.toFixed(4)))
          }
        ]
      },
    };

    return chartOps
  }, [datasets, arrivalRate]);


  return (
    <div className='overflow-hidden w-full flex flex-col border border-primary-500 rounded-lg'>
      <button onClick={() => setWinOpen(prev => !prev)}
        className={classCombiner(`w-full flex flex-col gap-2 p-4 transition bg-transparent hover:bg-primary-950/15 cursor-pointer`)}>
        <h2 className={'flex flex-row w-full gap-3 items-center'}>
          <VscRunCoverage size='1.15em' />
          {`Performance Metrics`}
          <i className='flex-auto opacity-0 h-0'></i>
          <VscChevronDown size='1.15em' className={classCombiner(`transition-all duration-300 rotate-0`, winOpen && 'rotate-180')} />
        </h2>
      </button>
      <i className={classCombiner(`block w-full h-px bg-primary-500 m-0 p-0 transition opacity-100`, !winOpen && 'opacity-0 h-0 delay-200')}></i>

      <div ref={chartsRef} style={{ maxHeight }}
        className={classCombiner(`overflow-hidden w-full flex flex-col transition-all duration-300`)}>
        <div className='w-full flex flex-col md:flex-row flex-wrap m-0 p-4 gap-4 mt-4'>
          {Array.from(Object.entries(metricsData)).map(([title, chartOptions], i) => (
            <div key={i} className='relative isolate flex flex-col w-full md:w-[calc(50%-0.5rem)] max-h-dvh gap-4'>
              <h2 className={'flex flex-row w-full gap-3 items-center'}>
                <VscGraphLine size='1.15em' />
                {title}
              </h2>

              <ResultChartItem key={i} chartOptions={chartOptions} />
            </div>
          ))}
        </div>
      </div>
      <div className='clear-both'></div>
    </div>
  )
}

export default ResultChart;
