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

<div
	class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg"
>
	{#if trip.imageUrl}
		<div class="h-48 w-full overflow-hidden bg-gray-300">
			<img src={trip.imageUrl} alt={trip.name} class="h-full w-full object-cover" />
		</div>
	{:else}
		<div
			class="flex h-48 w-full items-center justify-center bg-gradient-to-br from-blue-400 to-green-400"
		>
			<span class="text-2xl text-white">🌿</span>
		</div>
	{/if}

	<div class="p-6">
		<div class="mb-2 flex items-start justify-between">
			<h3 class="text-xl font-bold text-gray-900">{trip.name}</h3>
			<span
				class="inline-block rounded-full px-3 py-1 text-sm font-medium {difficultyStyles[
					trip.difficulty
				]}"
			>
				{trip.difficulty === 'easy'
					? 'Lako'
					: trip.difficulty === 'moderate'
						? 'Umjereno'
						: 'Teško'}
			</span>
		</div>

		<p class="mb-4 text-sm text-gray-600">{trip.description}</p>

		<div class="mb-4 grid grid-cols-2 gap-4 text-sm">
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

		<div class="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
			<div class="text-center">
				<div class="text-2xl font-bold text-gray-900">{trip.elevation}</div>
				<div class="text-xs text-gray-600">Uspinjanje (m)</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-gray-900">
					{trip.participants}/{trip.maxParticipants}
				</div>
				<div class="text-xs text-gray-600">Sudionici</div>
			</div>
		</div>

		{#if spotsRemaining > 0}
			<div class="mt-4 rounded bg-blue-50 p-3">
				<p class="text-sm font-medium text-blue-900">
					{spotsRemaining} mjesto{spotsRemaining !== 1 ? 'a' : ''} dostupno
				</p>
			</div>
		{:else}
			<div class="mt-4 rounded bg-gray-100 p-3">
				<p class="text-sm font-medium text-gray-900">Ruta je popunjena</p>
			</div>
		{/if}
	</div>
</div>
