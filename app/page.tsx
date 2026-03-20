'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

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
    splashSubtitle: 'RESONARIUM - Associazione Culturale Milano',
    enter: 'Entra',
    navHome: 'Home',
    menu: 'Menu',
    close: 'Chiudi',

    homeKicker: 'Milano · Associazione culturale',
    homeTitle: 'RESONARIUM',
    homeParagraphs: [
      'RESONARIUM si presenta come una piattaforma culturale dedicata all’indagine del suono nelle sue dimensioni estetiche, sociali e conoscitive. La sua attività si sviluppa tra musica, formazione, ricerca e progettazione interdisciplinare, con l’obiettivo di costruire un luogo di lavoro intellettuale e artistico capace di tenere insieme rigore metodologico, qualità curatoriale e apertura pubblica.',
      'In questa prospettiva, l’associazione promuove pratiche di ascolto, percorsi di studio e occasioni di confronto in cui il suono viene considerato non soltanto come fenomeno artistico, ma come campo di esperienza, di relazione e di lettura del presente.',
    ],

    aboutKicker: 'Chi siamo',
    aboutTitle: 'Una comunità di ricerca artistica e scientifica',
    aboutParagraphs: [
      'Associazione Culturale Resonarium è costituita come associazione senza fini di lucro con sede a Milano, in Via degli Ottoboni 37; la sua durata è illimitata salvo scioglimento deliberato dall’assemblea. Tra i suoi scopi figurano la promozione della cultura musicale, filosofica e scientifica, l’organizzazione di concerti, festival e rassegne, di masterclass e corsi di perfezionamento musicale, di attività didattiche e divulgative, nonché il sostegno a giovani musicisti e ricercatori.',
      'Lo statuto prevede inoltre collaborazioni con scuole, conservatori, università, accademie ed enti di ricerca, insieme alla possibilità di pubblicare materiali e sostenere borse di studio.',
      'L’associazione nasce formalmente dall’atto costitutivo sottoscritto dai tre soci fondatori Elia Tarizzo, Alberto Chines ed Edoardo Toffoletto. Nel primo Consiglio Direttivo vengono nominati rispettivamente Presidente, Direttore artistico e Direttore scientifico, definendo da subito un impianto operativo orientato alla direzione culturale, alla progettazione artistica e alla ricerca.',
    ],

    foundersTitle: 'Fondatori',
    founders: [
      {
        role: 'Presidente',
        name: 'Elia Tarizzo',
        bio: 'Nato a Parigi nel 28/11/2001. Ha studiato composizione, violino e pianoforte. Si laurea in Filosofia nel 2024 presso l’università Statale di Milano. Attualmente studia Medicina e chirurgia nell’università Vita-Salute San Raffaele.',
        image: '/founder-elia.jpg',
      },
      {
        role: 'Direttore artistico',
        name: 'Alberto Chines',
        bio: 'Socio fondatore e Direttore artistico del primo Consiglio Direttivo. Contribuisce alla definizione dell’orientamento culturale e della programmazione artistica di Resonarium.',
        image: '/founder-alberto.jpg',
      },
      {
        role: 'Direttore scientifico',
        name: 'Edoardo Toffoletto',
        bio: 'Socio fondatore e Direttore scientifico del primo Consiglio Direttivo. Nato a Milano il 10 maggio 1991, segue in particolare la dimensione scientifica e i percorsi di studio promossi dall’associazione. Attualmente, è professore a contratto di Questioni contemporanee all’Institut Catholique de Paris, collaboratore del Teatro Franco Parenti di Milano. I suoi interessi di ricerca incrociano l’estetica e la psicanalisi, l’antropologia e la storia del pensiero politico e economico.',
        image: '/founder-edoardo.jpg',
      },
    ] as Founder[],

    visionKicker: 'Vision',
    visionTitle: "L’ascolto come pratica di conoscenza e rigore metodologico",
    visionParagraphs: [
      'Al centro della visione di Resonarium vi è l’idea che l’ascolto non sia una facoltà passiva, ma una pratica di conoscenza. Ascoltare significa riconoscere forme, cogliere relazioni, comprendere stratificazioni e sviluppare una sensibilità critica nei confronti dello spazio, del tempo e delle condizioni materiali dell’esperienza.',
      'Per questa ragione, l’associazione attribuisce un valore decisivo allo studio, alla precisione concettuale e al rigore metodologico. Ogni iniziativa viene pensata come un dispositivo capace di coniugare qualità artistica, chiarezza formativa e profondità teorica.',
      'La prospettiva di Resonarium è interdisciplinare non per semplice giustapposizione di linguaggi, ma per necessità di metodo: il fenomeno sonoro richiede strumenti di analisi e di invenzione che attraversino i confini tra musica, filosofia, acustica, ecologia, formazione e ricerca.',
    ],

    activitiesKicker: 'Attività',
    activitiesTitle:
      'Formazione accademica, concerti, masterclass e ricerca culturale',
    activitiesIntro:
      'Per il raggiungimento dei propri scopi l’associazione può organizzare concerti e spettacoli, masterclass musicali, artistiche e culturali, seminari, conferenze e convegni, nonché promuovere materiali didattici e divulgativi, collaborazioni con enti pubblici e privati, partecipazione a bandi culturali e sostegno tramite borse di studio.',
    activitiesItems: [
      {
        title: 'Concerti, festival e rassegne',
        text: 'Tra gli scopi dell’associazione rientrano l’organizzazione di concerti, festival e rassegne e, più in generale, la promozione di eventi culturali e artistici. Resonarium intende quindi costruire programmi pubblici capaci di unire qualità musicale, consapevolezza curatoriale e apertura interdisciplinare.',
      },
      {
        title: 'Masterclass, corsi e attività didattiche',
        text: 'Lo statuto prevede masterclass, corsi di perfezionamento musicale e attività didattiche e divulgative, rivolte in particolare a giovani musicisti e ricercatori. La dimensione formativa non è intesa come semplice trasmissione tecnica, ma come costruzione di contesti di studio esigenti e culturalmente articolati.',
      },
      {
        title: 'Ricerca, pubblicazioni e collaborazioni',
        text: 'L’associazione può collaborare con scuole, conservatori, università, accademie, enti di ricerca e soggetti pubblici o privati, pubblicare materiali didattici o divulgativi e sviluppare progetti di ricerca scientifica e filosofica. Questa cornice rende Resonarium una struttura pensata non soltanto per produrre eventi, ma anche per sostenere ricerca, scrittura e lavoro culturale continuativo.',
      },
    ],

    contactsKicker: 'Contatti',
    contactsTitle: 'Contatti e sede',
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
    splashSubtitle: 'RESONARIUM - Cultural Association Milan',
    enter: 'Enter',
    navHome: 'Home',
    menu: 'Menu',
    close: 'Close',

    homeKicker: 'Milan · Cultural association',
    homeTitle: 'RESONARIUM',
    homeParagraphs: [
      'RESONARIUM presents itself as a cultural platform devoted to the investigation of sound in its aesthetic, social, and epistemic dimensions. Its activities unfold across music, education, research, and interdisciplinary design, with the aim of building an intellectual and artistic environment capable of combining methodological rigor, curatorial quality, and public openness.',
      'From this perspective, the association promotes listening practices, educational pathways, and occasions for exchange in which sound is understood not merely as an artistic phenomenon, but as a field of experience, relation, and critical engagement with the present.',
    ],

    aboutKicker: 'About',
    aboutTitle: 'A community of artistic and scientific research',
    aboutParagraphs: [
      'The Cultural Association Resonarium is established as a non-profit association based in Milan, Via degli Ottoboni 37; its duration is unlimited unless dissolved by the members’ assembly. Its aims include the promotion of musical, philosophical, and scientific culture, the organisation of concerts, festivals, and series, masterclasses and advanced musical training, educational and public outreach activities, and support for young musicians and researchers.',
      'The statute also provides for collaborations with schools, conservatories, universities, academies, and research bodies, together with the possibility of producing publications and supporting scholarships.',
      'The association is formally founded through the deed of incorporation signed by the three founding members Elia Tarizzo, Alberto Chines, and Edoardo Toffoletto. The first Board appoints them respectively as President, Artistic Director, and Scientific Director, establishing from the outset an operational structure devoted to cultural direction, artistic planning, and research.',
    ],

    foundersTitle: 'Founders',
    founders: [
      {
        role: 'President',
        name: 'Elia Tarizzo',
        bio: 'Founding member and President of the first Board of Directors. He coordinates the institutional direction of the association and follows its legal representation and general vision.',
        image: '/founder-elia.jpg',
      },
      {
        role: 'Artistic Director',
        name: 'Alberto Chines',
        bio: 'Founding member and Artistic Director of the first Board of Directors. He contributes to the cultural orientation and artistic programming of Resonarium.',
        image: '/founder-alberto.jpg',
      },
      {
        role: 'Scientific Director',
        name: 'Edoardo Toffoletto',
        bio: 'Founding member and Scientific Director of the first Board of Directors. Born in Milan on 10 May 1991, he is particularly responsible for the scientific dimension and the study paths promoted by the association. He is currently adjunct professor of Contemporary Questions at the Institut Catholique de Paris and collaborator of Teatro Franco Parenti in Milan. His research interests bring together aesthetics and psychoanalysis, anthropology, and the history of political and economic thought.',
        image: '/founder-edoardo.jpg',
      },
    ] as Founder[],

    visionKicker: 'Vision',
    visionTitle: 'Listening as a practice of knowledge and methodological rigor',
    visionParagraphs: [
      'At the centre of Resonarium’s vision lies the idea that listening is not a passive faculty, but a practice of knowledge. To listen means to recognise forms, perceive relations, understand stratifications, and develop a critical sensitivity toward space, time, and the material conditions of experience.',
      'For this reason, the association places decisive value on study, conceptual precision, and methodological rigor. Each initiative is conceived as a device capable of combining artistic quality, educational clarity, and theoretical depth.',
      'Resonarium’s perspective is interdisciplinary not through the simple accumulation of languages, but by methodological necessity: the sonic phenomenon requires tools of analysis and invention that move across the boundaries of music, philosophy, acoustics, ecology, education, and research.',
    ],

    activitiesKicker: 'Activities',
    activitiesTitle:
      'Academic formation, concerts, masterclasses, and cultural research',
    activitiesIntro:
      'To pursue its aims, the association may organise concerts and performances, musical, artistic, and cultural masterclasses, seminars, conferences, and symposia, as well as educational materials, collaborations with public and private bodies, participation in cultural calls, and support through scholarships.',
    activitiesItems: [
      {
        title: 'Concerts, festivals, and series',
        text: 'Among the association’s aims are the organisation of concerts, festivals, and series, and more broadly the promotion of cultural and artistic events. Resonarium therefore seeks to build public programmes capable of combining musical quality, curatorial awareness, and interdisciplinary openness.',
      },
      {
        title: 'Masterclasses, courses, and educational activities',
        text: 'The statute provides for masterclasses, advanced musical training courses, and educational and outreach activities, especially for young musicians and researchers. The educational dimension is not intended as mere technical transmission, but as the construction of demanding and culturally articulated contexts of study.',
      },
      {
        title: 'Research, publications, and collaborations',
        text: 'The association may collaborate with schools, conservatories, universities, academies, research institutions, and both public and private bodies; publish educational materials; and develop scientific and philosophical research projects. This framework makes Resonarium a structure conceived not only to produce events, but also to support research, writing, and sustained cultural work.',
      },
    ],

    contactsKicker: 'Contacts',
    contactsTitle: 'Contacts and headquarters',
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
    <div className="relative h-20 w-56 sm:h-24 sm:w-72 lg:h-28 lg:w-80">
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
    <div className="relative h-44 w-80 sm:h-52 sm:w-[28rem] lg:h-64 lg:w-[40rem]">
      <Image
        src={LOGO_SRC}
        alt="Resonarium"
        fill
        priority
        className="object-contain scale-[1.28]"
      />
    </div>
  );
}

