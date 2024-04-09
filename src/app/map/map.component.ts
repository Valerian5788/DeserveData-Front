import { AfterViewInit, Component } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  title = 'AngularOSM';
  gare = '';
  onInputChange(value: string): void {
    this.gare = value;
    console.log(this.gare);
    
    // Handle the input change...
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

