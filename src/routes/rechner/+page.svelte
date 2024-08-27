<script>
  import { barfStore } from '$lib/stores/local';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  // Lokale Kopien der Werte aus dem Store
  let alter, gewicht, futtermengeProzent, fettMager, fettDurchwachsen, gewuenschterFettanteil;
  let anteilTierisch, anteilMuskelfleisch, anteilPansen, anteilInnereien, anteilKnochen, anteilObst, anteilGemuese;

  // Initialisiere die Werte aus dem Store, wenn die Komponente geladen wird
  $: { barfStore.subscribe(values => {
      alter = values.alter;
      gewicht = values.gewicht;
      futtermengeProzent = values.futtermengeProzent;
      fettMager = values.fettMager;
			fettDurchwachsen = values.fettDurchwachsen;
      gewuenschterFettanteil = values.gewuenschterFettanteil;
      anteilTierisch = values.anteilTierisch;
      anteilMuskelfleisch = values.anteilMuskelfleisch;
      anteilPansen = values.anteilPansen;
      anteilInnereien = values.anteilInnereien;
      anteilKnochen = values.anteilKnochen;
      anteilObst = values.anteilObst;
      anteilGemuese = values.anteilGemuese;
  })}

  // Berechnungen
  $: gesamtfuttermenge = gewicht * 1000 * (futtermengeProzent / 100);
  
  $: tierischerAnteil = gesamtfuttermenge * (anteilTierisch / 100);
  $: fleischAnteil = tierischerAnteil * (anteilMuskelfleisch / 100);
  
  // Berechnung des Fleischanteils, basierend auf dem gewünschten Fettanteil

    // Wenn es zwei Sorten Fleisch mit unterschiedlichem Fettgehalt gibt:
	$: fettMagerAnteil = (gewuenschterFettanteil - fettDurchwachsen) / (fettMager - fettDurchwachsen);
	$: fettDurchwachsenAnteil = 1 - fettMagerAnteil;


	$: mager = fleischAnteil * fettMagerAnteil;
  $: durchwachsen = fleischAnteil * fettDurchwachsenAnteil;


  $: pansen = tierischerAnteil * (anteilPansen / 100);
  $: innereien = tierischerAnteil * (anteilInnereien / 100);
  $: knochen = tierischerAnteil * (anteilKnochen / 100);
  
  $: pflanzlicherAnteil = gesamtfuttermenge * ((100 - anteilTierisch) / 100);
  $: obst = pflanzlicherAnteil * (anteilObst / 100);
  $: gemuese = pflanzlicherAnteil * (anteilGemuese / 100);

  // Speichern der Änderungen in den Store, um sie im localStorage zu sichern
  $: {
    if (browser) {
      barfStore.update(values => {
        return {
          ...values,
          alter,
          gewicht,
          futtermengeProzent,
          fettMager,
					fettDurchwachsen,
          gewuenschterFettanteil,
          anteilTierisch,
          anteilMuskelfleisch,
          anteilPansen,
          anteilInnereien,
          anteilKnochen,
          anteilObst,
          anteilGemuese
        };
      });
    }
  }
</script>

<main>
	<div class="flex justify-center items-center">
		<h1 class="text-center relative h1">
		<span class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent box-decoration-clone center">
			BARF Rechner
		</span>
		<span class="absolute inset-0 text-center text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text blur-sm">
      BARF Rechner
    </span>
	</h1>
	</div>
	<div class="flex flex-row flex-wrap">



		<form>
			<div class="card p-2 m-4 w-auto text-token space-y-4">
