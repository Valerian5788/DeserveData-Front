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
      this.addMarkersToMap();
    })
  }
  
  onMapReady(map: L.Map) {
    this.map = map;
    L.Icon.Default.imagePath = 'assets/images/';
  }
  
  addMarkersToMap() {
    if (this.map && this.gares) {
      this.gares.forEach(gare => {
        const marker = L.marker([gare.latitude, gare.longitude]).addTo(this.map);
        marker.bindPopup(`<b>${gare.name}</b><br>Latitude: ${gare.latitude}<br>Longitude: ${gare.longitude}`, {
          offset: new Leaflet.Point(0, 0)
        });
      });
    }
  }
  onInputChange(event: { value: string, radius: number }): void {
    console.log('inputchange', event.value);
    console.log('inputchange', event.radius);
    
    this.gare = this.gares.find(gares => gares.name === event.value)!; 
    console.log(this.gare.name, this.gare.longitude, this.gare.latitude);
    
    this.openapiPmrService.getBusStop(event.radius,this.gare.longitude, this.gare.latitude).subscribe(response => {
      console.log(response);
    });
  
    // Set the view of the map to the longitude and latitude of the gare and zoom in
    this.map.setView([this.gare.latitude, this.gare.longitude], 13);
  }

  getLayers = (): Leaflet.Layer[] => {
    return [
      new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      } as Leaflet.TileLayerOptions)
    ] as Leaflet.Layer[];
  };

  options: Leaflet.MapOptions = {
    layers: this.getLayers(),
    zoom: 12,
    center: new Leaflet.LatLng(50.8466, 4.3528),
    maxBounds: new Leaflet.LatLngBounds(
      new Leaflet.LatLng(49.49667452747045, 2.5419924999999995), // Southwest corner of Belgium
      new Leaflet.LatLng(51.50514408717694, 6.403320312499999)  // Northeast corner of Belgium
    ),
    minZoom: 7  // Prevent the user from zooming out too far
  };
}


