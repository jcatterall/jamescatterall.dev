export type CommandKind = "goto" | "help" | "clear" | "ls" | "unknown";

export type ParsedCommand = {
  kind: CommandKind;
  args: string[];
  raw: string;
};

export const ROUTE_MAP: Record<string, string> = {
  home: "/",
  "/": "/",
  barcode: "/barcode",
  "/barcode": "/barcode",
  session: "/session",
  "/session": "/session",
};

export const COMPLETABLE_COMMANDS = [
  "clear",
  "goto /",
  "goto /barcode",
  "goto barcode",
  "goto /session",
  "goto session",
  "goto home",
  "help",
  "ls",
  "pages",
];

export const HELP_TEXT = [
  "AVAILABLE COMMANDS",
  "  goto <destination>   navigate to a page",
  "  ls / pages           list available pages",
  "  clear                clear terminal history",
  "  help                 show this message",
  "",
  "DESTINATIONS",
  "  home  /              homepage",
  "  barcode  /barcode    barcode studio",
  "  session  /session   session timer",
];

export const LS_TEXT = [
  "PAGES",
  "  /          homepage",
  "  /barcode   barcode studio",
  "  /session   session timer",
];

export function parseCommand(input: string): ParsedCommand {
  const parts = input.trim().toLowerCase().split(/\s+/);
  const [verb, ...args] = parts;
  if (verb === "goto") return { kind: "goto", args, raw: input };
  if (verb === "help") return { kind: "help", args: [], raw: input };
  if (verb === "clear") return { kind: "clear", args: [], raw: input };
  if (verb === "ls" || verb === "pages")
    return { kind: "ls", args: [], raw: input };
  return { kind: "unknown", args, raw: input };
}

export function unknownMessage(cmd: string): string {
  return `command not found: "${cmd}" — maybe try \`help\`?`;
}
