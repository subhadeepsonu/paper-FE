import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { getApprovals } from "../api/Approval";
import Loader from "../components/Loader";

const Approvals = () => {
  const { role } = useAuth();
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (role !== "ADMIN") return;

    const fetchApprovals = async () => {
      try {
        const data = await getApprovals();
        setApprovals(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load approval logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovals();
  }, [role]);

  if (role !== "ADMIN") {
    return <p className="text-red-500 text-center mt-4">🚫 Access Denied</p>;
  }

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Approval Logs</h1>

      {approvals.length === 0 ? (
        <p className="text-gray-500 text-center">No approvals found.</p>
      ) : (
        <div className="space-y-4">
          {approvals.map((approval) => (
            <div
              key={approval.id}
              className="p-4 border rounded shadow-lg bg-gray-50"
            >
              <p className="text-lg font-semibold">📄 Paper ID: {approval.paperId}</p>
              <p className="text-gray-700">
                👤 User: <span className="font-medium">{approval.user.name}</span> 
                {" "} (ID: {approval.user.id})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Approvals;
