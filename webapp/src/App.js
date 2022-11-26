import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {
  return (

    <div className="container-fluid m-0 min-vh-100">
      <AuthProvider>

        <Routes>

          <Route path='/'
            exact
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

          <Route path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

          <Route path='/login' element={<Login />} />

        </Routes>

      </AuthProvider>
    </div>
  );
}

export default App;
