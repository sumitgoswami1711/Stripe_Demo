import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of, BehaviorSubject, Subject } from 'rxjs';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';
import { StorageKey } from '../storage/storage.service';
import { ApiResponse } from 'src/app/Model/models/ApiResponse';
import { BaseApiResponse } from 'src/app/Model/models/BaseApiRespnse';
import { environment } from 'src/app/environments/environment';


const httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private key = CryptoJS.MD5(CryptoJS.enc.Utf8.parse('EA34FF3E-6DF2-4551-B59E-BB81D9564426'));
  private iv = { ...this.key };
  private errorMessage: string = "Something went wrong. Please try again after sometime.";

  connectionEstablished = new EventEmitter<Boolean>();
 
  private connectionIsEstablished = false;
  userId: number | undefined;
  constructor(
    private http: HttpClient
  ) {
    var tokenUserId = localStorage.getItem(StorageKey.currentUserId);
    if (tokenUserId != null) {
      this.userId = parseInt(this.Decrypt(tokenUserId.toString()));
    }
  }

  doGet(apiUrl: String): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders()
    };

    const loginData = localStorage.getItem(StorageKey.authToken);
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    }
    const url = `${environment.BaseURL}${apiUrl}`;
    return this.http.get<ApiResponse>(url, httpOptions);
  }

  doPost(apiUrl: string, postData: any): Observable<BaseApiResponse> {
    const loginData = localStorage.getItem(StorageKey.authToken);
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
    }
    const url = `${environment.BaseURL}${apiUrl}`;
    return this.http.post<ApiResponse>(url, postData, httpOptions);
  }

  doPut(apiUrl: string, putData: any): Observable<BaseApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    let loginData = localStorage.getItem(StorageKey.authToken);
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    }
    const url = `${environment.BaseURL}${apiUrl}`;
    return this.http.put<ApiResponse>(url, putData, httpOptions)
  }

  doDelete(apiUrl: String, idtoDelete: number): Observable<ApiResponse> {
    const loginData = localStorage.getItem(StorageKey.authToken);
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
    }

    const options = {
      headers: httpOptions.headers,
      body: {
        id: idtoDelete
      }
    };

    const url = `${environment.BaseURL}${apiUrl}`;
    return this.http.delete<ApiResponse>(url, options)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log("Log from service : " + message);
  }

  encodeBase64(plainString: string): string {
    return Buffer.from(plainString, "ascii").toString('base64');
  }

  decodeBase64(Base64String: string): string {
    if (Base64String) {
      return Buffer.from(Base64String, 'base64').toString('ascii');
    } else {
      return '""';
    }
  }

  public Encrypt(clearText: string): string {
    this.iv.sigBytes = 8;
    var encrypted = CryptoJS.TripleDES.encrypt(CryptoJS.enc.Utf8.parse(clearText), this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  public Decrypt(cipherText: string): string {
    if (cipherText) {
      this.iv.sigBytes = 8;
      var decrypted = CryptoJS.TripleDES.decrypt(cipherText, this.key,
        {
          keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
      return decrypted.toString(CryptoJS.enc.Utf8);

      // console.log('Encrypted :' + encrypted);
      // console.log('Key :' + encrypted.key);
      // console.log('Salt :' + encrypted.salt);
      // console.log('iv :' + encrypted.iv);
      // console.log('Decrypted : ' + decrypted);
      // console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
    } else {
      return '""';
    }
  }

  updateFCMTokenData(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    let loginData = localStorage.getItem(StorageKey.authToken);
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    }
    const url = `${environment.BaseURL}${'Account/UpdateFCMToken'}`;
    return this.http.post<ApiResponse>(url, data, httpOptions).pipe(
      tap(() => this.log(`doPost success`)),
      catchError(this.handleError<ApiResponse>(
        `doPost data = ${JSON.stringify(data)}`,
        { data: null, message: this.errorMessage, success: false })
      )
    );


    // return this.httpClient.post(`${environment.api_url}UserApi/UpdateFCMToken`, data);
  }

  private data = new BehaviorSubject<any>({});
  selectData = this.data.asObservable();

  setData(value: any) {
    this.data.next(value);
  }



  


}

export enum NotificationType {
  INFO = 1,
  SUCCESS = 2,
  WARNING = 3,
  ERROR = 4,
  SHOW = 5
}
// @Injectable()
// export class canActivate implements CanActivate {
//   constructor(private authService: AuthService, private router: Router, private commonService: CommonService) { }
//   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     await this.authService.getMenuListByRoleId()
//     let _url = state.url;
//     // if (_url.includes("?")) {
//     //   let url = _url.split("?")[0].substring(1).split("/")[0];
//     //   let encryptedid = decodeURIComponent(_url.split("?")[1].split("=")[1]);
//     //   let decryptrdId = this.commonService.Decrypt(encryptedid);
//     //   if (Number(decryptrdId) > 0) {
//     //     let data = this.authService.role_rights.find(x => x.menu_url == "/" + url && x.menu_url != "");
//     //     if (data.is_edit) {
//     //       return true;
//     //     }
//     //   }
//     //   else {
//     //     if (Number(decryptrdId) == 0) {
//     //       let data = this.authService.role_rights.find(x => x.menu_url == "/" + url && x.menu_url != "");
//     //       if (data.is_add) {
//     //         return true;
//     //       }
//     //     }
//     //   }
//     // }
//     // else {
//     //   let data = this.authService.role_rights.find(x => x.menu_url == _url && x.menu_url != "");
//     //   if (data.is_view) {
//     //     return true;
//     //   }
//     // }

//     // let chk_url = this.authService.role_rights.filter(x => x.is_view == true && x.menu_url != "")
//     // this.router.navigate([chk_url[0].menu_url]);
//     return false;

//   }

// }

// #region Date-Format
// @Injectable()
// export class CustomAdapter extends NgbDateAdapter<string> {

//   readonly DELIMITER = '-';

//   fromModel(value: string | null): NgbDateStruct | null {
//     if (value) {
//       const date = value.split(this.DELIMITER);
//       return {
//         day: parseInt(date[0], 10),
//         month: parseInt(date[1], 10),
//         year: parseInt(date[2], 10)
//       };
//     }
//     return null;
//   }

//   toModel(date: NgbDateStruct | null): string | null {
//     return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : null;
//   }
// }

// /**
//  * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
//  */
// @Injectable()
// export class CustomDateParserFormatter extends NgbDateParserFormatter {

//   readonly DELIMITER = '/';

//   parse(value: string): NgbDateStruct | null {
//     if (value) {
//       const date = value.split(this.DELIMITER);
//       return {
//         day: parseInt(date[0], 10),
//         month: parseInt(date[1], 10),
//         year: parseInt(date[2], 10)
//       };
//     }
//     return null;
//   }

//   format(date: NgbDateStruct | null): string {
//     return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : '';
//   }
// }
//#endregion