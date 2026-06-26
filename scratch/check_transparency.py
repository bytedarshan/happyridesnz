from PIL import Image

def analyze_image(path):
    im = Image.open(path)
    im = im.convert('RGBA')
    width, height = im.size
    # Check the corners
    corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    print(f"Analyzing {path}:")
    for x, y in corners:
        pixel = im.getpixel((x, y))
        print(f"  Pixel at ({x}, {y}): {pixel}")
    
    # Check if there are any transparent pixels at all
    transparent_pixels = 0
    white_pixels = 0
    other_pixels = 0
    for x in range(0, width, 10):
        for y in range(0, height, 10):
            r, g, b, a = im.getpixel((x, y))
            if a < 50:
                transparent_pixels += 1
            elif r > 240 and g > 240 and b > 240:
                white_pixels += 1
            else:
                other_pixels += 1
    total = transparent_pixels + white_pixels + other_pixels
    print(f"  Sampled pixels: transparent={transparent_pixels} ({transparent_pixels/total*100:.1f}%), white={white_pixels} ({white_pixels/total*100:.1f}%), other={other_pixels} ({other_pixels/total*100:.1f}%)")

analyze_image('public/image8.png')
analyze_image('public/logo.png')
