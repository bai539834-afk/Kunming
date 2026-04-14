import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Download, Share2, X, MapPin } from 'lucide-react';
import { POI, UserState } from '../types';
import { POIS, THEME } from '../constants';

interface FootprintCardProps {
  userState: UserState;
  onClose: () => void;
}

export default function FootprintCard({ userState, onClose }: FootprintCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions for a mobile-friendly poster (9:16)
    canvas.width = 1080;
    canvas.height = 1920;

    const draw = async () => {
      // Background - Spring City Green
      ctx.fillStyle = '#F0F9F4';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Top Banner
      ctx.fillStyle = THEME.primary;
      ctx.fillRect(0, 0, canvas.width, 400);

      // Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('昆明漫游足迹', canvas.width / 2, 200);
      
      ctx.font = '40px sans-serif';
      ctx.fillText(`漫游昆明第 ${userState.daysInKunming} 天`, canvas.width / 2, 280);

      // User Info
      ctx.fillStyle = '#333333';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(userState.userName || '探索者', 100, 500);

      // Stats
      ctx.font = '40px sans-serif';
      ctx.fillText(`已点亮 ${userState.visitedIds.length} 个地标`, 100, 580);

      // Draw Stamps
      const visitedPOIs = POIS.filter(p => userState.visitedIds.includes(p.id));
      const startY = 700;
      const spacing = 180;

      visitedPOIs.forEach((poi, index) => {
        const y = startY + index * spacing;
        if (y > canvas.height - 200) return;

        // Stamp Circle
        ctx.beginPath();
        ctx.arc(150, y, 60, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = THEME.primary;
        ctx.lineWidth = 5;
        ctx.stroke();

        // Stamp Emoji
        ctx.font = '60px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(poi.stamp, 150, y + 20);

        // POI Name
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 45px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(poi.name, 250, y + 15);
        
        // Date (Mock)
        ctx.fillStyle = '#999999';
        ctx.font = '30px sans-serif';
        ctx.fillText('2026.03.24', 800, y + 15);
      });

      // Footer
      ctx.fillStyle = THEME.primary;
      ctx.font = 'italic 35px serif';
      ctx.textAlign = 'center';
      ctx.fillText('—— 春城无处不飞花 ——', canvas.width / 2, canvas.height - 100);

      setImgUrl(canvas.toDataURL('image/png'));
    };

    draw();
  }, [userState]);

  return (
    <div className="fixed inset-0 z-[3000] bg-black/80 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white p-2"
        >
          <X size={32} />
        </button>
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {userState.visitedIds.length === 0 ? (
            <div className="aspect-[9/16] flex flex-col items-center justify-center bg-gray-50 p-12 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                <MapPin size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">尚未点亮地标</h3>
              <p className="text-gray-500 text-sm">快去昆明的街头走一走，点亮您的第一枚印章吧！</p>
            </div>
          ) : imgUrl ? (
            <img src={imgUrl} alt="Footprint Card" className="w-full h-auto" />
          ) : (
            <div className="aspect-[9/16] flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button 
            className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
            onClick={() => {
              const link = document.createElement('a');
              link.download = 'kunming-footprint.png';
              link.href = imgUrl || '';
              link.click();
            }}
          >
            <Download size={20} />
            保存海报
          </button>
          <button className="flex-1 bg-white text-emerald-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            <Share2 size={20} />
            分享好友
          </button>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
