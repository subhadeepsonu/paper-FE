import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // Assuming role is stored in localStorage
  if (!role) return null;
  const getNavLinks = () => {
    switch (role.toLocaleLowerCase()) {
      case "admin":
        return [
          { path: "/admin/dashboard", label: "Dashboard" },
          { path: "/admin/users", label: "Users" },
          { path: "/admin/approvals", label: "Approvals" },
        ];
      case "faculty":
        return [
          { path: "/faculty/dashboard", label: "Dashboard" },
          { path: "/faculty/courses", label: "Courses" },
        ];
      case "coordinator":
        return [
          { path: "/coordinator/dashboard", label: "Dashboard" },
          { path: "/coordinator/courses", label: "Courses" },
        ];
      case "moderator":
        return [
          { path: "/moderator/dashboard", label: "Dashboard" },
          { path: "/moderator/courses", label: "Courses" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex justify-between items-center h-16 w-full bg-red-50 fixed top-0 px-4">
      <div className="flex gap-4">
        {getNavLinks().map((link) => (
          <button key={link.path} onClick={() => navigate(link.path)} className="">
            {link.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        className="text-red-500 rounded-md border border-red-500 px-4 py-2 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
