function formatCooldown(cooldown: number): string {
  const minutes = Math.floor(cooldown / 60);
  const seconds = cooldown % 60;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

function toCapitalize(input: string): string {
  if (!input) return "";

  const withSpaces = input.replace(/_/g, " ");

  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export { formatCooldown, toCapitalize };
