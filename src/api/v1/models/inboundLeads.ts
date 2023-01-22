import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'inboundleads',
})
class InboundLeads extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  marketId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  clientId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  contactId!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  clientContactId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  channel!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  postalCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: true,
  })
  fips!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  reasonForSelling!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  timeframe!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  score!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  autoRouted!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  contactType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  contacted!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  liveAnswered!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  utmCampaign!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  utmTerm!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  utmSource!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  utmMedium!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  contactSource!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pipelineStage!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pipelineStatus!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hasRealtor!: string;
}

export default InboundLeads;
