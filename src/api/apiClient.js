import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

let isRedirecting = false;

apiClient.interceptors.response.use(
  // Any status code that lies within the range of 2xx causes this function to trigger
  (response) => response,

  // Any status codes outside the range of 2xx cause this function to trigger
  async (error) => {
    const originalRequest = error.config;

    // Handle Network errors or server down scenarios
    if (!error.response) {
      console.error("Network error or server unreachable:", error.message);
      return Promise.reject(error);
    }

    const { status } = error.response;

    // Handle 401 Unauthorized errors
    if (status === 401) {
      // Prevent infinite redirect loops if the login request itself fails with 401
      const isLoginRequest = originalRequest.url?.includes("/auth/login");
      const isCheckAuthRequest = originalRequest.url?.includes("/me");

      // If it's just the initial session check failing, you might want to let
      // the AuthProvider handle the unauthenticated state gracefully instead of hard redirecting.
      if (!isLoginRequest && !isCheckAuthRequest && !isRedirecting) {
        isRedirecting = true;

        // Optional: clear any client-side user state if stored outside of React state
        // (If using the AuthProvider from the previous example, clearing state happens naturally
        // when the app re-mounts or routes to login).

        // Redirect to login page
        window.location.href = "/login";

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
