import { connect, ConnectOptions, disconnect, model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// create a type o interface representing a document in MongoDB
export type Employee = {
  name: string;
  salary: number;
};

export type EmployeeWithID = Employee & {
  _id: string;
};

// create a schema for the Employee type
export const EmployeeSchema = new Schema<Employee>({
  name: { type: String, required: true },
  salary: { type: Number, required: true },
});

// create a model for the Employee type
export const EmployeeCollection = model<Employee>("Employee", EmployeeSchema);

// documents for testing
const employees: Employee[] = [
  { name: "Ryan Ray", salary: 50000 },
  { name: "Joe McMillan", salary: 40000 },
  { name: "John Carter", salary: 50000 },
];

// create database with documents of type Employee
export const createDB = async () => {
  try {
    const uridb = process.env.URIDB || "mongodb://localhost:27017";
    await connect(uridb);
    await EmployeeCollection.create(employees);
  } catch (error) {
    console.log(error);
    await disconnect();
  }
};

export const destroyDB = async () => {
  try {
    await EmployeeCollection.deleteMany();
  } catch (error) {
    console.log(error);
  } finally {
    disconnect();
  }
};
