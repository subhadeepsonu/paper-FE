const PaperCard = ({ paper, role, userId, onEdit, onDelete, onModerate, onCoordinate }) => {
    return (
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold">{paper.name}</h2>
        <p>Faculty ID: {paper.facultyId}</p>
        <p>Course ID: {paper.courseId}</p>
        <p>Status: {paper.status}</p>
        <div className="mt-2 space-x-2">
          {(role === "ADMIN" || paper.facultyId === userId) && onEdit && (
            <button onClick={() => onEdit(paper)} className="bg-yellow-500 text-white p-1 rounded">
              Edit
            </button>
          )}
          {(role === "ADMIN" || paper.facultyId === userId) && onDelete && (
            <button onClick={() => onDelete(paper.id)} className="bg-red-500 text-white p-1 rounded">
              Delete
            </button>
          )}
          {role === "MODERATOR" && onModerate && paper.status === "PENDING" && (
            <>
              <button onClick={() => onModerate(paper.id, "APPROVED")} className="bg-green-500 text-white p-1 rounded">
                Approve
              </button>
              <button onClick={() => onModerate(paper.id, "REJECTED")} className="bg-red-500 text-white p-1 rounded">
                Reject
              </button>
            </>
          )}
          {role === "COORDINATOR" && onCoordinate && paper.status === "APPROVED_BY_MODERATOR" && (
            <>
              <button onClick={() => onCoordinate(paper.id, "APPROVED")} className="bg-green-500 text-white p-1 rounded">
                Approve
              </button>
              <button onClick={() => onCoordinate(paper.id, "REJECTED")} className="bg-red-500 text-white p-1 rounded">
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default PaperCard;
  