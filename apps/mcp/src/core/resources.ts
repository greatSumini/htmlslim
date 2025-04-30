import { FastMCP } from "fastmcp";

/**
 * Register all resources with the MCP server
 * @param server The FastMCP server instance
 */
export function registerResources(server: FastMCP) {
  // defaultConfig 리소스 추가
  server.addResourceTemplate({
    uriTemplate: "mcp://config/default",
    name: "Default Config",
    mimeType: "application/json",
    arguments: [],
    async load({}) {
      // 기본 제거 태그 및 속성 규칙
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
}
