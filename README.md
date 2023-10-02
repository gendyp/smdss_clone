# Live version
Use [this](https://gendyp.github.io/smdss_clone/core/index.html) link to check out the program.

# About the project
Technically *work in progress*, though I don't really know where to go from its current state, very likely it'll stay like this.

Idea was to make a program aimed to aid in learning the *idea* behind Mega Drive sound system, how it produces such sound and how you can recreate it. It's not music maker, VGM player or hardware emulator.

Made using vanilla Javascript so you can play around with the code easily. Code runs locally, no APIs which run in [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) were used. That results in relatively *poor performance*.

As a source, I used the info I've found on SpritesMind.Net forum in [this](http://gendev.spritesmind.net/forum/viewtopic.php?f=24&t=386) thread, various documentations, and source code of "Exodus" and "Genesis GX Plus" emulators.

# Content
* "Ypsilon" synthesizer, a rough clone of Mega Drive sound system
* MIDI engine "Ypsilon Engine", very basic
* Virtual MIDI Keyboard
* Event Sequence Player
* Audio Analyzer (Web Audio Analyzer with UI component)

# About Ypsilon
It has object-oriented design. I thought it'll make it easier to understand the seemingly complex structure of the YM2612 chip. Most features are supported, including SSG-EG and YM2612 DAC crossover distortion.

# About Ypsilon Engine (MIDI handler)
The engine converts MIDI events into human readable JS-object form of Mega Drive sound instructions. It's responsible for multiple things - rerouting channel number of events, applying predefined and user instrument settings to synthesizer, handling volume, velocity and panning events.
