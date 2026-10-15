import React from 'react';
import { useMaterials } from '../context/MaterialContext';

export const MaterialCard = ({ material }) => {
  const { setPreviewMaterial, incrementDownload } = useMaterials();

  const handleDownload = (e) => {
    e.stopPropagation();
    incrementDownload(material.id);
    alert(`Downloading "${material.title}"...\nFile: ${material.fileType} (${material.fileSize})`);
  };

  const getCategoryClass = (slug) => {
    switch (slug) {
      case 'notes': return 'notes';
      case 'pyq': return 'pyq';
      case 'lab-manual': return 'lab-manual';
      case 'assignment': return 'assignment';
      default: return 'notes';
    }
  };

  return (
    <div className="material-card" onClick={() => setPreviewMaterial(material)}>
      <div>
        {/* Top Badges */}
        <div className="card-top-badges">
          <div className="badge-group">
            <span className={`category-tag ${getCategoryClass(material.category?.slug)}`}>
              {material.category?.name || 'Resource'}
            </span>
            <span className="semester-badge">Sem {material.semester}</span>
          </div>
          <span className="course-code-pill">{material.subject?.code}</span>
        </div>

        {/* Title */}
        <h3 className="card-title" title={material.title}>
          {material.title}
        </h3>

        {/* Subject */}
        <div className="card-subject-name">
          {material.subject?.name}
        </div>

        {/* Description snippet */}
        <p className="card-description">
          {material.description}
        </p>

        {/* File Meta Strip */}
        <div className="file-meta-strip">
          <div className="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span>{material.fileType} · {material.fileSize}</span>
          </div>
          <div className="meta-item">
            <span>{material.pageCount} pages</span>
          </div>
          <div className="meta-item" style={{ marginLeft: 'auto' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>{material.downloads}</span>
          </div>
        </div>
      </div>

      {/* Footer with Uploader & Actions */}
      <div className="card-footer">
        <div className="uploader-info">
          <div className="uploader-avatar">
            {material.uploader?.name ? material.uploader.name.charAt(0) : 'U'}
          </div>
          <div className="uploader-details">
            <span className="uploader-name">
              {material.uploader?.name}
              {material.isVerified && (
                <span className="verified-icon" title="Faculty Verified Content">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </span>
              )}
            </span>
            <span className="uploader-role">{material.uploader?.role || 'Student'}</span>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn-preview" onClick={(e) => { e.stopPropagation(); setPreviewMaterial(material); }}>
            Preview
          </button>
          <button className="btn-download" onClick={handleDownload} title="Download file">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Get
          </button>
        </div>
      </div>
    </div>
  );
};
