import { AfterViewInit, Component } from '@angular/core';
import L, * as Leaflet from 'leaflet';
import { OpenapiPmrService } from '../bll/openapi-pmr.service';
import { Gares } from '../bll/gares';
import { Facilities } from '../bll/facilities';

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
  facilitiesData!: Facilities[];
  nbArret!: number;
  radius!: number;
  markers: { [key: string]: L.Marker } = {};

  ngOnInit() {
    this.openapiPmrService.getGares().subscribe((gares: Gares[]) => {
      this.gares = gares;
      this.addMarkersToMap();
    })
    this.openapiPmrService.getFacilitiesData().subscribe((data: Facilities[]) => {
      this.facilitiesData = data;
      this.addMarkersToMap();
    });
  }
  
  onMapReady(map: L.Map) {
    this.map = map;
    L.Icon.Default.imagePath = 'assets/images/';
  }
  
  addMarkersToMap() {
    if (this.map && this.gares && this.facilitiesData) {
      this.gares.forEach(gare => {
        const marker = L.marker([gare.latitude, gare.longitude]).addTo(this.map);
        this.markers[gare.name] = marker; // store the marker
        const gareFacilities = this.facilitiesData.find(data => data.station == gare.name);
        const facilitiesInfo = gareFacilities ? gareFacilities.facilities.map(facility => `<li>${facility.value}</li>`).join('') : 'No facilities data available';

          marker.bindPopup(`<b>${gare.name}</b><br>Latitude: ${gare.latitude}<br>Longitude: ${gare.longitude}<br>Facilities:<ul>${facilitiesInfo}</ul>`, {
            offset: new Leaflet.Point(0, 0)
          }); 
      });
    }
  }

  
  updatePopupContent(marker: L.Marker, gare: Gares, radius: number, nbArret: number) {
    const gareFacilities = this.facilitiesData.find(data => data.station == gare.name);
    const facilitiesInfo = gareFacilities ? gareFacilities.facilities.map(facility => `<li>${facility.value}</li>`).join('') : 'No facilities data available';
    marker.bindPopup(`<b>${gare.name}</b><br>Latitude: ${gare.latitude}<br>Longitude: ${gare.longitude}<br>Nombre d'arrets de bus dans une zone de ${radius}km : ${nbArret}<br>Facilities:<ul>${facilitiesInfo}</ul>`);
  }
  
  onInputChange(event: { value: string, radius: number }): void {
    
    this.gare = this.gares.find(gares => gares.name === event.value)!; 
    
    this.openapiPmrService.getBusStop(event.radius,this.gare.longitude, this.gare.latitude).subscribe(response => {
      this.nbArret = response['total des arrets dans la zone'];
      this.radius = event.radius;
      const marker = this.markers[this.gare.name];
      // Assuming `marker` is the marker for the current gare
      this.updatePopupContent(marker, this.gare, this.radius, this.nbArret);
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
  selectedOption: string = '';
  onMenuChange(event: Event) {
    
    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;
    if (this.selectedOption === 'showBusStop') {
      console.log('showBusStop');      
    }
    if (this.selectedOption === 'showHauteurQuai') {
      console.log('showHauteurQuai');
    }
    if (this.selectedOption === '') {
      console.log('rien');
    }
    // Add more conditions as needed for other options
  }
  
}





