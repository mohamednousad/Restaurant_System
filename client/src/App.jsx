import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createRoutes } from "./routes";
import { useSelector } from "react-redux";

function App() {
  const { isAuth } = useSelector(state => state.user);
  const allRoutes = createRoutes();

  return (
    <Router>
      <Routes>
        {allRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.path === "/auth" && isAuth ? (
                <Navigate to="/" />
              ) : (
                route.element
              )
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;