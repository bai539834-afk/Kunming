import { POI } from './types';

export const THEME = {
  primary: '#2E8B57', // Spring City Green
  secondary: '#1E90FF', // Dianchi Blue
  accent: '#FFD700', // Military Academy Yellow
  error: '#FF4444', // Sunset Red
};

export const POIS: POI[] = [
  {
    id: 'dianchi',
    name: '滇池',
    category: 'nature',
    coords: [24.88, 102.68],
    description: '昆明的“明珠”，高原明珠，红嘴鸥的越冬胜地。',
    history: '滇池形成于中新世末期，是著名的断层构造湖。古称昆明池，是云南省最大的淡水湖，素有“五百里滇池”之称。历史上，滇池不仅是昆明的母亲河，更是南诏、大理国时期的重要水利枢纽。',
    gallery: [
      'https://picsum.photos/seed/dianchi1/600/400',
      'https://picsum.photos/seed/dianchi2/600/400',
      'https://picsum.photos/seed/dianchi3/600/400'
    ],
    reviews: [
      { user: '徐霞客', rating: 5, comment: '滇池之水，浩瀚如海。', date: '2024-01-15' },
      { user: '小明', rating: 4, comment: '冬天来看海鸥非常震撼，就是人有点多。', date: '2024-02-20' }
    ],
    image: 'https://picsum.photos/seed/dianchi/400/300',
    stamp: '🦢',
  },
  {
    id: 'xishan',
    name: '西山森林公园',
    category: 'nature',
    coords: [24.96, 102.63],
    description: '俯瞰滇池的最佳位置，山势险峻，林木苍翠。',
    image: 'https://picsum.photos/seed/xishan/400/300',
    stamp: '⛰️',
  },
  {
    id: 'shilin',
    name: '石林风景名胜区',
    category: 'nature',
    coords: [24.81, 103.32],
    description: '世界自然遗产，喀斯特地貌的奇迹。',
    image: 'https://picsum.photos/seed/shilin/400/300',
    stamp: '🗿',
  },
  {
    id: 'cuihu',
    name: '翠湖公园',
    category: 'nature',
    coords: [25.05, 102.70],
    description: '城中的绿宝石，文人墨客聚集之地。',
    image: 'https://picsum.photos/seed/cuihu/400/300',
    stamp: '🌿',
  },
  {
    id: 'jiangwutang',
    name: '云南陆军讲武堂',
    category: 'history',
    coords: [25.05, 102.70],
    description: '百年名校，中国近代军事将领的摇篮。',
    history: '创办于1909年，原为清朝为编练新军所建。它是中国近代史上著名的军事院校之一，与保定军校、黄埔军校并称。朱德、叶剑英等著名将领曾在此学习或任教。建筑风格独特，亮黄色的外墙已成为昆明的文化地标。',
    gallery: [
      'https://picsum.photos/seed/jiangwu1/600/400',
      'https://picsum.photos/seed/jiangwu2/600/400'
    ],
    reviews: [
      { user: '历史迷', rating: 5, comment: '建筑保存得非常好，非常有历史厚重感。', date: '2024-03-01' },
      { user: '阿强', rating: 5, comment: '免费参观，里面的展览很详细。', date: '2024-03-10' }
    ],
    image: 'https://picsum.photos/seed/jiangwutang/400/300',
    stamp: '⚔️',
  },
  {
    id: 'xinanlianda',
    name: '西南联大旧址',
    category: 'history',
    coords: [25.06, 102.70],
    description: '抗战时期的文化堡垒，大师云集。',
    image: 'https://picsum.photos/seed/xinanlianda/400/300',
    stamp: '🎓',
  },
  {
    id: 'laojie',
    name: '昆明老街',
    category: 'history',
    coords: [25.04, 102.71],
    description: '保留最完整的古建筑群，体验地道老昆明生活。',
    image: 'https://picsum.photos/seed/laojie/400/300',
    stamp: '🏮',
  },
  {
    id: 'jinmabiji',
    name: '金马碧鸡坊',
    category: 'history',
    coords: [25.03, 102.71],
    description: '昆明的城市象征，古建筑艺术的瑰宝。',
    image: 'https://picsum.photos/seed/jinmabiji/400/300',
    stamp: '⛩️',
  },
  {
    id: 'minzucun',
    name: '云南民族村',
    category: 'culture',
    coords: [24.93, 102.68],
    description: '25个少数民族风情一站式体验。',
    image: 'https://picsum.photos/seed/minzucun/400/300',
    stamp: '🎭',
  },
  {
    id: 'dounan',
    name: '斗南花卉市场',
    category: 'culture',
    coords: [24.89, 102.77],
    description: '亚洲最大的花卉交易市场，浪漫的海洋。',
    image: 'https://picsum.photos/seed/dounan/400/300',
    stamp: '🌸',
  },
];
