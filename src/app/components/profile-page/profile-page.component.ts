import { Component, OnInit } from '@angular/core';
import { USER } from '../../../static_data';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;

  constructor (private authServ: AuthService) {}
  
  ngOnInit(): void {
    this.user = this.authServ.getUserData()
  }
  
}
