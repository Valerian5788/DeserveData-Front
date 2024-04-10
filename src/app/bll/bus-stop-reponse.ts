import { BusStop } from "./bus-stop";

export interface BusStopResponse {
    arret_autour_zone: BusStop[];
    'total des arrets dans la zone': number;
  }