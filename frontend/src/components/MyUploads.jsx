import React, { useState } from 'react';
import { useMaterials } from '../context/MaterialContext';
import { useAuth } from '../context/AuthContext';

export const MyUploads = () => {
  const { materials, deleteMaterial, updateMaterial, setPreviewMaterial } = useMaterials();
  const { user, isAdmin } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Filter materials owned by current user (or all if admin)
  const myItems = isAdmin
    ? materials
    : materials.filter((m) => m.uploader?.email?.toLowerCase() === user.email?.toLowerCase());

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteMaterial(id);
      } catch (err) {
        alert('Could not delete: ' + err.message);
      }
    }
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setEditTitle(m.title);
    setEditDesc(m.description);
  };

  const saveEdit = async (id) => {
    try {
      await updateMaterial(id, { title: editTitle, description: editDesc });
      setEditingId(null);
    } catch (err) {
      alert('Could not update: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '24px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
            {isAdmin ? 'Admin Resource Moderation Management' : 'My Uploaded Resources'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            {isAdmin
              ? 'Administrator privilege: Moderate, verify, or remove any catalog materials.'
              : `Managing materials authored by ${user.name} (${user.email}).`}
          </p>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#1e40af' }}>
          Total Managed: <strong>{myItems.length}</strong>
        </div>
      </div>

      {myItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h3>No uploads found under this account</h3>
          <p>You haven't uploaded any study materials yet. Click 'Upload Resource' to share your notes.</p>
        </div>
      ) : (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '12px 16px' }}>Resource Title</th>
                <th style={{ padding: '12px 16px' }}>Subject</th>
                <th style={{ padding: '12px 16px' }}>Semester</th>
                <th style={{ padding: '12px 16px' }}>Downloads</th>
                <th style={{ padding: '12px 16px' }}>Uploader</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myItems.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', maxWidth: '320px' }}>
                    {editingId === m.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <input
                          type="text"
                          className="form-input"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                          rows="2"
                          className="form-textarea"
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div>
                        <strong style={{ color: '#0f172a', display: 'block', marginBottom: '2px' }}>
                          {m.title}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {m.fileType} • {m.fileSize}
                        </span>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="course-code-pill">{m.subject?.code}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="semester-badge">Sem {m.semester}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#2563eb' }}>
                    {m.downloads}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: '#475569' }}>
                    {m.uploader?.name}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {editingId === m.id ? (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          style={{ padding: '4px 8px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => saveEdit(m.id)}
                        >
                          Save
                        </button>
                        <button
                          style={{ padding: '4px 8px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          className="btn-preview"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          onClick={() => setPreviewMaterial(m)}
                        >
                          View
                        </button>
                        <button
                          className="btn-preview"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          onClick={() => startEdit(m)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ padding: '4px 8px', fontSize: '0.75rem', background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => handleDelete(m.id, m.title)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
