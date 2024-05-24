import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import ProtectedRoute from "./utils/routes/protectedRoute";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {routes.map((route, index) => {
            const Element = route.protected ? (
              <ProtectedRoute>{route.element}</ProtectedRoute>
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
