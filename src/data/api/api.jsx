const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL || "http://localhost:8080";
const THOUGHTS_URL =
  import.meta.env.VITE_THOUGHTS_API_URL ||
  `${AUTH_BASE_URL}/thoughts`;
const USERS_URL = `${AUTH_BASE_URL}/users`;
const ANONYMOUS_ID_STORAGE_KEY = "happy-thoughts-anonymous-id";

export const getAnonymousClientId = () => {
  if (typeof window === "undefined") return null;

  try {
    const existing = localStorage.getItem(ANONYMOUS_ID_STORAGE_KEY);
    if (existing) return existing;

    const generated =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem(ANONYMOUS_ID_STORAGE_KEY, generated);
    return generated;
  } catch {
    return null;
  }
};

const parseApiError = (data, fallbackMessage) => {
  if (!data) return fallbackMessage;
  if (typeof data?.error === "string") return data.error;
  if (typeof data?.message === "string") return data.message;
  if (data?.errors && typeof data.errors === "object") {
    return Object.values(data.errors).filter(Boolean).join(", ") || fallbackMessage;
  }
  return fallbackMessage;
};

export const fetchMessages = async ({ page = 1, limit = 20 } = {}) => {
  const url = `${THOUGHTS_URL}?page=${page}&limit=${limit}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch thoughts");
  }

  return response.json();
};

export const updateMessage = async (id, messageText, { token } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${THOUGHTS_URL}/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ message: messageText }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte uppdatera thought"));
  }

  return data;
};

export const createMessage = async (messageText, { token, authorName } = {}) => {
  const payload = { message: messageText };
  if (authorName) {
    payload.name = authorName;
  }

  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(THOUGHTS_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    const apiMessage =
      data?.message ||
      data?.error ||
      (Array.isArray(data?.errors) && data.errors[0]?.message) ||
      "Message must be 5–140 characters";

    throw new Error(apiMessage);
  }

  return data;
};

export const likeMessage = async (id, { token } = {}) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    const anonymousId = getAnonymousClientId();
    if (anonymousId) {
      headers["X-Anonymous-Id"] = anonymousId;
    }
  }

  const response = await fetch(`${THOUGHTS_URL}/${id}/like`, {
    method: "POST",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to like thought");
  }

  return response.json();
};

export const deleteMessage = async (id, { token } = {}) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${THOUGHTS_URL}/${id}`, {
    method: "DELETE",
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte ta bort thought"));
  }

  return data;
};

export const loginUser = async ({ identifier, password }) => {
  const response = await fetch(`${USERS_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte logga in"));
  }

  return data;
};

export const signupUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
  cityValue,
}) => {
  const response = await fetch(`${USERS_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
      cityValue,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte skapa konto"));
  }

  return data;
};

export const forgotPassword = async ({ email }) => {
  const response = await fetch(`${USERS_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte skicka återställningslänk"));
  }

  return data;
};

export const resetPassword = async ({ token, newPassword }) => {
  const response = await fetch(`${USERS_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte återställa lösenordet"));
  }

  return data;
};

export const verifyEmail = async ({ token }) => {
  const response = await fetch(`${USERS_URL}/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte verifiera e-post"));
  }

  return data;
};

export const updateMyAccount = async (payload, { token } = {}) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${USERS_URL}/me`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte uppdatera kontot"));
  }

  return data;
};

export const deleteMyAccount = async ({ token } = {}) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${USERS_URL}/me`, {
    method: "DELETE",
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte ta bort kontot"));
  }

  return data;
};

export const fetchUserProfile = async (username) => {
  const response = await fetch(`${USERS_URL}/${encodeURIComponent(username)}/profile`);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseApiError(data, "Kunde inte hämta användarprofil"));
  }

  return data;
};
