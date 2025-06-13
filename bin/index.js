#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";

// Register ESM support for older Node versions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load main logic
import("../src/main.js")
  .then((module) => module.default())
  .catch((err) => {
    console.error("❌ Failed to start CLI:", err);
    process.exit(1);
  });
