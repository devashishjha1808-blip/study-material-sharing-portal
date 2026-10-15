import React, { useState, useEffect } from 'react';
import { useMaterials } from '../context/MaterialContext';
import { useAuth } from '../context/AuthContext';

export const UploadModal = () => {
  const { isUploadOpen, setIsUploadOpen, subjects, categories, addMaterial } = useMaterials();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 1);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 1);
  const [semester, setSemester] = useState(5);
  const [fileName, setFileName] = useState('Selected-Notes.pdf');
  const [fileSize, setFileSize] = useState('2.8 MB');
  const [pageCount, setPageCount] = useState(26);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isUploadOpen) {
        setIsUploadOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUploadOpen, setIsUploadOpen]);

  if (!isUploadOpen) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Title is required';
    } else if (title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters long';
    }

    if (!subjectId) errs.subjectId = 'Please select a course subject';
    if (!categoryId) errs.categoryId = 'Please select a resource category';
    if (!semester || semester < 1 || semester > 8) errs.semester = 'Semester must be between 1 and 8';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await addMaterial({
        title: title.trim(),
        description: description.trim() || 'No description provided.',
        subjectId: Number(subjectId),
        categoryId: Number(categoryId),
        semester: Number(semester),
        fileSize,
        fileType: 'PDF',
        pageCount: Number(pageCount)
      });
      setIsUploadOpen(false);
      // Reset form
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Failed to upload material: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSimulatedDrop = () => {
    const randomSizes = ['1.8 MB', '2.4 MB', '3.9 MB', '5.2 MB'];
    const randomPages = [14, 22, 38, 45];
    const idx = Math.floor(Math.random() * randomSizes.length);
    setFileName(`StudyDoc_Sem${semester}_UnitNotes.pdf`);
    setFileSize(randomSizes[idx]);
    setPageCount(randomPages[idx]);
  };

  return (
    <div
      className="modal-overlay"
      id="upload-modal-overlay"
      onClick={() => setIsUploadOpen(false)}
    >
      <div
        className="modal-content"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-header-title">Upload Study Resource</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Publish notes, exam question papers, or code records for your peers.
            </p>
          </div>
          <button
            className="btn-close"
            id="close-upload-modal-btn"
            onClick={() => setIsUploadOpen(false)}
            aria-label="Close dialog"
            title="Close dialog (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* Uploader Preview */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', color: '#1e3a8a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Publishing as: <strong>{user.name}</strong></span>
            <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.7rem' }}>
              {user.role}
            </span>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="upload-title">
              Resource Title <span className="req">*</span>
            </label>
            <input
              id="upload-title"
              type="text"
              className="form-input"
              placeholder="e.g. CS301 Unit 3 - Relational Algebra Solved Numerical Proofs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          {/* Subject & Category Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="upload-subject">Course Subject <span className="req">*</span></label>
              <select
                id="upload-subject"
                className="form-select"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    [{sub.code}] {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="upload-category">Category <span className="req">*</span></label>
              <select
                id="upload-category"
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Semester & Page Count */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="upload-semester">Target Semester <span className="req">*</span></label>
              <select
                id="upload-semester"
                className="form-select"
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="upload-pages">Estimated Page Count</label>
              <input
                id="upload-pages"
                type="number"
                min="1"
                max="500"
                className="form-input"
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="upload-desc">Description / Topics Covered</label>
            <textarea
              id="upload-desc"
              className="form-textarea"
              rows="3"
              placeholder="Highlight key units, formulas, question numbers, or professors who taught this topic..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Simulated File Dropzone */}
          <div className="dropzone" onClick={handleSimulatedDrop}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" style={{ margin: '0 auto 8px auto', display: 'block' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
              Attached File: <span style={{ color: '#2563eb' }}>{fileName}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Format: PDF • Size: {fileSize} • Click to simulate uploading another file
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              id="cancel-upload-btn"
              style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setIsUploadOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-upload-btn"
              disabled={submitting}
              className="btn-download"
              style={{ padding: '8px 20px', fontSize: '0.88rem' }}
            >
              {submitting ? 'Publishing...' : 'Publish to Catalog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
