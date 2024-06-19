# Real Estate Care app

## Over het project
Voor een dienstverlenende organisatie die in opdracht woningcorporaties woningen onderhoudt, heb ik een demo-applicatie gemaakt voor inspecteurs die op locatie panden kunnen inspecteren. De applicatie is gebouwd met Vue.js en maakt gebruik van Vuetify voor UI-componenten en Pinia voor state management. De app biedt functies zoals aanmelden, inloggen, wachtwoord wijzigen, avatar selectie, thema toggle, en het beheren van inspectierapporten. Hieronder worden enkele technische details en designkeuzes toegelicht.

### 1. Integratie van Design Patterns
De applicatie maakt gebruik van het Model-View-Controller (MVC) design pattern om functionaliteit en data gescheiden en gestructureerd te houden. Zowel het `store.js` bestand als de `firebaseService.js` service implementeren het Singleton Design Pattern om een enkele, gedeelde instantie te bieden voor state management en data-interacties via Firebase.

### 2. Gebruik van Custom en Bibliotheek Componenten
Er zijn custom webcomponents ontwikkeld zoals `CollapsibleSection.vue`, en integratie van componenten uit de Vuetify bibliotheek zoals `NavBar.vue`. 

### 3. Asynchroon Programmeren
De applicatie maakt gebruik van asynchrone JavaScript-functies zoals de Firebase SDK om data op te halen en te verwerken. Dit is te zien in het bestand `firebaseService.js` waar asynchrone operaties worden uitgevoerd voor data-interacties met Firebase.

### 4. Gebruik van JSON en Web API's
JSON wordt gebruikt om data te structureren en via Web API's uit te wisselen. De applicatie haalt en verzendt gegevens in JSON-formaat, wat zorgt voor een efficiënte en gestandaardiseerde data-uitwisseling.

### 5. Routing en State Management
Routing wordt beheerd via Vue Router (`router/index.js`) om een naadloze navigatie-ervaring te bieden. State management wordt verzorgd door Pinia (`store.js`), wat helpt bij het beheren van de applicatie-state op een consistente en voorspelbare manier.

### 6. Beveiliging, Accessibility en Usability
De applicatie volgt best practices en richtlijnen voor beveiliging, accessibility en usability:
- **Beveiliging**: Implementatie van OWASP-richtlijnen om veelvoorkomende beveiligingsrisico's te minimaliseren. Hieronder een aantal toegepaste voorbeelden.
Broken Access Control:
Een gebruiker heeft pas toegang tot inspectierapporten (en accountgegevens) nadat de gebruiker succesvol een account heeft gecreëerd en is ingelogd.
Injection:
In bijvoorbeeld `SignUpForm.vue` zijn e-mail- en wachtwoordvereisten toegepast en is een verificatiecode vereist. Firebase Authentication, Firestore Database en Firebase Storage zorgen automatisch voor encryptie van gegevens. Daarbij zijn er regels toegepast voor de storage en database.
Security Misconfiguration:
Gevoelige gegevens zoals API-sleutels van de Firebase configuratie zijn niet in de broncode opgenomen maar in een `.env` bestand zodat het risico verminderd wordt dat deze gegevens onbedoeld worden blootgesteld.
- **Accessibility**: Naleving van WCAG 2.1 A richtlijnen om de toegankelijkheid voor alle gebruikers te waarborgen. Hieronder een aantal toegepaste voorbeelden.
Waarneembaar:
Alternatieve tekst voor afbeeldingen en makkelijk te lezen tekst.
Bedienbaar:
Interactieve elementen zijn gemakkelijk te bedienen. 
Begrijpelijk:
Duidelijke navigatie en instructies voor de gebruiker toegepast bij o.a. het invullen van formulieren.
Robuust:
Compatibiliteit met meerdere browsers en devices.
- **Usability**: Gebruik van best practices en style guides voor Vue.js en Vuetify om een intuïtieve en gebruiksvriendelijke interface te bieden. Hieronder een aantal toegepaste voorbeelden.
- Gebruik van Vue.js en Vuetify-componenten volgens de best practices om consistentie in de gebruikersinterface te waarborgen.
- Gebruik van een consistent kleurenpalet, typografie en spacing om visuele coherentie te bereiken.
- Consistent gebruik van v-container, v-row, v-col, v-btn etc.
- Consistent gebruik van v-for met :key.
- Consistent gebruik van kebab-case voor events.
- Consistent gebruik van PascalCase voor componenten.

### 7. Error Handling
De applicatie implementeert uitgebreide error handling om om gebruikers een betrouwbare ervaring te bieden en ontwikkelaars te helpen bij het oplossen van problemen. Hier zijn enkele aspecten van de error handling:
- **Store (`store.js`)**: Alle acties in de store maken gebruik van `try-catch` blokken om fouten af te vangen tijdens interacties met de Firebase service. Dit zorgt ervoor dat eventuele fouten die optreden tijdens het uitvoeren van taken zoals het aanmaken van gebruikers, ophalen van gegevens, etc., correct worden afgehandeld en gelogd voor verdere analyse.
- **Firebase Service (`firebaseService.js`)**: De service methoden gebruiken ook `try-catch` blokken om errors te vangen die kunnen optreden bij het uitvoeren van Firebase operaties. Hiermee worden potentiële issues zoals ongeldige gegevensverzoeken of serverfouten, effectief afgevangen en gelogd.
-**Gebruikersinteracties**: In de gebruikersinterface zijn er ook meldingen en validaties ingebouwd om gebruikers te informeren over fouten die kunnen optreden tijdens het gebruik van de applicatie. Bijvoorbeeld bij het invullen van formulieren worden gebruikers geïnformeerd over verplichte velden die moeten worden ingevuld voordat een actie kan worden uitgevoerd. Dit helpt gebruikers om correcte gegevens in te voeren en vermindert potentieel verwarrende situaties.

### 8. Overige toelichting functionaliteiten
-**Aanmelden**: Voordat je gebruik kunt maken van de diensten van deze app zul je een account moeten aanmaken. Het is een demo-applicatie dus er wordt GEEN e-mail verstuurd naar de gebruiker.
- **Instellingen**: Op dit scherm zijn de accountgegevens en instellingen zichtbaar. Hier kan de gebruiker een avatar kiezen, licht/donker modus inschakelen, geluiden aan- en uitzetten en het wachtwoord wijzigen.
- **Inspectierapporten**: Inspecteurs kunnen toegewezen inspectierapporten openen en stapsgewijs invullen. Om de lijst met toegewezen rapportages aan te vullen heb ik een optie gecreëerd om een inspectierapport aan te maken. Op de pagina `toegewezen-rapportages` worden nieuwe inspectierapporten gemarkeerd met een vlag "new_inspection: true". Na invulling en opslag wordt deze vlag omgezet naar "new_inspection: false", waardoor het rapport alleen zichtbaar wordt in de lijst van `uitgevoerde-rapportages`. Als je een ingevuld rapport leegmaakt, wordt de vlag opnieuw ingesteld op "new_inspection: true" bij opslag, waardoor het terugkeert naar de lijst van toegewezen rapporten. Een insepctierapport kan niet worden verwijderd door de inspecteur. Deze taak/verantwoordelijkheid ligt elders in het bedrijfsproces.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
