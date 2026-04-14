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
}

export const TEAMS: Team[] = [
  { 
    id: 't1', 
    name: 'Real Madrid', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/250px-Real_Madrid_CF.svg.png', 
    color: '#4AB0ED',
    manager: 'Ancelotti',
    managerImageUrl: 'https://picsum.photos/seed/t1m/200/200',
    captain: 'Luka Modrić',
    captainImageUrl: 'https://picsum.photos/seed/t1c/200/200',
    gk: 'Thibaut Courtois',
    gkImageUrl: 'https://picsum.photos/seed/t1g/200/200'
  },
  { 
    id: 't2', 
    name: 'FC Barcelona', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/sco/thumb/4/47/FC_Barcelona_%28crest%29.svg/1280px-FC_Barcelona_%28crest%29.svg.png', 
    color: '#FCD34D',
    manager: 'Hansi Flick',
    managerImageUrl: 'https://picsum.photos/seed/t2m/200/200',
    captain: 'Ter Stegen',
    captainImageUrl: 'https://picsum.photos/seed/t2c/200/200',
    gk: 'Ter Stegen',
    gkImageUrl: 'https://picsum.photos/seed/t2g/200/200'
  },
  { 
    id: 't3', 
    name: 'Arsenal FC', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/sco/thumb/5/53/Arsenal_FC.svg/1920px-Arsenal_FC.svg.png', 
    color: '#F87171',
    manager: 'Mikel Arteta',
    managerImageUrl: 'https://picsum.photos/seed/t3m/200/200',
    captain: 'Martin Ødegaard',
    captainImageUrl: 'https://picsum.photos/seed/t3c/200/200',
    gk: 'David Raya',
    gkImageUrl: 'https://picsum.photos/seed/t3g/200/200'
  },
  { 
    id: 't4', 
    name: 'Manchester City', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1280px-Manchester_City_FC_badge.svg.png', 
    color: '#10B981',
    manager: 'Pep Guardiola',
    managerImageUrl: 'https://picsum.photos/seed/t4m/200/200',
    captain: 'Kyle Walker',
    captainImageUrl: 'https://picsum.photos/seed/t4c/200/200',
    gk: 'Ederson',
    gkImageUrl: 'https://picsum.photos/seed/t4g/200/200'
  },
  { 
    id: 't5', 
    name: 'Liverpool FC', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/250px-Liverpool_FC.svg.png', 
    color: '#8B5CF6',
    manager: 'Arne Slot',
    managerImageUrl: 'https://picsum.photos/seed/t5m/200/200',
    captain: 'Virgil van Dijk',
    captainImageUrl: 'https://picsum.photos/seed/t5c/200/200',
    gk: 'Alisson Becker',
    gkImageUrl: 'https://picsum.photos/seed/t5g/200/200'
  },
  { 
    id: 't6', 
    name: 'Bayern Munich', 
    budget: 10000, 
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg/1280px-FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg.png', 
    color: '#EC4899',
    manager: 'Vincent Kompany',
    managerImageUrl: 'https://picsum.photos/seed/t6m/200/200',
    captain: 'Manuel Neuer',
    captainImageUrl: 'https://picsum.photos/seed/t6c/200/200',
    gk: 'Manuel Neuer',
    gkImageUrl: 'https://picsum.photos/seed/t6g/200/200'
  },
];

