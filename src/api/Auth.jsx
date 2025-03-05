import axios from "./Axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/api/v1/user/login", { email, password }); // Fixed API path
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (name, email, password, role) => {
  try {
    const response = await axios.post("/api/v1/user/register", { name, email, password, role }); // Fixed API path
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
