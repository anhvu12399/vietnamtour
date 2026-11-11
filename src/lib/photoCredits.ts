import unsplashCredits from '../../public/images/unsplash/credits.json';
import commonsCredits from '../../public/images/commons/credits.json';

export interface CreditEntry {
  file: string;
  path: string;
  title: string;
  photographer: string;
  source: string;
  license: string;
  description: string;
  origin: 'commons' | 'unsplash';
}

export const commonsPhotoCredits: CreditEntry[] = commonsCredits.map((credit) => ({
  file: credit.file,
  path: `/images/commons/${credit.file}`,
  title: credit.title,
  photographer: credit.photographer,
  source: credit.source,
  license: credit.license,
  description: credit.description || credit.title,
  origin: 'commons',
}));

export const photoCredits: CreditEntry[] = [
  ...unsplashCredits.map((credit) => ({
    file: credit.file,
    path: `/images/unsplash/${credit.file}`,
    title: credit.description || credit.file,
    photographer: credit.photographer,
    source: credit.source,
    license: credit.license,
    description: credit.description || credit.file,
    origin: 'unsplash' as const,
  })),
  ...commonsPhotoCredits,
].sort((left, right) => left.file.localeCompare(right.file));

const creditByPath = new Map(photoCredits.map((entry) => [entry.path, entry]));

export function creditForImagePath(src: string): CreditEntry | undefined {
  return creditByPath.get(src);
}

export function licenseUrl(license: string): string {
  if (license === 'Unsplash License') return 'https://unsplash.com/license';
  if (license === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/';
  if (license === 'Public domain') return 'https://creativecommons.org/publicdomain/mark/1.0/';
  const match = license.match(/^CC BY(-SA)? (\d+\.\d+)$/);
  if (match) return `https://creativecommons.org/licenses/by${match[1] ? '-sa' : ''}/${match[2]}/`;
  return 'https://commons.wikimedia.org/wiki/Commons:Licensing';
}

export function editorialImageDescription(src: string): string {
  const filename = src.split('/').pop();
  const credit = creditByPath.get(src) || photoCredits.find((item) => item.file === filename);
  return credit?.description || credit?.title || 'Vietnam travel photograph';
}
