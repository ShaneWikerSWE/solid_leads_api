import { RequestHandler } from 'express';
import {
  UserCredentials,
  Budget,
  Markets,
  Counties,
  MarketInboundTargets,
  Clients,
} from '../models';
import { ResponseService, StripeService } from '../services';
import asyncHandler from 'express-async-handler';

const addBudget: RequestHandler = asyncHandler(async (req, res) => {
  const { budgets } = req.body;

  if (!Array.isArray(budgets)) {
    ResponseService.badRequest(res);
    return;
  }

  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  const createdBudgets = await Promise.all(
    budgets.map(async (e) => {
      const response: any = await Budget.create({
        amount: 0,
        amountRemaining: 0,
        subcategory: e.marketId,
        lineItem: 'solidoffers',
        clientId: user?.clientId,
        nextAmount: e.amount,
      });

      return {
        budgetId: response.id,
        amount: e.amount,
        marketId: e.marketId,
        clientId: user?.id,
      };
    })
  );

  res.status(201).json({
    msg: `${createdBudgets.length} Budgets created`,
    createdBudgets,
  });
});

const updateBudgets: RequestHandler = asyncHandler(async (req, res) => {
  const { budgets } = req.body;

  if (!Array.isArray(budgets)) {
    ResponseService.badRequest(res);
    return;
  }

  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  const createdBudgets = [];

  for (let i = 0; i < budgets.length; i++) {
    const e = budgets[i];
    
    if (e.id === 0) {
      const response: any = await Budget.create({
        amount: 0,
        amountRemaining: 0,
        subcategory: e.market.id,
        lineItem: 'solidoffers',
        clientId: user?.clientId,
        nextAmount: e.nextAmount,
      });

      createdBudgets.push({
        budgetId: response.id,
        nextAmount: e.nextAmount,
        marketId: e.market.id,
      });
    } else if (e.delete) {
      let budget: any = await Budget.findByPk(e.id);

      if (+budget.amount === 0) {
        await Budget.destroy({ where: { id: e.id, clientId: user?.clientId } });
      } else {
        await Budget.update({ nextAmount: 0 }, { where: { id: e.id, clientId: user?.clientId } });
      }
    } else {
      await Budget.update({ nextAmount: e.nextAmount }, { where: { id: e.id, clientId: user?.clientId } });
    }
  }

  const budgetsData = await Budget.findAll({where: {clientId: user?.clientId}})

  let totalBudgetsAmount: number = 0;
  for (const budget of budgetsData) {
    totalBudgetsAmount += +budget!.nextAmount;
  }

  const clientData: any = await Clients.findOne({where: {id: user?.clientId}});

  await StripeService.updateSubscriptionAmount({
    subscriptionId: clientData.stripeSubscriptionId,
    unitAmount: totalBudgetsAmount,
  });

  if (totalBudgetsAmount === 0)
    await StripeService.cancelSubscription(clientData.stripeSubscriptionId);

  res.status(200).json({ msg: 'Budgets created/updated', createdBudgets });
});

const getBudgets: RequestHandler = asyncHandler(async (req, res) => {
  const user = await UserCredentials.findOne({
    where: { id: req.user.userId },
  });

  const budgets = await Budget.findAll({
    where: { clientId: user?.clientId },
    attributes: ['id', 'nextAmount', 'amount'],
    include: [
      {
        model: Markets,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          { model: MarketInboundTargets, attributes: ['overallTarget'] },
          { model: Counties, attributes: ['fips', 'name'] },
        ],
      },
    ],
  });

  res.status(200).json({
    msg: 'Budgets fetched',
    budgets,
  });
});

export default { addBudget, updateBudgets, getBudgets };
