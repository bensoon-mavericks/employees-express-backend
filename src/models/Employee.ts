import { Model, Column, Table } from "sequelize-typescript";

@Table
export class Employee extends Model {
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  salary!: number;

  @Column
  department!: string;
}
