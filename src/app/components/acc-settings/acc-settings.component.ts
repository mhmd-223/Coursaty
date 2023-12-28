import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-acc-settings',
  templateUrl: './acc-settings.component.html',
  styleUrl: './acc-settings.component.css'
})
export class AccSettingsComponent implements OnInit {

  user: User | null = null

  constructor(private authServ: AuthService, private userServ: UserService) { }

  ngOnInit(): void {
    this.user = this.authServ.getUserData()
  }

  updateAcc(form: NgForm) {
    const {
      fullName,
      email,
      bio,
      imagePath
    } = form.value

    const updated: any = {
      id: this.user?.id,
    }


    if (fullName) updated.fullName = fullName
    if (email) updated.email = email
    if (bio) updated.bio = bio
    if (imagePath) updated.image = imagePath

    const sizeOfUpdatedObject = Object.keys(updated).length;

    if (sizeOfUpdatedObject > 1) {
      this.userServ.updateInfo(updated).subscribe(
        () => {alert('Your info is updated successfully'); this.authServ.refetch()}
      );
    } else {
      alert('No info to send');
    }

  }
}
