<script>
  import { barfStore } from '$lib/stores/local';
  import { browser } from '$app/environment';
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  import { Barbell, Percent } from 'phosphor-svelte';

  let {
  alter = 0, // Default value for alter (e.g., 0 months)
  gewicht = 0, // Default value for gewicht (e.g., 0 kg)
  futtermengeProzent = 2, // Default percentage of food relative to weight
  fettMager = null, // Default value for fettMager (e.g., null to indicate no selection)
  fettDurchwachsen = null, // Default value for fettDurchwachsen (e.g., null to indicate no selection)
  gewuenschterFettanteil = 15, // Default desired fat percentage
  anteilTierisch = 80, // Default percentage of animal-based food
  anteilMuskelfleisch = 70, // Default percentage of muscle meat
  anteilPansen = 20, // Default percentage of tripe
  anteilInnereien = 15, // Default percentage of organs
  anteilKnochen = 15, // Default percentage of bones
  anteilObst = 25, // Default percentage of fruit
  anteilGemuese = 75 // Default percentage of vegetables
} = {};


  let fettMagerOption = 'Anderes';
  let fettDurchwachsenOption = 'Anderes';

  const magerOptionen = [
    { label: 'Anderes', value: null },
    { label: 'Rind mager - 6,7%', value: 6.7 },
    { label: 'Lamm mager - 5%', value: 5 },
  ];

  const durchwachsenOptionen = [
    { label: 'Anderes', value: null },
    { label: 'Rind durchwachsen - 28,3%', value: 28.3 },
    { label: 'Lamm durchwachsen - 22,4%', value: 22.4 },
    { label: 'Lachs - 27%', value: 27 },
  ];

  barfStore.subscribe(values => {
    ({
      alter, gewicht, futtermengeProzent, fettMager, fettDurchwachsen, gewuenschterFettanteil,
      anteilTierisch, anteilMuskelfleisch, anteilPansen, anteilInnereien, anteilKnochen, anteilObst, anteilGemuese
    } = values);
  });

  $: fettMager = fettMagerOption !== 'Anderes'
    ? magerOptionen.find(option => option.label === fettMagerOption)?.value
    : fettMager;

  $: fettDurchwachsen = fettDurchwachsenOption !== 'Anderes'
    ? durchwachsenOptionen.find(option => option.label === fettDurchwachsenOption)?.value
    : fettDurchwachsen;

  $: gesamtfuttermenge = gewicht * 1000 * (futtermengeProzent / 100);

  $: tierischerAnteil = gesamtfuttermenge * (anteilTierisch / 100);
  $: fleischAnteil = tierischerAnteil * (anteilMuskelfleisch / 100);

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

  $: portionen = 3;

  $: futterDaten = [
    { label: 'Gesamtfuttermenge', value: gesamtfuttermenge, type: 'total' },
    { label: 'Tierischer Anteil', value: tierischerAnteil, type: 'category' },
    { label: 'Muskelfleisch Anteil', value: fleischAnteil, type: 'sub-category' },
    { label: 'Mageres Fleisch', value: mager, type: 'sub-sub-category' },
    { label: 'Durchwachsenes Fleisch', value: durchwachsen, type: 'sub-sub-category' },
    { label: 'Pansen/Blättermagen', value: pansen, type: 'sub-category' },
    { label: 'Innereien', value: innereien, type: 'sub-category' },
    { label: 'Knochen', value: knochen, type: 'sub-category' },
    { label: 'Pflanzlicher Anteil', value: pflanzlicherAnteil, type: 'category' },
    { label: 'Obst', value: obst, type: 'sub-category' },
    { label: 'Gemüse', value: gemuese, type: 'sub-category' },
  ];

  $: if (browser) {
    barfStore.update(values => ({
      ...values, alter, gewicht, futtermengeProzent, fettMager, fettDurchwachsen,
      gewuenschterFettanteil, anteilTierisch, anteilMuskelfleisch, anteilPansen,
      anteilInnereien, anteilKnochen, anteilObst, anteilGemuese
    }));
  }
</script>

<style>
  .icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  .input-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .input-container input {
    width: 100%;
    padding-right: 5px;
  }

  .input-container::after {
    content: '%';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    pointer-events: none;
  }

  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  .total {
    @apply bg-primary-100 dark:bg-primary-800 font-bold;
  }

  .category {
    @apply bg-secondary-100 dark:bg-secondary-800 font-bold;
  }

  .sub-category {
    @apply pl-4;
  }

  .sub-sub-category {
    @apply pl-20 italic;
  }

  .separator {
    height: 1px;
  }
