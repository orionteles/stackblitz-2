import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { ProfileListComponent } from './app/components/profile/profile-list.component';
import { ProfileFormComponent } from './app/components/profile/profile-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class App {
  name = 'Angular';
}

const routes = [
  { path: '', component: DashboardComponent },
  { path: 'profiles', component: ProfileListComponent },
  { path: 'profiles/new', component: ProfileFormComponent },
  { path: 'profiles/edit/:id', component: ProfileFormComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));