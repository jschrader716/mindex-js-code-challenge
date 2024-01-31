import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private matSnackBar: MatSnackBar) { }

  public toastMessage(message: string, action: string = "Close") {
    this.matSnackBar.open(message, action, {
      duration: 3000,
      panelClass: ['toast']
    });
  }
}
