import React from 'react';
import { useMaterials } from '../context/MaterialContext';

export const HeroBanner = () => {
  const { materials, subjects } = useMaterials();

  const totalDownloads = materials.reduce((acc, m) => acc + (m.downloads || 0), 0);
  const verifiedCount = materials.filter(m => m.isVerified).length;

  return (
    <div className="portal-hero">
      <div className="hero-container">
        <div className="hero-main-row">
          <div className="hero-headline">
            <h1>Department Academic Resource Repository</h1>
            <p>
              Access verified lecture notes, solved previous year question papers (PYQs), lab record implementations, and weekly assignments uploaded by faculty and top scholars.
            </p>
          </div>

          <div className="hero-stats-strip">
            <div className="stat-box">
              <div className="stat-number">{materials.length}</div>
              <div className="stat-label">Resources</div>
            </div>
            <div className="stat-box">
              <div className="stat-number" style={{ color: '#059669' }}>{verifiedCount}</div>
              <div className="stat-label">Faculty Verified</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{subjects.length}</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-box">
              <div className="stat-number" style={{ color: '#2563eb' }}>{totalDownloads.toLocaleString()}</div>
              <div className="stat-label">Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
