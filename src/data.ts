export const POSITIONS = [
  'GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'RW', 'LW', 'ST'
];

export const TEAMS = [
  { 
    name: 'Borussia Dortmund', 
    league: 'Bundesliga', 
    budget: 60, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
    manager: { name: 'Nuri Şahin', value: 2 },
    roster: {
      GK: { name: 'Gregor Kobel', value: 40 },
      CB: { name: 'Nico Schlotterbeck', value: 40 },
      LB: { name: 'Ramy Bensebaini', value: 12 },
      RB: { name: 'Julian Ryerson', value: 15 },
      CDM: { name: 'Emre Can', value: 10 },
      CM: { name: 'Marcel Sabitzer', value: 20 },
      CAM: { name: 'Julian Brandt', value: 40 },
      RW: { name: 'Donyell Malen', value: 35 },
      LW: { name: 'Jamie Gittens', value: 30 },
      ST: { name: 'Serhou Guirassy', value: 40 }
    }
  },
  { 
    name: 'Arsenal', 
    league: 'Premier League', 
    budget: 70, 
    image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    manager: { name: 'Mikel Arteta', value: 5 },
    roster: {
      GK: { name: 'David Raya', value: 35 },
      CB: { name: 'William Saliba', value: 80 },
      LB: { name: 'Riccardo Calafiori', value: 45 },
      RB: { name: 'Ben White', value: 55 },
      CDM: { name: 'Declan Rice', value: 120 },
      CM: { name: 'Thomas Partey', value: 15 },
      CAM: { name: 'Martin Ødegaard', value: 110 },
      RW: { name: 'Bukayo Saka', value: 140 },
      LW: { name: 'Gabriel Martinelli', value: 70 },
      ST: { name: 'Kai Havertz', value: 70 }
    }
  },
  { 
    name: 'AC Milan', 
    league: 'Serie A', 
    budget: 55, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    manager: { name: 'Paulo Fonseca', value: 3 },
    roster: {
      GK: { name: 'Mike Maignan', value: 38 },
      CB: { name: 'Fikayo Tomori', value: 32 },
      LB: { name: 'Theo Hernández', value: 60 },
      RB: { name: 'Emerson Royal', value: 15 },
      CDM: { name: 'Youssouf Fofana', value: 25 },
      CM: { name: 'Tijjani Reijnders', value: 30 },
      CAM: { name: 'Christian Pulisic', value: 40 },
      RW: { name: 'Samuel Chukwueze', value: 20 },
      LW: { name: 'Rafael Leão', value: 90 },
      ST: { name: 'Álvaro Morata', value: 15 }
    }
  },
  { 
    name: 'Atletico Madrid', 
    league: 'La Liga', 
    budget: 65, 
    image: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
    manager: { name: 'Diego Simeone', value: 4 },
    roster: {
      GK: { name: 'Jan Oblak', value: 28 },
      CB: { name: 'Robin Le Normand', value: 40 },
      LB: { name: 'Reinildo', value: 10 },
      RB: { name: 'Nahuel Molina', value: 25 },
      CDM: { name: 'Koke', value: 12 },
      CM: { name: 'Rodrigo De Paul', value: 30 },
      CAM: { name: 'Antoine Griezmann', value: 25 },
      RW: { name: 'Marcos Llorente', value: 30 },
      LW: { name: 'Samuel Lino', value: 25 },
      ST: { name: 'Julián Álvarez', value: 90 }
    }
  },
  { 
    name: 'Bayer Leverkusen', 
    league: 'Bundesliga', 
    budget: 50, 
    image: 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
    manager: { name: 'Xabi Alonso', value: 6 }, // Meta: Selling Alonso to buy Alonso!
    roster: {
      GK: { name: 'Lukas Hradecky', value: 5 },
      CB: { name: 'Edmond Tapsoba', value: 45 },
      LB: { name: 'Alejandro Grimaldo', value: 45 },
      RB: { name: 'Jeremie Frimpong', value: 50 },
      CDM: { name: 'Granit Xhaka', value: 20 },
      CM: { name: 'Exequiel Palacios', value: 40 },
      CAM: { name: 'Florian Wirtz', value: 130 },
      RW: { name: 'Jonas Hofmann', value: 10 },
      LW: { name: 'Martin Terrier', value: 20 },
      ST: { name: 'Victor Boniface', value: 45 }
    }
  },
  { 
    name: 'Tottenham', 
    league: 'Premier League', 
    budget: 60, 
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
    manager: { name: 'Ange Postecoglou', value: 4 },
    roster: {
      GK: { name: 'Guglielmo Vicario', value: 35 },
      CB: { name: 'Cristian Romero', value: 65 },
      LB: { name: 'Destiny Udogie', value: 45 },
      RB: { name: 'Pedro Porro', value: 45 },
      CDM: { name: 'Yves Bissouma', value: 30 },
      CM: { name: 'Pape Matar Sarr', value: 40 },
      CAM: { name: 'James Maddison', value: 60 },
      RW: { name: 'Dejan Kulusevski', value: 50 },
      LW: { name: 'Son Heung-min', value: 45 },
      ST: { name: 'Dominic Solanke', value: 40 }
    }
  },
  { 
    name: 'Juventus', 
    league: 'Serie A', 
    budget: 65, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg',
    manager: { name: 'Thiago Motta', value: 3 },
    roster: {
      GK: { name: 'Michele Di Gregorio', value: 20 },
      CB: { name: 'Bremer', value: 60 },
      LB: { name: 'Andrea Cambiaso', value: 25 },
      RB: { name: 'Nicolò Savona', value: 10 },
      CDM: { name: 'Manuel Locatelli', value: 25 },
      CM: { name: 'Teun Koopmeiners', value: 50 },
      CAM: { name: 'Kenan Yildiz', value: 30 },
      RW: { name: 'Nico González', value: 35 },
      LW: { name: 'Francisco Conceição', value: 20 },
      ST: { name: 'Dušan Vlahović', value: 65 }
    }
  },
  { 
    name: 'PSG', 
    league: 'Ligue 1', 
    budget: 100, 
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    manager: { name: 'Luis Enrique', value: 5 },
    roster: {
      GK: { name: 'Gianluigi Donnarumma', value: 40 },
      CB: { name: 'Marquinhos', value: 50 },
      LB: { name: 'Nuno Mendes', value: 55 },
      RB: { name: 'Achraf Hakimi', value: 60 },
      CDM: { name: 'Vitinha', value: 55 },
      CM: { name: 'Warren Zaïre-Emery', value: 60 },
      CAM: { name: 'João Neves', value: 60 },
      RW: { name: 'Ousmane Dembélé', value: 60 },
      LW: { name: 'Bradley Barcola', value: 50 },
      ST: { name: 'Gonçalo Ramos', value: 45 }
    }
  }
];

