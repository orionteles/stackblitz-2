import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profiles = this.profileService.getProfiles();
  }

  deleteProfile(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.profileService.deleteProfile(id)) {
          Swal.fire('Deleted!', 'Profile has been deleted.', 'success');
          this.profiles = this.profileService.getProfiles();
        }
      }
    });
  }
}