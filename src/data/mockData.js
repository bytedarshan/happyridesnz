import nzLandscape from '../assets/nz_landscape.png';
import aucklandCity from '../assets/auckland_city.png';
import rotoruaGeothermal from '../assets/rotorua_geothermal.png';
import tour1 from '../assets/tour1.jpeg';
import tour2 from '../assets/tour2.jpeg';
import tour3 from '../assets/tour3.jpeg';
import tour4 from '../assets/tour4.jpeg';
import tour5 from '../assets/tour5.jpeg';
import tour6 from '../assets/tour6.jpeg';
import tour7 from '../assets/tour7.jpeg';
import img20 from '../assets/image20.jpeg';
import img37 from '../assets/image37.jpeg';
import img38 from '../assets/image38.jpeg';
import img39 from '../assets/image39.jpeg';
import img42 from '../assets/image42.jpeg';
import img49 from '../assets/image49.jpeg';
import img51 from '../assets/image51.jpeg';
import img64 from '../assets/image64.jpeg';
import img81 from '../assets/image81.jpeg';

export const aucklandCityTours = [
  {
    id: 'act-hb',
    title: 'Harbour Bridge',
    image: tour1,
    duration: 'Crossing duration',
    price: 'Included in City Tour',
    description: 'The Auckland Harbour Bridge is one of the city\'s most recognizable landmarks. Spanning the Waitematā Harbour, it connects the Auckland CBD to the North Shore.\n\nAs the longest road bridge in the North Island, it offers unparalleled views of the "City of Sails."'
  },
  {
    id: 'act-wm',
    title: 'Westhaven Marina',
    image: tour2,
    duration: 'Scenic Walk',
    price: 'Free Access',
    description: 'Westhaven Marina is the largest yacht marina in the Southern Hemisphere. It is home to nearly 2,000 boats and serves as the hub for Auckland\'s passionate sailing community.'
  },
  {
    id: 'act-td',
    title: 'Tamaki Drive',
    image: tour3,
    duration: 'Scenic Drive',
    price: 'Included in City Tour',
    description: 'Tamaki Drive winds its way along the waterfront from the city center to the eastern bays. It follows the natural curves of the Waitematā Harbour.'
  },
  {
    id: 'act-mjs',
    title: 'MJ Savage Memorial',
    image: tour4,
    duration: '30-45 Mins',
    price: 'Free Access',
    description: 'The Michael Joseph Savage Memorial Park is located at Bastion Point. It was built to honor New Zealand’s first Labour Prime Minister.'
  },
  {
    id: 'act-mb',
    title: 'Mission Bay',
    image: tour5,
    duration: '1-2 Hours',
    price: 'Free Access',
    description: 'Mission Bay is Auckland\'s most popular urban beach. Located just a short drive from the CBD, it is a vibrant seaside suburb.'
  },
  {
    id: 'act-ad',
    title: 'Auckland Domain',
    image: tour6,
    duration: '1-2 Hours',
    price: 'Free Access',
    description: 'The Auckland Domain is a 75-hectare park developed on the site of the ancient Pukekawa volcano. It is the city\'s oldest and most central park.'
  },
  {
    id: 'act-meh',
    title: 'Mount Eden Hill',
    image: tour7,
    duration: '1 Hour',
    price: 'Free Access',
    description: 'Mount Eden (Maungawhau) is the highest natural point in Auckland. It is a dormant volcano with a deep, grass-covered crater.'
  }
];

export const aucklandActivities = [
  { id: 'aa-st', title: 'Sky Tower', image: img37, duration: '1 to 2 hours', price: '$47', description: 'Standing at 328 meters tall, the Sky Tower has been an icon of Auckland\'s skyline for over 25 years.' },
  { id: 'aa-hg', title: 'Hauraki Gulf', image: img38, duration: '4.5 hours', price: '$99', description: 'Guided catamaran tours within the marine park to observe resident and migratory marine mammals.' },
  { id: 'aa-az', title: 'Auckland Zoo', image: img39, duration: '3 to 4 hours', price: '$29 - $35', description: 'An expansive zoological garden housing over 130 species in habitats designed to reflect natural environments.' },
  { id: 'aa-kt', title: 'Kelly Tarlton\'s Aquarium', image: img42, duration: '1.5 to 2 hours', price: '$33 - $47', description: 'Underwater viewing tunnels, a sub-Antarctic penguin colony, and sharks in repurposed subterranean tanks.' },
  { id: 'aa-motat', title: 'MOTAT', image: img49, duration: '2 to 3 hours', price: '$19', description: 'An interactive museum detailing New Zealand\'s transport and technological history.' },
  { id: 'aa-weta', title: 'Weta Workshop Unleashed', image: img51, duration: '90 minutes', price: '$67', description: 'A guided walk-through experience showcasing practical film effects, props, and animatronics.' },
  { id: 'aa-osm', title: 'Odyssey Sensory Maze', image: img20, duration: '20 - 30 minutes', price: '$29 - $38', description: 'An indoor walkthrough attraction utilizing lighting effects, mirrors, and physical obstacles.' },
  { id: 'aa-am', title: 'Auckland Museum', image: aucklandCity, duration: '45 minutes', price: '$31', description: 'Daily performances featuring traditional Māori song, dance, and the haka.' }
];

