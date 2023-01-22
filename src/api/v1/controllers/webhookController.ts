import asyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';
import { StripeService } from '../services';
import { Budget, UserCredentials } from '../models';

const stripe: RequestHandler = asyncHandler(async (req, res) => {
  const { type, data } = req.body;

  if (type === 'customer.subscription.deleted') {
    const customerId = data.object.customer;
    const customer = await StripeService.retrieveCustomer(customerId);
    const user = await UserCredentials.findOne({ where: { email: customer.email } });
    await Budget.update({ nextAmount: 0 }, { where: { clientId: user?.clientId } });
  }

  res.json({ success: true });
});

export default { stripe };