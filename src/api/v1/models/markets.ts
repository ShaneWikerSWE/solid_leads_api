import { Table, Model, Column, DataType, HasMany, HasOne } from 'sequelize-typescript';
import { MarketInboundTargets, Counties, Budget } from './';

@Table({
  timestamps: true,
  tableName: 'markets',
})
class Markets extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  code!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name!: string;

  @HasMany(() => Counties, 'marketId')
  counties!: Counties[];

  @HasOne(() => MarketInboundTargets, 'marketId')
  marketTarget!: MarketInboundTargets

  @HasMany(() => Budget, 'subcategory')
  budget!: Budget
}

export default Markets;
