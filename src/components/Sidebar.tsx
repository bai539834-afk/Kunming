import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Trophy, Map as MapIcon, Compass, ChevronRight, ChevronLeft, LayoutPanelLeft } from 'lucide-react';
import { POICategory, UserState } from '../types';
import { THEME, POIS } from '../constants';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeCategory: POICategory | 'all';
  onCategoryChange: (cat: POICategory | 'all') => void;
  userState: UserState;
  onShowFootprint: () => void;
}

export default function Sidebar({ activeCategory, onCategoryChange, userState, onShowFootprint }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categories: { id: POICategory | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: '全部', icon: MapIcon },
    { id: 'nature', label: '自然', icon: Compass },
    { id: 'history', label: '历史', icon: Trophy },
    { id: 'culture', label: '风情', icon: Filter },
  ];

  const progress = (userState.visitedIds.length / POIS.length) * 100;

  return (
    <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-4 pointer-events-none">
      {/* Categories */}
      <div className="flex flex-col gap-2 pointer-events-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90",
              activeCategory === cat.id 
                ? "bg-emerald-600 text-white" 
                : "bg-white text-emerald-600"
            )}
          >
            <cat.icon size={20} />
          </button>
        ))}
      </div>

      {/* Progress Card Container */}
      <div className="pointer-events-auto flex flex-col gap-2">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div 
              key="expanded"
              initial={{ x: -100, opacity: 0, width: 0 }}
              animate={{ x: 0, opacity: 1, width: 192 }} // w-48 is 192px
              exit={{ x: -100, opacity: 0, width: 0 }}
              className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white overflow-hidden relative"
            >
              <button 
                onClick={() => setIsCollapsed(true)}
                className="absolute top-3 right-3 text-emerald-300 hover:text-emerald-600 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center justify-between mb-2 pr-4">
                <span className="text-xs font-bold text-emerald-800">漫游进度</span>
                <span className="text-xs font-black text-emerald-600">{userState.visitedIds.length}/{POIS.length}</span>
              </div>
              <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
              
              <button 
                onClick={onShowFootprint}
                className="w-full py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
              >
                生成足迹
                <ChevronRight size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsCollapsed(false)}
              className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all border border-emerald-500"
            >
              <div className="relative">
                <LayoutPanelLeft size={20} />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-emerald-900">
                  {userState.visitedIds.length}
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
