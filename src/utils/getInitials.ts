export const getInitials = (firstName?: string, lastName?: string): string => {
  const first = firstName?.[0]?.toUpperCase() ?? "";
  const last = lastName?.[0]?.toUpperCase() ?? "";
  return `${first}${last}` || "--";
};
