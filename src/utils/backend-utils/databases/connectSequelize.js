// Sequelize ORM connection for PostgreSQL & MySQL
// Connection is setup only - no models included intentionally

import { Sequelize } from "sequelize";

/**
 * Connect to database using Sequelize ORM
 * Supports PostgreSQL and MySQL
 */
export const connectSequelize = async (host, user, password, database, dialect) => {
  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect, // 'mysql' | 'postgres'
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log(`✅ Connected to ${dialect.toUpperCase()} database successfully!`);
    return sequelize;
  } catch (error) {
    console.error(`❌ Unable to connect to ${dialect} database:`, error);
    process.exit(1);
  }
};

// Template for generated projects (as a string constant)
export const sequelizeConnectionTemplate = `import { Sequelize } from "sequelize";

/**
 * Connect to database using Sequelize ORM
 * Supports PostgreSQL and MySQL
 * Configure your .env file with database credentials
 */
export const connectSequelize = async () => {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;
  const dialect = process.env.DB_DIALECT || "mysql"; // 'mysql' | 'postgres'

  if (!host || !user || !database) {
    console.log("⚠️  Database not configured. Update .env to enable database connection.");
    return null;
  }

  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect,
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log("✅ Connected to " + dialect.toUpperCase() + " database successfully!");
    return sequelize;
  } catch (error) {
    console.error("❌ Unable to connect to " + dialect + " database:", error);
    process.exit(1);
  }
};

// Export sequelize instance for use in models
// Example: import { sequelize } from './connections/connectSequelize.js';
`;
