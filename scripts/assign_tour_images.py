import json
import re

# Load tours data
with open('src/lib/tours_data.json', 'r') as f:
    tours = json.load(f)

# Image mapping by keywords in tour title/slug
# Using images available in /images/
IMAGE_RULES = [
    # Multi-day tours - premier images
    (['vietnam-in-depth', 'grand-tour', 'north-to-south', 'south-to-north', 'essence-of-vietnam'], [
        '/images/hero_halong_luxury.png',
        '/images/hero_hoian_luxury.png',
        '/images/vietnamtour_halong_yacht_luxury.png',
    ]),
    # Caves, trekking, adventure
    (['caves', 'karst', 'trekking', 'adventure', 'remote', 'jungle', 'da-bac'], [
        '/images/dest_phongnha_cave.png',
        '/images/things_sapa_trekking.png',
        '/images/trip_adventure_jungle.png',
    ]),
    # Halong bay tours
    (['halong', 'lazalee', 'seaplane', 'off-beaten', 'junk', 'ha-long'], [
        '/images/hero_halong_bay.png',
        '/images/dest_halong_limestone.png',
        '/images/things_halong_kayaking.png',
        '/images/things_halong_sunrise.png',
        '/images/halong_night.png',
    ]),
    # Sapa / Northern highlands
    (['sapa', 'bac-ha', 'remote-north', 'highland'], [
        '/images/hero_sapa_luxury.png',
        '/images/dest_sapa_highland.png',
        '/images/things_sapa_trekking.png',
        '/images/trip_bike_rice_paddies.png',
    ]),
    # Hoi An tours
    (['hoi-an', 'hoi_an', 'hoian', 'farming-fishing', 'essence-of-hoi', 'vespa'], [
        '/images/hero_hoian_luxury.png',
        '/images/dest_hoian_lanterns.png',
        '/images/things_hoi_an_lanterns.png',
        '/images/hoian.jpg',
    ]),
    # Mekong delta tours
    (['mekong', 'cai-be', 'delta', 'le-jarai'], [
        '/images/insp_mekong_cruise.png',
        '/images/dest_mekong_canal.png',
        '/images/mekong.jpg',
        '/images/things_mekong_sampan.png',
        '/images/vietnamtour_mekong_sampan.png',
    ]),
    # Ho Chi Minh / Saigon tours
    (['saigon', 'ho-chi-minh', 'cu-chi', 'story-of-saigon', 'craft-beer'], [
        '/images/press_hero_colonial.png',
        '/images/vietnamtour_hanoi_colonial.png',
        '/images/trip_culinary_street_food.png',
    ]),
    # Hanoi tours
    (['hanoi', 'ninh-binh', 'hoa-lu', 'trang-an', 'street-eats'], [
        '/images/vietnamtour_hanoi_colonial.png',
        '/images/things_water_puppets_hanoi.png',
        '/images/press_hero_colonial.png',
        '/images/things_cooking_class_hue.png',
    ]),
    # Hue tours
    (['hue', 'hue-city', 'hue-countryside', 'perfume'], [
        '/images/insp_heritage_overland.png',
        '/images/things_hoi_an_lanterns.png',
        '/images/hero_hoian.png',
    ]),
    # Da Nang, My Son
    (['da-nang', 'my-son', 'da_nang'], [
        '/images/hero_hoian.png',
        '/images/dest_hoian_lanterns.png',
        '/images/insp_heritage_overland.png',
    ]),
    # Phu Quoc / Beach
    (['phu-quoc', 'beach', 'romance', 'indochine', 'island'], [
        '/images/dest_phuquoc_beach.png',
        '/images/vietnamtour_phu_quoc_beach.png',
        '/images/trip_beach_vietnam.png',
        '/images/vietnamtour_amanoi_villa.png',
    ]),
    # Gourmet / Culinary
    (['gourmet', 'culinary', 'street-eats', 'street-food', 'food', 'cooking'], [
        '/images/trip_culinary_street_food.png',
        '/images/things_cooking_class_hue.png',
        '/images/things_mekong_sampan.png',
    ]),
    # Motorcycle / Bike tours
    (['motorcycle', 'bike', 'cycling', 'vespa', 'countryside'], [
        '/images/trip_motorcycle_hagiang.png',
        '/images/trip_bike_rice_paddies.png',
        '/images/hero_sapa.png',
    ]),
    # Luxury / Villa
    (['luxury', 'style', 'local-s-story', 'classic'], [
        '/images/vietnamtour_halong_yacht_luxury.png',
        '/images/vietnamtour_amanoi_villa.png',
        '/images/trip_luxury_villa.png',
        '/images/hero_halong_luxury.png',
    ]),
    # Family
    (['family', 'kids', 'local-life'], [
        '/images/trip_family_halong.png',
        '/images/things_hoi_an_lanterns.png',
        '/images/dest_hoian_lanterns.png',
    ]),
    # Highlights / General Vietnam
    (['highlights', 'uncover', 'discover', 'kong', 'skull-island'], [
        '/images/hero_halong_luxury.png',
        '/images/dest_halong_limestone.png',
        '/images/hero_hoian_luxury.png',
    ]),
]

# Default fallback images
DEFAULT_IMAGES = [
    '/images/vietnam_hero.jpg',
    '/images/hero_halong_bay.png',
    '/images/hero_hoian.png',
]

def get_images_for_tour(slug, title):
    slug_lower = slug.lower()
    title_lower = title.lower()
    
    for keywords, images in IMAGE_RULES:
        for kw in keywords:
            if kw in slug_lower or kw.replace('-', ' ') in title_lower:
                return images
    
    return DEFAULT_IMAGES

# Update gallery for each tour
updated_count = 0
for slug, tour in tours.items():
    images = get_images_for_tour(slug, tour.get('title', ''))
    tours[slug]['gallery'] = images
    updated_count += 1
    print(f"  {tour['title'][:50]:50s} -> {images[0].split('/')[-1]}")

# Save updated tours
with open('src/lib/tours_data.json', 'w') as f:
    json.dump(tours, f, indent=2)

print(f"\nUpdated gallery images for {updated_count} tours!")
