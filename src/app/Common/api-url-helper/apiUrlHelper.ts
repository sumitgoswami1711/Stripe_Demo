    import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiUrlHelper {
    public apiUrl = {

        subscription: {
            //GetSubscription 
            // Subscription Plan By Id
            GetSubscriptionPlanById: 'Subscription/GetSubscriptionPlanById/{planId}',
            //card token generate
            CreateCustomerandSubscription: 'Subscription/SubscribeUser',
            // CreateSetupIntent
            InitiatePayment :"Subscription/CreateSetupIntent" ,
            //ConfirmPayment
            ConfirmPayment : "Subscription/ConfirmPayment"
        }
    };
}