export const intercityTours = [
  { id: 'it-hg', title: 'Hamilton Garden', image: img64, duration: '1.5 to 2 hours', price: '$20', description: 'A 54-hectare park featuring enclosed, themed gardens exploring the history of international garden design.' },
  { id: 'it-zte', title: 'Zealong Tea Estate', image: nzLandscape, duration: '1.5 hours', price: '$55', description: 'New Zealand’s only commercial tea estate offering guided tours on tea production.' },
  { id: 'it-wgc', title: 'Waitomo Glowworm Caves', image: img81, duration: '2.5 to 3 hours', price: '$81', description: 'Labyrinth of caves, sinkholes, and underground rivers featuring thousands of tiny glowworms.' },
  { id: 'it-hms', title: 'The Hobbiton Movie Set', image: tour1, duration: '2 hours', price: '$130', description: 'The actual film location used in The Lord of the Rings and The Hobbit trilogies.' }
];

export const rotoruaTours = [
  { id: 'rot-lr', title: 'Rotorua - Lake Rotorua', image: rotoruaGeothermal, duration: '30 - 60 Mins', price: 'Free', description: 'A large, shallow caldera lake known for its high geothermal activity and distinct venting.' },
  { id: 'rot-gg', title: 'Government Gardens', image: img64, duration: '1 Hour', price: 'Free', description: 'A manicured public park established in the early 20th century housing the historic Bath House.' },
  { id: 'rot-rf', title: 'Redwood Forest', image: tour2, duration: '1 - 3 Hours', price: 'Free', description: 'A commercial timber plantation featuring a massive grove of Californian Coast Redwoods.' },
  { id: 'rot-bl', title: 'Blue Lake (Tikitapu)', image: tour3, duration: '1 Hour', price: 'Free', description: 'A collapsed volcanic crater lake characterized by its distinct blue water.' },
  { id: 'rot-kp', title: 'Kuirau Park', image: rotoruaGeothermal, duration: '1 Hour', price: 'Free', description: 'A public municipal park featuring active, unfenced geothermal activity and boiling mud pools.' }
];

export const rotoruaActivities = [
  { id: 'ra-wot', title: 'Wai-O-Tapu', image: img64, duration: '1.5 - 3 Hours', price: '$106', description: 'New Zealand\'s most colorful geothermal attraction with hot springs and geysers.' },
  { id: 'ra-wr', title: 'Whitewater Rafting', image: tour4, duration: '2 - 3 Hours', price: '$125', description: 'Guided rafting excursion through a steep, bush-clad gorge on the Kaituna River.' },
  { id: 'ra-ps', title: 'Polynesian Spa', image: rotoruaGeothermal, duration: '2 Hours', price: '$40 - $70+', description: 'Commercial bathing facility utilizing natural geothermal waters from two local springs.' },
  { id: 'ra-wvv', title: 'Waimangu Volcanic Valley', image: tour5, duration: '2 Hours', price: '$75', description: 'The world’s youngest geothermal valley, formed entirely following the 1886 eruption.' },
  { id: 'ra-tp', title: 'Te Puia', image: tour6, duration: '1.5 - 2 Hours', price: '$100', description: 'Cultural and geothermal center housing the Māori Arts and Crafts Institute.' },
  { id: 'ra-mmv', title: 'Mitai Maori Village', image: tour7, duration: '3 Hours', price: '$130', description: 'Evening cultural experience featuring traditional welcome and warrior canoe arrival.' },
  { id: 'ra-ms', title: 'Marae Stay', image: nzLandscape, duration: 'Overnight', price: '$150+', description: 'Immersive overnight experience at traditional Māori meeting grounds.' },
  { id: 'ra-rtw', title: 'Redwoods Treewalk', image: tour1, duration: '40 Mins', price: '$40', description: 'Suspension bridges traversing the canopy of the Californian Coast Redwoods.' }
];

export const paihiaTours = [
  { id: 'pai-abp', title: 'Auckland & Bay of Paihia', image: tour2, duration: 'Full Day', price: '$180+', description: 'Paihia is the main tourist hub of the Bay of Islands maritime park.' },
  { id: 'pai-apa', title: 'Auckland Paihia Auckland', image: tour3, duration: '12 - 13 Hours', price: '$180+', description: 'Comprehensive round-trip itinerary from Auckland to the Bay of Islands.' }
];

export const paihiaActivities = [
  { id: 'pa-hitr', title: 'Hole in the Rock Cruise', image: tour4, duration: '3 - 4 Hours', price: '$140', description: 'Maritime excursion navigating the Bay of Islands out to Motu Kōkako.' },
  { id: 'pa-wtg', title: 'Waitangi Treaty Grounds', image: tour5, duration: '3 Hours', price: '$60', description: 'The historical estate where the founding document of NZ was signed in 1840.' },
  { id: 'pa-para', title: 'Parasailing', image: tour6, duration: '1.5 Hours', price: '$140', description: 'Commercial recreational activity with highest elevated panoramic views.' }
];
