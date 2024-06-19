<template>
  <v-container>
    <h1>Documentatie</h1>
    <CollapsibleSection title="Schade opnemen">
      <v-card class="documentatie-card">
        <v-list>
          <v-list-item>
            <v-list-item-title>1. Voorbereiding:</v-list-item-title>
            <ul>
              <li>Verzamel de benodigde informatie zoals eerdere inspectierapporten en onderhoudsgegevens.</li>
              <li>Zorg voor de juiste apparatuur zoals een camera en meetinstrumenten.</li>
            </ul>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>2. Inspectie:</v-list-item-title>
            <ul>
              <li>Voer een grondige visuele inspectie uit van het betreffende object.</li>
              <li>Noteer alle zichtbare schade, inclusief locatie, omvang en mogelijke oorzaken.</li>
              <li>Maak gedetailleerde foto&apos;s en schetsen van de schade.</li>
            </ul>
          </v-list-item>
          <v-list-item>
          <v-list-item-title>3. Rapportage:</v-list-item-title>
            <ul>
              <li>Documenteer de bevindingen in een schadeverslag.</li>
              <li>Geef aanbevelingen voor reparatie of verdere actie.</li>
            </ul>
          </v-list-item>
        </v-list>
      </v-card>
    </CollapsibleSection>
    <CollapsibleSection title="Achterstallig onderhoud opnemen">
      <v-card class="documentatie-card">
        <v-list>
          <v-list-item>
            <v-list-item-title>1. Voorbereiding:</v-list-item-title>
            <ul>
              <li>Verzamel de benodigde informatie zoals eerdere inspectierapporten en onderhoudsgegevens.</li>
              <li>Zorg voor de juiste apparatuur zoals een camera en meetinstrumenten.</li>
            </ul>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>2. Inspectie:</v-list-item-title>
            <ul>
              <li>Controleer de staat van alle onderdelen en systemen die regelmatig onderhoud vereisen.</li>
              <li>Noteer alle achterstallige onderhoudstaken en de huidige staat van het betreffende onderdeel.</li>
            </ul>
          </v-list-item>
          <v-list-item>
          <v-list-item-title>3. Rapportage:</v-list-item-title>
            <ul>
              <li>Documenteer elk geval van achterstallig onderhoud met gedetailleerde beschrijvingen en eventuele gevolgen.</li>
              <li>Voeg ondersteunende foto&apos;s en documenten toe.</li>
            </ul>
          </v-list-item>
        </v-list>
      </v-card>
    </CollapsibleSection>
    <CollapsibleSection title="Technische installaties inspecteren">
      <v-card class="documentatie-card">
        <v-list>
          <v-list-item>
            <v-list-item-title>1. Voorbereiding:</v-list-item-title>
            <ul>
              <li>Bestudeer de technische documentatie van de installaties.</li>
              <li>Bereid de benodigde gereedschappen en meetinstrumenten voor.</li>
            </ul>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>2. Inspectie:</v-list-item-title>
            <ul>
              <li>Controleer de installaties op zichtbare gebreken, slijtage en veiligheidsrisico's.</li>
              <li>Noteer eventuele afwijkingen en defecten.</li>
            </ul>
          </v-list-item>
          <v-list-item>
          <v-list-item-title>3. Functionele Testen:</v-list-item-title>
            <ul>
              <li>Voer operationele tests uit om de werking van de installaties te verifiëren.</li>
              <li>Gebruik meetinstrumenten om de prestaties te meten en te vergelijken met de specificaties.</li>
            </ul>
          </v-list-item>
          <v-list-item>
          <v-list-item-title>4. Rapportage:</v-list-item-title>
            <ul>
              <li>Documenteer de bevindingen, inclusief meetresultaten en eventuele tekortkomingen.</li>
              <li>Voeg foto&apos;s, grafieken en schema&apos;s toe voor verduidelijking.</li>
            </ul>
          </v-list-item>
        </v-list>
      </v-card>
    </CollapsibleSection>
    <CollapsibleSection title="Modificaties Inventariseren">
      <v-card class="documentatie-card">
        <v-list>
          <v-list-item>
            <v-list-item-title>1. Voorbereiding:</v-list-item-title>
            <ul>
              <li>Verzamel alle beschikbare documentatie over eerdere modificaties.</li>
              <li>Bereid een inventarisatieformulier voor.</li>
            </ul>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>2. Inspectie:</v-list-item-title>
            <ul>
              <li>Bezoek de locatie en inspecteer de fysieke installaties.</li>
              <li>Noteer alle waargenomen modificaties, inclusief niet gedocumenteerde wijzigingen.</li>
            </ul>
          </v-list-item>
          <v-list-item>
          <v-list-item-title>3. Documentatie:</v-list-item-title>
            <ul>
              <li>Leg de aard van elke modificatie vast, inclusief datum, uitvoerder en doel.</li>
              <li>Maak foto&apos;s en tekeningen van de gewijzigde onderdelen.</li>
            </ul>
          </v-list-item>
          <v-list-item>
          <v-list-item-title>4. Rapportage:</v-list-item-title>
            <ul>
              <li>Documenteer alle bevindingen in een gedetailleerd rapport.</li>
              <li>Adviseer over eventuele aanvullende aanpassingen of correcties.</li>
            </ul>
          </v-list-item>
        </v-list>
      </v-card>
    </CollapsibleSection>
  </v-container>
</template>

<script>
import CollapsibleSection from '@/components/CollapsibleSection.vue'

export default {
  name: 'DocumentatieView',
  components: {
    CollapsibleSection,
  },
}
</script>

<style scoped>
.documentatie-card {
  margin-bottom: 15px;
  margin-top: -12px;
  padding-top: 0;
  padding-bottom: 10px;
}
.v-list-item {
  padding-inline: 0;
}
.v-list-item-title {
  color: rgb(var(--v-theme-primary));
  font-size: 0.9rem;
  font-weight: 500;
  padding-right: 5px;
}
.v-list-item ul li {
  font-size: 0.9rem;
}
</style>