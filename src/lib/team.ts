import type { Specialist } from '@/sanity/types';

const TEAM_PORTRAITS = [
  '/images/specialist_alice.png',
  '/images/specialist_james.png',
] as const;

export function specialistAvatarFor(seed = ''): string {
  if (!seed) return TEAM_PORTRAITS[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return TEAM_PORTRAITS[hash % TEAM_PORTRAITS.length];
}

export const travelTeam: Specialist = {
  _id: 'travel-team',
  name: 'VietnamTours travel team',
  slug: { current: '' },
  image: TEAM_PORTRAITS[0],
  role: 'Private trip planning',
  email: 'info@vietnamtours.co.uk',
  phone: '+84988600388',
  bio: [],
  favoriteDestinations: [],
  expertTips: [],
};

export function hasVerifiedProfile(specialist?: Specialist | null): specialist is Specialist {
  return specialist?.profileVerified === true && !!specialist.profileEvidenceUrl;
}

export function publicSpecialist(specialist?: Specialist | null): Specialist {
  return hasVerifiedProfile(specialist) ? specialist : travelTeam;
}
