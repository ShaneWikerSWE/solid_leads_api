import { Table, Model, Column, DataType, BelongsTo } from 'sequelize-typescript';
import Markets from './markets';

@Table({
  timestamps: true,
  tableName: 'marketInboundTargets',
})
class MarketInboundTargets extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  marketId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  target!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  overallTarget!: string;

  @BelongsTo(() => Markets, 'marketId')
  market!: Markets;
}

export default MarketInboundTargets;
