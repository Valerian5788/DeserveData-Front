import { AfterViewInit, Component } from '@angular/core';
import L, * as Leaflet from 'leaflet';
import { OpenapiPmrService } from '../bll/openapi-pmr.service';
import { Gares } from '../bll/gares';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent{
  constructor(private openapiPmrService: OpenapiPmrService) { }
  title = 'AngularOSM';
  gares!: Gares[];
  gare!: Gares;
  map!: L.Map;
  ngOnInit() {
    this.openapiPmrService.getGares().subscribe((gares: Gares[]) => {
      this.gares = gares;  
    })
  }
  onMapReady(map: L.Map) {
    this.map = map;
    L.Icon.Default.imagePath = 'assets/images/';
  }
  onInputChange(value: string): void {
    console.log('inputchange', value);
    this.gare = this.gares.find(gares => gares.name === value)!; 
    console.log(this.gare.name, this.gare.longitude, this.gare.latitude);
  
    // Set the view of the map to the longitude and latitude of the gare and zoom in
    this.map.setView([this.gare.latitude, this.gare.longitude], 13);
  
    // Add a marker at the longitude and latitude of the gare
    L.marker([this.gare.latitude, this.gare.longitude]).addTo(this.map);
  }

  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 12,
    center: new Leaflet.LatLng(50.8466, 4.3528)
  };
  
  
}

export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as Leaflet.TileLayerOptions),
    ...getMarkers(),
    ...getRoutes()
  ] as Leaflet.Layer[];
};

export const getMarkers = (): Leaflet.Marker[] => {
  return [
    new Leaflet.Marker(new Leaflet.LatLng(50.9, 4.3528), {
      icon: new Leaflet.Icon({
        iconSize: [50, 41],
        iconAnchor: [25, 38],
        iconUrl: 'assets/blue-marker.svg'
      }),
      title: 'Workspace'
    } as Leaflet.MarkerOptions)
    .bindPopup('This is the Workspace marker.', {
      offset: new Leaflet.Point(0, -30) // Adjust this value as needed
    })
    .on('click', () => {
      console.log('Workspace marker clicked');
    }),
    new Leaflet.Marker(new Leaflet.LatLng(50.86564, 4.3528), {
      icon: new Leaflet.Icon({
        iconSize: [50, 41],
        iconAnchor: [25, 38],
        iconUrl: 'assets/red-marker.svg',
      }),
      title: 'Riva'
    } as Leaflet.MarkerOptions)
    .bindPopup('This is the Riva marker.', {
      offset: new Leaflet.Point(0, -30) // Adjust this value as needed
    })
    .on('click', () => {
      console.log('Riva marker clicked');
    }),
  ] as Leaflet.Marker[];
};

export const getRoutes = (): Leaflet.Polyline[] => {
  return [
    new Leaflet.Polyline([
      new Leaflet.LatLng(50.9, 4.3528),
      new Leaflet.LatLng(50.86564, 4.3528),
    ] as Leaflet.LatLng[], {
      color: '#0d9148'
    } as Leaflet.PolylineOptions)
  ] as Leaflet.Polyline[];
};

