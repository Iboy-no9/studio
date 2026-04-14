
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
  { id: 'p1', name: 'Lionel Messi', basePrice: 3000, position: 'Forward', rating: 98, nationality: 'ARG', imageUrl: 'https://picsum.photos/seed/p1/400/500' },
  { id: 'p2', name: 'Cristiano Ronaldo', basePrice: 2800, position: 'Forward', rating: 96, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p2/400/500' },
  { id: 'p3', name: 'Kylian Mbappe', basePrice: 4000, position: 'Forward', rating: 97, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p3/400/500' },
  { id: 'p4', name: 'Erling Haaland', basePrice: 4000, position: 'Forward', rating: 96, nationality: 'NOR', imageUrl: 'https://picsum.photos/seed/p4/400/500' },
  { id: 'p5', name: 'Kevin De Bruyne', basePrice: 3500, position: 'Midfielder', rating: 94, nationality: 'BEL', imageUrl: 'https://picsum.photos/seed/p5/400/500' },
  { id: 'p6', name: 'Robert Lewandowski', basePrice: 2500, position: 'Forward', rating: 93, nationality: 'POL', imageUrl: 'https://picsum.photos/seed/p6/400/500' },
  { id: 'p7', name: 'Mohamed Salah', basePrice: 3000, position: 'Forward', rating: 93, nationality: 'EGY', imageUrl: 'https://picsum.photos/seed/p7/400/500' },
  { id: 'p8', name: 'Karim Benzema', basePrice: 2200, position: 'Forward', rating: 92, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p8/400/500' },
  { id: 'p9', name: 'Harry Kane', basePrice: 3200, position: 'Forward', rating: 93, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p9/400/500' },
  { id: 'p10', name: 'Neymar Jr', basePrice: 2000, position: 'Forward', rating: 91, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p10/400/500' },
  { id: 'p11', name: 'Luka Modric', basePrice: 1500, position: 'Midfielder', rating: 90, nationality: 'CRO', imageUrl: 'https://picsum.photos/seed/p11/400/500' },
  { id: 'p12', name: 'Thibaut Courtois', basePrice: 1800, position: 'Goalkeeper', rating: 91, nationality: 'BEL', imageUrl: 'https://picsum.photos/seed/p12/400/500' },
  { id: 'p13', name: 'Virgil van Dijk', basePrice: 2500, position: 'Defender', rating: 92, nationality: 'NED', imageUrl: 'https://picsum.photos/seed/p13/400/500' },
  { id: 'p14', name: 'Sadio Mane', basePrice: 1200, position: 'Forward', rating: 89, nationality: 'SEN', imageUrl: 'https://picsum.photos/seed/p14/400/500' },
  { id: 'p15', name: 'Joshua Kimmich', basePrice: 2800, position: 'Midfielder', rating: 91, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p15/400/500' },
  { id: 'p16', name: 'Vinicius Jr', basePrice: 3800, position: 'Forward', rating: 94, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p16/400/500' },
  { id: 'p17', name: 'Bernardo Silva', basePrice: 3000, position: 'Midfielder', rating: 92, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p17/400/500' },
  { id: 'p18', name: 'Alisson Becker', basePrice: 1600, position: 'Goalkeeper', rating: 90, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p18/400/500' },
  { id: 'p19', name: 'Casemiro', basePrice: 1400, position: 'Midfielder', rating: 89, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p19/400/500' },
  { id: 'p20', name: 'Ruben Dias', basePrice: 2200, position: 'Defender', rating: 91, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p20/400/500' },
  { id: 'p21', name: 'Son Heung-min', basePrice: 1800, position: 'Forward', rating: 90, nationality: 'KOR', imageUrl: 'https://picsum.photos/seed/p21/400/500' },
  { id: 'p22', name: 'Pedri', basePrice: 3500, position: 'Midfielder', rating: 91, nationality: 'ESP', imageUrl: 'https://picsum.photos/seed/p22/400/500' },
  { id: 'p23', name: 'Gavi', basePrice: 3200, position: 'Midfielder', rating: 89, nationality: 'ESP', imageUrl: 'https://picsum.photos/seed/p23/400/500' },
  { id: 'p24', name: 'Jude Bellingham', basePrice: 4200, position: 'Midfielder', rating: 95, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p24/400/500' },
  { id: 'p25', name: 'Jamal Musiala', basePrice: 3800, position: 'Midfielder', rating: 92, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p25/400/500' },
  { id: 'p26', name: 'Bukayo Saka', basePrice: 3500, position: 'Forward', rating: 91, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p26/400/500' },
  { id: 'p27', name: 'Martin Odegaard', basePrice: 3200, position: 'Midfielder', rating: 91, nationality: 'NOR', imageUrl: 'https://picsum.photos/seed/p27/400/500' },
  { id: 'p28', name: 'Marcus Rashford', basePrice: 2000, position: 'Forward', rating: 88, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p28/400/500' },
  { id: 'p29', name: 'Bruno Fernandes', basePrice: 2500, position: 'Midfielder', rating: 90, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p29/400/500' },
  { id: 'p30', name: 'Rodri', basePrice: 3000, position: 'Midfielder', rating: 93, nationality: 'ESP', imageUrl: 'https://picsum.photos/seed/p30/400/500' },
  { id: 'p31', name: 'Jan Oblak', basePrice: 1500, position: 'Goalkeeper', rating: 89, nationality: 'SLO', imageUrl: 'https://picsum.photos/seed/p31/400/500' },
  { id: 'p32', name: 'Ter Stegen', basePrice: 1700, position: 'Goalkeeper', rating: 90, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p32/400/500' },
  { id: 'p33', name: 'Manuel Neuer', basePrice: 1000, position: 'Goalkeeper', rating: 87, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p33/400/500' },
  { id: 'p34', name: 'Donnarumma', basePrice: 2200, position: 'Goalkeeper', rating: 89, nationality: 'ITA', imageUrl: 'https://picsum.photos/seed/p34/400/500' },
  { id: 'p35', name: 'Mike Maignan', basePrice: 2000, position: 'Goalkeeper', rating: 89, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p35/400/500' },
  { id: 'p36', name: 'Achraf Hakimi', basePrice: 2800, position: 'Defender', rating: 90, nationality: 'MAR', imageUrl: 'https://picsum.photos/seed/p36/400/500' },
  { id: 'p37', name: 'Joao Cancelo', basePrice: 1500, position: 'Defender', rating: 88, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p37/400/500' },
  { id: 'p38', name: 'Alphonso Davies', basePrice: 3000, position: 'Defender', rating: 89, nationality: 'CAN', imageUrl: 'https://picsum.photos/seed/p38/400/500' },
  { id: 'p39', name: 'Theo Hernandez', basePrice: 2500, position: 'Defender', rating: 89, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p39/400/500' },
  { id: 'p40', name: 'Marquinhos', basePrice: 1800, position: 'Defender', rating: 89, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p40/400/500' },
  { id: 'p41', name: 'David Alaba', basePrice: 1600, position: 'Defender', rating: 88, nationality: 'AUT', imageUrl: 'https://picsum.photos/seed/p41/400/500' },
  { id: 'p42', name: 'Antonio Rudiger', basePrice: 2000, position: 'Defender', rating: 89, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p42/400/500' },
  { id: 'p43', name: 'Eder Militao', basePrice: 2200, position: 'Defender', rating: 89, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p43/400/500' },
  { id: 'p44', name: 'Ronald Araujo', basePrice: 2800, position: 'Defender', rating: 90, nationality: 'URU', imageUrl: 'https://picsum.photos/seed/p44/400/500' },
  { id: 'p45', name: 'Jules Kounde', basePrice: 2000, position: 'Defender', rating: 88, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p45/400/500' },
  { id: 'p46', name: 'William Saliba', basePrice: 3200, position: 'Defender', rating: 91, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p46/400/500' },
  { id: 'p47', name: 'Declan Rice', basePrice: 3500, position: 'Midfielder', rating: 92, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p47/400/500' },
  { id: 'p48', name: 'Frenkie de Jong', basePrice: 2800, position: 'Midfielder', rating: 90, nationality: 'NED', imageUrl: 'https://picsum.photos/seed/p48/400/500' },
  { id: 'p49', name: 'Federico Valverde', basePrice: 3800, position: 'Midfielder', rating: 93, nationality: 'URU', imageUrl: 'https://picsum.photos/seed/p49/400/500' },
  { id: 'p50', name: 'Toni Kroos', basePrice: 1200, position: 'Midfielder', rating: 88, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p50/400/500' },
  { id: 'p51', name: 'Nicolo Barella', basePrice: 2500, position: 'Midfielder', rating: 90, nationality: 'ITA', imageUrl: 'https://picsum.photos/seed/p51/400/500' },
  { id: 'p52', name: 'Rafael Leao', basePrice: 3000, position: 'Forward', rating: 91, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p52/400/500' },
  { id: 'p53', name: 'Kvaratskhelia', basePrice: 2800, position: 'Forward', rating: 90, nationality: 'GEO', imageUrl: 'https://picsum.photos/seed/p53/400/500' },
  { id: 'p54', name: 'Lautaro Martinez', basePrice: 3200, position: 'Forward', rating: 91, nationality: 'ARG', imageUrl: 'https://picsum.photos/seed/p54/400/500' },
  { id: 'p55', name: 'Victor Osimhen', basePrice: 3500, position: 'Forward', rating: 92, nationality: 'NGA', imageUrl: 'https://picsum.photos/seed/p55/400/500' },
  { id: 'p56', name: 'Antoine Griezmann', basePrice: 2000, position: 'Forward', rating: 89, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p56/400/500' },
  { id: 'p57', name: 'Christopher Nkunku', basePrice: 2500, position: 'Forward', rating: 89, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p57/400/500' },
  { id: 'p58', name: 'Phil Foden', basePrice: 3800, position: 'Forward', rating: 93, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p58/400/500' },
  { id: 'p59', name: 'Jack Grealish', basePrice: 2200, position: 'Forward', rating: 88, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p59/400/500' },
  { id: 'p60', name: 'Julian Alvarez', basePrice: 2800, position: 'Forward', rating: 89, nationality: 'ARG', imageUrl: 'https://picsum.photos/seed/p60/400/500' }
];
