    cat > src/features/auth/hooks/useLogin.js << 'EOF'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await dispatch(login(credentials)).unwrap();
      
      // Redirect based on user role
      switch (result.user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'advisor':
          navigate('/advisor/dashboard');
          break;
        case 'investor':
          navigate('/investor/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
      
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login: handleLogin,
    isLoading,
    error,
    setError
  };
};
EOF
