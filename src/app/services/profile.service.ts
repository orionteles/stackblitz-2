import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profiles: Profile[] = [];
  private nextId = 1;

  getProfiles(): Profile[] {
    return this.profiles;
  }

  getProfile(id: number): Profile | undefined {
    return this.profiles.find(profile => profile.id === id);
  }

  createProfile(profile: Profile): Profile {
    profile.id = this.nextId++;
    this.profiles.push(profile);
    return profile;
  }

  updateProfile(profile: Profile): Profile | undefined {
    const index = this.profiles.findIndex(p => p.id === profile.id);
    if (index !== -1) {
      this.profiles[index] = profile;
      return profile;
    }
    return undefined;
  }

  deleteProfile(id: number): boolean {
    const index = this.profiles.findIndex(p => p.id === id);
    if (index !== -1) {
      this.profiles.splice(index, 1);
      return true;
    }
    return false;
  }
}