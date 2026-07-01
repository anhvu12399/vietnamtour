'use server';

import { getSpecialists } from '@/sanity/client';
import { Specialist } from '@/sanity/types';

export async function fetchMainSpecialistAction(): Promise<Specialist | null> {
  const specialists = await getSpecialists();
  return specialists[0] || null;
}
