import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Timer, 
  BookOpen, 
  X,
  Code2,
  UserCheck
} from 'lucide-react';

export const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  isMobileOpen, 
  setIsMobileOpen,
  stats 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'tracker', label: 'QUESTIONS', icon: CheckSquare, badge: stats?.total || 0 },
    { id: 'machine-coding', label: 'MACHINE CODING', icon: Timer },
    { id: 'cheatsheet', label: 'PREP GUIDELINES', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#141519] border-r border-white/5 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        {/* Top Header & Brand */}
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              {/* Modern Sleek Code Icon Logo */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5B4D] via-[#FF4646] to-[#E02E20] flex items-center justify-center text-white shadow-lg shadow-[#FF5B4D]/30 ring-1 ring-white/20 flex-shrink-0">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-extrabold tracking-wider text-white flex items-center gap-1 font-sans">
                  PREP<span className="text-[#FF5B4D]">TRACKER</span>
                </h1>
                <p className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                  Interview OS
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 relative group cursor-pointer
                    ${isActive 
                      ? 'bg-[#1E2026] text-[#FF5B4D] shadow-inner' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1A1B20]'
                    }
                  `}
                >
                  {/* Left Active Glow Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#FF5B4D] rounded-r-full shadow-[0_0_10px_#FF5B4D]" />
                  )}

                  <div className="flex items-center gap-2.5 min-w-0 flex-shrink-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#FF5B4D]' : 'text-zinc-400'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono flex-shrink-0 whitespace-nowrap ml-2 leading-tight ${
                      isActive 
                        ? 'bg-[#FF5B4D]/20 text-[#FF5B4D] font-bold' 
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Minimal Bottom User Card */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 bg-[#1A1B22] p-3 rounded-xl border border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF5B4D] to-[#E02E20] flex items-center justify-center text-xs font-bold text-white shadow-md flex-shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">Candidate Prep</div>
              <div className="text-[10px] text-zinc-400 truncate">Section 4 Round</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
