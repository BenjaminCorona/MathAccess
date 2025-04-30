import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/auth/page";
import ContentPage from "./pages/content/page";
import CreateContentPage from "./pages/create-content/page";
import CreateProblemPage from "./pages/create-problem/page";
import DashboardPage from "./pages/dashboard/page";
import MetricsPage from "./pages/metrics/page";
import ProblemsPage from "./pages/problems/page";
import ProgressPage from "./pages/progress/page";
function App() {
    return (
        <>
            <Routes>
                {/* Rutas */}
                <Route path="/*" element={<LandingPage />} />
                <Route path="*" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/auth?register=true" element={<AuthPage />} />
                <Route path="/content" element={<ContentPage />} />
                <Route path="/content/:id" element={<ContentPage />} />
                <Route path="/create-content" element={<CreateContentPage />} />
                <Route path="/create-problem" element={<CreateProblemPage />} />        
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/metrics" element={<MetricsPage />} />
                <Route path="/problems" element={<ProblemsPage />} />
                <Route path="/problems/:id" element={<ProblemsPage />} />
                <Route path="/progress" element={<ProgressPage />} />

            </Routes>
        </>
    );
}

export default App;
