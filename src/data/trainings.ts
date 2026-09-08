export interface Training {
  title: string;
  day: string;
  time: string;
  place?: string;
  /** Passende Sparte (slug aus sports.ts) – für spätere Filter. */
  sport?: string;
}

export const trainings: Training[] = [
  { title: 'Fußball Bambini', day: 'So', time: '10:00', place: 'Sportplatz', sport: 'fussball' },
  { title: 'Turnen Kids', day: 'Di', time: '16:30', place: 'Sporthalle', sport: 'turnen' },
  { title: 'Volleyball Freizeit', day: 'Mi', time: '19:00', place: 'Sporthalle', sport: 'volleyball' },
  { title: 'Outdoor (14-tägig)', day: 'Sa', time: '09:00', place: 'Treffpunkt Sportplatz', sport: 'outdoor' },
  { title: 'Dart-Abend', day: 'Fr', time: '20:00', place: 'Vereinsheim', sport: 'dart' },
];
