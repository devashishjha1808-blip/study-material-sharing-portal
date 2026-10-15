import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { MaterialCard } from './components/MaterialCard';
import { MaterialDetailsModal } from './components/MaterialDetailsModal';
import { UploadModal } from './components/UploadModal';
import { SubjectsDirectory } from './components/SubjectsDirectory';
import { DatabaseViewer } from './components/DatabaseViewer';
import { MyUploads } from './components/MyUploads';
import { VivaConsole } from './components/VivaConsole';
import { useMaterials } from './context/MaterialContext';
import { useAuth } from './context/AuthContext';

export function App() {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse', 'subjects', 'database', 'my-uploads', 'viva'
  const { materials, loading, setSelectedSubject, setIsUploadOpen } = useMaterials();
  const { isAdmin } = useAuth();

  const handleSelectSubjectFromDirectory = (subId) => {
    setSelectedSubject(subId);
    setActiveTab('browse');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar />

      {/* Sub-Header Navigation Tabs */}
      <nav className="sub-nav" aria-label="Secondary navigation">
        <div className="sub-nav-container">
          <button
            id="tab-btn-browse"
            className={`tab-link ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Materials
            <span className="tab-badge">{materials.length}</span>
          </button>
          <button
            id="tab-btn-subjects"
            className={`tab-link ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            Subjects Directory
          </button>
          <button
            id="tab-btn-database"
            className={`tab-link ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
            title="Inspect relational database tables, schemas, and queries (Exp 7)"
          >
            Database & SQL Tables
            <span className="tab-badge" style={{ background: '#fef3c7', color: '#b45309', fontWeight: 700 }}>
              Exp 7
            </span>
          </button>
          <button
            id="tab-btn-my-uploads"
            className={`tab-link ${activeTab === 'my-uploads' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-uploads')}
          >
            {isAdmin ? 'Admin Moderation' : 'My Uploads'}
          </button>
          <button
            id="tab-btn-viva"
            className={`tab-link ${activeTab === 'viva' ? 'active' : ''}`}
            onClick={() => setActiveTab('viva')}
          >
            API & Viva Console
            <span className="tab-badge" style={{ background: '#dcfce7', color: '#15803d', fontWeight: 700 }}>
              15 Exps
            </span>
          </button>
          <button
            id="tab-btn-upload-direct"
            className="tab-link"
            style={{ color: '#2563eb', fontWeight: 700, marginLeft: 'auto' }}
            onClick={() => setIsUploadOpen(true)}
            title="Open Upload Dialog"
          >
            + Upload Note
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'browse' && (
          <>
            <HeroBanner />
            <FilterBar />

            <div className="materials-container">
              <div className="materials-header">
                <div className="results-count">
                  Showing <strong>{materials.length}</strong> academic resources
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '6px' }}>Loading catalog...</div>
                  <div style={{ fontSize: '0.85rem' }}>Fetching materials from repository</div>
                </div>
              ) : materials.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <h3>No matching materials found</h3>
                  <p>Try adjusting your semester or category filters, or search for another keyword.</p>
                  <button
                    id="empty-state-upload-btn"
                    className="btn-upload-nav"
                    style={{ margin: '0 auto' }}
                    onClick={() => setIsUploadOpen(true)}
                  >
                    Upload this Resource
                  </button>
                </div>
              ) : (
                <div className="materials-grid">
                  {materials.map((item) => (
                    <MaterialCard key={item.id} material={item} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'subjects' && (
          <SubjectsDirectory onSelectSubject={handleSelectSubjectFromDirectory} />
        )}

        {activeTab === 'database' && (
          <DatabaseViewer />
        )}

        {activeTab === 'my-uploads' && (
          <MyUploads />
        )}

        {activeTab === 'viva' && (
          <VivaConsole />
        )}
      </main>

      {/* Always Visible Floating Action Button (FAB) for 100% upload accessibility */}
      <button
        id="fab-upload-btn"
        className="fab-upload"
        onClick={() => setIsUploadOpen(true)}
        aria-label="Upload Study Material"
        title="Upload new study material (Exp 3 & 6)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        <span>Upload Resource</span>
      </button>

      {/* Footer */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '24px 20px', marginTop: 'auto', fontSize: '0.8rem', color: '#64748b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <strong>Study Material Sharing Portal</strong> — Full-Stack Academic Project mapped to Experiments 1–15
          </div>
          <div>
            Database: H2 (<code>jdbc:h2:mem:studyportal_db</code>) / MySQL (<code>studymaterial_db:3306</code>)
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MaterialDetailsModal />
      <UploadModal />
    </div>
  );
}

export default App;
