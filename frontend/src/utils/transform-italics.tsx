export function transformItalics(text: string): string {
  return text.replace(/_([^_]{1,100}?)_/g, "<em>$1</em>");
}
