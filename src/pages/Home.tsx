import { useState } from 'react';

import HeadFactory from '../components/factory/HeadFactory';
import Initializing from '../components/pages/home/Initializing';
import DataChart from '../components/pages/home/DataChart';
import { classCombiner } from '../utils';


export type TDataset = {
  data: {
    services: number[];
    arrivals: number[];
  }[];
  serviceRate: number;
  arrivalRate: number;
}

const Home = () => {
  const [dataset, setDataset] = useState<TDataset | undefined>(undefined);


  return (
    <>
      <HeadFactory title='Simulation' />
      <div className='HomePage h-full w-full overflow-y-auto overflow-x-hidden custom-scrollbar py-2 bg-blurs'>
        <div className={classCombiner('container mx-auto min-h-full flex flex-col items-center gap-6 p-4')}>
          <Initializing setDataset={setDataset} />

          {dataset && (
            dataset.data.map(({ services, arrivals }, i) => (
              <DataChart
                key={`sample_${i}`}
                title={`μ=${Number(dataset.serviceRate)}, ` +
                  `λ=${Number(Number(dataset.arrivalRate) + i)}, ` +
                  `seed=${(Number(dataset.serviceRate) + Number(dataset.arrivalRate)) + i}`}
                services={services}
                arrivals={arrivals}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Home;
