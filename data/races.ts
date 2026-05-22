import { Race } from '@/lib/types'

export const seedRaces: Race[] = [
  // --- UTMB World Series ---
  {
    id: '1', name: 'UTMB - Ultra-Trail du Mont-Blanc', slug: 'utmb-2026', distance_km: 171, elevation_m: 10000,
    date: '2026-08-24', location: 'Chamonix-Mont-Blanc', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 6, registration_url: 'https://utmb.world', latitude: 45.9237, longitude: 6.8694,
    source: 'seed', description: 'La course mythique autour du Mont-Blanc, 171km pour 10 000m de dénivelé positif.', created_at: '2025-01-01',
  },
  {
    id: '2', name: 'CCC - Courmayeur-Champex-Chamonix', slug: 'ccc-2026', distance_km: 100, elevation_m: 6000,
    date: '2026-08-27', location: 'Courmayeur → Chamonix', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 5, registration_url: 'https://utmb.world', latitude: 45.7965, longitude: 6.9697,
    source: 'seed', description: 'De Courmayeur à Chamonix en passant par Champex, 100km de paysages alpins.', created_at: '2025-01-01',
  },
  {
    id: '3', name: 'TDS - Sur les Traces des Ducs de Savoie', slug: 'tds-2026', distance_km: 145, elevation_m: 9100,
    date: '2026-08-25', location: 'Courmayeur → Chamonix', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 6, registration_url: 'https://utmb.world', latitude: 45.7965, longitude: 6.9697,
    source: 'seed', description: 'La traversée des Alpes par la face italienne, 145km entre Courmayeur et Chamonix.', created_at: '2025-01-01',
  },
  {
    id: '4', name: 'OCC - Orsières-Champex-Chamonix', slug: 'occ-2026', distance_km: 56, elevation_m: 3500,
    date: '2026-08-28', location: 'Orsières → Chamonix', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: 'https://utmb.world', latitude: 45.9237, longitude: 6.8694,
    source: 'seed', description: 'Le trail d\'initiation du festival UTMB, 56km pour rejoindre Chamonix depuis Orsières.', created_at: '2025-01-01',
  },
  {
    id: '5', name: 'MCC - Mont-Blanc 80km', slug: 'mcc-2026', distance_km: 40, elevation_m: 2500,
    date: '2026-08-29', location: 'Chamonix-Mont-Blanc', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: 'https://utmb.world', latitude: 45.9237, longitude: 6.8694,
    source: 'seed', description: 'Une des courses du festival UTMB, format accessible autour de la vallée.', created_at: '2025-01-01',
  },
  {
    id: '6', name: 'PTL - Petite Trotte à Léon', slug: 'ptl-2026', distance_km: 290, elevation_m: 25000,
    date: '2026-08-24', location: 'Chamonix-Mont-Blanc', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 6, registration_url: 'https://utmb.world', latitude: 45.9237, longitude: 6.8694,
    source: 'seed', description: 'L\'épreuve la plus extrême du festival UTMB : 290km en autonomie partielle à travers les Alpes.', created_at: '2025-01-01',
  },

  // --- France ---
  {
    id: '7', name: 'Zegama-Aizkorri', slug: 'zegama-2026', distance_km: 42, elevation_m: 4200,
    date: '2026-05-10', location: 'Zegama, Pays Basque', country: 'Espagne', region: 'Pays Basque',
    itra_points: 4, registration_url: null, latitude: 42.9786, longitude: -2.2969,
    source: 'seed', description: "Skyrace technique dans les Pyrénées basques, une des plus belles courses d'Europe.", created_at: '2025-01-01',
  },
  {
    id: '8', name: 'Grand Raid des Écrins', slug: 'grand-raid-ecrins-2026', distance_km: 100, elevation_m: 7500,
    date: '2026-06-20', location: 'Vallouise', country: 'France', region: 'PACA',
    itra_points: 5, registration_url: null, latitude: 44.8534, longitude: 6.4869,
    source: 'seed', description: 'Tour du massif des Écrins, 100km à travers les plus hauts sommets des Alpes du Sud.', created_at: '2025-01-01',
  },
  {
    id: '9', name: 'Trail des Templiers', slug: 'templiers-2026', distance_km: 73, elevation_m: 4700,
    date: '2026-10-24', location: 'Millau', country: 'France', region: 'Occitanie',
    itra_points: 4, registration_url: null, latitude: 44.0995, longitude: 3.0769,
    source: 'seed', description: 'Incontournable du trail français dans les gorges de la Dourbie, près du viaduc de Millau.', created_at: '2025-01-01',
  },
  {
    id: '10', name: 'Ultra-Trail Côte d\'Azur Mercantour', slug: 'utcam-2026', distance_km: 165, elevation_m: 12000,
    date: '2026-02-28', location: 'Nice', country: 'France', region: 'PACA',
    itra_points: 6, registration_url: null, latitude: 43.7102, longitude: 7.2620,
    source: 'seed', description: 'De la mer Méditerranée aux cimes du Mercantour, 165km pour le Graal hivernal du trail.', created_at: '2025-01-01',
  },
  {
    id: '11', name: 'Maxi Race du Lac d\'Annecy', slug: 'maxi-race-2026', distance_km: 85, elevation_m: 5500,
    date: '2026-04-25', location: 'Annecy', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.8992, longitude: 6.1294,
    source: 'seed', description: 'Le tour du lac d\'Annecy en trail, passage obligé des coureurs alpins.', created_at: '2025-01-01',
  },
  {
    id: '12', name: 'GRP (Grand Raid du Pilat)', slug: 'grp-2026', distance_km: 84, elevation_m: 4800,
    date: '2026-10-10', location: 'Pelussin', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.4240, longitude: 4.6560,
    source: 'seed', description: 'Tour du Parc Naturel Régional du Pilat, trail exigeant entre Rhône et Loire.', created_at: '2025-01-01',
  },
  {
    id: '13', name: 'Saintélyon', slug: 'sainte-lyon-2026', distance_km: 65, elevation_m: 1600,
    date: '2026-12-06', location: 'Lyon → Saint-Étienne', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 2, registration_url: null, latitude: 45.7640, longitude: 4.8357,
    source: 'seed', description: 'Le trail mythique de nuit entre Lyon et Saint-Étienne, 65km en décembre.', created_at: '2025-01-01',
  },
  {
    id: '14', name: 'Grand Trail des Hauts Forts', slug: 'gthf-2026', distance_km: 52, elevation_m: 3200,
    date: '2026-06-07', location: 'Morzine-Avoriaz', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: null, latitude: 46.1666, longitude: 6.7152,
    source: 'seed', description: 'Un des plus beaux trails des Portes du Soleil avec vue sur le Mont-Blanc.', created_at: '2025-01-01',
  },
  {
    id: '15', name: 'Ultra Marin Golfe du Morbihan', slug: 'ultra-marin-2026', distance_km: 65, elevation_m: 1800,
    date: '2026-04-18', location: 'Vannes', country: 'France', region: 'Bretagne',
    itra_points: 2, registration_url: null, latitude: 47.6559, longitude: -2.7603,
    source: 'seed', description: 'Tour du Golfe du Morbihan en trail, entre mer et côtes sauvages bretonnes.', created_at: '2025-01-01',
  },
  {
    id: '16', name: 'Ecotrail Paris Île-de-France', slug: 'ecotrail-paris-2026', distance_km: 80, elevation_m: 1900,
    date: '2026-03-14', location: 'Paris / Versailles', country: 'France', region: 'Île-de-France',
    itra_points: 2, registration_url: null, latitude: 48.8566, longitude: 2.3522,
    source: 'seed', description: 'Course trail qui relie Paris à Versailles à travers les forêts franciliennes.', created_at: '2025-01-01',
  },
  {
    id: '17', name: 'Trail du Vercors - Bol d\'Air', slug: 'trail-vercors-2026', distance_km: 55, elevation_m: 3300,
    date: '2026-09-12', location: 'Villard-de-Lans', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: null, latitude: 45.0700, longitude: 5.5500,
    source: 'seed', description: 'Trail dans le massif du Vercors, entre falaises calcaires et plateaux sauvages.', created_at: '2025-01-01',
  },
  {
    id: '18', name: 'Trail des Calanques', slug: 'trail-calanques-2026', distance_km: 55, elevation_m: 2500,
    date: '2026-04-12', location: 'Marseille', country: 'France', region: 'PACA',
    itra_points: 3, registration_url: null, latitude: 43.2965, longitude: 5.3698,
    source: 'seed', description: 'Trail côtier au-dessus des calanques entre Marseille et Cassis.', created_at: '2025-01-01',
  },
  {
    id: '19', name: 'Trail Beaufortain', slug: 'trail-beaufortain-2026', distance_km: 65, elevation_m: 4500,
    date: '2026-07-11', location: 'Beaufort', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.7173, longitude: 6.5694,
    source: 'seed', description: 'Trail exigeant dans le massif du Beaufortain, entre lacs et alpages.', created_at: '2025-01-01',
  },
  {
    id: '20', name: 'Grand Tour de Sancy', slug: 'grand-tour-sancy-2026', distance_km: 80, elevation_m: 4800,
    date: '2026-05-09', location: 'Mont-Dore', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.5728, longitude: 2.8139,
    source: 'seed', description: 'Tour du massif du Sancy dans les volcans d\'Auvergne, panoramas exceptionnels.', created_at: '2025-01-01',
  },
  {
    id: '21', name: 'Grand Raid de La Réunion - Diagonale des Fous', slug: 'diagonale-fous-2026', distance_km: 165, elevation_m: 10000,
    date: '2026-10-16', location: 'La Réunion', country: 'France', region: 'Océan Indien',
    itra_points: 6, registration_url: null, latitude: -21.1151, longitude: 55.5364,
    source: 'seed', description: 'La Diagonale des Fous, course mythique à travers l\'île intense de La Réunion.', created_at: '2025-01-01',
  },
  {
    id: '22', name: 'Trail Auvergne Volcans Ultra', slug: 'tavu-2026', distance_km: 65, elevation_m: 3800,
    date: '2026-05-23', location: 'Clermont-Ferrand', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: null, latitude: 45.7772, longitude: 3.0870,
    source: 'seed', description: 'Trail à travers la chaîne des Puys, entre volcans et paysages auvergnats.', created_at: '2025-01-01',
  },
  {
    id: '23', name: 'Raidlight Bréda Trail - Belledonne', slug: 'breda-trail-2026', distance_km: 72, elevation_m: 4500,
    date: '2026-07-04', location: 'Goncelin', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.3490, longitude: 5.9900,
    source: 'seed', description: 'Trail dans le massif de Belledonne, au-dessus de Grenoble.', created_at: '2025-01-01',
  },
  {
    id: '24', name: 'Eco Trail des Lacs Vosgiens', slug: 'eco-trail-vosges-2026', distance_km: 55, elevation_m: 2200,
    date: '2026-05-16', location: 'Gérardmer', country: 'France', region: 'Grand Est',
    itra_points: 2, registration_url: null, latitude: 48.0738, longitude: 6.8776,
    source: 'seed', description: 'Trail autour des lacs vosgiens, entre forêts et sommets du massif.', created_at: '2025-01-01',
  },
  {
    id: '25', name: 'Trail du Ventoux', slug: 'trail-ventoux-2026', distance_km: 46, elevation_m: 3600,
    date: '2026-06-13', location: 'Bédoin', country: 'France', region: 'PACA',
    itra_points: 3, registration_url: null, latitude: 44.1737, longitude: 5.2786,
    source: 'seed', description: 'Ascension du Géant de Provence par les pentes les plus dures du Ventoux.', created_at: '2025-01-01',
  },
  {
    id: '26', name: 'Kilian\'s Classics - Chamonix', slug: 'kilians-classics-2026', distance_km: 50, elevation_m: 3500,
    date: '2026-04-25', location: 'Chamonix-Mont-Blanc', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: null, latitude: 45.9237, longitude: 6.8694,
    source: 'seed', description: 'La course printanière créée par Kilian Jornet pour ouvrir la saison dans les Alpes.', created_at: '2025-01-01',
  },
  {
    id: '27', name: 'SkyRace des Matheysins', slug: 'skyrace-matheysins-2026', distance_km: 38, elevation_m: 3800,
    date: '2026-07-18', location: 'La Mure', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: null, latitude: 44.9028, longitude: 5.7837,
    source: 'seed', description: 'Skyrace alpine au-dessus du lac de Monteynard, vue sur Belledonne et Vercors.', created_at: '2025-01-01',
  },
  {
    id: '28', name: 'Ultra Trail des Chateaux', slug: 'utc-sarlat-2026', distance_km: 100, elevation_m: 3200,
    date: '2026-09-19', location: 'Sarlat', country: 'France', region: 'Nouvelle-Aquitaine',
    itra_points: 3, registration_url: null, latitude: 44.8899, longitude: 1.2175,
    source: 'seed', description: 'Trail à travers les châteaux du Périgord noir, entre Dordogne et Vézère.', created_at: '2025-01-01',
  },
  {
    id: '29', name: 'Grand Trail des Citadelles', slug: 'trail-citadelles-2026', distance_km: 65, elevation_m: 2800,
    date: '2026-10-03', location: 'Carcassonne', country: 'France', region: 'Occitanie',
    itra_points: 3, registration_url: null, latitude: 43.2119, longitude: 2.3500,
    source: 'seed', description: 'Trail entre les citadelles médiévales et les garrigues du Languedoc.', created_at: '2025-01-01',
  },

  // --- Espagne ---
  {
    id: '30', name: 'Transvulcania', slug: 'transvulcania-2026', distance_km: 74, elevation_m: 4750,
    date: '2026-05-09', location: 'La Palma', country: 'Espagne', region: 'Îles Canaries',
    itra_points: 5, registration_url: null, latitude: 28.6835, longitude: -17.8768,
    source: 'seed', description: 'Course volcanique mythique sur l\'île de La Palma, joyau des Canaries.', created_at: '2025-01-01',
  },
  {
    id: '31', name: 'Transgrancanaria', slug: 'transgrancanaria-2026', distance_km: 128, elevation_m: 8500,
    date: '2026-03-07', location: 'Las Palmas de Gran Canaria', country: 'Espagne', region: 'Îles Canaries',
    itra_points: 5, registration_url: null, latitude: 28.1248, longitude: -15.4300,
    source: 'seed', description: 'Traversée complète de Gran Canaria de nord en sud, 128km de paysages volcaniques.', created_at: '2025-01-01',
  },
  {
    id: '32', name: 'Ultra Sierra Nevada', slug: 'ultra-sierra-nevada-2026', distance_km: 107, elevation_m: 6900,
    date: '2026-07-04', location: 'Sierra Nevada', country: 'Espagne', region: 'Andalousie',
    itra_points: 5, registration_url: null, latitude: 37.0902, longitude: -3.3944,
    source: 'seed', description: 'Traversée de la Sierra Nevada au cœur de l\'Espagne méridionale.', created_at: '2025-01-01',
  },
  {
    id: '33', name: 'Buff Epic Trail - Pirineus', slug: 'buff-epic-trail-2026', distance_km: 115, elevation_m: 7000,
    date: '2026-06-20', location: 'Ripoll, Pyrénées catalanes', country: 'Espagne', region: 'Catalogne',
    itra_points: 5, registration_url: null, latitude: 42.2006, longitude: 2.1918,
    source: 'seed', description: 'Traversée des Pyrénées catalanes entre cols et refuges, 115km de haute montagne.', created_at: '2025-01-01',
  },
  {
    id: '34', name: 'Ronda dels Cims', slug: 'ronda-dels-cims-2026', distance_km: 170, elevation_m: 13500,
    date: '2026-07-11', location: 'Andorra la Vella', country: 'Andorre', region: 'Andorre',
    itra_points: 6, registration_url: null, latitude: 42.5063, longitude: 1.5218,
    source: 'seed', description: 'Tour des sommets d\'Andorre, 170km à plus de 2000m d\'altitude en moyenne.', created_at: '2025-01-01',
  },
  {
    id: '35', name: 'Ultra Pirineu', slug: 'ultra-pirineu-2026', distance_km: 108, elevation_m: 6650,
    date: '2026-10-03', location: 'Bagà', country: 'Espagne', region: 'Catalogne',
    itra_points: 5, registration_url: null, latitude: 42.2500, longitude: 1.8671,
    source: 'seed', description: 'Ultra-trail dans les Pyrénées catalanes, une des références du circuit UTMB.', created_at: '2025-01-01',
  },
  {
    id: '36', name: 'Penyagolosa Trails', slug: 'penyagolosa-2026', distance_km: 116, elevation_m: 7400,
    date: '2026-05-02', location: 'Castellón de la Plana', country: 'Espagne', region: 'Communauté valencienne',
    itra_points: 5, registration_url: null, latitude: 40.3500, longitude: -0.2200,
    source: 'seed', description: 'Pèlerinage en trail jusqu\'au sommet de Penyagolosa, 116km de tradition valencienne.', created_at: '2025-01-01',
  },
  {
    id: '37', name: 'Skyrace Comapedrosa', slug: 'skyrace-comapedrosa-2026', distance_km: 22, elevation_m: 2600,
    date: '2026-07-18', location: 'Arinsal, Andorre', country: 'Andorre', region: 'Andorre',
    itra_points: 2, registration_url: null, latitude: 42.5700, longitude: 1.4900,
    source: 'seed', description: 'Skyrace sur le toit d\'Andorre, montée au Comapedrosa (2942m), sommet du pays.', created_at: '2025-01-01',
  },
  {
    id: '38', name: 'Donosti Trail', slug: 'donosti-trail-2026', distance_km: 42, elevation_m: 2800,
    date: '2026-12-05', location: 'San Sebastián', country: 'Espagne', region: 'Pays Basque espagnol',
    itra_points: 2, registration_url: null, latitude: 43.3183, longitude: -1.9812,
    source: 'seed', description: 'Trail urbain et côtier autour de San Sebastián, ambiance festive basque.', created_at: '2025-01-01',
  },
  {
    id: '39', name: 'Ultra Valls d\'Àneu', slug: 'ultra-valls-aneu-2026', distance_km: 80, elevation_m: 6000,
    date: '2026-06-27', location: 'Esterri d\'Àneu', country: 'Espagne', region: 'Catalogne',
    itra_points: 4, registration_url: null, latitude: 42.6200, longitude: 1.1400,
    source: 'seed', description: 'Ultra-trail dans le Pallars Sobirà, Pyrénées sauvages entre lacs glaciaires.', created_at: '2025-01-01',
  },
  {
    id: '40', name: 'Camí de Cavalls 360', slug: 'cami-de-cavalls-2026', distance_km: 185, elevation_m: 4500,
    date: '2026-10-10', location: 'Maó, Minorque', country: 'Espagne', region: 'Baléares',
    itra_points: 5, registration_url: null, latitude: 39.8800, longitude: 4.2650,
    source: 'seed', description: 'Le tour intégral de l\'île de Minorque sur le chemin historique des cavaliers.', created_at: '2025-01-01',
  },

  // --- Italie ---
  {
    id: '41', name: 'Lavaredo Ultra Trail', slug: 'lavaredo-2026', distance_km: 120, elevation_m: 6000,
    date: '2026-06-26', location: 'Cortina d\'Ampezzo', country: 'Italie', region: 'Dolomites',
    itra_points: 5, registration_url: null, latitude: 46.5355, longitude: 12.1357,
    source: 'seed', description: 'Un tour des Trois Cimes de Lavaredo dans les Dolomites italiennes.', created_at: '2025-01-01',
  },
  {
    id: '42', name: 'Tor des Géants', slug: 'tor-des-geants-2026', distance_km: 330, elevation_m: 24000,
    date: '2026-09-06', location: 'Courmayeur', country: 'Italie', region: 'Val d\'Aoste',
    itra_points: 6, registration_url: null, latitude: 45.7965, longitude: 6.9697,
    source: 'seed', description: 'La course de l\'extrême : 330km autour de la Vallée d\'Aoste en non-stop.', created_at: '2025-01-01',
  },
  {
    id: '43', name: 'Monviso Ultra Trail', slug: 'monviso-ultra-2026', distance_km: 110, elevation_m: 6500,
    date: '2026-07-04', location: 'Crissolo', country: 'Italie', region: 'Piémont',
    itra_points: 5, registration_url: null, latitude: 44.6250, longitude: 7.1130,
    source: 'seed', description: 'Tour du Roi de Pierre autour du Monviso (3841m), entre Italie et France.', created_at: '2025-01-01',
  },
  {
    id: '44', name: 'Ultra Trail Lago Maggiore', slug: 'utlm-2026', distance_km: 75, elevation_m: 4000,
    date: '2026-05-16', location: 'Verbania', country: 'Italie', region: 'Piémont',
    itra_points: 3, registration_url: null, latitude: 45.9232, longitude: 8.5520,
    source: 'seed', description: 'Trail autour du Lac Majeur entre les rives italiennes et suisses.', created_at: '2025-01-01',
  },
  {
    id: '45', name: 'Livigno EcoTrail', slug: 'livigno-eco-2026', distance_km: 75, elevation_m: 3900,
    date: '2026-09-05', location: 'Livigno', country: 'Italie', region: 'Lombardie',
    itra_points: 4, registration_url: null, latitude: 46.5384, longitude: 10.1402,
    source: 'seed', description: 'Trail éco-responsable dans la station de Livigno, à la frontière suisse.', created_at: '2025-01-01',
  },
  {
    id: '46', name: 'Dolomiti Extreme Trail', slug: 'dolomiti-extreme-2026', distance_km: 65, elevation_m: 4200,
    date: '2026-07-11', location: 'Belluno', country: 'Italie', region: 'Dolomites',
    itra_points: 3, registration_url: null, latitude: 46.1393, longitude: 12.2183,
    source: 'seed', description: 'Trail technique dans les Dolomites autour de Belluno, entre via ferrata et forêts.', created_at: '2025-01-01',
  },
  {
    id: '47', name: 'Ultra Trail Adamello', slug: 'ultra-adamello-2026', distance_km: 100, elevation_m: 7000,
    date: '2026-06-06', location: 'Ponte di Legno', country: 'Italie', region: 'Lombardie',
    itra_points: 5, registration_url: null, latitude: 46.2573, longitude: 10.5076,
    source: 'seed', description: 'Tour du massif glaciaire de l\'Adamello, entre Lombardie et Trentin.', created_at: '2025-01-01',
  },
  {
    id: '48', name: 'Ultrabericus Trail', slug: 'ultrabericus-2026', distance_km: 100, elevation_m: 3800,
    date: '2026-10-17', location: 'Vicenza', country: 'Italie', region: 'Vénétie',
    itra_points: 4, registration_url: null, latitude: 45.5455, longitude: 11.5354,
    source: 'seed', description: 'Trail à travers les collines des Berici et de l\'Euganéen, Vénétie intérieure.', created_at: '2025-01-01',
  },
  {
    id: '49', name: 'Trofeo Kima', slug: 'kima-2026', distance_km: 52, elevation_m: 5200,
    date: '2026-08-29', location: 'Val Masino', country: 'Italie', region: 'Lombardie',
    itra_points: 4, registration_url: null, latitude: 46.3000, longitude: 9.6000,
    source: 'seed', description: 'Skyrace mythique dans le Val Masino, course de référence mondiale du skyrunning.', created_at: '2025-01-01',
  },
  {
    id: '50', name: 'Sky Ultra Val Venosta', slug: 'sky-ultra-val-venosta-2026', distance_km: 50, elevation_m: 4000,
    date: '2026-06-13', location: 'Silandro / Schlanders', country: 'Italie', region: 'Haut-Adige',
    itra_points: 4, registration_url: null, latitude: 46.6300, longitude: 10.7700,
    source: 'seed', description: 'Skyrace dans le Val Venosta (Vinschgau), entre vignes et glaciers du Tyrol.', created_at: '2025-01-01',
  },

  // --- Suisse ---
  {
    id: '51', name: 'Swiss Peaks 360', slug: 'swiss-peaks-2026', distance_km: 360, elevation_m: 26000,
    date: '2026-08-13', location: 'Champéry', country: 'Suisse', region: 'Valais',
    itra_points: 6, registration_url: null, latitude: 46.1762, longitude: 6.8700,
    source: 'seed', description: 'Tour des Alpes suisses à travers les plus beaux paysages du Valais.', created_at: '2025-01-01',
  },
  {
    id: '52', name: 'Sierre-Zinal', slug: 'sierre-zinal-2026', distance_km: 31, elevation_m: 2200,
    date: '2026-08-08', location: 'Sierre → Zinal', country: 'Suisse', region: 'Valais',
    itra_points: 3, registration_url: null, latitude: 46.2918, longitude: 7.5351,
    source: 'seed', description: 'Course de montagne iconique en Valais, face aux géants des Alpes suisses.', created_at: '2025-01-01',
  },
  {
    id: '53', name: 'Eiger Ultra Trail', slug: 'eiger-ultra-2026', distance_km: 101, elevation_m: 6900,
    date: '2026-07-10', location: 'Grindelwald', country: 'Suisse', region: 'Oberland bernois',
    itra_points: 5, registration_url: null, latitude: 46.6248, longitude: 8.0440,
    source: 'seed', description: 'Ultra-trail au pied de la face nord de l\'Eiger, Mönch et Jungfrau.', created_at: '2025-01-01',
  },
  {
    id: '54', name: 'Glacier 3000 Run', slug: 'glacier-3000-2026', distance_km: 11, elevation_m: 1855,
    date: '2026-09-19', location: 'Les Diablerets', country: 'Suisse', region: 'Vaud',
    itra_points: 1, registration_url: null, latitude: 46.3549, longitude: 7.1987,
    source: 'seed', description: 'Course verticale express jusqu\'au glacier des Diablerets, sommet à 3000m.', created_at: '2025-01-01',
  },
  {
    id: '55', name: 'Verbier St-Bernard Ultra', slug: 'verbier-st-bernard-2026', distance_km: 111, elevation_m: 8000,
    date: '2026-06-27', location: 'Verbier', country: 'Suisse', region: 'Valais',
    itra_points: 5, registration_url: null, latitude: 46.0962, longitude: 7.2290,
    source: 'seed', description: 'Ultra-trail entre Verbier et le Grand-Saint-Bernard, entre 4 vallées alpines.', created_at: '2025-01-01',
  },
  {
    id: '56', name: 'Jungfrau Marathon', slug: 'jungfrau-marathon-2026', distance_km: 42, elevation_m: 1829,
    date: '2026-09-12', location: 'Interlaken', country: 'Suisse', region: 'Oberland bernois',
    itra_points: 2, registration_url: null, latitude: 46.6864, longitude: 7.8632,
    source: 'seed', description: 'Marathon classique qui monte jusqu\'à la Kleine Scheidegg face à l\'Eiger.', created_at: '2025-01-01',
  },
  {
    id: '57', name: 'Davos Trail Ultra', slug: 'davos-trail-ultra-2026', distance_km: 83, elevation_m: 5200,
    date: '2026-07-18', location: 'Davos', country: 'Suisse', region: 'Grisons',
    itra_points: 4, registration_url: null, latitude: 46.8027, longitude: 9.8370,
    source: 'seed', description: 'Ultra-trail autour de Davos dans les Grisons, entre forêts et alpages suisses.', created_at: '2025-01-01',
  },

  // --- Autriche ---
  {
    id: '58', name: 'Innsbruck Alpine Trailrun', slug: 'iat-2026', distance_km: 65, elevation_m: 4800,
    date: '2026-06-20', location: 'Innsbruck', country: 'Autriche', region: 'Tyrol',
    itra_points: 4, registration_url: null, latitude: 47.2692, longitude: 11.4041,
    source: 'seed', description: 'Trail alpin autour d\'Innsbruck avec vue sur les Alpes tyroliennes.', created_at: '2025-01-01',
  },
  {
    id: '59', name: 'Stubai Ultratrail', slug: 'stubai-ultra-2026', distance_km: 100, elevation_m: 5500,
    date: '2026-08-22', location: 'Neustift im Stubaital', country: 'Autriche', region: 'Tyrol',
    itra_points: 5, registration_url: null, latitude: 47.1151, longitude: 11.3218,
    source: 'seed', description: 'Ultra-trail dans la vallée du Stubai, avec le glacier en toile de fond.', created_at: '2025-01-01',
  },
  {
    id: '60', name: 'Salzkammergut Trophy', slug: 'salzkammergut-2026', distance_km: 210, elevation_m: 11000,
    date: '2026-06-13', location: 'Bad Goisern', country: 'Autriche', region: 'Haute-Autriche',
    itra_points: 6, registration_url: null, latitude: 47.6449, longitude: 13.6282,
    source: 'seed', description: 'Raid nature non-stop à travers la région des lacs du Salzkammergut.', created_at: '2025-01-01',
  },
  {
    id: '61', name: 'Karwendel Marsch', slug: 'karwendel-marsch-2026', distance_km: 52, elevation_m: 2300,
    date: '2026-08-08', location: 'Scharnitz', country: 'Autriche', region: 'Tyrol',
    itra_points: 2, registration_url: null, latitude: 47.3884, longitude: 11.2664,
    source: 'seed', description: 'Marche-trail nocturne à travers les gorges du Karwendel, Tyrol autrichien.', created_at: '2025-01-01',
  },

  // --- Allemagne ---
  {
    id: '62', name: 'Zugspitz Ultratrail', slug: 'zugspitz-ultra-2026', distance_km: 100, elevation_m: 6000,
    date: '2026-07-02', location: 'Garmisch-Partenkirchen', country: 'Allemagne', region: 'Bavière',
    itra_points: 5, registration_url: null, latitude: 47.4931, longitude: 11.0957,
    source: 'seed', description: 'Ultra-trail autour du Zugspitze, point culminant d\'Allemagne (2962m).', created_at: '2025-01-01',
  },
  {
    id: '63', name: 'Rennsteig Supertrail', slug: 'rennsteig-supertrail-2026', distance_km: 100, elevation_m: 2600,
    date: '2026-06-05', location: 'Brotterode', country: 'Allemagne', region: 'Thuringe',
    itra_points: 3, registration_url: null, latitude: 50.7900, longitude: 10.3700,
    source: 'seed', description: 'Ultra-trail sur la ligne de crête historique du Rennsteig en Thuringe.', created_at: '2025-01-01',
  },
  {
    id: '64', name: 'Schwarzwald Ultratrail', slug: 'schwarzwald-ultra-2026', distance_km: 87, elevation_m: 4500,
    date: '2026-07-25', location: 'Titisee-Neustadt', country: 'Allemagne', region: 'Bade-Wurtemberg',
    itra_points: 4, registration_url: null, latitude: 47.9066, longitude: 8.1564,
    source: 'seed', description: 'Ultra-trail à travers la Forêt-Noire, entre sapins géants et lacs glaciaires.', created_at: '2025-01-01',
  },

  // --- Royaume-Uni ---
  {
    id: '65', name: 'Dragons Back Race', slug: 'dragons-back-2026', distance_km: 380, elevation_m: 17000,
    date: '2026-06-07', location: 'Conwy, Pays de Galles', country: 'Royaume-Uni', region: 'Pays de Galles',
    itra_points: 6, registration_url: null, latitude: 53.2831, longitude: -3.8328,
    source: 'seed', description: 'Traversée intégrale du Pays de Galles sur 5 jours, l\'ultra le plus difficile de Grande-Bretagne.', created_at: '2025-01-01',
  },
  {
    id: '66', name: 'Highland Fling', slug: 'highland-fling-2026', distance_km: 85, elevation_m: 3350,
    date: '2026-04-25', location: 'Milngavie, Écosse', country: 'Royaume-Uni', region: 'Écosse',
    itra_points: 3, registration_url: null, latitude: 55.9419, longitude: -4.3138,
    source: 'seed', description: 'Trail légendaire sur la West Highland Way, 53 miles à travers les Highlands.', created_at: '2025-01-01',
  },
  {
    id: '67', name: 'West Highland Way Race', slug: 'whw-race-2026', distance_km: 153, elevation_m: 4800,
    date: '2026-06-20', location: 'Milngavie → Fort William', country: 'Royaume-Uni', region: 'Écosse',
    itra_points: 5, registration_url: null, latitude: 56.8190, longitude: -5.1050,
    source: 'seed', description: 'Le trail historique d\'Écosse, 95 miles du sud de Glasgow jusqu\'à Ben Nevis.', created_at: '2025-01-01',
  },
  {
    id: '68', name: 'Lakeland 100', slug: 'lakeland-100-2026', distance_km: 169, elevation_m: 6400,
    date: '2026-07-30', location: 'Coniston, Cumbria', country: 'Royaume-Uni', region: 'Angleterre',
    itra_points: 5, registration_url: null, latitude: 54.3689, longitude: -3.0704,
    source: 'seed', description: 'Tour du Lake District en non-stop, 100 miles dans l\'un des plus beaux parcs d\'Angleterre.', created_at: '2025-01-01',
  },
  {
    id: '69', name: 'Montane Spine Race', slug: 'spine-race-2026', distance_km: 430, elevation_m: 13000,
    date: '2026-01-10', location: 'Edale → Kirk Yetholm', country: 'Royaume-Uni', region: 'Angleterre/Écosse',
    itra_points: 6, registration_url: null, latitude: 53.3666, longitude: -1.8085,
    source: 'seed', description: 'La course la plus dure de Grande-Bretagne : 268 miles sur le Pennine Way en hiver.', created_at: '2025-01-01',
  },
  {
    id: '70', name: 'Lakeland 50', slug: 'lakeland-50-2026', distance_km: 83, elevation_m: 3500,
    date: '2026-07-31', location: 'Coniston, Cumbria', country: 'Royaume-Uni', region: 'Angleterre',
    itra_points: 3, registration_url: null, latitude: 54.3689, longitude: -3.0704,
    source: 'seed', description: 'La version accessible du Lakeland 100, 50 miles autour des lacs cumbrians.', created_at: '2025-01-01',
  },
  {
    id: '71', name: 'South Downs Way 100', slug: 'sdw100-2026', distance_km: 161, elevation_m: 3200,
    date: '2026-06-12', location: 'Winchester', country: 'Royaume-Uni', region: 'Angleterre',
    itra_points: 4, registration_url: null, latitude: 51.0632, longitude: -1.3082,
    source: 'seed', description: 'Trail emblématique sur la crête des South Downs, de Winchester à Eastbourne.', created_at: '2025-01-01',
  },

  // --- Portugal ---
  {
    id: '72', name: 'Madeira Island Ultra Trail (MIUT)', slug: 'miut-2026', distance_km: 115, elevation_m: 7000,
    date: '2026-04-18', location: 'Funchal, Madère', country: 'Portugal', region: 'Madère',
    itra_points: 5, registration_url: null, latitude: 32.6669, longitude: -16.9241,
    source: 'seed', description: 'Tour de l\'île de Madère, entre laurisylve et côtes atlantiques.', created_at: '2025-01-01',
  },
  {
    id: '73', name: 'Ultra Trail do Douro', slug: 'ultra-douro-2026', distance_km: 100, elevation_m: 4000,
    date: '2026-08-22', location: 'Pinhão, Vila Real', country: 'Portugal', region: 'Norte',
    itra_points: 4, registration_url: null, latitude: 41.1900, longitude: -7.5400,
    source: 'seed', description: 'Trail à travers les terrasses viticoles de la vallée du Douro, vignes en terrasse.', created_at: '2025-01-01',
  },
  {
    id: '74', name: 'Ultra Trail Serra da Estrela', slug: 'ultra-estrela-2026', distance_km: 85, elevation_m: 5500,
    date: '2026-09-05', location: 'Covilhã', country: 'Portugal', region: 'Centro',
    itra_points: 4, registration_url: null, latitude: 40.2803, longitude: -7.5040,
    source: 'seed', description: 'Trail sur le toit du Portugal continental, la Serra da Estrela et ses hauts plateaux.', created_at: '2025-01-01',
  },

  // --- Pays nordiques ---
  {
    id: '75', name: 'Arctic Trail Tromsø', slug: 'arctic-trail-2026', distance_km: 100, elevation_m: 3500,
    date: '2026-07-10', location: 'Tromsø', country: 'Norvège', region: 'Troms',
    itra_points: 4, registration_url: null, latitude: 69.6489, longitude: 18.9551,
    source: 'seed', description: 'Trail au-delà du cercle arctique à Tromsø, sous le soleil de minuit en juillet.', created_at: '2025-01-01',
  },
  {
    id: '76', name: 'Lofoten Ultra Trail', slug: 'lofoten-ultra-2026', distance_km: 50, elevation_m: 1800,
    date: '2026-08-01', location: 'Svolvær, Lofoten', country: 'Norvège', region: 'Nordland',
    itra_points: 2, registration_url: null, latitude: 68.2346, longitude: 14.5680,
    source: 'seed', description: 'Trail sur les îles des Lofoten, entre fjords, mer et pics spectaculaires.', created_at: '2025-01-01',
  },
  {
    id: '77', name: 'Åre Extreme Challenge', slug: 'are-extreme-2026', distance_km: 50, elevation_m: 2100,
    date: '2026-09-05', location: 'Åre', country: 'Suède', region: 'Jämtland',
    itra_points: 2, registration_url: null, latitude: 63.3983, longitude: 13.0813,
    source: 'seed', description: 'Trail estival dans la station de ski d\'Åre, cœur de la montagne suédoise.', created_at: '2025-01-01',
  },

  // --- Belgique ---
  {
    id: '78', name: 'Ultra-Trail des Ardennes', slug: 'uta-2026', distance_km: 68, elevation_m: 2200,
    date: '2026-05-02', location: 'Bastogne', country: 'Belgique', region: 'Wallonie',
    itra_points: 2, registration_url: null, latitude: 50.0032, longitude: 5.7163,
    source: 'seed', description: 'Trail dans les Ardennes belges autour de Bastogne, forêts et bocage ardennais.', created_at: '2025-01-01',
  },

  // --- Europe de l'Est ---
  {
    id: '79', name: 'Transylvania 100', slug: 'transylvania-100-2026', distance_km: 100, elevation_m: 5000,
    date: '2026-06-20', location: 'Brașov', country: 'Roumanie', region: 'Transylvanie',
    itra_points: 4, registration_url: null, latitude: 45.6527, longitude: 25.6110,
    source: 'seed', description: 'Ultra-trail à travers les forêts et crêtes des Carpates transylvaines.', created_at: '2025-01-01',
  },
  {
    id: '80', name: 'Ultramaraton Karkonoski', slug: 'ultra-karkonosze-2026', distance_km: 80, elevation_m: 3400,
    date: '2026-06-12', location: 'Szklarska Poręba', country: 'Pologne', region: 'Basse-Silésie',
    itra_points: 3, registration_url: null, latitude: 50.8282, longitude: 15.5237,
    source: 'seed', description: 'Trail dans les monts des Géants (Karkonosze), à la frontière tchèque.', created_at: '2025-01-01',
  },
  {
    id: '81', name: 'Tatry Ultra Trail', slug: 'tatry-ultra-2026', distance_km: 100, elevation_m: 7000,
    date: '2026-08-15', location: 'Zakopane', country: 'Pologne', region: 'Malopolska',
    itra_points: 5, registration_url: null, latitude: 49.2992, longitude: 19.9496,
    source: 'seed', description: 'Ultra-trail dans les Hautes Tatras, le toit de la Pologne et de la Slovaquie.', created_at: '2025-01-01',
  },
  {
    id: '82', name: 'Olympus Marathon', slug: 'olympus-marathon-2026', distance_km: 44, elevation_m: 4520,
    date: '2026-06-20', location: 'Litohoro', country: 'Grèce', region: 'Macédoine centrale',
    itra_points: 3, registration_url: null, latitude: 40.1041, longitude: 22.4932,
    source: 'seed', description: 'Course mythique sur le mont Olympe, depuis la mer jusqu\'aux sommets des dieux.', created_at: '2025-01-01',
  },

  // --- Afrique & Outremer ---
  {
    id: '83', name: 'Ultra Trail Cape Town', slug: 'utct-2026', distance_km: 100, elevation_m: 6000,
    date: '2026-11-14', location: 'Cape Town', country: 'Afrique du Sud', region: 'Western Cape',
    itra_points: 5, registration_url: null, latitude: -33.9249, longitude: 18.4241,
    source: 'seed', description: 'Trail sur la péninsule du Cap, entre océan et montagne emblématique.', created_at: '2025-01-01',
  },
  {
    id: '84', name: 'Hardrock 100', slug: 'hardrock-100-2026', distance_km: 160, elevation_m: 10000,
    date: '2026-07-17', location: 'Silverton, Colorado', country: 'États-Unis', region: 'Colorado',
    itra_points: 6, registration_url: null, latitude: 37.8125, longitude: -107.6621,
    source: 'seed', description: 'Une des ultras les plus dures du monde dans les San Juan Mountains.', created_at: '2025-01-01',
  },

  // --- Autres courses emblématiques de France ---
  {
    id: '85', name: 'Trail de l\'Oisans - Écrins', slug: 'trail-oisans-2026', distance_km: 55, elevation_m: 4100,
    date: '2026-06-20', location: 'Bourg-d\'Oisans', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: null, latitude: 45.0560, longitude: 6.0330,
    source: 'seed', description: 'Trail dans le massif des Écrins au départ de Bourg-d\'Oisans, vue sur la Meije.', created_at: '2025-01-01',
  },
  {
    id: '86', name: 'Grand Trail des Alpes - Résidence', slug: 'gta-2026', distance_km: 125, elevation_m: 8000,
    date: '2026-08-01', location: 'Briançon', country: 'France', region: 'PACA',
    itra_points: 5, registration_url: null, latitude: 44.8952, longitude: 6.6381,
    source: 'seed', description: 'Ultra-trail depuis Briançon à travers les hautes vallées des Alpes du Sud.', created_at: '2025-01-01',
  },
  {
    id: '87', name: 'Trail du Mont Saint-Michel', slug: 'trail-mont-saint-michel-2026', distance_km: 80, elevation_m: 600,
    date: '2026-05-16', location: 'Mont Saint-Michel', country: 'France', region: 'Normandie',
    itra_points: 2, registration_url: null, latitude: 48.6360, longitude: -1.5113,
    source: 'seed', description: 'Trail côtier à travers la baie du Mont Saint-Michel, entre tangues et bocage.', created_at: '2025-01-01',
  },
  {
    id: '88', name: 'Trail Blanc - Alpe d\'Huez', slug: 'trail-blanc-alpe-huez-2026', distance_km: 53, elevation_m: 2800,
    date: '2026-03-21', location: 'Alpe d\'Huez', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 3, registration_url: null, latitude: 45.0906, longitude: 6.0694,
    source: 'seed', description: 'Trail hivernal sur neige depuis Alpe d\'Huez, entre glacier et forêts.', created_at: '2025-01-01',
  },
  {
    id: '89', name: 'Grand Trail de Chartreuse', slug: 'gtc-2026', distance_km: 75, elevation_m: 5600,
    date: '2026-09-19', location: 'Saint-Pierre-de-Chartreuse', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.3373, longitude: 5.8216,
    source: 'seed', description: 'Tour du massif de Chartreuse entre falaises calcaires et forêts de sapins.', created_at: '2025-01-01',
  },
  {
    id: '90', name: 'Ultra Trail des Vaches - Savoie', slug: 'utv-2026', distance_km: 70, elevation_m: 4800,
    date: '2026-07-25', location: 'La Clusaz', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 4, registration_url: null, latitude: 45.9030, longitude: 6.4272,
    source: 'seed', description: 'Trail dans le massif des Aravis, entre alpages, cols et vues sur le Mont-Blanc.', created_at: '2025-01-01',
  },
  {
    id: '91', name: 'Oxy\'Trail Paris', slug: 'oxy-trail-paris-2026', distance_km: 45, elevation_m: 700,
    date: '2026-03-28', location: 'Cergy-Pontoise', country: 'France', region: 'Île-de-France',
    itra_points: 1, registration_url: null, latitude: 49.0337, longitude: 2.0737,
    source: 'seed', description: 'Trail en Île-de-France dans les boucles de l\'Oise, idéal pour les Parisiens.', created_at: '2025-01-01',
  },
  {
    id: '92', name: 'Grand Raid des Pyrénées', slug: 'grp-pyrenees-2026', distance_km: 160, elevation_m: 11000,
    date: '2026-08-22', location: 'Cauterets', country: 'France', region: 'Occitanie',
    itra_points: 6, registration_url: null, latitude: 42.8930, longitude: -0.1058,
    source: 'seed', description: 'La traversée mythique des Pyrénées françaises, 160km entre Cauterets et Bagnères-de-Luchon.', created_at: '2025-01-01',
  },
  {
    id: '93', name: 'Trail des Gorges de l\'Ardèche', slug: 'trail-ardeche-2026', distance_km: 60, elevation_m: 3200,
    date: '2026-04-04', location: 'Vallon-Pont-d\'Arc', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 2, registration_url: null, latitude: 44.4051, longitude: 4.3949,
    source: 'seed', description: 'Trail dans les gorges de l\'Ardèche, entre calcaires et rivière émeraude.', created_at: '2025-01-01',
  },
  {
    id: '94', name: 'Trail du Lac d\'Allos', slug: 'trail-lac-allos-2026', distance_km: 48, elevation_m: 3800,
    date: '2026-08-08', location: 'Allos', country: 'France', region: 'PACA',
    itra_points: 3, registration_url: null, latitude: 44.2668, longitude: 6.5420,
    source: 'seed', description: 'Trail autour du plus grand lac naturel d\'Europe, dans le Mercantour.', created_at: '2025-01-01',
  },
  {
    id: '95', name: 'Alsace Ultra Trail', slug: 'alsace-ultra-trail-2026', distance_km: 100, elevation_m: 4500,
    date: '2026-10-17', location: 'Ribeauvillé', country: 'France', region: 'Grand Est',
    itra_points: 4, registration_url: null, latitude: 48.1944, longitude: 7.3191,
    source: 'seed', description: 'Ultra-trail sur la Route des Vins d\'Alsace, entre châteaux, vignes et forêts vosgiennes.', created_at: '2025-01-01',
  },
  {
    id: '96', name: 'Raid des Templiers 155km', slug: 'templiers-155-2026', distance_km: 155, elevation_m: 9000,
    date: '2026-10-23', location: 'Millau', country: 'France', region: 'Occitanie',
    itra_points: 6, registration_url: null, latitude: 44.0995, longitude: 3.0769,
    source: 'seed', description: 'L\'ultra des Templiers, la version longue avec traversée complète du Larzac.', created_at: '2025-01-01',
  },
  {
    id: '97', name: 'Corsica Alta Via 2 Trail', slug: 'corsica-ava-trail-2026', distance_km: 120, elevation_m: 9500,
    date: '2026-09-05', location: 'Vizzavona, Corse', country: 'France', region: 'Corse',
    itra_points: 5, registration_url: null, latitude: 42.1171, longitude: 9.1255,
    source: 'seed', description: 'Trail sur la haute route corse à travers le maquis et les sommets de l\'Île de Beauté.', created_at: '2025-01-01',
  },
  {
    id: '98', name: 'Le Traïl du Graou', slug: 'trail-graou-2026', distance_km: 80, elevation_m: 4000,
    date: '2026-06-06', location: 'Béziers', country: 'France', region: 'Occitanie',
    itra_points: 3, registration_url: null, latitude: 43.3441, longitude: 3.2153,
    source: 'seed', description: 'Trail dans les garrigues héraultaises et les vignes du Languedoc.', created_at: '2025-01-01',
  },
  {
    id: '99', name: 'Marathon du Mont-Blanc', slug: 'marathon-mont-blanc-2026', distance_km: 42, elevation_m: 2700,
    date: '2026-06-27', location: 'Chamonix-Mont-Blanc', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 2, registration_url: 'https://montblancmarathon.net', latitude: 45.9237, longitude: 6.8694,
    source: 'seed', description: 'Le marathon classique de Chamonix avec vue sur le Mont-Blanc, 2700m de dénivelé.', created_at: '2025-01-01',
  },
  {
    id: '100', name: 'Trail des Monts d\'Arée', slug: 'trail-monts-aree-2026', distance_km: 55, elevation_m: 1800,
    date: '2026-05-30', location: 'Brasparts', country: 'France', region: 'Bretagne',
    itra_points: 2, registration_url: null, latitude: 48.3400, longitude: -3.8800,
    source: 'seed', description: 'Trail sur les hauteurs du Finistère intérieur, entre landes sauvages et tourbières.', created_at: '2025-01-01',
  },

  // --- Pays-Bas et Luxembourg ---
  {
    id: '101', name: 'Trailwalker Oxfam Belgique', slug: 'trailwalker-oxfam-2026', distance_km: 100, elevation_m: 3500,
    date: '2026-05-29', location: 'Namur', country: 'Belgique', region: 'Wallonie',
    itra_points: 2, registration_url: null, latitude: 50.4667, longitude: 4.8667,
    source: 'seed', description: 'Trail solidaire en équipe de 4, 100km à travers la Wallonie pour Oxfam.', created_at: '2025-01-01',
  },

  // --- Courses supplémentaires France ---
  {
    id: '102', name: 'Trail des Alpilles', slug: 'trail-alpilles-2026', distance_km: 50, elevation_m: 2800,
    date: '2026-03-07', location: 'Les Baux-de-Provence', country: 'France', region: 'PACA',
    itra_points: 2, registration_url: null, latitude: 43.7446, longitude: 4.7930,
    source: 'seed', description: 'Trail dans les Alpilles et en Camargue, entre Provence blanche et plaines sauvages.', created_at: '2025-01-01',
  },
  {
    id: '103', name: 'Trail du Beaufortain Ultra', slug: 'beaufortain-ultra-2026', distance_km: 110, elevation_m: 7500,
    date: '2026-07-11', location: 'Beaufort', country: 'France', region: 'Auvergne-Rhône-Alpes',
    itra_points: 5, registration_url: null, latitude: 45.7173, longitude: 6.5694,
    source: 'seed', description: 'La version ultra du trail du Beaufortain, tour complet du massif avec ses lacs alpins.', created_at: '2025-01-01',
  },
  {
    id: '104', name: 'Courmayeur-Mont-Blanc Skyrace', slug: 'sky-courmayeur-2026', distance_km: 23, elevation_m: 2700,
    date: '2026-06-27', location: 'Courmayeur', country: 'Italie', region: 'Val d\'Aoste',
    itra_points: 2, registration_url: null, latitude: 45.7965, longitude: 6.9697,
    source: 'seed', description: 'Skyrace mythique depuis Courmayeur avec ascension vers le Mont-Blanc.', created_at: '2025-01-01',
  },
  {
    id: '105', name: 'Zugspitz Extreme (ZEP)', slug: 'zep-2026', distance_km: 45, elevation_m: 4200,
    date: '2026-07-04', location: 'Ehrwald, Autriche', country: 'Autriche', region: 'Tyrol',
    itra_points: 3, registration_url: null, latitude: 47.3983, longitude: 10.9164,
    source: 'seed', description: 'Skyrace extrême autour de la Zugspitze côté autrichien, terrain alpin technique.', created_at: '2025-01-01',
  },
  {
    id: '106', name: 'Gran Canaria Skyrunning', slug: 'gc-skyrunning-2026', distance_km: 35, elevation_m: 3500,
    date: '2026-03-14', location: 'Gran Canaria', country: 'Espagne', region: 'Îles Canaries',
    itra_points: 3, registration_url: null, latitude: 27.9202, longitude: -15.5469,
    source: 'seed', description: 'Skyrace verticale sur les sommets volcaniques de Gran Canaria.', created_at: '2025-01-01',
  },
  {
    id: '107', name: 'Garrotxa Ultratrail', slug: 'garrotxa-ultra-2026', distance_km: 75, elevation_m: 4500,
    date: '2026-11-07', location: 'Olot', country: 'Espagne', region: 'Catalogne',
    itra_points: 4, registration_url: null, latitude: 42.1790, longitude: 2.4900,
    source: 'seed', description: 'Trail dans la région volcanique de la Garrotxa, forêts et cônes volcaniques.', created_at: '2025-01-01',
  },
  {
    id: '108', name: 'Cinque Terre Ultra Trail', slug: 'cinque-terre-ultra-2026', distance_km: 50, elevation_m: 3500,
    date: '2026-04-18', location: 'Riomaggiore', country: 'Italie', region: 'Ligurie',
    itra_points: 3, registration_url: null, latitude: 44.1007, longitude: 9.7369,
    source: 'seed', description: 'Trail côtier entre les cinq villages des Cinque Terre et les sentiers de Ligurie.', created_at: '2025-01-01',
  },
  {
    id: '109', name: 'Trail de Compostelle', slug: 'trail-compostelle-2026', distance_km: 80, elevation_m: 2200,
    date: '2026-09-12', location: 'Saint-Jean-Pied-de-Port', country: 'France', region: 'Nouvelle-Aquitaine',
    itra_points: 2, registration_url: null, latitude: 43.1634, longitude: -1.2372,
    source: 'seed', description: 'Trail sur les chemins du pèlerinage de Compostelle dans les Pyrénées basques.', created_at: '2025-01-01',
  },
  {
    id: '110', name: 'Aosta Valley Ultra Trail', slug: 'avut-2026', distance_km: 65, elevation_m: 4500,
    date: '2026-06-13', location: 'Courmayeur', country: 'Italie', region: 'Val d\'Aoste',
    itra_points: 4, registration_url: null, latitude: 45.7965, longitude: 6.9697,
    source: 'seed', description: 'Trail dans la Vallée d\'Aoste entre refuges et glaciers du massif du Mont-Blanc.', created_at: '2025-01-01',
  },
]
