// MySQL2 native connection (raw SQL)
// Connection is setup only - no models included intentionally

import mysql from "mysql2/promise";

/**
 * Connect to MySQL using mysql2 (native driver)
 * For raw SQL queries without ORM
 */
export const connectMySQL = async (host, user, password, database) => {
  try {
    const connection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });
    console.log("✅ Connected to MySQL successfully!");
    return connection;
  } catch (error) {
    console.error("❌ Error connecting to MySQL:", error);
    process.exit(1);
  }
};

// Template for generated projects
export const mysqlConnectionTemplate = `
import mysql from "mysql2/promise";

/**
 * Connect to MySQL using mysql2 (native driver)
 * For raw SQL queries without ORM
 * Configure your .env file with database credentials
 */
export const connectMySQL = async () => {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;

  if (!host || !user || !database) {
    console.log("⚠️  Database not configured. Update .env to enable database connection.");
    return null;
  }

  try {
    const connection = await mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });
    console.log("✅ Connected to MySQL successfully!");
    return connection;
  } catch (error) {
    console.error("❌ Error connecting to MySQL:", error);
    process.exit(1);
  }
};

// Example usage:
// const connection = await connectMySQL();
// const [rows] = await connection.execute('SELECT * FROM users');
`;
