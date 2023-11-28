import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { ApiUrlHelper } from 'src/app/Common/api-url-helper/apiUrlHelper';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private commonService : CommonService,
    private apiUrl : ApiUrlHelper) { }

    InitializeCustomerSetupandSubscribe(subscriptionModel: any) {
      return new Promise((resolve,reject) => {
        const apiUrl = this.apiUrl.apiUrl.subscription.CreateCustomerandSubscription;
        this.commonService.doPost(apiUrl,subscriptionModel).pipe().subscribe({
          next: async(data) =>{
            if(data && data.success){
              resolve(data);
            }
          },
          error: (error) =>{
            reject(error);
          }
        })
      })
    }

    GetSubscriptionPlanById(planId: string){
      return new Promise((resolve,reject) => {
        const apiUrl = this.apiUrl.apiUrl.subscription.GetSubscriptionPlanById.replace("{planId}", planId);;
        this.commonService.doGet(apiUrl).pipe().subscribe({
          next: async(data) =>{
            if(data && data.success){
              resolve(data);
            }
          },
          error: (error) =>{
            reject(error);
          }
        })
      })
    }
}
