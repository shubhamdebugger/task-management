import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1>Task Manager</h1>
      <button onClick={handleLogout} className="cursor-pointer">Logout</button>
    </div>
  );
}