export const MANAGERS = [
  { id: 'm1', name: 'Xabi Alonso', style: 'The Invincible', cost: 18, bonus: 8 },
  { id: 'm2', name: 'Unai Emery', style: 'Tactical Master', cost: 12, bonus: 5 },
  { id: 'm3', name: 'Sebastian Hoeneß', style: 'Rising Star', cost: 8, bonus: 4 },
];

export const SCENARIOS = [
  { id: 's1', title: "The Wall Rebuilt", desc: "Buy 2 New Center Backs", penalty: 10 },
  { id: 's2', title: "Goal Machine", desc: "Buy a ST rated 88+", penalty: 10 },
  { id: 's3', title: "Midfield Maestro", desc: "Buy a CM/CDM rated 90+", penalty: 10 },
  { id: 's4', title: "Future Stars", desc: "Buy 3 Players under age 23", penalty: 10 },
  { id: 's5', title: "Domestic Talent", desc: "Buy 2 Players from the same nation", penalty: 10 },
];

export const FINANCIALS = [
  { id: 'f1', title: "Oil Takeover", effect: "+100M", value: 100 },
  { id: 'f2', title: "Shirt Sponsor", effect: "+40M", value: 40 },
  { id: 'f3', title: "Fan Fundraiser", effect: "+10M", value: 10 },
  { id: 'f4', title: "FFP Fine", effect: "-30M", value: -30 },
  { id: 'f5', title: "Stadium Repair", effect: "-20M", value: -20 },
  { id: 'f6', title: "Quiet Window", effect: "No Change", value: 0 },
];

