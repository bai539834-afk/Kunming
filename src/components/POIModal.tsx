import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, CheckCircle2, Navigation, ChevronRight } from 'lucide-react';
import { POI } from '../types';
import { THEME } from '../constants';

interface POIModalProps {
  poi: POI | null;
  onClose: () => void;
  onCheckIn: (id: string) => void;
  onViewDetails: (poi: POI) => void;
  isVisited: boolean;
  isNear: boolean;
}

export default function POIModal({ poi, onClose, onCheckIn, onViewDetails, isVisited, isNear }: POIModalProps) {
  if (!poi) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={poi.image} 
              alt={poi.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{poi.stamp}</span>
                <h2 className="text-xl font-bold">{poi.name}</h2>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="text-emerald-600" />
                <span>昆明市 · {poi.category === 'nature' ? '自然景观' : poi.category === 'history' ? '历史文化' : '民族风情'}</span>
              </div>
              {!isVisited && (
                <div className={`text-[10px] px-2 py-1 rounded-full font-bold ${isNear ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                  {isNear ? '📍 已进入打卡范围' : '📍 距离较远'}
                </div>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
              {poi.description}
            </p>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => onCheckIn(poi.id)}
                disabled={isVisited || !isNear}
                className={`flex-[2] py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  isVisited 
                    ? 'bg-emerald-100 text-emerald-600 cursor-default' 
                    : isNear 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isVisited ? (
                  <>
                    <CheckCircle2 size={20} />
                    已打卡
                  </>
                ) : (
                  <>
                    <Navigation size={20} />
                    {isNear ? '立即打卡' : '未到达'}
                  </>
                )}
              </button>
              
              <button 
                onClick={() => onViewDetails(poi)}
                className="flex-1 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center gap-1 active:scale-90 transition-transform"
              >
                详情
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
