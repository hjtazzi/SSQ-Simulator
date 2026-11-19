export const AppName = 'SSQ Simulator' as const;
export const AppPrefix = 'SSQS' as const;

export const AppPaths = {
  Home: '/home',
  ContactMe: '/contact-me',

  Error: '/500',
  NotFound: '/404',
} as const;

export type AppPaths = (typeof AppPaths)[keyof typeof AppPaths];

export const Contacts = {
  github: "https://github.com/hjtazzi",
  linkedin: "https://linkedin.com/in/hojjat-azizi",
  email: "hjtazzi@gmail.com"
} as const;
