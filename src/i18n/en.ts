import type { Strings } from './fi'

const en: Strings = {
  'app.name': 'Green Party Member Voting Advice Application',
  'app.short': 'Member VAA',
  'app.subtitle': 'Internal primary for the parliamentary election candidate list',

  'nav.home': 'Home',
  'nav.candidates': 'Candidates',
  'nav.match': 'Find your candidate',
  'nav.answer': 'For candidates',

  'lang.label': 'Language',
  'lang.fi': 'Suomi',
  'lang.sv': 'Svenska',
  'lang.en': 'English',

  'home.heading': 'Compare candidates on the questions that divide the party',
  'home.lead':
    'Every candidate in the primary answers the same ten statements. Browse the answers, compare candidates side by side, or answer yourself and see who you agree with.',
  'home.cta.browse': 'Browse candidates',
  'home.cta.match': 'Answer the statements',
  'home.how.title': 'How it works',
  'home.how.step1.title': 'Candidates answer',
  'home.how.step1.body':
    'Every candidate standing in the primary answers the same ten statements on a four-point scale and may explain their reasoning.',
  'home.how.step2.title': 'Answers are collated',
  'home.how.step2.body':
    'All answers appear in one view, so they can be compared statement by statement without clicking through candidate profiles.',
  'home.how.step3.title': 'You compare',
  'home.how.step3.body':
    'You can also answer the statements yourself. The tool then calculates how close each candidate is to your own views.',
  'home.disclaimer':
    'The result is an indicative comparison, not a recommendation. Your answers are never sent to a server.',

  'candidates.title': 'Candidates',
  'candidates.lead':
    'Browse candidates as cards, or compare everyone at once in the comparison table.',
  'candidates.search': 'Search by name',
  'candidates.searchPlaceholder': 'Candidate name',
  'candidates.filter.constituency': 'Constituency',
  'candidates.filter.all': 'All constituencies',
  'candidates.view.cards': 'Cards',
  'candidates.view.matrix': 'Comparison table',
  'candidates.empty': 'No candidate matches your search.',
  'candidates.count': '{count} candidates',
  'candidates.sort': 'Sort by',
  'candidates.sort.name': 'Name',
  'candidates.sort.constituency': 'Constituency',
  'candidates.sort.match': 'Agreement with you',
  'candidates.matchHint': 'Answer the statements to see your agreement.',

  'matrix.candidate': 'Candidate',
  'matrix.legend': 'Legend',
  'matrix.scrollHint': 'Scroll sideways to see all statements.',

  'candidate.back': 'Back to candidates',
  'candidate.answers': 'Answers to the statements',
  'candidate.noAnswer': 'No answer',
  'candidate.comment': 'Candidate reasoning',
  'candidate.age': 'Age',
  'candidate.role': 'Role',
  'candidate.constituency': 'Constituency',
  'candidate.links': 'Links',
  'candidate.notFound': 'Candidate not found.',
  'candidate.answeredCount': 'Answered {answered}/{total} statements',

  'match.title': 'Find your candidate',
  'match.lead':
    'Answer the same ten statements as the candidates. You can skip a statement if you would rather not take a position.',
  'match.progress': 'Statement {current}/{total}',
  'match.skip': 'Skip',
  'match.prev': 'Previous',
  'match.next': 'Next',
  'match.showResults': 'Show results',
  'match.results.title': 'Your results',
  'match.results.lead': 'Candidates ranked by how closely they match your answers.',
  'match.restart': 'Start over',
  'match.editAnswers': 'Edit your answers',
  'match.agreement': 'agreement',
  'match.noOverlap': 'No comparable answers',
  'match.compared': '{count} statements compared',
  'match.yourAnswer': 'Your answer',
  'match.skipped': 'Skipped',
  'match.unanswered': 'You have not answered any statements yet.',

  'answer.title': 'Candidate answer form',
  'answer.lead':
    'Fill in the form and send the generated file to the people running the tool. The form does not submit anything automatically.',
  'answer.section.info': 'Basic details',
  'answer.section.questions': 'Statements',
  'answer.section.output': 'Finished answer',
  'answer.name': 'Name',
  'answer.constituency': 'Constituency',
  'answer.age': 'Age',
  'answer.role': 'Role or occupation',
  'answer.bio': 'Short introduction',
  'answer.link': 'Link (website or social media)',
  'answer.comment': 'Reasoning',
  'answer.commentPlaceholder': 'Why did you answer this way?',
  'answer.generate': 'Generate answer file',
  'answer.copy': 'Copy to clipboard',
  'answer.copied': 'Copied',
  'answer.download': 'Download as a file',
  'answer.outputHelp':
    'Copy the text below and send it to the organisers, or download it as a file and attach it to an email.',
  'answer.missingName': 'Please fill in your name.',
  'answer.missingAnswers': 'Answer every statement before submitting.',
  'answer.commentLangNote': 'Reasoning is stored in this language: {language}',
  'answer.progress': 'Answered {answered}/{total}',

  'scale.1': 'Strongly disagree',
  'scale.2': 'Somewhat disagree',
  'scale.3': 'Somewhat agree',
  'scale.4': 'Strongly agree',
  'scale.short.1': 'Strongly disagree',
  'scale.short.2': 'Somewhat disagree',
  'scale.short.3': 'Somewhat agree',
  'scale.short.4': 'Strongly agree',

  'constituency.helsinki': 'Helsinki',
  'constituency.uusimaa': 'Uusimaa',
  'constituency.varsinais-suomi': 'Finland Proper',
  'constituency.satakunta': 'Satakunta',
  'constituency.hame': 'Häme',
  'constituency.pirkanmaa': 'Pirkanmaa',
  'constituency.kaakkois-suomi': 'South-East Finland',
  'constituency.savo-karjala': 'Savonia-Karelia',
  'constituency.vaasa': 'Vaasa',
  'constituency.keski-suomi': 'Central Finland',
  'constituency.oulu': 'Oulu',
  'constituency.lappi': 'Lapland',

  'footer.note': 'Voting advice application for the internal primary. Content is still a draft.',
  'footer.dataNote': 'Candidate answers are added as they come in.',

  'intro.title': 'Jäsenkysely Vihreistä eduskuntavaaliehdokkaista 2026',
  'intro.body':
    'The official candidate introductions are published on the Varsinais-Suomi Greens website.',
  'intro.cta': 'Open the candidate introductions',
  'data.pending':
    'Candidate answers to the statements have not been published yet. The candidate list is up to date.',

  'common.question': 'Statement',
  'common.optional': 'optional',
  'common.skipToContent': 'Skip to content',
  'notfound.title': 'Page not found',
  'notfound.body': 'The page you are looking for does not exist.',
  'notfound.home': 'Return to the home page',
}

export default en
