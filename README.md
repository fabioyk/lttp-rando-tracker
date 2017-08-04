# Link to the Past Randomizer Item Tracker
This Link to the Past Item Tracker was based on **crossproduct**'s v4.0 tracker.
You can find the original tracker at [twitch.tv/crossproduct](twitch.tv/crossproduct).

The original tracker readme is located at `original_readme.txt`.

## Downloading and streaming this Tracker
To download this tracker for local use, click on the Clone or download button on the top right and select Download ZIP. Extract the zip somewhere and you're ready to be used on your browser.
Use Window Capture on your streaming application to capture it. If you're using Chrome, make sure that hardware acceleration is disabled in the advanced settings.

You can also use it at [https://fabioyk.github.io/lttp-rando-tracker/tracker_map.html](https://fabioyk.github.io/lttp-rando-tracker/tracker_map.html)

## New Features
Some of these features were simply based on my needs, so it may not be fit for everybody.

* Consolidated Mushroom/Powder and Shovel/Flute to mimic the original game pause layout.
* Added bomb icon. It has no functional use other than representing the game pause layout position.
* Added a Go Mode icon that lits up when you have the necessary items to finish the game
* Changed the rotation for dungeon prizes to Crystal, 5/6 Crystal, Green Pendant, Other Pendants
* Added support for glitches. If you're able to do a certain glitch, the chest tracker will mark those extra locations as blue (breaks the logic but it's possible to get). For example, the Hobo will be marked as blue without Flippers if you can Fake Flipper.
* Added orange coloring for locations that would be available if you defeat Agahnim 1. If Aga is a possibility and you don't already have dark world access, you have a visual note of which locations would be opened if you did Aga.
* Changed color coding.
  * Dungeon Boss
    * Green: The boss can be defeated
    * Orange: The boss could be defeated if you killed Aga
    * Yellow: Not sure, depends on key locations
    * Red: Not Accessible
    * Blue: The boss can be defeated, but using glitches not accounted by the logic
  * Dungeon Chests
    * Green: All chests can be opened (boss included)
    * Orange: Some or All chests could be opened if you killed Aga
    * Yellow: Some chests can be opened
    * Red: No chests can be opened
    * Blue: All chests can be opened, but using glitches not accounted by the logic
  * Overworld Locations
    * Green: Accessible
    * Orange: If you killed Aga, you would have access to it
    * Yellow: You can view what the item is, but you can't get it
    * Red: Not Acessible
    * Blue: Accessible, but using glitches not accounted by the logic
* Updated Light World dark rooms requiring the Lantern
* Updated Frog/Smith not requiring the Mirror
* Updated Logic to require weapons for bosses, in case of Open Mode/Swordless
* Updated Logic to require sword for Mothula, in case of Open Mode
* Added Swordless Logic
* Added Overworld Glitches and Major Glitches logic, still needs to be tested
* Added being able to select mode and logic being played
* Added basic UI to select which glitches you can do
* Added cookies to save your settings

## Planned Features
* Be able to change goal. Ganon, Pedestal, All Dungeons.
* Event Logging to display at the end of the run when was each location marked, so you could track which location had an item