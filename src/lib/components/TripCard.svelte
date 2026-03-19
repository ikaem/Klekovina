<script lang="ts">
	import type { HikingTrip } from '$lib/stores';

	const { trip } = $props<{ trip: HikingTrip }>();

	const difficultyStyles = {
		easy: 'bg-green-100 text-green-800',
		moderate: 'bg-yellow-100 text-yellow-800',
		hard: 'bg-red-100 text-red-800'
	};

	const spotsRemaining = $derived(trip.maxParticipants - trip.participants);
</script>

<div class="rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
	{#if trip.imageUrl}
		<div class="h-48 w-full bg-gray-300 overflow-hidden">
			<img src={trip.imageUrl} alt={trip.name} class="w-full h-full object-cover" />
		</div>
	{:else}
		<div class="h-48 w-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
			<span class="text-white text-2xl">🌿</span>
		</div>
	{/if}

	<div class="p-6">
		<div class="flex items-start justify-between mb-2">
			<h3 class="text-xl font-bold text-gray-900">{trip.name}</h3>
			<span class="inline-block px-3 py-1 rounded-full text-sm font-medium {difficultyStyles[trip.difficulty]}">
				{trip.difficulty === 'easy' ? 'Lako' : trip.difficulty === 'moderate' ? 'Umjereno' : 'Teško'}
			</span>
		</div>

		<p class="text-gray-600 text-sm mb-4">{trip.description}</p>

		<div class="grid grid-cols-2 gap-4 mb-4 text-sm">
			<div class="flex items-center text-gray-700">
				<span class="mr-2">📍</span>
				<span>{trip.location}</span>
			</div>
			<div class="flex items-center text-gray-700">
				<span class="mr-2">📅</span>
				<span>{new Date(trip.date).toLocaleDateString('hr-HR')}</span>
			</div>
			<div class="flex items-center text-gray-700">
				<span class="mr-2">⏱️</span>
				<span>{trip.duration} h</span>
			</div>
			<div class="flex items-center text-gray-700">
				<span class="mr-2">📏</span>
				<span>{trip.distance} km</span>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
			<div class="text-center">
				<div class="text-2xl font-bold text-gray-900">{trip.elevation}</div>
				<div class="text-xs text-gray-600">Uspinjanje (m)</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-gray-900">{trip.participants}/{trip.maxParticipants}</div>
				<div class="text-xs text-gray-600">Sudionici</div>
			</div>
		</div>

		{#if spotsRemaining > 0}
			<div class="mt-4 p-3 bg-blue-50 rounded">
				<p class="text-sm font-medium text-blue-900">{spotsRemaining} mjesto{spotsRemaining !== 1 ? 'a' : ''} dostupno</p>
			</div>
		{:else}
			<div class="mt-4 p-3 bg-gray-100 rounded">
				<p class="text-sm font-medium text-gray-900">Ruta je popunjena</p>
			</div>
		{/if}
	</div>
</div>
