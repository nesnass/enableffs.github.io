#!/usr/bin/python
# This script downloads youtube videos and adds them to correct content areas for use when internet connectivity is unavailable



from subprocess import call
videos = []

# Define an object to store the references
class Video(object):
    """__init__() functions as the class constructor"""
    def __init__(self, id=None, category=None):
        self.id = id
        self.category = category





######################################################################################################
####################### Modify the video Youtube URLs and local locations here #######################
######################################################################################################


# Subtitle language codes to look for:
languages = ['en', 'sw', 'fr']


# videos.append(Video(id, category))
# where 'url' is the unique Youtube id taken from the 'Video URL' field
# and 'category' is the section or subfolder name e.g. 'dual', 'hearing', 'vision' etc..


videos.append(Video("YZlHgb0n2b4", "vision"))       # Disability is not inability
videos.append(Video("chJcfaP12Zc", "vision"))       # Blind woman make baskets
videos.append(Video("owxORyUdYec", "vision"))       # A blind taylor trains students with visual impairment
videos.append(Video("9hLupgYcHqU", "vision"))       # Blind students learn to use computers
videos.append(Video("abapaB5Dvgk", "dual"))         # Deafblind students at Kilimani Deafblind Unit in Nairobi
videos.append(Video("EhvIfOFSXCQ", "dual"))         # Joy of life
videos.append(Video("lofZBB7wNso", "dual"))         # Using tactile senses
videos.append(Video("sT2OagpoOhg", "hearing"))      # Vocational training for deaf in secondary school
videos.append(Video("-VoZZJZrhDY", "hearing"))      # Interpreters learning sign language
videos.append(Video("viFMjSzrI6o", "hearing"))      # Information about sexual issues for deaf students
videos.append(Video("2OI3-qMk_1I", "hearing"))      # Deaf children make sandwiches
videos.append(Video("XcyaN7ayLkE", "hearing"))      # Vocational training deaf students
videos.append(Video("Aney9RqlvIs", "hearing"))      # Vocational training deaf women
videos.append(Video("UwRZgrTeT74", "hearing"))      # Deaf preschool children learning sign through physical activity
videos.append(Video("sEFig4BJOI8", "vision"))       # Blind children learn to type on Perkins braille-writer
videos.append(Video("TZZOvuGZ17w", "vision"))       # From written text to Braille
videos.append(Video("65_pQQpnI24", "vision"))       # Inclusion at Bishop Willis Demonstration School in Iganga, Uganda
videos.append(Video("5S8MYNvfeWc", "vision"))       # Blind student moving around at the campus with white cane
videos.append(Video("GkaNi4MIPuQ", "vision"))       # Use of concrete materials in the learning process
videos.append(Video("1W-B0rqiEGk", "vision"))       # Blind students without white canes
videos.append(Video("3E7Sam17rTs", "vision"))       # Blind students moving around


######################################################################################################
######################################################################################################







# This function makes calls to 'youtube-dl' and 'mv' shell commands
def downloadVideo(video):
    videoUrl = 'https://youtu.be/' + video.id
    videoFilename = video.id + '.mp4'
    newPath = '../../' + video.category + '/media/vids/'

    call(['youtube-dl', '--id', '--write-sub', '--all-subs', videoUrl])
    print "Downloaded %s" % videoUrl

    call(['mkdir', newPath])
    call(['mv', videoFilename, newPath])
    print "Moved video %s to %s" % (videoFilename, newPath)

    for language in languages:
        subtitleFilename = video.id + '.' + language + '.vtt'
        result = call(['mv', subtitleFilename, newPath])
        if result == 0:
            print "Moved subtitles %s to %s" % (subtitleFilename, newPath)

# Begin - download each video and move it to the correct location
for video in videos:
	downloadVideo(video)
