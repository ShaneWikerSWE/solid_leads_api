import { RequestHandler } from 'express';
import { Budget, InboundLeads, UserCredentials } from '../models';
import asyncHandler from 'express-async-handler';

const mainInfo: RequestHandler = asyncHandler(async (req, res) => {
  const user = await UserCredentials.findByPk(req.user.userId);

  const clientLeadsData = await InboundLeads.findAll({
    where: {
      clientId: user?.clientId,
      pipelineStage: 'solidoffers.sendtosales',
    },
  });

  const clientLeadsCount = await InboundLeads.count({
    where: { clientId: user?.clientId },
  });

  const budgetsData = await Budget.findAll({
    where: { clientId: user?.clientId },
  });

  res.status(200).json({
    leads: clientLeadsData,
    leadsCount: clientLeadsCount,
    budgets: budgetsData,
  });
});

export default {
  mainInfo,
};
