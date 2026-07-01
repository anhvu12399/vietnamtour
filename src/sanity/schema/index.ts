import { itinerary } from './itinerary';
import { accommodation } from './accommodation';
import { specialist } from './specialist';
import { enquiry } from './enquiry';
import { destination } from './destination';
import { homepage } from './homepage';
import { about } from './about';
import { cruise } from './cruise';
import { travelGuide } from './travelGuide';
import { post } from './post';
import { seoFields } from './seoFields';
import { toursLanding } from './toursLanding';
import { tripIdea } from './tripIdea';
import { inspiration } from './inspiration';
import { monthGuide } from './monthGuide';
import { thingToDo } from './thingToDo';
import { blogPost } from './blogPost';
import { mediaAsset } from './mediaAsset';

export const schemaTypes = [
  // ─── Core Pages ───────────────────────
  homepage,
  about,

  // ─── Tours & Travel ───────────────────
  itinerary,
  cruise,
  destination,
  accommodation,

  // ─── Editorial Content ────────────────
  travelGuide,
  post,
  blogPost,
  tripIdea,
  inspiration,
  monthGuide,
  thingToDo,

  // ─── Media & Assets ───────────────────
  mediaAsset,

  // ─── People & Forms ───────────────────
  specialist,
  enquiry,

  // ─── Configuration ────────────────────
  seoFields,
  toursLanding,
];
