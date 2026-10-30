import type { Specialist } from '@/sanity/types';

export const travelTeam: Specialist = {
  _id: 'travel-team', name: 'VietnamTours travel team', slug: { current: '' },
  image: '/logo-sun-hat.png', role: 'Private trip planning', email: 'info@vietnamtours.co.uk',
  phone: '+84988600388', bio: [], favoriteDestinations: [], expertTips: [],
};
export function hasVerifiedProfile(specialist?: Specialist | null): specialist is Specialist {
  return specialist?.profileVerified === true && !!specialist.profileEvidenceUrl;
}
export function publicSpecialist(specialist?: Specialist | null): Specialist {
  return hasVerifiedProfile(specialist) ? specialist : travelTeam;
}
