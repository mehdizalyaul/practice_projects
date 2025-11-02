export default function getStatusColor(status) {
  switch (status) {
    case "todo":
      return "#9CA3AF"; // Cool Gray
    case "in_progress":
      return "#F59E0B"; // Amber
    case "review":
      return "#3B82F6"; // Soft Blue
    case "done":
      return "#10B981"; // Emerald Green
    default:
      return "#9CA3AF"; // fallback
  }
}
