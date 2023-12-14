import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
})

export class DropdownMenuComponent {
  isDropdownOpen: boolean = false;
}
