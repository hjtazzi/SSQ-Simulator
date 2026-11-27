import { dist as RandJSDist, core as RandJSCore } from 'ranjs';
import type { TData, TDataset, TMetrics } from '../types';


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


export const calcDataset = (
  data: {
    services: number[];
    arrivals: number[];
  }
): TData[] => {
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
        arrival: totalArrivals, // t[i]
        start: serviceStart, // A[i]
        service: service, // S[i]
        waite: waite, // D[i]
        complete: completed, // C[i]
      }
    );
  }

  return [...dataset];
}


export const calcMetrics = (dataset: TData[]): TMetrics => {
  const n = dataset.length;
  const T = dataset[n - 1].complete;
  const { sumW, sumWQ, sumS } = calcSums(dataset);

  return {
    n,
    T,
    W: sumW / n,
    WQ: sumWQ / n,
    L: sumW / T,
    LQ: sumWQ / T,
    utilization: sumS / T,
    throughput: n / T
  }
}

const calcSums = (dataset: TData[]) => {
  const sums = { sumW: 0, sumWQ: 0, sumS: 0 }

  dataset.forEach(({ arrival, complete, service, waite }) => {
    sums.sumW += (complete - arrival);
    sums.sumWQ += waite;
    sums.sumS += service;
  });

  return sums;
}


const testMetrics = () => {
  const data = {
    arrivals: [0.4, 1.2, 0.5, 1.7, 0.2, 1.6],
    services: [2.0, 0.7, 0.2, 1.1, 3.7, 0.6],
  }
  const dataset = calcDataset(data);
  const metrics = calcMetrics(dataset);
  const { sumW, sumWQ, sumS } = calcSums(dataset);

  console.log('Sample dataset:\n', dataset);
  console.log('\nPerformance Metrics:');
  console.log(`n = ${metrics.n}`);
  console.log('T =', metrics.T.toFixed(2));
  console.log('W =', `${sumW.toFixed(2)}/${metrics.n} =`, metrics.W.toFixed(2));
  console.log('WQ =', `${sumWQ.toFixed(2)}/${metrics.n} =`, metrics.WQ.toFixed(2));
  console.log('L =', `${sumW.toFixed(2)}/${metrics.T.toFixed(2)} =`, metrics.L.toFixed(2));
  console.log('LQ =', `${sumWQ.toFixed(2)}/${metrics.T.toFixed(2)} =`, metrics.LQ.toFixed(2));
  console.log('E[S] =', `${sumS.toFixed(2)}/${metrics.n} =`, (sumS / metrics.n).toFixed(2));
  console.log('utilization =', `${sumS}/${metrics.T.toFixed(2)} =`, metrics.utilization.toFixed(2));
  console.log('throughput =', `${metrics.n}/${metrics.T.toFixed(2)} =`, metrics.throughput.toFixed(2));
}
testMetrics();
