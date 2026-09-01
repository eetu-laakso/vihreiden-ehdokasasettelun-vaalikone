import type { Question } from '../types'

/**
 * The ten intraparty statements, in the wordings supplied by the organisers.
 *
 * Rules when editing:
 *  - Keep the `id` values (`q01`...`q10`) stable. Candidate answers in
 *    `candidates.json` are keyed by these ids, so renaming an id silently
 *    orphans every existing answer.
 *  - Every statement must exist in all three languages, and must be worded so
 *    that "strongly agree" is the same direction of opinion in each: the
 *    comparison views assume 1 = disagree ... 4 = agree.
 *  - `info` is optional background shown under the statement in smaller text.
 */
export const questions: Question[] = [
  {
    id: 'q01',
    text: {
      fi: 'Valtion tulisi tukea pienydinvoimaloiden (SMR) rakentamista, vaikka samalla rahalla saataisiin samassa ajassa enemmän päästövähennyksiä tuulivoimasta ja sähkövarastoista.',
      sv: 'Staten borde stödja byggandet av små modulära reaktorer (SMR), även om samma pengar under samma tid skulle ge större utsläppsminskningar genom vindkraft och ellagring.',
      en: 'The state should subsidise small modular reactors, even though the same money spent on wind and storage would cut more emissions per euro in the same timeframe.',
    },
  },
  {
    id: 'q02',
    text: {
      fi: 'Suomen talouspolitiikan tavoitteena tulisi olla materiaalisen kulutuksen vähentäminen, vaikka se hidastaisi talouskasvua.',
      sv: 'Målet för Finlands ekonomiska politik borde vara att minska den materiella konsumtionen, även om det bromsar den ekonomiska tillväxten.',
      en: 'Finnish economic policy should aim to reduce total material consumption even at the cost of slower GDP growth.',
    },
  },
  {
    id: 'q03',
    text: {
      fi: 'Vihreiden tulisi olla valmis menemään kokoomuksen johtamaan hallitukseen vuonna 2027, jos ilmasto- ja luontotavoitteet turvataan hallitusohjelmassa.',
      sv: 'De Gröna borde vara beredda att gå med i en regering ledd av Samlingspartiet år 2027, om klimat- och naturmålen tryggas i regeringsprogrammet.',
      en: 'The Greens should be willing to join a Kokoomus-led government in 2027 if climate and nature goals are secured in the programme.',
    },
  },
  {
    id: 'q04',
    text: {
      fi: 'Vihreiden tulisi sitoutua velkajarrun mukaiseen menokuriin sen sijaan, että puolue lupaisi uutta velanottoa vihreisiin investointeihin.',
      sv: 'De Gröna borde förbinda sig till utgiftsdisciplinen enligt skuldbromsen i stället för att lova ny upplåning för gröna investeringar.',
      en: "The Greens should hold to the debt brake's spending discipline rather than promise new borrowing for green investment.",
    },
  },
  {
    id: 'q05',
    text: {
      fi: 'Asuntoja tulisi rakentaa myös nykyisille viheralueille, jos vaihtoehtona on kasvun ohjautuminen autoriippuvaisiin kehyskuntiin.',
      sv: 'Bostäder borde byggas också på nuvarande grönområden, om alternativet är att tillväxten styrs till bilberoende kranskommuner.',
      en: 'Housing should be built on currently green sites when the alternative is that growth spills into car-dependent commuter municipalities.',
    },
  },
  {
    id: 'q06',
    text: {
      fi: 'Akkumineraalien kaivostoiminta Lapissa tulisi sallia silloin, kun se merkittävästi edistää energiamurrosta, myös vastoin paikallisten asukkaiden ja saamelaiskäräjien kantaa.',
      sv: 'Gruvdrift för batterimineraler i Lappland borde tillåtas när den märkbart främjar energiomställningen, också mot lokalbefolkningens och Sametingets ståndpunkt.',
      en: 'Battery mineral mining in Lapland should be permitted where it materially advances the energy transition, even over the objections of local residents and the Sámi Parliament.',
    },
  },
  {
    id: 'q07',
    text: {
      fi: 'Palautuskiellon periaatetta tulisi noudattaa poikkeuksetta myös silloin, kun itärajalla on käynnissä vieraan valtion järjestämä maahantulo.',
      sv: 'Principen om non-refoulement borde följas utan undantag också när det pågår inresa som organiseras av en främmande stat vid östgränsen.',
      en: 'In a migration crisis organised by a foreign state at the eastern border, Finland must apply the principle of non-refoulement without exception.',
    },
  },
  {
    id: 'q08',
    text: {
      fi: 'Puolustusmenojen kasvattamista tulisi jatkaa myös silloin, kun se on pois ilmasto- ja sosiaalimenoista.',
      sv: 'Försvarsutgifterna borde fortsätta att öka också när det sker på bekostnad av klimat- och socialutgifterna.',
      en: 'Continued increases in defence spending should be accepted even when they crowd out climate and social spending.',
    },
  },
  {
    id: 'q09',
    text: {
      fi: 'Puolueen tulisi profiloitua vaaleissa ensisijaisesti ilmasto- ja luontokysymyksillä ja antaa yhdenvertaisuus- ja vähemmistöteemoille pienempi rooli julkisuudessa.',
      sv: 'Partiet borde i valet profilera sig främst genom klimat- och naturfrågor och ge likabehandlings- och minoritetsteman en mindre roll offentligt.',
      en: 'The party should campaign primarily on climate and nature, and give equality and minority-rights themes a smaller role in its public profile.',
    },
  },
  {
    id: 'q10',
    text: {
      fi: 'Kotieläintuotannon tukia tulisi leikata voimakkaasti ja tuki siirtää kasvituotantoon, vaikka se lopettaisi merkittävän osan maatiloista.',
      sv: 'Stöden till husdjursproduktionen borde skäras ner kraftigt och överföras till växtproduktionen, även om det skulle lägga ner en betydande del av gårdarna.',
      en: 'Livestock subsidies should be cut sharply and redirected to plant production, even if many farms cease operating as a result.',
    },
  },
]

export const questionCount = questions.length

export function getQuestion(id: string): Question | undefined {
  return questions.find((question) => question.id === id)
}
