import numpy as np
import cv2
from PIL import Image
from colorthief import ColorThief
import colour
import imutils
import webcolor
from skimage.restoration import estimate_sigma
import AccountPostClass as ac


def fillout(post):
    
    image  = cv2.imread(post.path)
    
    post.dom_color = image_dominant_color(post.path)
        
    post.color_temp = image_color_temperature(post.path)
        
    post.colorfulness = image_colorfulness(image = image)
        
    post.sharpness = image_sharpness(post.path)
        
    post.contrast = image_contrast(image = image)
        
    post.saturation = image_saturation(image = image)
        
    post.noise = image_noise(image = image)
        
    post.total_clip = image_clipping(post.path)
        
    post.face = image_face(post.path)
    
    return post


#returns the RGB of the dominant color, needed for color temperature
def image_dominant_color_rgb(path):
    color_thief = ColorThief(path)
    return color_thief.get_color(quality=1)

#returns color name
def image_dominant_color(path):
    color_thief = ColorThief(path)
    return get_color_name(color_thief.get_color(quality=1))[1]


def closest_color(requested_colour):
    min_colours = {}
    #we might want to use css2 here instead, many of the values arent overlapping which is what we want to see trends easier
    for key, name in webcolor.css3_hex_to_names.items():
        
        #runs through each available color name to see what is closest
        r_c, g_c, b_c = webcolor.hex_to_rgb(key)
        rd = (r_c - requested_colour[0]) ** 2
        gd = (g_c - requested_colour[1]) ** 2
        bd = (b_c - requested_colour[2]) ** 2
        min_colours[(rd + gd + bd)] = name
    return min_colours[min(min_colours.keys())]

def get_color_name(requested_colour):
    try:
        # this will error out if there is no color name close enough to the actual color
        closest_name = actual_name = webcolor.rgb_to_name(requested_colour)
        
    except Exception:
        #if it errors out, get the closest available color
        closest_name = closest_color(requested_colour)
        actual_name = None
        
        #might not need actual_name, it never gets an actual
    return actual_name, closest_name


#might not need this metric, it seems to perform very similar to the saturation metric
def image_colorfulness(path = None, image = None):
    if image == None:
        image = cv2.imread(path)
    image2 = imutils.resize(image, width=250)
    (B, G, R) = cv2.split(image2.astype("float"))
    rg = np.absolute(R - G)
    yb = np.absolute(0.5 * (R + G) - B)
    
    (rbMean, rbStd) = (np.mean(rg), np.std(rg))
    (ybMean, ybStd) = (np.mean(yb), np.std(yb))
    
    stdRoot = np.sqrt((rbStd ** 2) + (ybStd ** 2))
    meanRoot = np.sqrt((rbMean ** 2) + (ybMean ** 2))
    
    return stdRoot + (0.3 * meanRoot)

def image_sharpness(path):
    # converts image to greyscale
    im = Image.open(path).convert('L') 
    
    #turns the image into an array of pixels
    array = np.asarray(im, dtype=np.int32)
    
    #calculates the gradient of the array (how similar each pixel is to its neighbor)
    gy, gx = np.gradient(array)
    gnorm = np.sqrt(gx**2 + gy**2)
    
    return np.average(gnorm)


def image_contrast(path = None, image = None):
    #converts to an opencv image object
    if image == None:
        image = cv2.imread(path)
    #converts to greyscale
    img_grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    #takes the standard deviation of contrast between the gray pixels across the image
    contrast = img_grey.std()
    return contrast

def image_saturation(path = None, image = None):
    #converts to an opencv image object
    if image == None:
        image = cv2.imread(path)
    img_hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    return img_hsv[:, :, 1].mean()

def image_color_temperature(path):
    #convert image to array of pixels
    array = np.array(image_dominant_color_rgb(path))
    
    #conver to xyz https://www.colourphil.co.uk/xyz_colour_space.shtml
    XYZ = colour.sRGB_to_XYZ(array / 255)
    
    #dont need the z value
    xy = colour.XYZ_to_xy(XYZ)
    
    #convert to its kelvin temperature
    CCT = colour.xy_to_CCT(xy, 'hernandez1999')
    return CCT

def image_noise(path = None, image = None):
    #converts to an opencv image object
    if image == None:
        image = cv2.imread(path)
    return estimate_sigma(image, multichannel=True, average_sigmas=True)

def white_clipping(img):
    #gets how many pure white pizels there are
   
    total_pixels = img.size
    white_pixels = np.sum(img >= [255, 255, 255]) 
    return float(white_pixels/total_pixels*100)
    
def black_clipping(img):
    #gets how many pure black pixels there are

    total_pixels = img.size
    black_pixels = np.sum(img >= [0, 0, 0])
    return float(black_pixels/total_pixels)

def image_clipping(path):
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    #combines white and black to get the percentage of total clipped pixels
    return white_clipping(img) + black_clipping(img)
    
def image_face(path):
    #using openCV's built in object classifier
    
    #eyes were much more accurate for detecting faces than using the facial detector
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye_tree_eyeglasses.xml') #open source dataset
    # Read the input image
    image = cv2.imread(path)
    # Convert into grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    try:
        eyes = eye_cascade.detectMultiScale(gray, 1.1, 4)
    except Exception as e:
        print(e)
        return False
    #if there are no faces, for some reason its a tuple
    if isinstance(eyes, tuple):
        return False
    else:
        return True
    
    '''
    for (x, y, w, h) in eyes:
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        # Display the output
        cv2.imshow('img', img)
        cv2.waitKey()

    '''
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    