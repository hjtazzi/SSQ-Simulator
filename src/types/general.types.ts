export type TDataset = {
  data: {
    seed: number;
    services: number[];
    arrivals: number[];
  }[];
  serviceRate: number;
  arrivalRate: number;
}


export type TData = {
  arrival: number;
  service: number;
  waite: number;
  start: number;
  complete: number;
}


export type TChartData = {
  arrivals: number[];
  services: number[];
  waitings: number[];
}


export type TMetrics = {
  n: number;
  T: number;
  W: number;
  WQ: number;
  L: number;
  LQ: number;
  utilization: number;
  throughput: number;
}
