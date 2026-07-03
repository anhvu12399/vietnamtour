with open('src/sanity/mockData.ts', 'r') as f:
    content = f.read()

# Replace any unescaped single quotes inside the text
content = content.replace("Old Quarter's", "Old Quarter\\'s")
content = content.replace("Quarter's", "Quarter\\'s")
content = content.replace("Vietnam's", "Vietnam\\'s")
content = content.replace("today's", "today\\'s")
content = content.replace("didn't", "didn\\'t")
content = content.replace("aren't", "aren\\'t")
content = content.replace("don't", "don\\'t")
content = content.replace("It's", "It\\'s")
content = content.replace("that's", "that\\'s")
content = content.replace("can't", "can\\'t")
content = content.replace("doesn't", "doesn\\'t")
content = content.replace("won't", "won\\'t")
content = content.replace("Emperor Khai Dinh and Minh Mang. Enjoy a vegetarian lunch prepared by Buddhist nuns at Dong Thuyen Pagoda. In the afternoon, visit Thanh Tien village to learn paper flower making and tour the 19th-century Tha Om Garden House with the royal descendant owner.", "Emperor Khai Dinh and Minh Mang. Enjoy a vegetarian lunch prepared by Buddhist nuns at Dong Thuyen Pagoda. In the afternoon, visit Thanh Tien village to learn paper flower making and tour the 19th-century Tha Om Garden House with the royal descendant owner.")

with open('src/sanity/mockData.ts', 'w') as f:
    f.write(content)

print("Quotes fixed!")
