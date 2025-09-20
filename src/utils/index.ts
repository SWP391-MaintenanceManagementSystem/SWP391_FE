function formatCooldown(cooldown: number): string {
    const minutes = Math.floor(cooldown / 60)
    const seconds = cooldown % 60
    return `${minutes}m ${seconds.toString().padStart(2, "0")}s`
}
export { formatCooldown }