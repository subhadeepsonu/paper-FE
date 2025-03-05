import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { createQuestion, updateQuestion, deleteQuestion, fetchQuestions } from "../api/Questions";
import Loader from "../components/Loader";

const Questions = () => {
  const { role } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ text: "", paperId: "", imgurl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const newQuestion = await createQuestion(form);
      setQuestions([...questions, newQuestion]);
      setForm({ text: "", paperId: "", imgurl: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to create question");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (question) => {
    const updatedText = prompt("Enter new text:", question.text);
    if (updatedText) {
      try {
        setLoading(true);
        await updateQuestion(question.id, { text: updatedText });
        setQuestions(questions.map((q) => (q.id === question.id ? { ...q, text: updatedText } : q)));
      } catch (err) {
        console.error(err);
        setError("Failed to update question");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        setLoading(true);
        await deleteQuestion(id);
        setQuestions(questions.filter((q) => q.id !== id));
      } catch (err) {
        console.error(err);
        setError("Failed to delete question");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Questions</h1>

      {(role === "FACULTY" || role === "ADMIN") && (
        <div className="mb-4 bg-gray-100 p-4 rounded-lg shadow">
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={handleChange}
            placeholder="Question Text"
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            name="paperId"
            value={form.paperId}
            onChange={handleChange}
            placeholder="Paper ID"
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            name="imgurl"
            value={form.imgurl}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="p-2 border rounded w-full mb-2"
          />
          <button onClick={handleCreate} className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600">
            Create Question
          </button>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="p-4 border rounded-lg shadow bg-white">
            <p className="text-lg font-medium">{question.text}</p>
            {question.imgurl && <img src={question.imgurl} alt="Question" className="max-w-xs mt-2 rounded-md" />}
            <p className="text-sm text-gray-600">Paper ID: {question.paperId}</p>

            {(role === "ADMIN" || role === "FACULTY") && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(question)}
                  className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;