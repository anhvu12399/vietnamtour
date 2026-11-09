import unsplashCredits from '../../public/images/unsplash/credits.json';
import commonsCredits from '../../public/images/commons/credits.json';

export const photoCredits = [
  ...unsplashCredits.map((credit) => ({
    file: credit.file,
    title: credit.description,
    photographer: credit.photographer,
    source: credit.source,
    license: credit.license,
    description: credit.description,
  })),
  ...commonsCredits.map((credit) => ({
    file: credit.file,
    title: credit.title,
    photographer: credit.photographer,
    source: credit.source,
    license: credit.license,
    description: credit.description || credit.title,
  })),
].sort((left, right) => left.file.localeCompare(right.file));

export function editorialImageDescription(src: string): string {
  const filename = src.split('/').pop();
  const credit = photoCredits.find((item) => item.file === filename);
  return credit?.description || credit?.title || 'Vietnam travel photograph';
}
