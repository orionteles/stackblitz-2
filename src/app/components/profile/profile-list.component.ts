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
  template: `
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Profiles</h1>
            </div>
          </div>
        </div>
      </div>
      <section class="content">
        <div class="container-fluid">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Profile List</h3>
              <button class="btn btn-primary" [routerLink]="['/profiles/new']">
                New Profile
              </button>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th class="table-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let profile of profiles">
                    <td>{{profile.id}}</td>
                    <td>{{profile.name}}</td>
                    <td>
                      <button class="btn btn-sm btn-info" [routerLink]="['/profiles/edit', profile.id]">
                        Edit
                      </button>
                      <button class="btn btn-sm btn-danger" (click)="deleteProfile(profile.id!)">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
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