
export interface Player {
  id: string;
  name: string;
  basePrice: number;
  position: string;
  rating: number;
  nationality: string;
  imageUrl: string;
}

export interface Team {
  id: string;
  name: string;
  budget: number;
  logoUrl: string;
  color: string;
}

export const TEAMS: Team[] = [
  { id: 't1', name: 'Real Madrid', budget: 10000, logoUrl: 'https://picsum.photos/seed/rm/100/100', color: '#4AB0ED' },
  { id: 't2', name: 'FC Barcelona', budget: 10000, logoUrl: 'https://picsum.photos/seed/barca/100/100', color: '#FCD34D' },
  { id: 't3', name: 'Arsenal FC', budget: 10000, logoUrl: 'https://picsum.photos/seed/afc/100/100', color: '#F87171' },
  { id: 't4', name: 'Manchester City', budget: 10000, logoUrl: 'https://picsum.photos/seed/mcfc/100/100', color: '#10B981' },
  { id: 't5', name: 'Liverpool FC', budget: 10000, logoUrl: 'https://picsum.photos/seed/lfc/100/100', color: '#8B5CF6' },
  { id: 't6', name: 'FC Bayern Munich', budget: 10000, logoUrl: 'https://picsum.photos/seed/fcb/100/100', color: '#EC4899' },
];

export const PLAYERS: Player[] = [
  { id: 'p1', name: 'Marcus Sterling', basePrice: 1500, position: 'Forward', rating: 92, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p1/400/500' },
  { id: 'p2', name: 'Luca Modric', basePrice: 1200, position: 'Midfielder', rating: 89, nationality: 'CRO', imageUrl: 'https://picsum.photos/seed/p2/400/500' },
  { id: 'p3', name: 'Virgil Van Dijk', basePrice: 2000, position: 'Defender', rating: 91, nationality: 'NED', imageUrl: 'https://picsum.photos/seed/p3/400/500' },
  { id: 'p4', name: 'Erling Haaland', basePrice: 2500, position: 'Forward', rating: 94, nationality: 'NOR', imageUrl: 'https://picsum.photos/seed/p4/400/500' },
  { id: 'p5', name: 'Kevin De Bruyne', basePrice: 1800, position: 'Midfielder', rating: 93, nationality: 'BEL', imageUrl: 'https://picsum.photos/seed/p5/400/500' },
  { id: 'p6', name: 'Alisson Becker', basePrice: 1400, position: 'Goalkeeper', rating: 88, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p6/400/500' },
  { id: 'p7', name: 'Kylian Mbappe', basePrice: 2800, position: 'Forward', rating: 95, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p7/400/500' },
  { id: 'p8', name: 'Jude Bellingham', basePrice: 2200, position: 'Midfielder', rating: 90, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p8/400/500' },
];
