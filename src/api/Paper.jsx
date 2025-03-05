import axios from "./Axios";

export const getPapers = async () => {
  try {
    const response = await axios.get("/api/v1/paper");
    return response.data;
  } catch (error) {
    console.error("Error fetching papers:", error);
    throw error;
  }
};

export const getPaperById = async (id) => {
  try {
    const response = await axios.get(`/api/v1/paper/${id}`); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Error fetching paper with ID ${id}:`, error);
    throw error;
  }
};

export const createPaper = async (data) => {
  try {
    const response = await axios.post("/api/v1/paper", data); // Fixed API path
    return response.data;
  } catch (error) {
    console.error("Error creating paper:", error);
    throw error;
  }
};

export const updatePaper = async (id, data) => {
  try {
    const response = await axios.put(`/api/v1/paper/${id}`, data); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Error updating paper (ID: ${id}):`, error);
    throw error;
  }
};

export const updatePaperModerator = async (id, data) => {
  try {
    const response = await axios.put(`/api/v1/paper/moderator/${id}`, data); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Error updating paper moderator (ID: ${id}):`, error);
    throw error;
  }
};

export const updatePaperCoordinator = async (id, data) => {
  try {
    const response = await axios.put(`/api/v1/paper/coordinator/${id}`, data); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Error updating paper coordinator (ID: ${id}):`, error);
    throw error;
  }
};

export const deletePaper = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/paper/${id}`); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Error deleting paper (ID: ${id}):`, error);
    throw error;
  }
};
