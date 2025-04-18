import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LandingPage from "./components/LandingPage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import Verification from "./components/Verification";
import Welcome from "./components/Welcome";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/Profile";
import TransfersPage from "./pages/Transfer";
import TransactionsPage from "./pages/TransactionsHistory";
import BillsPage from "./pages/Bills";
import SchoolFeesPage from "./pages/SchoolFees";
import InternationalPage from "./pages/International";
import InvestmentsPage from "./pages/Investment";
import LoansPage from "./pages/Loan";
import CardsPage from "./pages/Card";
import SettingsPage from "./pages/Setting";

import Sidebar from "./components/common/Sidebar";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      {authUser && <Sidebar />}

      <div className="flex-1 overflow-y-auto">
        <Routes>
          {/* Root route - Show landing page for unauthenticated users, redirect to dashboard for authenticated users */}
          <Route
            path="/"
            element={authUser ? <Navigate to="/dashboard" /> : <LandingPage />}
          />

          {/* Public routes for unauthenticated users */}
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/verify"
            element={<Verification />}
          />
          
          {/* Protected routes for authenticated users */}
          <Route
            path="/welcome"
            element={authUser ? <Welcome /> : <Navigate to="/verify" />}
          />
          <Route
            path="/dashboard"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/notifications"
            element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/transfers"
            element={authUser ? <TransfersPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/transactions"
            element={authUser ? <TransactionsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/bills"
            element={authUser ? <BillsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/school-fees"
            element={authUser ? <SchoolFeesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/international"
            element={authUser ? <InternationalPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/investments"
            element={authUser ? <InvestmentsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/loans"
            element={authUser ? <LoansPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/cards"
            element={authUser ? <CardsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default App;