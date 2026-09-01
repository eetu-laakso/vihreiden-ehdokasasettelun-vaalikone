import type { Strings } from './fi'

const sv: Strings = {
  'app.name': 'De Grönas medlemsvalkompass',
  'app.short': 'Medlemsvalkompass',
  'app.subtitle': 'Internt primärval inför riksdagsvalet',

  'nav.home': 'Startsida',
  'nav.candidates': 'Kandidater',
  'nav.match': 'Hitta din kandidat',
  'nav.answer': 'För kandidater',

  'lang.label': 'Språk',
  'lang.fi': 'Suomi',
  'lang.sv': 'Svenska',
  'lang.en': 'English',

  'home.heading': 'Jämför kandidaternas syn på partiets interna frågor',
  'home.lead':
    'Alla kandidater i primärvalet svarar på samma tio påståenden. Bläddra bland svaren, jämför kandidater med varandra eller svara själv och se vem du håller med.',
  'home.cta.browse': 'Bläddra bland kandidater',
  'home.cta.match': 'Svara på påståendena',
  'home.how.title': 'Så fungerar det',
  'home.how.step1.title': 'Kandidaterna svarar',
  'home.how.step1.body':
    'Varje kandidat i primärvalet svarar på samma tio påståenden på en fyrgradig skala och kan motivera sina svar.',
  'home.how.step2.title': 'Svaren samlas på ett ställe',
  'home.how.step2.body':
    'Svaren visas i en och samma vy så att de kan jämföras påstående för påstående utan att bläddra mellan kandidater.',
  'home.how.step3.title': 'Du jämför',
  'home.how.step3.body':
    'Du kan också svara på påståendena själv. Valkompassen räknar ut hur nära varje kandidats åsikter ligger dina egna.',
  'home.disclaimer':
    'Resultatet är en riktgivande jämförelse, inte en rekommendation. Valkompassen skickar inte dina svar till någon server.',

  'candidates.title': 'Kandidater',
  'candidates.lead':
    'Bläddra bland kandidaterna som kort eller jämför allas svar på en gång i jämförelsetabellen.',
  'candidates.search': 'Sök på namn',
  'candidates.searchPlaceholder': 'Kandidatens namn',
  'candidates.filter.constituency': 'Valkrets',
  'candidates.filter.all': 'Alla valkretsar',
  'candidates.view.cards': 'Kort',
  'candidates.view.matrix': 'Jämförelsetabell',
  'candidates.empty': 'Ingen kandidat matchar sökningen.',
  'candidates.count': '{count} kandidater',
  'candidates.sort': 'Ordning',
  'candidates.sort.name': 'Namn',
  'candidates.sort.constituency': 'Valkrets',
  'candidates.sort.match': 'Överensstämmelse med dig',
  'candidates.matchHint': 'Svara på påståendena för att se överensstämmelsen.',

  'matrix.candidate': 'Kandidat',
  'matrix.legend': 'Teckenförklaring',
  'matrix.scrollHint': 'Skrolla i sidled för att se alla påståenden.',

  'candidate.back': 'Tillbaka till kandidaterna',
  'candidate.answers': 'Svar på påståendena',
  'candidate.noAnswer': 'Inget svar',
  'candidate.comment': 'Kandidatens motivering',
  'candidate.age': 'Ålder',
  'candidate.role': 'Uppdrag',
  'candidate.constituency': 'Valkrets',
  'candidate.links': 'Länkar',
  'candidate.notFound': 'Kandidaten hittades inte.',
  'candidate.answeredCount': 'Har svarat på {answered}/{total} påståenden',

  'match.title': 'Hitta din kandidat',
  'match.lead':
    'Svara på samma tio påståenden som kandidaterna. Du kan hoppa över ett påstående om du inte vill ta ställning.',
  'match.progress': 'Påstående {current}/{total}',
  'match.skip': 'Hoppa över',
  'match.prev': 'Föregående',
  'match.next': 'Nästa',
  'match.showResults': 'Visa resultat',
  'match.results.title': 'Ditt resultat',
  'match.results.lead': 'Kandidaterna ordnade efter hur nära dina svar de ligger.',
  'match.restart': 'Börja om',
  'match.editAnswers': 'Ändra dina svar',
  'match.agreement': 'överensstämmelse',
  'match.noOverlap': 'Inga jämförbara svar',
  'match.compared': '{count} påståenden jämförda',
  'match.yourAnswer': 'Ditt svar',
  'match.skipped': 'Överhoppad',
  'match.unanswered': 'Du har ännu inte svarat på något påstående.',

  'answer.title': 'Svarsformulär för kandidater',
  'answer.lead':
    'Fyll i formuläret och skicka den genererade filen till valkompassens administratörer. Formuläret skickar ingenting automatiskt.',
  'answer.section.info': 'Grunduppgifter',
  'answer.section.questions': 'Påståenden',
  'answer.section.output': 'Färdigt svar',
  'answer.name': 'Namn',
  'answer.constituency': 'Valkrets',
  'answer.age': 'Ålder',
  'answer.role': 'Uppdrag eller yrke',
  'answer.bio': 'Kort presentation',
  'answer.link': 'Länk (webbplats eller sociala medier)',
  'answer.comment': 'Motivering',
  'answer.commentPlaceholder': 'Varför svarade du så här?',
  'answer.generate': 'Skapa svarsfil',
  'answer.copy': 'Kopiera till urklipp',
  'answer.copied': 'Kopierat',
  'answer.download': 'Ladda ner som fil',
  'answer.outputHelp':
    'Kopiera texten nedan och skicka den till administratörerna, eller ladda ner den som fil och bifoga i ett e-postmeddelande.',
  'answer.missingName': 'Fyll i namnet.',
  'answer.missingAnswers': 'Svara på alla påståenden innan du skickar.',
  'answer.commentLangNote': 'Motiveringarna sparas på språket: {language}',
  'answer.progress': 'Besvarade {answered}/{total}',

  'scale.1': 'Helt av annan åsikt',
  'scale.2': 'Delvis av annan åsikt',
  'scale.3': 'Delvis av samma åsikt',
  'scale.4': 'Helt av samma åsikt',
  'scale.short.1': 'Helt emot',
  'scale.short.2': 'Delvis emot',
  'scale.short.3': 'Delvis för',
  'scale.short.4': 'Helt för',

  'constituency.helsinki': 'Helsingfors',
  'constituency.uusimaa': 'Nyland',
  'constituency.varsinais-suomi': 'Egentliga Finland',
  'constituency.satakunta': 'Satakunta',
  'constituency.hame': 'Tavastland',
  'constituency.pirkanmaa': 'Birkaland',
  'constituency.kaakkois-suomi': 'Sydöstra Finland',
  'constituency.savo-karjala': 'Savolax-Karelen',
  'constituency.vaasa': 'Vasa',
  'constituency.keski-suomi': 'Mellersta Finland',
  'constituency.oulu': 'Uleåborg',
  'constituency.lappi': 'Lappland',

  'footer.note': 'Valkompass för det interna primärvalet. Innehållet är ännu ofullständigt.',
  'footer.dataNote': 'Kandidaternas svar läggs till efter hand som de kommer in.',

  'intro.title': 'Jäsenkysely Vihreistä eduskuntavaaliehdokkaista 2026',
  'intro.body':
    'Kandidaternas officiella presentationer publiceras på Egentliga Finlands Grönas webbplats.',
  'intro.cta': 'Öppna kandidatpresentationerna',
  'data.pending':
    'Kandidaternas svar på påståendena har ännu inte publicerats. Kandidatlistan är uppdaterad.',

  'common.question': 'Påstående',
  'common.optional': 'valfritt',
  'common.skipToContent': 'Hoppa till innehållet',
  'notfound.title': 'Sidan hittades inte',
  'notfound.body': 'Sidan du söker finns inte.',
  'notfound.home': 'Tillbaka till startsidan',
}

export default sv
