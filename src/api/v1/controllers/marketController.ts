import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { Counties, MarketInboundTargets, Markets } from '../models';
import { Op } from 'sequelize';

const marketSearch: RequestHandler = asyncHandler(async (req, res) => {
  const { county, state, page = 0 } = req.query;

  const whereClause: any = { marketId: { [Op.ne]: null } };

  if (county) whereClause.name = { [Op.startsWith]: county };
  else if (state) whereClause.state = { [Op.startsWith]: state };

  const counties = await Counties.findAll({
    where: whereClause,
    // limit: 5,
    offset: +page * 5,
    attributes: ['fips', 'name', 'state', 'stateCode'],
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

  const filteredCounties = counties.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.market.id === value.market.id)
  );

  res.status(200).json({
    msg: 'Counties has been fetched',
    counties: filteredCounties,
  });
});

export default { marketSearch };
