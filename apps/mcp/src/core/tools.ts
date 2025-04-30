import { FastMCP } from "fastmcp";
import { z } from "zod";
import * as services from "./services/index.js";

/**
 * Register all tools with the MCP server
 *
 * @param server The FastMCP server instance
 */
export function registerTools(server: FastMCP) {
  // Greeting tool
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
}
