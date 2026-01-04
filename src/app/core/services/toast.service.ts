import { Injectable, Injector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ToastConfig } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
constructor(
    private overlay: Overlay,
    private injector: Injector
  ) {}

  show(config: ToastConfig) {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
        .global()
        .top('20px')
        .right('20px'),
      hasBackdrop: false,
      panelClass: 'toast-overlay'
    });

    const toastPortal = new ComponentPortal(ToastComponent);
    const componentRef = overlayRef.attach(toastPortal);

    componentRef.instance.config = {
      duration: 3000,
      type: 'info',
      ...config
    };

    setTimeout(() => overlayRef.dispose(), componentRef.instance.config.duration);
  }

  success(msg: string) {
    this.show({ message: msg, type: 'success' });
  }

  error(msg: string) {
    this.show({ message: msg, type: 'error' });
  }

  info(msg: string) {
    this.show({ message: msg, type: 'info' });
  }

  warning(msg: string) {
    this.show({ message: msg, type: 'warning' });
  }
}
