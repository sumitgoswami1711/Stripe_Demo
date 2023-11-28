import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { StorageKey, StorageService } from 'src/app/Services/storage/storage.service';

import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private httpClient: HttpClient,
    private storageService: StorageService,
    private router: Router,
 ) { }

  login(apiUrl: String, data: any): Observable<any> {
    return this.httpClient.post(`${environment.BaseURL}${apiUrl}`, data);
  }

  logout() {
    this.clearLocalStorage();
  }

  clearLocalStorage(){
    this.storageService.removeValue(StorageKey.currentUser);
    this.storageService.removeValue(StorageKey.userfullname);
    this.storageService.removeValue(StorageKey.authToken);
    this.storageService.removeValue(StorageKey.currentUserId);
    this.storageService.removeValue(StorageKey.firstName);
    this.storageService.removeValue(StorageKey.lastName);
    this.storageService.removeValue(StorageKey.isEdited);
    this.storageService.removeValue(StorageKey.roleId);
    this.storageService.removeValue(StorageKey.fcm_token);
    this.storageService.removeValue(StorageKey.profilePicture);
    this.storageService.removeValue(StorageKey.planId);
    this.storageService.removeValue(StorageKey.stripeCustomerId);
    this.storageService.removeValue(StorageKey.streamChannelName);
  }

  isLoggedIn(): boolean {
    let token = this.storageService.getValue(StorageKey.authToken);
    let currentUser = this.storageService.getValue(StorageKey.currentUserId);
    if (token && currentUser)
      return true;
    else
      return false;
  }

  getAccessToken(): any {
    let token = this.storageService.getValue(StorageKey.authToken);
    return token ? token : null;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.getValue(StorageKey.authToken)) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });

      return false;
    }
  }
}
