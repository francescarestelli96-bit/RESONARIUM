'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type SectionKey = 'home' | 'chi-siamo' | 'vision' | 'attivita' | 'contatti';
type Language = 'it' | 'en';

type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type Founder = {
  role: string;
  name: string;
  bio: string;
  image: string;
  imagePosition?: string;
};

const LOGO_SRC = '/Resonarium_logo_blacknobg.png';

const NAV_ITEMS: {
  key: Exclude<SectionKey, 'home'>;
  label: Record<Language, string>;
}[] = [
  { key: 'chi-siamo', label: { it: 'Chi Siamo', en: 'About' } },
  { key: 'vision', label: { it: 'Vision', en: 'Vision' } },
  { key: 'attivita', label: { it: 'Attività', en: 'Activities' } },
  { key: 'contatti', label: { it: 'Contatti', en: 'Contacts' } },
];

const CONTENT = {
  it: {
    enter: 'Entra',
    navHome: 'Home',
    menu: 'Menu',
    close: 'Chiudi',

    homeKicker: 'Milano · Associazione culturale',
    homeTitle: 'Resonarium',
    homeParagraphs: [
      'Resonarium è un’associazione culturale con sede a Milano, attiva nell’ambito della musica, della formazione e della ricerca interdisciplinare. La sua attività è orientata alla costruzione di contesti di studio, ascolto e produzione culturale, con particolare attenzione al rapporto tra pratica artistica, riflessione teorica e trasmissione dei saperi.',
      'L’associazione promuove iniziative rivolte a musicisti, studiosi, studenti e pubblico interessato, favorendo occasioni di approfondimento e collaborazione in cui il fenomeno sonoro possa essere affrontato come oggetto artistico, culturale e scientifico.',
    ],

    aboutKicker: 'Chi siamo',
    aboutTitle: 'Profilo istituzionale e ambiti di attività',
    aboutParagraphs: [
      'Associazione Culturale Resonarium è costituita come associazione senza fini di lucro con sede a Milano, in Via degli Ottoboni 37; la sua durata è illimitata salvo scioglimento deliberato dall’assemblea. Tra i suoi scopi figurano la promozione della cultura musicale, filosofica e scientifica, l’organizzazione di concerti, festival e rassegne, di masterclass e corsi di perfezionamento musicale, di attività didattiche e divulgative, nonché il sostegno a giovani musicisti e ricercatori.',
      'Lo statuto prevede inoltre collaborazioni con scuole, conservatori, università, accademie ed enti di ricerca, insieme alla possibilità di pubblicare materiali e sostenere borse di studio. In questo quadro, Resonarium si configura come una struttura dedicata alla progettazione culturale, alla formazione e alla ricerca.',
      'L’associazione nasce formalmente dall’atto costitutivo sottoscritto dai tre soci fondatori Elia Tarizzo, Alberto Chines ed Edoardo Toffoletto. Nel primo Consiglio Direttivo vengono nominati rispettivamente Presidente, Direttore artistico e Direttore scientifico.',
    ],

    foundersTitle: 'Fondatori',
    founders: [
      {
        role: 'Presidente',
        name: 'Elia Tarizzo',
        bio: 'Socio fondatore e Presidente del primo Consiglio Direttivo. Coordina l’indirizzo istituzionale dell’associazione e ne segue la rappresentanza legale e la visione generale.',
        image: '/founder-elia.jpg',
        imagePosition: 'center center',
      },
      {
        role: 'Direttore artistico',
        name: 'Alberto Chines',
        bio: 'Socio fondatore e Direttore artistico del primo Consiglio Direttivo. Contribuisce alla definizione dell’orientamento culturale e della programmazione artistica di Resonarium. Pianista e Steinway Artist dal 2020, si è formato alla Accademia di Imola con Franco Scala e Piero Rattalino e al Conservatorio di Bolzano. Dopo il debutto a quindici anni al Teatro Massimo di Palermo, ha vinto il primo premio al Concorso "Palma d’Oro" e il Sony Classical Talent Scout. La sua attività concertistica lo ha portato in sedi di prestigio internazionale, dalla Van Cliburn Recital Hall (USA) al Teatro alla Scala di Milano. Musicista eclettico, esplora il repertorio solistico e cameristico con una spiccata apertura verso la nuova musica e le trascrizioni autoriali, collaborando con artisti quali Anna Serova e il Quartetto Noûs. Già ideatore del Musica Manent Festival di Ustica, affianca alla progettazione culturale il suo impegno accademico: è attualmente docente di pianoforte presso il Conservatorio di Rovigo.',
        image: '/founder-alberto.jpg',
        imagePosition: '66% center',
      },
      {
        role: 'Direttore scientifico',
        name: 'Edoardo Toffoletto',
        bio: 'Socio fondatore e Direttore scientifico del primo Consiglio Direttivo. Nato a Milano il 10 maggio 1991, segue in particolare la dimensione scientifica e i percorsi di studio promossi dall’associazione. Ha conseguito il dottorato in Musica, Storia & Società sotto la direzione di Esteban Buch all’École des Hautes Études en Sciences Sociales di Parigi (2024) e si è laureato in filosofia all’Università di Padova (2013), al King’s College di Londra (2015) e alla Freie-Universität di Berlino (2017). Nel corso della sua formazione è stato corrispondente freelance da Berlino e Parigi seguendo le rubriche di geopolitica e politica economica per Business Insider Italia (2017-2021) e Il Bollettino. Quindicinnale economico-finanziario (2022). Tra il 2017 e il 2020 ha collaborato con l’Institut de Recherche et d’Innovation del Centre Pompidou di Parigi diretto da Bernard Stiegler (1952-2020). Ha intrapreso una formazione psicanalitica (2022-2025) alla Scuola di Psicanalisi Freudiana di Milano sotto la direzione di Franco Baldini. Nel 2023 è stato membro della redazione di Equilibri Magazine. Rivista per lo sviluppo sostenibile della Fondazione ENI Enrico Mattei. Attualmente, è professore a contratto di Questioni contemporanee all’Institut Catholique de Paris e collaboratore del Teatro Franco Parenti di Milano.',
        image: '/founder-edoardo.jpg',
        imagePosition: 'center center',
      },
    ] as Founder[],

    scientificPublicationsTitle: 'Pubblicazioni scientifiche in open-access',
    scientificPublications: [
      '2024 – “Psicanalisi come critica dell’economia politica. L’economia libidica del capitalismo contemporaneo”, in Metapsychologica. Rivista di psicanalisi freudiana, pp. 133-166.',
      '2023 – “Considerazioni sulla società cristiano-sadiana. Il sadismo come perversone della pulsione di sapere”, in Metapsychologica. Rivista di psicanalisi freudiana, pp. 191-214.',
      '2022 – “Il Weird come figura del feticismo del reale (con una traduzione di un’intervista a Francesco Masci in appendice)”, in Kaiak. A philosophical Journey, 17 settembre 2022.',
      '2022 – “Angelo Calemme e Bernard Stiegler: dalla tecnologia scientifica alla nuova critica dell’economia politica”, in Materialismo Storico. Rivista di filosofia, storia e scienze umane, pp. 372-392.',
    ],

    researchInterestsTitle: 'Ambiti di ricerca',
    researchInterestsText:
      'I suoi interessi di ricerca incrociano l’estetica e la psicanalisi, l’antropologia e la storia del pensiero politico e economico.',

    visionKicker: 'Vision',
    visionTitle: 'Orientamento culturale',
    visionParagraphs: [
      'L’orientamento di Resonarium si fonda sull’idea che l’ascolto costituisca una pratica di attenzione, di studio e di conoscenza. In questa prospettiva, il suono non viene inteso esclusivamente come materia artistica, ma anche come campo di indagine capace di mettere in relazione estetica, storia delle idee, spazio sociale e forme della percezione.',
      'Per questa ragione l’associazione attribuisce particolare importanza al rigore metodologico, alla qualità dei contenuti e alla costruzione di contesti formativi e culturali chiaramente definiti. Ogni iniziativa è pensata per tenere insieme precisione concettuale, cura organizzativa e apertura al confronto interdisciplinare.',
      'L’obiettivo non è l’autorepresentazione, ma la costituzione di un ambiente serio e riconoscibile per lo studio, la ricerca e la diffusione culturale.',
    ],

    activitiesKicker: 'Attività',
    activitiesTitle: 'Programmi e iniziative',
    activitiesIntro:
      'Per il perseguimento dei propri scopi, l’associazione può organizzare concerti e spettacoli, masterclass musicali, artistiche e culturali, seminari, conferenze e convegni, nonché promuovere materiali didattici e divulgativi, collaborazioni con enti pubblici e privati, partecipazione a bandi culturali e sostegno tramite borse di studio.',
    activitiesItems: [
      {
        title: 'Concerti, festival e rassegne',
        text: 'Tra gli ambiti di attività rientrano l’organizzazione di concerti, festival, rassegne e altri programmi pubblici dedicati alla musica e alla cultura contemporanea. Tali iniziative sono concepite come occasioni di ascolto e approfondimento, con particolare attenzione alla qualità curatoriale e alla coerenza del progetto culturale.',
      },
      {
        title: 'Formazione, masterclass e corsi',
        text: 'L’associazione promuove masterclass, corsi di perfezionamento musicale e attività didattiche e divulgative rivolte a studenti, giovani musicisti, ricercatori e pubblico interessato. La formazione è intesa come costruzione di percorsi di studio fondati su competenza, continuità e chiarezza d’impostazione.',
      },
      {
        title: 'Ricerca, pubblicazioni e collaborazioni',
        text: 'Resonarium può collaborare con scuole, conservatori, università, accademie, enti di ricerca e soggetti pubblici o privati, oltre a pubblicare materiali didattici o divulgativi e a sviluppare progetti di ricerca. In questo senso, l’associazione opera come una piattaforma di lavoro culturale stabile, orientata alla produzione di contenuti, relazioni e percorsi di studio.',
      },
    ],

    contactsKicker: 'Contatti',
    contactsTitle: 'Sede e riferimenti',
    contactsParagraphs: [
      'La sede di Resonarium si trova a Milano, in Via degli Ottoboni 37. Il Consiglio direttivo può istituire sedi operative o sezioni in altre città, ma la sede legale resta nel Comune di Milano.',
      'Per collaborazioni, progetti, attività formative o richieste istituzionali, l’associazione può essere contattata tramite i riferimenti indicati di seguito oppure mediante il modulo presente in questa pagina.',
    ],
    addressLabel: 'Sede',
    addressLines: ['Associazione Culturale Resonarium', 'Via degli Ottoboni 37', 'Milano'],
    emailLabel: 'Email',
    emailGeneral: 'generale: info@resonarium.com',
    emailProjects: 'per collaborazioni e progetti: progetti@resonarium.com',

    formName: 'Nome',
    formEmail: 'Email',
    formMessage: 'Messaggio',
    formSend: 'Invia',
    formSuccess:
      'Messaggio verificato correttamente. Per attivare l’invio reale ti basta collegare questo form a una route API o a un provider email.',
    formErrors: {
      name: 'Inserisci il tuo nome.',
      email: 'Inserisci un indirizzo email valido.',
      message: 'Inserisci un messaggio di almeno 20 caratteri.',
    },

    footerLeft: 'RESONARIUM © 2026 | MILANO',
    footerCredits: 'Credits',
    footerPolicy: 'Policy',
    imageMissing: 'Immagine non disponibile',
  },

  en: {
    enter: 'Enter',
    navHome: 'Home',
    menu: 'Menu',
    close: 'Close',

    homeKicker: 'Milan · Cultural association',
    homeTitle: 'Resonarium',
    homeParagraphs: [
      'Resonarium is a cultural association based in Milan, active in the fields of music, education, and interdisciplinary research. Its work is oriented toward the creation of contexts for study, listening, and cultural production, with particular attention to the relationship between artistic practice, theoretical reflection, and the transmission of knowledge.',
      'The association promotes initiatives addressed to musicians, scholars, students, and interested audiences, fostering occasions for study and collaboration in which sound may be approached as an artistic, cultural, and scientific object.',
    ],

    aboutKicker: 'About',
    aboutTitle: 'Institutional profile and fields of activity',
    aboutParagraphs: [
      'The Cultural Association Resonarium is established as a non-profit association based in Milan, Via degli Ottoboni 37; its duration is unlimited unless dissolved by the members’ assembly. Its aims include the promotion of musical, philosophical, and scientific culture, the organisation of concerts, festivals, and series, masterclasses and advanced musical training, educational and public outreach activities, and support for young musicians and researchers.',
      'The statute also provides for collaborations with schools, conservatories, universities, academies, and research bodies, together with the possibility of producing publications and supporting scholarships. In this framework, Resonarium takes shape as a structure devoted to cultural design, education, and research.',
      'The association is formally founded through the deed of incorporation signed by the three founding members Elia Tarizzo, Alberto Chines, and Edoardo Toffoletto. The first Board appoints them respectively as President, Artistic Director, and Scientific Director.',
    ],

    foundersTitle: 'Founders',
    founders: [
      {
        role: 'President',
        name: 'Elia Tarizzo',
        bio: 'Founding member and President of the first Board of Directors. He coordinates the institutional direction of the association and follows its legal representation and general vision.',
        image: '/founder-elia.jpg',
        imagePosition: 'center center',
      },
      {
        role: 'Artistic Director',
        name: 'Alberto Chines',
        bio: 'Founding member and Artistic Director of the first Board of Directors. He contributes to the cultural orientation and artistic programming of Resonarium. A pianist and Steinway Artist since 2020, he trained at the Accademia di Imola with Franco Scala and Piero Rattalino and at the Conservatory of Bolzano. After making his debut at the age of fifteen at the Teatro Massimo in Palermo, he won first prize at the Palma d’Oro Competition and the Sony Classical Talent Scout. His concert career has taken him to internationally renowned venues, from the Van Cliburn Recital Hall in the United States to Teatro alla Scala in Milan. An eclectic musician, he explores solo and chamber repertoire with a marked openness toward new music and authorial transcriptions, collaborating with artists such as Anna Serova and Quartetto Noûs. Former creator of the Musica Manent Festival in Ustica, he combines cultural planning with academic work: he is currently professor of piano at the Conservatory of Rovigo.',
        image: '/founder-alberto.jpg',
        imagePosition: '66% center',
      },
      {
        role: 'Scientific Director',
        name: 'Edoardo Toffoletto',
        bio: 'Founding member and Scientific Director of the first Board of Directors. Born in Milan on 10 May 1991, he is particularly responsible for the scientific dimension and the study programmes promoted by the association. He received his PhD in Music, History & Society under the supervision of Esteban Buch at the École des Hautes Études en Sciences Sociales in Paris (2024), and previously graduated in philosophy at the University of Padua (2013), King’s College London (2015), and the Freie Universität Berlin (2017). During his formation, he worked as a freelance correspondent from Berlin and Paris, covering geopolitics and political economy for Business Insider Italia (2017-2021) and Il Bollettino. Quindicinnale economico-finanziario (2022). Between 2017 and 2020 he collaborated with the Institut de Recherche et d’Innovation at the Centre Pompidou in Paris, directed by Bernard Stiegler (1952-2020). He also undertook psychoanalytic training (2022-2025) at the Scuola di Psicanalisi Freudiana in Milan under the direction of Franco Baldini. In 2023 he was a member of the editorial board of Equilibri Magazine, the journal for sustainable development of the Fondazione ENI Enrico Mattei. He is currently adjunct professor of Contemporary Questions at the Institut Catholique de Paris and collaborator of Teatro Franco Parenti in Milan.',
        image: '/founder-edoardo.jpg',
        imagePosition: 'center center',
      },
    ] as Founder[],

    scientificPublicationsTitle: 'Scientific publications in open access',
    scientificPublications: [
      '2024 – “Psicanalisi come critica dell’economia politica. L’economia libidica del capitalismo contemporaneo”, in Metapsychologica. Rivista di psicanalisi freudiana, pp. 133-166.',
      '2023 – “Considerazioni sulla società cristiano-sadiana. Il sadismo come perversone della pulsione di sapere”, in Metapsychologica. Rivista di psicanalisi freudiana, pp. 191-214.',
      '2022 – “Il Weird come figura del feticismo del reale (con una traduzione di un’intervista a Francesco Masci in appendice)”, in Kaiak. A philosophical Journey, 17 September 2022.',
      '2022 – “Angelo Calemme e Bernard Stiegler: dalla tecnologia scientifica alla nuova critica dell’economia politica”, in Materialismo Storico. Rivista di filosofia, storia e scienze umane, pp. 372-392.',
    ],

    researchInterestsTitle: 'Research interests',
    researchInterestsText:
      'His research interests bring together aesthetics and psychoanalysis, anthropology, and the history of political and economic thought.',

    visionKicker: 'Vision',
    visionTitle: 'Cultural orientation',
    visionParagraphs: [
      'Resonarium’s orientation is grounded in the idea that listening constitutes a practice of attention, study, and knowledge. From this perspective, sound is understood not exclusively as artistic material, but also as a field of inquiry capable of connecting aesthetics, intellectual history, social space, and forms of perception.',
      'For this reason, the association places particular importance on methodological rigor, quality of content, and the construction of clearly defined educational and cultural contexts. Each initiative is conceived so as to bring together conceptual precision, organisational care, and openness to interdisciplinary exchange.',
      'The aim is not self-celebration, but the establishment of a serious and recognisable environment for study, research, and cultural dissemination.',
    ],

    activitiesKicker: 'Activities',
    activitiesTitle: 'Programmes and initiatives',
    activitiesIntro:
      'To pursue its aims, the association may organise concerts and performances, musical, artistic, and cultural masterclasses, seminars, conferences, and symposia, as well as educational materials, collaborations with public and private bodies, participation in cultural calls, and support through scholarships.',
    activitiesItems: [
      {
        title: 'Concerts, festivals, and series',
        text: 'Among its fields of activity are the organisation of concerts, festivals, series, and other public programmes devoted to music and contemporary culture. These initiatives are conceived as occasions for listening and study, with particular attention to curatorial quality and the coherence of the cultural project.',
      },
      {
        title: 'Education, masterclasses, and courses',
        text: 'The association promotes masterclasses, advanced musical training courses, and educational activities addressed to students, young musicians, researchers, and interested audiences. Education is understood as the construction of paths of study based on competence, continuity, and clarity of approach.',
      },
      {
        title: 'Research, publications, and collaborations',
        text: 'Resonarium may collaborate with schools, conservatories, universities, academies, research institutions, and both public and private bodies, as well as publish educational materials and develop research projects. In this sense, the association operates as a stable platform for cultural work, oriented toward the production of content, relations, and study paths.',
      },
    ],

    contactsKicker: 'Contacts',
    contactsTitle: 'Headquarters and contact details',
    contactsParagraphs: [
      'Resonarium is based in Milan, Via degli Ottoboni 37. The Board of Directors may establish operational branches or sections in other cities, but the legal headquarters remain in the municipality of Milan.',
      'For collaborations, projects, educational initiatives, or institutional enquiries, the association may be contacted through the references below or by means of the form on this page.',
    ],
    addressLabel: 'Headquarters',
    addressLines: ['Associazione Culturale Resonarium', 'Via degli Ottoboni 37', 'Milan'],
    emailLabel: 'Email',
    emailGeneral: 'general: info@resonarium.com',
    emailProjects: 'for collaborations and projects: progetti@resonarium.com',

    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    formSend: 'Send',
    formSuccess:
      'Message validated successfully. To enable real delivery, just connect this form to an API route or an email provider.',
    formErrors: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      message: 'Please enter a message of at least 20 characters.',
    },

    footerLeft: 'RESONARIUM © 2026 | MILAN',
    footerCredits: 'Credits',
    footerPolicy: 'Policy',
    imageMissing: 'Image unavailable',
  },
} satisfies Record<Language, any>;

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function SectionTransition({
  transitionState,
  children,
}: {
  transitionState: 'idle' | 'fadingOut' | 'fadingIn';
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        transitionState === 'fadingOut' && 'fade-out',
        transitionState === 'fadingIn' && 'fade-in'
      )}
    >
      {children}
    </div>
  );
}

