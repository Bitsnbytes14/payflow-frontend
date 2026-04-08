import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('payflow_merchant');
    if (stored) {
      try {
        setMerchant(JSON.parse(stored));
      } catch {
        localStorage.removeItem('payflow_merchant');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { merchant, token } = await apiLogin({ email, password });

    localStorage.setItem('payflow_token', token);
    localStorage.setItem('payflow_merchant', JSON.stringify(merchant));

    setMerchant(merchant);
    return merchant;
  };

  const register = async (data) => {
    const { merchant, token } = await apiRegister(data);

    localStorage.setItem('payflow_token', token);
    localStorage.setItem('payflow_merchant', JSON.stringify(merchant));

    setMerchant(merchant);
    return merchant;
  };

  const logout = () => {
    localStorage.removeItem('payflow_token');
    localStorage.removeItem('payflow_merchant');
    setMerchant(null);
  };

  return (
    <AuthContext.Provider value={{ merchant, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);