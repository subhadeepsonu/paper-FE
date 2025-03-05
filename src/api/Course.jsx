import axios from "./Axios";

export const getCourses = async () => {
  try {
    const response = await axios.get("/api/v1/course");
    return response.data;
  } catch (error) {
    console.error("Get courses error:", error);
    throw error;
  }
};

export const getMyCourses = async () => {
  try {
    const response = await axios.get("/api/v1/course/my"); // Adjust if needed
    return response.data;
  } catch (error) {
    console.error("Get my courses error:", error);
    throw error;
  }
};

export const getCourse = async (id) => {
  try {
    const response = await axios.get(`/api/v1/course/${id}`); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Get course error (ID: ${id}):`, error);
    throw error;
  }
};

export const createCourse = async (data) => {
  try {
    const response = await axios.post("/api/v1/course", data); // Fixed API path
    return response.data;
  } catch (error) {
    console.error("Create course error:", error);
    throw error;
  }
};

export const updateCourse = async (id, data) => {
  try {
    const response = await axios.put(`/api/v1/course/${id}`, data); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Update course error (ID: ${id}):`, error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/course/${id}`); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Delete course error (ID: ${id}):`, error);
    throw error;
  }
};
