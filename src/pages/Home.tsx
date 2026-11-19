import { } from 'react';

import HeadFactory from '../components/factory/HeadFactory';


const Home = () => {
  return (
    <>
      <HeadFactory title='Simulation' />
      <div className='HomePage h-full w-full overflow-y-auto overflow-x-hidden custom-scrollbar py-2 bg-blurs'>
        <div className='container mx-auto min-h-full flex flex-col lg:flex-row gap-4 p-4'>
          
        </div>
      </div>
    </>
  )
}

export default Home;
