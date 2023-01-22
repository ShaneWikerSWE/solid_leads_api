import { Table, Model, Column, DataType, BelongsTo } from 'sequelize-typescript';
import Markets from './markets';

@Table({
  timestamps: true,
  tableName: 'budget',
})
class Budget extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  clientId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lineItem!: string;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
  })
  amountRemaining!: number;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
  })
  amount!: number;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: true,
  })
  nextAmount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  subcategory!: string;

  @BelongsTo(() => Markets, 'subcategory')
  market!: Markets;
}

export default Budget;
