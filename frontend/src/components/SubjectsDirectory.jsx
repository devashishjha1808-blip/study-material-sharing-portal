import React from 'react';
import { useMaterials } from '../context/MaterialContext';

export const SubjectsDirectory = ({ onSelectSubject }) => {
  const { subjects, materials } = useMaterials();

  const getSubjectMaterialCount = (subjectId) => {
    return materials.filter(m => m.subject?.id === subjectId).length;
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '24px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Academic Course Directory</h2>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
          Explore departmental course subjects and syllabi across all undergraduate semesters.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {subjects.map((sub) => {
          const count = getSubjectMaterialCount(sub.id);
          return (
            <div
              key={sub.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onClick={() => onSelectSubject(sub.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="course-code-pill">{sub.code}</span>
                  <span className="semester-badge">Semester {sub.semester}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  {sub.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '12px' }}>
                  {sub.department}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2563eb' }}>
                  {count} {count === 1 ? 'material' : 'materials'} available
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Browse Notes →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
