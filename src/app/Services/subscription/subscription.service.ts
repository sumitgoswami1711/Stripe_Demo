import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';





import { ApiUrlHelper } from 'src/app/Common/api-url-helper/apiUrlHelper';
import { StripeCustomer } from 'src/app/Model/payment/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private commonService: CommonService,
    private apiUrl: ApiUrlHelper) { }

  InitiatePayment(){
    const apiUrl = this.apiUrl.apiUrl.subscription.InitiatePayment
    return this.commonService.doGet(apiUrl);
  }

   
}
