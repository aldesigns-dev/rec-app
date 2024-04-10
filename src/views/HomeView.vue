<template>
  <div class="home">
    <!-- <img :src="require('@/assets/rec-logo-icon-top.png')" alt="Real Estate Care logo" class="rec-logo"> -->
    <h1>Dashboard</h1>

    <v-container>

      <div class="v-card-container">
        <v-col>
          <router-link to="/toegewezen-rapportages">
            <v-card class="mx-auto" hover>
              <v-card-item>
                <v-badge offset-y="1px" color="red">
                  <template v-slot:badge>
                    <span>{{ badgeCount }}</span>
                  </template>
                  <v-icon color="rec-secondary" size="60">mdi-file-outline</v-icon>
                </v-badge>
                <v-card-title>
                  Toegewezen rapportages
                </v-card-title>
              </v-card-item>
              <v-card-text>
                Hier vind je de aan jou toegewezen rapportages.
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </div>
    
      <div class="v-card-container">
        <v-col>
          <router-link to="/uitgevoerde-rapportages">
            <v-card class="mx-auto" hover>
              <v-card-item>
                <v-icon color="rec-secondary" size="60">mdi-file-check-outline</v-icon>
                <v-card-title>
                  Uitgevoerde rapportages
                </v-card-title>
              </v-card-item>
              <v-card-text>
                Hier kun je de reeds uitgevoerde rapportages inzien en aanpassen.
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </div>
    
      <div class="v-card-container">
        <v-col>
          <router-link to="/documentatie">
            <v-card class="mx-auto" hover>
              <v-card-item>
                <v-icon color="rec-secondary" size="60">mdi-text-box-search-outline</v-icon>
                <v-card-title>
                  Documentatie
                </v-card-title>
              </v-card-item>
              <v-card-text>
                Kom je ergens niet uit? Hier vind je alle documentatie.
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </div>
    
      <div class="v-card-container">
        <v-col>
          <router-link to="/instellingen">
            <v-card class="mx-auto" hover>
              <v-card-item>
                <v-icon color="rec-secondary" size="60">mdi-cog</v-icon>
                <v-card-title>
                  Instellingen
                </v-card-title>
              </v-card-item>
              <v-card-text>
                Hier kun je jouw account- en app instellingen beheren.
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </div>

    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      badgeCount: 2 // Dynamisch getal voor de badge
    };
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
.v-container {
  background-color: rgb(var(--v-theme-rec-secondary));
  border-radius: 40px 40px 0 0;
}
.v-card-container {
  display: flex;
  justify-content: center;
  margin: 30px auto;
}
.v-card-container col {
  flex: 1;
}
.v-col {
  padding: 0 20px;
  margin: 0 5%;
}
.v-card {
  width: 100%;
  border-radius: 15px;
}
.v-card-item {
  padding: 25px 25px 10px 25px;
}
.v-badge {
  display: flex;
  justify-content: center;
}
.v-card-text {
  text-align: center;
  padding: 0 25px 25px 25px;
}
.v-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.25px;
  text-align: center;
  white-space: normal;
  color: rgb(var(--v-theme-rec-secondary));
}
.v-icon {
  display: flex;
  margin: auto;
}
</style>