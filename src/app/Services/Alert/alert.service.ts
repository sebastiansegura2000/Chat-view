import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  confirmAlert(title: string, message: string, confirmButtonText: string = 'Yes', cancelButtonText: string = 'No'): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  successAlert(title: string, message: string): void {
    Swal.fire(title, message, 'success');
  }

  errorAlert(title: string, message: string): void {
    Swal.fire(title, message, 'error');
  }

  infoAlert(title: string, message: string): void {
    Swal.fire(title, message, 'info');
  }

  confirmationAlert(title: string, message: string): Promise<boolean> {
    return this.confirmAlert(title, message, 'Confirm', 'Cancel');
  }
}
