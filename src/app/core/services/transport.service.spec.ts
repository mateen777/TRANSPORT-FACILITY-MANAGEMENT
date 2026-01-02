import { TestBed } from '@angular/core/testing';

import { TransportService } from './transport.service';

describe('TransportService', () => {
  let service: TransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportService);
  });

  
  it('should add a ride', () => {
    service.addRide({
      id: '1',
      ownerEmployeeId: 'E1',
      vehicleType: 'Car',
      vehicleNo: 'KA01',
      vacantSeats: 2,
      time: '10:00',
      pickupPoint: 'A',
      destination: 'B',
      bookedEmployeeIds: [],
      createdDate: new Date().toISOString().split('T')[0]
    });

    expect(service.getTodayRides().length).toBe(1);
  });

  it('should not allow owner to book own ride', () => {
    const ride = service.getTodayRides()[0];
    service.bookRide('1', 'E1');
    expect(ride?.vacantSeats).toBe(2);
  });

  it('should reduce seat count when booked', () => {
    service.bookRide('1', 'E2');
    const ride = service.getTodayRides()[0];
    expect(ride?.vacantSeats).toBe(1);
  });
  
});
