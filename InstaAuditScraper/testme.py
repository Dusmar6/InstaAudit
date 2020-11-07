import base64
import sys
import responder 

img = sys.argv[0]

path = "image.png"
with open(path, "wb") as fh:
    fh.write(base64.decodebytes(img))

print(responder.test_image(path))











