import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bird, MapPin, Sparkles } from 'lucide-react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import POIModal from './components/POIModal';
import FootprintCard from './components/FootprintCard';
import { POI, POICategory, UserState } from './types';
import { POIS, THEME } from './constants';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<POICategory | 'all'>('all');
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [showFootprint, setShowFootprint] = useState(false);
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('kunming_user_state');
    return saved ? JSON.parse(saved) : {
      visitedIds: [],
      userName: '昆明游客',
      daysInKunming: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('kunming_user_state', JSON.stringify(userState));
  }, [userState]);

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPOIs = activeCategory === 'all' 
    ? POIS 
    : POIS.filter(p => p.category === activeCategory);

  const [isNear, setIsNear] = useState(false);

  // Simulate Geolocation check (PDF 5.2.2)
  useEffect(() => {
    if (!selectedPOI) {
      setIsNear(false);
      return;
    }

    // In a real app, we'd use navigator.geolocation.getCurrentPosition
    // and calculate distance. Here we simulate "being near" for the demo.
    const checkDistance = () => {
      // Simulate 80% chance of being "near" for demo purposes
      setIsNear(true); 
    };

    const interval = setInterval(checkDistance, 5000);
    return () => clearInterval(interval);
  }, [selectedPOI]);

  const handleCheckIn = (id: string) => {
    if (!isNear) {
      alert('您距离该景点较远，请到达现场后再打卡！');
      return;
    }
    if (!userState.visitedIds.includes(id)) {
      setUserState(prev => ({
        ...prev,
        visitedIds: [...prev.visitedIds, id]
      }));
    }
  };

  return (
    <div className="w-full h-screen bg-emerald-50 overflow-hidden font-sans">
      <AnimatePresence>
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] bg-emerald-600 flex flex-col items-center justify-center text-white p-6"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8"
            >
              <Bird size={80} strokeWidth={1.5} />
            </motion.div>
            
            <h1 className="text-3xl font-black tracking-widest mb-2">昆明漫游</h1>
            <p className="text-emerald-100/80 text-sm italic">—— 春城无处不飞花 ——</p>
            
            <div className="mt-12 w-48 h-1 bg-emerald-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="h-full bg-yellow-400"
              />
            </div>
          </motion.div>
        ) : (
          <motion.main 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full"
          >
            {/* Map Layer */}
            <MapComponent 
              pois={filteredPOIs} 
              onSelectPOI={setSelectedPOI}
              visitedIds={userState.visitedIds}
            />

            {/* UI Overlay */}
            <Sidebar 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              userState={userState}
              onShowFootprint={() => setShowFootprint(true)}
            />

            {/* Bottom Floating Info (Optional) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center justify-between border border-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">当前位置</h3>
                    <p className="text-[10px] text-gray-500">昆明市 · 五华区</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <Sparkles size={14} />
                  <span className="text-xs font-bold">18°C 晴</span>
                </div>
              </div>
            </div>

            {/* Modals */}
            <POIModal 
              poi={selectedPOI}
              onClose={() => setSelectedPOI(null)}
              onCheckIn={handleCheckIn}
              isVisited={selectedPOI ? userState.visitedIds.includes(selectedPOI.id) : false}
              isNear={isNear}
            />

            {showFootprint && (
              <FootprintCard 
                userState={userState}
                onClose={() => setShowFootprint(false)}
              />
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
