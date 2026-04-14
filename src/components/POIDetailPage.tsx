import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, History, Image as ImageIcon, MessageSquare, MapPin, Navigation, Volume2, VolumeX } from 'lucide-react';
import { POI } from '../types';
import { THEME } from '../constants';
import { cn } from '../lib/utils';

interface POIDetailPageProps {
  poi: POI | null;
  onClose: () => void;
  onCheckIn: (id: string) => void;
  isVisited: boolean;
  isNear: boolean;
}

export default function POIDetailPage({ poi, onClose, onCheckIn, isVisited, isNear }: POIDetailPageProps) {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  if (!poi) return null;

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(poi.description + (poi.history || ''));
      utterance.lang = 'zh-CN';
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Stop speech when closing
  const handleClose = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[3000] bg-white overflow-y-auto"
      >
        {/* Header Image */}
        <div className="relative h-[40vh] w-full">
          <img 
            src={poi.image} 
            alt={poi.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <button 
            onClick={handleClose}
            className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg"
          >
            <X size={24} />
          </button>

          <button 
            onClick={toggleSpeech}
            className={cn(
              "absolute top-6 right-6 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg transition-all",
              isSpeaking ? "bg-emerald-500 animate-pulse" : "bg-white/20"
            )}
          >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">{poi.stamp}</span>
              <span className="bg-emerald-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {poi.category}
              </span>
            </div>
            <h1 className="text-4xl font-black">{poi.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
              <MapPin size={14} />
              <span>昆明市 · {poi.name}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 pb-32">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-2xl text-center">
              <Star className="mx-auto mb-1 text-yellow-500" size={20} />
              <span className="block text-lg font-bold text-emerald-900">4.9</span>
              <span className="text-[10px] text-emerald-600 uppercase font-bold">评分</span>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl text-center">
              <ImageIcon className="mx-auto mb-1 text-blue-500" size={20} />
              <span className="block text-lg font-bold text-blue-900">{poi.gallery?.length || 0}</span>
              <span className="text-[10px] text-blue-600 uppercase font-bold">照片</span>
            </div>
            <div className="bg-purple-50 p-4 rounded-2xl text-center">
              <MessageSquare className="mx-auto mb-1 text-purple-500" size={20} />
              <span className="block text-lg font-bold text-purple-900">{poi.reviews?.length || 0}</span>
              <span className="text-[10px] text-purple-600 uppercase font-bold">评价</span>
            </div>
          </div>

          {/* Description */}
          <section>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-500 rounded-full" />
              景点介绍
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {poi.description}
            </p>
          </section>

          {/* Historical Context */}
          {poi.history && (
            <section className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <History className="text-emerald-600" size={22} />
                历史背景
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm italic">
                {poi.history}
              </p>
            </section>
          )}

          {/* Media Gallery */}
          {poi.gallery && poi.gallery.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ImageIcon className="text-emerald-600" size={22} />
                精彩图集
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
                {poi.gallery.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="flex-shrink-0 w-64 h-40 rounded-2xl overflow-hidden snap-center shadow-md"
                  >
                    <img src={img} alt={`${poi.name} gallery ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          {poi.reviews && poi.reviews.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="text-emerald-600" size={22} />
                游客评价
              </h3>
              <div className="space-y-4">
                {poi.reviews.map((review, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                          {review.user[0]}
                        </div>
                        <span className="font-bold text-sm">{review.user}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    <span className="text-[10px] text-gray-400 mt-2 block">{review.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex gap-4">
          <button 
            onClick={() => onCheckIn(poi.id)}
            disabled={isVisited || !isNear}
            className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
              isVisited 
                ? 'bg-emerald-100 text-emerald-600 cursor-default shadow-none' 
                : isNear 
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            {isVisited ? '已打卡点亮' : isNear ? '立即打卡' : '未到达景点'}
          </button>
          <button className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 active:scale-90 transition-transform">
            <Navigation size={24} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
