/**
 * Icon-Set der Website: einheitliche Outline-Icons auf 24×24-Raster.
 * Werte sind das Innere eines <svg viewBox="0 0 24 24"> – gerendert wird
 * über <Icon name="..." /> (siehe Icon.astro).
 */
export const icons = {
  // --- Navigation ---
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9"/>',
  sport: '<circle cx="16" cy="5" r="2"/><path d="M6 20l3-6 4-2-1-4 4 1 2 4-3 1 1 6"/><path d="M9 12 6 9"/>',
  join: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2"/><path d="M18 8v6M15 11h6"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 6.5 12 13l8-6.5"/>',

  // --- UI ---
  phone:
    '<path d="M5.5 4.5h3l1.3 4-2 1.5a11 11 0 0 0 5.2 5.2l1.5-2 4 1.3v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 4 5.6a1.5 1.5 0 0 1 1.5-1.1z"/>',
  pin: '<path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11z"/><circle cx="12" cy="10" r="2.2"/>',
  quote:
    '<path d="M4 12c0-4 2.5-6.5 6-7v2.3c-2 .6-3 2-3.1 3.7H9a2.4 2.4 0 0 1 2.4 2.4V15A2.4 2.4 0 0 1 9 17.4H6.4A2.4 2.4 0 0 1 4 15z"/><path d="M13.5 12c0-4 2.5-6.5 6-7v2.3c-2 .6-3 2-3.1 3.7h2.1a2.4 2.4 0 0 1 2.4 2.4V15a2.4 2.4 0 0 1-2.4 2.4h-2.6a2.4 2.4 0 0 1-2.4-2.4z"/>',
  menu: '<path d="M4 6.5h16M4 12h16M4 17.5h16"/>',
  close: '<path d="M5 5l14 14M19 5 5 19"/>',
  arrowRight: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  check: '<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.4 2"/>',
  calendar:
    '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  download: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15"/>',
  euro: '<path d="M17.5 6.5a6.5 6.5 0 1 0 0 11M4.5 10.5h8M4.5 14h8"/>',
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19c0-3.2 2.8-5.4 6.2-5.4s6.2 2.2 6.2 5.4"/><path d="M16.5 5.2a3.2 3.2 0 0 1 0 5.9M18 13.9c2 .8 3.3 2.6 3.3 5.1"/>',
  sparkle:
    '<path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13l-5.6-2 5.6-2z"/>',

  camera:
    '<rect x="3.5" y="7" width="17" height="12" rx="2.5"/><circle cx="12" cy="13" r="3.4"/><path d="M8.5 7 9.7 5h4.6l1.2 2"/>',

  // --- Social ---
  instagram:
    '<rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none"/>',
  facebook:
    '<path d="M21 12a9 9 0 1 0-10.4 8.9v-6.3H8.3V12h2.3v-2c0-2.3 1.4-3.5 3.4-3.5 1 0 2 .17 2 .17v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.5l-.4 2.6h-2.1v6.3A9 9 0 0 0 21 12z" fill="currentColor" stroke="none"/>',
  whatsapp:
    '<path d="M20.4 11.7a8.4 8.4 0 0 1-12.5 7.3L3.6 20.4l1.4-4.2a8.4 8.4 0 1 1 15.4-4.5z"/><path d="M9 8.6c.2-.4.4-.4.6-.4h.4c.2 0 .4 0 .6.4l.6 1.5c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .5a6.4 6.4 0 0 0 2.7 2.4c.3.1.4.1.5-.1l.5-.6c.2-.2.3-.2.5-.1l1.5.7c.2.1.3.2.3.4 0 .5-.4 1.3-1.2 1.4-.8.1-1.7.1-3.7-1.1a8.9 8.9 0 0 1-3-3.4c-.4-.8-.5-1.5-.4-2z"/>',
} as const;

export type IconName = keyof typeof icons;
