import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (

    //  d-flex justify-content-center align-items-center
    <div className="container-fluid m-0 min-vh-100">
      <AuthProvider>

        <Routes>

          <Route path='/'
            exact
            element={
              <ProtectedRoute>
                <Home />
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