export const MARKET = {
  GK: [
    { id: 101, name: 'Alisson', club: 'Liverpool', value: 45, rating: 92 },
    { id: 102, name: 'Courtois', club: 'Real Madrid', value: 60, rating: 91 },
    { id: 103, name: 'Diogo Costa', club: 'Porto', value: 45, rating: 88 },
    { id: 104, name: 'Mamardashvili', club: 'Liverpool', value: 45, rating: 82 },
    { id: 105, name: 'Chevalier', club: 'PSG', value: 40, rating: 85 },
    { id: 106, name: 'Vicario', club: 'Spurs', value: 35, rating: 85 },
    { id: 107, name: 'Di Gregorio', club: 'Juventus', value: 25, rating: 82 },
    { id: 108, name: 'Verbruggen', club: 'Brighton', value: 25, rating: 79 },
    { id: 109, name: 'Valles', club: 'Las Palmas', value: 15, rating: 80 },
    { id: 110, name: 'Luiz Júnior', club: 'Famalicão', value: 12, rating: 76 },
  ],
  CB: [
    { id: 201, name: 'Saliba', club: 'Arsenal', value: 80, rating: 90 },
    { id: 202, name: 'Dias', club: 'Man City', value: 80, rating: 89 },
    { id: 203, name: 'Yoro', club: 'Man Utd', value: 55, rating: 84 },
    { id: 204, name: 'Inácio', club: 'Sporting', value: 45, rating: 83 },
    { id: 205, name: 'Calafiori', club: 'Arsenal', value: 45, rating: 82 },
    { id: 206, name: 'Diomande', club: 'Sporting', value: 40, rating: 84 },
    { id: 207, name: 'Murillo', club: 'Forest', value: 40, rating: 81 },
    { id: 208, name: 'Hato', club: 'Chelsea', value: 35, rating: 80 },
    { id: 209, name: 'Mosquera', club: 'Arsenal', value: 30, rating: 78 },
    { id: 210, name: 'Adarabioyo', club: 'Chelsea', value: 20, rating: 77 },
  ],
  LB: [
    { id: 301, name: 'Hernández', club: 'Milan', value: 60, rating: 86 },
    { id: 302, name: 'Davies', club: 'Bayern', value: 50, rating: 88 },
    { id: 303, name: 'Udogie', club: 'Spurs', value: 45, rating: 84 },
    { id: 304, name: 'Grimaldo', club: 'Leverkusen', value: 45, rating: 85 },
    { id: 305, name: 'Aït-Nouri', club: 'Man City', value: 40, rating: 80 },
    { id: 306, name: 'Maatsen', club: 'Aston Villa', value: 40, rating: 81 },
    { id: 307, name: 'Gutiérrez', club: 'Girona', value: 30, rating: 81 },
    { id: 308, name: 'Hall', club: 'Newcastle', value: 28, rating: 78 },
    { id: 309, name: 'Locko', club: 'Brest', value: 15, rating: 77 },
    { id: 310, name: 'Davis', club: 'Ipswich', value: 15, rating: 75 },
  ],
  RB: [
    { id: 401, name: 'Alexander-Arnold', club: 'Real Madrid', value: 70, rating: 90 },
    { id: 402, name: 'Hakimi', club: 'PSG', value: 60, rating: 87 },
    { id: 403, name: 'Frimpong', club: 'Liverpool', value: 45, rating: 86 },
    { id: 404, name: 'Porro', club: 'Spurs', value: 45, rating: 84 },
    { id: 405, name: 'Lewis', club: 'Man City', value: 40, rating: 80 },
    { id: 406, name: 'Gusto', club: 'Chelsea', value: 35, rating: 82 },
    { id: 407, name: 'Vanderson', club: 'Monaco', value: 25, rating: 79 },
    { id: 408, name: 'Gray', club: 'Spurs', value: 20, rating: 76 },
    { id: 409, name: 'Bradley', club: 'Liverpool', value: 18, rating: 77 },
    { id: 410, name: 'Santos', club: 'Lille', value: 18, rating: 79 },
  ],
  CDM: [
    { id: 501, name: 'Rodri', club: 'Man City', value: 130, rating: 93 },
    { id: 502, name: 'Rice', club: 'Arsenal', value: 120, rating: 89 },
    { id: 503, name: 'Tchouaméni', club: 'Real Madrid', value: 100, rating: 87 },
    { id: 504, name: 'Neves', club: 'PSG', value: 60, rating: 85 },
    { id: 505, name: 'Mainoo', club: 'Man Utd', value: 55, rating: 84 },
    { id: 506, name: 'Onana', club: 'Aston Villa', value: 50, rating: 83 },
    { id: 507, name: 'Wharton', club: 'Crystal Palace', value: 35, rating: 82 },
    { id: 508, name: 'Wieffer', club: 'Brighton', value: 30, rating: 81 },
    { id: 509, name: 'Bajcetic', club: 'Liverpool', value: 15, rating: 78 },
    { id: 510, name: 'Bergvall', club: 'Spurs', value: 15, rating: 76 },
  ],
  CM: [
    { id: 601, name: 'Bellingham', club: 'Real Madrid', value: 180, rating: 95 },
    { id: 602, name: 'Musiala', club: 'Bayern', value: 140, rating: 90 },
    { id: 603, name: 'Wirtz', club: 'Liverpool', value: 130, rating: 92 },
    { id: 604, name: 'Palmer', club: 'Chelsea', value: 90, rating: 88 },
    { id: 605, name: 'Simons', club: 'Spurs', value: 60, rating: 87 },
    { id: 606, name: 'Güler', club: 'Real Madrid', value: 45, rating: 83 },
    { id: 607, name: 'Doué', club: 'PSG', value: 35, rating: 81 },
    { id: 608, name: 'Bobb', club: 'Man City', value: 25, rating: 80 },
    { id: 609, name: 'Echeverri', club: 'Man City', value: 20, rating: 78 },
    { id: 610, name: 'J. Bellingham', club: 'Sunderland', value: 15, rating: 76 },
  ],
  RW: [
    { id: 701, name: 'Vinícius Jr', club: 'Real Madrid', value: 170, rating: 93 },
    { id: 702, name: 'Yamal', club: 'Barcelona', value: 150, rating: 90 },
    { id: 703, name: 'Saka', club: 'Arsenal', value: 140, rating: 89 },
    { id: 704, name: 'Williams', club: 'Athletic Club', value: 60, rating: 87 },
    { id: 705, name: 'Olise', club: 'Bayern', value: 55, rating: 85 },
    { id: 706, name: 'Savinho', club: 'Man City', value: 50, rating: 83 },
    { id: 707, name: 'Estêvão', club: 'Chelsea', value: 40, rating: 80 },
    { id: 708, name: 'Minteh', club: 'Brighton', value: 30, rating: 79 },
    { id: 709, name: 'Diao', club: 'Como 1907', value: 15, rating: 77 },
    { id: 710, name: 'Bardghji', club: 'Barcelona', value: 10, rating: 82 },
  ],
  LW: [],
  ST: [
    { id: 901, name: 'Haaland', club: 'Man City', value: 200, rating: 95 },
    { id: 902, name: 'Mbappé', club: 'Real Madrid', value: 180, rating: 96 },
    { id: 903, name: 'Gyökeres', club: 'Arsenal', value: 75, rating: 90 },
    { id: 904, name: 'Isak', club: 'Newcastle', value: 75, rating: 87 },
    { id: 905, name: 'Šeško', club: 'Leipzig', value: 50, rating: 85 },
    { id: 906, name: 'Tel', club: 'Spurs', value: 35, rating: 81 },
    { id: 907, name: 'Omorodion', club: 'Chelsea', value: 35, rating: 80 },
    { id: 908, name: 'Endrick', club: 'Lyon (Loan)', value: 30, rating: 83 },
    { id: 909, name: 'Ferguson', club: 'Roma', value: 25, rating: 79 },
    { id: 910, name: 'Konaté', club: 'Salzburg', value: 25, rating: 77 },
  ]
};
