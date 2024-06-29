import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "CarRentalSystem";

client
  .connect()
  .then(() => {
    console.log("Connected successfully to server");
  })
  .catch(() => {
    console.log(" error: DB not connected");
  });

export const db = client.db(dbName);
