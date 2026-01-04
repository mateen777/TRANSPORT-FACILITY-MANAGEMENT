import { Component } from '@angular/core';
import { AddRideComponent } from "./features/add-ride/add-ride.component";
import { RideListComponent } from "./features/ride-list/ride-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddRideComponent, RideListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'transport-ficility-management';
}
