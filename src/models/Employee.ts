import { Model, Column, Table, PrimaryKey } from "sequelize-typescript";

@Table({
  timestamps: false,
})
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
}
