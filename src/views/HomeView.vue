<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row>
      <v-col>
        <router-link to="/toegewezen-rapportages">
          <v-card class="mx-auto" hover>
            <v-card-item>
              <v-badge offset-y="1px" color="red">
                <template v-slot:badge>
                  <span>{{ badgeCount }}</span>
                </template>
                <v-icon size="60">mdi-file-outline</v-icon>
              </v-badge>
              <v-card-title>Toegewezen rapportages</v-card-title>
            </v-card-item>
            <v-card-text>
              Hier vind je de aan jou toegewezen rapportages.
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-link to="/uitgevoerde-rapportages">
          <v-card class="mx-auto" hover>
            <v-card-item>
              <v-icon size="60">mdi-file-check-outline</v-icon>
              <v-card-title>Uitgevoerde rapportages</v-card-title>
            </v-card-item>
            <v-card-text>
              Hier kun je de reeds uitgevoerde rapportages inzien en aanpassen.
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-link to="/documentatie">
          <v-card class="mx-auto" hover>
            <v-card-item>
              <v-icon size="60">mdi-text-box-search-outline</v-icon>
              <v-card-title>Documentatie</v-card-title>
            </v-card-item>
            <v-card-text>
              Kom je ergens niet uit? Hier vind je alle documentatie.
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-link to="/instellingen">
          <v-card class="mx-auto" hover>
            <v-card-item>
              <v-icon size="60">mdi-cog</v-icon>
              <v-card-title>Instellingen</v-card-title>
            </v-card-item>
            <v-card-text>
              Hier kun je jouw account- en app instellingen beheren.
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAppStore } from '@/stores/store';

export default {
  created() {
    const store = useAppStore();
    store.fetchInspections();
    store.fetchOptions();
  },
  computed: {
    badgeCount() {
      const store = useAppStore();
      const filteredInspections = store.inspections.filter(inspection => inspection.new_inspection === true);
      return filteredInspections.length;
    }
  }
}
</script>

<style scoped>
.rec-logo {
  width: 100%;
  max-width: 222px;
  display: flex;
  margin: 30px auto;
}
.v-icon {
  display: flex;
  margin: auto;
  color: rgb(var(--v-theme-primary));
}
.v-badge {
  display: flex;
  justify-content: center;
}
.v-card-text {
  text-align: center;
  padding: 0 25px 25px 25px;
  color: rgb(var(--v-theme-secondary));
}
</style>