<Accordion>
<AccordionItem open>
	<svelte:fragment slot="lead"></svelte:fragment>
	<svelte:fragment slot="summary"><h2 class="h2">Eingaben</h2></svelte:fragment>
	<svelte:fragment slot="content">
				<!-- Eingaben -->
				
				<label class="label">
					<span>Alter in Monaten</span>
				<input  class="input" id="alter" type="number" bind:value={alter} min="1" step="1" />
					</label>
				<label for="gewicht">Gewicht in kg:</label>
				<input  class="input" id="gewicht" type="number" bind:value={gewicht} min="0.1" step="0.1" />
		
				<label for="futtermengeProzent">Futtermenge prozentual zum Gewicht:</label>
				<input  class="input"  id="futtermengeProzent" type="number" bind:value={futtermengeProzent} min="1" step="0.1" />
		
				<label for="fettMager">Fettanteil Fleisch Mager:</label>
				<input  class="input" id="fettMager" type="number" bind:value={fettMager} min="0" step="0.1" />
		
				<label for="fettDurchwachsen">Fettanteil vom durchwachsenen Fleisch</label>
				<input class="input" id="fettDurchwachsen" type="number" bind:value={fettDurchwachsen} />
		
				<label for="gewuenschterFettanteil">Gewünschter Fettanteil (%):</label>
				<input  class="input" id="gewuenschterFettanteil" type="number" bind:value={gewuenschterFettanteil} min="0" step="1" />
		
	</svelte:fragment>


</AccordionItem>

	<AccordionItem>
		<svelte:fragment slot="lead"></svelte:fragment>
		<svelte:fragment slot="summary"><h3 class="h3">Erweiterte Optionen</h3></svelte:fragment>
		<svelte:fragment slot="content">

			<!-- Optionen -->
			<h3>Tierisch</h3>
			<label for="anteilTierisch">Anteil Tierisch:</label>
			<input  class="input" id="anteilTierisch" type="number" bind:value={anteilTierisch} min="0" max="100" step="1" />

			<label for="anteilMuskelfleisch">Davon Muskelfleisch:</label>
			<input  class="input" id="anteilMuskelfleisch" type="number" bind:value={anteilMuskelfleisch} min="0" max="100" step="1" />

			<label for="anteilPansen">Anteil Pansen/Blättermagen:</label>
			<input  class="input" id="anteilPansen" type="number" bind:value={anteilPansen} min="0" max="100" step="1" />

			<label for="anteilInnereien">Anteil Innereien:</label>
			<input  class="input" id="anteilInnereien" type="number" bind:value={anteilInnereien} min="0" max="100" step="1" />

			<label for="anteilKnochen">Anteil Knochen:</label>
			<input  class="input" id="anteilKnochen" type="number" bind:value={anteilKnochen} min="0" max="100" step="1" />

			<h3>Pflanzlich</h3>
			<label for="anteilObst">Anteil Obst:</label>
			<input  class="input" id="anteilObst" type="number" bind:value={anteilObst} min="0" max="100" step="1" />

			<label for="anteilGemuese">Anteil Gemüse:</label>
			<input  class="input" id="anteilGemuese" type="number" bind:value={anteilGemuese} min="0" max="100" step="1" />
		</svelte:fragment>
		</AccordionItem>
		</Accordion>
		</div>	

  </form>
	<!-- <div class="card p-4 m-4 w-auto text-token space-y-4"> -->

  <!-- Ausgaben -->
<!-- Responsive Container (recommended) -->
<div class="table-container p-2 m-2 w-auto">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Category</th>
				<th>Amount (g)</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><b>Gesamtfuttermenge</b></td>
				<td>{gesamtfuttermenge.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Tierischer Anteil</td>
				<td>{tierischerAnteil.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Muskelfleisch Anteil</td>
				<td>{fleischAnteil.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Mageres Fleisch</td>
				<td>{mager.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Durchwachsenes Fleisch</td>
				<td>{durchwachsen.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Pansen/Blättermagen</td>
				<td>{pansen.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Innereien</td>
				<td>{innereien.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Knochen</td>
				<td>{knochen.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Pflanzlicher Anteil</td>
				<td>{pflanzlicherAnteil.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Obst</td>
				<td>{obst.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Gemüse</td>
				<td>{gemuese.toFixed(2)}</td>
			</tr>
		</tbody>
	</table>
</div>

	</div>
<!-- </div> -->
</main>


