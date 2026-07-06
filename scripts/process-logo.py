import sys
from PIL import Image, ImageOps

def make_transparent_and_crop(img_path, output_path):
    img = Image.open(img_path).convert("RGBA")
    
    # Get pixel data
    data = img.getdata()
    
    newData = []
    for item in data:
        # If pixel is very close to white (RGB > 240), make it transparent
        if item[0] > 245 and item[1] > 245 and item[2] > 245:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # Get bounding box of non-transparent elements to auto-crop the logo
    alpha = img.split()[-1]
    bbox = alpha.getbbox()
    if bbox:
        # Add a tiny padding of 5 pixels around the logo
        padding = 10
        left = max(0, bbox[0] - padding)
        top = max(0, bbox[1] - padding)
        right = min(img.width, bbox[2] + padding)
        bottom = min(img.height, bbox[3] + padding)
        img = img.crop((left, top, right, bottom))
        
    img.save(output_path, "PNG")
    print("Logo processed and cropped successfully!")

if __name__ == '__main__':
    make_transparent_and_crop(
        '/Users/mac/.gemini/antigravity-ide/brain/9b4095ab-1ea0-4e0c-9f89-8ff666b96b19/media__1783355750467.png',
        '/Users/mac/ai-website-cloner-template/public/logo-sun-hat.png'
    )
