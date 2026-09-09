export type AgeGroup = 'kinder' | 'jugend' | 'erwachsene';

/** Eine Sportart innerhalb einer Sparte. */
export interface Activity {
  name: string;
  /**
   * Dateiname in public/piktogramme/ ohne Endung. Fehlt der Wert, zeigt die
   * Seite einen leeren Rahmen – besser als die Aktivität zu verschweigen.
   */
  pictogram?: string;
  /** Kurzer Zusatz, z. B. „14-tägig“. */
  note?: string;
}

export interface Sport {
  slug: string;
  name: string;
  teaser: string;
  /** Längerer Text für die Sparten-Übersicht. */
  description: string;
  /** Absätze für die Sparten-Detailseite. */
  longText?: string[];
  /** Kurze Stichpunkte („Das erwartet dich"). */
  highlights?: string[];
  /** Wo trainiert diese Sparte? */
  venue?: string;
  /** Was sollte man zum ersten Training mitbringen? */
  bring?: string;
  /**
   * Hinweis für Sparten, die sich gerade im Aufbau befinden.
   * Wird auf der Detailseite hervorgehoben dargestellt.
   */
  status?: {
    label: string;
    text: string;
    next?: string[];
  };
  /** Dateiname des Piktogramms in public/piktogramme/ ohne Endung. */
  pictogram: string;
  /** Sportarten, die zu dieser Sparte gehören. */
  activities?: Activity[];
  /** Akzentfarbe der Karte (Design-System-Token oder Hex). */
  color: string;
  ageGroups: AgeGroup[];
  contact?: string;
}

export const ageGroupLabels: Record<AgeGroup, string> = {
  kinder: 'Kinder',
  jugend: 'Jugendliche',
  erwachsene: 'Erwachsene',
};

