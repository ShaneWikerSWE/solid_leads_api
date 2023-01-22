import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'clients',
})
class Clients extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stripeId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  locationId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  twilioSId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  dmId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  website!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  zipcode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  timezone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  calltoolsId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  apiKey!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  })
  active!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stripeCustomerId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  calltools2LocationTagId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  readymodePriorityEndpoint!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  readymodeDefaultEndpoint!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isPartner!: boolean;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: false,
    defaultValue: 0.3,
  })
  marketingMargin!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentMethod!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  stripeSubscriptionId!: string;
}

export default Clients;
