<script lang="ts">
	import TripCard from './TripCard.svelte';
	import { trips } from '$lib/stores';

	let sortBy = $state<'date' | 'difficulty' | 'distance'>('date');
	let filterByDifficulty = $state<'all' | 'easy' | 'moderate' | 'hard'>('all');

	const filteredTrips = $derived($trips
		.filter((trip) => filterByDifficulty === 'all' || trip.difficulty === filterByDifficulty)
		.sort((a, b) => {
			switch (sortBy) {
				case 'date':
					return new Date(a.date).getTime() - new Date(b.date).getTime();
				case 'difficulty':
					const difficultyOrder = { easy: 1, moderate: 2, hard: 3 };
					return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
				case 'distance':
					return a.distance - b.distance;
				default:
					return 0;
			}
		}));
</script>

<div class="mb-8">
		<h2 class="text-2xl font-bold text-gray-900 mb-4">Dostupne planineske rute</h2>
	<div class="flex flex-col md:flex-row gap-4 mb-6">
		<!-- Sort By -->
		<div class="flex-1">
			<label for="sort" class="block text-sm font-semibold text-gray-700 mb-2">Sort by</label>
			<select
				id="sort"
				bind:value={sortBy}
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value="date">Date</option>
				<option value="difficulty">Difficulty</option>
				<option value="distance">Distance</option>
			</select>
		</div>

		<!-- Filter by Difficulty -->
		<div class="flex-1">
				<label for="filter" class="block text-sm font-semibold text-gray-700 mb-2">Filtriraj po težini</label>
				<select
					id="filter"
					bind:value={filterByDifficulty}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">Svi nivoi</option>
					<option value="easy">Lako</option>
					<option value="moderate">Umjereno</option>
					<option value="hard">Teško</option>
			</select>
		</div>

		<!-- Result Count -->
		<div class="flex items-end">
			<div class="text-sm text-gray-600 font-medium">
				{filteredTrips.length} rut{filteredTrips.length !== 1 ? 'e' : 'a'} pronađeno
			</div>
		</div>
	</div>

	<!-- Trips Grid -->
	{#if filteredTrips.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredTrips as trip (trip.id)}
				<TripCard {trip} />
			{/each}
		</div>
	{:else}
		<div class="text-center py-12 bg-gray-50 rounded-lg">
			<p class="text-xl text-gray-600 mb-2">Nema ruta koje odgovaraju vašim kriterijima</p>
			<p class="text-gray-500">Pokušajte prilagoditi filtere ili kreirajte novu rutu</p>
		</div>
	{/if}
</div>