export const sports: Sport[] = [
  {
    slug: 'fussball',
    name: 'Fußball',
    teaser: 'Von Bambini bis Herren/Damen',
    description:
      'Unsere größte Sparte: Training auf dem VSV-Sportplatz, von den Bambini ab vier Jahren bis zu den Erwachsenenmannschaften.',
    longText: [
      'Der Fußball ist unsere größte Sparte. Trainiert wird auf dem VSV-Sportplatz – von den Bambini ab vier Jahren über alle Jugendjahrgänge bis zu den Erwachsenenmannschaften.',
      'Wer neu dazukommt, wird von den Trainerinnen und Trainern in die passende Altersgruppe eingeteilt. Vorkenntnisse braucht niemand mitzubringen.',
    ],
    highlights: [
      'Alle Altersgruppen von Bambini bis Erwachsene',
      'Punktspielbetrieb und reiner Freizeitfußball',
      'Feste Trainingsgruppen mit Übungsleitung',
    ],
    venue: 'VSV-Sportplatz',
    bring: 'Sportsachen, Hallen- oder Fußballschuhe und etwas zu trinken.',
    pictogram: 'fussball',
    color: 'var(--c-primary-light)',
    ageGroups: ['kinder', 'jugend', 'erwachsene'],
  },
  {
    slug: 'volleyball',
    name: 'Volleyball',
    teaser: 'Freizeit & Wettkampf',
    description:
      'Gemischte Freizeitgruppe und ambitioniertes Training in der Alfred-Stubenrauch-Sporthalle – Einsteigerinnen und Einsteiger jederzeit willkommen.',
    longText: [
      'Bei uns treffen sich sowohl die ambitionierte Trainingsgruppe als auch eine gemischte Freizeitrunde in der Alfred-Stubenrauch-Sporthalle.',
      'Der Einstieg ist ausdrücklich auch ohne Vereinserfahrung möglich – die ersten Übungen drehen sich um Annahme und Zuspiel.',
    ],
    highlights: [
      'Freizeit- und Wettkampfgruppe',
      'Gemischte Teams',
      'Einstieg jederzeit möglich',
    ],
    venue: 'Alfred-Stubenrauch-Sporthalle',
    bring: 'Hallenschuhe mit heller Sohle und Sportkleidung.',
    pictogram: 'volleyball',
    color: 'var(--c-accent)',
    ageGroups: ['jugend', 'erwachsene'],
  },
  {
    slug: 'leichtathletik',
    name: 'Leichtathletik',
    teaser: 'Laufen, Werfen, Springen',
    description:
      'Vielseitige Grundlagenarbeit für Kinder und Jugendliche, dazu Lauftreffs für alle, die einfach in Bewegung bleiben wollen.',
    longText: [
      'Laufen, Werfen, Springen: Bei den Kindern und Jugendlichen steht die vielseitige Grundlagenausbildung im Vordergrund – eine gute Basis für jede andere Sportart.',
      'Für Erwachsene gibt es zusätzlich den Lauftreff, bei dem Tempo und Strecke gemeinsam abgestimmt werden.',
    ],
    highlights: [
      'Vielseitige Grundlagenausbildung',
      'Lauftreff für Erwachsene',
      'Teilnahme an Kreis- und Bezirksmeisterschaften',
    ],
    venue: 'VSV-Sportplatz und Sporthalle',
    bring: 'Laufschuhe, wetterfeste Kleidung.',
    pictogram: 'leichtathletik',
    color: 'var(--c-primary)',
    ageGroups: ['kinder', 'jugend', 'erwachsene'],
  },
  {
    slug: 'turnen',
    name: 'Turnen',
    teaser: 'Für die Kleinsten bis Erwachsene',
    description:
      'Eltern-Kind-Turnen, Kinderturnen und Gymnastikgruppen für Erwachsene – Bewegung von Anfang an.',
    longText: [
      'Vom Eltern-Kind-Turnen über das Kinderturnen bis zur Gymnastikgruppe für Erwachsene – Turnen ist bei uns der Einstieg in die Bewegung überhaupt.',
      'Die Kleinsten kommen in Begleitung eines Elternteils; ab dem Kindergartenalter geht es in die eigenen Gruppen.',
    ],
    highlights: [
      'Eltern-Kind-Turnen ab dem Krabbelalter',
      'Kinderturnen in festen Altersgruppen',
      'Gymnastik für Erwachsene',
    ],
    venue: 'Alfred-Stubenrauch-Sporthalle',
    bring: 'Bequeme Kleidung, Turnschläppchen oder barfuß.',
    pictogram: 'geraeteturnen-sprung',
    color: 'var(--c-sun-dark)',
    ageGroups: ['kinder', 'erwachsene'],
  },
  {
    slug: 'basketball',
    name: 'Basketball',
    teaser: 'Teamsport für alle Level',
    description:
      'Offenes Hallentraining, bei dem Technik und Spaß am Spiel im Vordergrund stehen. Vorkenntnisse sind nicht nötig.',
    longText: [
      'Offenes Hallentraining, bei dem Technik und Spaß am Spiel im Vordergrund stehen. Wer noch nie einen Korbleger geworfen hat, ist genauso richtig wie erfahrene Spielerinnen und Spieler.',
    ],
    highlights: [
      'Offenes Training ohne Vorkenntnisse',
      'Für Jugendliche und Erwachsene',
      'Schwerpunkt auf Technik und Spielformen',
    ],
    venue: 'Alfred-Stubenrauch-Sporthalle',
    bring: 'Hallenschuhe mit heller Sohle.',
    pictogram: 'basketball',
    color: 'var(--c-primary-light)',
    ageGroups: ['jugend', 'erwachsene'],
  },
  {
    slug: 'tanzen',
    name: 'Tanzen',
    teaser: 'Bewegung mit Musik',
    description:
      'Von Kindertanz bis zur Tanzgymnastik für Erwachsene – Rhythmus, Koordination und gute Laune.',
    longText: [
      'Von Kindertanz bis Tanzgymnastik für Erwachsene: Rhythmus, Koordination und gute Laune stehen im Mittelpunkt.',
      'Bei Vereinsfesten treten die Gruppen regelmäßig auf – mitmachen ist aber selbstverständlich freiwillig.',
    ],
    highlights: [
      'Kindertanz und Tanzgymnastik',
      'Auftritte bei Vereinsfesten',
      'Keine Tanzpartnerin oder -partner nötig',
    ],
    venue: 'Alfred-Stubenrauch-Sporthalle',
    bring: 'Bequeme Kleidung und Hallenschuhe.',
    pictogram: 'modern-dance',
    color: 'var(--c-accent)',
    ageGroups: ['kinder', 'jugend', 'erwachsene'],
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    teaser: 'Gemeinsam die Region erkunden',
    description:
      'Wanderungen und Touren durch das Rössinger Umland – gemütliches Tempo, gute Gespräche, gemeinsame Einkehr.',
    longText: [
      'Alle zwei Wochen geht es gemeinsam durch das Rössinger Umland. Das Tempo ist gemütlich, die Strecken liegen meist zwischen acht und fünfzehn Kilometern.',
      'Zum Abschluss kehren wir in der Regel gemeinsam ein – der gesellige Teil gehört ausdrücklich dazu.',
    ],
    highlights: [
      'Touren alle zwei Wochen',
      'Gemütliches Tempo, 8–15 km',
      'Gemeinsame Einkehr zum Abschluss',
    ],
    venue: 'Treffpunkt am VSV-Sportplatz',
    bring: 'Festes Schuhwerk, wetterfeste Jacke, Getränk.',
    activities: [
      { name: 'Wandern', pictogram: 'wandern' },
      { name: 'Nordic Walking', pictogram: 'nordic-walking' },
      { name: 'Radwandern', pictogram: 'radfahren' },
      // Für Boßeln liegt noch kein Piktogramm vor.
      { name: 'Boßeln' },
    ],
    status: {
      label: 'Sparte im Aufbau',
      text: 'Die Outdoor-Sparte versteht sich als Nachfolgerin der bisherigen Wander-Sparte und befindet sich derzeit in der Phase der Formierung. Wer mitgestalten möchte, ist ausdrücklich eingeladen – gerade jetzt lässt sich noch viel mitbestimmen.',
      next: [
        'Informations- und Kennenlerntreffen Anfang Oktober',
        'Teilnahme am „Tag des Wanderns“, organisiert und durchgeführt vom Kreissportbund Hildesheim',
      ],
    },
    pictogram: 'wandern',
    color: 'var(--c-primary)',
    ageGroups: ['erwachsene'],
  },
  {
    slug: 'yoga',
    name: 'Yoga',
    teaser: 'Beweglichkeit, Kraft und Ruhe',
    description:
      'Ruhige Einheiten für Beweglichkeit, Kraft und Entspannung – als Ausgleich zum Alltag und zu den anderen Sparten.',
    longText: [
      'Das Yoga-Angebot besteht bereits im Verein, stand bisher aber nicht auf der Website.',
    ],
    // ⚠️ Angenommen, nicht bestätigt: Altersgruppe, Ort und was mitzubringen
    // ist. Sobald die Angaben vorliegen, hier ergänzen und den Status unten
    // entfernen.
    pictogram: 'yoga',
    color: 'var(--c-primary-light)',
    ageGroups: ['erwachsene'],
    status: {
      label: 'Angaben werden ergänzt',
      text: 'Das Angebot gibt es, die Einzelheiten zu Gruppen, Trainingszeiten und Ansprechpartner tragen wir gerade zusammen. Bis dahin gibt der Vorstand gerne Auskunft.',
    },
  },
  {
    slug: 'dart',
    name: 'Dart',
    teaser: 'Geselligkeit & Zielgenauigkeit',
    description:
      'Wöchentlicher Dart-Abend im Vereinsheim – Freizeitrunde, Ligabetrieb und offene Boards für Neugierige.',
    longText: [
      'Der Dart-Abend im Vereinsheim ist offen für alle: Freizeitrunde, Ligabetrieb und freie Boards für alle, die es einfach mal ausprobieren wollen.',
    ],
    highlights: [
      'Wöchentlicher Dart-Abend',
      'Freizeitrunde und Ligabetrieb',
      'Leihpfeile für den ersten Abend vorhanden',
    ],
    venue: 'Vereinsheim',
    bring: 'Nichts – Pfeile können für den Anfang geliehen werden.',
    pictogram: 'darts',
    color: 'var(--c-sun-dark)',
    ageGroups: ['jugend', 'erwachsene'],
  },
];

/** Anzahl der Sparten – überall verwenden, statt die Zahl auszuschreiben. */
export const sportCount = sports.length;

const ZAHLWOERTER = [
  'null', 'eine', 'zwei', 'drei', 'vier', 'fünf', 'sechs',
  'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf',
];

/** Anzahl als Wort, z. B. "neun". Fällt bei großen Zahlen auf die Ziffer zurück. */
export const sportCountWord = ZAHLWOERTER[sportCount] ?? String(sportCount);

/** Dasselbe großgeschrieben, für den Satzanfang. */
export const SportCountWord =
  sportCountWord.charAt(0).toUpperCase() + sportCountWord.slice(1);

/** Namen aller Sparten, z. B. für strukturierte Daten. */
export const sportNames = sports.map((sport) => sport.name);
