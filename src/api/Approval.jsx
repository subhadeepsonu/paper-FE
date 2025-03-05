import React, { useEffect, useState } from "react";
import axios from "./Axios"; // Ensure you have this Axios instance set up

// API Functions
export const getApprovals = async () => {
  try {
    const response = await axios.get("/api/v1/approval");
    return response.data;
  } catch (error) {
    console.error("Error fetching approvals:", error);
    return [];
  }
};

export const getApprovalById = async (id) => {
  try {
    const response = await axios.get(`/api/v1/approval/${id}`); // Fixed API path
    return response.data;
  } catch (error) {
    console.error(`Error fetching approval with ID ${id}:`, error);
    return null;
  }
};

// React Component
const ApprovalsList = () => {
  const [approvals, setApprovals] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprovals = async () => {
      const data = await getApprovals();
      if (data.length === 0) {
        setError("No approvals found.");
      } else {
        setApprovals(data);
      }
    };
    fetchApprovals();
  }, []);

  const handleApprovalClick = async (id) => {
    const data = await getApprovalById(id);
    if (data) {
      setSelectedApproval(data);
      setError("");
    } else {
      setError(`Could not fetch details for approval ID: ${id}`);
    }
  };

  return (
    <div>
      <h2>Approvals List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {approvals.length > 0 ? (
        <ul>
          {approvals.map((approval) => (
            <li key={approval.id} onClick={() => handleApprovalClick(approval.id)} style={{ cursor: "pointer" }}>
              {approval.status} - {approval.reviewer}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading approvals...</p>
      )}
      {selectedApproval && (
        <div>
          <h3>Approval Details</h3>
          <p>ID: {selectedApproval.id}</p>
          <p>Status: {selectedApproval.status}</p>
          <p>Reviewer: {selectedApproval.reviewer}</p>
        </div>
      )}
    </div>
  );
};

export default ApprovalsList;
