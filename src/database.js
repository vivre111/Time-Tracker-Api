import { createConnection } from "typeorm";

export default async function connectToDatabase() {
  try {
    const connection = await createConnection();
    console.log("Connected to database");
    return connection;
  } catch (error) {
    console.log("TypeORM connection error: ", error);
    throw error;
  }
}
