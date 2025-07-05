#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { screenshotTool, screenshotHandler } from "./tools/screenshot.js";

// Create an MCP server
const server = new McpServer({
  name: "screenshot-server",
  version: "1.0.4",
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
