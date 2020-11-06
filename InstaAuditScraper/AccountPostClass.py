class Account():
    def __init__(self, name):
        self.name = name
        #self.followers = followers
        self.posts = []
        
    def __str__(self):
        return "Name: %s " % (self.name)
        
        

class Post():
    def __init__(self, path=None, id=None, likes=None, comments=None, timestamp=None, ranking = None, dom_color = None, color_temp = None, colorfulness = None, saturation = None, sharpness = None, contrast = None, noise = None, total_clip=None, face = None):
        self.id = id
        self.path = path
        self.comments = comments
        self.likes = likes
        self.timestamp = timestamp
        self.ranking = ranking
        self.dom_color = dom_color
        self.color_temp = color_temp
        self.colorfulness = colorfulness
        self.saturation = saturation
        self.sharpness = sharpness
        self.contrast = contrast
        self.noise = noise
        self.whiteclip = None
        self.blackclip = None
        self.total_clip = total_clip
        self.face = face
    
    def __str__(self):
        return '''
    
    Path:           %s
    Likes:          %s
    Ranking:        %s 
    Dom Color:      %s
    Color Temp:     %s
    Colorfulness:   %s
    Saturation:     %s
    Sharpness:      %s
    Contrast:       %s
    Noise:          %s
    Clipping:       %s
    Face:           %s

                ''' % (self.path,
                self.likes,
                self.ranking, 
                self.dom_color,
                self.color_temp,
                self.colorfulness,
                self.saturation,
                self.sharpness,
                self.contrast,
                self.noise,
                self.total_clip,
                self.face
                
                )
        