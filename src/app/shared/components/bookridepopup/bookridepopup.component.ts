import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { RideCardComponent } from "../ride-card/ride-card.component";
import { Ride } from '../../../core/models/ride.model';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-bookridepopup',
  standalone: true,
  imports: [FormsModule, RideCardComponent],
  templateUrl: './bookridepopup.component.html',
  styleUrl: './bookridepopup.component.scss'
})
export class BookridepopupComponent {

  protected rideData!:Ride;
  protected employeeId = '';
  protected themeService = inject(ThemeService);

  constructor(public dialogRef: DialogRef<string>) {

    this.rideData = this.dialogRef.config.data.rideData;
    
  }

  get isDisabled():boolean {
    return this.rideData && this.rideData.vacantSeats === 0;
  }

  get currentTheme() {
    return this.themeService.currentTheme;
  }
}
