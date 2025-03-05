import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/");
      return;
    }

    const allowedRoutes = {
      admin: "/admin",
      faculty: "/faculty",
      coordinator: "/coordinator",
      moderator: "/moderator",
    };

    if (!role || !allowedRoutes[role.toLocaleLowerCase()] || !location.pathname.startsWith(allowedRoutes[role.toLocaleLowerCase()])) {
      navigate("/");
      return;
    }

    if (location.pathname === "/") {
      navigate(`/${role}/dashboard`);
    }
  }, [location.pathname, navigate]);

  return element;
}
