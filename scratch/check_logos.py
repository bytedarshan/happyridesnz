from PIL import Image
import os

files = ['public/image8.png', 'public/logo.png', 'public/logo_new.jpg']
for f in files:
    if os.path.exists(f):
        try:
            im = Image.open(f)
            print(f"{f}: format={im.format}, size={im.size}, mode={im.mode}")
            # check transparency
            if 'A' in im.mode or im.info.get('transparency') is not None:
                print("  Has transparency channel / info")
            else:
                print("  No transparency channel")
        except Exception as e:
            print(f"Error opening {f}: {e}")
    else:
        print(f"{f} does not exist")
