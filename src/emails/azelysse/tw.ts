import type { CSSProperties } from "hono/jsx";

export function tw(classes: string): CSSProperties {
  const styleMap: Record<string, CSSProperties> = {
    "bg-white": { backgroundColor: "#ffffff" },
    "font-sans": { fontFamily: "ui-sans-serif, system-ui, sans-serif" },
    "max-w-md": { maxWidth: "28rem" },
    "mx-auto": { marginLeft: "auto", marginRight: "auto" },
    "p-8": { padding: "2rem" },
    "mb-4": { marginBottom: "1rem" },
    "mb-6": { marginBottom: "1.5rem" },
    "my-8": { marginTop: "2rem", marginBottom: "2rem" },
    "text-xl": { fontSize: "1.25rem" },
    "text-sm": { fontSize: "0.875rem" },
    "text-xs": { fontSize: "0.75rem" },
    "text-gray-500": { color: "#6b7280" },
    "leading-relaxed": { lineHeight: "1.625" },
    "font-bold": { fontWeight: 700 },
    "border-gray-200": {
      borderColor: "#e5e7eb",
      borderTopWidth: "1px", // helpful for <Hr />
    },
  };

  return classes
    .split(" ")
    .map((cls) => styleMap[cls])
    .filter(Boolean) // ✅ prevent undefined from breaking reduce
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});
}
