/**
 * Unsplash (https://unsplash.com/license) — 상업 이용 가능.
 * 2025-05 기준 images.unsplash.com GET 200 확인된 id만 사용.
 */
const q900 = "?auto=format&fit=crop&w=900&q=80";
const q1200 = "?auto=format&fit=crop&w=1200&q=80";

export const stock = {
  dogGroom: `https://images.unsplash.com/photo-1543466835-00a7907e9de1${q1200}`,
  dogHappy: `https://images.unsplash.com/photo-1587300003388-59208cc962cb${q1200}`,
  dogCat: `https://images.unsplash.com/photo-1450778869180-41d0601e046e${q1200}`,
  puppy: `https://images.unsplash.com/photo-1543466835-00a7907e9de1${q900}`,
  kitten: `https://images.unsplash.com/photo-1574158622682-e40e69881006${q900}`,
  hotelDog: `https://images.unsplash.com/photo-1530281700549-e82e7bf110d6${q1200}`,
  vet: `https://images.unsplash.com/photo-1583337130417-3346a1be7dee${q1200}`,
  treats: `https://images.unsplash.com/photo-1589924691995-400dc9ecc119${q1200}`,
  kibble: `https://images.unsplash.com/photo-1589924691995-400dc9ecc119${q1200}`,
  bowls: `https://images.unsplash.com/photo-1548199973-03cce0bbc87b${q1200}`,
  spaTowel: `https://images.unsplash.com/photo-1548199973-03cce0bbc87b${q1200}`,
  groomBefore: `https://images.unsplash.com/photo-1583511655857-d19b40a7a54e${q1200}`,
  groomStudio: `https://images.unsplash.com/photo-1543466835-00a7907e9de1${q1200}`,
  poodle: `https://images.unsplash.com/photo-1629909613654-28e377c37b09${q1200}`,
  shiba: `https://images.unsplash.com/photo-1588943211346-0908a1fb0b01${q1200}`,
  hotelRoom: `https://images.unsplash.com/photo-1530281700549-e82e7bf110d6${q1200}`,
  hotelPlay: `https://images.unsplash.com/photo-1601758228041-f3b2795255f1${q1200}`,
  snackShelf: `https://images.unsplash.com/photo-1589924691995-400dc9ecc119${q1200}`,
  snackBowl: `https://images.unsplash.com/photo-1589924691995-400dc9ecc119${q1200}`,
  vetExam: `https://images.unsplash.com/photo-1583337130417-3346a1be7dee${q1200}`,
  vetSmile: `https://images.unsplash.com/photo-1583337130417-3346a1be7dee${q1200}`,
  /** 수의사와 반려동물(진료·안내 분위기) */
  vetWithDog: `https://images.unsplash.com/photo-1583337130417-3346a1be7dee${q1200}`,
  groomAfterShine: `https://images.unsplash.com/photo-1587300003388-59208cc962cb${q1200}`,
  breedChihuahua: `https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a${q900}`,
  breedMaltese: `https://images.unsplash.com/photo-1560807707-8cc77767d783${q900}`,
  breedYorkie: `https://images.unsplash.com/photo-1543466835-00a7907e9de1${q900}`,
  groomerStaff: `https://images.unsplash.com/photo-1601758228041-f3b2795255f1${q1200}`,
  staffPickSnacks: `https://images.unsplash.com/photo-1589924691995-400dc9ecc119${q1200}`,
} as const;
