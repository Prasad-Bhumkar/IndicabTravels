import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
  headers?: Record<string, string>
): Promise<Response> {
  const defaultHeaders: Record<string, string> = data ? { "Content-Type": "application/json" } : {};
  const combinedHeaders = { ...defaultHeaders, ...headers };

  // Prepend Spring Boot backend URL if url is relative
  const backendUrl = "http://localhost:8080";
  const fullUrl = url.startsWith("http") ? url : backendUrl + url;

  const res = await fetch(fullUrl, {
    method,
    headers: combinedHeaders,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}



type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    const headers: Record<string, string> = {};

    // Add Authorization header for admin API endpoints
    if (url.startsWith("/api/bookings") || url.startsWith("/api/contact-messages")) {
      headers["Authorization"] = "Bearer admin-token";
    }

    // Prepend backend server URL to API requests
    const backendUrl = "http://localhost:8080";
    const fullUrl = url.startsWith("http") ? url : backendUrl + url;

    const res = await fetch(fullUrl, {
      headers,
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
