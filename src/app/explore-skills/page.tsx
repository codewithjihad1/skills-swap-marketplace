'use client';

import React, { useState, useEffect } from "react";
import { Search, Filter, Star, Users, Clock, BookOpen, ChevronDown, Loader2, Moon, Sun } from "lucide-react";

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Skill {
  _id: string;
  title: string;
  description: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  userId: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  skills: Skill[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  filters: {
    category: string | null;
    proficiency: string | null;
    search: string | null;
  };
}

export default function ExploreSkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProficiency, setSelectedProficiency] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const categories = ["All", "Technology", "Creative", "Design", "Marketing", "Business", "Education"];
  const proficiencyLevels = ["All", "Beginner", "Intermediate", "Advanced"];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Check system preference on initial load
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Fetch skills from API
  const fetchSkills = async (page = 1, category = "", proficiency = "", search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (page > 1) params.append('page', page.toString());
      if (category && category !== "All") params.append('category', category);
      if (proficiency && proficiency !== "All") params.append('proficiency', proficiency);
      if (search) params.append('search', search);

      const response = await fetch(`https://skills-swap-server.vercel.app/api/skills?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }

      const data: ApiResponse = await response.json();
      
      if (page === 1) {
        setSkills(data.skills);
      } else {
        setSkills(prev => [...prev, ...data.skills]);
      }
      
      setTotalPages(data.pagination.pages);
      setCurrentPage(data.pagination.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchSkills();
  }, []);

  // Handle search and filters
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchSkills(1, selectedCategory, selectedProficiency, searchTerm);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, selectedCategory, selectedProficiency]);

  // Load more skills
  const loadMoreSkills = () => {
    if (currentPage < totalPages) {
      fetchSkills(currentPage + 1, selectedCategory, selectedProficiency, searchTerm);
    }
  };

  // Get proficiency color
  const getProficiencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700';
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-600 dark:bg-blue-700',
      'Creative': 'bg-purple-600 dark:bg-purple-700',
      'Design': 'bg-pink-600 dark:bg-pink-700',
      'Marketing': 'bg-orange-600 dark:bg-orange-700',
      'Business': 'bg-green-600 dark:bg-green-700',
      'Education': 'bg-indigo-600 dark:bg-indigo-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600 dark:bg-gray-700';
  };

  // Generate avatar initials
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Skills</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => fetchSkills()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover amazing skills from talented individuals around the world. Connect, learn, and grow together. 
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills, technologies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          <div className={`mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Proficiency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proficiency Level</label>
              <select
                value={selectedProficiency}
                onChange={(e) => setSelectedProficiency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && skills.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading amazing skills...</span>
          </div>
        )}

        {/* Skills Grid */}
        {skills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {skills.map((skill) => (
              <div 
                key={skill._id} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`${getCategoryColor(skill.category)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                      {skill.category}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(skill.proficiency)}`}>
                      {skill.proficiency}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Tags */}
                {skill.tags.length > 0 && (
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {skill.tags.length > 3 && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs">+{skill.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Instructor */}
                <div className="px-6 pb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                    {skill.userId.avatar ? (
                      <img src={skill.userId.avatar} alt={skill.userId.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getInitials(skill.userId.name)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {skill.userId.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Skill Provider</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                    Connect
                  </button>
                  <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {skills.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Skills Found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters to find more skills.</p>
          </div>
        )}

        {/* Load More Button */}
        {currentPage < totalPages && (
          <div className="text-center">
            <button 
              onClick={loadMoreSkills}
              disabled={loading}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Skills'
              )}
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{skills.length}+</div>
              <p className="text-gray-600 dark:text-gray-400">Skills Available</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <p className="text-gray-600 dark:text-gray-400">Expert Instructors</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">1000+</div>
              <p className="text-gray-600 dark:text-gray-400">Happy Learners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}