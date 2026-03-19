<script lang="ts">
	import type { HikingTrip } from '$lib/stores';
	import { trips } from '$lib/stores';

	let showForm = $state(false);

	let formData = $state({
		name: '',
		description: '',
		location: '',
		difficulty: 'moderate' as const,
		duration: 3,
		distance: 5,
		elevation: 300,
		date: '',
		maxParticipants: 10
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!formData.name || !formData.location || !formData.date) {
			alert('Please fill in all required fields');
			return;
		}

		const newTrip: Omit<HikingTrip, 'id'> = {
			...formData,
			participants: 1,
			imageUrl: undefined
		};

		trips.addTrip(newTrip);
		resetForm();
	}

	function resetForm() {
		formData = {
			name: '',
			description: '',
			location: '',
			difficulty: 'moderate',
			duration: 3,
			distance: 5,
			elevation: 300,
			date: '',
			maxParticipants: 10
		};
		showForm = false;
	}

	function toggleForm() {
		showForm = !showForm;
	}

	// Set minimum date to today
	const today = new Date().toISOString().split('T')[0];
</script>

<div class="mb-8">
	<button
		onclick={toggleForm}
		class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
	>
		{showForm ? '✕ Otkaži' : '+ Kreiraj novu rutu'}
	</button>

	{#if showForm}
		<form onsubmit={handleSubmit} class="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg">
			<h3 class="text-2xl font-bold mb-6 text-gray-900">Kreiraj novu planinarsku rutu</h3>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Trip Name -->
				<div class="md:col-span-2">
				<label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Naziv rute *</label>
				<input
					type="text"
					id="name"
					bind:value={formData.name}
					placeholder="npr. Uspinjanje na Planinsku Vrh"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<!-- Description -->
				<div class="md:col-span-2">
				<label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Opis</label>
				<textarea
					id="description"
					bind:value={formData.description}
					placeholder="Opišite planinarsku rutu..."
						rows="3"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					></textarea>
				</div>

				<!-- Location -->
				<div>
				<label for="location" class="block text-sm font-semibold text-gray-700 mb-2">Lokacija *</label>
				<input
					type="text"
					id="location"
					bind:value={formData.location}
					placeholder="npr. Velebit"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<!-- Date -->
				<div>
					<label for="date" class="block text-sm font-semibold text-gray-700 mb-2">Datum *</label>
					<input
						type="date"
						id="date"
						bind:value={formData.date}
						min={today}
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<!-- Difficulty -->
				<div>
				<label for="difficulty" class="block text-sm font-semibold text-gray-700 mb-2">Težina</label>
				<select
					id="difficulty"
					bind:value={formData.difficulty}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="easy">Lako</option>
					<option value="moderate">Umjereno</option>
					<option value="hard">Teško</option>
					</select>
				</div>

				<!-- Duration -->
				<div>
					<label for="duration" class="block text-sm font-semibold text-gray-700 mb-2">Trajanje (sati)</label>
					<input
						type="number"
						id="duration"
						bind:value={formData.duration}
						min="0.5"
						step="0.5"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<!-- Distance -->
				<div>
					<label for="distance" class="block text-sm font-semibold text-gray-700 mb-2">Udaljenost (km)</label>
					<input
						type="number"
						id="distance"
						bind:value={formData.distance}
						min="0"
						step="0.1"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<!-- Elevation Gain -->
				<div>
					<label for="elevation" class="block text-sm font-semibold text-gray-700 mb-2">Uspinjanje (metri)</label>
					<input
						type="number"
						id="elevation"
						bind:value={formData.elevation}
						min="0"
						step="10"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<!-- Max Participants -->
				<div>
					<label for="maxParticipants" class="block text-sm font-semibold text-gray-700 mb-2">Maksimalno sudionika</label>
					<input
						type="number"
						id="maxParticipants"
						bind:value={formData.maxParticipants}
						min="1"
						step="1"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			<!-- Form Buttons -->
			<div class="flex gap-4 mt-8">
				<button
					type="submit"
					class="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
				>
					Kreiraj rutu
				</button>
				<button
					type="button"
					onclick={resetForm}
					class="flex-1 px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
				>
					Otkaži
				</button>
			</div>
		</form>
	{/if}
</div>
