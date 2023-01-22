import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: '2022-08-01',
});

export default class StripeService {
  /**
   * Create customer
   *
   * @param {*} data
   * @returns Customer id
   */
  static async createCustomer(data: any) {
    try {
      const customer: any = await stripe.customers.create({
        email: data.email,
        name: data.name,
        payment_method: data.paymentMethod,
        invoice_settings: { default_payment_method: data.paymentMethod },
      });
      return customer.id;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieve customer
   *
   * @param {*} customerId
   * @returns customer
   */
  static async retrieveCustomer(customerId: string) {
    try {
      const customer: any = await stripe.customers.retrieve(customerId);
      return customer;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Create product
   *
   * @param {*} data
   * @returns product id
   */
  static async createProduct(data: any) {
    try {
      const product: any = await stripe.products.create({
        name: data.name,
      });
      return product.id;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Create subscription
   *
   * @param {*} data
   * @returns subscriptionId, clientSecret, status
   */
  static async createSubscription(data: any) {
    try {
      const subscription: any = await stripe.subscriptions.create({
        customer: data.customerId,
        items: [
          {
            price_data: {
              currency: 'USD',
              product: data.productId,
              unit_amount: 100,
              recurring: {
                interval: 'week',
              },
            },
            quantity: Math.round(+data.unitAmount),
          },
        ],
        payment_settings: {
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
        proration_behavior: 'none',
      });

      return {
        subscriptionId: subscription.id,
        // clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        status: subscription.status,
      };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Update subscription Amount
   *
   * @param {*} subscriptionId, unitAmount
   * @returns updateSubscriptionItem
   */

  static async updateSubscriptionAmount(data: any) {
    try {
      const subscriptionItems = await stripe.subscriptionItems.list({
        subscription: data.subscriptionId,
      });
      const subscriptionItemId = subscriptionItems.data[0].id;

      const updateSubscriptionItem = await stripe.subscriptionItems.update(
        subscriptionItemId,
        { quantity: Math.round(+data.unitAmount), proration_behavior: 'none' }
      );
      return updateSubscriptionItem;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Cancel subscription
   *
   * @param {*} subscriptionId
   * @returns cancelledSubscription
   */
  static async cancelSubscription(subscriptionId: string) {
    try {
      const cancelledSubscription = await stripe.subscriptions.update(
        subscriptionId,
        { cancel_at_period_end: true }
      );
      return cancelledSubscription;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get payment method
   *
   * @param {*} paymentMethodId
   * @returns paymentMethod
   */

  static async getPaymentInfo(paymentMethodId: string) {
    try {
      const paymentMethod: any = await stripe.paymentMethods.retrieve(
        paymentMethodId
      );
      return paymentMethod;
    } catch (err) {
      throw err;
    }
  }
}
