import { CreationOptional, DataTypes } from 'sequelize'
import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  declare id: CreationOptional<number>

  @Column({ type: DataTypes.STRING, allowNull: false })
  name: string

  @Column({ type: DataTypes.FLOAT, allowNull: true })
  price: number

  @Column({ type: DataTypes.INTEGER, allowNull: true })
  stock: number

  @Column({ field: 'created_at' })
  @CreatedAt
  declare createdAt: Date

  @Column({ field: 'updated_at' })
  @UpdatedAt
  declare updatedAt: Date
}
