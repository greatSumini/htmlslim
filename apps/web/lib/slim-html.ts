export function slimHtml(html: string) {
  // Track removed elements
  const removedElements: Record<string, number> = {}

  // Function to count removed elements
  const countRemoved = (tag: string) => {
    removedElements[tag] = (removedElements[tag] || 0) + 1
  }

  let slimmedHtml = html

  // Remove <head> section and its contents
  slimmedHtml = slimmedHtml.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, () => {
    countRemoved("head")
    return ""
  })

  // Remove scripts
  slimmedHtml = slimmedHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, () => {
    countRemoved("script")
    return ""
  })

  // Remove noscript tags and their content
  slimmedHtml = slimmedHtml.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, () => {
    countRemoved("noscript")
    return ""
  })

  // Remove styles
  slimmedHtml = slimmedHtml.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, () => {
    countRemoved("style")
    return ""
  })

  // Remove comments
  slimmedHtml = slimmedHtml.replace(/<!--[\s\S]*?-->/g, () => {
    countRemoved("comment")
    return ""
  })

  // Remove meta tags
  slimmedHtml = slimmedHtml.replace(/<meta\b[^>]*>/gi, () => {
    countRemoved("meta")
    return ""
  })

  // Remove link tags
  slimmedHtml = slimmedHtml.replace(/<link\b[^>]*>/gi, () => {
    countRemoved("link")
    return ""
  })

  // Remove SVG elements
  slimmedHtml = slimmedHtml.replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, () => {
    countRemoved("svg")
    return ""
  })

  // Remove data-* attributes
  slimmedHtml = slimmedHtml.replace(/\s+data-[a-zA-Z0-9-]+="[^"]*"/g, () => {
    countRemoved("data-attr")
    return ""
  })

  // Remove event handlers (onclick, onload, etc.)
  slimmedHtml = slimmedHtml.replace(/\s+on[a-z]+="[^"]*"/gi, () => {
    countRemoved("event-handler")
    return ""
  })

  // Remove id attributes
  slimmedHtml = slimmedHtml.replace(/\s+id="[^"]*"/g, () => {
    countRemoved("id-attr")
    return ""
  })

  // Remove class attributes
  slimmedHtml = slimmedHtml.replace(/\s+class="[^"]*"/g, () => {
    countRemoved("class-attr")
    return ""
  })

  // Remove style attributes
  slimmedHtml = slimmedHtml.replace(/\s+style="[^"]*"/g, () => {
    countRemoved("style-attr")
    return ""
  })

  // Remove empty lines and excessive whitespace
  slimmedHtml = slimmedHtml
    .replace(/^\s*[\r\n]/gm, "")
    .replace(/\s{2,}/g, " ")
    .trim()

  return {
    html: slimmedHtml,
    removedElements,
  }
}
