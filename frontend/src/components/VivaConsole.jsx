import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMaterials } from '../context/MaterialContext';

export const VivaConsole = () => {
  const { user, token } = useAuth();
  const { backendOnline, rawMaterials } = useMaterials();
  const [activeTab, setActiveTab] = useState('experiments');
  const [apiResponse, setApiResponse] = useState(null);
  const [testingEndpoint, setTestingEndpoint] = useState('');

  const runTestApi = async (name, url, method = 'GET') => {
    setTestingEndpoint(name);
    setApiResponse({ loading: true });
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setApiResponse({ status: res.status, ok: res.ok, data });
    } catch (err) {
      setApiResponse({
        status: 'Client Fallback Simulated',
        data: {
          endpoint: url,
          note: 'Spring Boot backend is not running locally. Demonstrating simulated JSON payload.',
          sampleData: rawMaterials.slice(0, 2)
        }
      });
    }
  };

  const EXPERIMENTS = [
    { num: 1, title: 'REST API + CRUD using Postman', status: 'Ready', deliverable: 'postman/Study_Material_Portal.postman_collection.json' },
    { num: 2, title: 'React + Components + JSX', status: 'Ready', deliverable: 'frontend/src/components/ (Navbar, MaterialCard, FilterBar)' },
    { num: 3, title: 'Hooks + Context API + Forms', status: 'Ready', deliverable: 'useState, useEffect, AuthContext, validated Upload form' },
    { num: 4, title: 'Kotlin Core Concepts & OOP', status: 'Ready', deliverable: 'kotlin-core-demos/Experiment4_CoreConcepts.kt' },
    { num: 5, title: 'Exceptions + Collections Operations', status: 'Ready', deliverable: 'kotlin-core-demos/Experiment5_ExceptionsCollections.kt' },
    { num: 6, title: 'Kotlin Spring Boot REST', status: 'Ready', deliverable: 'backend/src/main/kotlin/.../controller/' },
    { num: 7, title: 'JPA / Hibernate + Database', status: 'Ready', deliverable: 'backend/src/main/kotlin/.../entity/ & H2/MySQL DB' },
    { num: 8, title: 'JWT Authentication & RBAC', status: 'Ready', deliverable: 'backend/src/main/kotlin/.../security/ (Spring Security 6)' },
    { num: 9, title: 'Microservices Architecture', status: 'Ready', deliverable: 'microservices/ (User Service + Material Service REST)' },
    { num: 10, title: 'Cloud / Server Deployment', status: 'Ready', deliverable: 'docker-compose.yml & backend/Dockerfile' },
    { num: 11, title: 'Flutter + Dart Basics', status: 'Ready', deliverable: 'mobile/lib/screens/ & widgets/ (Identical Design System)' },
    { num: 12, title: 'Flutter State Management', status: 'Ready', deliverable: 'mobile/lib/providers/ (AuthProvider & MaterialProvider)' },
    { num: 13, title: 'Flutter + REST Integration', status: 'Ready', deliverable: 'mobile/lib/services/ApiService.dart' },
    { num: 14, title: 'Firebase Auth + Firestore', status: 'Ready', deliverable: 'mobile/lib/services/FirebaseService.dart' },
    { num: 15, title: 'Final Integrated Project', status: 'Ready', deliverable: 'Full Stack Kotlin + React + Flutter Ecosystem' }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '24px auto', padding: '0 20px' }}>
      <div className="api-console-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              Academic Viva & Live Experiment Console
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Designed for lab practical defense and oral viva examinations. Map any prescribed experiment directly to working code.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`cat-pill ${activeTab === 'experiments' ? 'active' : ''}`}
              onClick={() => setActiveTab('experiments')}
            >
              All 15 Experiments Matrix
            </button>
            <button
              className={`cat-pill ${activeTab === 'token' ? 'active' : ''}`}
              onClick={() => setActiveTab('token')}
            >
              JWT & Security Inspector
            </button>
            <button
              className={`cat-pill ${activeTab === 'api' ? 'active' : ''}`}
              onClick={() => setActiveTab('api')}
            >
              Live API Tester
            </button>
          </div>
        </div>

        {activeTab === 'experiments' && (
          <div>
            <table className="experiments-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Exp #</th>
                  <th>Prescribed Academic Module</th>
                  <th>Implementation Status</th>
                  <th>Target Code File / Deliverable</th>
                </tr>
              </thead>
              <tbody>
                {EXPERIMENTS.map((exp) => (
                  <tr key={exp.num}>
                    <td>
                      <strong style={{ color: '#2563eb' }}>Exp {exp.num}</strong>
                    </td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{exp.title}</td>
                    <td>
                      <span className="status-badge-ok">✓ {exp.status}</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#334155' }}>
                      {exp.deliverable}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'token' && (
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>Active Session JWT Authentication Token</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              This stateless JSON Web Token is included in the <code>Authorization: Bearer &lt;token&gt;</code> header on all authenticated Spring Boot requests.
            </p>
            <div className="api-token-box">
              {token}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '16px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Decoded Subject (Email)</span>
                <strong>{user.email}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Granted Role Authority</span>
                <strong style={{ color: '#2563eb' }}>ROLE_{user.role}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Algorithm</span>
                <strong>HMAC-SHA256 (HS256)</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Backend Security Status</span>
                <strong>{backendOnline ? 'Spring Security 6 Active' : 'Client Guard Active'}</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px' }}>
              Click an endpoint below to dispatch an authenticated REST request to the backend:
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <button
                className="btn-preview"
                onClick={() => runTestApi('GET /api/materials', 'http://localhost:8080/api/materials')}
              >
                GET /api/materials
              </button>
              <button
                className="btn-preview"
                onClick={() => runTestApi('GET /api/subjects', 'http://localhost:8080/api/subjects')}
              >
                GET /api/subjects
              </button>
              <button
                className="btn-preview"
                onClick={() => runTestApi('GET /api/categories', 'http://localhost:8080/api/categories')}
              >
                GET /api/categories
              </button>
              <button
                className="btn-preview"
                onClick={() => runTestApi('GET /api/health', 'http://localhost:8080/api/health')}
              >
                GET /api/health
              </button>
            </div>

            {apiResponse && (
              <div style={{ background: '#0f172a', color: '#38bdf8', borderRadius: '8px', padding: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', maxHeight: '280px', overflowY: 'auto' }}>
                <div style={{ color: '#94a3b8', marginBottom: '6px' }}>
                  Response for <strong>{testingEndpoint}</strong>:
                </div>
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
