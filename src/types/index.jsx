export const Course = {
    id: "",
    name: "",
    code: "",
    moderatorId: "",
    coordinatorId: "",
    faculty: [], // Array of { id, name }
  };
  
  export const Paper = {
    id: "",
    name: "",
    facultyId: "",
    courseId: "",
    status: "PENDING", // Default status
    submittedAt: null, // Optional timestamp
  };
  
  export const Question = {
    id: "",
    imgurl: null,
    text: "",
    paperId: "",
    marks: null, // Optional field for marks
  };
  
  export const Approval = {
    id: "",
    paperId: "",
    user: { id: "", name: "" },
    status: "PENDING", // Default status
    approvedAt: null, // Optional timestamp
  };
  