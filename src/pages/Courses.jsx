import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import {
  getCourses,
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../api/Course";

const Courses = () => {
  const { role } = useAuth();
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    moderatorId: "",
    coordinatorId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = role === "ADMIN" ? await getCourses() : await getMyCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [role]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const newCourse = await createCourse(form);
      setCourses([...courses, newCourse]); // Use API response
      setForm({ name: "", code: "", moderatorId: "", coordinatorId: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Courses</h1>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      {role === "ADMIN" && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Create a Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Course Name"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Course Code"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="text"
              name="moderatorId"
              value={form.moderatorId}
              onChange={handleChange}
              placeholder="Moderator ID"
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              name="coordinatorId"
              value={form.coordinatorId}
              onChange={handleChange}
              placeholder="Coordinator ID"
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            onClick={handleCreate}
            className="w-full mt-3 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Create Course
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="p-4 border rounded shadow-lg bg-gray-50">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p><strong>Code:</strong> {course.code}</p>
              <p><strong>Moderator:</strong> {course.moderatorId || "N/A"}</p>
              <p><strong>Coordinator:</strong> {course.coordinatorId || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
