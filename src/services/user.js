const apiUrl = import.meta.env.VITE_API_URL;

export const updateProfile = async (data, token) => {
  const res = await fetch(`${apiUrl}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Cập nhật thất bại");
  return await res.json();
};