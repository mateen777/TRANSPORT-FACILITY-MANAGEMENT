import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Ride } from '../../../core/models/ride.model';
import { Time24to12Pipe } from "../../pipes/time24to12.pipe";
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [Time24to12Pipe],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent {
  @Input() rideData!: Ride
  @Input() showBtn: Boolean = true;
  @Output() buttonAction = new EventEmitter<boolean>();

  protected themeService = inject(ThemeService);

  carEmoji = '&#x1F697;';
  bikeEmoji = '&#128757;';

  get isDisabled():boolean {
    return this.rideData && this.rideData.vacantSeats === 0;
  }

  get currentTheme() {
    return this.themeService.currentTheme;
  }
}
