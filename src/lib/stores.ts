import { writable } from 'svelte/store';

export interface HikingTrip {
	id: string;
	name: string;
	description: string;
	location: string;
	difficulty: 'easy' | 'moderate' | 'hard';
	duration: number; // in hours
	distance: number; // in km
	elevation: number; // in meters
	date: string; // ISO date
	maxParticipants: number;
	participants: number;
	imageUrl?: string;
}

// Initialize with some sample data
function createTripsStore() {
	const initialTrips: HikingTrip[] = [
		{
			id: '1',
			name: 'Uspinjanje na Planinsku Vrh',
			description: 'Zahtjevna planinska ruta do vrha s nevjerojatnim pogledom na svjetsku obalu',
			location: 'Plitvička jezera',
			difficulty: 'hard',
			duration: 8,
			distance: 15,
			elevation: 1200,
			date: '2024-04-15',
			maxParticipants: 10,
			participants: 7,
			imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop'
		},
		{
			id: '2',
			name: 'Šetnja kroz Šumsku Stazu',
			description: 'Mirna planinska ruta kroz čarobnu šumsku scenografiju Dalmatinskog zaleđa',
			location: 'Krka nacionalni park',
			difficulty: 'easy',
			duration: 3,
			distance: 5,
			elevation: 200,
			date: '2024-04-20',
			maxParticipants: 15,
			participants: 12,
			imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&h=400&fit=crop'
		},
		{
			id: '3',
			name: 'Ekspedicija do Alpskog Jezera',
			description: 'Umjerena planinska ruta do prelijepog alpskog jezera u srcu Dinare',
			location: 'Dinara',
			difficulty: 'moderate',
			duration: 5,
			distance: 10,
			elevation: 600,
			date: '2024-04-25',
			maxParticipants: 12,
			participants: 8,
			imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=400&fit=crop'
		}
	];

	const { subscribe, set, update } = writable<HikingTrip[]>(initialTrips);

	return {
		subscribe,
		addTrip: (trip: Omit<HikingTrip, 'id'>) => {
			update((trips) => [
				...trips,
				{
					...trip,
					id: Date.now().toString()
				}
			]);
		},
		deleteTrip: (id: string) => {
			update((trips) => trips.filter((trip) => trip.id !== id));
		},
		updateTrip: (id: string, updated: Partial<HikingTrip>) => {
			update((trips) => trips.map((trip) => (trip.id === id ? { ...trip, ...updated } : trip)));
		}
	};
}

export const trips = createTripsStore();
