import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
