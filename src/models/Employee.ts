import {
  Model,
  Column,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table
export class Employee extends Model {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  salary!: number;

  @Column
  department!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
