import { useCallback, useMemo, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { VscRefresh, VscRunCompact } from "react-icons/vsc";

import { BtnFactory, InputFactory } from '../../factory';
import { classCombiner, datasetReplications } from '../../../utils';
import type { TDataset } from '../../../types';


type InitializeValues = {
  arrivalRate: number;
  serviceRate: number;
  replications: number;
  sampleSize: number;
}

interface InitializingProps {
  setDataset: React.Dispatch<React.SetStateAction<TDataset | undefined>>;
}

const Initializing = ({ setDataset }: InitializingProps) => {
  const defaultValues = useMemo<InitializeValues>(() => ({
    arrivalRate: 1,
    serviceRate: 7,
    replications: 10,
    sampleSize: 1000
  }), []);
  const {
    register,
    handleSubmit,
    setValues,
    formState: { errors }
  } = useForm<InitializeValues>({ defaultValues });
  const [running, setRunning] = useState<boolean>(false);
  const [subErrors, setSubErrors] = useState<string | undefined>(undefined);
  const [randSeed, setRandSeed] = useState<boolean>(false);


  const onSubmit = useCallback<SubmitHandler<InitializeValues>>(async (data) => {
    setSubErrors(undefined);
    setRunning(true);

    try {
      const { serviceRate, arrivalRate, sampleSize, replications } = data;
      const dataset = datasetReplications(replications, serviceRate, arrivalRate, sampleSize, randSeed);

      console.log(dataset);
      return setDataset({
        data: dataset,
        serviceRate,
        arrivalRate,
      });
    } catch (error) {
      if (error instanceof Error)
        return setSubErrors(error.message);
      return setSubErrors('unknown error!');
    } finally {
      setRunning(false);
    }
  }, [setDataset, randSeed]);


  return (
    <div className='w-full flex flex-col border border-primary-500 rounded-lg m-0 p-4'>
      <div className='w-full flex flex-col gap-2 mb-4'>
        <h2 className={'flex flex-row w-full gap-3 items-center'}>
          <VscRunCompact size='1.15em' />
          Initializing
        </h2>
      </div>

      <i className={'block w-full h-px bg-primary-500 mb-6'}></i>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row flex-wrap gap-0'>
        {/* Service Rate */}
        <div className={'text-sm w-full md:w-1/4 md:px-3 mb-6'}>
          <div className={classCombiner(`w-full mb-2 px-1 text-primary-50 text-xs md:text-sm line-clamp-1`)}>
            <span className='p-0 m-0 line-clamp-1'>Service Rate (μ, per time unit)</span>
          </div>

          <InputFactory type='number' placeholder='Service Rate' inputMode='decimal' step={0.01}
            {...register('serviceRate', { required: true, min: 1, max: 100, })} />

          {errors.serviceRate && <div className={classCombiner(`w-full mt-2 px-2 text-red-600 text-xs md:text-sm`)}>
            <span className='p-0 m-0 line-clamp-1'>{`Service Rate is invalid. (1<=μ<=100)`}</span>
          </div>}
        </div>

        {/* Arrival Rate */}
        <div className={'text-sm w-full md:w-1/4 md:px-3 mb-6'}>
          <div className={classCombiner(`w-full mb-2 px-1 text-primary-50 text-xs md:text-sm line-clamp-1`)}>
            <span className='p-0 m-0 line-clamp-1'>Arrival Rate (λ, per time unit)</span>
          </div>

          <InputFactory type='number' placeholder='Arrival Rate' inputMode='decimal' step={0.01}
            {...register('arrivalRate', { required: true, min: 1, max: 100, })} />

          {errors.arrivalRate && <div className={classCombiner(`w-full mt-2 px-2 text-red-600 text-xs md:text-sm`)}>
            <span className='p-0 m-0 line-clamp-1'>{`Arrival Rate is invalid. (1<=λ<=100)`}</span>
          </div>}
        </div>

        {/* Sample Size */}
        <div className={'text-sm w-full md:w-1/4 md:px-3 mb-6'}>
          <div className={classCombiner(`w-full mb-2 px-1 text-primary-50 text-xs md:text-sm line-clamp-1`)}>
            <span className='p-0 m-0 line-clamp-1'>Sample Size (n)</span>
          </div>

          <InputFactory type='number' placeholder='Sample Size' inputMode='numeric' step={10}
            {...register('sampleSize', { required: true, min: 10, max: 1000 })} />

          {errors.sampleSize && <div className={classCombiner(`w-full mt-2 px-2 text-red-600 text-xs md:text-sm`)}>
            <span className='p-0 m-0 line-clamp-1'>{`Size is invalid. (10<=n<=1,000)`}</span>
          </div>}
        </div>

        {/* Replications */}
        <div className={'text-sm w-full md:w-1/4 md:px-3 mb-6'}>
          <div className={classCombiner(`w-full mb-2 px-1 text-primary-50 text-xs md:text-sm line-clamp-1`)}>
            <span className='p-0 m-0 line-clamp-1'>Replications</span>
          </div>

          <InputFactory type='number' placeholder='Replications' inputMode='numeric' step={1}
            {...register('replications', { required: true, min: 1, max: 100 })} />

          {errors.replications && <div className={classCombiner(`w-full mt-2 px-2 text-red-600 text-xs md:text-sm`)}>
            <span className='p-0 m-0 line-clamp-1'>{`Replications is invalid. (1<=r<=100)`}</span>
          </div>}
        </div>

        {/* Submit */}
        <div className={'text-sm w-full flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center'}>
          <BtnFactory type='submit' disabled={running} onClick={(e) => { setRandSeed(false); return e; }}
            className='inline-flex w-full md:w-auto min-w-32 items-center justify-center py-3 gap-2 text-base font-normal leading-none'>
            {running
              ? (<VscRefresh size='1.15em' className='-ml-2 animate-spin' />)
              : (<VscRunCompact size='1.15em' className='-ml-2' />)}
            <span>Run</span>
          </BtnFactory>

          <BtnFactory type='submit' disabled={running} onClick={(e) => { setRandSeed(true); return e; }}
            className='inline-flex w-full md:w-auto min-w-32 items-center justify-center py-3 gap-2 text-base font-normal leading-none'>
            {running
              ? (<VscRefresh size='1.15em' className='-ml-2 animate-spin' />)
              : (<VscRunCompact size='1.15em' className='-ml-2' />)}
            <span>Run RandSeed</span>
          </BtnFactory>

          <BtnFactory type='submit' disabled={running} onClick={(e) => { setRandSeed(false); setValues(defaultValues); return e; }}
            className='inline-flex w-full md:w-auto min-w-32 items-center justify-center py-3 gap-2 text-base font-normal leading-none'>
            <VscRefresh size='1.15em' className='-ml-2' />
            <span>Reset</span>
          </BtnFactory>
        </div>

        {subErrors && <div className={'text-sm w-full flex items-center justify-center'}>
          <div className={classCombiner(`mt-2 px-2 text-red-600 text-xs md:text-sm`)}>
            <span className='p-0 m-0'>{subErrors}</span>
          </div>
        </div>}
      </form>
    </div>
  )
}

export default Initializing;
