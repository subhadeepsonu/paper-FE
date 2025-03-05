import axios from "./Axios";

export const createQuestion = async (data) => {
  try {
    const response = await axios.post("/api/v1/questions", data); // Fixed API path
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

export const updateQuestion = async (id, data) => {
  try {
    const response = await axios.put(`/api/v1/questions/${id}`, data); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Error updating question (ID: ${id}):`, error);
    throw error;
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/questions/${id}`); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Error deleting question (ID: ${id}):`, error);
    throw error;
  }
};

export const fetchQuestions = async () => {
  try {
    const response = await axios.get("/api/v1/questions"); // Fixed API path
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
