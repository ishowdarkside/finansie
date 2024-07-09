import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import RegisterPanel from "./features/auth/RegisterPanel/RegisterPanel";
import LoginPanel from "./features/auth/LoginPanel/LoginPanel";
import AuthPage from "./pages/auth/Auth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/AppLayout/AppLayout";
import Dashboard from "./pages/app/Dashboard/Dashboard";
import Protect from "./features/Protect/Protect";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/app" />} />
            <Route path="/auth" element={<AuthPage />}>
              <Route index element={<Navigate to="login" />} />
              <Route path="register" element={<RegisterPanel />} />
              <Route path="login" element={<LoginPanel />} />
            </Route>

            {/*MAIN APP PORTION ROUTING */}
            <Route
              path="/app"
              element={
                <Protect>
                  <AppLayout />
                </Protect>
              }
            >
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
