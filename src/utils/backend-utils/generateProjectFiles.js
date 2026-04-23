// Project files generator utility
// Generates .gitignore, .env.example, and dynamic README.md

import fs from "fs";
import path from "path";

/**
 * Generate .gitignore file
 */
export function generateGitignore(projectPath) {
  const gitignoreContent = `node_modules
.env
.env.local
.env.production
dist
coverage
`;
  fs.writeFileSync(path.join(projectPath, ".gitignore"), gitignoreContent);
}

/**
 * Generate .env.example based on database type
 * @param {string} projectPath 
 * @param {string} databaseType - 'mongodb' | 'sequelize' | 'mysql-native'
 */
export function generateEnvExample(projectPath, databaseType) {
  let envContent = "PORT=3000\n\n";

  switch (databaseType) {
    case "mongodb":
      envContent += `# MongoDB Configuration
DB_URI=mongodb://localhost:27017
DB_NAME=your_database_name
`;
      break;
    case "sequelize":
      envContent += `# SQL Database Configuration (PostgreSQL / MySQL)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_DIALECT=mysql
# DB_DIALECT options: 'mysql' or 'postgres'
`;
      break;
    case "mysql-native":
      envContent += `# MySQL Configuration (Native mysql2 driver)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
`;
      break;
    default:
      envContent += `# Database Configuration
# Add your database credentials here
`;
  }

  fs.writeFileSync(path.join(projectPath, ".env.example"), envContent);
}

/**
 * Generate dynamic README.md based on stack
 * @param {string} projectPath 
 * @param {object} options - { projectName, serverType, databaseType, isSSR }
 */
export function generateReadme(projectPath, options) {
  const { projectName, serverType, databaseType, isSSR = false } = options;

  // Determine stack descriptions
  const serverLabel = getServerLabel(serverType);
  const databaseLabel = getDatabaseLabel(databaseType);
  
  let title;
  if (isSSR) {
    title = "# " + projectName + " – Express SSR + " + databaseLabel;
  } else {
    title = "# " + projectName + " – " + serverLabel + " + " + databaseLabel;
  }

  const folderStructure = getFolderStructure(serverType, isSSR);
  const envInstructions = getEnvInstructions(databaseType);
  const startInstructions = getStartInstructions(serverType);
  const graphqlSection = serverType && serverType.includes("graphql") ? getGraphQLSection(serverType) : "";

  const readmeContent = title + `

A production-ready backend project scaffolded with [create-jaimeet-app](https://www.npmjs.com/package/create-jaimeet-app).

## 📁 Folder Structure

\`\`\`
` + folderStructure + `
\`\`\`

## ⚙️ Environment Setup

1. Copy \`.env.example\` to \`.env\`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. Update the \`.env\` file with your configuration:
` + envInstructions + `

## 🚀 Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
\`\`\`

` + startInstructions + `
` + graphqlSection + `

## 📝 Where to Add Your Code

- **Routes/Resolvers**: ` + getRoutesLocation(serverType) + `
- **Middlewares**: \`middlewares/\` folder
- **Database Connection**: \`connections/\` folder
- **Configuration**: \`config/\` folder

## ❓ Why no database models included?

This project intentionally does not include models or schemas.
This allows you to design your database freely based on your application needs.

## 📦 Installed Dependencies

` + getDependenciesSection(serverType, databaseType) + `

## 🔗 Helpful Links

- [Express.js Documentation](https://expressjs.com/)
` + (serverType && serverType.includes("graphql") ? "- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)\n" : "") + getDatabaseDocs(databaseType) + `

---

Made with ❤️ using [create-jaimeet-app](https://www.npmjs.com/package/create-jaimeet-app)
`;

  fs.writeFileSync(path.join(projectPath, "README.md"), readmeContent);
}

// Helper functions
function getServerLabel(serverType) {
  switch (serverType) {
    case "express": return "Express REST API";
    case "graphql-standalone": return "GraphQL Standalone (Apollo)";
    case "graphql-express": return "Express + GraphQL (Apollo)";
    default: return "Express";
  }
}

function getDatabaseLabel(databaseType) {
  switch (databaseType) {
    case "mongodb": return "MongoDB (Mongoose)";
    case "sequelize": return "PostgreSQL/MySQL (Sequelize)";
    case "mysql-native": return "MySQL (Native)";
    default: return "Database";
  }
}

function getFolderStructure(serverType, isSSR) {
  let structure = `├── config/           # Configuration files
├── connections/      # Database connection
├── middlewares/      # Express middlewares`;

  if (serverType && serverType.includes("graphql")) {
    structure += `
├── graphql/          # GraphQL schema & resolvers
│   ├── typedef.js    # Type definitions
│   └── resolver.js   # Resolvers`;
  }

  structure += `
├── models/           # Database models (create your own)
├── routes/           # API routes`;

  if (isSSR) {
    structure += `
├── views/            # EJS templates
├── public/           # Static files (CSS, images)`;
  }

  structure += `
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
├── index.js          # Entry point
└── package.json      # Dependencies`;

  return structure;
}

function getEnvInstructions(databaseType) {
  switch (databaseType) {
    case "mongodb":
      return `   - \`DB_URI\`: Your MongoDB connection string
   - \`DB_NAME\`: Your database name`;
    case "sequelize":
      return `   - \`DB_HOST\`: Database host (e.g., localhost)
   - \`DB_USER\`: Database username
   - \`DB_PASSWORD\`: Database password
   - \`DB_NAME\`: Database name
   - \`DB_DIALECT\`: 'mysql' or 'postgres'`;
    case "mysql-native":
      return `   - \`DB_HOST\`: MySQL host (e.g., localhost)
   - \`DB_USER\`: MySQL username
   - \`DB_PASSWORD\`: MySQL password
   - \`DB_NAME\`: Database name`;
    default:
      return "   - Configure your database credentials";
  }
}

function getStartInstructions(serverType) {
  return "The server will start on `http://localhost:3000`";
}

function getGraphQLSection(serverType) {
  const endpoint = serverType === "graphql-express" 
    ? "http://localhost:3000/graphql"
    : "http://localhost:3000";
    
  return `
## 🔮 GraphQL Endpoint

Access GraphQL Playground at: \`` + endpoint + `\`

Example query:
\`\`\`graphql
query {
  getTodos {
    id
    title
    completed
  }
}
\`\`\`
`;
}

function getRoutesLocation(serverType) {
  if (serverType && serverType.includes("graphql")) {
    return "`graphql/resolver.js` for resolvers, `graphql/typedef.js` for schema";
  }
  return "`routes/` folder";
}

function getDependenciesSection(serverType, databaseType) {
  let deps = "- express\n- cors\n- dotenv\n- nodemon (dev)";
  
  if (serverType && serverType.includes("graphql")) {
    deps += "\n- @apollo/server";
    if (serverType === "graphql-express") {
      deps += "\n- @as-integrations/express5";
    }
  }
  
  switch (databaseType) {
    case "mongodb":
      deps += "\n- mongoose";
      break;
    case "sequelize":
      deps += "\n- sequelize\n- pg (PostgreSQL) or mysql2 (MySQL)";
      break;
    case "mysql-native":
      deps += "\n- mysql2";
      break;
  }
  
  return deps;
}

function getDatabaseDocs(databaseType) {
  switch (databaseType) {
    case "mongodb":
      return "- [Mongoose Documentation](https://mongoosejs.com/)";
    case "sequelize":
      return "- [Sequelize Documentation](https://sequelize.org/)";
    case "mysql-native":
      return "- [mysql2 Documentation](https://github.com/sidorares/node-mysql2)";
    default:
      return "";
  }
}
