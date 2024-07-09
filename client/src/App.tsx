import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterPanel from "./features/auth/RegisterPanel/RegisterPanel";
import LoginPanel from "./features/auth/LoginPanel/LoginPanel";
import AuthPage from "./pages/auth/Auth";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="register" element={<RegisterPanel />} />
            <Route path="login" element={<LoginPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
