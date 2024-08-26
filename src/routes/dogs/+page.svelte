<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
  import { SlideToggle } from '@skeletonlabs/skeleton';

	let dogs: Array<{ name: string, age: number, weight: number, type: string, grain: boolean }> = [];
	let name = '';
	let age = 0;
	let weight = 0;
	let type = '';
	let grain = false;

	// Beim Laden der Komponente die Hundedaten aus localStorage laden
	onMount(() => {
		const storedDogs = localStorage.getItem('dogs');
		if (storedDogs) {
			dogs = JSON.parse(storedDogs);
		}
	});

	// Funktion zum Hinzufügen eines Hundes
	function addDog() {
		const newDog = { name, age, weight, type, grain };
		dogs = [...dogs, newDog];
		localStorage.setItem('dogs', JSON.stringify(dogs));
		clearForm();
	}

	// Funktion zum Löschen eines Hundes
	function deleteDog(index: number) {
		dogs = dogs.filter((_, i) => i !== index); // Aktualisiere das Array
		localStorage.setItem('dogs', JSON.stringify(dogs));
	}

	// Formular nach dem Hinzufügen zurücksetzen
	function clearForm() {
		name = '';
		age = 0;
		weight = 0;
		type = '';
		grain = false;
	}
</script>

<div class="card p-8 m-8 w-auto text-token space-y-4">
	<h1>Hunde</h1>

  <hr class="!border-t-2" />

	<form on:submit|preventDefault={addDog}>
		<label>
			<span>Name</span>
			<input
				type="text"
        class="input"
				bind:value={name}
				autocomplete="off"
				required
			/>
		</label>
		<label>
			<span>Alter (Monate)</span>
			<input
				type="number"
        class="input"
				bind:value={age}
				required
			/>
		</label>
		<label>
			<span>Gewicht (kg)</span>
			<input
				type="number"
        class="input"
				bind:value={weight}
				step="0.1"
				required
			/>
		</label>
		<label>
			<span>Typ</span>
			<select class="select" bind:value={type} required>      
				<option value="" disabled selected>Typ auswählen</option>
				<option value="Hütehund">Hütehund</option>
				<option value="Jagthund">Jagthund</option>
				<!-- Weitere Optionen -->
			</select>
		</label>
		<label>
      <SlideToggle name="slider-label" bind:checked={grain}>Getreide</SlideToggle>
		</label>
		<button type="submit" class="btn variant-filled">Speichern</button>
	</form>
</div>
  <hr class="!border-t-8" />
<div class="card p-8 m-8 w-auto text-token space-y-4">
	<h2>Gespeicherte Hunde</h2>
  <hr class="!border-t-2" />
	<ul class="dogs">
		{#each dogs as dog, index (index)}
      <div class="card p-4 m-4 w-auto text-token space-y-4 break-all">
        <li in:fly={{ y: 20 }} out:slide>
          <span>{dog.name} - {dog.age} Monate - {dog.weight} kg - {dog.type} - Getreide: {dog.grain ? 'Ja' : 'Nein'}</span>
          <button aria-label="Löschen" on:click={() => deleteDog(index)}>X</button>
        </li>
      </div>
		{/each}
	</ul>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
    padding: 20px
	}

	label {
		width: 100%;
		display: block;
		margin-bottom: 1em;
	}

	input, select {
		width: 100%;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background: none;
		color: red;
		cursor: pointer;
		font-weight: bold;
	}

	button:hover {
		opacity: 0.8;
	}
</style>
