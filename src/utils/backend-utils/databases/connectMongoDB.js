// MongoDB connection using Mongoose
// Connection is setup only - no models included intentionally

import mongoose from "mongoose";

/**
 * Connect to MongoDB using Mongoose
 * @param {string} dbURI - MongoDB connection URI
 * @param {string} dbName - Database name
 */
export const connectMongoDB = async (dbURI, dbName) => {
  try {
    await mongoose.connect(dbURI, {
      dbName: dbName,
    });
    console.log("✅ Connected to MongoDB successfully!", dbName);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Template for generated projects
export const mongoDBConnectionTemplate = `
import mongoose from "mongoose";

/**
 * Connect to MongoDB using Mongoose
 * Configure your .env file with DB_URI and DB_NAME
 */
export const connectMongoDB = async () => {
  const dbURI = process.env.DB_URI;
  const dbName = process.env.DB_NAME;
  
  if (!dbURI || !dbName) {
    console.log("⚠️  Database not configured. Update .env to enable database connection.");
    return;
  }
  
  try {
    await mongoose.connect(dbURI, {
      dbName: dbName,
    });
    console.log("✅ Connected to MongoDB successfully!", dbName);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
`;
