import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input('type') alertType: string = '';
  @Input('title') msgTitle: string = '';
  @Input('body') msgBody: string = '';
}
