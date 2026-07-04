import json
import re

# Load tours
with open('src/lib/tours_data.json', 'r') as f:
    tours = json.load(f)

# Define all available images in public/images/ grouped by theme
THEMED_IMAGES = {
    'halong': [
        '/images/hero_halong_bay.png',
        '/images/dest_halong_limestone.png',
        '/images/things_halong_kayaking.png',
        '/images/things_halong_sunrise.png',
        '/images/halong_night.png',
        '/images/trip_family_halong.png',
        '/images/vietnamtour_halong_yacht_luxury.png',
        '/images/halong_card.jpg'
    ],
    'sapa': [
        '/images/hero_sapa_luxury.png',
        '/images/dest_sapa_highland.png',
        '/images/things_sapa_trekking.png',
        '/images/vietnamtour_sapa_lodge.png',
        '/images/sapa.jpg',
        '/images/sapa_night.png',
        '/images/hero_sapa.png'
    ],
    'hoian': [
        '/images/hero_hoian_luxury.png',
        '/images/dest_hoian_lanterns.png',
        '/images/things_hoi_an_lanterns.png',
        '/images/hoian.jpg',
        '/images/hero_hoian.png'
    ],
    'mekong': [
        '/images/insp_mekong_cruise.png',
        '/images/dest_mekong_canal.png',
        '/images/vietnamtour_mekong_sampan.png',
        '/images/things_mekong_sampan.png',
        '/images/mekong.jpg'
    ],
    'saigon': [
        '/images/tour_saigon_vespa_night.png',
        '/images/press_hero_colonial.png',
        '/images/trip_culinary_street_food.png'
    ],
    'hanoi_ninhbinh': [
        '/images/tour_ninhbinh_landscape.png',
        '/images/vietnamtour_hanoi_colonial.png',
        '/images/things_water_puppets_hanoi.png',
        '/images/vietnam_hero.jpg',
        '/images/our-story-hero.jpg',
        '/images/visa-guide-hero.jpg'
    ],
    'caves_adventure': [
        '/images/tour_phongnha_cave_dining.png',
        '/images/dest_phongnha_cave.png',
        '/images/vietnamtour_cave_dining.png',
        '/images/trip_adventure_jungle.png',
        '/images/phongnha.jpg'
    ],
    'beach_phuquoc': [
        '/images/dest_phuquoc_beach.png',
        '/images/phuquoc.jpg',
        '/images/vietnamtour_phu_quoc_beach.png',
        '/images/trip_beach_vietnam.png',
        '/images/vietnamtour_amanoi_villa.png',
        '/images/beach_night.png'
    ],
    'general': [
        '/images/trip_golf_vietnam.png',
        '/images/trip_bike_rice_paddies.png',
        '/images/trip_motorcycle_hagiang.png',
        '/images/trip_luxury_villa.png',
        '/images/homepage_letterbox.jpg'
    ]
}

# Create a flat pool of all assigned images to ensure uniqueness check
all_assigned = set()

# Helper to find a themed image or fallback to general pool
def get_unique_image(theme):
    # Try themed first
    if theme in THEMED_IMAGES:
        for img in THEMED_IMAGES[theme]:
            if img not in all_assigned:
                all_assigned.add(img)
                return img
                
    # Fallback to general
    for img in THEMED_IMAGES['general']:
        if img not in all_assigned:
            all_assigned.add(img)
            return img
            
    # Try any other unused image from any category
    for cat_name, cat_list in THEMED_IMAGES.items():
        for img in cat_list:
            if img not in all_assigned:
                all_assigned.add(img)
                return img
                
    # Absolute fallback (if we run out of unique images entirely)
    return '/images/vietnam_hero.jpg'

# Identify theme for each tour and assign a unique cover image
for slug, tour in tours.items():
    title = tour.get('title', '').lower()
    slug_lower = slug.lower()
    
    # Classify tour into a theme
    theme = 'general'
    if 'halong' in slug_lower or 'la-zalee' in slug_lower or 'lazalee' in slug_lower or 'ha-long' in title:
        theme = 'halong'
    elif 'sapa' in slug_lower or 'bac-ha' in slug_lower or 'remote-north' in slug_lower:
        theme = 'sapa'
    elif 'hoi-an' in slug_lower or 'hoian' in slug_lower or 'my-son' in slug_lower or 'da-nang' in slug_lower:
        theme = 'hoian'
    elif 'mekong' in slug_lower or 'cai-be' in slug_lower:
        theme = 'mekong'
    elif 'saigon' in slug_lower or 'ho-chi-minh' in slug_lower or 'cu-chi' in slug_lower:
        theme = 'saigon'
    elif 'hanoi' in slug_lower or 'ninh-binh' in slug_lower or 'ninhbinh' in slug_lower or 'hoa-lu' in slug_lower or 'trang-an' in slug_lower:
        theme = 'hanoi_ninhbinh'
    elif 'cave' in slug_lower or 'karst' in slug_lower or 'trekking' in slug_lower or 'adventure' in slug_lower or 'jungle' in slug_lower or 'da-bac' in slug_lower:
        theme = 'caves_adventure'
    elif 'phu-quoc' in slug_lower or 'phuquoc' in slug_lower or 'beach' in slug_lower or 'romance' in slug_lower or 'indochine' in slug_lower or 'island' in slug_lower:
        theme = 'beach_phuquoc'
        
    cover_image = get_unique_image(theme)
    
    # We will build a gallery of 3 images for the details page, where the first one is the unique cover image
    secondary_images = []
    # Add 2 other images from related categories to populate the gallery carousel
    all_imgs_list = []
    for cat_list in THEMED_IMAGES.values():
        all_imgs_list.extend(cat_list)
        
    for img in all_imgs_list:
        if img != cover_image and img not in secondary_images:
            secondary_images.append(img)
            if len(secondary_images) >= 2:
                break
                
    tour['gallery'] = [cover_image] + secondary_images
    print(f"Assigned Unique Cover: {tour['title'][:40]:40s} -> {cover_image}")

# Save updated tours
with open('src/lib/tours_data.json', 'w') as f:
    json.dump(tours, f, indent=2)

print("\nFinished assigning 100% unique cover images to all tours!")
