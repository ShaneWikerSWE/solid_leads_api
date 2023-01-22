import { Table, Model, Column, DataType, HasOne } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'countyInboundTargets',
})
class CountyInboundTargets extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
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
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  target!: number;
}

export default CountyInboundTargets;