function FounderCard({
  role,
  name,
  bio,
  image,
  imageMissingLabel,
}: Founder & { imageMissingLabel: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="grid gap-5 border-t border-[var(--line)] pt-8 md:grid-cols-[180px_1fr] md:gap-8">
      <div className="founder-image-shell overflow-hidden rounded-[20px] bg-[var(--background-soft)]">
        {!imageError ? (
          <Image
            src={image}
            alt={name}
            width={720}
            height={960}
            className="h-full w-full object-cover"
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
        <h1 className="page-title mt-8">{text.homeTitle}</h1>

        <div className="body-copy mt-10 max-w-4xl">
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
        <h2 className="section-title mt-8">{text.aboutTitle}</h2>

        <div className="body-copy mt-10 max-w-5xl">
          {text.aboutParagraphs.map((paragraph: string) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14">
          <p className="kicker">{text.foundersTitle}</p>
          <div className="mt-8 space-y-10">
            {text.founders.map((founder) => (
              <FounderCard
                key={founder.name}
                {...founder}
                imageMissingLabel={text.imageMissing}
              />
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
        <h2 className="section-title mt-8">{text.visionTitle}</h2>

        <div className="body-copy mt-10 max-w-5xl">
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
        <h2 className="section-title mt-8">{text.activitiesTitle}</h2>

        <div className="body-copy mt-10 max-w-5xl">
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
        <h2 className="section-title mt-8">{text.contactsTitle}</h2>

        <div className="body-copy mt-10 max-w-5xl">
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
  const year = useMemo(() => 2026, []);

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
            <div className="splash-shell">
              <SplashLogo />
              <h1 className="mt-10 text-[clamp(2.4rem,5vw,5rem)] italic leading-none tracking-[-0.03em] text-[var(--foreground)]">
                RESONARIUM
              </h1>
              <p className="mt-5 text-[0.8rem] uppercase tracking-[0.32em] text-[var(--foreground-faint)]">
                {text.splashSubtitle}
              </p>
              <div className="secondary-button mt-10">{text.enter}</div>
            </div>
          </button>
        </div>
      )}

      {!splashVisible && (
        <>
          <header className="topbar">
            <div className="container-shell">
              <div className="flex min-h-[104px] items-center justify-between gap-4 sm:min-h-[112px]">
                <button
                  onClick={() => navigateTo('home')}
                  className="hidden shrink-0 items-center md:flex"
                  aria-label={language === 'it' ? 'Vai alla home' : 'Go to home'}
                >
                  <NavbarLogoDesktop />
                </button>

                <button
                  onClick={() => navigateTo('home')}
                  className="flex shrink-0 items-center md:hidden"
                  aria-label={language === 'it' ? 'Vai alla home' : 'Go to home'}
                >
                  <NavbarLogoMobile />
                </button>

                <div className="hidden min-w-0 flex-1 px-3 xl:block">
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

                <div className="hidden shrink-0 items-center gap-3 md:flex">
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

                <div className="flex shrink-0 items-center gap-2 md:hidden">
                  <button
                    onClick={() => setLanguage('it')}
                    className={cn(
                      'secondary-button px-3',
                      language === 'it' && 'border-[rgba(139,122,93,0.42)] bg-[rgba(139,122,93,0.08)]'
                    )}
                  >
                    ITA
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                      'secondary-button px-3',
                      language === 'en' && 'border-[rgba(139,122,93,0.42)] bg-[rgba(139,122,93,0.08)]'
                    )}
                  >
                    ENG
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="secondary-button px-3"
                    aria-label={text.menu}
                  >
                    {text.menu}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {mobileMenuOpen && (
            <div className="mobile-menu-overlay menu-fade-in md:hidden">
              <div className="container-shell flex min-h-screen flex-col py-8">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateTo('home')}
                    className="flex items-center"
                    aria-label={language === 'it' ? 'Vai alla home' : 'Go to home'}
                  >
                    <NavbarLogoMobile />
                  </button>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="secondary-button px-3"
                  >
                    {text.close}
                  </button>
                </div>

                <div className="mt-12 flex flex-1 flex-col justify-center gap-7">
                  <button
                    onClick={() => navigateTo('home')}
                    className="text-left text-[1.45rem] italic leading-none text-[var(--foreground)]"
                  >
                    {text.navHome}
                  </button>

                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => navigateTo(item.key)}
                      className="text-left text-[1.45rem] italic leading-none text-[var(--foreground)]"
                    >
                      {item.label[language]}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
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