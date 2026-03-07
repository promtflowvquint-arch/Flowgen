
// 'use client';

// import Link from 'next/link';
// import { 
//   ArrowRight, Play, Layers, MousePointer2, Activity, Download
// } from 'lucide-react';

// export default function HomePage() {
//   const diagramTypes = [
//     { name: 'Flowchart', description: 'Step-by-step logic' },
//     { name: 'Sequence', description: 'Object interactions' },
//     { name: 'Mindmap', description: 'Idea brainstorming' },
//     { name: 'ER Diagram', description: 'Data structures' },
//     { name: 'Class Diagram', description: 'OOP architecture' },
//     { name: 'State Diagram', description: 'Behavioral flows' },
//   ];

//   return (
//     <div className="min-h-screen bg-[#05010d] font-sans text-white selection:bg-purple-500/30">

//       {/* Cinematic Background */}
//       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
//         <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px]" />
//         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
//       </div>

//       {/* Navigation */}
//       <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
//         <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl">
//           <div className="flex items-center gap-1">
//             <img
//               src="/logo.png" // Change to your actual logo filename
//               alt="Logo"
//               style={{ width: '60px', height: '60px' }} // Adjust size as needed
//               className=" rounded-lg object-contain"
//             />
//             <span className="text-lg font-bold tracking-tighter uppercase">FlowGen</span>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link href="/login" className="px-5 py-2 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
//               Login
//             </Link>
//             <Link href="/signup" className="px-5 py-2 bg-white text-[#05010d] text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-purple-200 transition-all active:scale-95">
//               Get Access
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section (Preserved as requested) */}
//       <section className="relative z-10 pt-48 pb-32">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
//             <Activity className="w-3 h-3 text-purple-500" />
//             <span>Neural Architecture v2.0</span>
//           </div>

//           <h1 className="text-7xl md:text-[120px] font-extrabold tracking-tighter leading-[0.8] mb-10">
//             Design at light <br/>
//             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
//               speed.
//             </span>
//           </h1>

//           <p className="text-lg md:text-xl text-purple-100/40 leading-relaxed max-w-2xl mx-auto mb-16">
//             Stop drawing boxes manually. Describe your system logic in plain language and let our AI compile professional-grade blueprints in seconds.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <Link href="/signup" className="h-16 px-12 rounded-2xl bg-white text-black font-black text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center gap-3">
//               Start Building
//               <ArrowRight className="w-5 h-5" />
//             </Link>
//           </div>
//         </div>

//         {/* Visual Mockup */}
//         <div className="mt-32 max-w-6xl mx-auto px-6 relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-[3rem] blur-3xl opacity-20"></div>
//           <div className="relative bg-[#0c051a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
//             <div className="h-12 bg-white/[0.02] border-b border-white/5 flex items-center px-8 justify-between">
//               <div className="flex gap-2">
//                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
//                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
//               </div>
//               <div className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">Workspace / Untitled_System</div>
//             </div>

//             <div className="grid md:grid-cols-2 min-h-[500px]">
//               <div className="p-10 border-r border-white/5 space-y-6">
//                 <div className="flex items-center gap-3 text-purple-400">
//                   <MousePointer2 className="w-4 h-4" />
//                   <span className="text-[10px] font-bold uppercase tracking-widest">Compiler Input</span>
//                 </div>
//                 <div className="font-mono text-sm text-purple-100/60 leading-relaxed">
//                   <span className="text-purple-400">prompt:</span> Create an ER Diagram for an e-commerce platform with Users, Orders, and Products including their relationships.
//                 </div>
//               </div>
//               <div className="p-10 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center relative">
//                 <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
//                    <div className="flex flex-col gap-4">
//                       <div className="px-4 py-2 border border-purple-500/50 bg-purple-500/10 rounded-lg text-[10px] text-center">TABLE: USERS</div>
//                       <div className="w-px h-6 bg-white/20 self-center" />
//                       <div className="px-4 py-2 border border-white/10 bg-white/5 rounded-lg text-[10px] text-center">TABLE: ORDERS</div>
//                    </div>
//                 </div>
//                 <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-widest">
//                   <Download className="w-3 h-3" /> Ready to export
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Functional Explanation Section */}
//       <section className="relative z-10 py-32 bg-white/[0.01] border-y border-white/5">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="mb-20">
//             <h2 className="text-4xl font-bold tracking-tighter mb-4">Prompt to Production.</h2>
//             <p className="text-purple-100/40 max-w-xl">
//               Type your requirements and watch as FlowGen handles the spatial logic and structure. No manual dragging, no misaligned arrows.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
//             {diagramTypes.map((type, idx) => (
//               <div key={idx} className="p-10 bg-[#080212] border border-white/5 hover:bg-white/[0.03] transition-colors group">
//                 <div className="text-white/20 text-xs font-mono mb-4">0{idx + 1}</div>
//                 <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{type.name}</h3>
//                 <p className="text-sm text-purple-100/40 leading-relaxed">{type.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Export & Download Note */}
//       <section className="py-32 text-center max-w-4xl mx-auto px-6">
//         <h2 className="text-3xl font-bold mb-6 tracking-tight">Instant Exports.</h2>
//         <p className="text-purple-100/40 mb-12">
//           Once generated, your diagrams are available for high-resolution download. Perfect for technical documentation, pitch decks, or hand-offs.
//         </p>
//         <div className="flex justify-center gap-4">
//            {['SVG', 'PNG', 'PDF'].map(ext => (
//              <div key={ext} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold tracking-[0.2em]">{ext}</div>
//            ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-20 border-t border-white/5 text-center">
//         <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
//           FlowGen &copy; 2026 / Visualizing complex logic
//         </p>
//       </footer>
//     </div>
//   );
// }
'use client';

