const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL_WEB ?? "http://localhost:3000";

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.body !== undefined
        ? { "Content-Type": "application/json" }
        : {}),
    },
    ...(options.body !== undefined
      ? { body: JSON.stringify(options.body) }
      : {}),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `API ${response.status} ${response.statusText}: ${
        errorBody || "Sin detalles"
      }`,
    );
  }

  return (await response.json()) as T;
}
