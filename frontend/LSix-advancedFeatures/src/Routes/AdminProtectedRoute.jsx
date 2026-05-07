import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  // In this lesson, we check for admin status from localStorage
  // In Lesson 7, this will use authentication service
  const isAdmin = JSON.parse(localStorage.getItem("adminUser")) || false;

  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
