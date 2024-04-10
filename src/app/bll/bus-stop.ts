export interface BusStop {
    stop_id: string;
  stop_name: string;
  stop_coordinates: {
    lon: number;
    lat: number;
  };
}
