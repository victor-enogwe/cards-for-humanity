import { Injectable, NgZone } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) { }

  async notify(message: string, action: string, config?: MatSnackBarConfig) {
    return this.zone.run(() => this.snackBar.open(message, action, { duration: 3000, ...config }))
  }
}
