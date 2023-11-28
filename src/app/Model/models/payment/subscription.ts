export interface subscription {
    UserId: number,
    PlanId: string,
    PaymentMethodId: string | null
}

export class StripeCustomer {
    UserId: number;
    PaymentMethodId: string;
    SetDefault: boolean;

    constructor(userId: number, paymentMethodId: string, setDefault: boolean) {
        this.UserId = userId;
        this.PaymentMethodId = paymentMethodId;
        this.SetDefault = setDefault;
    }
}