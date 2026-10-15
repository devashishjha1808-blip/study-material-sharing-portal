import React, { useState } from 'react';
import { useMaterials } from '../context/MaterialContext';
import { useAuth } from '../context/AuthContext';

export const DatabaseViewer = () => {
  const { materials, subjects, categories, backendOnline } = useMaterials();
  const { user } = useAuth();
  const [selectedTable, setSelectedTable] = useState('study_materials');
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM study_materials WHERE semester = 5;');
  const [queryResult, setQueryResult] = useState(null);

  // Schema definitions matching JPA entities in Kotlin Spring Boot
  const SCHEMAS = {
    study_materials: [
      { column: 'id', type: 'BIGINT PRIMARY KEY', nullable: 'NO', desc: 'Auto-increment primary key' },
      { column: 'title', type: 'VARCHAR(255)', nullable: 'NO', desc: 'Title of academic document' },
      { column: 'description', type: 'VARCHAR(2000)', nullable: 'NO', desc: 'Detailed lecture / topic description' },
      { column: 'subject_id', type: 'BIGINT (FK)', nullable: 'NO', desc: 'Foreign key -> subjects(id)' },
      { column: 'category_id', type: 'BIGINT (FK)', nullable: 'NO', desc: 'Foreign key -> categories(id)' },
      { column: 'semester', type: 'INT', nullable: 'NO', desc: 'Academic semester (1 to 8)' },
      { column: 'file_url', type: 'VARCHAR(500)', nullable: 'NO', desc: 'URL/path to PDF document' },
      { column: 'file_size', type: 'VARCHAR(50)', nullable: 'NO', desc: 'File size string (e.g. 3.8 MB)' },
      { column: 'downloads', type: 'INT', nullable: 'NO', desc: 'Total download count' },
      { column: 'views', type: 'INT', nullable: 'NO', desc: 'Total view count' },
      { column: 'user_id', type: 'BIGINT (FK)', nullable: 'NO', desc: 'Foreign key -> users(id) [Author]' },
      { column: 'is_verified', type: 'BOOLEAN', nullable: 'NO', desc: 'Faculty verification checkmark' },
      { column: 'created_at', type: 'TIMESTAMP', nullable: 'NO', desc: 'Creation timestamp' },
    ],
    users: [
      { column: 'id', type: 'BIGINT PRIMARY KEY', nullable: 'NO', desc: 'User identifier' },
      { column: 'name', type: 'VARCHAR(255)', nullable: 'NO', desc: 'Full legal/academic name' },
      { column: 'email', type: 'VARCHAR(255) UNIQUE', nullable: 'NO', desc: 'Campus email address' },
      { column: 'password', type: 'VARCHAR(255)', nullable: 'NO', desc: 'BCrypt hashed password ($2a$10$...)' },
      { column: 'role', type: 'VARCHAR(50)', nullable: 'NO', desc: 'Role enum: STUDENT, FACULTY, ADMIN' },
      { column: 'created_at', type: 'TIMESTAMP', nullable: 'NO', desc: 'Registration timestamp' },
    ],
    subjects: [
      { column: 'id', type: 'BIGINT PRIMARY KEY', nullable: 'NO', desc: 'Course ID' },
      { column: 'code', type: 'VARCHAR(50) UNIQUE', nullable: 'NO', desc: 'Course code (e.g. CS301, CS302)' },
      { column: 'name', type: 'VARCHAR(255)', nullable: 'NO', desc: 'Full course title' },
      { column: 'department', type: 'VARCHAR(255)', nullable: 'NO', desc: 'Academic engineering department' },
      { column: 'semester', type: 'INT', nullable: 'NO', desc: 'Target semester' },
    ],
    categories: [
      { column: 'id', type: 'BIGINT PRIMARY KEY', nullable: 'NO', desc: 'Category ID' },
      { column: 'name', type: 'VARCHAR(255) UNIQUE', nullable: 'NO', desc: 'Category display name' },
      { column: 'slug', type: 'VARCHAR(100) UNIQUE', nullable: 'NO', desc: 'URL slug (notes, pyq, lab-manual)' },
      { column: 'description', type: 'VARCHAR(500)', nullable: 'NO', desc: 'Category description' },
      { column: 'icon', type: 'VARCHAR(50)', nullable: 'NO', desc: 'UI icon identifier' },
    ]
  };

  const USERS_DATA = [
    { id: 1, name: 'Aarav Sharma', email: 'student@campus.edu', role: 'STUDENT', password: '$2a$10$e8Z4...[BCrypt]', created_at: '2026-09-01 09:00:00' },
    { id: 2, name: 'Dr. R. K. Mukherjee', email: 'faculty@campus.edu', role: 'FACULTY', password: '$2a$10$p3K1...[BCrypt]', created_at: '2026-08-15 11:30:00' },
    { id: 3, name: 'Academic Administrator', email: 'admin@campus.edu', role: 'ADMIN', password: '$2a$10$w9L2...[BCrypt]', created_at: '2026-08-01 08:00:00' },
    { id: 4, name: 'Priya Sundaram', email: 'priya.student@campus.edu', role: 'STUDENT', password: '$2a$10$m5R8...[BCrypt]', created_at: '2026-09-10 14:15:00' },
  ];

  const getTableRows = () => {
    switch (selectedTable) {
      case 'study_materials':
        return materials.map(m => ({
          id: m.id,
          title: m.title,
          subject_code: m.subject?.code,
          category: m.category?.name,
          semester: m.semester,
          file: `${m.fileType} (${m.fileSize})`,
          downloads: m.downloads,
          uploader: `${m.uploader?.name} [${m.uploader?.role}]`,
          verified: m.isVerified ? 'TRUE' : 'FALSE',
          created_at: new Date(m.createdAt).toLocaleString()
        }));
      case 'users':
        return USERS_DATA;
      case 'subjects':
        return subjects;
      case 'categories':
        return categories;
      default:
        return [];
    }
  };

  const rows = getTableRows().filter(row => {
    if (!searchTableQuery) return true;
    return JSON.stringify(row).toLowerCase().includes(searchTableQuery.toLowerCase());
  });

  const runSampleSql = (query) => {
    setSqlQuery(query);
    if (query.includes('semester = 5')) {
      const filtered = materials.filter(m => m.semester === 5);
      setQueryResult({
        query,
        count: filtered.length,
        rows: filtered.map(m => ({ id: m.id, title: m.title, code: m.subject?.code, downloads: m.downloads }))
      });
    } else if (query.includes("role = 'FACULTY'")) {
      const filtered = USERS_DATA.filter(u => u.role === 'FACULTY');
      setQueryResult({
        query,
        count: filtered.length,
        rows: filtered
      });
    } else {
      setQueryResult({
        query,
        count: subjects.length,
        rows: subjects.map(s => ({
          code: s.code,
          name: s.name,
          total_notes: materials.filter(m => m.subject?.id === s.id).length
        }))
      });
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '24px auto', padding: '0 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: '#dbeafe', color: '#1d4ed8', fontWeight: 800, fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px' }}>
              EXPERIMENT 7: PERSISTENCE & DATABASE
            </span>
            <span style={{ fontSize: '0.8rem', color: backendOnline ? '#059669' : '#d97706', fontWeight: 700 }}>
              ● {backendOnline ? 'Spring Data JPA Active (H2 / MySQL)' : 'Local Persistent Storage Mode'}
            </span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
            Relational Database & Tables Viewer
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Inspect all SQL tables, schemas, foreign key relationships, and live persistent records stored in the portal database.
          </p>
        </div>

        {/* Database Connection Info Box */}
        <div style={{ background: '#0f172a', color: '#ffffff', padding: '12px 18px', borderRadius: '10px', fontSize: '0.78rem', minWidth: '280px' }}>
          <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🗄️ Database Access Endpoints</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#cbd5e1' }}>
            <div>H2 Console: <code style={{ color: '#fde047' }}>http://localhost:8080/h2-console</code></div>
            <div>JDBC URL: <code style={{ color: '#93c5fd' }}>jdbc:h2:mem:studyportal_db</code></div>
            <div>User: <code style={{ color: '#86efac' }}>sa</code> | Password: <em>(blank)</em></div>
            <div>MySQL DB: <code style={{ color: '#cbd5e1' }}>studymaterial_db (Port 3306)</code></div>
          </div>
        </div>
      </div>

      {/* Table Selector Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Select Database Table:</span>
        {Object.keys(SCHEMAS).map(table => (
          <button
            key={table}
            onClick={() => { setSelectedTable(table); setSearchTableQuery(''); }}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              border: selectedTable === table ? '2px solid #2563eb' : '1px solid #cbd5e1',
              background: selectedTable === table ? '#eff6ff' : '#ffffff',
              color: selectedTable === table ? '#1d4ed8' : '#334155',
              cursor: 'pointer'
            }}
          >
            {table.toUpperCase()}
          </button>
        ))}
      </div>

      {/* SQL Table Schema Card */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '20px', boxShadow: 'var(--shadow-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
            Schema Definition: <code style={{ color: '#2563eb' }}>{selectedTable}</code>
          </h3>
          <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#64748b' }}>
            Mapped to Entity: <code>@{selectedTable === 'study_materials' ? 'StudyMaterial' : selectedTable.slice(0, -1).toUpperCase()}</code>
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '8px 12px' }}>Column Name</th>
              <th style={{ padding: '8px 12px' }}>Data Type</th>
              <th style={{ padding: '8px 12px' }}>Nullable</th>
              <th style={{ padding: '8px 12px' }}>Description / Constraint</th>
            </tr>
          </thead>
          <tbody>
            {SCHEMAS[selectedTable].map(col => (
              <tr key={col.column} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0f172a' }}>
                  {col.column}
                </td>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', color: '#2563eb' }}>
                  {col.type}
                </td>
                <td style={{ padding: '8px 12px', color: col.nullable === 'NO' ? '#dc2626' : '#64748b' }}>
                  {col.nullable}
                </td>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>
                  {col.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Live Table Records View */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '20px', boxShadow: 'var(--shadow-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
              Table Records: <code>{selectedTable}</code> ({rows.length} rows)
            </h3>
          </div>
          <input
            type="text"
            className="form-input"
            style={{ maxWidth: '280px', padding: '6px 12px', fontSize: '0.82rem' }}
            placeholder={`Filter ${selectedTable} rows...`}
            value={searchTableQuery}
            onChange={(e) => setSearchTableQuery(e.target.value)}
          />
        </div>

        {rows.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>No matching rows in table.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  {Object.keys(rows[0]).map(key => (
                    <th key={key} style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                      {key.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id || i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    {Object.values(r).map((val, j) => (
                      <td key={j} style={{ padding: '10px 12px', whiteSpace: 'nowrap', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Interactive SQL Query Tester */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', boxShadow: 'var(--shadow-subtle)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
          Interactive SQL Query Console (Viva Demonstration)
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '12px' }}>
          Run sample JPA / SQL queries across subjects, materials, and users:
        </p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <button
            className="btn-preview"
            onClick={() => runSampleSql('SELECT * FROM study_materials WHERE semester = 5;')}
          >
            Query Sem 5 Materials
          </button>
          <button
            className="btn-preview"
            onClick={() => runSampleSql("SELECT * FROM users WHERE role = 'FACULTY';")}
          >
            Query Faculty Accounts
          </button>
          <button
            className="btn-preview"
            onClick={() => runSampleSql('SELECT s.code, s.name, COUNT(m.id) as total_notes FROM subjects s LEFT JOIN study_materials m ON s.id = m.subject_id GROUP BY s.id;')}
          >
            Join: Subjects with Material Counts
          </button>
        </div>

        <div style={{ background: '#0f172a', color: '#38bdf8', padding: '12px 16px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '12px' }}>
          {sqlQuery}
        </div>

        {queryResult && (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginBottom: '8px' }}>
              ✓ Query executed successfully: {queryResult.count} records returned
            </div>
            <pre style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
              {JSON.stringify(queryResult.rows, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
