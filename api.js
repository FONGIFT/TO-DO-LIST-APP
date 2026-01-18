const API_URL = "http://localhost:3000";

export async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(API_URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });
    return await res.json();
  } catch (err) {
    console.error("API error:", err);
    return { error: "Network error" };
  }
}