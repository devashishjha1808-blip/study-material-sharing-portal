import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_ACCOUNTS = {
  STUDENT: {
    id: 1,
    name: 'Aarav Sharma',
    email: 'student@campus.edu',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    semester: 5
  },
  FACULTY: {
    id: 2,
    name: 'Dr. R. K. Mukherjee',
    email: 'faculty@campus.edu',
    role: 'FACULTY',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor'
  },
  ADMIN: {
    id: 3,
    name: 'Academic Administrator',
    email: 'admin@campus.edu',
    role: 'ADMIN',
    department: 'Dean Academic Affairs',
    designation: 'Portal Administrator'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_ACCOUNTS.STUDENT);
  const [token, setToken] = useState('demo_jwt_token_header_payload_signature_student');

  useEffect(() => {
    // Generate simulated JWT matching role
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: user.email, role: user.role, userId: user.id }))}.mock_sig_${Date.now()}`;
    setToken(mockJwt);
  }, [user]);

  const switchDemoRole = (roleKey) => {
    if (DEMO_ACCOUNTS[roleKey]) {
      setUser(DEMO_ACCOUNTS[roleKey]);
    }
  };

  const login = (email, password) => {
    const matched = Object.values(DEMO_ACCOUNTS).find(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      return true;
    }
    // Generic fallback for custom logins
    const customUser = {
      id: 99,
      name: email.split('@')[0],
      email: email,
      role: 'STUDENT',
      department: 'General Engineering',
      semester: 1
    };
    setUser(customUser);
    return true;
  };

  const logout = () => {
    setUser(DEMO_ACCOUNTS.STUDENT);
  };

  return (
    <AuthContext.Provider value={{ user, token, switchDemoRole, login, logout, isFaculty: user.role === 'FACULTY', isAdmin: user.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
