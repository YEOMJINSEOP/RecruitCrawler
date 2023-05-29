import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.DB_HOST;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export async function connectDB() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db('recruitDB');
  } catch(error) {
    console.error(error);
  }
}
