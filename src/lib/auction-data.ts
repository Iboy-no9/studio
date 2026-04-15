/**
 * @fileOverview Defines the data structures and initial data for the auction.
 * Modify this file to add/remove players or change franchise details.
 */

/**
 * Data Model for a Player
 */
export interface Player {
  id: string;          // A unique string (e.g., "p1", "p2")
  name: string;        // The player's display name
  position: 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper'; // Must be one of these four
  rating: number;      // A number representing their skill (e.g., 95)
  nationality: string; // A 3-letter country code (e.g., "ARG", "BRA", "ENG")
  basePrice: number;   // The starting price for the auction (e.g., 10)
  imageUrl: string;    // A link to the player's photo
}

/**
 * Data Model for a Franchise (Team)
 */
export interface Team {
  id: string;          // A unique string (e.g., "t1")
  name: string;        // The franchise name
  budget: number;      // The total starting budget (e.g., 10000)
  logoUrl: string;     // A link to the team's logo
  color: string;       // A hex code for the team's primary UI accent
  manager: string;     // The team manager's name
  managerImageUrl: string; // Image for the manager
  captain: string;     // The team captain's name
  captainImageUrl: string; // Image for the captain
  gk: string;          // The team's primary goalkeeper
  gkImageUrl: string;  // Image for the goalkeeper
  isExhibition?: boolean; // If true, team appears in intro but not in auction
}

export const TEAMS: Team[] = [
  { 
    id: 't1', 
    name: 'Real Madrid', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/250px-Real_Madrid_CF.svg.png', 
    color: '#4AB0ED',
    manager: 'Ashfaq',
    managerImageUrl: 'https://i.postimg.cc/RV1Lb01F/real-one-jpg.jpg',
    captain: 'Mirshad',
    captainImageUrl: 'https://i.postimg.cc/tJ3Wfrxd/real-three-jpg.jpg',
    gk: 'Nishmal',
    gkImageUrl: 'https://i.postimg.cc/vZHfqtHg/real-two-jpg.jpg'
  },
  { 
    id: 't2', 
    name: 'FC Barcelona', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/sco/thumb/4/47/FC_Barcelona_%28crest%29.svg/1280px-FC_Barcelona_%28crest%29.svg.png', 
    color: '#FCD34D',
    manager: 'Sabeel',
    managerImageUrl: 'https://i.postimg.cc/GpVp99z3/bar-one-jpg.jpg',
    captain: 'Hashir PP',
    captainImageUrl: 'https://i.postimg.cc/g2cjTCnF/bar-two-jpg.jpg',
    gk: 'Abdul Bari',
    gkImageUrl: 'https://i.postimg.cc/c1Yvg7p1/abr-three-jpg.jpg'
  },
  { 
    id: 't3', 
    name: 'Arsenal FC', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/sco/thumb/5/53/Arsenal_FC.svg/1920px-Arsenal_FC.svg.png', 
    color: '#F87171',
    manager: 'Shammas',
    managerImageUrl: 'https://i.postimg.cc/Y0W7V3Hw/frame-one-copy-jpg-(1).jpg',
    captain: 'Midlaj',
    captainImageUrl: 'https://i.postimg.cc/dtcDF7SJ/e-jpg.jpg',
    gk: 'Shidil',
    gkImageUrl: 'https://i.postimg.cc/zvZDqM7j/ss-jpg.jpg'
  },
  { 
    id: 't4', 
    name: 'Manchester City', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1280px-Manchester_City_FC_badge.svg.png', 
    color: '#10B981',
    manager: 'Rinshid',
    managerImageUrl: 'https://i.postimg.cc/pr1ctbPP/man-one-jpg.jpg',
    captain: 'Shameel C',
    captainImageUrl: 'https://i.postimg.cc/7YdtskBR/man-thre-jpg.jpg',
    gk: 'Ridhin',
    gkImageUrl: 'https://i.postimg.cc/YSfXCmtX/man-two-jpg.jpg'
  },
  { 
    id: 't5', 
    name: 'Liverpool FC', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/250px-Liverpool_FC.svg.png', 
    color: '#8B5CF6',
    manager: 'Ashbin',
    managerImageUrl: 'https://i.postimg.cc/Y9LzmG7r/livb-one-jpg.jpg',
    captain: 'Shibin',
    captainImageUrl: 'https://i.postimg.cc/cCQ7Xp6g/liv-two-jpg.jpg',
    gk: 'Shanif',
    gkImageUrl: 'https://i.postimg.cc/tRPzqxDd/frame-one-copy-jpg.jpg'
  },
  { 
    id: 't6', 
    name: 'Bayern Munich', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg/1280px-Bayern_Munich_logo.png', 
    color: '#EC4899',
    manager: 'Aman',
    managerImageUrl: 'https://i.postimg.cc/nrLrp0js/bay-one-jpg.jpg',
    captain: 'Shadil CM',
    captainImageUrl: 'https://i.postimg.cc/g2hJzwJD/bay-two-jpg.jpg',
    gk: 'Minhaj',
    gkImageUrl: 'https://i.postimg.cc/MT9ZPVsP/bay-three-jpg.jpg'
  },
  { 
    id: 't7', 
    name: 'Manchester United F.C.', 
    budget: 0, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1280px-Manchester_United_FC_crest.svg.png', 
    color: '#DA291C',
    manager: 'Shahin USd',
    managerImageUrl: 'https://i.postimg.cc/rz61V0kH/Whats-App-Image-2026-04-15-at-7-19-47-AM.jpg',
    captain: 'Jishar Sir',
    captainImageUrl: 'https://i.postimg.cc/Qttw5PWJ/Whats-App-Image-2026-04-15-at-10-54-48-AM.jpg',
    gk: 'Nabhan Sadique USD',
    gkImageUrl: 'https://i.postimg.cc/FRH5pzwc/Whats-App-Image-2026-04-15-at-7-19-47-AM-(1).jpg',
    isExhibition: true
  },
];