function NavbarLogoDesktop() {
  return (
    <div className="relative h-24 w-72 lg:h-28 lg:w-80 xl:h-32 xl:w-96">
      <Image
        src={LOGO_SRC}
        alt="Resonarium"
        fill
        priority
        className="object-contain scale-[1.7]"
      />
    </div>
  );
}

function NavbarLogoMobile() {
  return (
    <div className="relative h-16 w-44">
      <Image
        src={LOGO_SRC}
        alt="Resonarium"
        fill
        priority
        className="object-contain scale-[1.55]"
      />
    </div>
  );
}

function SplashLogo() {
  return (
    <div className="relative h-44 w-72 sm:h-56 sm:w-[30rem] lg:h-72 lg:w-[44rem]">
      <Image
        src={LOGO_SRC}
        alt="Resonarium"
        fill
        priority
        className="object-contain scale-[1.22] sm:scale-[1.34]"
      />
    </div>
  );
}

function FounderCard({
  role,
  name,
  bio,
  image,
  imagePosition,
  imageMissingLabel,
}: Founder & { imageMissingLabel: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="grid gap-6 border-t border-[var(--line)] pt-8 md:grid-cols-[220px_1fr] md:gap-10">
      <div className="founder-image-shell overflow-hidden rounded-[22px] bg-[var(--background-soft)]">
        {!imageError ? (
          <Image
            src={image}
            alt={name}
            width={900}
            height={1200}
            className="h-full w-full object-cover"
            style={{ objectPosition: imagePosition ?? 'center center' }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full min-h-[inherit] items-center justify-center px-6 text-center text-sm text-[var(--foreground-faint)]">
            {imageMissingLabel}
          </div>
        )}
      </div>

      <div>
        <p className="kicker">{role}</p>
        <h3 className="sub-title mt-4">{name}</h3>
        <div className="body-copy mt-5">
          <p>{bio}</p>
        </div>
      </div>
    </article>
  );
}

function ContactForm({ language }: { language: Language }) {
  const text = CONTENT[language];
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const nextErrors: ContactErrors = {};

    if (!values.name.trim()) nextErrors.name = text.formErrors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = text.formErrors.email;
    }
    if (values.message.trim().length < 20) {
      nextErrors.message = text.formErrors.message;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);

    if (!validate()) return;

    setSuccess(true);
    setValues({
      name: '',
      email: '',
      message: '',
    });
  };

  const setField =
    (field: 'name' | 'email' | 'message') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    };

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <div className="grid gap-5">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm text-[var(--foreground-soft)]">
            {text.formName}
          </label>
          <input
            id="contact-name"
            className="form-field form-input"
            value={values.name}
            onChange={setField('name')}
            placeholder={text.formName}
            autoComplete="name"
          />
          {errors.name && <p className="mt-2 text-sm text-[var(--danger)]">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm text-[var(--foreground-soft)]">
            {text.formEmail}
          </label>
          <input
            id="contact-email"
            type="email"
            className="form-field form-input"
            value={values.email}
            onChange={setField('email')}
            placeholder={text.formEmail}
            autoComplete="email"
          />
          {errors.email && <p className="mt-2 text-sm text-[var(--danger)]">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm text-[var(--foreground-soft)]">
            {text.formMessage}
          </label>
          <textarea
            id="contact-message"
            className="form-field form-textarea"
            value={values.message}
            onChange={setField('message')}
            placeholder={text.formMessage}
          />
          {errors.message && <p className="mt-2 text-sm text-[var(--danger)]">{errors.message}</p>}
        </div>

        <div className="flex flex-col items-start gap-4 pt-2">
          <button type="submit" className="primary-button">
            {text.formSend}
          </button>

          {success && (
            <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">
              {text.formSuccess}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

function HomeSection({
  language,
  onNavigate,
}: {
  language: Language;
  onNavigate: (section: Exclude<SectionKey, 'home'>) => void;
}) {
  const text = CONTENT[language];

  return (
    <section className="page-shell">
      <div className="page-content">
        <p className="kicker">{text.homeKicker}</p>
        <h1 className="page-title mt-6 sm:mt-8">{text.homeTitle}</h1>

        <div className="body-copy mt-8 sm:mt-10 max-w-4xl">
          {text.homeParagraphs.map((paragraph: string) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('chi-siamo')}
            className="primary-button"
          >
            {language === 'it' ? 'Approfondisci' : 'Explore'}
          </button>

          <button
            onClick={() => onNavigate('contatti')}
            className="secondary-button"
          >
            {language === 'it' ? 'Contatti' : 'Contacts'}
          </button>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ language }: { language: Language }) {
  const text = CONTENT[language];

  return (
    <section className="page-shell">
      <div className="page-content">
        <p className="kicker">{text.aboutKicker}</p>
        <h2 className="section-title mt-6 sm:mt-8">{text.aboutTitle}</h2>

        <div className="body-copy mt-8 sm:mt-10 max-w-5xl">
          {text.aboutParagraphs.map((paragraph: string) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14">
          <p className="kicker">{text.foundersTitle}</p>
          <div className="mt-8 space-y-12">
            {text.founders.map((founder) => (
              <div key={founder.name}>
                <FounderCard
                  {...founder}
                  imageMissingLabel={text.imageMissing}
                />

                {founder.name === 'Edoardo Toffoletto' && (
                  <div className="mt-8 md:mt-10 md:pl-[260px]">
                    <div className="border-t border-[var(--line)] pt-8">
                      <p className="kicker">{text.researchInterestsTitle}</p>
                      <div className="body-copy mt-5">
                        <p>{text.researchInterestsText}</p>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-[var(--line)] pt-8">
                      <p className="kicker">{text.scientificPublicationsTitle}</p>
                      <div className="body-copy mt-5">
                        {text.scientificPublications.map((item: string) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionSection({ language }: { language: Language }) {
  const text = CONTENT[language];

  return (
    <section className="page-shell">
      <div className="page-content">
        <p className="kicker">{text.visionKicker}</p>
        <h2 className="section-title mt-6 sm:mt-8">{text.visionTitle}</h2>

        <div className="body-copy mt-8 sm:mt-10 max-w-5xl">
          {text.visionParagraphs.map((paragraph: string) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection({ language }: { language: Language }) {
  const text = CONTENT[language];

  return (
    <section className="page-shell">
      <div className="page-content">
        <p className="kicker">{text.activitiesKicker}</p>
        <h2 className="section-title mt-6 sm:mt-8">{text.activitiesTitle}</h2>

        <div className="body-copy mt-8 sm:mt-10 max-w-5xl">
          <p>{text.activitiesIntro}</p>
        </div>

        <div className="mt-12 space-y-10">
          {text.activitiesItems.map((item, index) => (
            <section key={item.title} className="border-t border-[var(--line)] pt-8">
              <p className="kicker">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="sub-title mt-5">{item.title}</h3>
              <div className="body-copy mt-6 max-w-5xl">
                <p>{item.text}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsSection({ language }: { language: Language }) {
  const text = CONTENT[language];

  return (
    <section className="page-shell">
      <div className="page-content">
        <p className="kicker">{text.contactsKicker}</p>
        <h2 className="section-title mt-6 sm:mt-8">{text.contactsTitle}</h2>

        <div className="body-copy mt-8 sm:mt-10 max-w-5xl">
          {text.contactsParagraphs.map((paragraph: string) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <p className="kicker">{text.addressLabel}</p>
            <div className="mt-5 space-y-2 text-lg leading-9 text-[var(--foreground-soft)]">
              {text.addressLines.map((line: string) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker">{text.emailLabel}</p>
            <div className="mt-5 space-y-3 text-lg leading-9 text-[var(--foreground-soft)]">
              <p>
                <a
                  href="mailto:info@resonarium.com"
                  className="underline underline-offset-4"
                >
                  {text.emailGeneral}
                </a>
              </p>
              <p>
                <a
                  href="mailto:progetti@resonarium.com"
                  className="underline underline-offset-4"
                >
                  {text.emailProjects}
                </a>
              </p>
            </div>
          </div>
        </div>

        <ContactForm language={language} />
      </div>
    </section>
  );
}

export default function Page() {
  const [language, setLanguage] = useState<Language>('it');
  const [activeSection, setActiveSection] = useState<SectionKey>('home');
  const [transitionState, setTransitionState] = useState<'idle' | 'fadingOut' | 'fadingIn'>('idle');
  const [nextSection, setNextSection] = useState<SectionKey | null>(null);
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashClosing, setSplashClosing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const text = CONTENT[language];

  useEffect(() => {
    if (!nextSection) return;

    if (transitionState === 'fadingOut') {
      const timeout = window.setTimeout(() => {
        setActiveSection(nextSection);
        setTransitionState('fadingIn');
      }, 240);

      return () => window.clearTimeout(timeout);
    }

    if (transitionState === 'fadingIn') {
      const timeout = window.setTimeout(() => {
        setTransitionState('idle');
        setNextSection(null);
      }, 460);

      return () => window.clearTimeout(timeout);
    }
  }, [nextSection, transitionState]);

  const navigateTo = (section: SectionKey) => {
    if (section === activeSection || transitionState !== 'idle') return;
    setMobileMenuOpen(false);
    setNextSection(section);
    setTransitionState('fadingOut');
  };

  const closeSplash = () => {
    setSplashClosing(true);
    window.setTimeout(() => {
      setSplashVisible(false);
    }, 560);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection language={language} onNavigate={navigateTo} />;
      case 'chi-siamo':
        return <AboutSection language={language} />;
      case 'vision':
        return <VisionSection language={language} />;
      case 'attivita':
        return <ActivitiesSection language={language} />;
      case 'contatti':
        return <ContactsSection language={language} />;
      default:
        return null;
    }
  };

  return (
    <main className="site-shell frame-lines min-h-screen">
      {splashVisible && (
        <div className={cn('splash-screen', splashClosing && 'splash-fade-out')}>
          <button
            type="button"
            onClick={closeSplash}
            className="splash-button"
            aria-label={language === 'it' ? 'Entra nel sito' : 'Enter the site'}
          >
            <div className="splash-shell px-8 sm:px-6">
              <SplashLogo />
              <div className="secondary-button mt-8 sm:mt-10">{text.enter}</div>
            </div>
          </button>
        </div>
      )}

      {!splashVisible && (
        <>
          <header className="topbar">
            <div className="container-shell">
              <div className="hidden min-h-[112px] items-center justify-between gap-4 md:flex">
                <button
                  onClick={() => navigateTo('home')}
                  className="shrink-0 items-center"
                  aria-label={language === 'it' ? 'Vai alla home' : 'Go to home'}
                >
                  <NavbarLogoDesktop />
                </button>

                <div className="min-w-0 flex-1 px-3 xl:block">
                  <nav className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => navigateTo('home')}
                      className={cn('nav-link', activeSection === 'home' && 'active')}
                    >
                      {text.navHome}
                    </button>

                    {NAV_ITEMS.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => navigateTo(item.key)}
                        className={cn('nav-link', activeSection === item.key && 'active')}
                      >
                        {item.label[language]}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => setLanguage('it')}
                    className={cn(
                      'secondary-button',
                      language === 'it' && 'border-[rgba(139,122,93,0.42)] bg-[rgba(139,122,93,0.08)]'
                    )}
                  >
                    ITA
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                      'secondary-button',
                      language === 'en' && 'border-[rgba(139,122,93,0.42)] bg-[rgba(139,122,93,0.08)]'
                    )}
                  >
                    ENG
                  </button>
                </div>
              </div>

              <div className="flex min-h-[108px] flex-col justify-center gap-3 md:hidden">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => navigateTo('home')}
                    className="flex min-w-0 shrink items-center"
                    aria-label={language === 'it' ? 'Vai alla home' : 'Go to home'}
                  >
                    <NavbarLogoMobile />
                  </button>

                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="secondary-button px-4 text-[0.67rem]"
                    aria-label={text.menu}
                  >
                    {text.menu}
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setLanguage('it')}
                    className={cn(
                      'secondary-button px-3 text-[0.67rem]',
                      language === 'it' && 'border-[rgba(139,122,93,0.42)] bg-[rgba(139,122,93,0.08)]'
                    )}
                  >
                    ITA
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                      'secondary-button px-3 text-[0.67rem]',
                      language === 'en' && 'border-[rgba(139,122,93,0.42)] bg-[rgba(139,122,93,0.08)]'
                    )}
                  >
                    ENG
                  </button>
                </div>
              </div>
            </div>
          </header>

          {mobileMenuOpen && (
            <div className="mobile-menu-overlay menu-fade-in md:hidden">
              <div className="container-shell flex min-h-screen flex-col py-8">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => navigateTo('home')}
                    className="flex min-w-0 items-center"
                    aria-label={language === 'it' ? 'Vai alla home' : 'Go to home'}
                  >
                    <NavbarLogoMobile />
                  </button>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="secondary-button px-4 text-[0.67rem]"
                  >
                    {text.close}
                  </button>
                </div>

                <div className="mt-14 flex flex-1 flex-col justify-center gap-8">
                  <button
                    onClick={() => navigateTo('home')}
                    className="text-left text-[1.2rem] [font-variant-caps:all-small-caps] tracking-[0.05em] text-[var(--foreground)]"
                  >
                    {text.navHome}
                  </button>

                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => navigateTo(item.key)}
                      className="text-left text-[1.2rem] [font-variant-caps:all-small-caps] tracking-[0.05em] text-[var(--foreground)]"
                    >
                      {item.label[language]}
                    </button>
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-3">
                  <button
                    onClick={() => setLanguage('it')}
                    className={cn(
                      'secondary-button text-[0.67rem]',
                      language === 'it' && 'border-[rgba(139,122,93,0.42)] bg-[rgba(139,122,93,0.08)]'
                    )}
                  >
                    ITA
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                      'secondary-button text-[0.67rem]',
                      language === 'en' && 'border-[rgba(139,122,93,0.42)] bg-[rgba(139,122,93,0.08)]'
                    )}
                  >
                    ENG
                  </button>
                </div>
              </div>
            </div>
          )}

          <SectionTransition transitionState={transitionState}>
            {renderSection()}
          </SectionTransition>

          <footer className="border-t border-[var(--line)] py-8">
            <div className="container-shell">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.78rem] uppercase tracking-[0.26em] text-[var(--foreground-faint)]">
                  {text.footerLeft}
                </p>

                <div className="flex items-center gap-5 text-sm">
                  <a href="#" className="text-[var(--foreground-faint)] transition hover:text-[var(--foreground)]">
                    {text.footerCredits}
                  </a>
                  <a href="#" className="text-[var(--foreground-faint)] transition hover:text-[var(--foreground)]">
                    {text.footerPolicy}
                  </a>
                  <a href="#" aria-label="External link" className="text-[var(--foreground-faint)] transition hover:text-[var(--foreground)]">
                    ↗
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}