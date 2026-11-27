import { useMemo, useState } from 'react';

import HeadFactory from '../components/factory/HeadFactory';
import Initializing from '../components/pages/home/Initializing';
import DataChart from '../components/pages/home/DataChart';
import { classCombiner } from '../utils';
import { calcDataset } from '../utils/datasets';
import type { TData, TDataset } from '../types';
import ResultChart from '../components/pages/home/ResultChart';


const Home = () => {
  const [samples, setSamples] = useState<TDataset | undefined>(undefined);
  const datasets = useMemo<TData[][]>(() => {
    const _dataset: TData[][] = [];
    if (!samples) return _dataset;

    for (let i = 0; i < samples.data.length; i++) {
      const _sample = samples.data[i];
      const _data = calcDataset(_sample);
      _dataset.push(_data);
    }

    return _dataset;
  }, [samples]);


  return (
    <>
      <HeadFactory title='Simulation' />
      <div className='HomePage h-full w-full overflow-y-auto overflow-x-hidden custom-scrollbar py-2 bg-blurs'>
        <div className={classCombiner('container mx-auto min-h-full flex flex-col items-center gap-6 p-4')}>
          <Initializing setDataset={setSamples} />

          {samples && (
            <ResultChart
              datasets={datasets}
              serviceRate={Number(samples.serviceRate)}
              arrivalRate={Number(samples.arrivalRate)}
            />
          )}

          {samples && (
            datasets.map((data, i) => (
              <DataChart
                key={`dataset_${i}`}
                title={
                  `μ=${Number(samples.serviceRate)}, ` +
                  `λ=${Number(samples.arrivalRate) + i}, ` +
                  `seed=${samples.data[i].seed}`
                }
                dataset={data}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Home;
