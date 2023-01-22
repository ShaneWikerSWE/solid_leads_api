import { RequestHandler } from 'express';
import { UserCredentials, Budget, Clients, Marketingcredits } from '../models';
import { MailService, StripeService } from '../services';
import asyncHandler from 'express-async-handler';

const payBudget: RequestHandler = asyncHandler(async (req, res) => {
  let { paymentMethod, budgets } = req.body;

  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  const clientData: any = await Clients.findOne({ where: {id: user?.clientId }});

  let totalBudgetsAmount: number = 0;

  for (const budgetId of budgets) {
    const budget = await Budget.findOne({ where: { id: budgetId } });
    totalBudgetsAmount += +budget!.nextAmount;
  }

  let userPaymentMethod = clientData?.paymentMethod;

  if (!userPaymentMethod) {
    userPaymentMethod = paymentMethod;
    await Clients.update({ paymentMethod: userPaymentMethod }, { where: {id: user?.clientId} });
  }

  let customerId = clientData?.stripeCustomerId;

  if (!customerId) {
    customerId = await StripeService.createCustomer({
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      paymentMethod: userPaymentMethod,
    });

    await Clients.update({ stripeCustomerId: customerId }, { where: {id: user?.clientId} });
  }

  const subscription = await StripeService.createSubscription({
    customerId,
    productId: 'prod_N5yC6OMVdcNlbW',
    unitAmount: totalBudgetsAmount,
  });

  await Clients.update({ stripeSubscriptionId: subscription.subscriptionId }, { where: {id: user?.clientId} });

  if (subscription.status === 'active') {
    await Marketingcredits.create({
      total: totalBudgetsAmount,
      clientId: user?.clientId,
      dateTime: new Date(),
    });
  } else {
    MailService.paymentFailed({ email: user?.email });
    res.status(422).json({
      msg: 'Payment failed',
    });

    return;
  }

  res.status(201).json({
    msg: 'Subscription has been made',
    // clientSecret: subscription.clientSecret,
  });
});

const getPaymentInfo: RequestHandler = asyncHandler(async (req, res) => {
  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  const clientData: any = await Clients.findOne({ where: { id: user?.clientId } });

  if (!clientData?.paymentMethod) {
    res.status(404).json({
      msg: 'No payment method',
    });
    return;
  }

  const paymentMethod = await StripeService.getPaymentInfo(
    clientData?.paymentMethod
  );

  res.status(200).json({
    msg: 'Payment method fetched',
    paymentMethod: {
      exp_month: paymentMethod.card.exp_month,
      exp_year: paymentMethod.card.exp_year,
      last4: paymentMethod.card.last4,
    },
  });
});

export default {
  payBudget,
  getPaymentInfo,
};
