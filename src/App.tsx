import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PathMap } from './pages/PathMap';
import { Profile } from './pages/Profile';
import { QuizPage } from './pages/QuizPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-odyssey-bg">
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PathMap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:questId"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-[80vh]">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔭</div>
                    <h2 className="text-2xl font-bold font-display text-odyssey-accent">Coming Soon</h2>
                    <p className="text-odyssey-muted mt-2">This quest is still being mapped...</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
