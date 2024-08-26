<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';

	let meats: Array<{ name: string, fatContent: number, type: string }> = [];
	let name = '';
	let fatContent = 0;
	let type = '';

	// Beim Laden der Komponente die Fleischsorten aus localStorage laden
	onMount(() => {
		const storedMeats = localStorage.getItem('meats');
		if (storedMeats) {
			meats = JSON.parse(storedMeats);
		}
	});

	// Funktion zum Hinzufügen einer Fleischsorte
	function addMeat() {
		const newMeat = { name, fatContent, type };
		meats = [...meats, newMeat];
		localStorage.setItem('meats', JSON.stringify(meats));
		clearForm();
	}

	// Funktion zum Löschen einer Fleischsorte
	function deleteMeat(index: number) {
		meats = meats.filter((_, i) => i !== index); // Aktualisiere das Array
		localStorage.setItem('meats', JSON.stringify(meats));
	}

	// Formular nach dem Hinzufügen zurücksetzen
	function clearForm() {
		name = '';
		fatContent = 0;
		type = '';
	}
</script>

<div class="centered">
	<h1>Fleischsorten</h1>
	<hr class="!border-t-2" />

	<form on:submit|preventDefault={addMeat}>
		<label class="label">
			<span>Name</span>
			<input
				class="input"
				type="text"
				bind:value={name}
				autocomplete="off"
				required
			/>
		</label>
		<label>
			<span>Fettanteil (%)</span>
			<input
				class="input"
				type="number"
				bind:value={fatContent}
				step="0.1"
				required
			/>
		</label>
		<label>
			<span>Fleischtyp</span>
			<select class="select" bind:value={type} required>
				<option value="" disabled selected>Typ auswählen</option>
				<option value="mager">Mager</option>
				<option value="durchwachsen">Durchwachsen</option>
			</select>
		</label>
		<button type="submit" class="btn variant-filled">Speichern</button>
	</form>
</div>
	<hr class="!border-t-8" />
<div class="centered">
	<h1>Gespeicherte Fleischsorten</h1>
	<hr class="border-t-2" />
	<ul class="meats">
		{#each meats as meat, index (index)}
			<li in:fly={{ y: 20 }} out:slide>
				<span>{meat.name} - {meat.fatContent}% Fett - {meat.type}</span>
				<button aria-label="Löschen" on:click={() => deleteMeat(index)}>X</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
		padding: 20px;
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
