# Glasses MCP: Let Your AI See the Web 👓

[![NPM Version](https://img.shields.io/npm/v/glasses-mcp?style=flat-square)](https://www.npmjs.com/package/glasses-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Your AI assistant is a powerful partner, capable of processing immense amounts of text and code. But when it comes to the visual web, it's flying blind. It can't see the layout of a competitor's landing page, the design of a complex dashboard, or the look of your latest prototype.

**Glasses MCP gives it sight.**

It's a simple tool that allows your AI to request a perfect, device-specific screenshot of any website. It's not just about taking pictures; it's about giving your AI the context it's been missing, turning the visual web into a resource it can finally understand and interact with.

## Table of Contents

- [Features](#features)
- [Setup & Integration](#setup--integration)
- [Usage](#usage)
  - [Example Prompts](#example-prompts)
  - [Tool Reference: `screenshot`](#tool-reference-screenshot)
  - [Supported Devices](#supported-devices)
  - [Error Handling](#error-handling)
  - [Limitations](#limitations)
- [Development & Contributing](#development--contributing)

## Features

*   **Capture any URL:** Take a screenshot of any public website or local development server.
*   **Device Emulation:** See how a site looks on a variety of popular phones, tablets, and laptops.
*   **Selectable Format:** Choose between `png` and `jpeg` image formats.
*   **Full Page or Viewport:** Capture the entire scrollable page or just the visible viewport.
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

Here are a few examples of how you can use Glasses MCP.

For a straightforward capture of a homepage, where the AI can infer the filename:
> "Take a screenshot of github.com and save it to my desktop."

To specify a different image format and save location:
> "Get a JPEG screenshot of the latest news on bbc.com/news and save it in my downloads folder."

To see how a website looks on a mobile device, specifying the exact output filename:
> "Capture the verge.com homepage as it would appear on a small iOS device and save it as `verge-mobile.png`."

To capture a local development server, focusing only on the visible portion of the page:
> "Capture just the viewport of my local server at `http://localhost:3000`."

### Tool Reference: `screenshot`

| Name         | Type                     | Required | Default | Description                                           |
|--------------|--------------------------|----------|---------|-------------------------------------------------------|
| `url`        | `string`                 | Yes      | -       | The full URL of the website to capture.               |
| `outputPath` | `string`                 | Yes      | -       | The local file path to save the screenshot to.        |
| `format`     | `"png"` \| `"jpeg"`      | No       | `"png"` | The output image format.                              |
| `fullPage`   | `boolean`                | No       | `true`  | If `true`, captures the entire page. If `false`, captures only the visible viewport. |
| `device`     | `string`                 | No       | `laptop-hidpi` | The name of the device to emulate (see Supported Devices below). |

### Supported Devices

The `screenshot` tool can optionally emulate a specific device, which sets the viewport size, pixel density, and user agent to match. We have curated a list of popular and representative devices to provide good coverage of the most common form factors while keeping the list manageable.

| Device Name                 | Device ID        | Category | Represents                               |
|-----------------------------|------------------|----------|------------------------------------------|
| `iPhone 14 Pro Max`         | `ios-large`      | Phone    | A large, modern iOS device.              |
| `iPhone SE`                 | `ios-small`      | Phone    | A smaller, older-generation iOS device.  |
| `Pixel 6 Pro`               | `android-large`  | Phone    | A large, modern Android device.          |
| `Galaxy S8`                 | `android-medium` | Phone    | A common, slightly older Android device. |
| `iPad Pro 11`               | `tablet-large`   | Tablet   | A modern, high-resolution tablet.        |
| `iPad Mini`                 | `tablet-small`   | Tablet   | A smaller, popular tablet format.        |
| `Laptop with HiDPI screen`  | `laptop-hidpi`   | Laptop   | A high-resolution laptop (e.g., MacBook Pro). |
| `Laptop with MDPI screen`  | `laptop-mdpi`    | Laptop   | A standard-resolution laptop.            |

**Returns:** A JSON object indicating success or failure.
```json
{
  "success": true,
  "outputPath": "/path/to/your/screenshot.png"
}
```

### Error Handling

If the tool encounters an error (e.g., an invalid URL, a website that fails to load), it will return a JSON object with the `isError` flag set to `true` and a descriptive error message.

```json
{
  "success": false,
  "error": "net::ERR_NAME_NOT_RESOLVED at https://invalid-url-here.com"
}
```

### Limitations

*   **No Login/Authentication:** The tool cannot log in to websites that require authentication. It can only capture publicly accessible content.
*   **Anti-Bot Measures:** Some websites employ sophisticated anti-bot technologies that may block the tool from capturing a screenshot.
*   **Complex Interactions:** The tool does not support complex interactions like clicking buttons, filling out forms, or scrolling to a specific element before taking a screenshot.

## Development & Contributing

To contribute to this project:

1.  Clone the repository: `git clone https://github.com/gourraguis/glasses-mcp.git`
2.  Install dependencies: `cd glasses-mcp && npm install`
3.  Build the project: `npm run build`
4.  To test your local build, use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):
    ```bash
    npx @modelcontextprotocol/inspector node dist/main.js
    ```
