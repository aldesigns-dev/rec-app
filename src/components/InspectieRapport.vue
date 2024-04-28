<template>
  <div>
    <h2>Inspectierapport ({{ adres }})</h2>

    <div>
      <h3>Schade opnemen:</h3>
      <div> 
        <label>Locatie:</label>
        <input type="text"/>
      </div>
      <div>
        <label>Nieuwe schade:</label>
        <input type="radio" value="ja" /> Ja
        <input type="radio" value="nee"  /> Nee
      </div>
      <div>
        <label>Soort schade:</label>
        <select >
          <option value="krassen">Krassen</option>
          <option value="deuken">Deuken</option>
          <option value="scheuren">Scheuren</option>
          <!-- Voeg andere opties toe indien nodig -->
        </select>
      </div>
      <div>
        <label>Datum:</label>
        <input type="date"  />
      </div>
      <div>
        <label>Acute actie vereist:</label>
        <input type="radio" value="ja" /> Ja
        <input type="radio" value="nee" /> Nee
      </div>
      <div>
        <label>Omschrijving:</label>
        <textarea ></textarea>
      </div>
    </div>

    <!-- Voeg hier andere secties toe voor achterstallig onderhoud, technische installaties, en modificaties -->

  </div>
</template>

<script>
export default {
  name: 'InspectieRapport',
  data() {
    return {
      adres: "Adres hier invoeren",
      schade: {
        locatie: "",
        nieuweSchade: "",
        soort: "",
        datum: "",
        acuteActie: "",
        omschrijving: ""
      }
      // Voeg hier andere data-objecten toe voor achterstallig onderhoud, technische installaties, en modificaties
    };
  }
};
</script>

<style scoped>
/* Voeg hier eventuele stijlen toe */
</style>