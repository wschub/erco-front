
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Offers from "./pages/Offers";
import { Users } from "./pages/Users";
import { Transactions } from "./pages/Transactions";
import { UsersForm } from "./pages/UsersForm";
import { OffersForm } from "./pages/OffersForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
            
              <Route index element={<Dashboard />} />
              <Route path="bar-charts" element={<Dashboard />} />
              <Route path="pie-charts" element={<Dashboard />} />
              <Route path="line-charts" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="register" element={<UsersForm />} />
              <Route path="newOffer" element={<OffersForm />} />
              <Route path="offers" element={<Offers />} />
              <Route path="transactions" element={<Transactions />} />

            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
