// InspectionModel.js

// Definieer de klasse InspectionModel
export default class InspectionModel {
  // Constructor voor het initialiseren van de eigenschappen van het inspectiemodel
  constructor(id, address, date, inspection_goals) {
    this.id = id;
    this.address = address;
    this.date = date;
    // Maak een nieuwe array met inspectiedoelen
    this.inspection_goals = inspection_goals.map(goal => {
      // Voor elk doel, maak een nieuw object met de doel- en optiegegevens
      return {
        goal: goal.goal,
        // Voor de opties van het doel, map over de keys en voeg ze toe aan een nieuw object
        options: Object.keys(goal.options).reduce((acc, key) => {
          // Voeg elk key-value paar toe aan het nieuwe object
          acc[key] = goal.options[key];
          // Geef het bijgewerkte object terug voor de volgende iteratie
          return acc;
        }, {}) // Leeg object als initiële waarde-argument van het accumulatieobject acc
      };
    });
  }
}