export const PLAYERS: Player[] = [
  { id: 'p1', name: 'Aflah CP', basePrice: 10, position: 'Midfielder', rating: 90, nationality: 'FLH', imageUrl: 'https://i.postimg.cc/2SnqVxhZ/ww-jpg.jpg' },
  { id: 'p2', name: 'Cristiano Ronaldo', basePrice: 10, position: 'Forward', rating: 96, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p2/400/500' },
  { id: 'p3', name: 'Kylian Mbappe', basePrice: 10, position: 'Forward', rating: 97, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p3/400/500' },
  { id: 'p4', name: 'Erling Haaland', basePrice: 10, position: 'Forward', rating: 96, nationality: 'NOR', imageUrl: 'https://picsum.photos/seed/p4/400/500' },
  { id: 'p5', name: 'Kevin De Bruyne', basePrice: 10, position: 'Midfielder', rating: 94, nationality: 'BEL', imageUrl: 'https://picsum.photos/seed/p5/400/500' },
  { id: 'p6', name: 'Robert Lewandowski', basePrice: 10, position: 'Forward', rating: 93, nationality: 'POL', imageUrl: 'https://picsum.photos/seed/p6/400/500' },
  { id: 'p7', name: 'Mohamed Salah', basePrice: 10, position: 'Forward', rating: 93, nationality: 'EGY', imageUrl: 'https://picsum.photos/seed/p7/400/500' },
  { id: 'p8', name: 'Karim Benzema', basePrice: 10, position: 'Forward', rating: 92, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p8/400/500' },
  { id: 'p9', name: 'Harry Kane', basePrice: 10, position: 'Forward', rating: 93, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p9/400/500' },
  { id: 'p10', name: 'Neymar Jr', basePrice: 10, position: 'Forward', rating: 91, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p10/400/500' },
  { id: 'p11', name: 'Luka Modric', basePrice: 10, position: 'Midfielder', rating: 90, nationality: 'CRO', imageUrl: 'https://picsum.photos/seed/p11/400/500' },
  { id: 'p12', name: 'Thibaut Courtois', basePrice: 10, position: 'Goalkeeper', rating: 91, nationality: 'BEL', imageUrl: 'https://picsum.photos/seed/p12/400/500' },
  { id: 'p13', name: 'Virgil van Dijk', basePrice: 10, position: 'Defender', rating: 92, nationality: 'NED', imageUrl: 'https://picsum.photos/seed/p13/400/500' },
  { id: 'p14', name: 'Sadio Mane', basePrice: 10, position: 'Forward', rating: 89, nationality: 'SEN', imageUrl: 'https://picsum.photos/seed/p14/400/500' },
  { id: 'p15', name: 'Joshua Kimmich', basePrice: 10, position: 'Midfielder', rating: 91, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p15/400/500' },
  { id: 'p16', name: 'Vinicius Jr', basePrice: 10, position: 'Forward', rating: 94, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p16/400/500' },
  { id: 'p17', name: 'Bernardo Silva', basePrice: 10, position: 'Midfielder', rating: 92, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p17/400/500' },
  { id: 'p18', name: 'Alisson Becker', basePrice: 10, position: 'Goalkeeper', rating: 90, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p18/400/500' },
  { id: 'p19', name: 'Casemiro', basePrice: 10, position: 'Midfielder', rating: 89, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p19/400/500' },
  { id: 'p20', name: 'Ruben Dias', basePrice: 10, position: 'Defender', rating: 91, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p20/400/500' },
  { id: 'p21', name: 'Son Heung-min', basePrice: 10, position: 'Forward', rating: 90, nationality: 'KOR', imageUrl: 'https://picsum.photos/seed/p21/400/500' },
  { id: 'p22', name: 'Pedri', basePrice: 10, position: 'Midfielder', rating: 91, nationality: 'ESP', imageUrl: 'https://picsum.photos/seed/p22/400/500' },
  { id: 'p23', name: 'Gavi', basePrice: 10, position: 'Midfielder', rating: 89, nationality: 'ESP', imageUrl: 'https://picsum.photos/seed/p23/400/500' },
  { id: 'p24', name: 'Jude Bellingham', basePrice: 10, position: 'Midfielder', rating: 95, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p24/400/500' },
  { id: 'p25', name: 'Jamal Musiala', basePrice: 10, position: 'Midfielder', rating: 92, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p25/400/500' },
  { id: 'p26', name: 'Bukayo Saka', basePrice: 10, position: 'Forward', rating: 91, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p26/400/500' },
  { id: 'p27', name: 'Martin Odegaard', basePrice: 10, position: 'Midfielder', rating: 91, nationality: 'NOR', imageUrl: 'https://picsum.photos/seed/p27/400/500' },
  { id: 'p28', name: 'Marcus Rashford', basePrice: 10, position: 'Forward', rating: 88, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p28/400/500' },
  { id: 'p29', name: 'Bruno Fernandes', basePrice: 10, position: 'Midfielder', rating: 90, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p29/400/500' },
  { id: 'p30', name: 'Rodri', basePrice: 10, position: 'Midfielder', rating: 93, nationality: 'ESP', imageUrl: 'https://picsum.photos/seed/p30/400/500' },
  { id: 'p31', name: 'Jan Oblak', basePrice: 10, position: 'Goalkeeper', rating: 89, nationality: 'SLO', imageUrl: 'https://picsum.photos/seed/p31/400/500' },
  { id: 'p32', name: 'Ter Stegen', basePrice: 10, position: 'Goalkeeper', rating: 90, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p32/400/500' },
  { id: 'p33', name: 'Manuel Neuer', basePrice: 10, position: 'Goalkeeper', rating: 87, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p33/400/500' },
  { id: 'p34', name: 'Donnarumma', basePrice: 10, position: 'Goalkeeper', rating: 89, nationality: 'ITA', imageUrl: 'https://picsum.photos/seed/p34/400/500' },
  { id: 'p35', name: 'Mike Maignan', basePrice: 10, position: 'Goalkeeper', rating: 89, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p35/400/500' },
  { id: 'p36', name: 'Achraf Hakimi', basePrice: 10, position: 'Defender', rating: 90, nationality: 'MAR', imageUrl: 'https://picsum.photos/seed/p36/400/500' },
  { id: 'p37', name: 'Joao Cancelo', basePrice: 10, position: 'Defender', rating: 88, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p37/400/500' },
  { id: 'p38', name: 'Alphonso Davies', basePrice: 10, position: 'Defender', rating: 89, nationality: 'CAN', imageUrl: 'https://picsum.photos/seed/p38/400/500' },
  { id: 'p39', name: 'Theo Hernandez', basePrice: 10, position: 'Defender', rating: 89, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p39/400/500' },
  { id: 'p40', name: 'Marquinhos', basePrice: 10, position: 'Defender', rating: 89, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p40/400/500' },
  { id: 'p41', name: 'David Alaba', basePrice: 10, position: 'Defender', rating: 88, nationality: 'AUT', imageUrl: 'https://picsum.photos/seed/p41/400/500' },
  { id: 'p42', name: 'Antonio Rudiger', basePrice: 10, position: 'Defender', rating: 89, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p42/400/500' },
  { id: 'p43', name: 'Eder Militao', basePrice: 10, position: 'Defender', rating: 89, nationality: 'BRA', imageUrl: 'https://picsum.photos/seed/p43/400/500' },
  { id: 'p44', name: 'Ronald Araujo', basePrice: 10, position: 'Defender', rating: 90, nationality: 'URU', imageUrl: 'https://picsum.photos/seed/p44/400/500' },
  { id: 'p45', name: 'Jules Kounde', basePrice: 10, position: 'Defender', rating: 88, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p45/400/500' },
  { id: 'p46', name: 'William Saliba', basePrice: 10, position: 'Defender', rating: 91, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p46/400/500' },
  { id: 'p47', name: 'Declan Rice', basePrice: 10, position: 'Midfielder', rating: 92, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p47/400/500' },
  { id: 'p48', name: 'Frenkie de Jong', basePrice: 10, position: 'Midfielder', rating: 90, nationality: 'NED', imageUrl: 'https://picsum.photos/seed/p48/400/500' },
  { id: 'p49', name: 'Federico Valverde', basePrice: 10, position: 'Midfielder', rating: 93, nationality: 'URU', imageUrl: 'https://picsum.photos/seed/p49/400/500' },
  { id: 'p50', name: 'Toni Kroos', basePrice: 10, position: 'Midfielder', rating: 88, nationality: 'GER', imageUrl: 'https://picsum.photos/seed/p50/400/500' },
  { id: 'p51', name: 'Nicolo Barella', basePrice: 10, position: 'Midfielder', rating: 90, nationality: 'ITA', imageUrl: 'https://picsum.photos/seed/p51/400/500' },
  { id: 'p52', name: 'Rafael Leao', basePrice: 10, position: 'Forward', rating: 91, nationality: 'POR', imageUrl: 'https://picsum.photos/seed/p52/400/500' },
  { id: 'p53', name: 'Kvaratskhelia', basePrice: 10, position: 'Forward', rating: 90, nationality: 'GEO', imageUrl: 'https://picsum.photos/seed/p53/400/500' },
  { id: 'p54', name: 'Lautaro Martinez', basePrice: 10, position: 'Forward', rating: 91, nationality: 'ARG', imageUrl: 'https://picsum.photos/seed/p54/400/500' },
  { id: 'p55', name: 'Victor Osimhen', basePrice: 10, position: 'Forward', rating: 92, nationality: 'NGA', imageUrl: 'https://picsum.photos/seed/p55/400/500' },
  { id: 'p56', name: 'Antoine Griezmann', basePrice: 10, position: 'Forward', rating: 89, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p56/400/500' },
  { id: 'p57', name: 'Christopher Nkunku', basePrice: 10, position: 'Forward', rating: 89, nationality: 'FRA', imageUrl: 'https://picsum.photos/seed/p57/400/500' },
  { id: 'p58', name: 'Phil Foden', basePrice: 10, position: 'Forward', rating: 93, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p58/400/500' },
  { id: 'p59', name: 'Jack Grealish', basePrice: 10, position: 'Forward', rating: 88, nationality: 'ENG', imageUrl: 'https://picsum.photos/seed/p59/400/500' },
  { id: 'p60', name: 'Julian Alvarez', basePrice: 10, position: 'Forward', rating: 89, nationality: 'ARG', imageUrl: 'https://picsum.photos/seed/p60/400/500' }
];
