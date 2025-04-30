import { FastMCP } from "fastmcp";

/**
 * Register all prompts with the MCP server
 * @param server The FastMCP server instance
 */
export function registerPrompts(server: FastMCP) {
  // Example prompt
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
}
