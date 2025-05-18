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
  template: `
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">{{isEditing ? 'Edit' : 'New'}} Profile</h1>
            </div>
          </div>
        </div>
      </div>
      <section class="content">
        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
              <form (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" id="name" [(ngModel)]="profile.name" name="name" required>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-secondary" [routerLink]="['/profiles']">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
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