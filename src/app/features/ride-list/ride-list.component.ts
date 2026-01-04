import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransportService } from '../../core/services/transport.service';
import { Ride } from '../../core/models/ride.model';
import { RideCardComponent } from "../../shared/components/ride-card/ride-card.component";
import {Dialog, DialogModule } from '@angular/cdk/dialog';
import { BookridepopupComponent } from '../../shared/components/bookridepopup/bookridepopup.component';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RideCardComponent, DialogModule],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss'
})
export class RideListComponent {
  selectedTime = '';
  vehicleType: 'All' | 'Bike' | 'Car' = 'All';

  public transportService = inject(TransportService);
  public dialog = inject(Dialog);
  public toastService = inject(ToastService);

  filteredRides(): Ride[] {

    // Vehicle Type filter
    return this.transportService.getTodayRides().filter(ride => {
      if (this.vehicleType !== 'All' && ride.vehicleType !== this.vehicleType) {
        return false;
      }

      // When Time filter is empty
      if (!this.selectedTime) {
        return true;
      }

      // Time filter (only when selected)
      return this.transportService.isTimeMatched(ride.time, this.selectedTime);
    });
  }


  openDialog(rideId: string,rideData:Ride): void {

    const dialogRef = this.dialog.open(BookridepopupComponent, {
      data: { rideData }
    });
    
    dialogRef.closed.subscribe((employeeId:any)=>{

      if (employeeId) {
        const ride = rideData;

          if ( ride?.ownerEmployeeId === employeeId) {
            this.toastService.error("You can’t book your own ride.")
            return;
          }
          
          if (ride?.bookedEmployeeIds.includes(employeeId)) {
            this.toastService.error("You’ve already booked this ride.")
            return;
          }
          
          if (ride?.vacantSeats === 0) {
            this.toastService.info("This ride is fully booked.")
            return;
          }

        this.bookRide(rideId,employeeId);
      }
    })
  }

  bookRide(rideId: string,employeeId:string) {
    this.transportService.bookRide(rideId, employeeId);
    this.toastService.success('Ride is booked successfully');
  }
}
