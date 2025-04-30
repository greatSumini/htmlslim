import { slimHtml } from "../../lib/slim-html.js";

/**
 * A simple service for slimming html
 */
export class SlimHtmlService {
  /**
   * Generate a greeting message
   * @param name The name to greet
   * @returns A greeting message
   */
  public static slimHtml(html: string) {
    return slimHtml(html).html;
  }
}
