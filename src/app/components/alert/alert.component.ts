import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  closeAlert() {
    this.showAlert = !this.showAlert;
  }
  @Input('type') alertType: string = '';
  @Input('title') msgTitle: string = '';
  @Input('body') msgBody: string = '';
  showAlert: boolean = true;

}
