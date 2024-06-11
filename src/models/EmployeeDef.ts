export class EmployeeDef {
  constructor(
    public id: number,
    public name: string,
    public salary: number,
    public department: string
  ) {}
}

enum Department {
  HR,
  PS,
}