import Link from 'next/link';
import {
  ArrowRight, Play, Layers, MousePointer2, Activity, Download, Terminal
} from 'lucide-react';

export default function HomePage() {
  const diagramTypes = [
    { name: 'Flowchart', description: 'Step-by-step logic' },
    { name: 'Sequence', description: 'Object interactions' },
    { name: 'Mindmap', description: 'Idea brainstorming' },
    { name: 'ER Diagram', description: 'Data structures' },
    { name: 'Class Diagram', description: 'OOP architecture' },
    { name: 'State Diagram', description: 'Behavioral flows' },
  ];

  return (
    <div className="min-h-screen bg-[#05010d] font-sans text-white selection:bg-purple-500/30">

      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-4 md:px-6 py-2 md:py-3 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-1 min-w-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 md:w-[60px] md:h-[60px] rounded-lg object-contain shrink-0"
            />
            <span className="text-sm md:text-lg font-bold tracking-tighter uppercase truncate hidden xs:block">FlowGen</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Link href="/login" className="px-3 md:px-5 py-2 border border-white/10 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
              Login
            </Link>
            <Link href="/signup" className="px-3 md:px-5 py-2 bg-white text-[#05010d] text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-purple-200 transition-all active:scale-95 whitespace-nowrap">
              Get Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
            <Activity className="w-3 h-3 text-purple-500" />
            <span>Neural Architecture v2.0</span>
          </div>

          <h1 className="text-7xl md:text-[120px] font-extrabold tracking-tighter leading-[0.8] mb-10">
            Design at light <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              speed.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-purple-100/40 leading-relaxed max-w-2xl mx-auto mb-16">
            Stop drawing boxes manually. Describe your system logic in plain language and let our AI compile professional-grade blueprints in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/signup" className="h-16 px-12 rounded-2xl bg-white text-black font-black text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center gap-3">
              Start Building
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Visual Mockup - FIXED FOR FULL VIEW */}
        <div className="mt-32 max-w-6xl mx-auto px-6 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-[3rem] blur-3xl opacity-20"></div>
          <div className="relative bg-[#0c051a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">

            {/* Window Header */}
            <div className="h-12 bg-white/[0.02] border-b border-white/5 flex items-center px-8 justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
              <div className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">Preview / Interface_Demo</div>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Left Side: Input Terminal */}
              <div className="p-10 border-r border-white/5 space-y-6 bg-black/20 flex flex-col justify-center min-h-[400px]">
                <div className="flex items-center gap-3 text-purple-400">
                  <Terminal className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Compiler Input</span>
                </div>
                <div className="font-mono text-sm text-purple-100/60 leading-relaxed">
                  <span className="text-purple-400">prompt:</span> Create an ER Diagram for an e-commerce platform with Users, Orders, and Products including their relationships.
                  <span className="inline-block w-2 h-4 ml-1 bg-purple-500 animate-pulse align-middle"></span>
                </div>
              </div>

              {/* Right Side: Video Player */}
              <div className="relative p-6 md:p-10 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center">
                <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl flex items-center justify-center">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-contain block" // Critical change for desktop view visibility
                  >
                    <source src="/demo-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Subtle Video Overlay */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                </div>

                {/* Floating Badge */}
                <Link
                  href="/signup"
                  className="absolute bottom-12 right-12 flex items-center gap-2 text-[9px] text-white/60 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 uppercase tracking-widest shadow-2xl"
                  style={{ cursor: 'pointer', border: 'none', background: 'rgba(255,255,255,0.1)' }}
                >
                  <Download className="w-3 h-3 text-purple-400" /> Ready to export
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Functional Explanation Section */}
      <section className="relative z-10 py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">Prompt to Production.</h2>
            <p className="text-purple-100/40 max-w-xl">
              Type your requirements and watch as FlowGen handles the spatial logic and structure. No manual dragging, no misaligned arrows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {diagramTypes.map((type, idx) => (
              <div key={idx} className="p-10 bg-[#080212] border border-white/5 hover:bg-white/[0.03] transition-colors group">
                <div className="text-white/20 text-xs font-mono mb-4">0{idx + 1}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{type.name}</h3>
                <p className="text-sm text-purple-100/40 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export & Download Note */}
      <section className="py-32 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 tracking-tight">Instant Exports.</h2>
        <p className="text-purple-100/40 mb-12">
          Once generated, your diagrams are available for high-resolution download. Perfect for technical documentation, pitch decks, or hand-offs.
        </p>
        <div className="flex justify-center gap-4">
          {['SVG', 'PNG', 'PDF'].map(ext => (
            <div key={ext} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold tracking-[0.2em]">{ext}</div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
          FlowGen &copy; 2026 / Visualizing complex logic
        </p>
      </footer>
    </div>
  );
}