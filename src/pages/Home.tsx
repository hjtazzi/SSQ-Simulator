import { useState } from 'react';

import useRunMat from '../hooks/useRunMat';
import LoadingFallback from '../components/shared/LoadingFallback';
import HeadFactory from '../components/factory/HeadFactory';
import ErrorRunningMat from '../components/pages/home/ErrorRunningMat';
import Initializing from '../components/pages/home/Initializing';
import DataChart from '../components/pages/home/DataChart';
import { classCombiner } from '../utils';


export type TDataset = {
  services: number[];
  arrivals: number[][];
  serviceRate: number;
  arrivalRate: number;
}

const Home = () => {
  const { isLoading, isRunning, sessionRef } = useRunMat({});
  const [dataset, setDataset] = useState<TDataset | undefined>(undefined);


  if (isLoading)
    return <LoadingFallback />

  return (
    <>
      <HeadFactory title='Simulation' />
      <div className='HomePage h-full w-full overflow-y-auto overflow-x-hidden custom-scrollbar py-2 bg-blurs'>
        <div className={classCombiner('container mx-auto min-h-full flex flex-col items-center gap-6 p-4', !isRunning && 'justify-center')}>
          {!isRunning
            ? (<ErrorRunningMat />)
            : (<>
              <Initializing sessionRef={sessionRef} setDataset={setDataset} />

              {dataset && (
                dataset.arrivals.map((arrival, i) =>
                  <DataChart
                    key={`λ_${i}`}
                    title={`λ${Number(Number(dataset.arrivalRate) + i)}`}
                    services={dataset.services}
                    arrivals={arrival}
                  />)
              )}
            </>)}
        </div>
      </div>
    </>
  )
}

export default Home;
