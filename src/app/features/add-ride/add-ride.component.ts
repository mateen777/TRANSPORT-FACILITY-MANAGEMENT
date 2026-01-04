import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransportService } from '../../core/services/transport.service';
import { ThemeService } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';


@Component({
  selector: 'app-add-ride',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './add-ride.component.html',
  styleUrl: './add-ride.component.scss'
})
export class AddRideComponent {

  protected rideForm!:FormGroup;

  //services or injectables
  private readonly fb = inject(FormBuilder);
  private readonly transportService = inject(TransportService);
  private readonly themeService = inject(ThemeService);
  private readonly toastService = inject(ToastService);


  constructor() {
    
    this.rideForm = this.fb.group({
      employeeId: ['', Validators.required],
      vehicleType: ['Car', Validators.required],
      vehicleNo: ['', Validators.required],
      vacantSeats: [1, [Validators.required, Validators.min(1)]],
      time: ['', Validators.required],
      pickupPoint: ['', Validators.required],
      destination: ['', Validators.required]
    });

  }


  addRide() {
    if (this.rideForm.invalid) return;

    const { 
      employeeId, 
      vehicleType, 
      vehicleNo, 
      vacantSeats, 
      time, 
      pickupPoint, 
      destination 
    } = this.rideForm.value;

    const payload = {
      id: crypto.randomUUID(),
      ownerEmployeeId: employeeId!,
      vehicleType: vehicleType! as 'Car' | 'Bike',
      vehicleNo: vehicleNo!,
      vacantSeats: vacantSeats!,
      time: time!,
      pickupPoint: pickupPoint!,
      destination: destination!,
      bookedEmployeeIds: [],
      createdDate: new Date().toISOString().split('T')[0]
    };

    this.transportService.addRide(payload);
  
    this.rideForm.reset({ vehicleType: 'Car', vacantSeats: 1 });

    this.toastService.success('Ride is Created successfully')
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get currentTheme() {
    return this.themeService.currentTheme ;
  }
}
