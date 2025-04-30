# HTML Slim MCP Server

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6)
![FastMCP](https://img.shields.io/badge/FastMCP-1.21.0-orange)

A Model Context Protocol (MCP) server for HTML slimming - removes unnecessary tags, attributes, and elements from HTML documents to create cleaner, more readable content.

## What is Model Context Protocol (MCP)?

MCP is an open standard protocol that standardizes connections between Large Language Models (LLMs) and applications, similar to how USB-C standardizes physical connections. MCP is built around three core concepts:

### 1. Tools: Function Execution

Tools are executable functions exposed by the server through `tools/call`. They allow LLMs to:

- Directly call APIs, databases, and external services
- Perform actions ranging from simple calculations to complex operations like creating GitHub PRs
- Be discoverable via the `tools/list` endpoint

### 2. Resources: Data Endpoints

Resources are read-only data sources that:

- Extend a model's context without side effects (similar to HTTP GET)
- Provide files, documents, and metadata via `resources/read`
- Allow models to directly access, cite, and process information
- Improve accuracy and relevance by providing targeted data

### 3. Prompts: Reusable Templates

Prompts are reusable conversation templates that:

- Accept variable arguments to generate standardized message sequences
- Allow clients to select predefined workflows for consistent conversations
- Reduce prompt engineering costs and improve conversation quality

## How This MCP Server Works

This server implements a simple HTML slimming service using the FastMCP framework. It provides:

1. **Tool Implementation**: `slim_html` tool that removes unnecessary HTML elements and attributes
2. **Resource Implementation**: Configuration data for the HTML slimming process
3. **Prompt Implementation**: Template for requesting HTML slimming operations

### Key Components

The server is organized into the following structure:

```
src/
├── core/
│   ├── tools.ts       # Tool definitions (slim_html)
│   ├── resources.ts   # Resource definitions (default config)
│   ├── prompts.ts     # Prompt templates
│   └── services/      # Business logic implementations
├── lib/
│   └── slim-html.ts   # Core HTML slimming functionality
└── server/
    ├── server.ts      # Base server setup
    └── http-server.ts # HTTP transport configuration
```

### HTML Slimming Functionality

The `slim_html` tool:

- Removes script, style, head, and other non-essential tags
- Strips data attributes, event handlers, and styling attributes
- Cleans up whitespace for more compact output
- Returns both the slimmed HTML and statistics about removed elements

## Getting Started

### Installation

```bash
# Install dependencies
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Running the Server

The server supports two transport methods:

#### 1. stdio Transport (CLI Mode)

```bash
# Start the stdio server
npm start
# or
bun start
```

#### 2. HTTP/SSE Transport (Web Mode)

```bash
# Start the HTTP server
npm run start:http
# or
bun run start:http
```

By default, the HTTP server runs on port 3001. You can change this with the PORT environment variable:

```bash
PORT=8080 npm run start:http
```

## Usage Examples

### Using the slim_html Tool

```typescript
// Example of calling the slim_html tool
const result = await mcp.tools.call("slim_html", {
  html: "<div class='container' style='color:red'>Hello <script>alert('hi')</script>World</div>",
});

// Result:
// "<div>Hello World</div>"
```

### Accessing Configuration Resource

```typescript
// Example of accessing the default configuration
const config = await mcp.resources.read("mcp://config/default");

// Result:
// {
//   "removeTags": ["script", "style", "head", "noscript", "meta", "link", "svg"],
//   "removeAttributes": ["data-*", "on*", "id", "class", "style"]
// }
```

### Using the Prompt Template

```typescript
// Example of using the slim_html prompt
const prompt = await mcp.prompts.load("slim_html", {
  html: "<div class='container'>Hello <script>alert('hi')</script>World</div>",
});

// Result:
// "다음 HTML을 슬림 처리해 주세요. 불필요 태그와 속성을 제거하고, 결과만 반환해 주세요.
//
// <div class='container'>Hello <script>alert('hi')</script>World</div>"
```

## Connecting to the Server

### From Cursor

To connect from Cursor:

1. Open Cursor and go to Settings
2. Navigate to "Features" → "MCP Servers"
3. Add a new MCP server with:
   - For stdio: Choose "command" type with command `npm start`
   - For HTTP: Choose "url" type with URL `http://localhost:3001/sse`

### Using mcp.json

Create an `.cursor/mcp.json` in your project directory:

```json
{
  "mcpServers": {
    "html-slim-stdio": {
      "command": "npm",
      "args": ["start"],
      "env": {
        "NODE_ENV": "development"
      }
    },
    "html-slim-http": {
      "url": "http://localhost:3001/sse"
    }
  }
}
```

## Development

For development with auto-reload:

```bash
# Development mode with stdio
npm run dev

# Development mode with HTTP
npm run dev:http
```

## Technical Implementation

### Tool Registration

```typescript
server.addTool({
  name: "slim_html",
  description: "A simple slim html tool",
  parameters: z.object({
    html: z.string().describe("HTML to slim"),
  }),
  execute: async (params) => {
    const slimmedHtml = services.SlimHtmlService.slimHtml(params.html);
    return slimmedHtml;
  },
});
```

### Resource Registration

```typescript
server.addResourceTemplate({
  uriTemplate: "mcp://config/default",
  name: "Default Config",
  mimeType: "application/json",
  arguments: [],
  async load({}) {
    const defaultConfig = {
      removeTags: [
        "script",
        "style",
        "head",
        "noscript",
        "meta",
        "link",
        "svg",
      ],
      removeAttributes: ["data-*", "on*", "id", "class", "style"],
    };

    return {
      text: JSON.stringify(defaultConfig),
    };
  },
});
```

### Prompt Registration

```typescript
server.addPrompt({
  name: "slim_html",
  description: "A simple slim html prompt",
  arguments: [
    {
      name: "html",
      description: "HTML to slim",
      required: true,
    },
  ],
  load: async ({ html }) => {
    return `다음 HTML을 슬림 처리해 주세요. 불필요 태그와 속성을 제거하고, 결과만 반환해 주세요.

${html}`;
  },
});
```

## License

This project is licensed under the MIT License.
