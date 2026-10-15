import React from 'react';
import { useMaterials } from '../context/MaterialContext';

export const FilterBar = () => {
  const {
    selectedSemester,
    setSelectedSemester,
    selectedCategory,
    setSelectedCategory,
    categories,
    sortBy,
    setSortBy
  } = useMaterials();

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="filter-section">
      <div className="filter-bar-card">
        {/* Semester Filter Row */}
        <div className="semester-chips-row">
          <span className="chips-title">Semester:</span>
          <button
            className={`sem-chip ${selectedSemester === null ? 'active' : ''}`}
            onClick={() => setSelectedSemester(null)}
          >
            All Semesters
          </button>
          {semesters.map((sem) => (
            <button
              key={sem}
              className={`sem-chip ${selectedSemester === sem ? 'active' : ''}`}
              onClick={() => setSelectedSemester(selectedSemester === sem ? null : sem)}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        {/* Category & Sorting Row */}
        <div className="category-filter-row">
          <div className="category-pills">
            <button
              className={`cat-pill ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Types
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="sort-select-wrapper">
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Sort by:</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Recently Added</option>
              <option value="downloads">Most Downloaded</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
