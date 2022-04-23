import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AlertDialogComponent } from 'src/app/shared/component/alert-dialog/alert-dialog.component';
import { Trucks, TrucksResponse } from './../../models/TrucksResponse';

@Component({
  selector: 'app-truck-map',
  templateUrl: './truck-map.component.html',
  styleUrls: ['./truck-map.component.css']
})
export class TruckMapComponent implements OnInit {

  mapOptions: google.maps.MapOptions = {
    center: { lat: 23.7045863, lng: 90.4275232 },
    zoom: 14,
    fullscreenControl: true
  }

  truckResponse: TrucksResponse;
  truckColl: Trucks[] = [];
  markers: any = [];
  center: { lat: 23.7045863, lng: 90.4275232 };

  constructor(
    private authService: AuthService,
    private alertDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTruckStandsApi();
  }

  addMarkers() {
    this.truckColl.forEach((truck, index) => {

      let marker = {
        position: {
          lat: truck.latitude,
          lng: truck.longitude
        },
        label: {
          color: 'red',
          text: truck.nameBn,
        },
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        title: truck.name?.toString(),
        options: { animation: google.maps.Animation.BOUNCE },
      };
      this.markers.push(marker);
    });
  }

  openInfo(marker: any) {
    console.log(JSON.stringify(marker));
    this.showAlertDialog(marker.title, marker.label.text)
  }


  getTruckStandsApi() {
    this.authService.truckStands().subscribe(trucks => {
      if (trucks) {
        this.truckResponse = trucks as TrucksResponse;
        if (this.truckResponse.success) {
          this.truckColl = this.truckResponse.data as Trucks[];
          this.addMarkers();
        }
        else {
          this.showAlertDialog("error", this.truckResponse.message);
        }
      }

    });

  }


  showAlertDialog(status: string, msg: string) {
    this.alertDialog.open(AlertDialogComponent, { data: { type: status, data: msg } })
  }


}
