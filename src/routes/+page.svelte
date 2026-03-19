<script lang="ts">
	import CreateTripForm from '$lib/components/CreateTripForm.svelte';
	import TripsList from '$lib/components/TripsList.svelte';
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<!-- Header -->
	<header class="bg-white shadow-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-4xl font-bold text-gray-900">🌿 Klekovina</h1>
					<p class="text-gray-600 mt-1">Otkrijte i organizirajte nevjerojatne planinarenske avanture</p>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<CreateTripForm />
		<TripsList />
	</main>
</div>
