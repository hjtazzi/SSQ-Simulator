/* eslint-disable react-hooks/refs */
import { useCallback, useMemo, useState } from 'react';
import type { RunMatSessionHandle } from 'runmat';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { VscRefresh, VscRunCompact } from "react-icons/vsc";
import { BtnFactory, InputFactory } from '../../factory';
import { classCombiner, executeText } from '../../../utils';
import type { TDataset } from '../../../pages/Home';


type InitializeValues = {
  arrivalRate: number;
  serviceRate: number;
  replications: number;
}

interface InitializingProps {
  sessionRef: React.RefObject<RunMatSessionHandle | null>;
  setDataset: React.Dispatch<React.SetStateAction<TDataset | undefined>>;
}

const Initializing = ({ sessionRef, setDataset }: InitializingProps) => {
  const defaultValues = useMemo<InitializeValues>(() => ({
    arrivalRate: 1,
    serviceRate: 7,
    replications: 10
  }), []);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InitializeValues>({ defaultValues });
  const [running, setRunning] = useState<boolean>(false);
  const [subErrors, setSubErrors] = useState<string | undefined>(undefined);


  const onSubmit = useCallback<SubmitHandler<InitializeValues>>(async (data) => {
    setSubErrors(undefined);
    const session = sessionRef.current;
    if (!session)
      return setSubErrors('RunMat not available!');

    try {
      setRunning(true);
      const { arrivalRate, serviceRate, replications } = data;
      const arrivals_map: number[][] = [];

      const services = await executeText(
        session,
        `srv = exprnd(1/${serviceRate}, [1000, 1]);`,
        "<service_map>",
        "srv"
      );
      if (services instanceof Error)
        return setSubErrors("<service_map>: " + services.message);

      await Promise.all(Array.from({ length: replications }).map(async (_, _i) => {
        const i = _i + 1;
        const arrivals = await executeText(
          session,
          `arv_${i} = exprnd(1/${arrivalRate}, [1000, 1]);`,
          `<arrival_map_${i}>`,
          `arv_${i}`
        );

        if (arrivals instanceof Error)
          return setSubErrors(`<arrival_map_${i}>: ` + arrivals.message);

        arrivals_map.push(arrivals.values);
      }));


      return setDataset({
        services: services.values,
        arrivals: arrivals_map,
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
  }, [sessionRef, setDataset]);


  return (
    <div className='w-full flex flex-col border border-primary-500 rounded-lg m-0 p-4'>
      <div className='w-full flex flex-col gap-2 mb-8'>
        <h2 className={'flex flex-row w-full gap-3 items-center'}>
          <VscRunCompact size='1.15em' />
          Initializing
        </h2>
        <i className={'block w-full h-px bg-primary-500'}></i>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row flex-wrap gap-0'>
        {/* Service Rate */}
        <div className={'text-sm w-full md:w-1/3 md:px-3 mb-6'}>
          <div className={classCombiner(`w-full mb-2 px-1 text-primary-50 text-xs md:text-sm`)}>
            <span className='p-0 m-0'>Service Rate (μ, per time unit)</span>
          </div>

          <InputFactory type='number' placeholder='Service Rate' inputMode='decimal' step={0.01}
            {...register('serviceRate', { required: true, min: 1, max: 100, })} />

          {errors.serviceRate && <div className={classCombiner(`w-full mt-2 px-2 text-red-600 text-xs md:text-sm`)}>
            <span className='p-0 m-0'>{`Service Rate is invalid. (1<=μ<=100)`}</span>
          </div>}
        </div>

        {/* Arrival Rate */}
        <div className={'text-sm w-full md:w-1/3 md:px-3 mb-6'}>
          <div className={classCombiner(`w-full mb-2 px-1 text-primary-50 text-xs md:text-sm`)}>
            <span className='p-0 m-0'>Arrival Rate (λ, per time unit)</span>
          </div>

          <InputFactory type='number' placeholder='Arrival Rate' inputMode='decimal' step={0.01}
            {...register('arrivalRate', { required: true, min: 1, max: 100, })} />

          {errors.arrivalRate && <div className={classCombiner(`w-full mt-2 px-2 text-red-600 text-xs md:text-sm`)}>
            <span className='p-0 m-0'>{`Arrival Rate is invalid. (1<=λ<=100)`}</span>
          </div>}
        </div>

        {/* Replications */}
        <div className={'text-sm w-full md:w-1/3 md:px-3 mb-6'}>
          <div className={classCombiner(`w-full mb-2 px-1 text-primary-50 text-xs md:text-sm`)}>
            <span className='p-0 m-0'>Replications</span>
          </div>

          <InputFactory type='number' placeholder='Replications' inputMode='numeric' step={1}
            {...register('replications', { required: true, min: 1, max: 1000 })} />

          {errors.replications && <div className={classCombiner(`w-full mt-2 px-2 text-red-600 text-xs md:text-sm`)}>
            <span className='p-0 m-0'>{`Replications is invalid. (1<=r<=1,000)`}</span>
          </div>}
        </div>

        {/* Submit */}
        <div className={'text-sm w-full flex items-center justify-center'}>
          <BtnFactory type='submit' disabled={running}
            className='inline-flex w-auto min-w-32 items-center justify-center py-3 gap-2 text-base font-normal leading-none'>
            {running
              ? (<VscRefresh size='1.15em' className='-ml-2 animate-spin' />)
              : (<VscRunCompact size='1.15em' className='-ml-2' />)}
            <span>Run</span>
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
