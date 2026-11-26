import { dist as RandJSDist, core as RandJSCore } from 'ranjs';
import type { TData, TDataset } from '../types';


export const generateSamples = (
  mu: number,
  lambda: number,
  sampleSize: number,
  seed: number
): TDataset['data'][number] => {
  const srvExpo = new RandJSDist.Exponential(mu).seed(seed);
  const arvExpo = new RandJSDist.Exponential(lambda).seed(seed);

  return {
    services: srvExpo.sample(sampleSize) as number[],
    arrivals: arvExpo.sample(sampleSize) as number[],
    seed
  }
}


export const datasetReplications = (
  replications: number,
  mu: number,
  lambda: number,
  sampleSize: number,
  randSeed: boolean = false
): TDataset['data'] => {
  const dataset: TDataset['data'] = [];

  for (let i = 1; i <= replications; i++) {
    dataset.push(
      generateSamples(
        Number(mu),
        Number(lambda) + i,
        sampleSize,
        randSeed
          ? (Number(mu) + Number(lambda) + i) + RandJSCore.int(i, 100)
          : (Number(mu) + Number(lambda) + i),
      )
    );
  }

  return dataset;
}


export const calcDataset = (data: { services: number[]; arrivals: number[]; }): TData[] => {
  const { services, arrivals } = data;
  const dataset = new Set<TData>();
  let totalArrivals = 0;
  let lastCompleted = 0;

  for (let i = 0; i < arrivals.length; i++) {
    const _arrival = arrivals[i];
    const arrival = parseFloat(_arrival.toFixed(16));
    const service = parseFloat(services[i].toFixed(16));
    totalArrivals += arrival;
    const serviceStart = Math.max(totalArrivals, lastCompleted);
    const completed = serviceStart + service;
    const waite = serviceStart - totalArrivals;
    lastCompleted = completed;

    dataset.add(
      {
        arrival: totalArrivals,
        service: service,
        waite: waite,
        start: serviceStart,
        complete: completed,
      }
    );
  }

  return [...dataset];
}
