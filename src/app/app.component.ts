

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { lastValueFrom } from 'rxjs';
import { StripeCustomer, subscription } from 'src/app/Model/payment/subscription';
import { CommonService } from 'src/app/Services/common/common.service';
import { PaymentService } from 'src/app/Services/payment/payment.service';
import { StorageKey, StorageService } from 'src/app/Services/storage/storage.service';
import { SubscriptionService } from 'src/app/Services/subscription/subscription.service';
import { environment, stripeConfig } from 'src/app/environments/environment';

declare var Stripe: any;

const stripe = Stripe(stripeConfig.publishKey);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  PlanDetails: any = [];
  planId: any;
  customerId: any;
  stripeCustomer: StripeCustomer | any;
  subscriptionModel: subscription | undefined;
  cardList: any = [];
  showAddCard: boolean = true;
  stripeCustomerId: any;
  cardId: any;
  baseURL: string = environment.BaseURL.replace("api/", "");
  todayDate: any = Date.now();
  endDate: any;
  cancaleDate: any;
  PaymentSecrectKey: any;
  isActive: boolean | undefined;

  constructor(
    public commonService: CommonService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private storage: StorageService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.LoadAndPay();
    this.spinner.show();
    this.planId = 'price_1O7zFUHYvvcpRTWUipOBsRIs';
    this.GetSubscriptionPLanById();
  }


  async LoadAndPay() {
    const result = this.subscriptionService.InitiatePayment();
    this.PaymentSecrectKey = await lastValueFrom(result);
    var elements = new stripe.elements({
      clientSecret: this.PaymentSecrectKey.data.clientSecret,
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
        }
      ]
    });


    var cardNumber = elements.create('cardNumber', {
    });
    cardNumber.mount('#card-number-element');
    var cardExpiry = elements.create('cardExpiry', {
    });
    cardExpiry.mount('#card-cardExpiry-element');
    var cardCvc = elements.create('cardCvc', {
    });
    cardCvc.mount('#card-cardCvc-element');

    document.querySelector("#payment-form")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      this.spinner.show();
      stripe.handleCardSetup(
        this.PaymentSecrectKey.data.clientSecret,
        cardNumber
      )
        .then((result: any) => {
          if (result.setupIntent != undefined && result.setupIntent.status == "succeeded") {
            this.subscriptionModel = {
              UserId: 210,
              PlanId: this.planId,
              PaymentMethodId: result.setupIntent.payment_method,
            }
            if (this.stripeCustomerId == null || (!this.isActive && this.cancaleDate != null)) {
              this.paymentService.InitializeCustomerSetupandSubscribe(this.subscriptionModel).then((data: any) => {
                this.spinner.hide();
                if (data.success) {
                  this.commonService.setData(true);
                  this.router.navigate(["match"]);

                  this.stripeCustomerId = data.data.customer;
                }
                else {

                }
              }).catch((error: any) => {

                this.spinner.hide();
              })

            }
            else {
              this.spinner.hide();
            }
          }
        })
    });
  }

  GetSubscriptionPLanById() {
    this.paymentService.GetSubscriptionPlanById(this.planId).then((data: any) => {
      this.spinner.hide();
      if (data && data.success) {
        this.PlanDetails = data.data;
      }
      else {

      }
    }).catch((error: any) => {
      this.spinner.hide();

    })

  }
  goToBack() {
    this.router.navigate(["subscription"]);
  }

  showCardList() {
    this.showAddCard = true;
  }


  Addclass(id: any) {
    this.cardId = id
    document.querySelectorAll('.selected').forEach(e => {
      e.classList.remove('selected');
    });
    document.getElementById(id)?.classList.add('selected');
  }

  pay() {
    this.spinner.show();
    this.subscriptionModel = {
      UserId: parseInt(this.commonService.Decrypt(this.storage.getValue('currentUserId'))),
      PlanId: this.planId,
      PaymentMethodId: this.cardId,
    }

    if (this.cardId == null) {
      this.spinner.hide();
      return
    }
    this.paymentService.InitializeCustomerSetupandSubscribe(this.subscriptionModel).then((data: any) => {
      this.spinner.hide();
      if (data && data.success) {
        this.commonService.setData(true);
        this.router.navigate(["match"]);

      }
      else {

      }
    }).catch((error: any) => {

      this.spinner.hide();
    })
  }
}