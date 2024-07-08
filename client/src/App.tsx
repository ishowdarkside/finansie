import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/app" />} />
        <Route path="/auth">
          <Route index element={<Navigate to="login" />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