</style>

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
            <svelte:fragment slot="summary"><h2 class="h2">Eingaben</h2></svelte:fragment>
            <svelte:fragment slot="content">
              <label for="gewicht">
                <span><b>Gewicht in kg</b></span>
                <div class="input-group input-group-divider grid-cols-[auto_1fr]">
                  <div class="input-group-shim"><Barbell size={25} /></div>
                  <input id="gewicht" type="number" bind:value={gewicht} min="0.1" step="0.1" />
                </div>
              </label>

              <label for="futtermengeProzent">
                <span>Futtermenge prozentual zum Gewicht</span>
                <div class="flex items-center space-x-4 w-full">
                  <input type="range" id="futtermengeProzent" bind:value={futtermengeProzent} min="1" max="10" step="0.1" class="slider" />
                  <div class="flex items-center space-x-1">
                    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                      <input type="number" bind:value={futtermengeProzent} min="1" step="0.1" />
                      <div class="input-group-shim"><Percent size={21} /></div>
                    </div>
                  </div>
                </div>
              </label>

              <label for="gewuenschterFettanteil">
                <span>Gewünschter Fettanteil (%)</span>
                <div class="flex items-center space-x-4 w-full">
                  <input type="range" id="gewuenschterFettanteil" bind:value={gewuenschterFettanteil} min="0" max="30" step="1" class="slider" />
                  <div class="flex items-center space-x-1">
                    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                      <input type="number" bind:value={gewuenschterFettanteil} min="0" step="1" />
                      <div class="input-group-shim"><Percent size={21} /></div>
                    </div>
                  </div>
                </div>
              </label>

              <hr class="!border-t-2" />

              <label for="fettMagerOption">
                <span><b>Mageres Fleisch</b></span>
                <select id="fettMagerOption" class="input" bind:value={fettMagerOption}>
                  {#each magerOptionen as option}
                    <option value={option.label}>{option.label}</option>
                  {/each}
                </select>
              </label>

              <label for="fettMager">
                <span>Fettanteil mageres Fleisch</span>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                  <input id="fettMager" type="number" bind:value={fettMager} min="0" step="0.1" disabled={fettMagerOption !== 'Anderes'} />
                  <div class="input-group-shim"><Percent size={21} /></div>
                </div>
              </label>

              <hr class="!border-t-2" />

              <label for="fettDurchwachsenOption">
                <span><b>Durchwachsenes Fleisch</b></span>
                <select id="fettDurchwachsenOption" class="input" bind:value={fettDurchwachsenOption}>
                  {#each durchwachsenOptionen as option}
                    <option value={option.label}>{option.label}</option>
                  {/each}
                </select>
              </label>

              <label for="fettDurchwachsen">
                <span>Fettanteil durchwachsenes Fleisch</span>
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                  <input id="fettDurchwachsen" type="number" bind:value={fettDurchwachsen} min="0" step="0.1" disabled={fettDurchwachsenOption !== 'Anderes'} />
                  <div class="input-group-shim"><Percent size={21} /></div>
                </div>
              </label>
            </svelte:fragment>
          </AccordionItem>

          <hr class="!border-t-8 !border-double" />

          <AccordionItem>
            <svelte:fragment slot="summary"><h3 class="h3">Erweiterte Optionen</h3></svelte:fragment>
            <svelte:fragment slot="content">
              <h3>Tierisch</h3>

              <label for="anteilTierisch">
                <span>Anteil Tierisch</span>
                <input class="input" id="anteilTierisch" type="number" bind:value={anteilTierisch} min="0" max="100" step="1" />
              </label>

              <label for="anteilMuskelfleisch">
                <span>Davon Muskelfleisch:</span>
                <input class="input" id="anteilMuskelfleisch" type="number" bind:value={anteilMuskelfleisch} min="0" max="100" step="1" />
              </label>

              <hr class="!border-t-2" />

              <label for="anteilPansen">
                <span>Anteil Pansen/Blättermagen:</span>
                <input class="input" id="anteilPansen" type="number" bind:value={anteilPansen} min="0" max="100" step="1" />
              </label>

              <label for="anteilInnereien">
                <span>Anteil Innereien:</span>
                <input class="input" id="anteilInnereien" type="number" bind:value={anteilInnereien} min="0" max="100" step="1" />
              </label>

              <label for="anteilKnochen">
                <span>Anteil Knochen:</span>
                <input class="input" id="anteilKnochen" type="number" bind:value={anteilKnochen} min="0" max="100" step="1" />
              </label>

              <h3>Pflanzlich</h3>

              <hr class="!border-t-4" />

              <label for="anteilObst">
                <span>Anteil Obst:</span>
                <input class="input" id="anteilObst" type="number" bind:value={anteilObst} min="0" max="100" step="1" />
              </label>

              <label for="anteilGemuese">
                <span>Anteil Gemüse:</span>
                <input class="input" id="anteilGemuese" type="number" bind:value={anteilGemuese} min="0" max="100" step="1" />
              </label>
            </svelte:fragment>
          </AccordionItem>
        </Accordion>
      </div>
    </form>

    <div class="table-container p-2 m-2 w-auto">
      <table class="table table-hover">
        <thead class="bg-base-300">
          <tr>
            <th>Futter</th>
            <th>Portion</th>
            <th>Tag</th>
            <th>Woche</th>
          </tr>
        </thead>
        <tbody>
          {#each futterDaten as item, i}
            {#if i > 0 && futterDaten[i].type == "category"}
              <tr class="separator"><td colspan="1"></td></tr>
            {/if}
            <tr class={item.type}>
              <td><b>{item.label}</b></td>
              <td>{(item.value / portionen).toFixed(2)}</td>
              <td>{item.value.toFixed(2)}</td>
              <td>{(item.value * 7).toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>
