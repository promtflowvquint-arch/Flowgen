'use client';

import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import mermaid from 'mermaid';
import { useSearchParams } from 'next/navigation';
import { jsPDF } from 'jspdf';

import {
  Sparkles,
  ZoomIn,
  ZoomOut,
  Download,
  Copy,
  Trash2,
  GitBranch,
  Network,
  Brain,
  Database,
  Boxes,
  GitCommitHorizontal,
  Loader2,
  ServerCrash,
  FileText,
  ChevronDown,
  Save,
  Maximize2,
  Command,
  Plus,
  Lock,
  ChevronRight,
  FileCode,
  File
} from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const diagramTypes = [
  { id: 'flowchart', name: 'Flowchart', icon: GitBranch, description: 'Process flows' },
  { id: 'sequence', name: 'Sequence', icon: Network, description: 'Interaction timings' },
  { id: 'mindmap', name: 'Mind Map', icon: Brain, description: 'Idea organization' },
  { id: 'entity-relationship', name: 'ER Diagram', icon: Database, description: 'Database schema' },
  { id: 'class', name: 'Class Diagram', icon: Boxes, description: 'System models' },
  { id: 'state', name: 'State Diagram', icon: GitCommitHorizontal, description: 'State transitions' },
];

export default function DiagramGenerator() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');

  const [text, setText] = useState('');
  const [diagramType, setDiagramType] = useState('flowchart');
  const [mermaidCode, setMermaidCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [zoom, setZoom] = useState(100);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [projectName, setProjectName] = useState('Untitled Diagram');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  const { isPaid } = useSubscription();

  // Handle clicking outside download menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
      themeVariables: {
        background: 'transparent',
        primaryColor: '#f1f5f9',
        primaryBorderColor: '#334155',
        primaryTextColor: '#0f172a',
        lineColor: '#64748b',
        fontSize: '14px',
      },
    });
    checkAPIStatus();
  }, []);

  useEffect(() => {
    async function loadProject() {
      if (!projectId) return;

      try {
        // Attempt backend fetch first
        const response = await api.get(`/projects/${projectId}`);
        const project = response.data;
        setText(project.text);
        setMermaidCode(project.code);
        setDiagramType(project.type);
        setProjectName(project.title);
        renderDiagram(project.code);
      } catch (err) {
        // Fallback to localStorage
        const savedProjects = JSON.parse(localStorage.getItem('flowgen_projects') || '[]');
        const project = savedProjects.find((p: any) => p.id === projectId);
        if (project) {
          setText(project.text);
          setMermaidCode(project.code);
          setDiagramType(project.type);
          setProjectName(project.title);
          renderDiagram(project.code);
        }
      }
    }
    loadProject();
  }, [projectId]);

  useEffect(() => {
    if (diagramRef.current) {
      renderDiagram(mermaidCode);
    }
  }, [mermaidCode, zoom]);

  const checkAPIStatus = async () => {
    try {
      await api.get('/health');
      setApiStatus('online');
    } catch {
      setApiStatus('offline');
    }
  };

  const renderDiagram = async (codeToRender: string) => {
    if (!diagramRef.current) return;
    diagramRef.current.innerHTML = '';
    if (!codeToRender) return;
    try {
      let cleanedCode = codeToRender.replace(/(^|\s)\/\/.*$/gm, '');
      cleanedCode = cleanedCode.replace(/\/\*[\s\S]*?\*\//g, '');
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      const { svg } = await mermaid.render(id, cleanedCode);
      if (diagramRef.current) {
        diagramRef.current.innerHTML = svg;
        const svgElement = diagramRef.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = 'none';
          svgElement.style.height = 'auto';
          svgElement.style.transform = `scale(${zoom / 100})`;
          svgElement.style.transition = 'transform 0.1s ease-out';
          svgElement.style.transformOrigin = 'center center';
        }
      }
      setError('');
    } catch (err) {
      console.error("Mermaid Render Error:", err);
      setError('Invalid diagram syntax.');
    }
  };

  const generateDiagram = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await api.post('/generate', { text, type: diagramType });
      setMermaidCode(response.data.code);
    } catch (err: any) {
      setError('Failed to generate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!projectName.trim()) return;

    const projectData = {
      title: projectName,
      text,
      code: mermaidCode,
      type: diagramType
    };

    try {
      // Attempt backend save
      if (projectId) {
        await api.put(`/projects/${projectId}`, projectData);
      } else {
        await api.post('/projects', projectData);
      }
      setToastMessage('Project saved to cloud');
    } catch (err) {
      // Fallback to localStorage
      const newProject = {
        id: projectId || Math.random().toString(36).substr(2, 9),
        ...projectData,
        createdAt: new Date().toISOString()
      };
      const savedProjects = JSON.parse(localStorage.getItem('flowgen_projects') || '[]');
      let updated;
      if (projectId) {
        updated = savedProjects.map((p: any) => p.id === projectId ? newProject : p);
      } else {
        updated = [newProject, ...savedProjects];
      }
      localStorage.setItem('flowgen_projects', JSON.stringify(updated));
      setToastMessage('Saved locally (Offline)');
    }

    setShowSaveModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const downloadPNG = () => {
    const svg = diagramRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const viewBox = svg.getAttribute('viewBox')?.split(' ') || ['0', '0', '800', '600'];

    canvas.width = (parseFloat(viewBox[2]) || 800) * 2;
    canvas.height = (parseFloat(viewBox[3]) || 600) * 2;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.png`;
        a.click();
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    setShowDownloadMenu(false);
  };

  const downloadSVG = () => {
    if (!isPaid) {
      setToastMessage('SVG Export is a Pro feature');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    const svg = diagramRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setShowDownloadMenu(false);
  };

  const downloadPDF = () => {
    if (!isPaid) {
      setToastMessage('PDF Export is a Pro feature');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    const svg = diagramRef.current?.querySelector('svg');
    if (!svg) return;

    // Direct PDF generation via jspdf
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const viewBox = svg.getAttribute('viewBox')?.split(' ') || ['0', '0', '800', '600'];

    const width = parseFloat(viewBox[2]) || 800;
    const height = parseFloat(viewBox[3]) || 600;

    canvas.width = width * 2;
    canvas.height = height * 2;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
          orientation: width > height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [width, height]
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        pdf.save(`${projectName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    setShowDownloadMenu(false);
  };

  const copyCode = () => {
    if (mermaidCode) {
      navigator.clipboard.writeText(mermaidCode);
      setToastMessage('Code copied');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const clearAll = () => {
    setText('');
    setMermaidCode('');
    setError('');
    setZoom(100);
    window.history.replaceState({}, '', '/dashboard');
  }

  const selectedDiagram = diagramTypes.find(d => d.id === diagramType);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#05010d] text-slate-200 font-sans border border-white/5 rounded-2xl shadow-2xl">

      {/* Sidebar: Toolbar & Input (Desktop) */}
      <aside className="hidden md:flex w-80 border-r border-white/5 bg-[#0a0a0f] flex-col shrink-0 overflow-y-auto">
        <div className="flex-1 p-6">
          <GeneratorControls
            diagramType={diagramType}
            setDiagramType={setDiagramType}
            text={text}
            setText={setText}
            clearAll={clearAll}
            generateDiagram={generateDiagram}
            isLoading={isLoading}
            apiStatus={apiStatus}
          />
        </div>
      </aside>

      {/* Mobile Settings Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileDrawerOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0f] border-t border-white/10 rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" onClick={() => setIsMobileDrawerOpen(false)} />
            <GeneratorControls
              diagramType={diagramType}
              setDiagramType={setDiagramType}
              text={text}
              setText={setText}
              clearAll={clearAll}
              generateDiagram={() => {
                generateDiagram();
                setIsMobileDrawerOpen(false);
              }}
              isLoading={isLoading}
              apiStatus={apiStatus}
            />
          </div>
        </div>
      )}

      {/* Main Canvas: Preview */}
      <main className="flex-1 relative bg-[#05010d] flex items-center justify-center overflow-hidden dot-grid min-w-0">

        {/* Floating Mobile Controls Toggle */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-2xl z-40 font-bold text-xs uppercase tracking-widest active:scale-95 transition-all"
        >
          <Command size={14} />
          Editor Settings
        </button>

        {/* Floating Toolbar */}
        {mermaidCode && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#12121e] border border-white/10 p-1.5 rounded-2xl shadow-2xl z-20">
            <div className="flex items-center gap-1 px-2 border-r border-white/5 mr-1">
              <button
                onClick={() => setZoom(Math.max(20, zoom - 10))}
                className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-[10px] font-mono w-10 text-center text-slate-400 font-bold">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <button
              onClick={copyCode}
              className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"
              title="Copy Merchant Code"
            >
              <Copy size={16} />
            </button>
            <div className="relative" ref={downloadMenuRef}>
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className={`p-2.5 rounded-xl transition-all ${showDownloadMenu ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                title="Download Options"
              >
                <Download size={16} />
              </button>

              {showDownloadMenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#12121e] border border-white/10 rounded-2xl shadow-2xl py-2 z-[60] animate-in fade-in zoom-in-95 duration-200">
                  <button
                    onClick={downloadPNG}
                    className="w-full px-4 py-2.5 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="opacity-50 group-hover:opacity-100" />
                      <span>PNG IMAGE</span>
                    </div>
                    <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-slate-600 font-bold uppercase tracking-widest">Free</span>
                  </button>
                  <button
                    onClick={downloadSVG}
                    className="w-full px-4 py-2.5 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <FileCode size={14} className="opacity-50 group-hover:opacity-100" />
                      <span>SVG VECTOR</span>
                    </div>
                    {!isPaid && <Lock size={10} className="text-purple-500/50" />}
                    {isPaid && <span className="text-[8px] bg-purple-500/10 px-1.5 py-0.5 rounded text-purple-400 font-bold uppercase tracking-widest">Pro</span>}
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="w-full px-4 py-2.5 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <File size={14} className="opacity-50 group-hover:opacity-100" />
                      <span>PDF DOCUMENT</span>
                    </div>
                    {!isPaid && <Lock size={10} className="text-purple-500/50" />}
                    {isPaid && <span className="text-[8px] bg-purple-500/10 px-1.5 py-0.5 rounded text-purple-400 font-bold uppercase tracking-widest">Pro</span>}
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowSaveModal(true)}
              className="p-2.5 hover:bg-purple-600/10 rounded-xl text-purple-500 hover:text-purple-400 transition-all ml-1"
              title="Save Project"
            >
              <Save size={16} />
            </button>
            <button
              onClick={clearAll}
              className="p-2.5 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-400 transition-all"
              title="Clear Canvas"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="w-full h-full flex items-center justify-center overflow-auto p-20 select-none">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Assembling Engine</p>
            </div>
          ) : error ? (
            <div className="max-w-sm text-center space-y-4">
              <ServerCrash size={40} className="mx-auto text-red-500 opacity-50" />
              <p className="text-sm font-bold text-red-400/80">{error}</p>
              <button onClick={generateDiagram} className="text-xs font-bold text-purple-500 hover:underline">Try Again</button>
            </div>
          ) : (
            <>
              {/* Always show the ref div if we have mermaidCode, otherwise show empty state */}
              <div
                ref={diagramRef}
                className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${mermaidCode ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}
                style={{ filter: `drop-shadow(0 0 50px rgba(168, 85, 247, 0.1))` }}
              ></div>

              {!mermaidCode && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/5">
                    <FileText size={28} className="text-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Canvas Empty</p>
                    <p className="text-xs text-slate-600 max-w-[200px] leading-relaxed">Enter a technical description in the sidebar to begin generating.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Save Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#12121e] border border-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Save Project</h3>
                <p className="text-xs text-slate-500">Provide a name for this professional diagram.</p>
              </div>
              <input
                type="text"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all font-medium"
                placeholder="Systems Overlook v1"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 text-slate-400 text-sm font-bold hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="flex-1 py-3 px-4 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/20"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-8 right-8 z-[110] bg-white text-black px-6 py-3 rounded-2xl shadow-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 border border-white/10 animate-fade-in-up">
            <Check size={14} className="text-emerald-500" />
            {toastMessage}
          </div>
        )}

      </main>
    </div>
  );
}

function GeneratorControls({
  diagramType, setDiagramType, text, setText, clearAll, generateDiagram, isLoading, apiStatus
}: any) {
  return (
    <div className="space-y-8">
      {/* Header/Title */}
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Command size={14} className="text-purple-500" />
          Generator
        </h2>
        <p className="text-xs text-slate-500">Transform ideas into diagrams</p>
      </div>

      {/* Diagram Type Selector */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
          {diagramTypes.map((type) => {
            const Icon = type.icon;
            const isActive = diagramType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setDiagramType(type.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 ${isActive
                  ? 'bg-purple-600/10 border-purple-500/50 text-purple-400'
                  : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                  }`}
              >
                <Icon size={18} className="mb-2" />
                <span className="text-[10px] font-bold truncate w-full text-center">{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Prompt</label>
          <button onClick={clearAll} className="text-[10px] text-slate-500 hover:text-red-400 transition-colors">Clear</button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="E.g., Simple login flow with email verification..."
          className="w-full h-32 md:h-40 bg-white/5 border border-white/5 rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-purple-500/50 transition-all resize-none leading-relaxed"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={generateDiagram}
        disabled={isLoading || !text.trim()}
        className="w-full flex items-center justify-center gap-3 py-4 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 disabled:bg-slate-800 disabled:text-slate-600 transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98]"
      >
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
        {isLoading ? 'Generating' : 'Create Diagram'}
      </button>

      {/* Status Bar */}
      <div className="flex items-center gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          API {apiStatus === 'online' ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  );
}

function Check({ size, className }: { size: number, className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
