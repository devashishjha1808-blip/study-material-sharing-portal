import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMaterials } from '../context/MaterialContext';

export const Navbar = () => {
  const { user, switchDemoRole } = useAuth();
  const { searchQuery, setSearchQuery, setIsUploadOpen, backendOnline } = useMaterials();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="app-navbar">
      <div className="nav-container">
        {/* Brand */}
        <div className="brand-wrapper" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-logo-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M6 6h10"></path>
              <path d="M6 10h10"></path>
            </svg>
          </div>
          <div>
            <div className="brand-title">
              CampusPortal
              <span style={{ fontSize: '0.62rem', background: '#dbeafe', color: '#1d4ed8', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
                ACADEMIC
              </span>
            </div>
            <div className="brand-subtitle">Study Material Sharing</div>
          </div>
        </div>

        {/* Search */}
        <div className="nav-search-bar">
          <svg className="nav-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            ref={searchInputRef}
            id="global-search-input"
            type="text"
            className="nav-search-input"
            placeholder="Search notes, PYQs, courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="nav-search-badge">Ctrl K</span>
        </div>

        {/* Actions & Role Switcher */}
        <div className="nav-actions">
          {/* Live backend status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: backendOnline ? '#059669' : '#64748b' }} title={backendOnline ? "Connected to Kotlin Spring Boot backend (port 8080)" : "Running in standalone client evaluation mode with simulated store"}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: backendOnline ? '#10b981' : '#94a3b8' }}></span>
            <span>{backendOnline ? 'Spring Live' : 'Demo Mode'}</span>
          </div>

          {/* Quick Role Switcher for Viva Evaluation */}
          <div className="role-switcher" title="Instantly switch current user role to demonstrate role-based access control (RBAC)">
            <span className="role-switcher-label">Role:</span>
            <button
              id="role-btn-student"
              className={`role-btn ${user.role === 'STUDENT' ? 'active' : ''}`}
              onClick={() => switchDemoRole('STUDENT')}
            >
              Student
            </button>
            <button
              id="role-btn-faculty"
              className={`role-btn ${user.role === 'FACULTY' ? 'active' : ''}`}
              onClick={() => switchDemoRole('FACULTY')}
            >
              Faculty
            </button>
            <button
              id="role-btn-admin"
              className={`role-btn ${user.role === 'ADMIN' ? 'active' : ''}`}
              onClick={() => switchDemoRole('ADMIN')}
            >
              Admin
            </button>
          </div>

          {/* Upload Button */}
          <button
            id="navbar-upload-btn"
            className="btn-upload-nav"
            onClick={() => setIsUploadOpen(true)}
            title="Upload new study material (Exp 3 & 6)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload Resource
          </button>
        </div>
      </div>
    </header>
  );
};
