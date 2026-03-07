'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  ChevronRight,
  Trash2,
  LayoutGrid,
  List,
  ArrowLeft,
  Plus,
  Search,
  FolderOpen,
  FileText,
  Clock,
  Command,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import api from '@/lib/api';

interface Project {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  text: string;
  code: string;
}

export default function MyProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'flowchart', name: 'Flowchart' },
    { id: 'sequence', name: 'Sequence' },
    { id: 'mindmap', name: 'Mind Map' },
    { id: 'entity-relationship', name: 'ER Diagram' },
    { id: 'class', name: 'Class Diagram' },
    { id: 'state', name: 'State Diagram' }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      // Attempt backend fetch first
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (err) {
      // Fallback to localStorage
      const saved = JSON.parse(localStorage.getItem('flowgen_projects') || '[]');
      setProjects(saved);
      console.error("Using local project fallback", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || project.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  const deleteProject = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete project permanently?")) return;

    try {
      // Attempt backend delete
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      // Fallback to localStorage delete
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('flowgen_projects', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-[#05010d] text-slate-200">
      <Header />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden">

        {/* Sidebar (Desktop Only) */}
        <aside className="hidden lg:flex w-72 border-r border-white/5 bg-[#0a0a0f] flex-col p-6 overflow-y-auto shrink-0">
          <div className="mb-10">
            <h1 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
              <Command size={14} className="text-purple-500" />
              Technical Library
            </h1>
            <Link
              href="/dashboard"
              className="w-full py-3 bg-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/10 mb-8"
            >
              <Plus size={14} /> New Diagram
            </Link>
          </div>

          <div className="space-y-10">
            <nav className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-3 ml-2">Perspective</label>
              <button
                onClick={() => setActiveCategory('All')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs rounded-xl transition-all ${activeCategory === 'All' ? 'bg-white/10 text-white font-bold' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3 font-semibold">
                  <LayoutGrid size={16} /> All Diagrams
                </div>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-lg text-slate-500 font-bold">{projects.length}</span>
              </button>
            </nav>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-3 ml-2">Classifications</label>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs rounded-xl transition-all font-semibold ${activeCategory === cat.id ? 'bg-white/10 text-white shadow-xl shadow-black/20' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                  >
                    <FileText size={16} className={`opacity-50 ${activeCategory === cat.id ? 'text-purple-500' : ''}`} /> {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#05010d]">
          {/* Top Control Bar */}
          <div className="bg-[#05010d]/80 backdrop-blur-xl border-b border-white/5 z-20 sticky top-0">
            {/* Search and View Toggles */}
            <div className="px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 lg:border-none">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search collection..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 focus:border-purple-500/50 rounded-2xl text-xs outline-none transition-all text-slate-200 placeholder:text-slate-700"
                />
              </div>

              <div className="flex items-center gap-4 self-end md:self-auto">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Category Bar */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-6 py-4 no-scrollbar border-t border-white/5">
              <button
                onClick={() => setActiveCategory('All')}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === 'All' ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-500'}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-500'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Project Display */}
          <div className="p-8">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-60 bg-white/5 border border-white/5 rounded-3xl animate-pulse" />)}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="h-[60vh] flex flex-col items-center justify-center text-slate-600 space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/5">
                  <FolderOpen size={32} className="opacity-20" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest">Library Empty</p>
                  <p className="text-[10px] mt-1 opacity-50 font-medium">No technical diagrams found matching your criteria</p>
                </div>
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
                : "flex flex-col gap-3"
              }>
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/dashboard?projectId=${project.id}`}
                    className={`group bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/[0.02] transition-all duration-300 relative overflow-hidden ${viewMode === 'grid' ? 'p-6 rounded-[2rem] flex flex-col h-60' : 'p-4 rounded-2xl flex items-center gap-6'
                      }`}
                  >
                    {/* Grid Preview Area (Simulated) */}
                    {viewMode === 'grid' && (
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-2 bg-purple-600 rounded-xl shadow-lg shadow-purple-600/20">
                          <ExternalLink size={14} className="text-white" />
                        </div>
                      </div>
                    )}

                    <div className={viewMode === 'grid' ? 'space-y-6 flex-1' : 'flex items-center gap-8 flex-1'}>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-white/5 text-slate-500 text-[9px] font-bold rounded-lg uppercase tracking-wider border border-white/5 group-hover:bg-purple-500/10 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-colors">
                          {categories.find(cat => cat.id === project.type)?.name || project.type}
                        </span>
                        {viewMode === 'list' && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                              <Clock size={12} />
                              {new Date(project.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.')}
                            </div>
                            <button
                              onClick={(e) => deleteProject(project.id, e)}
                              className="p-2 text-slate-600 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors truncate mb-2">
                          {project.title}
                        </h3>
                        {viewMode === 'grid' && (
                          <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                            <Clock size={12} />
                            {new Date(project.createdAt).toLocaleDateString('en-GB').replace(/\//g, '.')}
                          </div>
                        )}
                      </div>
                    </div>

                    {viewMode === 'grid' && (
                      <div className="mt-auto pt-4 flex items-center justify-end">
                        <button
                          onClick={(e) => deleteProject(project.id, e)}
                          className="p-2 text-slate-700 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}