export const PLAYERS: Player[] = [
  { id: 'p1', name: 'Mubarak', basePrice: 10, position: 'Forward', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/K8d39p73/MUBARAK.jpg' },
  { id: 'p2', name: 'ZAIN', basePrice: 10, position: 'Midfielder', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/J0WSzx5b/zain-jpg.jpg' },
  { id: 'p3', name: 'AMAL', basePrice: 10, position: 'Defender', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/qv6NH98X/AMAL.jpg' },
  { id: 'p4', name: 'ARSHAD', basePrice: 10, position: 'Midfielder', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/prR3vhy0/ARSHAD.jpg' },
  { id: 'p5', name: 'RIZWAN', basePrice: 10, position: 'Midfielder', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/Wz4Lrqjk/RIZWAN.jpg' },
  { id: 'p6', name: 'HAMDAN', basePrice: 10, position: 'Forward', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/fbL2zp4m/HAMDAN.jpg' },
  { id: 'p7', name: 'RIZWIN', basePrice: 10, position: 'Defender', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/c6qhWPDY/RIZWIN.jpg' },
  { id: 'p8', name: 'AMEEN SWADIQUE', basePrice: 10, position: 'Midfielder', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/8C6p0yyb/AMEEN-SADIQUE.jpg' },
  { id: 'p9', name: 'MIKDAD', basePrice: 10, position: 'Forward', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/y8mQ1YCd/MIKDAD.jpg' },
  { id: 'p10', name: 'LABEEB', basePrice: 10, position: 'Forward', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/RVfJyWwN/LABEEB.jpg' },
  { id: 'p11', name: 'KENZ', basePrice: 10, position: 'Forward', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/qv0B5Xfg/KENZ.jpg' },
  { id: 'p12', name: 'SADIL', basePrice: 10, position: 'Midfielder', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/W3t3TM7c/FREE-CARD.jpg' },
  { id: 'p13', name: 'SHIFIN', basePrice: 10, position: 'Defender', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/MGFdtskz/SHIFIN.jpg' },
  { id: 'p14', name: 'IRFAN', basePrice: 10, position: 'Defender', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/MKjpHgGh/IRFAN.jpg' },
  { id: 'p15', name: 'SABITH', basePrice: 10, position: 'Midfielder', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/W3t3TM7c/FREE-CARD.jpg' },
  { id: 'p16', name: 'SHABIL', basePrice: 10, position: 'Defender', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/c42244kW/SHABIL.jpg' },
  { id: 'p17', name: 'NIHAL', basePrice: 10, position: 'Defender', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/W3t3TM7c/FREE-CARD.jpg' },
  { id: 'p18', name: 'MINHAJ', basePrice: 10, position: 'Forward', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/kMzdkNSr/MINHAJ.jpg' },
  { id: 'p19', name: 'HISHAM', basePrice: 10, position: 'Forward', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/2S970RCd/HISHAM.jpg' },
  { id: 'p20', name: 'SINAN', basePrice: 10, position: 'Defender', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/x1FvSc61/SINAN-P.jpg' },
  { id: 'p21', name: 'AMJAD V', basePrice: 10, position: 'Forward', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/zG3pTXT2/AMJAD.jpg' },
  { id: 'p22', name: 'HANAN V', basePrice: 10, position: 'Defender', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/wMdQmbPB/HANAN-V.jpg' },
  { id: 'p23', name: 'SAJID', basePrice: 10, position: 'Defender', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/Pq7Hb0mt/SAJID.jpg' },
  { id: 'p24', name: 'FARIS', basePrice: 10, position: 'Defender', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/VNnqFSvR/FARIS.jpg' },
  { id: 'p25', name: 'JASEEL', basePrice: 10, position: 'Midfielder', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/ZYVSVtbr/JASEEL.jpg' },
  { id: 'p26', name: 'SHAMIL KC', basePrice: 10, position: 'Midfielder', rating: 89, nationality: 'FIR', imageUrl: 'https://i.postimg.cc/yxYp5h3v/SHAMIL-KC.jpg' },
  { id: 'p27', name: 'ASHMIL', basePrice: 10, position: 'Midfielder', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/9Xvvxm33/ASHMIL.jpg' },
  { id: 'p28', name: 'SHAMEEM', basePrice: 10, position: 'Forward', rating: 89, nationality: 'FIR', imageUrl: 'https://i.postimg.cc/CLrX32Nm/SHAMEEM.jpg' },
  { id: 'p29', name: 'AMJITH', basePrice: 10, position: 'Midfielder', rating: 89, nationality: 'FIR', imageUrl: 'https://i.postimg.cc/KYCZmz5b/AMJITH.jpg' },
  { id: 'p30', name: 'IMTHIYAZ', basePrice: 10, position: 'Midfielder', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/8c5fxskQ/IMTHIYAS.jpg' },
  { id: 'p31', name: 'SHAMEEL', basePrice: 10, position: 'Forward', rating: 88, nationality: 'SWN', imageUrl: 'https://i.postimg.cc/3Rzfrt9C/SHAMEEL.jpg' },
  { id: 'p32', name: 'NAJAD', basePrice: 10, position: 'Forward', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/RZzqzxtr/NAJAD.jpg' },
  { id: 'p33', name: 'SHAMIL V', basePrice: 10, position: 'Defender', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/TwcJncX1/shamil-v-jpg.jpg' },
{ id: 'p34', name: 'SHADI', basePrice: 10, position: 'DEFENDER', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/XXSXsRWs/SHADI.jpg' },
  { id: 'p35', name: 'ABRAR', basePrice: 10, position: 'Defender', rating: 89, nationality: 'FIR', imageUrl: 'https://i.postimg.cc/W3t3TM7c/FREE-CARD.jpg' },
  { id: 'p36', name: 'MIDHLAJ', basePrice: 10, position: 'MIDFIELDER', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/PfV09xTF/MIDLAJ.jpg' },
  { id: 'p37', name: 'ANSHIF T', basePrice: 10, position: 'Forward', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/bJgJR8hP/ANSHIF-T.jpg' },{ id: 'p38', name: 'MARJAN', basePrice: 10, position: 'MIDFIELDER', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/L60QC0kc/MARJAN.jpg' },
  { id: 'p39', name: 'MIDHLAJ PP', basePrice: 10, position: 'Defender', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/h4HLzbpk/MIDLAJ.jpg' },
  { id: 'p40', name: 'ABRAR', basePrice: 10, position: 'Defender', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/W3t3TM7c/FREE-CARD.jpg' },
  { id: 'p41', name: 'SWALIH', basePrice: 10, position: 'Defender', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/Tw898zh0/SWALIH.jpg' },
  { id: 'p42', name: 'JALAL', basePrice: 10, position: 'Defender', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/W3t3TM7c/FREE-CARD.jpg' },
  { id: 'p43', name: 'AMIR', basePrice: 10, position: 'Defender', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/9MBpHH1N/AMIR.jpg' },
  { id: 'p44', name: 'HANSHID', basePrice: 10, position: 'Defender', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/Dyv2cRjv/HANSHID.jpg' },
  { id: 'p45', name: 'MUFEED', basePrice: 10, position: 'Defender', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/QtNXdXNL/MUFEED.jpg' },
  { id: 'p46', name: 'ZIYAD', basePrice: 10, position: 'Forward', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/W3t3TM7c/FREE-CARD.jpg' },
  { id: 'p47', name: 'HADI FARHAN', basePrice: 10, position: 'DEFENDER', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/8PDr814b/HADI-FARHAN.jpg' },
  { id: 'p48', name: 'JASEEM', basePrice: 10, position: 'DEFENDER', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/x8ZGRBrR/JASEEM.jpg' },
  { id: 'p49', name: 'JASIL K', basePrice: 10, position: 'Forward', rating: 89, nationality: 'FIR', imageUrl: 'https://i.postimg.cc/Hs0F6tvp/JASIL-K.jpg' },
  { id: 'p50', name: 'SHAHAL', basePrice: 10, position: 'DEFENDER', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/4N72MRfV/SHAHAL.jpg' },
  { id: 'p51', name: 'AFLAH CP', basePrice: 10, position: 'Forward', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/rw2NbC4T/AFLAH.jpg' },
  { id: 'p52', name: 'BINBAZ', basePrice: 10, position: 'MIDFIELDER', rating: 89, nationality: 'FIR', imageUrl: 'https://i.postimg.cc/6Q4XbKx7/BINBAZ.jpg' },
  { id: 'p53', name: 'SYD HISHAM', basePrice: 10, position: 'Forward', rating: 88, nationality: 'SWM', imageUrl: 'https://i.postimg.cc/W3t3TM7c/FREE-CARD.jpg' },
  { id: 'p54', name: 'NOUFAL', basePrice: 10, position: 'Forward', rating: 86, nationality: 'MSB', imageUrl: 'https://i.postimg.cc/B6zrDD9M/NOUFAL.jpg' },
  { id: 'p55', name: 'NAYEEM', basePrice: 10, position: 'MIDFIELDER', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/qRS6hmmX/NAYEEM.jpg' },
  { id: 'p56', name: 'ASHRAF ALI', basePrice: 10, position: 'MIDFIELDER', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/2554szzx/ASHRAF.jpg' },
  { id: 'p57', name: 'MINHAJ PK', basePrice: 10, position: 'MIDFIELDER', rating: 87, nationality: 'SUM', imageUrl: 'https://i.postimg.cc/j5FJ0N8s/MINHAJ-PK.jpg' },
  { id: 'p58', name: 'MISHAB', basePrice: 10, position: 'Forward', rating: 89, nationality: 'FIR', imageUrl: 'https://i.postimg.cc/9FXj5ZjT/MISHAB.jpg' },
  { id: 'p59', name: 'BASITH', basePrice: 10, position: 'Forward', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/L8jZZcnZ/BASITH.jpg' },

];
