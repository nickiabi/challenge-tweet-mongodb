import { Employee, EmployeeCollection } from "../database/database";

class DBCompany {
  async getEmployees(): Promise<Employee[]> {
    const employees: Employee[] = await EmployeeCollection.find();
    return employees;
  }
}

export default DBCompany;
