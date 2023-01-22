import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Markets, Clients } from './';

@Table({
  timestamps: true,
  tableName: 'counties',
})
class Counties extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  fips!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stateCode!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  population!: number;

  @ForeignKey(() => Markets)
  @Column
  marketId!: number;

  @ForeignKey(() => Clients)
  @Column
  clientId!: number;

  @BelongsTo(() => Markets, 'marketId')
  market!: Markets;

  @BelongsTo(() => Clients, 'clientId')
  client!: Clients;
}

export default Counties;
