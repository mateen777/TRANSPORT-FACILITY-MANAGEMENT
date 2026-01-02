export interface Ride {
  id: string;
  ownerEmployeeId: string;
  vehicleType: 'Bike' | 'Car';
  vehicleNo: string;
  vacantSeats: number;
  time: string; // HH:mm
  pickupPoint: string;
  destination: string;
  bookedEmployeeIds: string[];
  createdDate: string; // yyyy-mm-dd
}