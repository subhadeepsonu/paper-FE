import { useAuth } from "../Contexts/AuthContext";

const Dashboard = () => {
  const { role, userId } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {role} (ID: {userId})!</p>
      <p>This is your role-based dashboard. Navigate using the menu above.</p>
    </div>
  );
};

export default Dashboard;