import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'marketingcredits',
})
class Marketingcredits extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateTime!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  externalId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  billingId!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  total!: string;
}

export default Marketingcredits;
