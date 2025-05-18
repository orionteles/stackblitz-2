import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  profile: Profile = { name: '' };
  isEditing = false;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      const existingProfile = this.profileService.getProfile(+id);
      if (existingProfile) {
        this.profile = { ...existingProfile };
      }
    }
  }

  onSubmit() {
    if (this.isEditing) {
      this.profileService.updateProfile(this.profile);
      Swal.fire('Success', 'Profile updated successfully', 'success');
    } else {
      this.profileService.createProfile(this.profile);
      Swal.fire('Success', 'Profile created successfully', 'success');
    }
    this.router.navigate(['/profiles']);
  }
}