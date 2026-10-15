import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ApiService } from '../services/api';
import { useAuth } from './AuthContext';

const MaterialContext = createContext(null);

export const MaterialProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(null); // null means All
  const [selectedCategory, setSelectedCategory] = useState(null); // null means All
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'downloads', 'views'

  // Modals
  const [previewMaterial, setPreviewMaterial] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const isOnline = await ApiService.checkBackendHealth();
      setBackendOnline(isOnline);

      const [mats, subs, cats] = await Promise.all([
        ApiService.getMaterials({
          query: searchQuery,
          subjectId: selectedSubject,
          categoryId: selectedCategory,
          semester: selectedSemester
        }),
        ApiService.getSubjects(),
        ApiService.getCategories()
      ]);

      setMaterials(mats);
      setSubjects(subs);
      setCategories(cats);
    } catch (err) {
      console.error('Error fetching materials:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedSubject, selectedCategory, selectedSemester]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derived filtered & sorted materials
  const sortedMaterials = useMemo(() => {
    return [...materials].sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'views') return b.views - a.views;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [materials, sortBy]);

  const addMaterial = async (formData) => {
    const created = await ApiService.createMaterial(formData, token, user);
    setMaterials(prev => [created, ...prev]);
    return created;
  };

  const updateMaterial = async (id, updatedFields) => {
    const updated = await ApiService.updateMaterial(id, updatedFields, token);
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    return updated;
  };

  const deleteMaterial = async (id) => {
    await ApiService.deleteMaterial(id, token);
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const incrementDownload = async (id) => {
    await ApiService.incrementDownload(id);
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, downloads: m.downloads + 1 } : m));
  };

  return (
    <MaterialContext.Provider value={{
      materials: sortedMaterials,
      rawMaterials: materials,
      subjects,
      categories,
      loading,
      backendOnline,
      searchQuery,
      setSearchQuery,
      selectedSemester,
      setSelectedSemester,
      selectedCategory,
      setSelectedCategory,
      selectedSubject,
      setSelectedSubject,
      sortBy,
      setSortBy,
      previewMaterial,
      setPreviewMaterial,
      isUploadOpen,
      setIsUploadOpen,
      addMaterial,
      updateMaterial,
      deleteMaterial,
      incrementDownload,
      refreshData: loadData
    }}>
      {children}
    </MaterialContext.Provider>
  );
};

export const useMaterials = () => {
  const ctx = useContext(MaterialContext);
  if (!ctx) throw new Error('useMaterials must be used within a MaterialProvider');
  return ctx;
};
