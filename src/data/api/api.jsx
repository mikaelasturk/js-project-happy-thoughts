const URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

export const fetchMessages = async () => {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Failed to fetch thoughts");
  }

  return response.json();
};

export const createMessage = async (messageText) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: messageText })
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

export const likeMessage = async (id) => {
  const response = await fetch(`${URL}/${id}/like`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Failed to like thought");
  }

  return response.json();
};
