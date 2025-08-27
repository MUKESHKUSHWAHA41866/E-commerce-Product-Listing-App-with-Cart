export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")     // remove non word/space/hyphen
    .replace(/\s+/g, "-")         // spaces -> hyphens
    .replace(/-+/g, "-");         // collapse multiple hyphens
}
