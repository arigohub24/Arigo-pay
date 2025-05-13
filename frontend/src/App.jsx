import { Navigate, Route, Routes } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

import HomePage from "./pages/home/HomePage"
import LandingPage from "./components/LandingPage"
import LoginPage from "./pages/auth/login/LoginPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import OnboardingFlow from "./components/OnboardingFlow"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/Profile"
import TransfersPage from "./pages/Transfer"
import TransactionsPage from "./pages/TransactionsHistory"
import BillsPage from "./pages/Bills"
import SchoolFeesPage from "./pages/SchoolFees"
import InternationalPage from "./pages/International"
import InvestmentsPage from "./pages/Investment"
import LoansPage from "./pages/Loan"
import CardsPage from "./pages/Card"
import SettingsPage from "./pages/Setting"

import Sidebar from "./components/common/Sidebar"
import LoadingSpinner from "./components/common/LoadingSpinner"



function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()
        if (data.error) return null
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log("authUser is here:", data)
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false,
  })

  // Check if user has completed onboarding
  const hasCompletedOnboarding = authUser?.isOnboardingComplete || localStorage.getItem("onboardingComplete") === "true"

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="flex w-full h-screen">
      {authUser && hasCompletedOnboarding && <Sidebar />}

      <div className="flex-1 overflow-y-auto">
        <Routes>
          {/* Root route - Show landing page for unauthenticated users, redirect to dashboard for authenticated users */}
          <Route
            path="/"
            element={
              !authUser ? (
                <LandingPage />
              ) : hasCompletedOnboarding ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/onboarding" />
              )
            }
          />

          {/* Public routes for unauthenticated users */}
          <Route
            path="/login"
            element={
              !authUser ? (
                <LoginPage />
              ) : hasCompletedOnboarding ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/onboarding" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !authUser ? (
                <SignUpPage />
              ) : hasCompletedOnboarding ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/onboarding" />
              )
            }
          />

          {/* Onboarding flow for new users */}
          <Route
            path="/onboarding"
            element={
              authUser && !hasCompletedOnboarding ? (
                <OnboardingFlow
                  onComplete={() => {
                    // Update local storage and potentially make API call to update user status
                    localStorage.setItem("onboardingComplete", "true")
                    // You might want to make an API call here to update the user's status
                    // fetch("/api/user/complete-onboarding", { method: "POST" });
                  }}
                />
              ) : (
                <Navigate to={authUser ? "/dashboard" : "/login"} />
              )
            }
          />

          {/* Protected routes for authenticated users */}
          <Route
            path="/dashboard"
            element={
              authUser ? (
                hasCompletedOnboarding ? (
                  <HomePage />
                ) : (
                  <Navigate to="/onboarding" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/notifications"
            element={authUser && hasCompletedOnboarding ? <NotificationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:username"
            element={authUser && hasCompletedOnboarding ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/transfers"
            element={authUser && hasCompletedOnboarding ? <TransfersPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/transactions"
            element={authUser && hasCompletedOnboarding ? <TransactionsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/bills"
            element={authUser && hasCompletedOnboarding ? <BillsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/school-fees"
            element={authUser && hasCompletedOnboarding ? <SchoolFeesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/international"
            element={authUser && hasCompletedOnboarding ? <InternationalPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/investments"
            element={authUser && hasCompletedOnboarding ? <InvestmentsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/loans"
            element={authUser && hasCompletedOnboarding ? <LoansPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/cards"
            element={authUser && hasCompletedOnboarding ? <CardsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={authUser && hasCompletedOnboarding ? <SettingsPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      <Toaster />
    </div>
  )
}

export default App
