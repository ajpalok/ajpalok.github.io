export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/ajpalok',
    username: 'ajpalok',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/ajpalok',
    username: 'ajpalok',
    icon: 'linkedin',
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/14387700',
    username: '14387700',
    icon: 'stackoverflow',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/ajpalok',
    username: 'ajpalok',
    icon: 'twitter',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/ajpalok_insta',
    username: 'ajpalok_insta',
    icon: 'instagram',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/ajpalok.fb',
    username: 'ajpalok.fb',
    icon: 'facebook',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@ajpalok',
    username: '@ajpalok',
    icon: 'youtube',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@ajpalok',
    username: '@ajpalok',
    icon: 'medium',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/ajpalok',
    username: '@ajpalok',
    icon: 'telegram',
  },
];

export function getSocialMediaLinksJSON() {
  return [
    {
      en: {
        title: 'Connect with me on social media',
        links: SOCIAL_LINKS,
      },
    },
  ];
}

export function getSocialSameAsUrls() {
  return SOCIAL_LINKS.map((link) => link.url);
}
