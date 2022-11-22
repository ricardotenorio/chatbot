import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <AuthProvider>

        <Routes>

          <Route path='/'
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />

          <Route path='/login' element={<Login />} />

        </Routes>

      </AuthProvider>
    </div>
  );
}

export default App;
