/**
 * Finnish is the reference dictionary: `sv.ts` and `en.ts` are typed against it,
 * so adding a key here forces the other languages to be updated too.
 */
const fi = {
  'app.name': 'Vihreiden jäsenvaalikone',
  'app.short': 'Jäsenvaalikone',
  'app.subtitle': 'Eduskuntavaalien ehdokasasettelun sisäinen esivaali',

  'nav.home': 'Etusivu',
  'nav.candidates': 'Ehdokkaat',
  'nav.match': 'Löydä ehdokkaasi',
  'nav.answer': 'Ehdokkaalle',

  'lang.label': 'Kieli',
  'lang.fi': 'Suomi',
  'lang.sv': 'Svenska',
  'lang.en': 'English',

  'home.heading': 'Vertaa ehdokkaiden näkemyksiä puolueen sisäisistä kysymyksistä',
  'home.lead':
    'Kaikki esivaalin ehdokkaat vastaavat samaan kymmeneen väittämään. Selaa vastauksia, vertaa ehdokkaita keskenään tai vastaa itse ja katso, kenen kanssa olet samaa mieltä.',
  'home.cta.browse': 'Selaa ehdokkaita',
  'home.cta.match': 'Vastaa väittämiin',
  'home.how.title': 'Näin se toimii',
  'home.how.step1.title': 'Ehdokkaat vastaavat',
  'home.how.step1.body':
    'Jokainen esivaaliin osallistuva ehdokas vastaa samoihin kymmeneen väittämään neliportaisella asteikolla ja voi perustella vastauksensa.',
  'home.how.step2.title': 'Vastaukset kootaan yhteen',
  'home.how.step2.body':
    'Vastaukset esitetään yhdessä näkymässä, jotta niitä voi vertailla väittämä väittämältä ilman selailua ehdokkaiden välillä.',
  'home.how.step3.title': 'Sinä vertaat',
  'home.how.step3.body':
    'Voit myös vastata väittämiin itse. Vaalikone laskee, kuinka lähellä kunkin ehdokkaan näkemykset ovat omiasi.',
  'home.disclaimer':
    'Tulos on suuntaa antava vertailu, ei suositus. Vaalikone ei lähetä vastauksiasi mihinkään palvelimelle.',

  'candidates.title': 'Ehdokkaat',
  'candidates.lead':
    'Selaa ehdokkaita kortteina tai vertaa kaikkien vastauksia kerralla vertailutaulukossa.',
  'candidates.search': 'Hae nimellä',
  'candidates.searchPlaceholder': 'Ehdokkaan nimi',
  'candidates.filter.constituency': 'Vaalipiiri',
  'candidates.filter.all': 'Kaikki vaalipiirit',
  'candidates.view.cards': 'Kortit',
  'candidates.view.matrix': 'Vertailutaulukko',
  'candidates.empty': 'Yksikään ehdokas ei vastaa hakuehtoja.',
  'candidates.count': '{count} ehdokasta',
  'candidates.sort': 'Järjestys',
  'candidates.sort.name': 'Nimi',
  'candidates.sort.constituency': 'Vaalipiiri',
  'candidates.sort.match': 'Vastaavuus kanssasi',
  'candidates.matchHint': 'Vastaa väittämiin nähdäksesi vastaavuuden.',

  'matrix.candidate': 'Ehdokas',
  'matrix.legend': 'Selite',
  'matrix.scrollHint': 'Vieritä sivusuunnassa nähdäksesi kaikki väittämät.',

  'candidate.back': 'Takaisin ehdokkaisiin',
  'candidate.answers': 'Vastaukset väittämiin',
  'candidate.noAnswer': 'Ei vastausta',
  'candidate.comment': 'Ehdokkaan perustelu',
  'candidate.age': 'Ikä',
  'candidate.role': 'Tehtävä',
  'candidate.constituency': 'Vaalipiiri',
  'candidate.links': 'Linkit',
  'candidate.notFound': 'Ehdokasta ei löytynyt.',
  'candidate.answeredCount': 'Vastannut {answered}/{total} väittämään',

  'match.title': 'Löydä ehdokkaasi',
  'match.lead':
    'Vastaa samoihin kymmeneen väittämään kuin ehdokkaat. Voit ohittaa väittämän, jos et halua ottaa siihen kantaa.',
  'match.progress': 'Väittämä {current}/{total}',
  'match.skip': 'Ohita',
  'match.prev': 'Edellinen',
  'match.next': 'Seuraava',
  'match.showResults': 'Näytä tulokset',
  'match.results.title': 'Tuloksesi',
  'match.results.lead': 'Ehdokkaat järjestettynä sen mukaan, kuinka lähellä vastauksesi ovat.',
  'match.restart': 'Aloita alusta',
  'match.editAnswers': 'Muokkaa vastauksiasi',
  'match.agreement': 'vastaavuus',
  'match.noOverlap': 'Ei vertailtavia vastauksia',
  'match.compared': 'Vertailtu {count} väittämää',
  'match.yourAnswer': 'Sinun vastauksesi',
  'match.skipped': 'Ohitettu',
  'match.unanswered': 'Et ole vielä vastannut yhteenkään väittämään.',

  'answer.title': 'Ehdokkaan vastauslomake',
  'answer.lead':
    'Täytä lomake ja toimita syntyvä tiedosto vaalikoneen ylläpidolle. Lomake ei lähetä tietoja automaattisesti mihinkään.',
  'answer.section.info': 'Perustiedot',
  'answer.section.questions': 'Väittämät',
  'answer.section.output': 'Valmis vastaus',
  'answer.name': 'Nimi',
  'answer.constituency': 'Vaalipiiri',
  'answer.age': 'Ikä',
  'answer.role': 'Tehtävä tai ammatti',
  'answer.bio': 'Lyhyt esittely',
  'answer.link': 'Linkki (verkkosivu tai sosiaalinen media)',
  'answer.comment': 'Perustelu',
  'answer.commentPlaceholder': 'Miksi vastasit näin?',
  'answer.generate': 'Luo vastaustiedosto',
  'answer.copy': 'Kopioi leikepöydälle',
  'answer.copied': 'Kopioitu',
  'answer.download': 'Lataa tiedostona',
  'answer.outputHelp':
    'Kopioi alla oleva teksti ja toimita se ylläpidolle, tai lataa se tiedostona ja liitä sähköpostiin.',
  'answer.missingName': 'Täytä nimi.',
  'answer.missingAnswers': 'Vastaa kaikkiin väittämiin ennen lähettämistä.',
  'answer.commentLangNote': 'Perustelut tallennetaan kielellä: {language}',
  'answer.progress': 'Vastattu {answered}/{total}',

  'scale.1': 'Täysin eri mieltä',
  'scale.2': 'Jokseenkin eri mieltä',
  'scale.3': 'Jokseenkin samaa mieltä',
  'scale.4': 'Täysin samaa mieltä',
  'scale.short.1': 'Täysin eri',
  'scale.short.2': 'Jokseenkin eri',
  'scale.short.3': 'Jokseenkin samaa',
  'scale.short.4': 'Täysin samaa',

  'constituency.helsinki': 'Helsinki',
  'constituency.uusimaa': 'Uusimaa',
  'constituency.varsinais-suomi': 'Varsinais-Suomi',
  'constituency.satakunta': 'Satakunta',
  'constituency.hame': 'Häme',
  'constituency.pirkanmaa': 'Pirkanmaa',
  'constituency.kaakkois-suomi': 'Kaakkois-Suomi',
  'constituency.savo-karjala': 'Savo-Karjala',
  'constituency.vaasa': 'Vaasa',
  'constituency.keski-suomi': 'Keski-Suomi',
  'constituency.oulu': 'Oulu',
  'constituency.lappi': 'Lappi',

  'footer.note': 'Sisäisen esivaalin vaalikone. Sisältö on vielä keskeneräinen.',
  'footer.dataNote': 'Ehdokkaiden vastaukset lisätään sitä mukaa kun ne saadaan.',

  'intro.title': 'Jäsenkysely Vihreistä eduskuntavaaliehdokkaista 2026',
  'intro.body':
    'Ehdokkaiden viralliset esittelyt julkaistaan Varsinais-Suomen Vihreiden sivuilla.',
  'intro.cta': 'Avaa ehdokasesittelyt',
  'data.pending':
    'Ehdokkaiden vastauksia väittämiin ei ole vielä julkaistu. Ehdokaslista on ajan tasalla.',

  'common.question': 'Väittämä',
  'common.optional': 'valinnainen',
  'common.skipToContent': 'Siirry sisältöön',
  'notfound.title': 'Sivua ei löytynyt',
  'notfound.body': 'Etsimääsi sivua ei ole olemassa.',
  'notfound.home': 'Palaa etusivulle',
}

export type Strings = typeof fi
export type StringKey = keyof Strings

export default fi
