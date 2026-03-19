<script lang="ts">
	import CreateTripForm from '$lib/components/CreateTripForm.svelte';
	import TripsList from '$lib/components/TripsList.svelte';
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<!-- Header -->
	<header class="bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-4xl font-bold text-gray-900">🌿 Klekovina</h1>
					<p class="mt-1 text-gray-600">
						Otkrijte i organizirajte nevjerojatne planinarenske avanture
					</p>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<CreateTripForm />
		<TripsList />
	</main>
</div>
