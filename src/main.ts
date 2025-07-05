#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { screenshotTool, screenshotHandler } from "./tools/screenshot.js";
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

// Get package version and determine package root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // This will be dist/
const packageRootDir = path.resolve(__dirname, ".."); // Moves from dist/ to package root
const packageJsonPath = path.join(packageRootDir, "package.json");
const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));
const SERVER_VERSION = packageJson.version;

// Create an MCP server
const server = new McpServer({
  name: "glasses-mcp",
  version: SERVER_VERSION,
});

// Register tools
server.registerTool(
  "screenshot",
  {
    ...screenshotTool,
    inputSchema: screenshotTool.inputSchema,
  },
  screenshotHandler
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server is running...");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
