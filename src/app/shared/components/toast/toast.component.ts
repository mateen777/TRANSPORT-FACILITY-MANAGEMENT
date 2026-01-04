import { Component, Input } from '@angular/core';
import { ToastConfig } from '../../../core/models/toast.model';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() config!: ToastConfig;
  
}
