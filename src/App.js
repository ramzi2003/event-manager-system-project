import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import ProtectedRoute from "./utils/routes/protectedRoute";
import Sidebar from "./components/sidebar";
import AdminProtection from "./utils/api/adminProtection";
import LoadingPage from "./components/loadingPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {routes.map((route, index) => {
            const Element = route.protected ? (
              <ProtectedRoute>
                <AdminProtection adminOnly={route.adminOnly}>
                  {route.element}
                </AdminProtection>
              </ProtectedRoute>
            ) : (
              route.element
            );
            return <Route key={index} path={route.path} element={Element} />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
