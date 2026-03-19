<script lang="ts">
	import TripCard from './TripCard.svelte';
	import { trips } from '$lib/stores';

	let sortBy = $state<'date' | 'difficulty' | 'distance'>('date');
	let filterByDifficulty = $state<'all' | 'easy' | 'moderate' | 'hard'>('all');

	const filteredTrips = $derived(
		$trips
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
			})
	);
</script>

<div class="mb-8">
	<h2 class="mb-4 text-2xl font-bold text-gray-900">Dostupne planineske rute</h2>
	<div class="mb-6 flex flex-col gap-4 md:flex-row">
		<!-- Sort By -->
		<div class="flex-1">
			<label for="sort" class="mb-2 block text-sm font-semibold text-gray-700">Sort by</label>
			<select
				id="sort"
				bind:value={sortBy}
				class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				<option value="date">Date</option>
				<option value="difficulty">Difficulty</option>
				<option value="distance">Distance</option>
			</select>
		</div>

		<!-- Filter by Difficulty -->
		<div class="flex-1">
			<label for="filter" class="mb-2 block text-sm font-semibold text-gray-700"
				>Filtriraj po težini</label
			>
			<select
				id="filter"
				bind:value={filterByDifficulty}
				class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				<option value="all">Svi nivoi</option>
				<option value="easy">Lako</option>
				<option value="moderate">Umjereno</option>
				<option value="hard">Teško</option>
			</select>
		</div>

		<!-- Result Count -->
		<div class="flex items-end">
			<div class="text-sm font-medium text-gray-600">
				{filteredTrips.length} rut{filteredTrips.length !== 1 ? 'e' : 'a'} pronađeno
			</div>
		</div>
	</div>

	<!-- Trips Grid -->
	{#if filteredTrips.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredTrips as trip (trip.id)}
				<TripCard {trip} />
			{/each}
		</div>
	{:else}
		<div class="rounded-lg bg-gray-50 py-12 text-center">
			<p class="mb-2 text-xl text-gray-600">Nema ruta koje odgovaraju vašim kriterijima</p>
			<p class="text-gray-500">Pokušajte prilagoditi filtere ili kreirajte novu rutu</p>
		</div>
	{/if}
</div>
