import React, { useState, useEffect } from 'react';
import { useMaterials } from '../context/MaterialContext';

export const MaterialDetailsModal = () => {
  const { previewMaterial, setPreviewMaterial, incrementDownload } = useMaterials();
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && previewMaterial) {
        setPreviewMaterial(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewMaterial, setPreviewMaterial]);

  if (!previewMaterial) return null;

  const handleDownload = () => {
    incrementDownload(previewMaterial.id);
    alert(`Starting download of "${previewMaterial.title}" (${previewMaterial.fileSize})`);
  };

  return (
    <div
      className="modal-overlay"
      id="preview-modal-overlay"
      onClick={() => setPreviewMaterial(null)}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="course-code-pill">{previewMaterial.subject?.code}</span>
              <span className="semester-badge">Semester {previewMaterial.semester}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>• {previewMaterial.category?.name}</span>
            </div>
            <h2 className="modal-header-title">{previewMaterial.title}</h2>
          </div>
          <button
            className="btn-close"
            id="close-preview-modal-btn"
            onClick={() => setPreviewMaterial(null)}
            aria-label="Close document preview"
            title="Close preview (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Reader Window */}
          <div className="doc-preview-window">
            <div className="preview-toolbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#475569' }}>
                <span>Page <strong>{currentPage}</strong> of {previewMaterial.pageCount}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    ‹ Prev
                  </button>
                  <button
                    style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                    onClick={() => setCurrentPage(p => Math.min(previewMaterial.pageCount, p + 1))}
                    disabled={currentPage === previewMaterial.pageCount}
                  >
                    Next ›
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#475569' }}>
                  <button
                    style={{ padding: '2px 8px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => setZoom(z => Math.max(80, z - 10))}
                  >
                    -
                  </button>
                  <span>{zoom}%</span>
                  <button
                    style={{ padding: '2px 8px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => setZoom(z => Math.min(140, z + 10))}
                  >
                    +
                  </button>
                </div>

                <button className="btn-download" onClick={handleDownload}>
                  Download {previewMaterial.fileType} ({previewMaterial.fileSize})
                </button>
              </div>
            </div>

            {/* Document Paper Presentation */}
            <div
              className="doc-paper-sheet"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.15s ease' }}
            >
              <div className="paper-watermark">
                <span>{previewMaterial.subject?.name} ({previewMaterial.subject?.code})</span>
                <span>Verified Academic Resource</span>
              </div>

              <div className="paper-title">
                {previewMaterial.title}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#475569', fontStyle: 'italic', borderLeft: '3px solid #2563eb', paddingLeft: '10px' }}>
                {previewMaterial.description}
              </div>

              <pre className="paper-content-preview" style={{ fontFamily: 'inherit' }}>
                {previewMaterial.contentPreview || `1. OVERVIEW & SCOPE
This document contains lecture units, solved numerical proofs, and laboratory analysis.

2. CORE CONCEPTS & THEORETICAL FORMULATION
- Systematic derivation of fundamental equations and schema constraints.
- Algorithmic analysis with time and space complexity evaluations: O(n log n).

3. WORKED EXAMPLES & UNIVERSITY PYQ PROBLEMS
Problem 1: Given input specifications, determine the optimal execution schedule and memory footprint.`}
              </pre>

              <div className="paper-meta-badge">
                <span>Author: {previewMaterial.uploader?.name} ({previewMaterial.uploader?.role})</span>
                <span>Page {currentPage} of {previewMaterial.pageCount} • Academic Sharing Portal</span>
              </div>
            </div>
          </div>

          {/* Metadata Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>Department</span>
              <strong>{previewMaterial.subject?.department}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>File Format & Size</span>
              <strong>{previewMaterial.fileType} • {previewMaterial.fileSize}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>Upload Date</span>
              <strong>{new Date(previewMaterial.createdAt).toLocaleDateString()}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block' }}>Downloads & Views</span>
              <strong>{previewMaterial.downloads} downloads • {previewMaterial.views} views</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
