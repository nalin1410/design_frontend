const API_BASE_URL = import.meta.env.VITE_API_URL;

export const signupUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
