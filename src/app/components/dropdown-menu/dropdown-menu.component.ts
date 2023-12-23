import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
})

export class DropdownMenuComponent {

  constructor(private authServ: AuthService) { }
  logout() {
    this.authServ.logout();
  }

  isDropdownOpen: boolean = false;
}
