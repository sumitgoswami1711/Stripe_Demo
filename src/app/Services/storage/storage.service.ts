import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonService } from '../common/common.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  userName = new Subject<string>();
  profilePicture = new Subject<any>();
  constructor(private commonService: CommonService) {
  }

  getValue(key: string): any {
    return localStorage.getItem(key);
  }

  setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  updateUserDetails(firstName: string | null, lastName: string | null,profilPhoto: string | null) {
    if (firstName != null && lastName != null) {
      let userName = firstName + " " + lastName;  
      this.setValue(StorageKey.userfullname, userName);
      this.setValue(StorageKey.firstName, this.commonService.Encrypt(firstName));
      this.setValue(StorageKey.lastName, this.commonService.Encrypt(lastName));
      this.userName.next(userName);
    }
    if (profilPhoto != null && profilPhoto != "") {
      this.setValue(StorageKey.profilePicture, profilPhoto);
      this.profilePicture.next(profilPhoto);
    }
  }

}

export class StorageKey {
  public static currentUser = 'currentUser';
  public static userfullname = 'userfullname';
  public static authToken = 'authToken';
  public static currentUserId = 'currentUserId';
  public static firstName = 'firstName';
  public static lastName = 'lastName';
  public static isEdited = 'isEdited';
  public static roleId = 'roleId';
  public static profilePicture = 'profilePicture';
  public static fcm_token = 'FCM_Token';
  public static stripeCustomerId = 'stripeCustomerId';
  public static planId = 'planId';
  public static streamChannelName='streamChannelName';
  public static endDate = 'endDate';
}
