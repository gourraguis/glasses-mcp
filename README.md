# Website Screenshot MCP

[![NPM Version](https://img.shields.io/npm/v/glasses-mcp?style=flat-square)](https://www.npmjs.com/package/glasses-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A Model-Context-Peripheral (MCP) server that provides a powerful tool for taking screenshots of websites. This project allows AI agents and other clients to programmatically capture web pages with a simple, standardized interface.

This is an open source project by [Abderrahmane Gourragui](https://github.com/gourraguis).

## Features

*   **Capture any URL:** Take a screenshot of any public website.
*   **Selectable Format:** Choose between `png` and `jpeg` image formats.
*   **Full Page or Viewport:** Capture the entire scrollable page (default) or just the visible viewport.
*   **Structured Output:** Returns a clear JSON object indicating success or failure.

## Getting Started

### Prerequisites

*   Node.js v18.x or higher

### Installation

```bash
npm install -g glasses-mcp
```

### Usage

To use the screenshot MCP, you must launch it via a compatible client, such as the [MCP Inspector](https://github.com/modelcontextprotocol/inspector). The server communicates over `stdio` and is not meant to be run directly by a user.

**Example with MCP Inspector:**

1.  Make sure the MCP is installed globally:
    ```bash
    npm install -g glasses-mcp
    ```
2.  Launch the MCP Inspector and tell it to run the `glasses-mcp` command:
    ```bash
    npx @modelcontextprotocol/inspector glasses-mcp
    ```
3.  The Inspector UI will open in your browser. Connect to the server and you can now call the `screenshot` tool.

## Tool: `screenshot`

### Parameters

| Name         | Type                     | Required | Default | Description                                           |
|--------------|--------------------------|----------|---------|-------------------------------------------------------|
| `url`        | `string`                 | Yes      | -       | The full URL of the website to capture.               |
| `outputPath` | `string`                 | Yes      | -       | The local file path to save the screenshot to.        |
| `format`     | `"png"` \| `"jpeg"`      | No       | `"png"` | The output image format.                              |
| `fullPage`   | `boolean`                | No       | `true`  | If `true`, captures the entire page. If `false`, captures only the visible viewport. |

### Returns

A JSON object with the following structure:

**Success:**
```json
{
  "success": true,
  "outputPath": "/path/to/your/screenshot.png"
}
```

**Failure:**
```json
{
  "success": false,
  "error": "Error message describing the failure."
}
```

## Development

To contribute to this project:

1.  Clone the repository:
    ```bash
    git clone https://github.com/gourraguis/glasses-mcp.git
    ```
2.  Install dependencies:
    ```bash
    cd glasses-mcp
    npm install
    ```
3.  Build the project:
    ```bash
    npm run build
    ```
4.  To test, use the MCP Inspector with your local build:
    ```bash
    npx @modelcontextprotocol/inspector node dist/main.js
    ```