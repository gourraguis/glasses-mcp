# Website Screenshot MCP

This project is a Model-Context-Peripheral (MCP) server that provides a tool for taking screenshots of websites. It is an open source project created by Abderrahmane Gourragui.

## Overview

The primary goal of this project is to create a simple, yet powerful, MCP that can be used by AI agents to capture screenshots of web pages. The server is built using the [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) and uses [Puppeteer](https://pptr.dev/) for headless browser automation.

## Features

*   Take a full-page screenshot of any URL.
*   Save the screenshot to a specified path.
*   (Coming Soon) Choose between PNG and JPEG formats.
*   (Coming Soon) Capture only the above-the-fold content.

## Getting Started

### Prerequisites

*   Node.js v18.x or higher

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/gourraguis/glasses-mcp.git
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Server

1.  Compile the TypeScript code:
    ```bash
    npx tsc
    ```
2.  Run the compiled server:
    ```bash
    node dist/main.js
    ```
> **Note:** A `start` script will be configured in `package.json` as part of the initial project setup to simplify this process.

## Development

### Testing

To test the server during development, you can use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

1.  Start the server (see "Running the Server" above).
2.  In a separate terminal, run the MCP Inspector:
    ```bash
    npx @modelcontextprotocol/inspector
    ```
3.  Open the Inspector UI in your browser (usually at `http://127.0.0.1:6274`) and connect to the running server to test the `screenshot` tool.

## Project Management

This project's development is managed through a series of tickets located in the `/tickets` directory.
