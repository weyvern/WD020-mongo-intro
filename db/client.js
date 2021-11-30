import { MongoClient, ObjectId } from 'mongodb';

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.MONGO_DB;

try {
  await client.connect();
  console.log('Connected to Mongo server');
} catch (error) {
  console.log(error);
}

const db = client.db(dbName);

export { db as default, ObjectId };
