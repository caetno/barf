import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Standardwerte für die Eingabefelder
let barfValues = {
  alter: 1,
  gewicht: 1,
  futtermengeProzent: 3,
  fettMager: 0,
  gewuenschterFettanteil: 20,
  anteilTierisch: 80,
  anteilMuskelfleisch: 50,
  anteilPansen: 20,
  anteilInnereien: 15,
  anteilKnochen: 15,
  anteilObst: 25,
  anteilGemuese: 75,
};

// Nur im Browser ausführen
if (browser) {
  // Werte aus localStorage laden, falls vorhanden
  barfValues = JSON.parse(localStorage.getItem('barfValues')) || barfValues;
}

// Store erstellen
export const barfStore = writable(barfValues);

if (browser) {
  // Store in localStorage speichern, wenn sich die Werte ändern
  barfStore.subscribe((value) =>
    localStorage.setItem('barfValues', JSON.stringify(value))
  );
}
