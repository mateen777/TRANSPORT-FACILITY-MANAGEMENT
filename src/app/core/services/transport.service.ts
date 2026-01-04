import { Injectable } from '@angular/core';
import { Ride } from '../models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

   private rides: Ride[] = [];

  addRide(ride: Ride) {
    this.rides.push(ride);
  }

  getRides() {
    return this.rides;
  }

  getTodayRides() {
    const today = new Date().toISOString().split('T')[0];
    return this.rides.filter(r => r.createdDate === today);
  }

  bookRide(rideId: string, employeeId: string) {
    const ride = this.rides.find(r => r.id === rideId);
    if (!ride) return;

    if (
      ride.ownerEmployeeId === employeeId ||
      ride.bookedEmployeeIds.includes(employeeId) ||
      ride.vacantSeats === 0
    ) {
      return;
    }

    ride.bookedEmployeeIds.push(employeeId);
    ride.vacantSeats--;
  }

  isTimeMatched(rideTime: string, selectedTime: string): boolean {
    const toMinutes = (time: string) => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };

    const diff = Math.abs(
      toMinutes(rideTime) - toMinutes(selectedTime)
    );

    return diff <= 60;
  }

}
