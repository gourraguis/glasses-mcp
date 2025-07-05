# Website Screenshot MCP

[![NPM Version](https://img.shields.io/npm/v/glasses-mcp?style=flat-square)](https://www.npmjs.com/package/glasses-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server that provides a powerful tool for taking screenshots of websites. This project allows AI agents and other clients to programmatically capture web pages, including local development servers.

## Features

*   **Capture any URL:** Take a screenshot of any public website or local development server.
*   **Selectable Format:** Choose between `png` and `jpeg` image formats.
*   **Full Page or Viewport:** Capture the entire scrollable page (default) or just the visible viewport.
*   **Structured Output:** Returns a clear JSON object indicating success or failure.

## Setup & Integration

To use `glasses-mcp` with a compatible AI assistant, add the following configuration to its settings file. The `npx` command will handle the installation for you.

**MCP Server Configuration:**
```json
{
  "mcpServers": {
    "glasses": {
      "command": "npx",
      "args": ["-y", "glasses-mcp"]
    }
  }
}
```

**Configuration File Locations:**
*   **For Claude Desktop:** Add the configuration to `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS.
*   **For Gemini CLI:** Add the configuration to `~/.gemini/settings.json` on macOS.
*   **For Cursor IDE:** Add the configuration to your user `settings.json` file.

## Usage

Once integrated, you can use prompts like these with your AI assistant.

### Example Prompts

> "Take a screenshot of github.com and save it to my desktop as `github-home.png`."

> "Get a JPEG screenshot of the latest news on bbc.com/news, and save it in my downloads folder as `bbc-news.jpeg`."

> "Capture just the viewport of my local server at `http://localhost:3000` and name it `localhost-viewport.png`."

### Tool Reference: `screenshot`

| Name         | Type                     | Required | Default | Description                                           |
|--------------|--------------------------|----------|---------|-------------------------------------------------------|
| `url`        | `string`                 | Yes      | -       | The full URL of the website to capture.               |
| `outputPath` | `string`                 | Yes      | -       | The local file path to save the screenshot to.        |
| `format`     | `"png"` \| `"jpeg"`      | No       | `"png"` | The output image format.                              |
| `fullPage`   | `boolean`                | No       | `true`  | If `true`, captures the entire page. If `false`, captures only the visible viewport. |

**Returns:** A JSON object indicating success or failure.
```json
{
  "success": true,
  "outputPath": "/path/to/your/screenshot.png"
}
```

## Development & Contributing

To contribute to this project:

1.  Clone the repository: `git clone https://github.com/gourraguis/glasses-mcp.git`
2.  Install dependencies: `cd glasses-mcp && npm install`
3.  Build the project: `npm run build`
4.  To test your local build, use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):
    ```bash
    npx @modelcontextprotocol/inspector node dist/main.js
    ```
