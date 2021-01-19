---
layout: post
title: wbar 
description: test wbar post
slug: "/wbar"
---

This was my first other-people-will-see-this work. I was the technical director at [WBAR](http://wbar.org) when the massive Python 2.7 to Python 3 change took place, and despite how many warnings and heads-ups Python put out, I was blissfully unaware that the backend of our server would stop working all of a sudden. The day before we were set to go live for the 2019 fall semester, I was one of the four people that decided, without any experience in Django development, to try and "fix" the server. We spent six hours in a room and by the fifth hour had produced nothing of any use except for a massive copy of our old server. 

We were torn between whether we should continue with the Django "Polls App" tutorial or if we should try to StackOverflow brute-force our way into something functional. With one hour left, we all decided that I was of the least use to the team, with the least computer science background (the other three were computer science majors; I was an electrical engineering major) and so I got to work on an index.html page that included the basics: a logo, a play button, and a calendar. That webpage was the basis of what is now the WBAR website. It taught me, the long way, why there are back-end developers and front-end developers.

## Archiving

I wanted to replicate the archiving functionality that the previous website had - each weekly show had an archive of all of that semester's shows. Shows happened at the same time each week and were always two hours long.  At the time, I didn't know how easy it was to use Python to record audio from a stream. I'd also never worked with Python at all, and I stuck to my guns (at the time): batch scripts, VLC media player, and WinSCP. 

How I thought this soup of programs would be easier than Python or Java, I have no clue. But I was wary of running code on the virtual machine that we ran our web server on and hadn't yet taken my all-SSH Advanced Programming in C class. I StackOverflowed VLC CLI commands, batch files, Windows Task Scheduler, WinSCP CLI commands, and like, two PHP functions. It ended up working pretty well.

### Requirements

I needed this program soup to do the following:

- record our audio stream for two hours

- make the recording accessible via the website

- run continuously

- be hidden from the user


I decided I'd call everything from a batch file, and compose the batch file in Notepad. 

#### Record Audio For Two Hours

VLC can be run from the command line with tons of parameters and flags. I began with a batch file, which defined variables for which day of the week it was, what time it was, and whether it was AM or PM. I told VLC to record our stream (location secret) for two hours, and to name the output file whatever the string in my batch file `name` variable was. This took forever to get working. Here's what I ended up with: 

```powershell
for /F "tokens=1-4 delims=/ " %%i in ('date /t') do (
set WD=%%i
set /A D=%%j
set M=%%k
set Y=%%l
) 

for /F "tokens=1-4 delims=: " %%i in ('time /t') do (
set /A H=%%i
set Mn=%%j
set AP=%%k
)

SET showname=%WD%_%D%-%M%_%H%%AP%

"C:\Path\To\VLC\vlc" --stop-time 7190 --sout "#transcode{acodec=mp3,ab=128,channels=2,samplerate=44100}:standard{access=file,mux=raw,dst="C:\Path\To\currentstream.mp3"}" http://not.gonna.put.it:here/stream vlc://quit

ren currentstream.mp3 "%showname%.mp3"
```

The top two blocks create the show name, the VLC line calls VLC, and the last line renames the file. I know the quotes look weird, but it worked. 

Note at the end, that vlc://quit is appended to the "playlist". This is a utility file provided by VLC to quit the program. Before adding it, for the longest time, I was unable to figure out why the first run would go off without a hitch, but then the computer would crash after an overnight run. Calling VLC like this without appending the quit file leaves VLC running in the background, and any concurrent VLC calls spawn a new VLC program, until you have tons open and you run out of memory. If you're going to programmatically call VLC, remember this!

Writing a multi-function batch file was a terrible idea - there are countless exceptions, inconsistent rules, and poor documentation for Windows Command Prompt commands.

I learned my lesson. I also had a function that would record two hours from a stream and name the resultant mp3 after the time that it ran. 

#### Put it on the Website

I used a program called WinSCP to automate file uploads. I would call it from the batch file, passing in parameters for the script to execute and the file to transfer. 

The way I dealt with organization was by creating a hard-coded directory structure in our web root, and I would upload shows that corresponded to shows by uploading them to a certain shows' dedicated timeslot. This way, without any back-end experience, I could give the illusion of having a show and its archives related/tied to one another. 

I now had a bunch of directories that were rapidly being filled with files, and I just needed a landing page for each directory that would nicely display the audio files. I used [audioJS](https://kolber.github.io/audiojs/audiojs/audio.js) to handle the HTML and JavaScript presentation of the different audio files, and then familiarized myself with `echo` , `glob`, `foreach`, and `$` on StackOverflow to connect the files in the directory with the HTML of the landing page.

```php
<?php 
  foreach (glob("*.wav") as $filename)
  {
    echo "<li><a href=\"#\" data-src=\"";
          echo $filename."\">";
    echo $filename."</a></li>"; 
  }

  foreach (glob("*.mp3") as $filename)
  {
    echo "<li><a href=\"#\" data-src=\"";
          echo $filename."\">";
    echo $filename."</a></li>"; 
  }

?> 
```
