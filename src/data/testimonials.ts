export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    text: 'Meine zwei Kinder trainieren beide hier – und ich zahle trotzdem nur einen Familienbeitrag. Das war der Grund, warum wir geblieben sind.',
    author: 'Melanie',
    role: 'Mutter von zwei Vereinsmitgliedern',
  },
  {
    text: 'Ich bin einfach mal zum Probetraining hin, ohne mich vorher anzumelden. Zwei Wochen später war ich Mitglied.',
    author: 'Jonas, 19',
    role: 'Basketball',
  },
];
