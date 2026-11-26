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
