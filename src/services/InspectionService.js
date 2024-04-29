// InspectionService.js

// Definiëren van de URL's voor de opties en inspecties API's
const OPTIONS_API_URL = 'http://localhost:3000/options';
const INSPECTIONS_API_URL = 'http://localhost:3000/inspections';

// Functie om optiegegevens op te halen van de OPTIONS_API_URL
export const fetchOptions = async () => {
  try {
    // Een fetch-verzoek naar de opties API-URL uitvoeren
    const response = await fetch(OPTIONS_API_URL);
    // Controleren of het antwoord OK is
    if (!response.ok) {
      // Als het antwoord niet OK is, gooi dan een fout
      throw new Error('Network response was not ok');
    }
    // Gegevens uit het antwoord als JSON teruggeven
    return await response.json();
  } catch (error) {
    // Als er een fout optreedt tijdens het ophalen van optiegegevens, log dan een foutbericht en gooi de fout opnieuw
    console.error('Error fetching options data:', error);
    throw error;
  }
};

// Functie om inspectiegegevens op te halen van de INSPECTIONS_API_URL
export const fetchInspections = async () => {
  try {
    // Een fetch-verzoek naar de inspecties API-URL uitvoeren
    const response = await fetch(INSPECTIONS_API_URL);
    // Controleren of het antwoord OK is
    if (!response.ok) {
      // Als het antwoord niet OK is, gooi dan een fout
      throw new Error('Network response was not ok');
    }
    // Gegevens uit het antwoord als JSON teruggeven
    return await response.json();
  } catch (error) {
    // Als er een fout optreedt tijdens het ophalen van inspectiegegevens, log dan een foutbericht en gooi de fout opnieuw
    console.error('Error fetching inspection data:', error);
    throw error; 
  }
};