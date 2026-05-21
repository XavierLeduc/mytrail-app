import { Race } from '@/lib/types'

export const seedRaces: Race[] = [
  {
    id: '1', name: 'UTMB - Ultra-Trail du Mont-Blanc', slug: 'utmb', distance_km: 171, elevation_m: 10000,
    date: '2025-08-25', location: 'Chamonix-Mont-Blanc', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 6, registration_url: 'https://utmb.world', latitude: 45.9237, longitude: 6.8694,
    source: 'utmb', description: 'La course mythique autour du Mont-Blanc, 171km pour 10 000m de dénivelé positif.', created_at: '2025-01-01',
  },
  {
    id: '2', name: 'MCC - Mont-Blanc 80km', slug: 'mcc', distance_km: 40, elevation_m: 2500,
    date: '2025-08-27', location: 'Chamonix-Mont-Blanc', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: 'https://utmb.world', latitude: 45.9237, longitude: 6.8694,
    source: 'utmb', description: 'Une des courses du festival UTMB, format accessible autour de la vallée.', created_at: '2025-01-01',
  },
  {
    id: '3', name: 'Zegama-Aizkorri', slug: 'zegama', distance_km: 42, elevation_m: 4200,
    date: '2025-05-11', location: 'Zegama, Pays Basque', country: 'Espagne', region: 'Pays Basque',
    itra_points: 4, registration_url: null, latitude: 42.9786, longitude: -2.2969,
    source: 'manual', description: "Skyrace technique dans les Pyrénées basques, une des plus belles courses d'Europe.", created_at: '2025-01-01',
  },
  {
    id: '4', name: 'Lavaredo Ultra Trail', slug: 'lavaredo', distance_km: 120, elevation_m: 6000,
    date: '2025-06-27', location: 'Cortina d\'Ampezzo', country: 'Italie', region: 'Dolomites',
    itra_points: 5, registration_url: null, latitude: 46.5355, longitude: 12.1357,
    source: 'manual', description: 'Un tour des Trois Cimes de Lavaredo dans les Dolomites italiennes.', created_at: '2025-01-01',
  },
  {
    id: '5', name: 'Grand Trail des Hauts Forts', slug: 'gthf', distance_km: 52, elevation_m: 3200,
    date: '2025-06-08', location: 'Morzine-Avoriaz', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: null, latitude: 46.1666, longitude: 6.7152,
    source: 'manual', description: 'Un des plus beaux trails des Portes du Soleil avec vue sur le Mont-Blanc.', created_at: '2025-01-01',
  },
  {
    id: '6', name: 'Transvulcania', slug: 'transvulcania', distance_km: 74, elevation_m: 4750,
    date: '2025-05-10', location: 'La Palma', country: 'Espagne', region: 'Îles Canaries',
    itra_points: 5, registration_url: null, latitude: 28.6835, longitude: -17.8768,
    source: 'manual', description: 'Course volcanique mythique sur l\'île de La Palma, joyau des Canaries.', created_at: '2025-01-01',
  },
  {
    id: '7', name: 'Tor des Géants', slug: 'tor-des-geants', distance_km: 330, elevation_m: 24000,
    date: '2025-09-07', location: 'Courmayeur', country: 'Italie', region: 'Val d\'Aoste',
    itra_points: 6, registration_url: null, latitude: 45.7965, longitude: 6.9697,
    source: 'manual', description: 'La course de l\'extrême : 330km autour de la Vallée d\'Aoste en non-stop.', created_at: '2025-01-01',
  },
  {
    id: '8', name: 'Swiss Peaks 360', slug: 'swiss-peaks', distance_km: 360, elevation_m: 26000,
    date: '2025-08-14', location: 'Champéry', country: 'Suisse', region: 'Valais',
    itra_points: 6, registration_url: null, latitude: 46.1762, longitude: 6.8700,
    source: 'manual', description: 'Tour des Alpes suisses à travers les plus beaux paysages du Valais.', created_at: '2025-01-01',
  },
  {
    id: '9', name: 'Maxi Race du Lac d\'Annecy', slug: 'maxi-race', distance_km: 85, elevation_m: 5500,
    date: '2025-04-26', location: 'Annecy', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.8992, longitude: 6.1294,
    source: 'manual', description: 'Le tour du lac d\'Annecy en trail, passage obligé des coureurs alpins.', created_at: '2025-01-01',
  },
  {
    id: '10', name: 'Ecotrail Paris', slug: 'ecotrail-paris', distance_km: 80, elevation_m: 1900,
    date: '2025-03-15', location: 'Paris / Versailles', country: 'France', region: 'Île-de-France',
    itra_points: 2, registration_url: null, latitude: 48.8566, longitude: 2.3522,
    source: 'manual', description: 'Course trail qui relie Paris à Versailles à travers les forêts franciliennes.', created_at: '2025-01-01',
  },
  {
    id: '11', name: 'Hardrock 100', slug: 'hardrock-100', distance_km: 160, elevation_m: 10000,
    date: '2025-07-18', location: 'Silverton, Colorado', country: 'États-Unis', region: 'Colorado',
    itra_points: 6, registration_url: null, latitude: 37.8125, longitude: -107.6621,
    source: 'manual', description: 'Une des ultras les plus dures du monde dans les San Juan Mountains.', created_at: '2025-01-01',
  },
  {
    id: '12', name: 'Ultra Sierra Nevada', slug: 'ultra-sierra-nevada', distance_km: 107, elevation_m: 6900,
    date: '2025-07-05', location: 'Sierra Nevada', country: 'Espagne', region: 'Andalousie',
    itra_points: 5, registration_url: null, latitude: 37.0902, longitude: -3.3944,
    source: 'manual', description: 'Traversée de la Sierra Nevada au cœur de l\'Espagne méridionale.', created_at: '2025-01-01',
  },
  {
    id: '13', name: 'Grand Raid de La Réunion', slug: 'diagonale-fous', distance_km: 165, elevation_m: 10000,
    date: '2025-10-17', location: 'La Réunion', country: 'France', region: 'Océan Indien',
    itra_points: 6, registration_url: null, latitude: -21.1151, longitude: 55.5364,
    source: 'manual', description: 'La Diagonale des Fous, course mythique à travers l\'île intense de La Réunion.', created_at: '2025-01-01',
  },
  {
    id: '14', name: 'Transgrancanaria', slug: 'transgrancanaria', distance_km: 128, elevation_m: 8500,
    date: '2025-03-01', location: 'Las Palmas de Gran Canaria', country: 'Espagne', region: 'Îles Canaries',
    itra_points: 5, registration_url: null, latitude: 28.1248, longitude: -15.4300,
    source: 'manual', description: 'Traversée complète de Gran Canaria de nord en sud, 128km de paysages volcaniques.', created_at: '2025-01-01',
  },
  {
    id: '15', name: 'Madeira Island Ultra Trail', slug: 'miut', distance_km: 115, elevation_m: 7000,
    date: '2025-04-17', location: 'Funchal, Madère', country: 'Portugal', region: 'Madère',
    itra_points: 5, registration_url: null, latitude: 32.6669, longitude: -16.9241,
    source: 'manual', description: 'Tour de l\'île de Madère, entre laurisylve et côtes atlantiques.', created_at: '2025-01-01',
  },
  {
    id: '16', name: 'Trail du Beaufortain', slug: 'trail-beaufortain', distance_km: 65, elevation_m: 4500,
    date: '2025-07-12', location: 'Beaufort', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.7173, longitude: 6.5694,
    source: 'manual', description: 'Trail exigeant dans le massif du Beaufortain, entre lacs et alpages.', created_at: '2025-01-01',
  },
  {
    id: '17', name: 'CCC - Courmayeur-Champex-Chamonix', slug: 'ccc', distance_km: 100, elevation_m: 6000,
    date: '2025-08-28', location: 'Courmayeur → Chamonix', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 5, registration_url: 'https://utmb.world', latitude: 45.7965, longitude: 6.9697,
    source: 'utmb', description: 'L\'épreuve phare du festival UTMB : 100km de Courmayeur à Chamonix.', created_at: '2025-01-01',
  },
  {
    id: '18', name: 'Ultra Trail Cape Town', slug: 'utct', distance_km: 100, elevation_m: 6000,
    date: '2025-11-15', location: 'Cape Town', country: 'Afrique du Sud', region: 'Western Cape',
    itra_points: 5, registration_url: null, latitude: -33.9249, longitude: 18.4241,
    source: 'manual', description: 'Trail sur la péninsule du Cap, entre océan et montagne emblématique.', created_at: '2025-01-01',
  },
  {
    id: '19', name: 'Sierre-Zinal', slug: 'sierre-zinal', distance_km: 31, elevation_m: 2200,
    date: '2025-08-09', location: 'Sierre → Zinal', country: 'Suisse', region: 'Valais',
    itra_points: 3, registration_url: null, latitude: 46.2918, longitude: 7.5351,
    source: 'manual', description: 'Course de montagne iconique en Valais, face aux géants des Alpes suisses.', created_at: '2025-01-01',
  },
  {
    id: '20', name: 'Innsbruck Alpine Trailrun', slug: 'iat', distance_km: 65, elevation_m: 4800,
    date: '2025-06-21', location: 'Innsbruck', country: 'Autriche', region: 'Tyrol',
    itra_points: 4, registration_url: null, latitude: 47.2692, longitude: 11.4041,
    source: 'manual', description: 'Trail alpin autour d\'Innsbruck avec vue sur les Alpes tyroliennes.', created_at: '2025-01-01',
  },
]
