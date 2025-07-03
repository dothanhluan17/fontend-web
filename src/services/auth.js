const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  console.log("loginUser CALLED", email, password);
  try {
    const res = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("DATA LOGIN:", data);
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    throw error;
  }
};