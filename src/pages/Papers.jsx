import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import {
  getPapers,
  createPaper,
  updatePaper,
  updatePaperModerator,
  updatePaperCoordinator,
  deletePaper,
} from "../api/Paper";
import PaperCard from "../components/Papercard";
import Loader from "../components/Loader";

const Papers = () => {
  const { role, userId } = useAuth();
  const [papers, setPapers] = useState([]);
  const [form, setForm] = useState({ name: "", facultyId: userId || "", courseId: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const data = await getPapers();
        setPapers(data);
      } catch (err) {
        console.error("Error fetching papers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  const handleCreate = async () => {
    if (!form.name || !form.courseId) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const newPaper = await createPaper({ ...form, facultyId: userId });
      setPapers([...papers, newPaper]);
      setForm({ name: "", facultyId: userId || "", courseId: "" });
    } catch (err) {
      console.error("Error creating paper:", err);
    }
  };

  const handleEdit = async (paper) => {
    const updatedName = prompt("Enter new name:", paper.name);
    if (!updatedName) return;

    try {
      await updatePaper(paper.id, { name: updatedName });
      setPapers((prev) =>
        prev.map((p) => (p.id === paper.id ? { ...p, name: updatedName } : p))
      );
    } catch (err) {
      console.error("Error updating paper:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      await deletePaper(id);
      setPapers((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting paper:", err);
    }
  };

  const handleModerate = async (id, status) => {
    try {
      await updatePaperModerator(id, { status });
      setPapers((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: status === "APPROVED" ? "APPROVED_BY_MODERATOR" : "REJECTED" } : p
        )
      );
    } catch (err) {
      console.error("Error moderating paper:", err);
    }
  };

  const handleCoordinate = async (id, status) => {
    try {
      await updatePaperCoordinator(id, { status });
      setPapers((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: status === "APPROVED" ? "APPROVED_BY_COORDINATOR" : "REJECTED" } : p
        )
      );
    } catch (err) {
      console.error("Error coordinating paper:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Papers</h1>

      {(role === "FACULTY" || role === "ADMIN") && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Paper Name"
            className="p-2 border rounded flex-1"
          />
          <input
            type="text"
            value={form.courseId}
            onChange={(e) => setForm({ ...form, courseId: e.target.value })}
            placeholder="Course ID"
            className="p-2 border rounded flex-1"
          />
          <button onClick={handleCreate} className="bg-green-500 text-white p-2 rounded">
            Create
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {papers.length > 0 ? (
          papers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              role={role || ""}
              userId={userId || ""}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onModerate={handleModerate}
              onCoordinate={handleCoordinate}
            />
          ))
        ) : (
          <p>No papers available.</p>
        )}
      </div>
    </div>
  );
};

export default Papers;