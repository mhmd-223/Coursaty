import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { NavigatorService } from '../../services/navigator.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;

  constructor(private authServ: AuthService, private navigator: NavigatorService, private userServ: UserService) { }

  ngOnInit(): void {
    this.navigator.executeOnChange(
      () => {
        this.navigator.getRouteQueryParams().subscribe(
          params => {
            const id = +params['id'];
            if (id)
              this.userServ.getUserById(id).subscribe(
                res => this.user = res.data as User
              )
            else
              this.user = this.authServ.getUserData();
          }

        )
      }
    )
  }

}
