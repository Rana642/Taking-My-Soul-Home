import math
from PIL import Image, ImageDraw, ImageFilter

# Create a 512x512 transparent canvas
width, height = 512, 512
img = Image.new('RGBA', (width, height), (0, 0, 0, 0))

# We will generate both favicon.png and favicon.ico
