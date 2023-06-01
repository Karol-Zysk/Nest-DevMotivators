const currentTime = new Date();

export const expiresTime = new Date(
  currentTime.getTime() + 30 * 60 * 60 * 1000
);

export function formatDateString(createdAt: string | undefined) {
  if (!createdAt) {
    return "";
  }

  const date = new Date(createdAt);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}
