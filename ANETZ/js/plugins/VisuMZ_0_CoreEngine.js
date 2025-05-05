//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.56;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.56] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x150bf7=_0x36f3;(function(_0x416978,_0x4b4241){const _0x5887c6=_0x36f3,_0x37cb4d=_0x416978();while(!![]){try{const _0x1812e2=parseInt(_0x5887c6(0x851))/0x1+parseInt(_0x5887c6(0x61a))/0x2+parseInt(_0x5887c6(0x619))/0x3*(parseInt(_0x5887c6(0x2d1))/0x4)+-parseInt(_0x5887c6(0x5c1))/0x5+parseInt(_0x5887c6(0x607))/0x6*(-parseInt(_0x5887c6(0x897))/0x7)+-parseInt(_0x5887c6(0x73c))/0x8+parseInt(_0x5887c6(0x678))/0x9;if(_0x1812e2===_0x4b4241)break;else _0x37cb4d['push'](_0x37cb4d['shift']());}catch(_0x2599a1){_0x37cb4d['push'](_0x37cb4d['shift']());}}}(_0x4e0e,0x60149));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x150bf7(0x81a)](function(_0x22310a){const _0x58fbdf=_0x150bf7;return _0x22310a[_0x58fbdf(0x349)]&&_0x22310a[_0x58fbdf(0x6c4)][_0x58fbdf(0x886)]('['+label+']');})[0x0];VisuMZ[label][_0x150bf7(0x486)]=VisuMZ[label][_0x150bf7(0x486)]||{},VisuMZ[_0x150bf7(0x75b)]=function(_0x23ce09,_0x1c2d53){const _0xa40837=_0x150bf7;for(const _0x454ff0 in _0x1c2d53){if(_0xa40837(0x342)!==_0xa40837(0x8f2)){if(_0x454ff0[_0xa40837(0x60c)](/(.*):(.*)/i)){if(_0xa40837(0x127)==='BxYwa'){const _0x579aad=String(RegExp['$1']),_0x31a619=String(RegExp['$2'])['toUpperCase']()[_0xa40837(0x37c)]();let _0x159355,_0x286e79,_0x592891;switch(_0x31a619){case'NUM':_0x159355=_0x1c2d53[_0x454ff0]!==''?Number(_0x1c2d53[_0x454ff0]):0x0;break;case _0xa40837(0x773):_0x286e79=_0x1c2d53[_0x454ff0]!==''?JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0]):[],_0x159355=_0x286e79[_0xa40837(0x49b)](_0x31acc1=>Number(_0x31acc1));break;case'EVAL':_0x159355=_0x1c2d53[_0x454ff0]!==''?eval(_0x1c2d53[_0x454ff0]):null;break;case _0xa40837(0x690):_0x286e79=_0x1c2d53[_0x454ff0]!==''?JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0]):[],_0x159355=_0x286e79['map'](_0x4566b9=>eval(_0x4566b9));break;case _0xa40837(0x4f8):_0x159355=_0x1c2d53[_0x454ff0]!==''?JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0]):'';break;case _0xa40837(0x487):_0x286e79=_0x1c2d53[_0x454ff0]!==''?JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0]):[],_0x159355=_0x286e79[_0xa40837(0x49b)](_0x3069f6=>JSON[_0xa40837(0x311)](_0x3069f6));break;case _0xa40837(0x88d):_0x159355=_0x1c2d53[_0x454ff0]!==''?new Function(JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0])):new Function(_0xa40837(0x60d));break;case _0xa40837(0x6b5):_0x286e79=_0x1c2d53[_0x454ff0]!==''?JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0]):[],_0x159355=_0x286e79[_0xa40837(0x49b)](_0x8b38fb=>new Function(JSON[_0xa40837(0x311)](_0x8b38fb)));break;case _0xa40837(0x7ff):_0x159355=_0x1c2d53[_0x454ff0]!==''?String(_0x1c2d53[_0x454ff0]):'';break;case _0xa40837(0x152):_0x286e79=_0x1c2d53[_0x454ff0]!==''?JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0]):[],_0x159355=_0x286e79[_0xa40837(0x49b)](_0x45deef=>String(_0x45deef));break;case _0xa40837(0x636):_0x592891=_0x1c2d53[_0x454ff0]!==''?JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0]):{},_0x23ce09[_0x579aad]={},VisuMZ[_0xa40837(0x75b)](_0x23ce09[_0x579aad],_0x592891);continue;case'ARRAYSTRUCT':_0x286e79=_0x1c2d53[_0x454ff0]!==''?JSON[_0xa40837(0x311)](_0x1c2d53[_0x454ff0]):[],_0x159355=_0x286e79[_0xa40837(0x49b)](_0x54ac11=>VisuMZ[_0xa40837(0x75b)]({},JSON[_0xa40837(0x311)](_0x54ac11)));break;default:continue;}_0x23ce09[_0x579aad]=_0x159355;}else this[_0xa40837(0x2f5)]['x']=_0x1a78b1['anchor']()['x'],this[_0xa40837(0x2f5)]['y']=_0x20d5f2[_0xa40837(0x2f5)]()['y'];}}else this[_0xa40837(0x46b)]=new _0x52805d(),this[_0xa40837(0x46b)][_0xa40837(0x219)]=new _0x26905c(0x0,0x0),this[_0xa40837(0x46b)]['x']=0x0,this[_0xa40837(0x638)](this[_0xa40837(0x46b)]);}return _0x23ce09;},(_0x36f18c=>{const _0x343e79=_0x150bf7,_0x2906f1=_0x36f18c[_0x343e79(0x42a)];for(const _0x3d9690 of dependencies){if(!Imported[_0x3d9690]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x343e79(0x322)](_0x2906f1,_0x3d9690)),SceneManager[_0x343e79(0x4e1)]();break;}}const _0x5cbf6a=_0x36f18c['description'];if(_0x5cbf6a[_0x343e79(0x60c)](/\[Version[ ](.*?)\]/i)){const _0x5066d9=Number(RegExp['$1']);_0x5066d9!==VisuMZ[label][_0x343e79(0x15f)]&&(alert(_0x343e79(0x4de)['format'](_0x2906f1,_0x5066d9)),SceneManager['exit']());}if(_0x5cbf6a[_0x343e79(0x60c)](/\[Tier[ ](\d+)\]/i)){const _0x387874=Number(RegExp['$1']);if(_0x387874<tier)alert(_0x343e79(0x797)[_0x343e79(0x322)](_0x2906f1,_0x387874,tier)),SceneManager[_0x343e79(0x4e1)]();else{if(_0x343e79(0x29b)!==_0x343e79(0x29b))return _0x3b9914['eva']-0.05;else tier=Math[_0x343e79(0x391)](_0x387874,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x343e79(0x486)],_0x36f18c[_0x343e79(0x155)]);})(pluginData),((()=>{const _0x744a0b=_0x150bf7;if(VisuMZ[_0x744a0b(0x7d0)][_0x744a0b(0x486)][_0x744a0b(0x51b)][_0x744a0b(0x402)]??!![]){if(_0x744a0b(0x5f5)!=='FvYCX')for(const _0x403e00 in $plugins){if('vSCGM'!=='aKxtm'){const _0x545837=$plugins[_0x403e00];_0x545837[_0x744a0b(0x42a)][_0x744a0b(0x60c)](/(.*)\/(.*)/i)&&(_0x545837[_0x744a0b(0x42a)]=String(RegExp['$2'][_0x744a0b(0x37c)]()));}else{if(_0x5950a0[_0x744a0b(0x83b)][_0x744a0b(0x697)](this)){const _0x15d80d=_0x9d2935[_0x744a0b(0x3a0)];let _0x4baa9d=_0x380000[_0x744a0b(0x409)];if(['',_0x744a0b(0x76b)][_0x744a0b(0x886)](_0x4baa9d))_0x4baa9d=_0x14d429[_0x744a0b(0x411)][_0x744a0b(0x697)](this);const _0x263a7b=_0x105c74[_0x744a0b(0x7c5)][_0x744a0b(0x697)](this),_0x8c9cd5=_0x43eec2['ExtJS'][_0x744a0b(0x697)](this);this[_0x744a0b(0x1ea)](_0x4baa9d,_0x15d80d,_0x263a7b,_0x8c9cd5),this['setHandler'](_0x15d80d,_0x5a88c2[_0x744a0b(0x893)]['bind'](this,_0x8c9cd5));}}}else _0x41f354[_0x744a0b(0x700)]?this[_0x744a0b(0x795)]=_0x44d59e[_0x744a0b(0x700)]():this[_0x744a0b(0x795)]=_0x30d605['CoreEngine'][_0x744a0b(0x486)][_0x744a0b(0x751)][_0x744a0b(0x395)];}})()),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x1d0),_0x2fba70=>{const _0x426192=_0x150bf7;if(!SceneManager[_0x426192(0x71e)])return;if(!SceneManager['_scene'][_0x426192(0x479)])return;VisuMZ[_0x426192(0x75b)](_0x2fba70,_0x2fba70);const _0x29c2b4=Math[_0x426192(0x469)](_0x2fba70[_0x426192(0x755)]),_0x8a4aae=Math[_0x426192(0x469)](_0x2fba70[_0x426192(0x19f)]);$gameTemp['requestPointAnimation'](_0x29c2b4,_0x8a4aae,_0x2fba70['AnimationID'],_0x2fba70['Mirror'],_0x2fba70[_0x426192(0x407)]);}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x263),_0x267fc9=>{const _0x317523=_0x150bf7;if(!$gameTemp[_0x317523(0x7df)]())return;if(!Utils[_0x317523(0x2d6)]())return;SceneManager['_scene'][_0x317523(0x1bc)]=![],VisuMZ[_0x317523(0x7d0)][_0x317523(0x753)]();}),PluginManager['registerCommand'](pluginData['name'],_0x150bf7(0x4dd),_0x350f73=>{const _0x376c45=_0x150bf7;if(!$gameTemp[_0x376c45(0x7df)]())return;if(!Utils[_0x376c45(0x2d6)]())return;SceneManager[_0x376c45(0x71e)][_0x376c45(0x1bc)]=![],VisuMZ[_0x376c45(0x7d0)][_0x376c45(0x2d2)]();}),PluginManager['registerCommand'](pluginData[_0x150bf7(0x42a)],'ExportCurMapText',_0x345593=>{const _0x42c2ce=_0x150bf7;if(!$gameTemp[_0x42c2ce(0x7df)]())return;if(!Utils[_0x42c2ce(0x2d6)]())return;if(!$gameMap)return;if($gameMap[_0x42c2ce(0x1c7)]()<=0x0)return;VisuMZ[_0x42c2ce(0x75b)](_0x345593,_0x345593);const _0x5f107a='Map%1'[_0x42c2ce(0x322)]($gameMap['mapId']()[_0x42c2ce(0x789)](0x3)),_0x340c1f=VisuMZ['CoreEngine'][_0x42c2ce(0x26d)]($gameMap[_0x42c2ce(0x1c7)]());VisuMZ[_0x42c2ce(0x7d0)][_0x42c2ce(0x4b3)](_0x340c1f,_0x5f107a,!![]);}),PluginManager['registerCommand'](pluginData['name'],'ExportCurTroopText',_0x13ebd6=>{const _0x423659=_0x150bf7;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x423659(0x2d6)]())return;if(!$gameParty[_0x423659(0x5f9)]())return;VisuMZ[_0x423659(0x75b)](_0x13ebd6,_0x13ebd6);const _0x4bfbfd=_0x423659(0x16c)[_0x423659(0x322)]($gameTroop['_troopId'][_0x423659(0x789)](0x4)),_0x4c4381=VisuMZ['CoreEngine'][_0x423659(0x48d)]($gameTroop[_0x423659(0x3b7)]);VisuMZ[_0x423659(0x7d0)][_0x423659(0x4b3)](_0x4c4381,_0x4bfbfd,!![]);}),VisuMZ[_0x150bf7(0x7d0)]['ExportString']=function(_0x23b054,_0x24798c,_0x4d829a){const _0x3fc51d=_0x150bf7,_0x597632=require('fs');let _0x121093=_0x3fc51d(0x8f4)[_0x3fc51d(0x322)](_0x24798c||'0');_0x597632['writeFile'](_0x121093,_0x23b054,_0x47fc37=>{const _0x4d3efa=_0x3fc51d;if(_0x47fc37)throw err;else _0x4d829a&&alert(_0x4d3efa(0x2ae)[_0x4d3efa(0x322)](_0x121093));});},VisuMZ[_0x150bf7(0x7d0)]['ExportStrFromAllMaps']=function(){const _0x5b4b0e=_0x150bf7,_0x1b8a68=[];for(const _0x16b9d0 of $dataMapInfos){if(_0x5b4b0e(0x889)!==_0x5b4b0e(0x889))return this[_0x5b4b0e(0x74d)](_0x46de08);else{if(!_0x16b9d0)continue;_0x1b8a68[_0x5b4b0e(0x4c5)](_0x16b9d0['id']);}}const _0x131805=_0x1b8a68[_0x5b4b0e(0x452)]*0x64+Math['randomInt'](0x64);alert(_0x5b4b0e(0x4cc)[_0x5b4b0e(0x322)](_0x131805)),this[_0x5b4b0e(0x1fc)]=[],this[_0x5b4b0e(0x43c)]=$dataMap;for(const _0x267fda of _0x1b8a68){VisuMZ[_0x5b4b0e(0x7d0)][_0x5b4b0e(0x74a)](_0x267fda);}setTimeout(VisuMZ['CoreEngine'][_0x5b4b0e(0x59e)][_0x5b4b0e(0x45b)](this),_0x131805);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x74a)]=function(_0x2ac12f){const _0x2bd4ed=_0x150bf7,_0x2acb56=_0x2bd4ed(0x5db)[_0x2bd4ed(0x322)](_0x2ac12f[_0x2bd4ed(0x789)](0x3)),_0x460bc0=new XMLHttpRequest(),_0x24baee='data/'+_0x2acb56;_0x460bc0[_0x2bd4ed(0x2f0)](_0x2bd4ed(0x5cf),_0x24baee),_0x460bc0[_0x2bd4ed(0x478)]('application/json'),_0x460bc0[_0x2bd4ed(0x3ea)]=()=>this['storeMapData'](_0x460bc0,_0x2ac12f,_0x2acb56,_0x24baee),_0x460bc0[_0x2bd4ed(0x22c)]=()=>DataManager['onXhrError'](_0x2bd4ed(0x54f),_0x2acb56,_0x24baee),_0x460bc0[_0x2bd4ed(0x23b)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x178)]=function(_0xf98be9,_0x4ae634,_0x3dd0e6,_0x33c2de){const _0x28a03d=_0x150bf7;$dataMap=JSON['parse'](_0xf98be9['responseText']),DataManager['onLoad']($dataMap),this[_0x28a03d(0x1fc)][_0x4ae634]=VisuMZ[_0x28a03d(0x7d0)][_0x28a03d(0x26d)](_0x4ae634),$dataMap=this[_0x28a03d(0x43c)];},VisuMZ['CoreEngine'][_0x150bf7(0x59e)]=function(){const _0x419dd4=_0x150bf7,_0x11d23b=_0x419dd4(0x3b0);this[_0x419dd4(0x1fc)][_0x419dd4(0x7b8)](undefined)[_0x419dd4(0x7b8)]('')[_0x419dd4(0x7b8)](null);const _0x3e4ef7=this['_storedMapText'][_0x419dd4(0x7cd)]('\x0a\x0a\x0a\x0a\x0a')[_0x419dd4(0x37c)]();VisuMZ[_0x419dd4(0x7d0)][_0x419dd4(0x4b3)](_0x3e4ef7,_0x11d23b,!![]),SceneManager[_0x419dd4(0x71e)]['_active']=!![];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x26d)]=function(_0x217627){const _0x1d04b5=_0x150bf7;if(!$dataMap)return'';let _0x5f394d='█'[_0x1d04b5(0x7b1)](0x46)+'\x0a\x0a',_0x53421a='═'[_0x1d04b5(0x7b1)](0x46)+'\x0a\x0a',_0x4c5886='';this[_0x1d04b5(0x8a1)]=0x0;for(const _0x2258ec of $dataMap[_0x1d04b5(0x5ef)]){if(_0x1d04b5(0x179)!==_0x1d04b5(0x55c)){if(!_0x2258ec)continue;let _0x25cc90=_0x2258ec['id'],_0x29f00b=_0x2258ec['name'],_0x2b6bb4=_0x2258ec[_0x1d04b5(0x618)];for(const _0x302377 of _0x2b6bb4){const _0x1996fb=_0x2b6bb4['indexOf'](_0x302377)+0x1;let _0x2f6b71=_0x53421a+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x1ff8e4=VisuMZ['CoreEngine'][_0x1d04b5(0x74b)](_0x302377['list']);if(_0x1ff8e4[_0x1d04b5(0x452)]>0x0){if('vDcJK'!==_0x1d04b5(0x2b2)){if(_0x4c5886[_0x1d04b5(0x452)]>0x0){if(_0x1d04b5(0x3cb)===_0x1d04b5(0x438)){_0x50eef5[_0x1d04b5(0x7d0)]['ParseEnemyNotetags']['call'](this,_0x48edc1),_0x47aed7[_0x1d04b5(0x481)]=0x1;const _0x4f7c49=_0xfd04b7['note'];if(_0x4f7c49[_0x1d04b5(0x60c)](/<LEVEL:[ ](\d+)>/i))_0x5715a2[_0x1d04b5(0x481)]=_0xe0826(_0x3cf020['$1']);if(_0x4f7c49['match'](/<MAXHP:[ ](\d+)>/i))_0x2af5f7[_0x1d04b5(0x360)][0x0]=_0x4bb519(_0x40d286['$1']);if(_0x4f7c49[_0x1d04b5(0x60c)](/<MAXMP:[ ](\d+)>/i))_0x3eeb53[_0x1d04b5(0x360)][0x1]=_0x31f6bb(_0x5d3f43['$1']);if(_0x4f7c49[_0x1d04b5(0x60c)](/<ATK:[ ](\d+)>/i))_0x3f0291[_0x1d04b5(0x360)][0x2]=_0xbab1c7(_0x113c2d['$1']);if(_0x4f7c49[_0x1d04b5(0x60c)](/<DEF:[ ](\d+)>/i))_0x58dd47[_0x1d04b5(0x360)][0x3]=_0x557ebd(_0x53d5d5['$1']);if(_0x4f7c49[_0x1d04b5(0x60c)](/<MAT:[ ](\d+)>/i))_0x4fce28['params'][0x4]=_0x65068(_0x3f62f5['$1']);if(_0x4f7c49['match'](/<MDF:[ ](\d+)>/i))_0x2498b6['params'][0x5]=_0x4b2f90(_0x570602['$1']);if(_0x4f7c49[_0x1d04b5(0x60c)](/<AGI:[ ](\d+)>/i))_0x45475c[_0x1d04b5(0x360)][0x6]=_0x3887bf(_0x5b7e4f['$1']);if(_0x4f7c49[_0x1d04b5(0x60c)](/<LUK:[ ](\d+)>/i))_0x1da448[_0x1d04b5(0x360)][0x7]=_0x5b6788(_0x48fb2f['$1']);if(_0x4f7c49[_0x1d04b5(0x60c)](/<EXP:[ ](\d+)>/i))_0x48b814[_0x1d04b5(0x6eb)]=_0x40188b(_0x45db76['$1']);if(_0x4f7c49[_0x1d04b5(0x60c)](/<GOLD:[ ](\d+)>/i))_0x46bb48[_0x1d04b5(0x1c2)]=_0x371398(_0x110a21['$1']);}else _0x4c5886+=_0x53421a+'\x0a\x0a\x0a\x0a\x0a';}else{const _0x225a05=$dataMapInfos[_0x217627][_0x1d04b5(0x42a)];_0x4c5886+=_0x5f394d+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x1d04b5(0x322)](_0x217627,_0x225a05||'Unnamed')+_0x5f394d;}_0x4c5886+=_0x2f6b71['format'](_0x25cc90,_0x29f00b,_0x1996fb,_0x1ff8e4);}else this[_0x1d04b5(0x2f8)][_0x1d04b5(0x34c)](_0x29b4e6[_0x1d04b5(0x749)][_0x1d04b5(0x377)]);}}}else{const _0x4f20a9='_stored_expGaugeColor1';this[_0x1d04b5(0x7e8)]=this[_0x1d04b5(0x7e8)]||{};if(this['_colorCache'][_0x4f20a9])return this[_0x1d04b5(0x7e8)][_0x4f20a9];const _0x2ede03=_0x1400db[_0x1d04b5(0x7d0)]['Settings'][_0x1d04b5(0x49f)][_0x1d04b5(0x34e)];return this[_0x1d04b5(0x3cc)](_0x4f20a9,_0x2ede03);}}return _0x4c5886['length']>0x0&&(_0x4c5886+=_0x53421a),_0x4c5886;},VisuMZ['CoreEngine'][_0x150bf7(0x2d2)]=function(){const _0x1f31f7=_0x150bf7,_0x72471d=$dataTroops['length']*0xa+Math[_0x1f31f7(0x85e)](0xa);alert(_0x1f31f7(0x498)[_0x1f31f7(0x322)](_0x72471d));const _0x4f8853=[];for(const _0x2aeb83 of $dataTroops){if(!_0x2aeb83)continue;const _0x7dd8ae=_0x2aeb83['id'];_0x4f8853[_0x7dd8ae]=VisuMZ['CoreEngine']['ExtractStrFromTroop'](_0x7dd8ae);}setTimeout(VisuMZ[_0x1f31f7(0x7d0)][_0x1f31f7(0x2c3)][_0x1f31f7(0x45b)](this,_0x4f8853),_0x72471d);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x48d)]=function(_0xc6fa1d){const _0xd78e03=_0x150bf7;if(!$dataTroops[_0xc6fa1d])return'';let _0x2082ae='█'[_0xd78e03(0x7b1)](0x46)+'\x0a\x0a',_0x1352cc='═'[_0xd78e03(0x7b1)](0x46)+'\x0a\x0a',_0xfaa9fd='';this['_commonEventLayers']=0x0;const _0x58b6fd=$dataTroops[_0xc6fa1d];let _0x504c1e=_0x58b6fd[_0xd78e03(0x618)];for(const _0x1c3ad5 of _0x504c1e){if('dUEVG'!==_0xd78e03(0x3ed)){const _0x58e3ae=_0x504c1e[_0xd78e03(0x1c4)](_0x1c3ad5)+0x1;let _0x489b99=_0x1352cc+'《《《\x20Page\x20%1\x20》》》\x0a%2\x0a',_0x3a56cb=VisuMZ[_0xd78e03(0x7d0)][_0xd78e03(0x74b)](_0x1c3ad5[_0xd78e03(0x2c6)]);if(_0x3a56cb['length']>0x0){if(_0xd78e03(0x906)===_0xd78e03(0x51f)){let _0x31bcdb=this[_0xd78e03(0x287)]();const _0x377900=this['maxItems'](),_0x489086=this['maxCols']();if(this[_0xd78e03(0x715)]()&&(_0x31bcdb<_0x377900||_0x465dde&&_0x489086===0x1)){_0x31bcdb+=_0x489086;if(_0x31bcdb>=_0x377900)_0x31bcdb=_0x377900-0x1;this[_0xd78e03(0x299)](_0x31bcdb);}else!this[_0xd78e03(0x715)]()&&((_0x31bcdb<_0x377900-_0x489086||_0x59f0a7&&_0x489086===0x1)&&this['smoothSelect']((_0x31bcdb+_0x489086)%_0x377900));}else _0xfaa9fd[_0xd78e03(0x452)]>0x0?_0xfaa9fd+=_0x1352cc+'\x0a\x0a\x0a\x0a\x0a':_0xfaa9fd+=_0x2082ae+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0xd78e03(0x322)](_0xc6fa1d,_0x58b6fd[_0xd78e03(0x42a)]||_0xd78e03(0x631))+_0x2082ae,_0xfaa9fd+=_0x489b99[_0xd78e03(0x322)](_0x58e3ae,_0x3a56cb);}}else _0x300ed1=_0x184d65(_0x3644c8['$1'])*_0x28cb16[_0xd78e03(0x14c)];}return _0xfaa9fd['length']>0x0&&(_0xfaa9fd+=_0x1352cc),_0xfaa9fd;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x2c3)]=function(_0x5207fb){const _0x3d9c3c=_0x150bf7,_0x4dd11d='AllTroops';_0x5207fb['remove'](undefined)[_0x3d9c3c(0x7b8)]('')[_0x3d9c3c(0x7b8)](null);const _0x54c7aa=_0x5207fb[_0x3d9c3c(0x7cd)](_0x3d9c3c(0x692))[_0x3d9c3c(0x37c)]();VisuMZ[_0x3d9c3c(0x7d0)][_0x3d9c3c(0x4b3)](_0x54c7aa,_0x4dd11d,!![]),SceneManager[_0x3d9c3c(0x71e)][_0x3d9c3c(0x1bc)]=!![];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x74b)]=function(_0x1bae9b){const _0x3a3cb7=_0x150bf7;let _0x59b483='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x598c37='\x0a'+'┄'[_0x3a3cb7(0x7b1)](0x46)+'\x0a',_0x3364ee='';for(const _0x182caf of _0x1bae9b){if(!_0x182caf)continue;if(_0x182caf[_0x3a3cb7(0x3f1)]===0x65){if(_0x3a3cb7(0x39c)!==_0x3a3cb7(0x39c))return this[_0x3a3cb7(0x4fc)]();else _0x3364ee+=_0x59b483+'\x0a',_0x3364ee+=_0x3a3cb7(0x6cc),_0x182caf['parameters'][0x4]!==''&&_0x182caf[_0x3a3cb7(0x155)][0x4]!==undefined&&('JUIrw'!==_0x3a3cb7(0x144)?_0x3364ee+=_0x3a3cb7(0x1a9)[_0x3a3cb7(0x322)](_0x182caf[_0x3a3cb7(0x155)][0x4]):(_0x1a9f47['length']>0x0?_0x2a2723+=_0x3fa943+_0x3a3cb7(0x692):_0x55898f+=_0x1dc7ed+_0x3a3cb7(0x3f5)['format'](_0xb6b129,_0x347729['name']||_0x3a3cb7(0x631))+_0x3e1d3b,_0x18685d+=_0x560fff[_0x3a3cb7(0x322)](_0x9e36c9,_0x24c1b9)));}else{if(_0x182caf[_0x3a3cb7(0x3f1)]===0x191)_0x3364ee+='%1\x0a'[_0x3a3cb7(0x322)](_0x182caf['parameters'][0x0]);else{if(_0x182caf[_0x3a3cb7(0x3f1)]===0x192)_0x3364ee+=_0x59b483,_0x3364ee+=_0x3a3cb7(0x41d)[_0x3a3cb7(0x322)](_0x598c37,_0x182caf[_0x3a3cb7(0x155)][0x0]+0x1,_0x182caf[_0x3a3cb7(0x155)][0x1]);else{if(_0x182caf['code']===0x193)_0x3364ee+=_0x59b483,_0x3364ee+='%1〘Choice\x20Cancel〙%1'[_0x3a3cb7(0x322)](_0x598c37);else{if(_0x182caf[_0x3a3cb7(0x3f1)]===0x194){if(_0x3a3cb7(0x7c6)!==_0x3a3cb7(0x537))_0x3364ee+=_0x59b483,_0x3364ee+='%1〘End\x20Choice\x20Selection〙%1'[_0x3a3cb7(0x322)](_0x598c37);else return _0xd6659c['CoreEngine']['Scene_MenuBase_mainAreaTop'][_0x3a3cb7(0x697)](this);}else{if(_0x182caf['code']===0x69)_0x3364ee+=_0x59b483+'\x0a',_0x3364ee+=_0x3a3cb7(0x747);else{if(_0x182caf[_0x3a3cb7(0x3f1)]===0x6c)_0x3364ee+=_0x59b483+'\x0a',_0x3364ee+='》Comment《\x0a%1\x0a'[_0x3a3cb7(0x322)](_0x182caf[_0x3a3cb7(0x155)][0x0]);else{if(_0x182caf[_0x3a3cb7(0x3f1)]===0x198){if('pHDOp'!=='pHDOp')return this['_digitGroupingEx'];else _0x3364ee+=_0x3a3cb7(0x5f8)['format'](_0x182caf[_0x3a3cb7(0x155)][0x0]);}else{if(_0x182caf[_0x3a3cb7(0x3f1)]===0x75){const _0x394b3d=$dataCommonEvents[_0x182caf[_0x3a3cb7(0x155)][0x0]];if(_0x394b3d&&this['_commonEventLayers']<=0xa){this[_0x3a3cb7(0x8a1)]++;let _0x1dd6ed=VisuMZ[_0x3a3cb7(0x7d0)][_0x3a3cb7(0x74b)](_0x394b3d[_0x3a3cb7(0x2c6)]);_0x1dd6ed[_0x3a3cb7(0x452)]>0x0&&(_0x3364ee+=_0x59b483,_0x3364ee+=_0x598c37,_0x3364ee+=_0x3a3cb7(0x1e6)[_0x3a3cb7(0x322)](_0x394b3d['id'],_0x394b3d[_0x3a3cb7(0x42a)]),_0x3364ee+=_0x598c37,_0x3364ee+=_0x1dd6ed,_0x3364ee+=_0x598c37,_0x3364ee+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x3a3cb7(0x322)](_0x394b3d['id'],_0x394b3d[_0x3a3cb7(0x42a)]),_0x3364ee+=_0x598c37),this[_0x3a3cb7(0x8a1)]--;}}}}}}}}}}}return _0x3364ee['length']>0x0&&(_0x3a3cb7(0x7dd)===_0x3a3cb7(0x7dd)?_0x3364ee+=_0x59b483:_0x2d9179[_0x3a3cb7(0x430)]&&(this[_0x3a3cb7(0x85c)]=_0x3a3cb7(0x277))),_0x3364ee;},PluginManager['registerCommand'](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x810),_0x3a94b6=>{const _0x121e6a=_0x150bf7;VisuMZ['ConvertParams'](_0x3a94b6,_0x3a94b6);const _0x3996df=_0x3a94b6[_0x121e6a(0x518)];VisuMZ[_0x121e6a(0x8d6)](_0x3996df);}),PluginManager[_0x150bf7(0x159)](pluginData['name'],_0x150bf7(0x20e),_0xc54015=>{const _0x1b47cb=_0x150bf7;VisuMZ[_0x1b47cb(0x75b)](_0xc54015,_0xc54015);const _0x19dd58=_0xc54015[_0x1b47cb(0x78f)]||0x0;$gameParty[_0x1b47cb(0x2bc)](_0x19dd58);}),PluginManager['registerCommand'](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x229),_0x16b512=>{const _0x48978a=_0x150bf7;if(!SceneManager[_0x48978a(0x746)]())return;VisuMZ[_0x48978a(0x75b)](_0x16b512,_0x16b512);const _0x4da142=_0x16b512[_0x48978a(0x547)];SceneManager[_0x48978a(0x71e)]['playOnceParallelInterpreter'](_0x4da142);}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],'PictureCoordinatesMode',_0xf43c40=>{const _0xafe9eb=_0x150bf7;if(!$gameTemp[_0xafe9eb(0x7df)]())return;if(!Utils[_0xafe9eb(0x2d6)]())return;VisuMZ[_0xafe9eb(0x75b)](_0xf43c40,_0xf43c40);const _0x3a582d=_0xf43c40[_0xafe9eb(0x8b5)]||0x1;$gameTemp[_0xafe9eb(0x156)]=_0x3a582d;}),PluginManager['registerCommand'](pluginData['name'],_0x150bf7(0x184),_0x2a8e7c=>{const _0x2323a6=_0x150bf7;VisuMZ[_0x2323a6(0x75b)](_0x2a8e7c,_0x2a8e7c);const _0x3913cd=_0x2a8e7c['pictureId']||0x1,_0x5c787a=_0x2a8e7c[_0x2323a6(0x1ca)]||_0x2323a6(0x126),_0x3ee4bd=$gameScreen[_0x2323a6(0x214)](_0x3913cd);_0x3ee4bd&&_0x3ee4bd[_0x2323a6(0x5f0)](_0x5c787a);}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x56a),_0x35b627=>{const _0x45a200=_0x150bf7;for(let _0x3d8adf=0x1;_0x3d8adf<=0x64;_0x3d8adf++){if(_0x45a200(0x613)===_0x45a200(0x7a7))return _0x3b1a50['getInputMultiButtonStrings'](_0x45a200(0x37d),_0x45a200(0x6c3));else $gameScreen[_0x45a200(0x79b)](_0x3d8adf);}}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],'PictureEraseRange',_0x3ac4e0=>{const _0x572513=_0x150bf7;VisuMZ['ConvertParams'](_0x3ac4e0,_0x3ac4e0);const _0x4965fc=Math[_0x572513(0x6d6)](_0x3ac4e0[_0x572513(0x8cb)],_0x3ac4e0['EndingID']),_0x16efd5=Math[_0x572513(0x391)](_0x3ac4e0[_0x572513(0x8cb)],_0x3ac4e0[_0x572513(0x7b3)]);for(let _0x23db67=_0x4965fc;_0x23db67<=_0x16efd5;_0x23db67++){$gameScreen[_0x572513(0x79b)](_0x23db67);}}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x6cf),_0x6a315=>{const _0xeda70c=_0x150bf7;VisuMZ[_0xeda70c(0x75b)](_0x6a315,_0x6a315);const _0x3731ce=Math['round'](_0x6a315[_0xeda70c(0x8b5)])[_0xeda70c(0x4fe)](0x1,0x64),_0x4768ae=_0x6a315[_0xeda70c(0x486)],_0x376430=_0x4768ae[_0xeda70c(0x1ef)][_0xeda70c(0x4fe)](0x0,0x1),_0x277aae=Math['round'](_0x4768ae[_0xeda70c(0x71d)]||0x0),_0x4a5f0a=Math[_0xeda70c(0x469)](_0x4768ae[_0xeda70c(0x8a8)]||0x0),_0xc8983d=Math[_0xeda70c(0x469)](_0x4768ae[_0xeda70c(0x64d)]||0x0),_0x794b5c=Math[_0xeda70c(0x469)](_0x4768ae['ScaleY']||0x0),_0x1b2ea2=Math[_0xeda70c(0x469)](_0x4768ae['Opacity'])[_0xeda70c(0x4fe)](0x0,0xff),_0x5e6f22=_0x4768ae[_0xeda70c(0x421)],_0x44769c='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x5cf6b4=_0x6a315[_0xeda70c(0x4c1)]?_0xeda70c(0x4c1):'Pixelated',_0x4d8b=_0x44769c[_0xeda70c(0x322)](_0x6a315[_0xeda70c(0x58e)],_0x5cf6b4);$gameScreen['showPicture'](_0x3731ce,_0x4d8b,_0x376430,_0x277aae,_0x4a5f0a,_0xc8983d,_0x794b5c,_0x1b2ea2,_0x5e6f22);}),PluginManager[_0x150bf7(0x159)](pluginData['name'],_0x150bf7(0x1de),_0x5ca6a3=>{const _0x7a9710=_0x150bf7;VisuMZ[_0x7a9710(0x75b)](_0x5ca6a3,_0x5ca6a3);const _0x34b28b=_0x5ca6a3['Type']||'random',_0x2f2c55=_0x5ca6a3[_0x7a9710(0x473)]['clamp'](0x1,0x9),_0x485767=_0x5ca6a3[_0x7a9710(0x4ba)][_0x7a9710(0x4fe)](0x1,0x9),_0x5f45de=_0x5ca6a3[_0x7a9710(0x258)]||0x1,_0xa995e=_0x5ca6a3[_0x7a9710(0x580)];$gameScreen[_0x7a9710(0x3f0)](_0x34b28b),$gameScreen[_0x7a9710(0x70e)](_0x2f2c55,_0x485767,_0x5f45de);if(_0xa995e){const _0x5e9dec=$gameTemp['getLastPluginCommandInterpreter']();if(_0x5e9dec)_0x5e9dec[_0x7a9710(0x257)](_0x5f45de);}}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x6e8),_0x707af2=>{const _0x2c96ff=_0x150bf7;VisuMZ[_0x2c96ff(0x75b)](_0x707af2,_0x707af2);const _0x2bc8d1=_0x707af2['option']||0x1;$gameSystem[_0x2c96ff(0x35d)](_0x2bc8d1);}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],'SystemSetSideView',_0x216078=>{const _0x320009=_0x150bf7;if($gameParty[_0x320009(0x5f9)]())return;VisuMZ[_0x320009(0x75b)](_0x216078,_0x216078);const _0xd70f8b=_0x216078[_0x320009(0x5d8)];if(_0xd70f8b[_0x320009(0x60c)](/Front/i))_0x320009(0x462)===_0x320009(0x658)?this[_0x320009(0x464)]=_0x48fa6b:$gameSystem[_0x320009(0x386)](![]);else _0xd70f8b['match'](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x320009(0x386)](!$gameSystem[_0x320009(0x82c)]());}),PluginManager[_0x150bf7(0x159)](pluginData['name'],'SystemLoadAudio',_0xca24c8=>{const _0x855e10=_0x150bf7;if($gameParty[_0x855e10(0x5f9)]())return;VisuMZ[_0x855e10(0x75b)](_0xca24c8,_0xca24c8);const _0x4f42f2=[_0x855e10(0x539),_0x855e10(0x81b),'me','se'];for(const _0x151483 of _0x4f42f2){const _0xa216be=_0xca24c8[_0x151483],_0x3c9909=_0x855e10(0x373)[_0x855e10(0x322)](_0x151483);for(const _0x149336 of _0xa216be){AudioManager['createBuffer'](_0x3c9909,_0x149336);}}}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x86e),_0x334373=>{const _0x131876=_0x150bf7;if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x334373,_0x334373);const _0x135991=[_0x131876(0x7b0),_0x131876(0x250),_0x131876(0x86f),_0x131876(0x898),_0x131876(0x7ee),_0x131876(0x47b),_0x131876(0x423),_0x131876(0x8ce),_0x131876(0x6c2),_0x131876(0x4f6),_0x131876(0x192),_0x131876(0x656),_0x131876(0x538),'titles2'];for(const _0x542321 of _0x135991){const _0x297213=_0x334373[_0x542321],_0x22badb=_0x131876(0x7fd)[_0x131876(0x322)](_0x542321);for(const _0x13f97d of _0x297213){ImageManager['loadBitmap'](_0x22badb,_0x13f97d);}}}),PluginManager['registerCommand'](pluginData[_0x150bf7(0x42a)],'SwitchRandomizeOne',_0x4e08aa=>{const _0x2bdd29=_0x150bf7;if($gameParty[_0x2bdd29(0x5f9)]())return;VisuMZ['ConvertParams'](_0x4e08aa,_0x4e08aa);const _0xac0735=_0x4e08aa[_0x2bdd29(0x76e)],_0x499ddf=(_0x4e08aa[_0x2bdd29(0x839)]||0x0)/0x64;for(const _0x4670d4 of _0xac0735){const _0x395318=Math[_0x2bdd29(0x272)]()<=_0x499ddf;$gameSwitches[_0x2bdd29(0x414)](_0x4670d4,_0x395318);}}),PluginManager[_0x150bf7(0x159)](pluginData['name'],'SwitchRandomizeRange',_0x67f869=>{const _0x270707=_0x150bf7;if($gameParty[_0x270707(0x5f9)]())return;VisuMZ[_0x270707(0x75b)](_0x67f869,_0x67f869);const _0x52f4bc=Math[_0x270707(0x6d6)](_0x67f869[_0x270707(0x8cb)],_0x67f869[_0x270707(0x7b3)]),_0x30bd3f=Math[_0x270707(0x391)](_0x67f869[_0x270707(0x8cb)],_0x67f869[_0x270707(0x7b3)]),_0x33606d=(_0x67f869[_0x270707(0x839)]||0x0)/0x64;for(let _0x56cc9d=_0x52f4bc;_0x56cc9d<=_0x30bd3f;_0x56cc9d++){const _0x363d29=Math[_0x270707(0x272)]()<=_0x33606d;$gameSwitches[_0x270707(0x414)](_0x56cc9d,_0x363d29);}}),PluginManager['registerCommand'](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x65b),_0x4e6d9a=>{const _0x27a73c=_0x150bf7;if($gameParty[_0x27a73c(0x5f9)]())return;VisuMZ[_0x27a73c(0x75b)](_0x4e6d9a,_0x4e6d9a);const _0x4bce3a=_0x4e6d9a[_0x27a73c(0x76e)];for(const _0x4315df of _0x4bce3a){const _0x2eb10b=$gameSwitches[_0x27a73c(0x78f)](_0x4315df);$gameSwitches[_0x27a73c(0x414)](_0x4315df,!_0x2eb10b);}}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x75d),_0x403da1=>{const _0x3f855b=_0x150bf7;if($gameParty['inBattle']())return;VisuMZ[_0x3f855b(0x75b)](_0x403da1,_0x403da1);const _0x3790b1=Math[_0x3f855b(0x6d6)](_0x403da1['StartID'],_0x403da1[_0x3f855b(0x7b3)]),_0x4b2069=Math[_0x3f855b(0x391)](_0x403da1[_0x3f855b(0x8cb)],_0x403da1['EndingID']);for(let _0x293b41=_0x3790b1;_0x293b41<=_0x4b2069;_0x293b41++){if(_0x3f855b(0x3ad)!==_0x3f855b(0x2d4)){const _0x4e61aa=$gameSwitches[_0x3f855b(0x78f)](_0x293b41);$gameSwitches[_0x3f855b(0x414)](_0x293b41,!_0x4e61aa);}else{if(this['_mode']===_0x3f855b(0x224)){this[_0x3f855b(0x21a)][_0x3f855b(0x62c)](),this[_0x3f855b(0x904)][_0x3f855b(0x62c)](),this[_0x3f855b(0x59d)]();let _0x15d671=_0x837fcd[_0x3f855b(0x7d0)][_0x3f855b(0x486)][_0x3f855b(0x38e)]['NameInputMessage'][_0x3f855b(0x835)]('\x0a'),_0x5126ad=_0x15d671[_0x3f855b(0x452)],_0x243ac5=(this[_0x3f855b(0x2a4)]-_0x5126ad*this[_0x3f855b(0x60b)]())/0x2;for(let _0x1ce136=0x0;_0x1ce136<_0x5126ad;++_0x1ce136){let _0x765da1=_0x15d671[_0x1ce136],_0xa73175=this[_0x3f855b(0x385)](_0x765da1)[_0x3f855b(0x14c)],_0xd1675f=_0x496dab['floor']((this[_0x3f855b(0x21a)][_0x3f855b(0x14c)]-_0xa73175)/0x2);this[_0x3f855b(0x5f6)](_0x765da1,_0xd1675f,_0x243ac5),_0x243ac5+=this[_0x3f855b(0x60b)]();}}else _0x4220b7[_0x3f855b(0x7d0)]['Window_NameInput_refresh']['call'](this);}}}),PluginManager[_0x150bf7(0x159)](pluginData[_0x150bf7(0x42a)],_0x150bf7(0x60f),_0x3dc4e8=>{const _0x458a42=_0x150bf7;if($gameParty[_0x458a42(0x5f9)]())return;VisuMZ['ConvertParams'](_0x3dc4e8,_0x3dc4e8);const _0x303301=_0x3dc4e8[_0x458a42(0x5d8)][_0x458a42(0x288)]()[_0x458a42(0x37c)](),_0x22012b=VisuMZ['CoreEngine'][_0x458a42(0x4f5)](_0x303301);$gameSystem['setBattleSystem'](_0x22012b);}),VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x4f5)]=function(_0x40e4c3){const _0x44836f=_0x150bf7;_0x40e4c3=_0x40e4c3||'DATABASE',_0x40e4c3=String(_0x40e4c3)['toUpperCase']()[_0x44836f(0x37c)]();switch(_0x40e4c3){case _0x44836f(0x55a):return 0x0;case'TPB\x20ACTIVE':Imported[_0x44836f(0x2d3)]&&(ConfigManager[_0x44836f(0x854)]=!![]);return 0x1;case _0x44836f(0x610):if(Imported[_0x44836f(0x2d3)]){if(_0x44836f(0x232)!==_0x44836f(0x661))ConfigManager[_0x44836f(0x854)]=![];else{const _0x20c260=_0x4e13c6[_0x1dc8b2[_0x44836f(0x203)]],_0x227275=_0xe8ca6d[_0x44836f(0x471)],_0x4be431=_0x21a563['mirror'],_0x43dc06=_0x41abb6[_0x44836f(0x44d)];let _0x170233=this[_0x44836f(0x1df)]();const _0x127d57=this[_0x44836f(0x860)]();if(this[_0x44836f(0x6e5)](_0x20c260))for(const _0x4e405a of _0x227275){this[_0x44836f(0x830)]([_0x4e405a],_0x20c260,_0x4be431,_0x170233,_0x43dc06),_0x170233+=_0x127d57;}else this[_0x44836f(0x830)](_0x227275,_0x20c260,_0x4be431,_0x170233,_0x43dc06);}}return 0x2;case _0x44836f(0x1b6):if(Imported[_0x44836f(0x324)])return'OiSzB'!=='OiSzB'?_0x179503[_0x44836f(0x749)][_0x44836f(0x4eb)][_0x44836f(0x697)](this):_0x44836f(0x1b6);break;case _0x44836f(0x1dd):if(Imported[_0x44836f(0x206)])return _0x44836f(0x1dd);break;case _0x44836f(0x1da):if(Imported[_0x44836f(0x7c8)])return _0x44836f(0x1da);break;case _0x44836f(0x7a8):if(Imported[_0x44836f(0x90f)])return _0x44836f(0x7a8);break;case _0x44836f(0x623):if(Imported[_0x44836f(0x3a7)])return _0x44836f(0x623);break;case _0x44836f(0x364):if(Imported['VisuMZ_2_BattleSystemETB']){if(_0x44836f(0x32c)!==_0x44836f(0x77e))return'ETB';else{const _0x41c416=this[_0x44836f(0x46b)][_0x44836f(0x219)],_0x58633d=this[_0x44836f(0x14c)],_0x270764=this[_0x44836f(0x567)],_0x127411=this[_0x44836f(0x69e)],_0x153779=_0x26156b[_0x44836f(0x8bf)](),_0x51762d=_0xc6f1eb['dimColor2']();_0x41c416['resize'](_0x58633d,_0x270764),_0x41c416['gradientFillRect'](0x0,0x0,_0x58633d,_0x127411,_0x51762d,_0x153779,!![]),_0x41c416['fillRect'](0x0,_0x127411,_0x58633d,_0x270764-_0x127411*0x2,_0x153779),_0x41c416[_0x44836f(0x735)](0x0,_0x270764-_0x127411,_0x58633d,_0x127411,_0x153779,_0x51762d,!![]),this[_0x44836f(0x46b)][_0x44836f(0x1d7)](0x0,0x0,_0x58633d,_0x270764);}}break;case _0x44836f(0x277):if(Imported[_0x44836f(0x430)])return _0x44836f(0x8f5)!==_0x44836f(0x313)?'PTB':_0x3bfb9c[_0x44836f(0x246)]('tab');break;}return $dataSystem[_0x44836f(0x573)];},PluginManager['registerCommand'](pluginData['name'],_0x150bf7(0x173),_0x5682e6=>{const _0x54772f=_0x150bf7;VisuMZ[_0x54772f(0x75b)](_0x5682e6,_0x5682e6);const _0x2cd3f2=_0x5682e6[_0x54772f(0x5d8)]||0x1;$gameSystem['setWindowPadding'](_0x2cd3f2);}),VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x6d5)]=Scene_Boot['prototype'][_0x150bf7(0x151)],Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x151)]=function(){const _0x1c8b58=_0x150bf7;VisuMZ[_0x1c8b58(0x7d0)][_0x1c8b58(0x6d5)][_0x1c8b58(0x697)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x1c8b58(0x1e2)](),this[_0x1c8b58(0x4bc)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x1c8b58(0x5cb)](),VisuMZ[_0x1c8b58(0x6b6)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x575)]={},Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x3e5)]=function(){const _0x98a1aa=_0x150bf7,_0x16fc21=[_0x98a1aa(0x7e1),_0x98a1aa(0x767),_0x98a1aa(0x382),_0x98a1aa(0x901),'MAT','MDF',_0x98a1aa(0x56f),_0x98a1aa(0x582)],_0x21f9a6=['HIT','EVA',_0x98a1aa(0x1d1),'CEV','MEV',_0x98a1aa(0x604),_0x98a1aa(0x81c),'HRG',_0x98a1aa(0x496),_0x98a1aa(0x387)],_0x54035d=[_0x98a1aa(0x6f7),_0x98a1aa(0x8a2),'REC','PHA',_0x98a1aa(0x2e4),'TCR',_0x98a1aa(0x865),_0x98a1aa(0x4a8),_0x98a1aa(0x28a),_0x98a1aa(0x4c2)],_0x38bc44=[_0x16fc21,_0x21f9a6,_0x54035d],_0x3d7b7d=[_0x98a1aa(0x14d),_0x98a1aa(0x611),_0x98a1aa(0x74e),_0x98a1aa(0x841),_0x98a1aa(0x3a8),_0x98a1aa(0x21f),_0x98a1aa(0x227),_0x98a1aa(0x525),_0x98a1aa(0x6d2),_0x98a1aa(0x1e9)];for(const _0x27130a of _0x38bc44){let _0x13ad16='';if(_0x27130a===_0x16fc21)_0x13ad16=_0x98a1aa(0x467);if(_0x27130a===_0x21f9a6)_0x13ad16=_0x98a1aa(0x5c0);if(_0x27130a===_0x54035d)_0x13ad16=_0x98a1aa(0x8d9);for(const _0x1d9adc of _0x3d7b7d){let _0x12befc=_0x98a1aa(0x72e)['format'](_0x13ad16,_0x1d9adc);VisuMZ['CoreEngine']['RegExp'][_0x12befc]=[],VisuMZ['CoreEngine']['RegExp'][_0x12befc+'JS']=[];let _0x1ed7dd=_0x98a1aa(0x70f);if(['Plus',_0x98a1aa(0x525)][_0x98a1aa(0x886)](_0x1d9adc))_0x1ed7dd+=_0x98a1aa(0x790);else{if([_0x98a1aa(0x611),_0x98a1aa(0x6d2)][_0x98a1aa(0x886)](_0x1d9adc)){if(_0x98a1aa(0x47e)===_0x98a1aa(0x4fd)){const _0x544c29=_0x98a1aa(0x7f2);this[_0x98a1aa(0x7e8)]=this[_0x98a1aa(0x7e8)]||{};if(this[_0x98a1aa(0x7e8)][_0x544c29])return this['_colorCache'][_0x544c29];const _0x6fecdd=_0x324a9e['CoreEngine'][_0x98a1aa(0x486)][_0x98a1aa(0x49f)][_0x98a1aa(0x302)];return this[_0x98a1aa(0x3cc)](_0x544c29,_0x6fecdd);}else _0x1ed7dd+=_0x98a1aa(0x781);}else{if([_0x98a1aa(0x74e),_0x98a1aa(0x1e9)][_0x98a1aa(0x886)](_0x1d9adc))_0x1ed7dd+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x1d9adc===_0x98a1aa(0x841))_0x1ed7dd+=_0x98a1aa(0x285);else{if(_0x1d9adc==='Rate1')_0x1ed7dd+=_0x98a1aa(0x6bb);else{if(_0x1d9adc==='Rate2'){if(_0x98a1aa(0x191)!==_0x98a1aa(0x823))_0x1ed7dd+=_0x98a1aa(0x911);else{let _0x51e9a1=_0x3afe5e[_0x98a1aa(0x391)](0x0,this[_0x98a1aa(0x287)]());const _0x574d57=this[_0x98a1aa(0x466)](),_0x359171=this[_0x98a1aa(0x3db)]();if(this[_0x98a1aa(0x715)]()&&_0x51e9a1>0x0||_0x1fe9a7&&_0x359171===0x1){_0x51e9a1-=_0x359171;if(_0x51e9a1<=0x0)_0x51e9a1=0x0;this[_0x98a1aa(0x299)](_0x51e9a1);}else!this[_0x98a1aa(0x715)]()&&((_0x51e9a1>=_0x359171||_0x5ba130&&_0x359171===0x1)&&this[_0x98a1aa(0x299)]((_0x51e9a1-_0x359171+_0x574d57)%_0x574d57));}}}}}}}for(const _0x3f3e75 of _0x27130a){let _0x56cb6e=_0x1d9adc[_0x98a1aa(0x913)](/[\d+]/g,'')['toUpperCase']();const _0x5b7563=_0x1ed7dd['format'](_0x3f3e75,_0x56cb6e);VisuMZ[_0x98a1aa(0x7d0)][_0x98a1aa(0x575)][_0x12befc][_0x98a1aa(0x4c5)](new RegExp(_0x5b7563,'i'));const _0xf4346b=_0x98a1aa(0x4a9)['format'](_0x3f3e75,_0x56cb6e);VisuMZ[_0x98a1aa(0x7d0)][_0x98a1aa(0x575)][_0x12befc+'JS'][_0x98a1aa(0x4c5)](new RegExp(_0xf4346b,'i'));}}}},Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x1e2)]=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x150bf7(0x8e0)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x1df599=_0x150bf7,_0x299e4e=VisuMZ['CoreEngine'][_0x1df599(0x486)];if(_0x299e4e[_0x1df599(0x51b)]['OpenConsole']){if(_0x1df599(0x25e)!==_0x1df599(0x180))VisuMZ[_0x1df599(0x900)](!![]);else{if(_0x40531c[_0x1df599(0x892)]())return _0x1df599(0x368);return _0x4b6e1e[_0x1df599(0x7d0)][_0x1df599(0x486)]['KeyboardInput']['DefaultMode']||_0x1df599(0x224);}}if(_0x299e4e['QoL'][_0x1df599(0x670)]){if(_0x1df599(0x55f)!=='ARLyG')Input['keyMapper'][0x23]=_0x1df599(0x406),Input['keyMapper'][0x24]=_0x1df599(0x4fa);else{const _0xa3a41b=_0x3338fd['Symbol'];let _0x5ded40=_0x4dcec3[_0x1df599(0x409)];if(['',_0x1df599(0x76b)]['includes'](_0x5ded40))_0x5ded40=_0xa79510[_0x1df599(0x411)]['call'](this);const _0x2b25ee=_0x5c4961[_0x1df599(0x7c5)][_0x1df599(0x697)](this),_0x1bf7a1=_0x39e0e8['ExtJS']['call'](this);this[_0x1df599(0x1ea)](_0x5ded40,_0xa3a41b,_0x2b25ee,_0x1bf7a1),this['setHandler'](_0xa3a41b,_0x54c7c9[_0x1df599(0x893)][_0x1df599(0x45b)](this,_0x1bf7a1));}}if(_0x299e4e[_0x1df599(0x5eb)]){const _0x286d87=_0x299e4e[_0x1df599(0x5eb)];_0x286d87[_0x1df599(0x844)]=_0x286d87[_0x1df599(0x844)]||_0x1df599(0x8a3),_0x286d87[_0x1df599(0x42f)]=_0x286d87[_0x1df599(0x42f)]||_0x1df599(0x1ac);}_0x299e4e[_0x1df599(0x38e)]['WASD']&&(Input[_0x1df599(0x35a)][0x57]='up',Input[_0x1df599(0x35a)][0x41]=_0x1df599(0x3f7),Input[_0x1df599(0x35a)][0x53]=_0x1df599(0x350),Input[_0x1df599(0x35a)][0x44]=_0x1df599(0x400),Input[_0x1df599(0x35a)][0x45]=_0x1df599(0x6c3)),_0x299e4e[_0x1df599(0x38e)]['DashToggleR']&&(Input['keyMapper'][0x52]=_0x1df599(0x584)),_0x299e4e[_0x1df599(0x6b9)][_0x1df599(0x5f7)]=_0x299e4e[_0x1df599(0x6b9)]['DisplayedParams'][_0x1df599(0x49b)](_0x568677=>_0x568677[_0x1df599(0x288)]()[_0x1df599(0x37c)]()),_0x299e4e['Param']['ExtDisplayedParams']=_0x299e4e[_0x1df599(0x6b9)][_0x1df599(0x396)]['map'](_0x15c9f3=>_0x15c9f3['toUpperCase']()['trim']());},Scene_Boot['prototype'][_0x150bf7(0x61f)]=function(){const _0x94cf7f=_0x150bf7;this[_0x94cf7f(0x89a)]();},Scene_Boot[_0x150bf7(0x8e0)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x3bf8bf=_0x150bf7,_0x229a8d=VisuMZ[_0x3bf8bf(0x7d0)][_0x3bf8bf(0x486)][_0x3bf8bf(0x2bb)];for(const _0x476ab0 of _0x229a8d){const _0x349b6e=_0x476ab0[_0x3bf8bf(0x4d9)]['replace'](/[ ]/g,''),_0x455d6f=_0x476ab0[_0x3bf8bf(0x57c)];VisuMZ[_0x3bf8bf(0x7d0)]['createJsQuickFunction'](_0x349b6e,_0x455d6f);}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x7ef)]=function(_0x16c921,_0x437ec8){const _0x16c536=_0x150bf7;if(!!window[_0x16c921]){if($gameTemp[_0x16c536(0x7df)]())console[_0x16c536(0x193)](_0x16c536(0x52c)[_0x16c536(0x322)](_0x16c921));}const _0x4d9ad1=_0x16c536(0x579)[_0x16c536(0x322)](_0x16c921,_0x437ec8);window[_0x16c921]=new Function(_0x4d9ad1);},Scene_Boot[_0x150bf7(0x8e0)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x44fbd6=_0x150bf7,_0x21803d=VisuMZ[_0x44fbd6(0x7d0)][_0x44fbd6(0x486)][_0x44fbd6(0x915)];if(!_0x21803d)return;for(const _0x2cab81 of _0x21803d){if(!_0x2cab81)continue;VisuMZ[_0x44fbd6(0x7d0)]['createCustomParameter'](_0x2cab81);}},VisuMZ[_0x150bf7(0x7d0)]['CustomParamNames']={},VisuMZ[_0x150bf7(0x7d0)]['CustomParamIcons']={},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x7cc)]={},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x6d3)]={},VisuMZ['CoreEngine'][_0x150bf7(0x29e)]=function(_0x4dd200){const _0x38d9d5=_0x150bf7,_0x3ecdb2=_0x4dd200[_0x38d9d5(0x1f9)],_0x5c0ace=_0x4dd200[_0x38d9d5(0x4f0)],_0x1bc58e=_0x4dd200[_0x38d9d5(0x63e)],_0x29479d=_0x4dd200[_0x38d9d5(0x706)],_0x508f62=new Function(_0x4dd200['ValueJS']);VisuMZ[_0x38d9d5(0x7d0)][_0x38d9d5(0x5e5)][_0x3ecdb2[_0x38d9d5(0x288)]()['trim']()]=_0x5c0ace,VisuMZ['CoreEngine'][_0x38d9d5(0x53e)][_0x3ecdb2[_0x38d9d5(0x288)]()[_0x38d9d5(0x37c)]()]=_0x1bc58e,VisuMZ[_0x38d9d5(0x7d0)][_0x38d9d5(0x7cc)][_0x3ecdb2['toUpperCase']()[_0x38d9d5(0x37c)]()]=_0x29479d,VisuMZ[_0x38d9d5(0x7d0)][_0x38d9d5(0x6d3)][_0x3ecdb2[_0x38d9d5(0x288)]()[_0x38d9d5(0x37c)]()]=_0x3ecdb2,Object[_0x38d9d5(0x2fa)](Game_BattlerBase[_0x38d9d5(0x8e0)],_0x3ecdb2,{'get'(){const _0x533831=_0x38d9d5,_0xdf387=_0x508f62[_0x533831(0x697)](this);return _0x29479d==='integer'?Math['round'](_0xdf387):_0xdf387;}});},VisuMZ['ParseAllNotetags']=function(){const _0x38b552=_0x150bf7;for(const _0xad840e of $dataActors){if(_0x38b552(0x45a)==='BWZtW'){if(_0xad840e)VisuMZ[_0x38b552(0x196)](_0xad840e);}else{_0x2457f1-=_0x3e88ee;if(_0x2c372b<=0x0)_0x5d6ccb=0x0;this[_0x38b552(0x299)](_0x522aa0);}}for(const _0x28f7d7 of $dataClasses){if(_0x28f7d7)VisuMZ[_0x38b552(0x3cd)](_0x28f7d7);}for(const _0x2ba829 of $dataSkills){if(_0x2ba829)VisuMZ[_0x38b552(0x763)](_0x2ba829);}for(const _0x339d6 of $dataItems){if(_0x339d6)VisuMZ[_0x38b552(0x354)](_0x339d6);}for(const _0x4dde4f of $dataWeapons){if(_0x4dde4f)VisuMZ['ParseWeaponNotetags'](_0x4dde4f);}for(const _0x2db0c7 of $dataArmors){if(_0x2db0c7)VisuMZ[_0x38b552(0x687)](_0x2db0c7);}for(const _0x176bd1 of $dataEnemies){if('NMcIo'===_0x38b552(0x702)){const _0x1fec85=_0x2c8a6a['CoreEngine'][_0x38b552(0x486)][_0x38b552(0x38e)];return this['_inputWindow']['_mode']===_0x38b552(0x224)?_0x1fec85[_0x38b552(0x732)]||_0x38b552(0x732):_0x1fec85['Manual']||_0x38b552(0x78b);}else{if(_0x176bd1)VisuMZ[_0x38b552(0x57f)](_0x176bd1);}}for(const _0x42b5d9 of $dataStates){if('PqlBL'==='PqlBL'){if(_0x42b5d9)VisuMZ[_0x38b552(0x476)](_0x42b5d9);}else _0x46b375[_0x38b552(0x809)](_0x4e782b,_0x3b82be);}for(const _0x5c6b52 of $dataTilesets){if(_0x38b552(0x344)!==_0x38b552(0x344))return _0x38b552(0x623);else{if(_0x5c6b52)VisuMZ[_0x38b552(0x673)](_0x5c6b52);}}},VisuMZ[_0x150bf7(0x196)]=function(_0x45bfbe){},VisuMZ[_0x150bf7(0x3cd)]=function(_0x137e2e){},VisuMZ[_0x150bf7(0x763)]=function(_0x117ded){},VisuMZ[_0x150bf7(0x354)]=function(_0x2c5b33){},VisuMZ[_0x150bf7(0x6aa)]=function(_0x1ee5a7){},VisuMZ[_0x150bf7(0x687)]=function(_0x22fb2d){},VisuMZ[_0x150bf7(0x57f)]=function(_0xe80da){},VisuMZ[_0x150bf7(0x476)]=function(_0x44c7fa){},VisuMZ[_0x150bf7(0x673)]=function(_0x3db949){},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x196)]=VisuMZ[_0x150bf7(0x196)],VisuMZ[_0x150bf7(0x196)]=function(_0x46a77e){const _0x518c41=_0x150bf7;VisuMZ[_0x518c41(0x7d0)][_0x518c41(0x196)][_0x518c41(0x697)](this,_0x46a77e);const _0x384c97=_0x46a77e['note'];if(_0x384c97[_0x518c41(0x60c)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x518c41(0x4d3)!=='DhyAt')_0x2acd02[_0x518c41(0x35a)][0x57]='up',_0xb1b3f3['keyMapper'][0x41]=_0x518c41(0x3f7),_0x162e4c['keyMapper'][0x53]=_0x518c41(0x350),_0xd38fc6[_0x518c41(0x35a)][0x44]=_0x518c41(0x400),_0x2aeeeb['keyMapper'][0x45]='pagedown';else{_0x46a77e[_0x518c41(0x6d1)]=Number(RegExp['$1']);if(_0x46a77e[_0x518c41(0x6d1)]===0x0)_0x46a77e[_0x518c41(0x6d1)]=Number['MAX_SAFE_INTEGER'];}}_0x384c97[_0x518c41(0x60c)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x46a77e[_0x518c41(0x6e1)]=Math[_0x518c41(0x6d6)](Number(RegExp['$1']),_0x46a77e['maxLevel']));},VisuMZ['CoreEngine'][_0x150bf7(0x3cd)]=VisuMZ[_0x150bf7(0x3cd)],VisuMZ[_0x150bf7(0x3cd)]=function(_0x1f8b29){const _0x1e6fbc=_0x150bf7;VisuMZ[_0x1e6fbc(0x7d0)][_0x1e6fbc(0x3cd)]['call'](this,_0x1f8b29);if(_0x1f8b29[_0x1e6fbc(0x59f)]){if(_0x1e6fbc(0x210)!==_0x1e6fbc(0x6bf))for(const _0x50fcf4 of _0x1f8b29[_0x1e6fbc(0x59f)]){_0x1e6fbc(0x7e9)===_0x1e6fbc(0x7e9)?_0x50fcf4[_0x1e6fbc(0x18e)][_0x1e6fbc(0x60c)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x50fcf4[_0x1e6fbc(0x481)]=Math[_0x1e6fbc(0x391)](Number(RegExp['$1']),0x1)):(_0x5628fc['prototype'][_0x1e6fbc(0x5cd)]['call'](this),this[_0x1e6fbc(0x896)]());}else return!![];}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x57f)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x150bf7(0x57f)]=function(_0x429b66){const _0x20da83=_0x150bf7;VisuMZ[_0x20da83(0x7d0)][_0x20da83(0x57f)]['call'](this,_0x429b66),_0x429b66[_0x20da83(0x481)]=0x1;const _0x330ba1=_0x429b66[_0x20da83(0x18e)];if(_0x330ba1['match'](/<LEVEL:[ ](\d+)>/i))_0x429b66[_0x20da83(0x481)]=Number(RegExp['$1']);if(_0x330ba1[_0x20da83(0x60c)](/<MAXHP:[ ](\d+)>/i))_0x429b66['params'][0x0]=Number(RegExp['$1']);if(_0x330ba1[_0x20da83(0x60c)](/<MAXMP:[ ](\d+)>/i))_0x429b66['params'][0x1]=Number(RegExp['$1']);if(_0x330ba1[_0x20da83(0x60c)](/<ATK:[ ](\d+)>/i))_0x429b66[_0x20da83(0x360)][0x2]=Number(RegExp['$1']);if(_0x330ba1[_0x20da83(0x60c)](/<DEF:[ ](\d+)>/i))_0x429b66[_0x20da83(0x360)][0x3]=Number(RegExp['$1']);if(_0x330ba1[_0x20da83(0x60c)](/<MAT:[ ](\d+)>/i))_0x429b66[_0x20da83(0x360)][0x4]=Number(RegExp['$1']);if(_0x330ba1[_0x20da83(0x60c)](/<MDF:[ ](\d+)>/i))_0x429b66['params'][0x5]=Number(RegExp['$1']);if(_0x330ba1['match'](/<AGI:[ ](\d+)>/i))_0x429b66['params'][0x6]=Number(RegExp['$1']);if(_0x330ba1[_0x20da83(0x60c)](/<LUK:[ ](\d+)>/i))_0x429b66['params'][0x7]=Number(RegExp['$1']);if(_0x330ba1['match'](/<EXP:[ ](\d+)>/i))_0x429b66[_0x20da83(0x6eb)]=Number(RegExp['$1']);if(_0x330ba1[_0x20da83(0x60c)](/<GOLD:[ ](\d+)>/i))_0x429b66[_0x20da83(0x1c2)]=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x150bf7(0x352)]=Graphics[_0x150bf7(0x231)],Graphics[_0x150bf7(0x231)]=function(){const _0x18cfe9=_0x150bf7;switch(VisuMZ[_0x18cfe9(0x7d0)]['Settings']['QoL'][_0x18cfe9(0x2b8)]){case'stretch':return!![];case _0x18cfe9(0x651):return![];default:return VisuMZ[_0x18cfe9(0x7d0)][_0x18cfe9(0x352)][_0x18cfe9(0x697)](this);}},VisuMZ['CoreEngine'][_0x150bf7(0x329)]=Graphics[_0x150bf7(0x77c)],Graphics['printError']=function(_0x41323,_0xf63cb4,_0x2fdffd=null){const _0x5a58f2=_0x150bf7;VisuMZ['CoreEngine'][_0x5a58f2(0x329)][_0x5a58f2(0x697)](this,_0x41323,_0xf63cb4,_0x2fdffd),VisuMZ[_0x5a58f2(0x900)](![]);},VisuMZ['CoreEngine'][_0x150bf7(0x8db)]=Graphics[_0x150bf7(0x39b)],Graphics[_0x150bf7(0x39b)]=function(_0x5abb51){const _0x44c263=_0x150bf7;VisuMZ['CoreEngine']['Graphics_centerElement'][_0x44c263(0x697)](this,_0x5abb51),this['_centerElementCoreEngine'](_0x5abb51);},Graphics[_0x150bf7(0x489)]=function(_0x19aa56){const _0x3ec350=_0x150bf7;VisuMZ[_0x3ec350(0x7d0)][_0x3ec350(0x486)][_0x3ec350(0x51b)][_0x3ec350(0x787)]&&(_0x19aa56['style']['font-smooth']='none');VisuMZ[_0x3ec350(0x7d0)][_0x3ec350(0x486)]['QoL'][_0x3ec350(0x316)]&&('hOWNB'!==_0x3ec350(0x8bd)?this[_0x3ec350(0x1d8)]('keyboard'):_0x19aa56['style'][_0x3ec350(0x563)]='pixelated');const _0x5db348=Math[_0x3ec350(0x391)](0x0,Math[_0x3ec350(0x7d1)](_0x19aa56[_0x3ec350(0x14c)]*this[_0x3ec350(0x1a1)])),_0x587f4c=Math['max'](0x0,Math[_0x3ec350(0x7d1)](_0x19aa56['height']*this[_0x3ec350(0x1a1)]));_0x19aa56['style']['width']=_0x5db348+'px',_0x19aa56[_0x3ec350(0x1ee)][_0x3ec350(0x567)]=_0x587f4c+'px';},VisuMZ['CoreEngine'][_0x150bf7(0x888)]=Bitmap[_0x150bf7(0x8e0)]['initialize'],Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(_0x1e43ff,_0x3425b4){const _0x516285=_0x150bf7;VisuMZ[_0x516285(0x7d0)][_0x516285(0x888)][_0x516285(0x697)](this,_0x1e43ff,_0x3425b4),this[_0x516285(0x21d)]=!(VisuMZ['CoreEngine'][_0x516285(0x486)][_0x516285(0x51b)]['PixelateImageRendering']??!![]);},Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x8eb)]=function(){this['_customModified']=!![];},VisuMZ['CoreEngine'][_0x150bf7(0x4c9)]=Sprite['prototype']['destroy'],Sprite[_0x150bf7(0x8e0)][_0x150bf7(0x792)]=function(){const _0x426f66=_0x150bf7;VisuMZ[_0x426f66(0x7d0)][_0x426f66(0x4c9)]['call'](this),this[_0x426f66(0x5e2)]();},Sprite[_0x150bf7(0x8e0)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x5d7fd2=_0x150bf7;if(!this[_0x5d7fd2(0x219)])return;if(!this['bitmap'][_0x5d7fd2(0x73e)])return;this[_0x5d7fd2(0x219)]['_baseTexture']&&!this[_0x5d7fd2(0x1d3)]['_baseTexture'][_0x5d7fd2(0x55d)]&&this[_0x5d7fd2(0x219)][_0x5d7fd2(0x792)]();},VisuMZ['CoreEngine'][_0x150bf7(0x378)]=Bitmap['prototype'][_0x150bf7(0x31b)],Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x31b)]=function(_0x8d6c97,_0x42df40){const _0x5c9111=_0x150bf7;VisuMZ[_0x5c9111(0x7d0)][_0x5c9111(0x378)][_0x5c9111(0x697)](this,_0x8d6c97,_0x42df40),this['markCoreEngineModified']();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x66f)]=Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x465)],Bitmap['prototype'][_0x150bf7(0x465)]=function(_0x14132e,_0x29597a,_0x3b8a7e,_0x5e99d0,_0x43c39b,_0xd7c713,_0x124b17,_0xb30c0a,_0x4e0f4c){const _0x24779b=_0x150bf7;_0x29597a=Math[_0x24779b(0x469)](_0x29597a),_0x3b8a7e=Math[_0x24779b(0x469)](_0x3b8a7e),_0x5e99d0=Math[_0x24779b(0x469)](_0x5e99d0),_0x43c39b=Math[_0x24779b(0x469)](_0x43c39b),_0xd7c713=Math[_0x24779b(0x469)](_0xd7c713),_0x124b17=Math['round'](_0x124b17),VisuMZ[_0x24779b(0x7d0)][_0x24779b(0x66f)][_0x24779b(0x697)](this,_0x14132e,_0x29597a,_0x3b8a7e,_0x5e99d0,_0x43c39b,_0xd7c713,_0x124b17,_0xb30c0a,_0x4e0f4c),this['markCoreEngineModified']();},VisuMZ['CoreEngine']['Bitmap_clearRect']=Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x52f)],Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x52f)]=function(_0x192ed3,_0x1df136,_0x584aa4,_0x23ffa5){const _0x13833b=_0x150bf7;VisuMZ[_0x13833b(0x7d0)][_0x13833b(0x2fe)][_0x13833b(0x697)](this,_0x192ed3,_0x1df136,_0x584aa4,_0x23ffa5),this[_0x13833b(0x8eb)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x2fb)]=Bitmap['prototype'][_0x150bf7(0x3a1)],Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x3a1)]=function(_0x2a7eb5,_0x2d8f97,_0x327cc7,_0x297925,_0x314a96){VisuMZ['CoreEngine']['Bitmap_fillRect']['call'](this,_0x2a7eb5,_0x2d8f97,_0x327cc7,_0x297925,_0x314a96),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x150bf7(0x54a)]=Bitmap['prototype'][_0x150bf7(0x36b)],Bitmap[_0x150bf7(0x8e0)]['strokeRect']=function(_0x2cea74,_0x132385,_0x3956d6,_0x3d860d,_0x2f9b70){const _0x1a1d53=_0x150bf7;VisuMZ[_0x1a1d53(0x7d0)][_0x1a1d53(0x54a)][_0x1a1d53(0x697)](this,_0x2cea74,_0x132385,_0x3956d6,_0x3d860d,_0x2f9b70),this['markCoreEngineModified']();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x552)]=Bitmap[_0x150bf7(0x8e0)]['gradientFillRect'],Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x735)]=function(_0x5bbbb3,_0x3820ab,_0x4164e4,_0x4fa4ac,_0x129442,_0x2e240b,_0x1e0cd7){const _0x3a4249=_0x150bf7;VisuMZ[_0x3a4249(0x7d0)][_0x3a4249(0x552)][_0x3a4249(0x697)](this,_0x5bbbb3,_0x3820ab,_0x4164e4,_0x4fa4ac,_0x129442,_0x2e240b,_0x1e0cd7),this[_0x3a4249(0x8eb)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x6d7)]=Bitmap['prototype'][_0x150bf7(0x23c)],Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x23c)]=function(_0x37b96a,_0xb91fe,_0x9dbb2c,_0x5cac49){const _0x4af9bf=_0x150bf7;_0x37b96a=Math[_0x4af9bf(0x469)](_0x37b96a),_0xb91fe=Math[_0x4af9bf(0x469)](_0xb91fe),_0x9dbb2c=Math[_0x4af9bf(0x469)](_0x9dbb2c),VisuMZ[_0x4af9bf(0x7d0)][_0x4af9bf(0x6d7)][_0x4af9bf(0x697)](this,_0x37b96a,_0xb91fe,_0x9dbb2c,_0x5cac49),this['markCoreEngineModified']();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x85a)]=Bitmap['prototype']['measureTextWidth'],Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x551)]=function(_0x262b59){const _0x2dd1f1=_0x150bf7;return Math[_0x2dd1f1(0x8da)](VisuMZ[_0x2dd1f1(0x7d0)][_0x2dd1f1(0x85a)][_0x2dd1f1(0x697)](this,_0x262b59));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x4d2)]=Bitmap['prototype'][_0x150bf7(0x714)],Bitmap[_0x150bf7(0x8e0)]['drawText']=function(_0x4edb01,_0xf6d0e,_0x14a6dc,_0x39f2af,_0x43de57,_0x537130){const _0x56709e=_0x150bf7;_0xf6d0e=Math['round'](_0xf6d0e),_0x14a6dc=Math[_0x56709e(0x469)](_0x14a6dc),_0x39f2af=Math['round'](_0x39f2af),_0x43de57=Math[_0x56709e(0x469)](_0x43de57),VisuMZ[_0x56709e(0x7d0)]['Bitmap_drawText'][_0x56709e(0x697)](this,_0x4edb01,_0xf6d0e,_0x14a6dc,_0x39f2af,_0x43de57,_0x537130),this[_0x56709e(0x8eb)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x3e2)]=Bitmap['prototype']['_drawTextOutline'],Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x12e)]=function(_0x14eaf0,_0x3f3eab,_0x55e090,_0xe6490b){const _0x2f8561=_0x150bf7;VisuMZ[_0x2f8561(0x7d0)][_0x2f8561(0x486)][_0x2f8561(0x51b)][_0x2f8561(0x389)]?this[_0x2f8561(0x2d8)](_0x14eaf0,_0x3f3eab,_0x55e090,_0xe6490b):'DpWoI'!==_0x2f8561(0x2a9)?this['drawSegment'](_0x27dee7):VisuMZ[_0x2f8561(0x7d0)][_0x2f8561(0x3e2)]['call'](this,_0x14eaf0,_0x3f3eab,_0x55e090,_0xe6490b);},Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x2d8)]=function(_0x5574da,_0x2fd236,_0x4c08d2,_0x2c0e63){const _0x135188=_0x150bf7,_0x3de9ac=this[_0x135188(0x7ae)];_0x3de9ac[_0x135188(0x44e)]=this['outlineColor'],_0x3de9ac[_0x135188(0x8ef)](_0x5574da,_0x2fd236+0x2,_0x4c08d2+0x2,_0x2c0e63);},VisuMZ['CoreEngine'][_0x150bf7(0x6b2)]=Input[_0x150bf7(0x62c)],Input[_0x150bf7(0x62c)]=function(){const _0xff1310=_0x150bf7;VisuMZ[_0xff1310(0x7d0)][_0xff1310(0x6b2)][_0xff1310(0x697)](this),this[_0xff1310(0x7a3)]=undefined,this[_0xff1310(0x331)]=undefined,this[_0xff1310(0x668)]=Input[_0xff1310(0x84f)];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x52a)]=Input[_0x150bf7(0x5cd)],Input['update']=function(){const _0x50aaf5=_0x150bf7;VisuMZ[_0x50aaf5(0x7d0)][_0x50aaf5(0x52a)][_0x50aaf5(0x697)](this);if(this[_0x50aaf5(0x668)])this['_gamepadWait']--;},VisuMZ['CoreEngine'][_0x150bf7(0x517)]=Input[_0x150bf7(0x780)],Input[_0x150bf7(0x780)]=function(){const _0x18f406=_0x150bf7;if(this[_0x18f406(0x668)])return;VisuMZ[_0x18f406(0x7d0)]['Input_pollGamepads'][_0x18f406(0x697)](this);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x56c)]=Input[_0x150bf7(0x6ea)],Input['_setupEventHandlers']=function(){const _0x5f0071=_0x150bf7;VisuMZ[_0x5f0071(0x7d0)]['Input_setupEventHandlers'][_0x5f0071(0x697)](this),document[_0x5f0071(0x7f9)](_0x5f0071(0x226),this[_0x5f0071(0x4e5)][_0x5f0071(0x45b)](this));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x195)]=Input[_0x150bf7(0x5e0)],Input[_0x150bf7(0x5e0)]=function(_0x948337){const _0x2588bb=_0x150bf7;this['_inputSpecialKeyCode']=_0x948337['keyCode'],VisuMZ[_0x2588bb(0x7d0)][_0x2588bb(0x195)][_0x2588bb(0x697)](this,_0x948337);},Input[_0x150bf7(0x4e5)]=function(_0x32485b){const _0x262114=_0x150bf7;this[_0x262114(0x345)](_0x32485b);},Input['_registerKeyInput']=function(_0x4f7190){const _0x3289ce=_0x150bf7;this[_0x3289ce(0x331)]=_0x4f7190['keyCode'];let _0x3e5d1e=String[_0x3289ce(0x585)](_0x4f7190['charCode']);if(this[_0x3289ce(0x7a3)]===undefined){if(_0x3289ce(0x44c)===_0x3289ce(0x44c))this[_0x3289ce(0x7a3)]=_0x3e5d1e;else{var _0x253621=_0x26040d(_0x51b33d['$1']);_0x455326+=_0x253621;}}else{if(_0x3289ce(0x754)!=='zIXCR')return _0x188a05[_0x3289ce(0x749)][_0x3289ce(0x6c0)][_0x3289ce(0x697)](this);else this['_inputString']+=_0x3e5d1e;}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x5c8)]=Input[_0x150bf7(0x768)],Input[_0x150bf7(0x768)]=function(_0xcc0a33){const _0x14ddca=_0x150bf7;if(_0xcc0a33===0x8)return![];return VisuMZ[_0x14ddca(0x7d0)][_0x14ddca(0x5c8)][_0x14ddca(0x697)](this,_0xcc0a33);},Input[_0x150bf7(0x15a)]=function(_0x50481e){const _0x324d68=_0x150bf7;if(_0x50481e[_0x324d68(0x60c)](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x50481e['match'](/enter/i))return this[_0x324d68(0x331)]===0xd;if(_0x50481e[_0x324d68(0x60c)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x150bf7(0x808)]=function(){const _0x447dbb=_0x150bf7;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x447dbb(0x3d5)](this['_inputSpecialKeyCode']);},Input['isArrowPressed']=function(){const _0x17f6f6=_0x150bf7;return[0x25,0x26,0x27,0x28]['contains'](this[_0x17f6f6(0x331)]);},Input[_0x150bf7(0x892)]=function(){const _0x169b9f=_0x150bf7;if(navigator[_0x169b9f(0x135)]){if('LlOYV'!=='LlOYV'){if(!this[_0x169b9f(0x121)])return _0x6f93cc;return _0x48f3d6[_0x169b9f(0x39f)](_0x3f1e0c,this['_coreEasing'][_0x169b9f(0x53f)]||_0x169b9f(0x197));}else{const _0x2da590=navigator['getGamepads']();if(_0x2da590){if('qHnaD'==='qHnaD')for(const _0x496992 of _0x2da590){if(_0x169b9f(0x549)===_0x169b9f(0x549)){if(_0x496992&&_0x496992[_0x169b9f(0x80b)]){if(_0x169b9f(0x39a)!==_0x169b9f(0x39a))for(_0x3ed36a of _0x34dbef[_0x169b9f(0x691)]()){_0x247174[_0x169b9f(0x46c)]();}else return!![];}}else{const _0x246a86=_0x3a8005['ApplyEasing']((_0x56547a-_0x1687fa)/_0x40bd68,_0x1887bc||_0x169b9f(0x126)),_0x41e797=_0x2a9735['ApplyEasing']((_0x1a7a13-_0x3194c4+0x1)/_0x43292c,_0x11988c||'Linear'),_0x411945=(_0x1f4cb6-_0x25aa50*_0x246a86)/(0x1-_0x246a86);return _0x411945+(_0x18630f-_0x411945)*_0x41e797;}}else{if(_0x1aa214[_0x169b9f(0x2c1)]==='SV')return!![];else{if(_0x35e6bf[_0x169b9f(0x2c1)]==='FV')return![];}if(this[_0x169b9f(0x508)]===_0x4e877a)this[_0x169b9f(0x42b)]();if(this[_0x169b9f(0x508)]['SideView']===_0x5e4ecd)this[_0x169b9f(0x42b)]();return this[_0x169b9f(0x508)][_0x169b9f(0x251)];}}}}return![];},Input[_0x150bf7(0x812)]=function(){const _0x4f3bc4=_0x150bf7;if(navigator[_0x4f3bc4(0x135)]){const _0x477d17=navigator[_0x4f3bc4(0x135)]();if(_0x477d17){if(_0x4f3bc4(0x59b)===_0x4f3bc4(0x238))this[_0x4f3bc4(0x5b4)]['x']=_0x399bdc[_0x4f3bc4(0x8f9)]+0x4,this[_0x4f3bc4(0x5c5)]()?this[_0x4f3bc4(0x5b4)]['y']=_0x59d8dd['boxHeight']-this[_0x4f3bc4(0x752)]():this[_0x4f3bc4(0x5b4)]['y']=0x0;else for(const _0x56741d of _0x477d17){if(_0x56741d&&_0x56741d['connected']){if(this['isGamepadButtonPressed'](_0x56741d))return!![];}}}}return![];},Input[_0x150bf7(0x794)]=function(_0x5ac5f3){const _0x9be3b7=_0x150bf7,_0xbf8b09=_0x5ac5f3['buttons'];for(let _0x28757f=0x0;_0x28757f<_0xbf8b09[_0x9be3b7(0x452)];_0x28757f++){if(_0xbf8b09[_0x28757f]['pressed'])return!![];}return![];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x564)]=Tilemap[_0x150bf7(0x8e0)]['_addShadow'],Tilemap[_0x150bf7(0x8e0)]['_addShadow']=function(_0x624f92,_0x528475,_0x2bfda9,_0x2ee47e){const _0x2aeaae=_0x150bf7;if($gameMap&&$gameMap[_0x2aeaae(0x78c)]())return;VisuMZ[_0x2aeaae(0x7d0)]['Tilemap_addShadow'][_0x2aeaae(0x697)](this,_0x624f92,_0x528475,_0x2bfda9,_0x2ee47e);},Tilemap['Renderer'][_0x150bf7(0x8e0)][_0x150bf7(0x482)]=function(){const _0x43b596=_0x150bf7;this['_destroyInternalTextures']();for(let _0x8f6aaf=0x0;_0x8f6aaf<Tilemap[_0x43b596(0x6a6)][_0x43b596(0x695)];_0x8f6aaf++){const _0x4fbb04=new PIXI[(_0x43b596(0x65e))]();_0x4fbb04[_0x43b596(0x1ed)](0x800,0x800),VisuMZ[_0x43b596(0x7d0)][_0x43b596(0x486)][_0x43b596(0x51b)][_0x43b596(0x316)]&&(_0x4fbb04[_0x43b596(0x240)]=PIXI[_0x43b596(0x6c5)][_0x43b596(0x6fc)]),this[_0x43b596(0x4ab)][_0x43b596(0x4c5)](_0x4fbb04);}},WindowLayer[_0x150bf7(0x8e0)][_0x150bf7(0x5f2)]=function(){const _0xe8289a=_0x150bf7;if(SceneManager&&SceneManager[_0xe8289a(0x71e)])return _0xe8289a(0x71c)!==_0xe8289a(0x71c)?!![]:SceneManager['_scene'][_0xe8289a(0x5ae)]();else{if(_0xe8289a(0x4b0)===_0xe8289a(0x4b0))return!![];else{if(this['_CoreEngineSettings']===_0x926b9d)this[_0xe8289a(0x42b)]();if(this[_0xe8289a(0x508)][_0xe8289a(0x251)]===_0x219e03)this['initCoreEngine']();this[_0xe8289a(0x508)][_0xe8289a(0x251)]=_0x4e7d95;}}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x566)]=WindowLayer['prototype'][_0x150bf7(0x6dd)],WindowLayer['prototype'][_0x150bf7(0x6dd)]=function render(_0x52d027){const _0x53d8b2=_0x150bf7;this[_0x53d8b2(0x5f2)]()?_0x53d8b2(0x1b4)==='WismF'?VisuMZ[_0x53d8b2(0x7d0)][_0x53d8b2(0x566)][_0x53d8b2(0x697)](this,_0x52d027):(_0x1356d9[_0x53d8b2(0x7d0)][_0x53d8b2(0x2fe)]['call'](this,_0xc5d7c5,_0x4da5c7,_0x35a9ad,_0x3ea182),this[_0x53d8b2(0x8eb)]()):this[_0x53d8b2(0x27b)](_0x52d027);},WindowLayer[_0x150bf7(0x8e0)][_0x150bf7(0x27b)]=function render(_0x46fbe9){const _0x57b21d=_0x150bf7;if(!this[_0x57b21d(0x814)])return;const _0x3977dc=new PIXI[(_0x57b21d(0x309))](),_0x20a7ac=_0x46fbe9['gl'],_0x44f876=this[_0x57b21d(0x819)][_0x57b21d(0x5d4)]();_0x46fbe9[_0x57b21d(0x17b)][_0x57b21d(0x701)](),_0x3977dc[_0x57b21d(0x616)]=this[_0x57b21d(0x616)],_0x46fbe9['batch'][_0x57b21d(0x3d3)](),_0x20a7ac[_0x57b21d(0x1ad)](_0x20a7ac[_0x57b21d(0x6c7)]);while(_0x44f876['length']>0x0){if(_0x57b21d(0x1e1)===_0x57b21d(0x1e1)){const _0x3f3519=_0x44f876[_0x57b21d(0x4f2)]();_0x3f3519[_0x57b21d(0x4d8)]&&_0x3f3519['visible']&&_0x3f3519[_0x57b21d(0x8d5)]>0x0&&(_0x20a7ac['stencilFunc'](_0x20a7ac[_0x57b21d(0x185)],0x0,~0x0),_0x20a7ac['stencilOp'](_0x20a7ac[_0x57b21d(0x655)],_0x20a7ac[_0x57b21d(0x655)],_0x20a7ac['KEEP']),_0x3f3519[_0x57b21d(0x6dd)](_0x46fbe9),_0x46fbe9[_0x57b21d(0x902)][_0x57b21d(0x3d3)](),_0x3977dc['clear'](),_0x20a7ac[_0x57b21d(0x85b)](_0x20a7ac[_0x57b21d(0x3e9)],0x1,~0x0),_0x20a7ac[_0x57b21d(0x157)](_0x20a7ac[_0x57b21d(0x766)],_0x20a7ac[_0x57b21d(0x766)],_0x20a7ac['REPLACE']),_0x20a7ac['blendFunc'](_0x20a7ac[_0x57b21d(0x628)],_0x20a7ac[_0x57b21d(0x7e7)]),_0x3977dc[_0x57b21d(0x6dd)](_0x46fbe9),_0x46fbe9[_0x57b21d(0x902)][_0x57b21d(0x3d3)](),_0x20a7ac['blendFunc'](_0x20a7ac[_0x57b21d(0x7e7)],_0x20a7ac[_0x57b21d(0x8b7)]));}else{for(let _0x123a31=0x0;_0x123a31<this[_0x57b21d(0x64c)]();_0x123a31++){const _0x4bd296=this[_0x57b21d(0x8c5)]();let _0x1c0866=_0x11e5d9['MIN_SAFE_INTEGER'];this[_0x57b21d(0x3da)](_0x123a31,_0x4bd296[0x0]);for(const _0xa2a6e6 of _0x4bd296){const _0x2e0a01=_0xa2a6e6[_0x57b21d(0x6b3)]();_0x2e0a01>_0x1c0866&&(_0x1c0866=_0x2e0a01,this[_0x57b21d(0x3da)](_0x123a31,_0xa2a6e6));}}this['setActionState'](_0x57b21d(0x826));}}_0x20a7ac[_0x57b21d(0x8ea)](_0x20a7ac[_0x57b21d(0x6c7)]),_0x20a7ac['clear'](_0x20a7ac[_0x57b21d(0x54c)]),_0x20a7ac[_0x57b21d(0x17c)](0x0),_0x46fbe9['batch'][_0x57b21d(0x3d3)]();for(const _0xb40626 of this[_0x57b21d(0x819)]){!_0xb40626[_0x57b21d(0x4d8)]&&_0xb40626[_0x57b21d(0x814)]&&_0xb40626[_0x57b21d(0x6dd)](_0x46fbe9);}_0x46fbe9['batch'][_0x57b21d(0x3d3)]();},DataManager[_0x150bf7(0x3af)]=function(_0x1e1bb9){const _0x5f29eb=_0x150bf7;return this[_0x5f29eb(0x779)](_0x1e1bb9)&&_0x1e1bb9[_0x5f29eb(0x48c)]===0x2;},VisuMZ['CoreEngine'][_0x150bf7(0x2c5)]=DataManager[_0x150bf7(0x19d)],DataManager[_0x150bf7(0x19d)]=function(){const _0x2dd1b6=_0x150bf7;VisuMZ['CoreEngine'][_0x2dd1b6(0x2c5)][_0x2dd1b6(0x697)](this),this['reservePlayTestNewGameCommonEvent'](),this['reserveNewGameCommonEvent']();},DataManager[_0x150bf7(0x88a)]=function(){const _0x1da0f7=_0x150bf7;if($gameTemp['isPlaytest']()){const _0x5d0c0f=VisuMZ[_0x1da0f7(0x7d0)]['Settings'][_0x1da0f7(0x51b)][_0x1da0f7(0x669)];if(_0x5d0c0f>0x0)$gameTemp[_0x1da0f7(0x241)](_0x5d0c0f);}},DataManager[_0x150bf7(0x3d7)]=function(){const _0xa6eecc=_0x150bf7,_0x3382de=VisuMZ[_0xa6eecc(0x7d0)][_0xa6eecc(0x486)][_0xa6eecc(0x51b)]['NewGameCommonEventAll']||0x0;if(_0x3382de>0x0)$gameTemp['reserveCommonEvent'](_0x3382de);},DataManager[_0x150bf7(0x78e)]=function(_0x527749){const _0x26d2f0=_0x150bf7,_0x1b973c=$dataTroops[_0x527749];if(!_0x1b973c)return'';let _0x562cd6='';_0x562cd6+=_0x1b973c[_0x26d2f0(0x42a)];for(const _0x4f3cf8 of _0x1b973c[_0x26d2f0(0x618)]){if(_0x26d2f0(0x355)!=='TSNQh'){this[_0x26d2f0(0x21a)][_0x26d2f0(0x62c)]();const _0x280c3b=_0x1074df[_0x26d2f0(0x156)],_0x38aa3b=_0x2e27e4['picture'](_0x280c3b);if(!_0x38aa3b)return;this[_0x26d2f0(0x3b2)]=_0x38aa3b[_0x26d2f0(0x297)],this[_0x26d2f0(0x599)]=_0x38aa3b['_x'],this['_lastY']=_0x38aa3b['_y'];const _0x28f001=_0x466cef[_0x26d2f0(0x366)]();this[_0x26d2f0(0x21a)]['fillRect'](0x0,0x0,this[_0x26d2f0(0x339)],this[_0x26d2f0(0x2a4)],_0x28f001);const _0x1171ef='\x20Origin:\x20%1'[_0x26d2f0(0x322)](_0x38aa3b['_origin']===0x0?_0x26d2f0(0x17e):_0x26d2f0(0x77a)),_0x1ef53c=_0x26d2f0(0x147)[_0x26d2f0(0x322)](_0x38aa3b['_x']),_0x12932d=_0x26d2f0(0x234)[_0x26d2f0(0x322)](_0x38aa3b['_y']),_0x52caa1='%1:\x20Exit\x20'['format'](_0x1460c8[_0x26d2f0(0x246)](_0x26d2f0(0x2b1)));let _0x47b550=_0x16e1d4[_0x26d2f0(0x7d1)](this[_0x26d2f0(0x339)]/0x4);this[_0x26d2f0(0x714)](_0x1171ef,_0x47b550*0x0,0x0,_0x47b550),this[_0x26d2f0(0x714)](_0x1ef53c,_0x47b550*0x1,0x0,_0x47b550,_0x26d2f0(0x1e5)),this['drawText'](_0x12932d,_0x47b550*0x2,0x0,_0x47b550,_0x26d2f0(0x1e5));const _0xd271af=this[_0x26d2f0(0x385)](_0x52caa1)['width'],_0x537731=this[_0x26d2f0(0x339)]-_0xd271af;this[_0x26d2f0(0x5f6)](_0x52caa1,_0x537731,0x0,_0xd271af);}else for(const _0x22668c of _0x4f3cf8[_0x26d2f0(0x2c6)]){[0x6c,0x198][_0x26d2f0(0x886)](_0x22668c[_0x26d2f0(0x3f1)])&&(_0x562cd6+='\x0a',_0x562cd6+=_0x22668c[_0x26d2f0(0x155)][0x0]);}}return _0x562cd6;};(VisuMZ['CoreEngine'][_0x150bf7(0x486)]['QoL'][_0x150bf7(0x5d2)]??!![])&&($scene=null,VisuMZ[_0x150bf7(0x7d0)]['Scene_Base_create']=Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)],Scene_Base[_0x150bf7(0x8e0)]['create']=function(){const _0x50373e=_0x150bf7;VisuMZ[_0x50373e(0x7d0)][_0x50373e(0x7fb)][_0x50373e(0x697)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0x150bf7(0x8fb)]=Scene_Map[_0x150bf7(0x8e0)]['createSpriteset'],Scene_Map[_0x150bf7(0x8e0)]['createSpriteset']=function(){const _0x1b425b=_0x150bf7;VisuMZ[_0x1b425b(0x7d0)][_0x1b425b(0x8fb)]['call'](this),$spriteset=this[_0x1b425b(0x479)];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x4b8)]=Scene_Battle['prototype'][_0x150bf7(0x605)],Scene_Battle[_0x150bf7(0x8e0)]['createSpriteset']=function(){const _0x3409b3=_0x150bf7;VisuMZ[_0x3409b3(0x7d0)]['Scene_Battle_createSpriteset'][_0x3409b3(0x697)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x45d)]=Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x622)],Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x622)]=function(){const _0x124f5a=_0x150bf7;VisuMZ['CoreEngine'][_0x124f5a(0x45d)][_0x124f5a(0x697)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x666)]=BattleManager[_0x150bf7(0x5cd)],BattleManager[_0x150bf7(0x5cd)]=function(_0x1e384e){const _0xb14d12=_0x150bf7;VisuMZ[_0xb14d12(0x7d0)][_0xb14d12(0x666)][_0xb14d12(0x697)](this,_0x1e384e),$subject=this[_0xb14d12(0x300)],$targets=this['_targets'],$target=this['_target']||this[_0xb14d12(0x728)][0x0];},$event=null,VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x3f2)]=Game_Event[_0x150bf7(0x8e0)][_0x150bf7(0x2f6)],Game_Event[_0x150bf7(0x8e0)][_0x150bf7(0x2f6)]=function(){const _0x36829b=_0x150bf7;VisuMZ[_0x36829b(0x7d0)][_0x36829b(0x3f2)][_0x36829b(0x697)](this),$event=this;},VisuMZ['CoreEngine']['Scene_Map_update']=Scene_Map['prototype'][_0x150bf7(0x5cd)],Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x5cd)]=function(){const _0x13a6be=_0x150bf7;VisuMZ[_0x13a6be(0x7d0)][_0x13a6be(0x3b3)][_0x13a6be(0x697)](this),$gameMap[_0x13a6be(0x83a)]();},Game_Map[_0x150bf7(0x8e0)][_0x150bf7(0x83a)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x36baa0){const _0x4f9633=_0x150bf7;if($gameTemp)$gameTemp[_0x4f9633(0x241)](_0x36baa0);},$onceParallel=function(_0x450cf8){const _0x4a2e64=_0x150bf7;if(SceneManager[_0x4a2e64(0x746)]())$scene['playOnceParallelInterpreter'](_0x450cf8);else{if(SceneManager[_0x4a2e64(0x11e)]()){if(Imported[_0x4a2e64(0x7c0)])$scene[_0x4a2e64(0x79d)](_0x450cf8);else{if($gameTemp&&$gameTemp[_0x4a2e64(0x7df)]()){if(_0x4a2e64(0x1a0)!==_0x4a2e64(0x1a0))return this[_0x4a2e64(0x833)](_0x26b5dc,_0x353bb3);else alert(_0x4a2e64(0x4f7));}}}else $gameTemp&&$gameTemp[_0x4a2e64(0x7df)]()&&alert(_0x4a2e64(0x7f4));}});;StorageManager[_0x150bf7(0x3d0)]=function(_0xaa1527){return new Promise((_0x4e1372,_0x57e8c0)=>{const _0x58128c=_0x36f3;try{if('BMbVH'===_0x58128c(0x247))this['_x']=this[_0x58128c(0x326)],this['_y']=this[_0x58128c(0x4a7)],this[_0x58128c(0x630)]=this['_targetScaleX'],this['_scaleY']=this[_0x58128c(0x221)],this[_0x58128c(0x652)]=this[_0x58128c(0x341)],this[_0x58128c(0x86c)]&&(this['_anchor']['x']=this[_0x58128c(0x6c1)]['x'],this[_0x58128c(0x86c)]['y']=this['_targetAnchor']['y']);else{const _0x36e4b7=pako['deflate'](_0xaa1527,{'to':_0x58128c(0x7cb),'level':0x1});if(_0x36e4b7[_0x58128c(0x452)]>=0xc350){}_0x4e1372(_0x36e4b7);}}catch(_0x33d200){_0x57e8c0(_0x33d200);}});},TextManager['stringKeyMap']=['','','',_0x150bf7(0x591),'','',_0x150bf7(0x6e7),'',_0x150bf7(0x33f),_0x150bf7(0x281),'','',_0x150bf7(0x5bc),_0x150bf7(0x5a9),_0x150bf7(0x335),'',_0x150bf7(0x7b4),_0x150bf7(0x217),'ALT',_0x150bf7(0x890),'CAPSLOCK',_0x150bf7(0x8d1),'EISU',_0x150bf7(0x72c),_0x150bf7(0x4d6),_0x150bf7(0x362),'',_0x150bf7(0x80a),_0x150bf7(0x19c),'NONCONVERT',_0x150bf7(0x1af),_0x150bf7(0x5e3),_0x150bf7(0x649),'PGUP','PGDN',_0x150bf7(0x85d),_0x150bf7(0x37f),_0x150bf7(0x44b),'UP',_0x150bf7(0x33b),_0x150bf7(0x60a),'SELECT',_0x150bf7(0x546),_0x150bf7(0x596),_0x150bf7(0x870),_0x150bf7(0x3c9),_0x150bf7(0x910),'','0','1','2','3','4','5','6','7','8','9',_0x150bf7(0x47d),_0x150bf7(0x805),_0x150bf7(0x1ae),_0x150bf7(0x242),'GREATER_THAN',_0x150bf7(0x44a),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x150bf7(0x3f3),'',_0x150bf7(0x2b0),'','SLEEP','NUMPAD0',_0x150bf7(0x25b),'NUMPAD2',_0x150bf7(0x914),_0x150bf7(0x271),_0x150bf7(0x235),_0x150bf7(0x7f1),'NUMPAD7',_0x150bf7(0x512),_0x150bf7(0x490),_0x150bf7(0x428),_0x150bf7(0x528),_0x150bf7(0x150),_0x150bf7(0x90d),_0x150bf7(0x6b1),_0x150bf7(0x445),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x150bf7(0x7ab),_0x150bf7(0x18f),_0x150bf7(0x347),_0x150bf7(0x3b9),_0x150bf7(0x5a7),_0x150bf7(0x279),_0x150bf7(0x3aa),_0x150bf7(0x403),_0x150bf7(0x14b),_0x150bf7(0x26f),_0x150bf7(0x79e),_0x150bf7(0x3d9),_0x150bf7(0x7ce),'F23','F24','','','','','','','','',_0x150bf7(0x384),_0x150bf7(0x4f9),_0x150bf7(0x47f),_0x150bf7(0x707),_0x150bf7(0x284),_0x150bf7(0x83e),'WIN_OEM_FJ_ROYA','','','','','','','','','',_0x150bf7(0x48a),'EXCLAMATION',_0x150bf7(0x65c),'HASH',_0x150bf7(0x1b3),'PERCENT',_0x150bf7(0x2b9),_0x150bf7(0x87b),_0x150bf7(0x61b),_0x150bf7(0x640),_0x150bf7(0x122),_0x150bf7(0x37b),_0x150bf7(0x79c),_0x150bf7(0x182),_0x150bf7(0x27e),_0x150bf7(0x822),_0x150bf7(0x200),'','','','',_0x150bf7(0x5e4),'VOLUME_DOWN','VOLUME_UP','','',_0x150bf7(0x805),_0x150bf7(0x242),'COMMA','MINUS',_0x150bf7(0x6b4),_0x150bf7(0x42e),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x150bf7(0x32f),_0x150bf7(0x167),_0x150bf7(0x646),_0x150bf7(0x453),'','META',_0x150bf7(0x733),'','WIN_ICO_HELP',_0x150bf7(0x54e),'','WIN_ICO_CLEAR','','',_0x150bf7(0x52e),_0x150bf7(0x63c),_0x150bf7(0x63f),_0x150bf7(0x223),_0x150bf7(0x744),'WIN_OEM_WSCTRL','WIN_OEM_CUSEL','WIN_OEM_ATTN',_0x150bf7(0x4e2),_0x150bf7(0x449),_0x150bf7(0x249),_0x150bf7(0x2f9),'WIN_OEM_BACKTAB',_0x150bf7(0x338),_0x150bf7(0x7e6),_0x150bf7(0x7eb),_0x150bf7(0x4cf),_0x150bf7(0x6f1),'ZOOM','',_0x150bf7(0x3c4),_0x150bf7(0x8b2),''],TextManager[_0x150bf7(0x198)]=VisuMZ[_0x150bf7(0x7d0)]['Settings'][_0x150bf7(0x5eb)][_0x150bf7(0x50f)],TextManager['buttonAssistCancel']=VisuMZ['CoreEngine'][_0x150bf7(0x486)][_0x150bf7(0x5eb)][_0x150bf7(0x269)],TextManager[_0x150bf7(0x1bd)]=VisuMZ[_0x150bf7(0x7d0)]['Settings'][_0x150bf7(0x5eb)][_0x150bf7(0x351)],VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x291)]=TextManager['param'],TextManager[_0x150bf7(0x467)]=function(_0x1d8968){const _0x57104a=_0x150bf7;return typeof _0x1d8968==='number'?VisuMZ[_0x57104a(0x7d0)][_0x57104a(0x291)][_0x57104a(0x697)](this,_0x1d8968):_0x57104a(0x3d2)==='CSxnc'?this[_0x57104a(0x333)](_0x1d8968):!![];},TextManager['paramName']=function(_0x3e02a4){const _0x561e4c=_0x150bf7;_0x3e02a4=String(_0x3e02a4||'')[_0x561e4c(0x288)]();const _0xa42070=VisuMZ['CoreEngine'][_0x561e4c(0x486)]['Param'];if(_0x3e02a4===_0x561e4c(0x7e1))return $dataSystem[_0x561e4c(0x58a)][_0x561e4c(0x360)][0x0];if(_0x3e02a4==='MAXMP')return $dataSystem['terms'][_0x561e4c(0x360)][0x1];if(_0x3e02a4==='ATK')return $dataSystem[_0x561e4c(0x58a)][_0x561e4c(0x360)][0x2];if(_0x3e02a4===_0x561e4c(0x901))return $dataSystem[_0x561e4c(0x58a)]['params'][0x3];if(_0x3e02a4===_0x561e4c(0x4ef))return $dataSystem[_0x561e4c(0x58a)][_0x561e4c(0x360)][0x4];if(_0x3e02a4===_0x561e4c(0x63a))return $dataSystem[_0x561e4c(0x58a)][_0x561e4c(0x360)][0x5];if(_0x3e02a4==='AGI')return $dataSystem['terms'][_0x561e4c(0x360)][0x6];if(_0x3e02a4===_0x561e4c(0x582))return $dataSystem[_0x561e4c(0x58a)][_0x561e4c(0x360)][0x7];if(_0x3e02a4===_0x561e4c(0x515))return _0xa42070[_0x561e4c(0x510)];if(_0x3e02a4===_0x561e4c(0x545))return _0xa42070[_0x561e4c(0x4f4)];if(_0x3e02a4===_0x561e4c(0x1d1))return _0xa42070['XParamVocab2'];if(_0x3e02a4==='CEV')return _0xa42070[_0x561e4c(0x153)];if(_0x3e02a4===_0x561e4c(0x8a0))return _0xa42070['XParamVocab4'];if(_0x3e02a4===_0x561e4c(0x604))return _0xa42070['XParamVocab5'];if(_0x3e02a4===_0x561e4c(0x81c))return _0xa42070[_0x561e4c(0x615)];if(_0x3e02a4==='HRG')return _0xa42070[_0x561e4c(0x35c)];if(_0x3e02a4==='MRG')return _0xa42070[_0x561e4c(0x76a)];if(_0x3e02a4===_0x561e4c(0x387))return _0xa42070[_0x561e4c(0x5dd)];if(_0x3e02a4===_0x561e4c(0x6f7))return _0xa42070[_0x561e4c(0x657)];if(_0x3e02a4===_0x561e4c(0x8a2))return _0xa42070['SParamVocab1'];if(_0x3e02a4===_0x561e4c(0x3c8))return _0xa42070[_0x561e4c(0x186)];if(_0x3e02a4==='PHA')return _0xa42070[_0x561e4c(0x35e)];if(_0x3e02a4===_0x561e4c(0x2e4))return _0xa42070['SParamVocab4'];if(_0x3e02a4===_0x561e4c(0x8b8))return _0xa42070[_0x561e4c(0x1c6)];if(_0x3e02a4===_0x561e4c(0x865))return _0xa42070['SParamVocab6'];if(_0x3e02a4==='MDR')return _0xa42070['SParamVocab7'];if(_0x3e02a4===_0x561e4c(0x28a))return _0xa42070[_0x561e4c(0x7a1)];if(_0x3e02a4===_0x561e4c(0x4c2))return _0xa42070[_0x561e4c(0x882)];if(VisuMZ[_0x561e4c(0x7d0)]['CustomParamNames'][_0x3e02a4]){if(_0x561e4c(0x194)==='XndOw')return VisuMZ[_0x561e4c(0x7d0)][_0x561e4c(0x5e5)][_0x3e02a4];else _0x5eec6d+=_0x2f346a(_0x51bfc9);}return'';},TextManager[_0x150bf7(0x246)]=function(_0x6213a6){const _0x54dcfa=_0x150bf7;if(_0x6213a6==='cancel')_0x6213a6=_0x54dcfa(0x5df);let _0x835a7c=[];for(let _0x2f7358 in Input[_0x54dcfa(0x35a)]){_0x2f7358=Number(_0x2f7358);if(_0x2f7358>=0x60&&_0x2f7358<=0x69)continue;if([0x12,0x20][_0x54dcfa(0x886)](_0x2f7358))continue;if(_0x6213a6===Input['keyMapper'][_0x2f7358]){if(_0x54dcfa(0x383)===_0x54dcfa(0x4df))return _0x28b89d[_0x54dcfa(0x7d0)][_0x54dcfa(0x486)][_0x54dcfa(0x726)][_0xb5e073]||_0x4976db[_0x54dcfa(0x7d0)][_0x54dcfa(0x486)]['MenuBg'][_0x54dcfa(0x457)];else _0x835a7c[_0x54dcfa(0x4c5)](_0x2f7358);}}for(let _0xf796a4=0x0;_0xf796a4<_0x835a7c['length'];_0xf796a4++){_0x835a7c[_0xf796a4]=TextManager[_0x54dcfa(0x869)][_0x835a7c[_0xf796a4]];}return this[_0x54dcfa(0x190)](_0x835a7c);},TextManager['makeInputButtonString']=function(_0x2e70f8){const _0x8d0e0d=_0x150bf7,_0x4428a8=VisuMZ['CoreEngine'][_0x8d0e0d(0x486)][_0x8d0e0d(0x5eb)],_0x371974=_0x4428a8['KeyUnlisted'],_0x2f93ee=_0x2e70f8['pop'](),_0x29daf6=_0x8d0e0d(0x7ba)[_0x8d0e0d(0x322)](_0x2f93ee);return _0x4428a8[_0x29daf6]?_0x4428a8[_0x29daf6]:_0x371974[_0x8d0e0d(0x322)](_0x2f93ee);},TextManager['getInputMultiButtonStrings']=function(_0x2c851f,_0x43f537){const _0x25fe18=_0x150bf7,_0x1190e3=VisuMZ[_0x25fe18(0x7d0)]['Settings'][_0x25fe18(0x5eb)],_0x5210df=_0x1190e3[_0x25fe18(0x8ed)],_0x2576de=this[_0x25fe18(0x246)](_0x2c851f),_0x4dc3a2=this['getInputButtonString'](_0x43f537);return _0x5210df['format'](_0x2576de,_0x4dc3a2);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x292)]=ColorManager[_0x150bf7(0x13f)],ColorManager[_0x150bf7(0x13f)]=function(){const _0x247b49=_0x150bf7;VisuMZ[_0x247b49(0x7d0)]['ColorManager_loadWindowskin'][_0x247b49(0x697)](this),this['_colorCache']=this['_colorCache']||{};},ColorManager[_0x150bf7(0x3cc)]=function(_0x1a1012,_0x2ce278){const _0x4a4db4=_0x150bf7;return _0x2ce278=String(_0x2ce278),this[_0x4a4db4(0x7e8)]=this[_0x4a4db4(0x7e8)]||{},_0x2ce278[_0x4a4db4(0x60c)](/#(.*)/i)?this[_0x4a4db4(0x7e8)][_0x1a1012]='#%1'[_0x4a4db4(0x322)](String(RegExp['$1'])):'Pkgvl'===_0x4a4db4(0x703)?_0x1753c6['isPlaytest']()&&(_0x53c3a6['log']('Show\x20Scrolling\x20Text\x20Script\x20Error'),_0x34b5ce['log'](_0x32699b)):this['_colorCache'][_0x1a1012]=this['textColor'](Number(_0x2ce278)),this[_0x4a4db4(0x7e8)][_0x1a1012];},ColorManager[_0x150bf7(0x24e)]=function(_0x84bacd){const _0x4df1db=_0x150bf7;return _0x84bacd=String(_0x84bacd),_0x84bacd[_0x4df1db(0x60c)](/#(.*)/i)?'#%1'[_0x4df1db(0x322)](String(RegExp['$1'])):this[_0x4df1db(0x420)](Number(_0x84bacd));},ColorManager[_0x150bf7(0x905)]=function(){const _0xcd763c=_0x150bf7;this[_0xcd763c(0x7e8)]={};},ColorManager['normalColor']=function(){const _0x29e00e=_0x150bf7,_0x24c3d6=_0x29e00e(0x3bb);this[_0x29e00e(0x7e8)]=this['_colorCache']||{};if(this[_0x29e00e(0x7e8)][_0x24c3d6])return this[_0x29e00e(0x7e8)][_0x24c3d6];const _0x3701cc=VisuMZ['CoreEngine'][_0x29e00e(0x486)][_0x29e00e(0x49f)][_0x29e00e(0x31a)];return this[_0x29e00e(0x3cc)](_0x24c3d6,_0x3701cc);},ColorManager[_0x150bf7(0x660)]=function(){const _0x1b9f1b=_0x150bf7,_0x5d5d00='_stored_systemColor';this[_0x1b9f1b(0x7e8)]=this['_colorCache']||{};if(this[_0x1b9f1b(0x7e8)][_0x5d5d00])return this['_colorCache'][_0x5d5d00];const _0x385590=VisuMZ[_0x1b9f1b(0x7d0)][_0x1b9f1b(0x486)][_0x1b9f1b(0x49f)]['ColorSystem'];return this['getColorDataFromPluginParameters'](_0x5d5d00,_0x385590);},ColorManager[_0x150bf7(0x23d)]=function(){const _0x23c5db=_0x150bf7,_0x22dd7b=_0x23c5db(0x69d);this[_0x23c5db(0x7e8)]=this['_colorCache']||{};if(this[_0x23c5db(0x7e8)][_0x22dd7b])return this[_0x23c5db(0x7e8)][_0x22dd7b];const _0x28fcc0=VisuMZ[_0x23c5db(0x7d0)][_0x23c5db(0x486)][_0x23c5db(0x49f)][_0x23c5db(0x18c)];return this[_0x23c5db(0x3cc)](_0x22dd7b,_0x28fcc0);},ColorManager[_0x150bf7(0x3e3)]=function(){const _0xa53c2b=_0x150bf7,_0x2c44fd=_0xa53c2b(0x8fc);this[_0xa53c2b(0x7e8)]=this[_0xa53c2b(0x7e8)]||{};if(this[_0xa53c2b(0x7e8)][_0x2c44fd])return this[_0xa53c2b(0x7e8)][_0x2c44fd];const _0x4c4870=VisuMZ['CoreEngine'][_0xa53c2b(0x486)][_0xa53c2b(0x49f)][_0xa53c2b(0x1ba)];return this[_0xa53c2b(0x3cc)](_0x2c44fd,_0x4c4870);},ColorManager[_0x150bf7(0x5f1)]=function(){const _0x17af26=_0x150bf7,_0x500e0d=_0x17af26(0x149);this[_0x17af26(0x7e8)]=this[_0x17af26(0x7e8)]||{};if(this[_0x17af26(0x7e8)][_0x500e0d])return this[_0x17af26(0x7e8)][_0x500e0d];const _0x4c45ba=VisuMZ[_0x17af26(0x7d0)][_0x17af26(0x486)][_0x17af26(0x49f)]['ColorGaugeBack'];return this['getColorDataFromPluginParameters'](_0x500e0d,_0x4c45ba);},ColorManager[_0x150bf7(0x5fd)]=function(){const _0x463043=_0x150bf7,_0x5375c3=_0x463043(0x8be);this['_colorCache']=this[_0x463043(0x7e8)]||{};if(this[_0x463043(0x7e8)][_0x5375c3])return this[_0x463043(0x7e8)][_0x5375c3];const _0x548777=VisuMZ['CoreEngine'][_0x463043(0x486)]['Color']['ColorHPGauge1'];return this[_0x463043(0x3cc)](_0x5375c3,_0x548777);},ColorManager[_0x150bf7(0x7b6)]=function(){const _0x406d5a=_0x150bf7,_0x2a24fa=_0x406d5a(0x86d);this['_colorCache']=this[_0x406d5a(0x7e8)]||{};if(this['_colorCache'][_0x2a24fa])return this[_0x406d5a(0x7e8)][_0x2a24fa];const _0x10eab6=VisuMZ[_0x406d5a(0x7d0)][_0x406d5a(0x486)][_0x406d5a(0x49f)][_0x406d5a(0x4e4)];return this[_0x406d5a(0x3cc)](_0x2a24fa,_0x10eab6);},ColorManager[_0x150bf7(0x742)]=function(){const _0x34a55a=_0x150bf7,_0x1abdef='_stored_mpGaugeColor1';this[_0x34a55a(0x7e8)]=this[_0x34a55a(0x7e8)]||{};if(this[_0x34a55a(0x7e8)][_0x1abdef])return this[_0x34a55a(0x7e8)][_0x1abdef];const _0x17e594=VisuMZ[_0x34a55a(0x7d0)][_0x34a55a(0x486)][_0x34a55a(0x49f)][_0x34a55a(0x8d0)];return this[_0x34a55a(0x3cc)](_0x1abdef,_0x17e594);},ColorManager[_0x150bf7(0x4a1)]=function(){const _0x181575=_0x150bf7,_0x325075=_0x181575(0x7f2);this[_0x181575(0x7e8)]=this[_0x181575(0x7e8)]||{};if(this['_colorCache'][_0x325075])return this[_0x181575(0x7e8)][_0x325075];const _0x3999fd=VisuMZ[_0x181575(0x7d0)]['Settings']['Color'][_0x181575(0x302)];return this[_0x181575(0x3cc)](_0x325075,_0x3999fd);},ColorManager['mpCostColor']=function(){const _0x177de4=_0x150bf7,_0xf2b757='_stored_mpCostColor';this[_0x177de4(0x7e8)]=this['_colorCache']||{};if(this[_0x177de4(0x7e8)][_0xf2b757])return this[_0x177de4(0x7e8)][_0xf2b757];const _0x273ba0=VisuMZ['CoreEngine'][_0x177de4(0x486)][_0x177de4(0x49f)][_0x177de4(0x828)];return this[_0x177de4(0x3cc)](_0xf2b757,_0x273ba0);},ColorManager[_0x150bf7(0x2a6)]=function(){const _0x112e8d=_0x150bf7,_0x35efff=_0x112e8d(0x90a);this[_0x112e8d(0x7e8)]=this[_0x112e8d(0x7e8)]||{};if(this['_colorCache'][_0x35efff])return this[_0x112e8d(0x7e8)][_0x35efff];const _0x2d2cfe=VisuMZ[_0x112e8d(0x7d0)][_0x112e8d(0x486)][_0x112e8d(0x49f)][_0x112e8d(0x7f8)];return this['getColorDataFromPluginParameters'](_0x35efff,_0x2d2cfe);},ColorManager[_0x150bf7(0x317)]=function(){const _0x196246=_0x150bf7,_0x4c7863='_stored_powerDownColor';this[_0x196246(0x7e8)]=this[_0x196246(0x7e8)]||{};if(this[_0x196246(0x7e8)][_0x4c7863])return this[_0x196246(0x7e8)][_0x4c7863];const _0x1d6ae9=VisuMZ[_0x196246(0x7d0)][_0x196246(0x486)][_0x196246(0x49f)][_0x196246(0x796)];return this[_0x196246(0x3cc)](_0x4c7863,_0x1d6ae9);},ColorManager[_0x150bf7(0x764)]=function(){const _0x2eceb8=_0x150bf7,_0x3a044c=_0x2eceb8(0x603);this['_colorCache']=this['_colorCache']||{};if(this[_0x2eceb8(0x7e8)][_0x3a044c])return this[_0x2eceb8(0x7e8)][_0x3a044c];const _0x465252=VisuMZ['CoreEngine'][_0x2eceb8(0x486)]['Color'][_0x2eceb8(0x2d9)];return this['getColorDataFromPluginParameters'](_0x3a044c,_0x465252);},ColorManager['ctGaugeColor2']=function(){const _0x11d495=_0x150bf7,_0x55dac2=_0x11d495(0x2da);this[_0x11d495(0x7e8)]=this[_0x11d495(0x7e8)]||{};if(this[_0x11d495(0x7e8)][_0x55dac2])return this[_0x11d495(0x7e8)][_0x55dac2];const _0x5b4c48=VisuMZ['CoreEngine'][_0x11d495(0x486)]['Color'][_0x11d495(0x589)];return this[_0x11d495(0x3cc)](_0x55dac2,_0x5b4c48);},ColorManager[_0x150bf7(0x550)]=function(){const _0x3f71dd=_0x150bf7,_0x3126e5=_0x3f71dd(0x639);this[_0x3f71dd(0x7e8)]=this[_0x3f71dd(0x7e8)]||{};if(this[_0x3f71dd(0x7e8)][_0x3126e5])return this[_0x3f71dd(0x7e8)][_0x3126e5];const _0x523f2b=VisuMZ['CoreEngine']['Settings'][_0x3f71dd(0x49f)][_0x3f71dd(0x757)];return this['getColorDataFromPluginParameters'](_0x3126e5,_0x523f2b);},ColorManager['tpGaugeColor2']=function(){const _0x3ffb37=_0x150bf7,_0x171423='_stored_tpGaugeColor2';this[_0x3ffb37(0x7e8)]=this[_0x3ffb37(0x7e8)]||{};if(this[_0x3ffb37(0x7e8)][_0x171423])return this[_0x3ffb37(0x7e8)][_0x171423];const _0x4553f7=VisuMZ[_0x3ffb37(0x7d0)][_0x3ffb37(0x486)][_0x3ffb37(0x49f)][_0x3ffb37(0x2c0)];return this[_0x3ffb37(0x3cc)](_0x171423,_0x4553f7);},ColorManager[_0x150bf7(0x7c1)]=function(){const _0x251e03=_0x150bf7,_0x565f95='_stored_tpCostColor';this['_colorCache']=this[_0x251e03(0x7e8)]||{};if(this[_0x251e03(0x7e8)][_0x565f95])return this['_colorCache'][_0x565f95];const _0x1d21b4=VisuMZ['CoreEngine'][_0x251e03(0x486)]['Color'][_0x251e03(0x676)];return this[_0x251e03(0x3cc)](_0x565f95,_0x1d21b4);},ColorManager[_0x150bf7(0x6e2)]=function(){const _0x36bd6a=_0x150bf7,_0x51132b='_stored_pendingColor';this[_0x36bd6a(0x7e8)]=this['_colorCache']||{};if(this[_0x36bd6a(0x7e8)][_0x51132b])return this[_0x36bd6a(0x7e8)][_0x51132b];const _0xe4c70e=VisuMZ['CoreEngine'][_0x36bd6a(0x486)][_0x36bd6a(0x49f)][_0x36bd6a(0x676)];return this[_0x36bd6a(0x3cc)](_0x51132b,_0xe4c70e);},ColorManager[_0x150bf7(0x64b)]=function(){const _0x2cf2eb=_0x150bf7,_0x1a67f0='_stored_expGaugeColor1';this[_0x2cf2eb(0x7e8)]=this['_colorCache']||{};if(this[_0x2cf2eb(0x7e8)][_0x1a67f0])return this[_0x2cf2eb(0x7e8)][_0x1a67f0];const _0x1ca8a5=VisuMZ['CoreEngine'][_0x2cf2eb(0x486)][_0x2cf2eb(0x49f)][_0x2cf2eb(0x34e)];return this['getColorDataFromPluginParameters'](_0x1a67f0,_0x1ca8a5);},ColorManager[_0x150bf7(0x3e7)]=function(){const _0x1239f0=_0x150bf7,_0x4c0b7a=_0x1239f0(0x61d);this[_0x1239f0(0x7e8)]=this[_0x1239f0(0x7e8)]||{};if(this[_0x1239f0(0x7e8)][_0x4c0b7a])return this['_colorCache'][_0x4c0b7a];const _0x4dd16f=VisuMZ[_0x1239f0(0x7d0)][_0x1239f0(0x486)][_0x1239f0(0x49f)][_0x1239f0(0x474)];return this[_0x1239f0(0x3cc)](_0x4c0b7a,_0x4dd16f);},ColorManager['maxLvGaugeColor1']=function(){const _0x1e5363=_0x150bf7,_0x1b3663='_stored_maxLvGaugeColor1';this['_colorCache']=this['_colorCache']||{};if(this[_0x1e5363(0x7e8)][_0x1b3663])return this[_0x1e5363(0x7e8)][_0x1b3663];const _0x4a0305=VisuMZ[_0x1e5363(0x7d0)]['Settings'][_0x1e5363(0x49f)]['ColorMaxLvGauge1'];return this[_0x1e5363(0x3cc)](_0x1b3663,_0x4a0305);},ColorManager[_0x150bf7(0x22b)]=function(){const _0x2ef361=_0x150bf7,_0x1c5c7f='_stored_maxLvGaugeColor2';this[_0x2ef361(0x7e8)]=this[_0x2ef361(0x7e8)]||{};if(this[_0x2ef361(0x7e8)][_0x1c5c7f])return this[_0x2ef361(0x7e8)][_0x1c5c7f];const _0x4d8b53=VisuMZ['CoreEngine'][_0x2ef361(0x486)]['Color'][_0x2ef361(0x67c)];return this[_0x2ef361(0x3cc)](_0x1c5c7f,_0x4d8b53);},ColorManager[_0x150bf7(0x2ed)]=function(_0x1a1f68){const _0x5ca0f6=_0x150bf7;return VisuMZ[_0x5ca0f6(0x7d0)][_0x5ca0f6(0x486)][_0x5ca0f6(0x49f)][_0x5ca0f6(0x29a)][_0x5ca0f6(0x697)](this,_0x1a1f68);},ColorManager[_0x150bf7(0x20a)]=function(_0x4a12b9){const _0x5c34f2=_0x150bf7;return VisuMZ[_0x5c34f2(0x7d0)]['Settings']['Color'][_0x5c34f2(0x2e5)][_0x5c34f2(0x697)](this,_0x4a12b9);},ColorManager[_0x150bf7(0x209)]=function(_0x1e4a8a){const _0x1ab0a7=_0x150bf7;return VisuMZ[_0x1ab0a7(0x7d0)]['Settings'][_0x1ab0a7(0x49f)][_0x1ab0a7(0x1a7)][_0x1ab0a7(0x697)](this,_0x1e4a8a);},ColorManager['paramchangeTextColor']=function(_0x9ccbef){const _0x1c108e=_0x150bf7;return VisuMZ[_0x1c108e(0x7d0)][_0x1c108e(0x486)]['Color']['ParamChange']['call'](this,_0x9ccbef);},ColorManager[_0x150bf7(0x1db)]=function(_0x37bca6){const _0x2cb90b=_0x150bf7;return VisuMZ[_0x2cb90b(0x7d0)]['Settings']['Color'][_0x2cb90b(0x815)]['call'](this,_0x37bca6);},ColorManager[_0x150bf7(0x7c4)]=function(){const _0x5ba01d=_0x150bf7;return VisuMZ[_0x5ba01d(0x7d0)]['Settings'][_0x5ba01d(0x49f)][_0x5ba01d(0x8e5)];},ColorManager[_0x150bf7(0x5c7)]=function(){const _0x2e0364=_0x150bf7;return VisuMZ[_0x2e0364(0x7d0)][_0x2e0364(0x486)][_0x2e0364(0x49f)][_0x2e0364(0x857)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager['outlineColorGauge']=function(){const _0x444077=_0x150bf7;return VisuMZ[_0x444077(0x7d0)][_0x444077(0x486)][_0x444077(0x49f)][_0x444077(0x72f)]||_0x444077(0x8ca);},ColorManager[_0x150bf7(0x8bf)]=function(){const _0x38c498=_0x150bf7;return VisuMZ[_0x38c498(0x7d0)]['Settings'][_0x38c498(0x49f)][_0x38c498(0x4b5)];},ColorManager[_0x150bf7(0x2ce)]=function(){const _0x26ef8f=_0x150bf7;return VisuMZ[_0x26ef8f(0x7d0)][_0x26ef8f(0x486)][_0x26ef8f(0x49f)][_0x26ef8f(0x760)];},ColorManager['itemBackColor1']=function(){const _0x282a90=_0x150bf7;return VisuMZ[_0x282a90(0x7d0)][_0x282a90(0x486)][_0x282a90(0x49f)]['ItemBackColor1'];},ColorManager[_0x150bf7(0x606)]=function(){const _0x2b94b8=_0x150bf7;return VisuMZ[_0x2b94b8(0x7d0)]['Settings']['Color'][_0x2b94b8(0x310)];},SceneManager[_0x150bf7(0x842)]=[],SceneManager[_0x150bf7(0x11e)]=function(){const _0x393d0b=_0x150bf7;return this['_scene']&&this[_0x393d0b(0x71e)][_0x393d0b(0x771)]===Scene_Battle;},SceneManager[_0x150bf7(0x746)]=function(){const _0x866f74=_0x150bf7;return this[_0x866f74(0x71e)]&&this[_0x866f74(0x71e)][_0x866f74(0x771)]===Scene_Map;},SceneManager[_0x150bf7(0x3f4)]=function(){const _0x3de714=_0x150bf7;return this[_0x3de714(0x71e)]&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x150bf7(0x7d0)]['SceneManager_initialize']=SceneManager[_0x150bf7(0x8aa)],SceneManager[_0x150bf7(0x8aa)]=function(){const _0xc8f975=_0x150bf7;VisuMZ[_0xc8f975(0x7d0)][_0xc8f975(0x213)][_0xc8f975(0x697)](this),this[_0xc8f975(0x119)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x25c)]=SceneManager[_0x150bf7(0x30d)],SceneManager[_0x150bf7(0x30d)]=function(_0x441798){const _0x5daf43=_0x150bf7;if($gameTemp)this[_0x5daf43(0x325)](_0x441798);VisuMZ['CoreEngine'][_0x5daf43(0x25c)]['call'](this,_0x441798);},SceneManager[_0x150bf7(0x325)]=function(_0x381c2c){const _0x1555d1=_0x150bf7;if(!_0x381c2c[_0x1555d1(0x600)]&&!_0x381c2c[_0x1555d1(0x32e)])switch(_0x381c2c[_0x1555d1(0x5c3)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x1555d1(0x4f3)]();break;case 0x76:if(Input[_0x1555d1(0x15b)](_0x1555d1(0x4f2))||Input[_0x1555d1(0x15b)](_0x1555d1(0x375)))return;this[_0x1555d1(0x81d)]();break;}},SceneManager[_0x150bf7(0x4f3)]=function(){const _0x964300=_0x150bf7;if($gameTemp['isPlaytest']()&&VisuMZ[_0x964300(0x7d0)][_0x964300(0x486)][_0x964300(0x51b)][_0x964300(0x3ac)]){ConfigManager[_0x964300(0x782)]!==0x0?(ConfigManager[_0x964300(0x1b5)]=0x0,ConfigManager[_0x964300(0x3bd)]=0x0,ConfigManager[_0x964300(0x2ba)]=0x0,ConfigManager[_0x964300(0x782)]=0x0):(ConfigManager[_0x964300(0x1b5)]=0x64,ConfigManager[_0x964300(0x3bd)]=0x64,ConfigManager[_0x964300(0x2ba)]=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0x964300(0x1cb)]();if(this[_0x964300(0x71e)]['constructor']===Scene_Options){if(_0x964300(0x5e1)!==_0x964300(0x5e1))this[_0x964300(0x158)]='';else{if(this[_0x964300(0x71e)][_0x964300(0x64e)])this[_0x964300(0x71e)]['_optionsWindow']['refresh']();if(this[_0x964300(0x71e)][_0x964300(0x69b)])this['_scene'][_0x964300(0x69b)]['refresh']();}}}},SceneManager[_0x150bf7(0x81d)]=function(){const _0x56981b=_0x150bf7;$gameTemp[_0x56981b(0x7df)]()&&VisuMZ[_0x56981b(0x7d0)]['Settings']['QoL'][_0x56981b(0x688)]&&($gameTemp['_playTestFastMode']=!$gameTemp['_playTestFastMode']);},SceneManager['playTestCtrlT']=function(){const _0x7aca0c=_0x150bf7;if(!$gameTemp[_0x7aca0c(0x7df)]())return;if(!SceneManager[_0x7aca0c(0x11e)]())return;for(const _0x1c8d7a of $gameParty[_0x7aca0c(0x691)]()){if(!_0x1c8d7a)continue;_0x1c8d7a['gainSilentTp'](_0x1c8d7a[_0x7aca0c(0x11c)]());}},SceneManager[_0x150bf7(0x119)]=function(){const _0xc96281=_0x150bf7;this[_0xc96281(0x699)]=![],this[_0xc96281(0x643)]=!VisuMZ[_0xc96281(0x7d0)][_0xc96281(0x486)]['UI'][_0xc96281(0x863)];},SceneManager[_0x150bf7(0x7a2)]=function(_0xbc9e49){const _0x5da316=_0x150bf7;if(VisuMZ[_0x5da316(0x7d0)][_0x5da316(0x486)]['UI'][_0x5da316(0x1fe)]){if(_0x5da316(0x5c2)===_0x5da316(0x5c2))this[_0x5da316(0x699)]=_0xbc9e49;else{const _0x2e3b31=_0x49c851[_0x5da316(0x4d9)]['replace'](/[ ]/g,''),_0x14510e=_0x4ccd73[_0x5da316(0x57c)];_0x5be882[_0x5da316(0x7d0)][_0x5da316(0x7ef)](_0x2e3b31,_0x14510e);}}},SceneManager[_0x150bf7(0x50b)]=function(){const _0x4ae548=_0x150bf7;return this[_0x4ae548(0x699)];},SceneManager[_0x150bf7(0x168)]=function(){const _0x24fef5=_0x150bf7;return this[_0x24fef5(0x643)];},SceneManager[_0x150bf7(0x361)]=function(){const _0x4e6577=_0x150bf7;return this[_0x4e6577(0x168)]()||this[_0x4e6577(0x50b)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x59c)]=SceneManager[_0x150bf7(0x4a3)],SceneManager[_0x150bf7(0x4a3)]=function(){const _0x20a8e5=_0x150bf7;return VisuMZ[_0x20a8e5(0x7d0)]['Settings'][_0x20a8e5(0x51b)]['RequireFocus']?VisuMZ['CoreEngine']['SceneManager_isGameActive'][_0x20a8e5(0x697)](this):!![];},SceneManager[_0x150bf7(0x716)]=function(_0x32b86b){const _0x2c0e8b=_0x150bf7;if(_0x32b86b instanceof Error)this[_0x2c0e8b(0x522)](_0x32b86b);else _0x32b86b instanceof Array&&_0x32b86b[0x0]===_0x2c0e8b(0x13e)?this[_0x2c0e8b(0x130)](_0x32b86b):this[_0x2c0e8b(0x25a)](_0x32b86b);this[_0x2c0e8b(0x680)]();},VisuMZ['CoreEngine'][_0x150bf7(0x458)]=BattleManager[_0x150bf7(0x370)],BattleManager['processEscape']=function(){const _0x27b53b=_0x150bf7;if(VisuMZ[_0x27b53b(0x7d0)][_0x27b53b(0x486)][_0x27b53b(0x51b)][_0x27b53b(0x880)])this[_0x27b53b(0x2c2)]();else{if(_0x27b53b(0x848)!==_0x27b53b(0x45e))return VisuMZ[_0x27b53b(0x7d0)][_0x27b53b(0x458)][_0x27b53b(0x697)](this);else _0xc601d3(_0x57573e);}},BattleManager[_0x150bf7(0x2c2)]=function(){const _0x2a83b6=_0x150bf7;return $gameParty[_0x2a83b6(0x521)](),SoundManager['playEscape'](),this['onEscapeSuccess'](),!![];},BattleManager[_0x150bf7(0x222)]=function(){const _0x3056b6=_0x150bf7;return $gameSystem[_0x3056b6(0x762)]()>=0x1;},BattleManager[_0x150bf7(0x500)]=function(){const _0x5c4232=_0x150bf7;return $gameSystem[_0x5c4232(0x762)]()===0x1;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x52b)]=Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)],Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(){const _0x2465ca=_0x150bf7;VisuMZ[_0x2465ca(0x7d0)][_0x2465ca(0x52b)]['call'](this),this[_0x2465ca(0x3fd)](),this[_0x2465ca(0x5d0)](),this[_0x2465ca(0x4bb)]();},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x3fd)]=function(){const _0x4c0e4a=_0x150bf7;VisuMZ[_0x4c0e4a(0x7d0)][_0x4c0e4a(0x486)][_0x4c0e4a(0x51b)][_0x4c0e4a(0x5a6)]&&(this['_isPlaytest']=![]);},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x38b)]=function(_0x386b66){const _0x16e045=_0x150bf7;this[_0x16e045(0x16a)]=_0x386b66;},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x7e5)]=function(){const _0xd0ae65=_0x150bf7;return this[_0xd0ae65(0x16a)];},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x6da)]=function(){const _0x347f23=_0x150bf7;this[_0x347f23(0x2c1)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x7bb)]=function(_0x533c73){const _0x5253e4=_0x150bf7;if($gameMap&&$dataMap&&$dataMap[_0x5253e4(0x18e)]){if(_0x5253e4(0x188)!==_0x5253e4(0x188)){const _0x29fbef=this[_0x5253e4(0x6bd)]();this[_0x5253e4(0x59d)](),this['drawText'](this[_0x5253e4(0x838)]['paramValueByName'](_0x118f5b,!![]),_0x297a77,_0x11ec6a,_0x29fbef,_0x5253e4(0x400));}else this['parseForcedGameTroopSettingsCoreEngine']($dataMap[_0x5253e4(0x18e)]);}const _0x3ab576=$dataTroops[_0x533c73];if(_0x3ab576){let _0x507472=DataManager[_0x5253e4(0x78e)](_0x3ab576['id']);this[_0x5253e4(0x435)](_0x507472);}},Game_Temp['prototype'][_0x150bf7(0x435)]=function(_0x370635){const _0x50da30=_0x150bf7;if(!_0x370635)return;if(_0x370635[_0x50da30(0x60c)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))'XCtGc'===_0x50da30(0x4d1)?(_0x42ab05[_0x50da30(0x1b5)]=0x64,_0x2af007[_0x50da30(0x3bd)]=0x64,_0x2aa165[_0x50da30(0x2ba)]=0x64,_0x3c8fbf[_0x50da30(0x782)]=0x64):this[_0x50da30(0x2c1)]='FV';else{if(_0x370635['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x50da30(0x2c1)]='SV';else{if(_0x370635[_0x50da30(0x60c)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2c937c=String(RegExp['$1']);if(_0x2c937c[_0x50da30(0x60c)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x2c937c[_0x50da30(0x60c)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}}if(_0x370635[_0x50da30(0x60c)](/<(?:DTB)>/i))this[_0x50da30(0x85c)]=0x0;else{if(_0x370635['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x50da30(0x85c)]=0x1;else{if(_0x370635[_0x50da30(0x60c)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x50da30(0x85c)]=0x2;else{if(_0x370635[_0x50da30(0x60c)](/<(?:CTB)>/i))_0x50da30(0x1f2)!==_0x50da30(0x1f2)?this['initialize'](...arguments):Imported[_0x50da30(0x324)]&&(this[_0x50da30(0x85c)]=_0x50da30(0x1b6));else{if(_0x370635['match'](/<(?:STB)>/i))Imported[_0x50da30(0x206)]&&(this['_forcedBattleSys']=_0x50da30(0x1dd));else{if(_0x370635[_0x50da30(0x60c)](/<(?:BTB)>/i))Imported[_0x50da30(0x7c8)]&&(this['_forcedBattleSys']='BTB');else{if(_0x370635[_0x50da30(0x60c)](/<(?:FTB)>/i)){if(_0x50da30(0x8d3)!==_0x50da30(0x8d3)){const _0x54d88f='_stored_normalColor';this['_colorCache']=this[_0x50da30(0x7e8)]||{};if(this[_0x50da30(0x7e8)][_0x54d88f])return this[_0x50da30(0x7e8)][_0x54d88f];const _0x3b26bc=_0x513249[_0x50da30(0x7d0)][_0x50da30(0x486)]['Color'][_0x50da30(0x31a)];return this[_0x50da30(0x3cc)](_0x54d88f,_0x3b26bc);}else Imported[_0x50da30(0x90f)]&&(this['_forcedBattleSys']=_0x50da30(0x7a8));}else{if(_0x370635['match'](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&('Tbzqq'===_0x50da30(0x740)?this['_statusWindow']['setBackgroundType'](_0x535366['layoutSettings']['StatusBgType']):this[_0x50da30(0x85c)]=_0x50da30(0x623));else{if(_0x370635[_0x50da30(0x60c)](/<(?:ETB)>/i))_0x50da30(0x13b)==='ILglD'?_0x58a8d3[_0x50da30(0x7df)]()&&_0x3f0700[_0x50da30(0x7d0)][_0x50da30(0x486)][_0x50da30(0x51b)][_0x50da30(0x688)]&&(_0x4a6e56[_0x50da30(0x5ea)]=!_0x4436d5[_0x50da30(0x5ea)]):Imported[_0x50da30(0x6a2)]&&(this['_forcedBattleSys']=_0x50da30(0x364));else{if(_0x370635[_0x50da30(0x60c)](/<(?:PTB)>/i))_0x50da30(0x565)===_0x50da30(0x401)?this['_helpWindow'][_0x50da30(0x34c)](_0x5403aa['layoutSettings']['HelpBgType']):Imported[_0x50da30(0x430)]&&(this['_forcedBattleSys']=_0x50da30(0x277));else{if(_0x370635[_0x50da30(0x60c)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x15f15a=String(RegExp['$1']);if(_0x15f15a[_0x50da30(0x60c)](/DTB/i)){if(_0x50da30(0x181)==='garkC'){if(_0x1fcf11[_0x50da30(0x7df)]()){const _0x1321b2=_0x2f3d3d['CoreEngine']['Settings'][_0x50da30(0x51b)][_0x50da30(0x669)];if(_0x1321b2>0x0)_0x5e106d[_0x50da30(0x241)](_0x1321b2);}}else this['_forcedBattleSys']=0x0;}else{if(_0x15f15a['match'](/(?:TPB|ATB)[ ]ACTIVE/i)){if(_0x50da30(0x446)!==_0x50da30(0x836))this[_0x50da30(0x85c)]=0x1;else return![];}else{if(_0x15f15a[_0x50da30(0x60c)](/(?:TPB|ATB)[ ]WAIT/i))_0x50da30(0x675)!==_0x50da30(0x53b)?this[_0x50da30(0x85c)]=0x2:this['_onceParallelInterpreters']=[];else{if(_0x15f15a[_0x50da30(0x60c)](/CTB/i))Imported[_0x50da30(0x324)]&&(this[_0x50da30(0x85c)]=_0x50da30(0x1b6));else{if(_0x15f15a[_0x50da30(0x60c)](/STB/i)){if(Imported[_0x50da30(0x206)]){if('buyYj'!=='XBJRe')this[_0x50da30(0x85c)]='STB';else return _0x3d1cc7[_0x50da30(0x50b)]()||_0x3e69ae[_0x50da30(0x168)]()?_0x410358['CoreEngine'][_0x50da30(0x486)][_0x50da30(0x5eb)][_0x50da30(0x140)]:_0x50da30(0x2e0);}}else{if(_0x15f15a[_0x50da30(0x60c)](/BTB/i)){if(_0x50da30(0x6f8)!==_0x50da30(0x40f)){if(Imported[_0x50da30(0x7c8)]){if('YLtUm'!=='LWAhI')this[_0x50da30(0x85c)]='BTB';else return this[_0x50da30(0x86c)];}}else return _0x28383b['layoutSettings'][_0x50da30(0x82f)][_0x50da30(0x697)](this);}else{if(_0x15f15a['match'](/FTB/i)){if(_0x50da30(0x1a8)!=='yHhBP'){_0x4112d0[_0x50da30(0x75b)](_0x8fcca2,_0x5604f6);const _0x367bff=_0x2296a8['value']||0x0;_0x2e555a['gainGold'](_0x367bff);}else Imported[_0x50da30(0x90f)]&&(this[_0x50da30(0x85c)]=_0x50da30(0x7a8));}else{if(_0x15f15a['match'](/OTB/i))Imported[_0x50da30(0x3a7)]&&(_0x50da30(0x2c4)!==_0x50da30(0x561)?this['_forcedBattleSys']=_0x50da30(0x623):this['_moveEasingType']=_0x261e84);else{if(_0x15f15a['match'](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']=_0x50da30(0x364));else{if(_0x15f15a['match'](/PTB/i)){if(_0x50da30(0x856)!==_0x50da30(0x856)){if(_0x1cb245[_0x50da30(0x8c0)]()&&this[_0x50da30(0x3ec)]())this[_0x50da30(0x1d8)](_0x50da30(0x368));else _0x373131[_0x50da30(0x1b8)]()&&this['switchModes'](_0x50da30(0x368));}else Imported['VisuMZ_2_BattleSystemPTB']&&(this['_forcedBattleSys']=_0x50da30(0x277));}}}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype'][_0x150bf7(0x5d0)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x4a6)]=function(_0x11a2b1,_0x1bd58b,_0x4e8261,_0x28032c){const _0x476a76=_0x150bf7;if(!this[_0x476a76(0x89b)]())return;_0x4e8261=_0x4e8261||![],_0x28032c=_0x28032c||![];if($dataAnimations[_0x1bd58b]){const _0x297ba3={'targets':_0x11a2b1,'animationId':_0x1bd58b,'mirror':_0x4e8261,'mute':_0x28032c};this[_0x476a76(0x275)][_0x476a76(0x4c5)](_0x297ba3);for(const _0x3d16e6 of _0x11a2b1){_0x3d16e6[_0x476a76(0x270)]&&_0x3d16e6[_0x476a76(0x270)]();}}},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x89b)]=function(){return!![];},Game_Temp['prototype'][_0x150bf7(0x495)]=function(){const _0x4633a7=_0x150bf7;return this[_0x4633a7(0x275)]['shift']();},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x4bb)]=function(){this['_pointAnimationQueue']=[];},Game_Temp[_0x150bf7(0x8e0)][_0x150bf7(0x681)]=function(_0x2e7de1,_0x517bec,_0xe08401,_0x450564,_0x53c2a4){const _0x4807a7=_0x150bf7;if(!this[_0x4807a7(0x875)]())return;_0x450564=_0x450564||![],_0x53c2a4=_0x53c2a4||![];if($dataAnimations[_0xe08401]){const _0x28f98b={'x':_0x2e7de1,'y':_0x517bec,'animationId':_0xe08401,'mirror':_0x450564,'mute':_0x53c2a4};this['_pointAnimationQueue'][_0x4807a7(0x4c5)](_0x28f98b);}},Game_Temp['prototype']['showPointAnimations']=function(){return!![];},Game_Temp[_0x150bf7(0x8e0)]['retrievePointAnimation']=function(){const _0x28941a=_0x150bf7;return this[_0x28941a(0x8d8)][_0x28941a(0x4f2)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x85f)]=Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)],Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(){const _0x41bc7a=_0x150bf7;VisuMZ[_0x41bc7a(0x7d0)][_0x41bc7a(0x85f)][_0x41bc7a(0x697)](this),this[_0x41bc7a(0x42b)]();},Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x42b)]=function(){const _0x3e85b0=_0x150bf7;this[_0x3e85b0(0x508)]={'SideView':$dataSystem[_0x3e85b0(0x5ad)],'BattleSystem':this[_0x3e85b0(0x593)](),'FontSize':$dataSystem['advanced'][_0x3e85b0(0x7a6)],'Padding':0xc};},Game_System['prototype'][_0x150bf7(0x82c)]=function(){const _0x3d93a1=_0x150bf7;if($gameTemp[_0x3d93a1(0x2c1)]==='SV'){if(_0x3d93a1(0x15e)!=='ILMgK')_0x446134['style'][_0x3d93a1(0x3f8)]=_0x3d93a1(0x894);else return!![];}else{if($gameTemp[_0x3d93a1(0x2c1)]==='FV')return![];}if(this[_0x3d93a1(0x508)]===undefined)this[_0x3d93a1(0x42b)]();if(this[_0x3d93a1(0x508)][_0x3d93a1(0x251)]===undefined)this[_0x3d93a1(0x42b)]();return this[_0x3d93a1(0x508)]['SideView'];},Game_System[_0x150bf7(0x8e0)]['setSideView']=function(_0x7402ba){const _0x1ea35d=_0x150bf7;if(this[_0x1ea35d(0x508)]===undefined)this['initCoreEngine']();if(this[_0x1ea35d(0x508)][_0x1ea35d(0x251)]===undefined)this[_0x1ea35d(0x42b)]();this[_0x1ea35d(0x508)][_0x1ea35d(0x251)]=_0x7402ba;},Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x1dc)]=function(){const _0x74c120=_0x150bf7;if(this[_0x74c120(0x508)]===undefined)this[_0x74c120(0x42b)]();this['_CoreEngineSettings'][_0x74c120(0x6f2)]=this['initialBattleSystem']();},Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x593)]=function(){const _0x2cfafb=_0x150bf7,_0x3c4e8=(VisuMZ['CoreEngine']['Settings']['BattleSystem']||'DATABASE')[_0x2cfafb(0x288)]()[_0x2cfafb(0x37c)]();return VisuMZ[_0x2cfafb(0x7d0)][_0x2cfafb(0x4f5)](_0x3c4e8);},Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x762)]=function(){const _0x4e39ad=_0x150bf7;if($gameTemp[_0x4e39ad(0x85c)]!==undefined)return $gameTemp[_0x4e39ad(0x85c)];if(this[_0x4e39ad(0x508)]===undefined)this[_0x4e39ad(0x42b)]();if(this[_0x4e39ad(0x508)]['BattleSystem']===undefined)this[_0x4e39ad(0x1dc)]();return this[_0x4e39ad(0x508)][_0x4e39ad(0x6f2)];},Game_System[_0x150bf7(0x8e0)]['setBattleSystem']=function(_0x3ae5c1){const _0x5180e1=_0x150bf7;if(this[_0x5180e1(0x508)]===undefined)this[_0x5180e1(0x42b)]();if(this[_0x5180e1(0x508)][_0x5180e1(0x6f2)]===undefined)this[_0x5180e1(0x1dc)]();this[_0x5180e1(0x508)][_0x5180e1(0x6f2)]=_0x3ae5c1;},Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x1ab)]=function(){const _0x254b6c=_0x150bf7;if(this[_0x254b6c(0x508)]===undefined)this['initCoreEngine']();if(this[_0x254b6c(0x508)]['FontSize']===undefined)this[_0x254b6c(0x42b)]();return this[_0x254b6c(0x508)][_0x254b6c(0x77b)];},Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x35d)]=function(_0x1a9e4d){const _0x16efd0=_0x150bf7;if(this[_0x16efd0(0x508)]===undefined)this[_0x16efd0(0x42b)]();if(this[_0x16efd0(0x508)][_0x16efd0(0x33c)]===undefined)this[_0x16efd0(0x42b)]();this['_CoreEngineSettings'][_0x16efd0(0x77b)]=_0x1a9e4d;},Game_System[_0x150bf7(0x8e0)][_0x150bf7(0x1f8)]=function(){const _0x11a86c=_0x150bf7;if(this[_0x11a86c(0x508)]===undefined)this['initCoreEngine']();if(this[_0x11a86c(0x508)]['Padding']===undefined)this[_0x11a86c(0x42b)]();return this['_CoreEngineSettings'][_0x11a86c(0x163)];},Game_System[_0x150bf7(0x8e0)]['setWindowPadding']=function(_0x24ee6e){const _0x359b57=_0x150bf7;if(this[_0x359b57(0x508)]===undefined)this[_0x359b57(0x42b)]();if(this[_0x359b57(0x508)]['TimeProgress']===undefined)this[_0x359b57(0x42b)]();this[_0x359b57(0x508)][_0x359b57(0x163)]=_0x24ee6e;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x6a5)]=Game_Screen[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)],Game_Screen[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(){const _0x1291bb=_0x150bf7;VisuMZ[_0x1291bb(0x7d0)][_0x1291bb(0x6a5)][_0x1291bb(0x697)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x150bf7(0x8e0)][_0x150bf7(0x2df)]=function(){const _0x363a68=_0x150bf7,_0x522712=VisuMZ['CoreEngine'][_0x363a68(0x486)]['ScreenShake'];this['_coreEngineShakeStyle']=_0x522712?.[_0x363a68(0x65a)]||_0x363a68(0x272);},Game_Screen[_0x150bf7(0x8e0)][_0x150bf7(0x3ae)]=function(){const _0x4d53ec=_0x150bf7;if(this[_0x4d53ec(0x729)]===undefined)this[_0x4d53ec(0x2df)]();return this[_0x4d53ec(0x729)];},Game_Screen['prototype'][_0x150bf7(0x3f0)]=function(_0xcbe44c){const _0x2a9dfe=_0x150bf7;if(this[_0x2a9dfe(0x729)]===undefined)this[_0x2a9dfe(0x2df)]();this[_0x2a9dfe(0x729)]=_0xcbe44c['toLowerCase']()[_0x2a9dfe(0x37c)]();},Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x3d8)]=function(){const _0x240291=_0x150bf7;if($gameParty[_0x240291(0x5f9)]())return![];return this[_0x240291(0x42a)]()&&this['name']()[_0x240291(0x90e)](0x0)==='!';},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x5bf)]=Game_Picture[_0x150bf7(0x8e0)]['x'],Game_Picture['prototype']['x']=function(){const _0x2e8fcd=_0x150bf7;if(this[_0x2e8fcd(0x3d8)]()){if('irnlO'===_0x2e8fcd(0x5bb))this[_0x2e8fcd(0x28f)]['setBackgroundType'](_0x24ce02['layoutSettings']['ItemBgType']);else return this[_0x2e8fcd(0x12f)]();}else return VisuMZ[_0x2e8fcd(0x7d0)]['Game_Picture_x'][_0x2e8fcd(0x697)](this);},Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x12f)]=function(){const _0x20375a=_0x150bf7,_0x112646=$gameMap[_0x20375a(0x5b2)]()*$gameMap[_0x20375a(0x330)]();return this['_x']-_0x112646;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x2ef)]=Game_Picture[_0x150bf7(0x8e0)]['y'],Game_Picture[_0x150bf7(0x8e0)]['y']=function(){const _0x349db4=_0x150bf7;return this[_0x349db4(0x3d8)]()?this[_0x349db4(0x434)]():VisuMZ[_0x349db4(0x7d0)]['Game_Picture_y']['call'](this);},Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x434)]=function(){const _0x223510=$gameMap['displayY']()*$gameMap['tileHeight']();return this['_y']-_0x223510;},Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x5f0)]=function(_0x202922){const _0x4c5e3e=_0x150bf7;this[_0x4c5e3e(0x58b)]=_0x202922;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x654)]=Game_Picture['prototype'][_0x150bf7(0x2b6)],Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x2b6)]=function(_0xd8fba6){const _0x4448b5=_0x150bf7;return this[_0x4448b5(0x58b)]=this[_0x4448b5(0x58b)]||0x0,[0x0,0x1,0x2,0x3][_0x4448b5(0x886)](this[_0x4448b5(0x58b)])?VisuMZ[_0x4448b5(0x7d0)]['Game_Picture_calcEasing']['call'](this,_0xd8fba6):VisuMZ[_0x4448b5(0x39f)](_0xd8fba6,this[_0x4448b5(0x58b)]);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x80f)]=Game_Action[_0x150bf7(0x8e0)]['itemHit'],Game_Action['prototype'][_0x150bf7(0x903)]=function(_0x5e8c5e){const _0x5a958a=_0x150bf7;if(VisuMZ[_0x5a958a(0x7d0)]['Settings'][_0x5a958a(0x51b)][_0x5a958a(0x7dc)]){if(_0x5a958a(0x139)!=='vVOji')return this[_0x5a958a(0x83f)](_0x5e8c5e);else _0x33dff0[_0x5a958a(0x7d0)][_0x5a958a(0x54a)][_0x5a958a(0x697)](this,_0x10a47d,_0x336759,_0x4eacb1,_0xa39a60,_0x4732bb),this[_0x5a958a(0x8eb)]();}else{if(_0x5a958a(0x8b3)===_0x5a958a(0x8ac)){const _0x3dd358=_0x30b1fb[_0x5a958a(0x697)](this);return _0x30c42a===_0x5a958a(0x71f)?_0x70f6ca[_0x5a958a(0x469)](_0x3dd358):_0x3dd358;}else return VisuMZ[_0x5a958a(0x7d0)]['Game_Action_itemHit'][_0x5a958a(0x697)](this,_0x5e8c5e);}},Game_Action['prototype'][_0x150bf7(0x83f)]=function(_0x518fe5){const _0x344e63=_0x150bf7,_0x55f28d=this['itemSuccessRate'](_0x518fe5),_0x44bc45=this[_0x344e63(0x315)](_0x518fe5),_0x133728=this[_0x344e63(0x6d9)](_0x518fe5);return _0x55f28d*(_0x44bc45-_0x133728);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x39e)]=Game_Action['prototype'][_0x150bf7(0x18b)],Game_Action[_0x150bf7(0x8e0)][_0x150bf7(0x18b)]=function(_0x3d5bf8){const _0x5eaa3f=_0x150bf7;if(VisuMZ['CoreEngine']['Settings'][_0x5eaa3f(0x51b)][_0x5eaa3f(0x7dc)])return 0x0;else{if(_0x5eaa3f(0x8bc)!==_0x5eaa3f(0x803))return VisuMZ[_0x5eaa3f(0x7d0)][_0x5eaa3f(0x39e)][_0x5eaa3f(0x697)](this,_0x3d5bf8);else this[_0x5eaa3f(0x280)]();}},Game_Action[_0x150bf7(0x8e0)][_0x150bf7(0x592)]=function(_0x2bac5b){const _0x3a3583=_0x150bf7;return this[_0x3a3583(0x165)]()[_0x3a3583(0x731)]*0.01;},Game_Action[_0x150bf7(0x8e0)]['subjectHitRate']=function(_0x566187){const _0x20daef=_0x150bf7;if(VisuMZ['CoreEngine'][_0x20daef(0x486)]['QoL'][_0x20daef(0x64f)]&&this[_0x20daef(0x779)]())return 0x1;if(this[_0x20daef(0x491)]())return VisuMZ[_0x20daef(0x7d0)][_0x20daef(0x486)][_0x20daef(0x51b)][_0x20daef(0x64f)]&&this[_0x20daef(0x587)]()[_0x20daef(0x5ac)]()?this[_0x20daef(0x587)]()[_0x20daef(0x1c0)]+0.05:this[_0x20daef(0x587)]()[_0x20daef(0x1c0)];else{if(_0x20daef(0x879)!==_0x20daef(0x46e))return 0x1;else _0x375467['CoreEngine']['WindowLayer_render'][_0x20daef(0x697)](this,_0x53582e);}},Game_Action[_0x150bf7(0x8e0)][_0x150bf7(0x6d9)]=function(_0x4e91b4){const _0x14950c=_0x150bf7;if(this['subject']()[_0x14950c(0x5ac)]()===_0x4e91b4[_0x14950c(0x5ac)]())return 0x0;if(this[_0x14950c(0x491)]()){if('dfdxH'==='JhAIA')_0x489857=null;else{if(VisuMZ['CoreEngine'][_0x14950c(0x486)][_0x14950c(0x51b)]['AccuracyBoost']&&_0x4e91b4[_0x14950c(0x5d1)]())return _0x4e91b4['eva']-0.05;else{if(_0x14950c(0x4b9)==='zfedP'){this[_0x14950c(0x8e2)][_0x14950c(0x7b8)](_0x4a4b69),this[_0x14950c(0x722)][_0x14950c(0x602)](_0x53e005);for(const _0x4aac43 of _0x3fe090[_0x14950c(0x840)]){_0x4aac43[_0x14950c(0x2a0)]&&_0x4aac43[_0x14950c(0x2a0)]();const _0x292544=this[_0x14950c(0x27f)]();if(_0x292544)_0x292544['removeChild'](_0x4aac43);}_0x24de36[_0x14950c(0x792)]();}else return _0x4e91b4['eva'];}}}else{if(this[_0x14950c(0x30e)]()){if(_0x14950c(0x31e)!=='cUyKu'){if(_0x3f9c58[_0x14950c(0x7d0)][_0x14950c(0x486)][_0x14950c(0x51b)][_0x14950c(0x289)]&&_0x3c0486[_0x14950c(0x3af)](_0x23dd39))return;_0x1b28c0['CoreEngine']['Game_Party_consumeItem'][_0x14950c(0x697)](this,_0x48e652);}else return _0x4e91b4[_0x14950c(0x61c)];}else return 0x0;}},VisuMZ['CoreEngine'][_0x150bf7(0x440)]=Game_Action['prototype']['updateLastTarget'],Game_Action['prototype'][_0x150bf7(0x5b7)]=function(_0x18bbd2){const _0xf09f8b=_0x150bf7;VisuMZ['CoreEngine'][_0xf09f8b(0x440)][_0xf09f8b(0x697)](this,_0x18bbd2);if(VisuMZ[_0xf09f8b(0x7d0)][_0xf09f8b(0x486)][_0xf09f8b(0x51b)][_0xf09f8b(0x7dc)])return;const _0x3f2160=_0x18bbd2[_0xf09f8b(0x307)]();if(_0x3f2160[_0xf09f8b(0x576)]){if(_0xf09f8b(0x645)===_0xf09f8b(0x683))return _0x1f7371[_0xf09f8b(0x749)][_0xf09f8b(0x50e)][_0xf09f8b(0x697)](this);else{if(0x1-this['itemEva'](_0x18bbd2)>this['itemHit'](_0x18bbd2)){if(_0xf09f8b(0x2cb)==='lYIIH')_0x3f2160[_0xf09f8b(0x576)]=![],_0x3f2160['evaded']=!![];else{if(this['useDigitGrouping']())_0x1f8d73=_0x11b131[_0xf09f8b(0x2fc)](_0x68c1f0);_0x51138d['CoreEngine'][_0xf09f8b(0x312)][_0xf09f8b(0x697)](this,_0x2c2634,_0x400cc6,_0x5d5868,_0x447c0b,_0x1b3689);}}}}},VisuMZ[_0x150bf7(0x7d0)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x150bf7(0x8e0)]['initMembers'],Game_BattlerBase['prototype'][_0x150bf7(0x3fb)]=function(){const _0x3f5a09=_0x150bf7;this['_cache']={},VisuMZ['CoreEngine'][_0x3f5a09(0x527)][_0x3f5a09(0x697)](this);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x2a5)]=Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x39d)],Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x39d)]=function(){const _0x4517e9=_0x150bf7;this[_0x4517e9(0x44f)]={},VisuMZ[_0x4517e9(0x7d0)][_0x4517e9(0x2a5)]['call'](this);},Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x283)]=function(_0x4407e3){const _0x41ee24=_0x150bf7;return this[_0x41ee24(0x44f)]=this['_cache']||{},this[_0x41ee24(0x44f)][_0x4407e3]!==undefined;},Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x3fc)]=function(_0x2c4199){const _0x74b1a0=_0x150bf7,_0x1bd86b=(_0x25e6d8,_0x606b0a)=>{const _0x75f891=_0x36f3;if(!_0x606b0a)return _0x25e6d8;if(_0x606b0a[_0x75f891(0x18e)]['match'](VisuMZ['CoreEngine'][_0x75f891(0x575)][_0x75f891(0x3fc)][_0x2c4199])){var _0xd1e06f=Number(RegExp['$1']);_0x25e6d8+=_0xd1e06f;}if(_0x606b0a['note'][_0x75f891(0x60c)](VisuMZ[_0x75f891(0x7d0)][_0x75f891(0x575)]['paramPlusJS'][_0x2c4199])){if(_0x75f891(0x66e)===_0x75f891(0x569)){_0x41f951[_0x75f891(0x7d0)][_0x75f891(0x486)][_0x75f891(0x51b)][_0x75f891(0x787)]&&(_0x1d3cdd[_0x75f891(0x1ee)][_0x75f891(0x3f8)]='none');_0x1cb954['CoreEngine'][_0x75f891(0x486)][_0x75f891(0x51b)]['PixelateImageRendering']&&(_0x2bb4ef[_0x75f891(0x1ee)][_0x75f891(0x563)]=_0x75f891(0x87c));const _0x3d618f=_0x399a6a[_0x75f891(0x391)](0x0,_0x47aea0['floor'](_0x2d519b[_0x75f891(0x14c)]*this[_0x75f891(0x1a1)])),_0x11cad4=_0x3bbd7e[_0x75f891(0x391)](0x0,_0x4f9cc7[_0x75f891(0x7d1)](_0x5e2e65[_0x75f891(0x567)]*this[_0x75f891(0x1a1)]));_0x1b83ca[_0x75f891(0x1ee)][_0x75f891(0x14c)]=_0x3d618f+'px',_0x3af0e9[_0x75f891(0x1ee)][_0x75f891(0x567)]=_0x11cad4+'px';}else{var _0x12aeab=String(RegExp['$1']);try{_0x25e6d8+=eval(_0x12aeab);}catch(_0x10975e){if(_0x75f891(0x6ed)!==_0x75f891(0x6ed))return _0x28d815[_0x75f891(0x8cf)](_0x39120b,'','');else{if($gameTemp[_0x75f891(0x7df)]())console[_0x75f891(0x193)](_0x10975e);}}}}return _0x25e6d8;};return this['traitObjects']()[_0x74b1a0(0x6cb)](_0x1bd86b,this['_paramPlus'][_0x2c4199]);},Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x388)]=function(_0x332d47){const _0x549ff1=_0x150bf7;var _0x1b2477=_0x549ff1(0x175)+(this[_0x549ff1(0x5ac)]()?_0x549ff1(0x290):'Enemy')+_0x549ff1(0x8de)+_0x332d47;if(this[_0x549ff1(0x283)](_0x1b2477))return this[_0x549ff1(0x44f)][_0x1b2477];this['_cache'][_0x1b2477]=eval(VisuMZ[_0x549ff1(0x7d0)][_0x549ff1(0x486)][_0x549ff1(0x6b9)][_0x1b2477]);const _0x22f4bb=(_0xfa90d6,_0x2e2713)=>{const _0x355b45=_0x549ff1;if(_0x355b45(0x633)!==_0x355b45(0x908)){if(!_0x2e2713)return _0xfa90d6;if(_0x2e2713[_0x355b45(0x18e)][_0x355b45(0x60c)](VisuMZ[_0x355b45(0x7d0)][_0x355b45(0x575)][_0x355b45(0x388)][_0x332d47])){if('ZHXNk'!=='wyWPj'){var _0x12980d=Number(RegExp['$1']);if(_0x12980d===0x0)_0x12980d=Number[_0x355b45(0x17d)];_0xfa90d6=Math[_0x355b45(0x391)](_0xfa90d6,_0x12980d);}else _0x1cd427[_0x355b45(0x7c8)]&&(this[_0x355b45(0x85c)]=_0x355b45(0x1da));}if(_0x2e2713[_0x355b45(0x18e)][_0x355b45(0x60c)](VisuMZ[_0x355b45(0x7d0)][_0x355b45(0x575)][_0x355b45(0x1e8)][_0x332d47])){if(_0x355b45(0x7db)!=='XTWSN')_0x1f2c3e+=_0x5a78cd;else{var _0x53f24d=String(RegExp['$1']);try{_0xfa90d6=Math[_0x355b45(0x391)](_0xfa90d6,Number(eval(_0x53f24d)));}catch(_0x19fe71){if($gameTemp['isPlaytest']())console[_0x355b45(0x193)](_0x19fe71);}}}return _0xfa90d6;}else return this[_0x355b45(0x23f)]||this;};if(this[_0x549ff1(0x44f)][_0x1b2477]===0x0)this['_cache'][_0x1b2477]=Number['MAX_SAFE_INTEGER'];return this['_cache'][_0x1b2477]=this[_0x549ff1(0x813)]()[_0x549ff1(0x6cb)](_0x22f4bb,this[_0x549ff1(0x44f)][_0x1b2477]),this[_0x549ff1(0x44f)][_0x1b2477];},Game_BattlerBase['prototype'][_0x150bf7(0x834)]=function(_0x2115ac){const _0xa0eecb=_0x150bf7,_0x57dea4=this[_0xa0eecb(0x6d4)](Game_BattlerBase['TRAIT_PARAM'],_0x2115ac),_0x1f1053=(_0x181aa3,_0x139c54)=>{const _0x2d5e5a=_0xa0eecb;if(!_0x139c54)return _0x181aa3;if(_0x139c54['note']['match'](VisuMZ[_0x2d5e5a(0x7d0)][_0x2d5e5a(0x575)][_0x2d5e5a(0x455)][_0x2115ac])){var _0x63aeb4=Number(RegExp['$1'])/0x64;_0x181aa3*=_0x63aeb4;}if(_0x139c54['note'][_0x2d5e5a(0x60c)](VisuMZ['CoreEngine'][_0x2d5e5a(0x575)][_0x2d5e5a(0x8cd)][_0x2115ac])){var _0x63aeb4=Number(RegExp['$1']);_0x181aa3*=_0x63aeb4;}if(_0x139c54[_0x2d5e5a(0x18e)]['match'](VisuMZ[_0x2d5e5a(0x7d0)]['RegExp']['paramRateJS'][_0x2115ac])){var _0x5d4878=String(RegExp['$1']);try{_0x181aa3*=eval(_0x5d4878);}catch(_0x450d1c){if('cwyos'!=='cwyos')this[_0x2d5e5a(0x6c1)]=_0x1adaee;else{if($gameTemp[_0x2d5e5a(0x7df)]())console[_0x2d5e5a(0x193)](_0x450d1c);}}}return _0x181aa3;};return this[_0xa0eecb(0x813)]()[_0xa0eecb(0x6cb)](_0x1f1053,_0x57dea4);},Game_BattlerBase[_0x150bf7(0x8e0)]['paramFlatBonus']=function(_0x54d3f1){const _0x136aad=_0x150bf7,_0x36a738=(_0x5a1b84,_0x55c2cf)=>{const _0x323f38=_0x36f3;if(!_0x55c2cf)return _0x5a1b84;if(_0x55c2cf[_0x323f38(0x18e)]['match'](VisuMZ['CoreEngine'][_0x323f38(0x575)][_0x323f38(0x5e8)][_0x54d3f1])){var _0x5c5256=Number(RegExp['$1']);_0x5a1b84+=_0x5c5256;}if(_0x55c2cf[_0x323f38(0x18e)]['match'](VisuMZ[_0x323f38(0x7d0)][_0x323f38(0x575)][_0x323f38(0x627)][_0x54d3f1])){if(_0x323f38(0x872)!=='WlVOB'){var _0x1fe057=String(RegExp['$1']);try{if(_0x323f38(0x463)!==_0x323f38(0x1eb))_0x5a1b84+=eval(_0x1fe057);else{const _0x471efb=_0x323f38(0x34b);this[_0x323f38(0x7e8)]=this['_colorCache']||{};if(this[_0x323f38(0x7e8)][_0x471efb])return this['_colorCache'][_0x471efb];const _0x535b16=_0x58ac89[_0x323f38(0x7d0)][_0x323f38(0x486)][_0x323f38(0x49f)][_0x323f38(0x34a)];return this['getColorDataFromPluginParameters'](_0x471efb,_0x535b16);}}catch(_0x30e35c){if($gameTemp['isPlaytest']())console[_0x323f38(0x193)](_0x30e35c);}}else return _0x34d0fb&&_0x214e3a[_0x323f38(0x71e)]?_0x49ed3d[_0x323f38(0x71e)][_0x323f38(0x5ae)]():!![];}return _0x5a1b84;};return this[_0x136aad(0x813)]()[_0x136aad(0x6cb)](_0x36a738,0x0);},Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x467)]=function(_0x135483){const _0x13e517=_0x150bf7;let _0x31cf88=_0x13e517(0x467)+_0x135483+'Total';if(this[_0x13e517(0x283)](_0x31cf88))return this[_0x13e517(0x44f)][_0x31cf88];return this[_0x13e517(0x44f)][_0x31cf88]=Math[_0x13e517(0x469)](VisuMZ['CoreEngine']['Settings'][_0x13e517(0x6b9)][_0x13e517(0x46f)][_0x13e517(0x697)](this,_0x135483)),this['_cache'][_0x31cf88];},Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x4b6)]=function(_0x566b1f){const _0x22820f=_0x150bf7,_0x500f04=(_0x1c22a4,_0xaa8257)=>{const _0x5b89ea=_0x36f3;if(!_0xaa8257)return _0x1c22a4;if(_0xaa8257[_0x5b89ea(0x18e)]['match'](VisuMZ[_0x5b89ea(0x7d0)][_0x5b89ea(0x575)][_0x5b89ea(0x79f)][_0x566b1f])){var _0x1dc84b=Number(RegExp['$1'])/0x64;_0x1c22a4+=_0x1dc84b;}if(_0xaa8257[_0x5b89ea(0x18e)][_0x5b89ea(0x60c)](VisuMZ[_0x5b89ea(0x7d0)][_0x5b89ea(0x575)]['xparamPlus2'][_0x566b1f])){if(_0x5b89ea(0x4ff)!=='XXHgo'){var _0x1dc84b=Number(RegExp['$1']);_0x1c22a4+=_0x1dc84b;}else{var _0x289820=_0x5dbfa0(_0x562196['$1']);_0x1026a5*=_0x289820;}}if(_0xaa8257[_0x5b89ea(0x18e)]['match'](VisuMZ['CoreEngine'][_0x5b89ea(0x575)]['xparamPlusJS'][_0x566b1f])){var _0xe241a3=String(RegExp['$1']);try{'mWrfk'!==_0x5b89ea(0x2c8)?_0x1c22a4+=eval(_0xe241a3):(_0x3aebee[_0x5b89ea(0x4b2)](),_0x5e147f['removeChild'](_0x2d10f8[_0x5b89ea(0x16e)]),_0x4215e6[_0x5b89ea(0x16e)]=_0x40ac20);}catch(_0x34362a){if($gameTemp[_0x5b89ea(0x7df)]())console[_0x5b89ea(0x193)](_0x34362a);}}return _0x1c22a4;};return this[_0x22820f(0x813)]()['reduce'](_0x500f04,0x0);},Game_BattlerBase[_0x150bf7(0x8e0)]['xparamRate']=function(_0xfbb1b2){const _0x3d6e59=_0x150bf7,_0x176927=(_0x3311b6,_0x56bb96)=>{const _0x26e20d=_0x36f3;if(!_0x56bb96)return _0x3311b6;if(_0x56bb96[_0x26e20d(0x18e)][_0x26e20d(0x60c)](VisuMZ['CoreEngine']['RegExp'][_0x26e20d(0x8e6)][_0xfbb1b2])){var _0x125c4a=Number(RegExp['$1'])/0x64;_0x3311b6*=_0x125c4a;}if(_0x56bb96['note'][_0x26e20d(0x60c)](VisuMZ[_0x26e20d(0x7d0)][_0x26e20d(0x575)][_0x26e20d(0x650)][_0xfbb1b2])){var _0x125c4a=Number(RegExp['$1']);_0x3311b6*=_0x125c4a;}if(_0x56bb96[_0x26e20d(0x18e)][_0x26e20d(0x60c)](VisuMZ['CoreEngine']['RegExp'][_0x26e20d(0x4aa)][_0xfbb1b2])){var _0x43d57a=String(RegExp['$1']);try{_0x3311b6*=eval(_0x43d57a);}catch(_0x1ed25a){if($gameTemp[_0x26e20d(0x7df)]())console['log'](_0x1ed25a);}}return _0x3311b6;};return this['traitObjects']()[_0x3d6e59(0x6cb)](_0x176927,0x1);},Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x686)]=function(_0x5423eb){const _0xd38181=_0x150bf7,_0xfa2e8f=(_0x299f6a,_0x402936)=>{const _0x58074e=_0x36f3;if(!_0x402936)return _0x299f6a;if(_0x402936['note']['match'](VisuMZ[_0x58074e(0x7d0)][_0x58074e(0x575)]['xparamFlat1'][_0x5423eb])){if(_0x58074e(0x90b)!==_0x58074e(0x8ad)){var _0x4544d5=Number(RegExp['$1'])/0x64;_0x299f6a+=_0x4544d5;}else{const _0x7cd31d='Map%1.json'[_0x58074e(0x322)](_0x23f8b6['padZero'](0x3)),_0x36653c=new _0x5dea27(),_0x2a6433=_0x58074e(0x5ca)+_0x7cd31d;_0x36653c[_0x58074e(0x2f0)]('GET',_0x2a6433),_0x36653c[_0x58074e(0x478)](_0x58074e(0x27a)),_0x36653c['onload']=()=>this[_0x58074e(0x178)](_0x36653c,_0x3ee0f7,_0x7cd31d,_0x2a6433),_0x36653c[_0x58074e(0x22c)]=()=>_0x219736['onXhrError'](_0x58074e(0x54f),_0x7cd31d,_0x2a6433),_0x36653c[_0x58074e(0x23b)]();}}if(_0x402936[_0x58074e(0x18e)][_0x58074e(0x60c)](VisuMZ[_0x58074e(0x7d0)][_0x58074e(0x575)][_0x58074e(0x8e7)][_0x5423eb])){var _0x4544d5=Number(RegExp['$1']);_0x299f6a+=_0x4544d5;}if(_0x402936['note'][_0x58074e(0x60c)](VisuMZ[_0x58074e(0x7d0)][_0x58074e(0x575)][_0x58074e(0x642)][_0x5423eb])){if('TwGkj'!==_0x58074e(0x8f8))for(const _0x17fdd1 of _0x30064f){this['createPointAnimationSprite']([_0x17fdd1],_0x29c288,_0xf87173,_0x45b224,_0x305be5),_0x6ed687+=_0x3a19d8;}else{var _0x63f509=String(RegExp['$1']);try{_0x299f6a+=eval(_0x63f509);}catch(_0x25940e){if($gameTemp['isPlaytest']())console[_0x58074e(0x193)](_0x25940e);}}}return _0x299f6a;};return this['traitObjects']()[_0xd38181(0x6cb)](_0xfa2e8f,0x0);},Game_BattlerBase[_0x150bf7(0x8e0)]['xparam']=function(_0x561637){const _0x5153ac=_0x150bf7;let _0x5504f9='xparam'+_0x561637+_0x5153ac(0x694);if(this[_0x5153ac(0x283)](_0x5504f9))return this[_0x5153ac(0x44f)][_0x5504f9];return this[_0x5153ac(0x44f)][_0x5504f9]=VisuMZ['CoreEngine'][_0x5153ac(0x486)][_0x5153ac(0x6b9)][_0x5153ac(0x2cf)][_0x5153ac(0x697)](this,_0x561637),this[_0x5153ac(0x44f)][_0x5504f9];},Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x3d4)]=function(_0x1e8c73){const _0x159fa2=_0x150bf7,_0x19d39e=(_0x269fc5,_0x55a63a)=>{const _0x25292f=_0x36f3;if(!_0x55a63a)return _0x269fc5;if(_0x55a63a[_0x25292f(0x18e)][_0x25292f(0x60c)](VisuMZ[_0x25292f(0x7d0)][_0x25292f(0x575)][_0x25292f(0x82a)][_0x1e8c73])){if(_0x25292f(0x261)===_0x25292f(0x261)){var _0x1e8aa2=Number(RegExp['$1'])/0x64;_0x269fc5+=_0x1e8aa2;}else this[_0x25292f(0x7e8)]={};}if(_0x55a63a['note'][_0x25292f(0x60c)](VisuMZ[_0x25292f(0x7d0)]['RegExp'][_0x25292f(0x907)][_0x1e8c73])){if('dyThT'!==_0x25292f(0x682)){var _0x1e8aa2=Number(RegExp['$1']);_0x269fc5+=_0x1e8aa2;}else this[_0x25292f(0x1d8)]('default');}if(_0x55a63a[_0x25292f(0x18e)]['match'](VisuMZ[_0x25292f(0x7d0)]['RegExp'][_0x25292f(0x480)][_0x1e8c73])){if(_0x25292f(0x48b)!==_0x25292f(0x33d)){var _0x2c7394=String(RegExp['$1']);try{_0x25292f(0x4c7)===_0x25292f(0x4c7)?_0x269fc5+=eval(_0x2c7394):_0x147ed8[_0x25292f(0x386)](!![]);}catch(_0xe07b0){if(_0x25292f(0x3ee)!==_0x25292f(0x717)){if($gameTemp['isPlaytest']())console[_0x25292f(0x193)](_0xe07b0);}else return _0x231898;}}else _0x3211ca[_0x25292f(0x7d0)][_0x25292f(0x3f2)][_0x25292f(0x697)](this),_0x2bf3d9=this;}return _0x269fc5;};return this[_0x159fa2(0x813)]()['reduce'](_0x19d39e,0x0);},Game_BattlerBase[_0x150bf7(0x8e0)]['sparamRate']=function(_0x482206){const _0x4539c3=_0x150bf7,_0x28e380=(_0x3517ae,_0x2a3b3b)=>{const _0x3b9ee2=_0x36f3;if(!_0x2a3b3b)return _0x3517ae;if(_0x2a3b3b[_0x3b9ee2(0x18e)]['match'](VisuMZ[_0x3b9ee2(0x7d0)][_0x3b9ee2(0x575)][_0x3b9ee2(0x853)][_0x482206])){var _0x4f0774=Number(RegExp['$1'])/0x64;_0x3517ae*=_0x4f0774;}if(_0x2a3b3b[_0x3b9ee2(0x18e)]['match'](VisuMZ[_0x3b9ee2(0x7d0)][_0x3b9ee2(0x575)][_0x3b9ee2(0x4d5)][_0x482206])){var _0x4f0774=Number(RegExp['$1']);_0x3517ae*=_0x4f0774;}if(_0x2a3b3b[_0x3b9ee2(0x18e)]['match'](VisuMZ[_0x3b9ee2(0x7d0)]['RegExp'][_0x3b9ee2(0x4e7)][_0x482206])){var _0x5ef69c=String(RegExp['$1']);try{_0x3517ae*=eval(_0x5ef69c);}catch(_0x2a4f46){if($gameTemp[_0x3b9ee2(0x7df)]())console[_0x3b9ee2(0x193)](_0x2a4f46);}}return _0x3517ae;};return this[_0x4539c3(0x813)]()['reduce'](_0x28e380,0x1);},Game_BattlerBase[_0x150bf7(0x8e0)]['sparamFlatBonus']=function(_0x1a2161){const _0x42cbb4=_0x150bf7,_0x136846=(_0x48fcd1,_0x2d4e65)=>{const _0x119e62=_0x36f3;if('QOVnP'!==_0x119e62(0x519))_0x3d3259[_0x119e62(0x7d0)][_0x119e62(0x2e2)][_0x119e62(0x697)](this),this['updateDashToggle']();else{if(!_0x2d4e65)return _0x48fcd1;if(_0x2d4e65['note'][_0x119e62(0x60c)](VisuMZ[_0x119e62(0x7d0)][_0x119e62(0x575)]['sparamFlat1'][_0x1a2161])){var _0x33fbc8=Number(RegExp['$1'])/0x64;_0x48fcd1+=_0x33fbc8;}if(_0x2d4e65['note']['match'](VisuMZ[_0x119e62(0x7d0)][_0x119e62(0x575)][_0x119e62(0x784)][_0x1a2161])){var _0x33fbc8=Number(RegExp['$1']);_0x48fcd1+=_0x33fbc8;}if(_0x2d4e65['note'][_0x119e62(0x60c)](VisuMZ[_0x119e62(0x7d0)]['RegExp'][_0x119e62(0x4f1)][_0x1a2161])){if('nriAd'===_0x119e62(0x7c7)){var _0x21f182=_0x34cfb9(_0x4f2e07['$1'])/0x64;_0x446e72*=_0x21f182;}else{var _0x8b9205=String(RegExp['$1']);try{_0x119e62(0x444)===_0x119e62(0x82b)?_0x596d49[_0x119e62(0x206)]&&(this['_forcedBattleSys']=_0x119e62(0x1dd)):_0x48fcd1+=eval(_0x8b9205);}catch(_0x4c314f){if($gameTemp[_0x119e62(0x7df)]())console['log'](_0x4c314f);}}}return _0x48fcd1;}};return this[_0x42cbb4(0x813)]()[_0x42cbb4(0x6cb)](_0x136846,0x0);},Game_BattlerBase['prototype'][_0x150bf7(0x8d9)]=function(_0xf666ea){const _0x3c748f=_0x150bf7;let _0x4368b0=_0x3c748f(0x8d9)+_0xf666ea+_0x3c748f(0x694);if(this[_0x3c748f(0x283)](_0x4368b0))return this[_0x3c748f(0x44f)][_0x4368b0];return this['_cache'][_0x4368b0]=VisuMZ[_0x3c748f(0x7d0)][_0x3c748f(0x486)]['Param'][_0x3c748f(0x6e4)][_0x3c748f(0x697)](this,_0xf666ea),this[_0x3c748f(0x44f)][_0x4368b0];},Game_BattlerBase['prototype'][_0x150bf7(0x581)]=function(_0x50e8be,_0xc00bc5){const _0x36d5f7=_0x150bf7;if(typeof paramId===_0x36d5f7(0x4da))return this['param'](_0x50e8be);_0x50e8be=String(_0x50e8be||'')[_0x36d5f7(0x288)]();if(_0x50e8be===_0x36d5f7(0x7e1))return this[_0x36d5f7(0x467)](0x0);if(_0x50e8be===_0x36d5f7(0x767))return this['param'](0x1);if(_0x50e8be===_0x36d5f7(0x382))return this[_0x36d5f7(0x467)](0x2);if(_0x50e8be===_0x36d5f7(0x901))return this[_0x36d5f7(0x467)](0x3);if(_0x50e8be===_0x36d5f7(0x4ef))return this[_0x36d5f7(0x467)](0x4);if(_0x50e8be==='MDF')return this[_0x36d5f7(0x467)](0x5);if(_0x50e8be==='AGI')return this[_0x36d5f7(0x467)](0x6);if(_0x50e8be===_0x36d5f7(0x582))return this[_0x36d5f7(0x467)](0x7);if(_0x50e8be===_0x36d5f7(0x515))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x5c0)](0x0)*0x64))+'%':this[_0x36d5f7(0x5c0)](0x0);if(_0x50e8be===_0x36d5f7(0x545))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this['xparam'](0x1)*0x64))+'%':this[_0x36d5f7(0x5c0)](0x1);if(_0x50e8be===_0x36d5f7(0x1d1))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x5c0)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x50e8be==='CEV')return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x5c0)](0x3)*0x64))+'%':this[_0x36d5f7(0x5c0)](0x3);if(_0x50e8be===_0x36d5f7(0x8a0))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this['xparam'](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x50e8be===_0x36d5f7(0x604))return _0xc00bc5?String(Math['round'](this['xparam'](0x5)*0x64))+'%':this[_0x36d5f7(0x5c0)](0x5);if(_0x50e8be===_0x36d5f7(0x81c))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x5c0)](0x6)*0x64))+'%':this[_0x36d5f7(0x5c0)](0x6);if(_0x50e8be==='HRG')return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x5c0)](0x7)*0x64))+'%':this[_0x36d5f7(0x5c0)](0x7);if(_0x50e8be===_0x36d5f7(0x496))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x5c0)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x50e8be===_0x36d5f7(0x387))return _0xc00bc5?String(Math['round'](this[_0x36d5f7(0x5c0)](0x9)*0x64))+'%':this[_0x36d5f7(0x5c0)](0x9);if(_0x50e8be===_0x36d5f7(0x6f7))return _0xc00bc5?String(Math['round'](this[_0x36d5f7(0x8d9)](0x0)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x0);if(_0x50e8be===_0x36d5f7(0x8a2))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this['sparam'](0x1)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x1);if(_0x50e8be==='REC')return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x8d9)](0x2)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x2);if(_0x50e8be==='PHA')return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x8d9)](0x3)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x3);if(_0x50e8be===_0x36d5f7(0x2e4))return _0xc00bc5?String(Math['round'](this[_0x36d5f7(0x8d9)](0x4)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x4);if(_0x50e8be===_0x36d5f7(0x8b8))return _0xc00bc5?String(Math['round'](this[_0x36d5f7(0x8d9)](0x5)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x5);if(_0x50e8be===_0x36d5f7(0x865))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x8d9)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x50e8be===_0x36d5f7(0x4a8))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this['sparam'](0x7)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x7);if(_0x50e8be===_0x36d5f7(0x28a))return _0xc00bc5?String(Math['round'](this['sparam'](0x8)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x8);if(_0x50e8be===_0x36d5f7(0x4c2))return _0xc00bc5?String(Math[_0x36d5f7(0x469)](this[_0x36d5f7(0x8d9)](0x9)*0x64))+'%':this[_0x36d5f7(0x8d9)](0x9);if(VisuMZ['CoreEngine'][_0x36d5f7(0x6d3)][_0x50e8be]){const _0x43fd9e=VisuMZ[_0x36d5f7(0x7d0)][_0x36d5f7(0x6d3)][_0x50e8be],_0x4c3aaa=this[_0x43fd9e];return VisuMZ[_0x36d5f7(0x7d0)]['CustomParamType'][_0x50e8be]===_0x36d5f7(0x71f)?_0x4c3aaa:_0xc00bc5?String(Math[_0x36d5f7(0x469)](_0x4c3aaa*0x64))+'%':_0x4c3aaa;}return'';},Game_BattlerBase[_0x150bf7(0x8e0)][_0x150bf7(0x1e4)]=function(){const _0xbaade=_0x150bf7;return this[_0xbaade(0x36c)]()&&this[_0xbaade(0x17f)]<this[_0xbaade(0x15c)]*VisuMZ[_0xbaade(0x7d0)][_0xbaade(0x486)][_0xbaade(0x6b9)][_0xbaade(0x7bf)];},Game_Battler[_0x150bf7(0x8e0)][_0x150bf7(0x43b)]=function(){const _0x34c3a7=_0x150bf7;SoundManager[_0x34c3a7(0x5b3)](),this[_0x34c3a7(0x441)](_0x34c3a7(0x295));},VisuMZ['CoreEngine']['Game_Actor_paramBase']=Game_Actor[_0x150bf7(0x8e0)]['paramBase'],Game_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x7d9)]=function(_0x5e6833){const _0x827032=_0x150bf7;if(this['level']>0x63)return this[_0x827032(0x3a9)](_0x5e6833);return VisuMZ[_0x827032(0x7d0)]['Game_Actor_paramBase'][_0x827032(0x697)](this,_0x5e6833);},Game_Actor[_0x150bf7(0x8e0)]['paramBaseAboveLevel99']=function(_0x25fdb2){const _0x2cbef7=_0x150bf7,_0x64f21a=this[_0x2cbef7(0x82e)]()['params'][_0x25fdb2][0x63],_0x18cd71=this[_0x2cbef7(0x82e)]()['params'][_0x25fdb2][0x62];return _0x64f21a+(_0x64f21a-_0x18cd71)*(this[_0x2cbef7(0x481)]-0x63);},VisuMZ[_0x150bf7(0x7d0)]['Game_Actor_changeClass']=Game_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x3a6)],Game_Actor[_0x150bf7(0x8e0)]['changeClass']=function(_0x2b750b,_0xcfac5d){const _0x288ba8=_0x150bf7;$gameTemp[_0x288ba8(0x3b5)]=!![],VisuMZ['CoreEngine'][_0x288ba8(0x35f)]['call'](this,_0x2b750b,_0xcfac5d),$gameTemp[_0x288ba8(0x3b5)]=undefined;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x6ff)]=Game_Actor[_0x150bf7(0x8e0)]['levelUp'],Game_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x2ff)]=function(){const _0xd9a582=_0x150bf7;VisuMZ[_0xd9a582(0x7d0)]['Game_Actor_levelUp']['call'](this);if(!$gameTemp[_0xd9a582(0x3b5)])this[_0xd9a582(0x6ef)]();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0x2d700d=_0x150bf7;this['_cache']={};if(VisuMZ[_0x2d700d(0x7d0)]['Settings'][_0x2d700d(0x51b)][_0x2d700d(0x83c)])this[_0x2d700d(0x17f)]=this[_0x2d700d(0x15c)];if(VisuMZ['CoreEngine'][_0x2d700d(0x486)][_0x2d700d(0x51b)][_0x2d700d(0x73f)])this['_mp']=this[_0x2d700d(0x6fb)];},Game_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x685)]=function(){const _0x166436=_0x150bf7;if(this[_0x166436(0x861)]())return 0x1;const _0xe22f95=this['nextLevelExp']()-this[_0x166436(0x6f3)](),_0x2f11e7=this[_0x166436(0x483)]()-this[_0x166436(0x6f3)]();return(_0x2f11e7/_0xe22f95)[_0x166436(0x4fe)](0x0,0x1);},Game_Actor['prototype'][_0x150bf7(0x813)]=function(){const _0x3671b3=_0x150bf7,_0x1f85c2=Game_Battler[_0x3671b3(0x8e0)][_0x3671b3(0x813)][_0x3671b3(0x697)](this);for(const _0x2228db of this[_0x3671b3(0x125)]()){_0x2228db&&_0x1f85c2[_0x3671b3(0x4c5)](_0x2228db);}return _0x1f85c2[_0x3671b3(0x4c5)](this[_0x3671b3(0x82e)](),this[_0x3671b3(0x571)]()),_0x1f85c2;},Object[_0x150bf7(0x2fa)](Game_Enemy[_0x150bf7(0x8e0)],_0x150bf7(0x481),{'get':function(){const _0x203e91=_0x150bf7;return this[_0x203e91(0x37a)]();},'configurable':!![]}),Game_Enemy[_0x150bf7(0x8e0)]['getLevel']=function(){const _0x43124e=_0x150bf7;return this[_0x43124e(0x75f)]()['level'];},Game_Enemy['prototype'][_0x150bf7(0x46c)]=function(){const _0x1e5d2c=_0x150bf7;if(!this['_repositioned']){if(_0x1e5d2c(0x477)==='TWHEQ'){this[_0x1e5d2c(0x2a7)]+=Math[_0x1e5d2c(0x469)]((Graphics[_0x1e5d2c(0x567)]-0x270)/0x2),this[_0x1e5d2c(0x2a7)]-=Math[_0x1e5d2c(0x7d1)]((Graphics[_0x1e5d2c(0x567)]-Graphics['boxHeight'])/0x2);if($gameSystem[_0x1e5d2c(0x82c)]())_0x1e5d2c(0x696)==='oCrTh'?this['_screenX']-=Math[_0x1e5d2c(0x7d1)]((Graphics[_0x1e5d2c(0x14c)]-Graphics[_0x1e5d2c(0x8f9)])/0x2):(_0x3881f1=_0x5a514f[_0x1e5d2c(0x469)](_0x90a237),_0x5c2d9f=_0x39f44e[_0x1e5d2c(0x469)](_0x3b6066),_0x82adbc[_0x1e5d2c(0x7d0)][_0x1e5d2c(0x84c)][_0x1e5d2c(0x697)](this,_0x24225c,_0x2876ff,_0x297250,_0x3a32ae));else{if('LfnyC'==='MSvmY'){if(_0x342dd2)_0x57b7df[_0x1e5d2c(0x476)](_0x310ef0);}else this['_screenX']+=Math[_0x1e5d2c(0x469)]((Graphics[_0x1e5d2c(0x8f9)]-0x330)/0x2);}}else{if(this[_0x1e5d2c(0x4b4)]===_0x1e5d2c(0x224)&&!_0x5a5b16[_0x1e5d2c(0x429)]())return;if(_0x31a8ce[_0x1e5d2c(0x808)]())return;_0xf5b0ac[_0x1e5d2c(0x7d0)]['Window_NameInput_cursorUp'][_0x1e5d2c(0x697)](this,_0x248b3a),this['switchModes']('default');}}this[_0x1e5d2c(0x51c)]=!![];},Game_Party[_0x150bf7(0x8e0)][_0x150bf7(0x32a)]=function(){const _0x397c0d=_0x150bf7;return VisuMZ[_0x397c0d(0x7d0)][_0x397c0d(0x486)][_0x397c0d(0x57a)][_0x397c0d(0x6ad)];},VisuMZ['CoreEngine'][_0x150bf7(0x8c1)]=Game_Party[_0x150bf7(0x8e0)][_0x150bf7(0x225)],Game_Party[_0x150bf7(0x8e0)]['consumeItem']=function(_0x34ee43){const _0x510595=_0x150bf7;if(VisuMZ[_0x510595(0x7d0)]['Settings'][_0x510595(0x51b)][_0x510595(0x289)]&&DataManager[_0x510595(0x3af)](_0x34ee43))return;VisuMZ[_0x510595(0x7d0)][_0x510595(0x8c1)][_0x510595(0x697)](this,_0x34ee43);},Game_Party['prototype'][_0x150bf7(0x89e)]=function(){const _0x45b643=_0x150bf7,_0x500e6c=VisuMZ[_0x45b643(0x7d0)][_0x45b643(0x486)][_0x45b643(0x51b)],_0x1a91a6=_0x500e6c[_0x45b643(0x6fd)]??0x63;let _0x19db0e=[];if(_0x500e6c[_0x45b643(0x5a4)]??!![]){if(_0x45b643(0x7ad)===_0x45b643(0x7ad))_0x19db0e=_0x19db0e[_0x45b643(0x662)]($dataItems);else return this[_0x45b643(0x88e)]();}if(_0x500e6c[_0x45b643(0x8dc)]??!![]){if(_0x45b643(0x73a)!==_0x45b643(0x523))_0x19db0e=_0x19db0e[_0x45b643(0x662)]($dataWeapons);else{const _0x1f1d1a=_0x4ad4a4['floor']((_0x58b035-0x2)*_0x508533),_0x136b29=_0x2b17d4[_0x45b643(0x8e0)][_0x45b643(0x724)][_0x45b643(0x697)](this),_0xfd6a55=_0x5e3a44+this[_0x45b643(0x60b)]()-_0x136b29-0x2;this[_0x45b643(0x21a)][_0x45b643(0x3a1)](_0x16de2d,_0xfd6a55,_0x58f0a3,_0x136b29,_0x15324e['gaugeBackColor']()),this[_0x45b643(0x21a)]['gradientFillRect'](_0x34b103+0x1,_0xfd6a55+0x1,_0x1f1d1a,_0x136b29-0x2,_0x3b994c,_0x36e7af);}}(_0x500e6c['BTestArmors']??!![])&&(_0x19db0e=_0x19db0e[_0x45b643(0x662)]($dataArmors));for(const _0x48aebd of _0x19db0e){if(!_0x48aebd)continue;if(_0x48aebd[_0x45b643(0x42a)][_0x45b643(0x37c)]()<=0x0)continue;if(_0x48aebd[_0x45b643(0x42a)][_0x45b643(0x60c)](/-----/i))continue;this[_0x45b643(0x831)](_0x48aebd,_0x1a91a6);}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x664)]=Game_Troop[_0x150bf7(0x8e0)]['setup'],Game_Troop['prototype'][_0x150bf7(0x136)]=function(_0x3bef09){const _0x29017f=_0x150bf7;$gameTemp[_0x29017f(0x6da)](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x3bef09),VisuMZ['CoreEngine'][_0x29017f(0x664)][_0x29017f(0x697)](this,_0x3bef09);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x68a)]=Game_Map[_0x150bf7(0x8e0)][_0x150bf7(0x136)],Game_Map[_0x150bf7(0x8e0)][_0x150bf7(0x136)]=function(_0x55555d){const _0x276859=_0x150bf7;VisuMZ['CoreEngine'][_0x276859(0x68a)][_0x276859(0x697)](this,_0x55555d),this[_0x276859(0x51d)](_0x55555d);},Game_Map[_0x150bf7(0x8e0)][_0x150bf7(0x51d)]=function(){const _0x9df45c=_0x150bf7;this[_0x9df45c(0x145)]=VisuMZ[_0x9df45c(0x7d0)][_0x9df45c(0x486)][_0x9df45c(0x51b)][_0x9df45c(0x64a)]||![];if($dataMap&&$dataMap[_0x9df45c(0x18e)]){if($dataMap[_0x9df45c(0x18e)][_0x9df45c(0x60c)](/<SHOW TILE SHADOWS>/i))this[_0x9df45c(0x145)]=![];if($dataMap[_0x9df45c(0x18e)][_0x9df45c(0x60c)](/<HIDE TILE SHADOWS>/i))this[_0x9df45c(0x145)]=!![];}},Game_Map[_0x150bf7(0x8e0)][_0x150bf7(0x78c)]=function(){if(this['_hideTileShadows']===undefined)this['setupCoreEngine']();return this['_hideTileShadows'];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x166)]=Game_Character[_0x150bf7(0x8e0)]['processMoveCommand'],Game_Character[_0x150bf7(0x8e0)][_0x150bf7(0x26e)]=function(_0x3e1e30){const _0x1648fe=_0x150bf7;try{_0x1648fe(0x87a)===_0x1648fe(0x87a)?VisuMZ['CoreEngine']['Game_Character_processMoveCommand'][_0x1648fe(0x697)](this,_0x3e1e30):this['createPointAnimation'](_0x5f4f3d);}catch(_0x149e15){if('GSArP'===_0x1648fe(0x1ec))_0xe4c494[_0x1648fe(0x168)]()||this['_isButtonHidden']?this[_0x1648fe(0x488)]():_0x493ba4[_0x1648fe(0x7d0)][_0x1648fe(0x60e)][_0x1648fe(0x697)](this);else{if($gameTemp['isPlaytest']())console[_0x1648fe(0x193)](_0x149e15);}}},Game_Player[_0x150bf7(0x8e0)]['makeEncounterCount']=function(){const _0x4ee486=_0x150bf7,_0x2986d0=$gameMap[_0x4ee486(0x56e)]();this[_0x4ee486(0x885)]=Math[_0x4ee486(0x85e)](_0x2986d0)+Math[_0x4ee486(0x85e)](_0x2986d0)+this[_0x4ee486(0x5fc)]();},Game_Player['prototype']['encounterStepsMinimum']=function(){const _0x28ee2a=_0x150bf7;if($dataMap&&$dataMap['note']&&$dataMap[_0x28ee2a(0x18e)][_0x28ee2a(0x60c)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x28ee2a(0x7fc)!==_0x28ee2a(0x7fc)){var _0x1ee109=_0x5220f9(_0x1f1d05['$1'])/0x64;_0x5f5571*=_0x1ee109;}else return Number(RegExp['$1']);}else return _0x28ee2a(0x811)!==_0x28ee2a(0x811)?_0x4e7f8f[_0x28ee2a(0x8e0)][_0x28ee2a(0x20d)][_0x28ee2a(0x697)](this):VisuMZ['CoreEngine'][_0x28ee2a(0x486)][_0x28ee2a(0x51b)][_0x28ee2a(0x252)];},VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents']=Game_Event[_0x150bf7(0x8e0)][_0x150bf7(0x187)],Game_Event[_0x150bf7(0x8e0)]['isCollidedWithEvents']=function(_0x569879,_0x3b4362){const _0x2ee8d9=_0x150bf7;if(this[_0x2ee8d9(0x597)]())return this['checkSmartEventCollision'](_0x569879,_0x3b4362);else{if(_0x2ee8d9(0x254)==='WUosR')return VisuMZ[_0x2ee8d9(0x7d0)][_0x2ee8d9(0x8ff)][_0x2ee8d9(0x697)](this,_0x569879,_0x3b4362);else{var _0x1b91bf=_0x10109a(_0x5e0edd['$1']);_0x26bdd8*=_0x1b91bf;}}},Game_Event[_0x150bf7(0x8e0)][_0x150bf7(0x597)]=function(){const _0x3f6130=_0x150bf7;return VisuMZ[_0x3f6130(0x7d0)][_0x3f6130(0x486)][_0x3f6130(0x51b)][_0x3f6130(0x1e0)];},Game_Event[_0x150bf7(0x8e0)][_0x150bf7(0x833)]=function(_0x5d2e30,_0x276cae){const _0x3b397e=_0x150bf7;if(!this['isNormalPriority']())return![];else{const _0xc0fc7a=$gameMap[_0x3b397e(0x7da)](_0x5d2e30,_0x276cae)['filter'](_0x41dae6=>_0x41dae6[_0x3b397e(0x793)]());return _0xc0fc7a[_0x3b397e(0x452)]>0x0;}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x3eb)]=Game_Interpreter[_0x150bf7(0x8e0)]['command105'],Game_Interpreter[_0x150bf7(0x8e0)][_0x150bf7(0x3ef)]=function(_0x1b3256){const _0x34b48b=_0x150bf7,_0x556323=this['getCombinedScrollingText']();if(_0x556323['match'](/\/\/[ ]SCRIPT[ ]CALL/i)){if(_0x34b48b(0x8b0)===_0x34b48b(0x8b0))return this[_0x34b48b(0x74d)](_0x556323);else this[_0x34b48b(0x725)]&&(_0x1f4a8b=_0x5ca603[_0x34b48b(0x4d4)](_0x3ac7eb),_0x120295['se']&&(_0x2afcb9['se'][_0x34b48b(0x43a)]=0x0)),_0x272a22[_0x34b48b(0x7d0)]['Sprite_AnimationMV_processTimingData']['call'](this,_0x160514);}else{if(_0x34b48b(0x7b5)!==_0x34b48b(0x7b5))_0x1b880a=_0x5f081f[_0x34b48b(0x469)](_0x15499a),_0x1edc6b=_0x5c4f79[_0x34b48b(0x469)](_0x57f704),_0x5e80d3=_0x2a2200[_0x34b48b(0x469)](_0xc2511f),_0x562ee2=_0x301673['round'](_0x1f0c88),_0x195683[_0x34b48b(0x7d0)]['Bitmap_drawText']['call'](this,_0x49f441,_0x11460e,_0xfa9b06,_0x3793b6,_0x188c62,_0x46d0a2),this['markCoreEngineModified']();else return VisuMZ[_0x34b48b(0x7d0)][_0x34b48b(0x3eb)]['call'](this,_0x1b3256);}},Game_Interpreter['prototype'][_0x150bf7(0x705)]=function(){const _0x4a3a55=_0x150bf7;let _0x42344c='',_0x3a52e4=this[_0x4a3a55(0x169)]+0x1;while(this[_0x4a3a55(0x1c5)][_0x3a52e4]&&this[_0x4a3a55(0x1c5)][_0x3a52e4]['code']===0x195){_0x42344c+=this[_0x4a3a55(0x1c5)][_0x3a52e4][_0x4a3a55(0x155)][0x0]+'\x0a',_0x3a52e4++;}return _0x42344c;},Game_Interpreter['prototype'][_0x150bf7(0x74d)]=function(_0x5c584f){const _0x3f95b9=_0x150bf7;try{if(_0x3f95b9(0x87f)!=='qnOaG'){_0x232d1b['prototype'][_0x3f95b9(0x5cd)][_0x3f95b9(0x697)](this),this[_0x3f95b9(0x36f)]();if(this['_actor'])this['updateMotion']();else this[_0x3f95b9(0x158)]!==''&&(this[_0x3f95b9(0x158)]='');}else eval(_0x5c584f);}catch(_0x219cd2){if($gameTemp[_0x3f95b9(0x7df)]()){if('fQiwr'===_0x3f95b9(0x413))console[_0x3f95b9(0x193)](_0x3f95b9(0x734)),console['log'](_0x219cd2);else{var _0x2a8bff=_0x16d6aa(_0x347fc9['$1']);_0x591c19+=_0x2a8bff;}}}return!![];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x2f2)]=Game_Interpreter[_0x150bf7(0x8e0)][_0x150bf7(0x18a)],Game_Interpreter[_0x150bf7(0x8e0)][_0x150bf7(0x18a)]=function(_0x3b5048){const _0x54c491=_0x150bf7;try{VisuMZ['CoreEngine'][_0x54c491(0x2f2)][_0x54c491(0x697)](this,_0x3b5048);}catch(_0x4066a2){if('CfLrA'!==_0x54c491(0x8a5)){if($gameTemp[_0x54c491(0x7df)]()){if(_0x54c491(0x365)!==_0x54c491(0x141))console[_0x54c491(0x193)](_0x54c491(0x6de)),console[_0x54c491(0x193)](_0x4066a2);else{_0x5c3f90[_0x54c491(0x6d1)]=_0x216322(_0x5d94f4['$1']);if(_0x4ce41c[_0x54c491(0x6d1)]===0x0)_0x31697f['maxLevel']=_0x293876['MAX_SAFE_INTEGER'];}}this[_0x54c491(0x267)]();}else _0x3705f3(_0x54c491(0x7f4));}return!![];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x1f3)]=Game_Interpreter[_0x150bf7(0x8e0)][_0x150bf7(0x625)],Game_Interpreter['prototype']['command122']=function(_0x5a1946){const _0x1e7ba0=_0x150bf7;try{VisuMZ[_0x1e7ba0(0x7d0)][_0x1e7ba0(0x1f3)][_0x1e7ba0(0x697)](this,_0x5a1946);}catch(_0x13d626){if($gameTemp['isPlaytest']()){if(_0x1e7ba0(0x26a)!==_0x1e7ba0(0x25d))console[_0x1e7ba0(0x193)](_0x1e7ba0(0x807)),console[_0x1e7ba0(0x193)](_0x13d626);else{const _0x42f06a=_0x591dc1+(this['lineHeight']()-_0x4b2186[_0x1e7ba0(0x265)])/0x2;this[_0x1e7ba0(0x5b0)](_0x37f53c,_0x349e57+(_0x38615a-_0x4b240e['iconWidth']),_0x42f06a),_0x584042-=_0x170513[_0x1e7ba0(0x17a)]+0x4;}}}return!![];},VisuMZ['CoreEngine'][_0x150bf7(0x23e)]=Game_Interpreter[_0x150bf7(0x8e0)][_0x150bf7(0x58f)],Game_Interpreter[_0x150bf7(0x8e0)][_0x150bf7(0x58f)]=function(){const _0x2362ae=_0x150bf7;try{if(_0x2362ae(0x737)===_0x2362ae(0x7f6))return this[_0x2362ae(0x71e)]&&this[_0x2362ae(0x71e)][_0x2362ae(0x771)]===_0x92d968;else VisuMZ[_0x2362ae(0x7d0)]['Game_Interpreter_command355'][_0x2362ae(0x697)](this);}catch(_0x53fabf){$gameTemp[_0x2362ae(0x7df)]()&&(console[_0x2362ae(0x193)](_0x2362ae(0x68c)),console['log'](_0x53fabf));}return!![];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x5b5)]=Game_Interpreter['prototype'][_0x150bf7(0x236)],Game_Interpreter[_0x150bf7(0x8e0)]['command357']=function(_0x2ec008){const _0x266192=_0x150bf7;return $gameTemp[_0x266192(0x38b)](this),VisuMZ[_0x266192(0x7d0)]['Game_Interpreter_PluginCommand']['call'](this,_0x2ec008);},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x410)]=function(){const _0x5f30e5=_0x150bf7;return VisuMZ[_0x5f30e5(0x7d0)][_0x5f30e5(0x486)]['UI'][_0x5f30e5(0x14a)];},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x171)]=function(){const _0x15227c=_0x150bf7;return VisuMZ[_0x15227c(0x7d0)][_0x15227c(0x486)]['UI']['BottomHelp'];},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x5c5)]=function(){const _0x4dad33=_0x150bf7;return VisuMZ[_0x4dad33(0x7d0)][_0x4dad33(0x486)]['UI'][_0x4dad33(0x30a)];},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x531)]=function(){const _0x22efbc=_0x150bf7;return VisuMZ[_0x22efbc(0x7d0)]['Settings']['UI']['RightMenus'];},Scene_Base[_0x150bf7(0x8e0)]['mainCommandWidth']=function(){const _0x10966c=_0x150bf7;return VisuMZ[_0x10966c(0x7d0)][_0x10966c(0x486)]['UI'][_0x10966c(0x825)];},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x752)]=function(){const _0x30ad55=_0x150bf7;return VisuMZ[_0x30ad55(0x7d0)][_0x30ad55(0x486)]['UI'][_0x30ad55(0x13d)];},Scene_Base['prototype'][_0x150bf7(0x5ae)]=function(){const _0x8a458=_0x150bf7;return VisuMZ[_0x8a458(0x7d0)]['Settings'][_0x8a458(0x751)][_0x8a458(0x7ea)];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x6a1)]=Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x5d6)],Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x5d6)]=function(){const _0x169887=_0x150bf7;VisuMZ[_0x169887(0x7d0)][_0x169887(0x6a1)][_0x169887(0x697)](this),this[_0x169887(0x6ae)](),this['_windowLayer']['x']=Math[_0x169887(0x469)](this['_windowLayer']['x']),this[_0x169887(0x356)]['y']=Math[_0x169887(0x469)](this[_0x169887(0x356)]['y']);},Scene_Base[_0x150bf7(0x8e0)]['createButtonAssistWindow']=function(){},Scene_Base[_0x150bf7(0x8e0)]['buttonAssistKey1']=function(){const _0x2adb5a=_0x150bf7;return TextManager[_0x2adb5a(0x2ee)](_0x2adb5a(0x37d),_0x2adb5a(0x6c3));},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x332)]=function(){const _0x60643f=_0x150bf7;return TextManager['getInputButtonString'](_0x60643f(0x36a));},Scene_Base[_0x150bf7(0x8e0)]['buttonAssistKey3']=function(){const _0xd9dd8b=_0x150bf7;return TextManager[_0xd9dd8b(0x246)](_0xd9dd8b(0x4f2));},Scene_Base['prototype'][_0x150bf7(0x6ab)]=function(){const _0x597631=_0x150bf7;return TextManager[_0x597631(0x246)]('ok');},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x2b7)]=function(){const _0x1efbd9=_0x150bf7;return TextManager[_0x1efbd9(0x246)](_0x1efbd9(0x2b1));},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x20d)]=function(){const _0x2e4f54=_0x150bf7;return this['_pageupButton']&&this[_0x2e4f54(0x6a7)][_0x2e4f54(0x814)]?TextManager[_0x2e4f54(0x1bd)]:'';},Scene_Base['prototype'][_0x150bf7(0x443)]=function(){return'';},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x6ce)]=function(){return'';},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x3ce)]=function(){const _0x155ec4=_0x150bf7;return TextManager[_0x155ec4(0x198)];},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x612)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x150bf7(0x8e0)]['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x150bf7(0x8e0)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x19e)]=function(){return 0x0;},Scene_Base['prototype'][_0x150bf7(0x608)]=function(){return 0x0;},Scene_Base[_0x150bf7(0x8e0)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x460)]=Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x7ac)],Scene_Boot['prototype'][_0x150bf7(0x7ac)]=function(){const _0x3f00e5=_0x150bf7;VisuMZ['CoreEngine'][_0x3f00e5(0x460)]['call'](this),this[_0x3f00e5(0x415)]();},Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x415)]=function(){const _0x4b2a7c=_0x150bf7,_0x3e8cdd=[_0x4b2a7c(0x7b0),_0x4b2a7c(0x250),_0x4b2a7c(0x86f),'characters',_0x4b2a7c(0x7ee),_0x4b2a7c(0x47b),'parallaxes','pictures',_0x4b2a7c(0x6c2),_0x4b2a7c(0x4f6),_0x4b2a7c(0x192),_0x4b2a7c(0x656),_0x4b2a7c(0x538),_0x4b2a7c(0x8c7)];for(const _0x12dc4f of _0x3e8cdd){if('RtflW'!=='RtflW')return _0x164985[_0x4b2a7c(0x749)][_0x4b2a7c(0x6c0)][_0x4b2a7c(0x697)](this);else{const _0x32e603=VisuMZ[_0x4b2a7c(0x7d0)]['Settings'][_0x4b2a7c(0x80e)][_0x12dc4f],_0x27f4d1=_0x4b2a7c(0x7fd)[_0x4b2a7c(0x322)](_0x12dc4f);for(const _0x2e8e6c of _0x32e603){'Zvzdm'===_0x4b2a7c(0x4cd)?ImageManager[_0x4b2a7c(0x4c8)](_0x27f4d1,_0x2e8e6c):_0x53a260+=_0x292daa[_0x4b2a7c(0x8e0)][_0x4b2a7c(0x60b)]();}}}},VisuMZ[_0x150bf7(0x7d0)]['Scene_Boot_startNormalGame']=Scene_Boot['prototype'][_0x150bf7(0x8e1)],Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x8e1)]=function(){const _0x483253=_0x150bf7;Utils[_0x483253(0x248)](_0x483253(0x80d))&&VisuMZ[_0x483253(0x7d0)][_0x483253(0x486)]['QoL'][_0x483253(0x83d)]?'gLrpE'===_0x483253(0x520)?this['startAutoNewGame']():this[_0x483253(0x799)]():VisuMZ['CoreEngine']['Scene_Boot_startNormalGame'][_0x483253(0x697)](this);},Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x829)]=function(){const _0x398e6a=_0x150bf7;DataManager[_0x398e6a(0x19d)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x827)]=function(){const _0x4166c8=_0x150bf7,_0x2bd644=$dataSystem[_0x4166c8(0x759)][_0x4166c8(0x800)],_0x53843d=$dataSystem['advanced'][_0x4166c8(0x4dc)],_0x15975d=VisuMZ[_0x4166c8(0x7d0)][_0x4166c8(0x486)]['UI']['BoxMargin'];Graphics['boxWidth']=_0x2bd644-_0x15975d*0x2,Graphics['boxHeight']=_0x53843d-_0x15975d*0x2,this[_0x4166c8(0x5ff)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x532)]=Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x2c9)],Scene_Boot['prototype'][_0x150bf7(0x2c9)]=function(){const _0x53544d=_0x150bf7;if(this[_0x53544d(0x7c9)]()){if(_0x53544d(0x25f)===_0x53544d(0x38a)){const _0x3db8f4=_0x67e25a['CoreEngine'][_0x53544d(0x486)][_0x53544d(0x1de)];this[_0x53544d(0x729)]=_0x3db8f4?.[_0x53544d(0x65a)]||_0x53544d(0x272);}else this['makeDocumentTitle']();}else VisuMZ[_0x53544d(0x7d0)][_0x53544d(0x532)][_0x53544d(0x697)](this);},Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x7c9)]=function(){const _0x5eb88a=_0x150bf7;if(Scene_Title[_0x5eb88a(0x7de)]==='')return![];if(Scene_Title[_0x5eb88a(0x7de)]===_0x5eb88a(0x1cc))return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x5eb88a(0x15f)]===_0x5eb88a(0x334))return![];return!![];},Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x1f6)]=function(){const _0x9e40d6=_0x150bf7,_0x184a81=$dataSystem[_0x9e40d6(0x55b)],_0x1e09f8=Scene_Title[_0x9e40d6(0x7de)]||'',_0x2e31e2=Scene_Title[_0x9e40d6(0x15f)]||'',_0x16f159=VisuMZ[_0x9e40d6(0x7d0)][_0x9e40d6(0x486)][_0x9e40d6(0x708)]['Title'][_0x9e40d6(0x29d)],_0x22a60c=_0x16f159[_0x9e40d6(0x322)](_0x184a81,_0x1e09f8,_0x2e31e2);document[_0x9e40d6(0x6f4)]=_0x22a60c;},Scene_Boot[_0x150bf7(0x8e0)][_0x150bf7(0x5ff)]=function(){const _0x1046a9=_0x150bf7;if(VisuMZ[_0x1046a9(0x7d0)][_0x1046a9(0x486)]['UI'][_0x1046a9(0x1fe)]){if(_0x1046a9(0x49a)===_0x1046a9(0x67d))this['isUseModernControls']()?(this['processCursorMoveModernControls'](),this[_0x1046a9(0x862)]()):_0x377731[_0x1046a9(0x7d0)][_0x1046a9(0x821)][_0x1046a9(0x697)](this);else{const _0x438065=Graphics['width']-Graphics['boxWidth']-VisuMZ['CoreEngine'][_0x1046a9(0x486)]['UI'][_0x1046a9(0x67f)]*0x2,_0xd7cb7e=Sprite_Button[_0x1046a9(0x8e0)][_0x1046a9(0x568)][_0x1046a9(0x697)](this)*0x4;if(_0x438065>=_0xd7cb7e)SceneManager['setSideButtonLayout'](!![]);}}},Scene_Title[_0x150bf7(0x7de)]=VisuMZ['CoreEngine'][_0x150bf7(0x486)]['MenuLayout'][_0x150bf7(0x684)][_0x150bf7(0x1cc)],Scene_Title[_0x150bf7(0x15f)]=VisuMZ[_0x150bf7(0x7d0)]['Settings'][_0x150bf7(0x708)][_0x150bf7(0x684)][_0x150bf7(0x256)],Scene_Title[_0x150bf7(0x56b)]=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)]['TitlePicButtons'],VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x68e)]=Scene_Title['prototype'][_0x150bf7(0x346)],Scene_Title['prototype'][_0x150bf7(0x346)]=function(){const _0x1d1f09=_0x150bf7;VisuMZ[_0x1d1f09(0x7d0)][_0x1d1f09(0x486)][_0x1d1f09(0x708)][_0x1d1f09(0x684)][_0x1d1f09(0x346)]['call'](this);if(Scene_Title[_0x1d1f09(0x7de)]!==''&&Scene_Title[_0x1d1f09(0x7de)]!==_0x1d1f09(0x1cc))this[_0x1d1f09(0x75a)]();if(Scene_Title[_0x1d1f09(0x15f)]!==''&&Scene_Title[_0x1d1f09(0x15f)]!==_0x1d1f09(0x334))this['drawGameVersion']();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0x2010ab=_0x150bf7;VisuMZ[_0x2010ab(0x7d0)][_0x2010ab(0x486)][_0x2010ab(0x708)][_0x2010ab(0x684)][_0x2010ab(0x75a)][_0x2010ab(0x697)](this);},Scene_Title['prototype']['drawGameVersion']=function(){const _0x5de787=_0x150bf7;VisuMZ[_0x5de787(0x7d0)][_0x5de787(0x486)]['MenuLayout'][_0x5de787(0x684)][_0x5de787(0x282)][_0x5de787(0x697)](this);},Scene_Title[_0x150bf7(0x8e0)][_0x150bf7(0x5cc)]=function(){const _0x2dcabc=_0x150bf7;this['createTitleButtons']();const _0x53fd00=$dataSystem[_0x2dcabc(0x553)][_0x2dcabc(0x70b)],_0x5a229b=this[_0x2dcabc(0x535)]();this['_commandWindow']=new Window_TitleCommand(_0x5a229b),this[_0x2dcabc(0x134)][_0x2dcabc(0x34c)](_0x53fd00);const _0x4d53de=this[_0x2dcabc(0x535)]();this[_0x2dcabc(0x134)][_0x2dcabc(0x1fd)](_0x4d53de['x'],_0x4d53de['y'],_0x4d53de[_0x2dcabc(0x14c)],_0x4d53de[_0x2dcabc(0x567)]),this[_0x2dcabc(0x559)](this[_0x2dcabc(0x134)]);},Scene_Title[_0x150bf7(0x8e0)][_0x150bf7(0x13a)]=function(){const _0x400312=_0x150bf7;if(this[_0x400312(0x134)])return this[_0x400312(0x134)][_0x400312(0x466)]();else{if('IDGQq'!==_0x400312(0x308))return VisuMZ['CoreEngine']['Settings'][_0x400312(0x323)][_0x400312(0x452)];else!_0x4b33fb[_0x400312(0x1f1)]()&&this['removeFauxAnimation'](_0xbc9d34);}},Scene_Title[_0x150bf7(0x8e0)][_0x150bf7(0x535)]=function(){const _0x5cfc60=_0x150bf7;return VisuMZ['CoreEngine'][_0x5cfc60(0x486)]['MenuLayout'][_0x5cfc60(0x684)][_0x5cfc60(0x82f)][_0x5cfc60(0x697)](this);},Scene_Title[_0x150bf7(0x8e0)]['createTitleButtons']=function(){const _0x5a07a5=_0x150bf7;for(const _0x4477d6 of Scene_Title[_0x5a07a5(0x56b)]){const _0x3b1e9c=new Sprite_TitlePictureButton(_0x4477d6);this['addChild'](_0x3b1e9c);}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x74f)]=Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)],Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(){const _0x33a8c4=_0x150bf7;VisuMZ[_0x33a8c4(0x7d0)][_0x33a8c4(0x74f)][_0x33a8c4(0x697)](this),$gameTemp[_0x33a8c4(0x6da)](),this[_0x33a8c4(0x4ac)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x461)]=Scene_Map['prototype'][_0x150bf7(0x33a)],Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x33a)]=function(){const _0x20479e=_0x150bf7;VisuMZ[_0x20479e(0x7d0)]['Scene_Map_updateMainMultiply'][_0x20479e(0x697)](this);if($gameTemp[_0x20479e(0x5ea)]&&!$gameMessage[_0x20479e(0x626)]()){if(_0x20479e(0x2db)!=='GtgYr')return 0x1;else this[_0x20479e(0x70d)](),SceneManager[_0x20479e(0x3e0)]();}},Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x622)]=function(){const _0xde7ea3=_0x150bf7;Scene_Message[_0xde7ea3(0x8e0)]['terminate'][_0xde7ea3(0x697)](this),!SceneManager[_0xde7ea3(0x6c9)](Scene_Battle)&&(this[_0xde7ea3(0x479)][_0xde7ea3(0x5cd)](),this[_0xde7ea3(0x27c)]['hide'](),this[_0xde7ea3(0x356)]['visible']=![],SceneManager[_0xde7ea3(0x6a9)]()),$gameScreen[_0xde7ea3(0x78a)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x72d)]=Scene_Map[_0x150bf7(0x8e0)]['createMenuButton'],Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x62d)]=function(){const _0x295743=_0x150bf7;VisuMZ[_0x295743(0x7d0)]['Scene_Map_createMenuButton'][_0x295743(0x697)](this),SceneManager[_0x295743(0x50b)]()&&this[_0x295743(0x433)]();},Scene_Map[_0x150bf7(0x8e0)]['moveMenuButtonSideButtonLayout']=function(){const _0x4809fd=_0x150bf7;this[_0x4809fd(0x783)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x150bf7(0x7d0)]['Scene_Map_updateScene']=Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x29f)],Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x29f)]=function(){const _0x3da94c=_0x150bf7;VisuMZ['CoreEngine']['Scene_Map_updateScene'][_0x3da94c(0x697)](this),this['updateDashToggle']();},Scene_Map[_0x150bf7(0x8e0)]['updateDashToggle']=function(){const _0x41ce84=_0x150bf7;Input['isTriggered']('dashToggle')&&(ConfigManager[_0x41ce84(0x712)]=!ConfigManager[_0x41ce84(0x712)],ConfigManager['save']());},VisuMZ['CoreEngine']['Scene_Map_updateMain']=Scene_Map['prototype']['updateMain'],Scene_Map[_0x150bf7(0x8e0)]['updateMain']=function(){const _0x293398=_0x150bf7;VisuMZ[_0x293398(0x7d0)][_0x293398(0x4a5)][_0x293398(0x697)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x4ac)]=function(){const _0x5ad7f6=_0x150bf7;this[_0x5ad7f6(0x5fa)]=[];},Scene_Map['prototype'][_0x150bf7(0x237)]=function(){const _0x30ae8d=_0x150bf7;if(!this[_0x30ae8d(0x5fa)])return;for(const _0x18f0b8 of this['_onceParallelInterpreters']){if(_0x18f0b8){if('fAKEz'==='fAKEz')_0x18f0b8['update']();else{var _0x28693d=_0x5dfaf5(_0x2785d4['$1'])/0x64;_0x501a80+=_0x28693d;}}}},Scene_Map['prototype'][_0x150bf7(0x79d)]=function(_0x305dcd){const _0x37821c=_0x150bf7,_0x48deba=$dataCommonEvents[_0x305dcd];if(!_0x48deba)return;const _0x39f17f=new Game_OnceParallelInterpreter();this[_0x37821c(0x84e)](_0x39f17f),_0x39f17f[_0x37821c(0x3ca)](_0x305dcd);},Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x84e)]=function(_0x48b8e7){const _0x3e7ef3=_0x150bf7;this['_onceParallelInterpreters']=this[_0x3e7ef3(0x5fa)]||[],this['_onceParallelInterpreters'][_0x3e7ef3(0x4c5)](_0x48b8e7);},Scene_Map[_0x150bf7(0x8e0)][_0x150bf7(0x7e4)]=function(_0x1da2e6){const _0x2de4bd=_0x150bf7;this[_0x2de4bd(0x5fa)]=this[_0x2de4bd(0x5fa)]||[],this[_0x2de4bd(0x5fa)]['remove'](_0x1da2e6);};function Game_OnceParallelInterpreter(){const _0x343c89=_0x150bf7;this[_0x343c89(0x8aa)](...arguments);}Game_OnceParallelInterpreter[_0x150bf7(0x8e0)]=Object[_0x150bf7(0x4e6)](Game_Interpreter['prototype']),Game_OnceParallelInterpreter[_0x150bf7(0x8e0)][_0x150bf7(0x771)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x150bf7(0x8e0)]['setCommonEvent']=function(_0x378a3b){const _0x412c54=_0x150bf7,_0x2fdc28=$dataCommonEvents[_0x378a3b];_0x2fdc28?_0x412c54(0x230)!==_0x412c54(0x230)?_0x58b289(_0x412c54(0x2ae)[_0x412c54(0x322)](_0x270ad5)):this[_0x412c54(0x136)](_0x2fdc28['list'],0x0):this[_0x412c54(0x622)]();},Game_OnceParallelInterpreter[_0x150bf7(0x8e0)][_0x150bf7(0x622)]=function(){const _0x239f39=_0x150bf7;if(!SceneManager[_0x239f39(0x746)]())return;SceneManager[_0x239f39(0x71e)][_0x239f39(0x7e4)](this),Game_Interpreter[_0x239f39(0x8e0)][_0x239f39(0x622)][_0x239f39(0x697)](this);},VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x73d)],Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x73d)]=function(){const _0x3986b8=_0x150bf7;let _0x30fb20=0x0;if(SceneManager[_0x3986b8(0x361)]()){if(_0x3986b8(0x215)===_0x3986b8(0x306))return this[_0x3986b8(0x154)]();else _0x30fb20=this[_0x3986b8(0x3fe)]();}else _0x30fb20=VisuMZ[_0x3986b8(0x7d0)][_0x3986b8(0x6f0)]['call'](this);return this[_0x3986b8(0x7f7)]()&&this['getButtonAssistLocation']()===_0x3986b8(0x381)&&(_0x30fb20+=Window_ButtonAssist['prototype']['lineHeight']()),_0x30fb20;},Scene_MenuBase[_0x150bf7(0x8e0)]['helpAreaTopSideButtonLayout']=function(){const _0x99bbb5=_0x150bf7;if(this[_0x99bbb5(0x171)]()){if(_0x99bbb5(0x2e6)==='ZbJwC')this[_0x99bbb5(0x85c)]=_0x99bbb5(0x1b6);else return this[_0x99bbb5(0x721)]();}else return 0x0;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x328)]=Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x5f3)],Scene_MenuBase[_0x150bf7(0x8e0)]['mainAreaTop']=function(){const _0x10e386=_0x150bf7;if(SceneManager[_0x10e386(0x361)]()){if(_0x10e386(0x77d)!==_0x10e386(0x507))return this[_0x10e386(0x154)]();else{let _0x588519='param'+_0x1fa29d+_0x10e386(0x694);if(this[_0x10e386(0x283)](_0x588519))return this['_cache'][_0x588519];return this['_cache'][_0x588519]=_0x5e0789[_0x10e386(0x469)](_0x4cbe63[_0x10e386(0x7d0)][_0x10e386(0x486)][_0x10e386(0x6b9)]['BasicParameterFormula'][_0x10e386(0x697)](this,_0x44af0d)),this[_0x10e386(0x44f)][_0x588519];}}else return _0x10e386(0x84a)==='crCFw'?VisuMZ[_0x10e386(0x7d0)][_0x10e386(0x328)][_0x10e386(0x697)](this):_0x4c5501[_0x10e386(0x361)]()?this['mainAreaTopSideButtonLayout']():_0x199a0d[_0x10e386(0x7d0)][_0x10e386(0x328)][_0x10e386(0x697)](this);},Scene_MenuBase['prototype'][_0x150bf7(0x154)]=function(){const _0x5d6f6d=_0x150bf7;return!this[_0x5d6f6d(0x171)]()?this['helpAreaBottom']():0x0;},VisuMZ[_0x150bf7(0x7d0)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x34f)],Scene_MenuBase['prototype'][_0x150bf7(0x34f)]=function(){const _0x241f75=_0x150bf7;let _0x196045=0x0;if(SceneManager[_0x241f75(0x361)]())_0x196045=this['mainAreaHeightSideButtonLayout']();else{if(_0x241f75(0x7ec)===_0x241f75(0x3d6))return _0x51083d;else _0x196045=VisuMZ[_0x241f75(0x7d0)][_0x241f75(0x278)]['call'](this);}return this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()!==_0x241f75(0x2e0)&&(_0x241f75(0x35b)!==_0x241f75(0x8cc)?_0x196045-=Window_ButtonAssist[_0x241f75(0x8e0)]['lineHeight']():_0x5a9ff9[_0x241f75(0x7d0)]['Sprite_Actor_setActorHome'][_0x241f75(0x697)](this,_0x5bf4ac)),_0x196045;},Scene_MenuBase[_0x150bf7(0x8e0)]['mainAreaHeightSideButtonLayout']=function(){const _0x52dd56=_0x150bf7;return Graphics[_0x52dd56(0x336)]-this['helpAreaHeight']();},VisuMZ['CoreEngine'][_0x150bf7(0x698)]=Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x30f)],Scene_MenuBase[_0x150bf7(0x8e0)]['createBackground']=function(){const _0x458d9c=_0x150bf7;this[_0x458d9c(0x554)]=new PIXI[(_0x458d9c(0x218))][(_0x458d9c(0x4d0))](clamp=!![]),this[_0x458d9c(0x84b)]=new Sprite(),this[_0x458d9c(0x84b)]['bitmap']=SceneManager[_0x458d9c(0x4d7)](),this[_0x458d9c(0x84b)][_0x458d9c(0x218)]=[this[_0x458d9c(0x554)]],this[_0x458d9c(0x5a8)](this[_0x458d9c(0x84b)]),this[_0x458d9c(0x7bc)](0xc0),this[_0x458d9c(0x7bc)](this[_0x458d9c(0x1be)]()),this[_0x458d9c(0x3ab)]();},Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x1be)]=function(){const _0x5942ac=_0x150bf7,_0x287a8c=String(this[_0x5942ac(0x771)]['name']),_0x47ed76=this[_0x5942ac(0x88b)](_0x287a8c);if(_0x47ed76){if(_0x5942ac(0x260)===_0x5942ac(0x260))return _0x47ed76['SnapshotOpacity'];else _0x7093b0['CoreEngine'][_0x5942ac(0x2b3)][_0x5942ac(0x697)](this,_0x27cfc0);}else return 0xc0;},Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x3ab)]=function(){const _0x16d9d5=_0x150bf7,_0x256752=String(this[_0x16d9d5(0x771)]['name']),_0x255a35=this[_0x16d9d5(0x88b)](_0x256752);_0x255a35&&(_0x255a35[_0x16d9d5(0x881)]!==''||_0x255a35['BgFilename2']!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x16d9d5(0x4e8)](_0x255a35[_0x16d9d5(0x881)])),this[_0x16d9d5(0x4ee)]=new Sprite(ImageManager['loadTitle2'](_0x255a35['BgFilename2'])),this[_0x16d9d5(0x5a8)](this[_0x16d9d5(0x8c3)]),this[_0x16d9d5(0x5a8)](this[_0x16d9d5(0x4ee)]),this[_0x16d9d5(0x8c3)][_0x16d9d5(0x219)][_0x16d9d5(0x765)](this['adjustSprite'][_0x16d9d5(0x45b)](this,this['_backSprite1'])),this[_0x16d9d5(0x4ee)][_0x16d9d5(0x219)][_0x16d9d5(0x765)](this[_0x16d9d5(0x4a2)][_0x16d9d5(0x45b)](this,this[_0x16d9d5(0x4ee)])));},Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x88b)]=function(_0x433a91){const _0x559700=_0x150bf7;return VisuMZ['CoreEngine']['Settings'][_0x559700(0x726)][_0x433a91]||VisuMZ[_0x559700(0x7d0)][_0x559700(0x486)]['MenuBg'][_0x559700(0x457)];},Scene_MenuBase[_0x150bf7(0x8e0)]['adjustSprite']=function(_0x4db4f7){const _0x53f1f5=_0x150bf7;this[_0x53f1f5(0x61e)](_0x4db4f7),this[_0x53f1f5(0x774)](_0x4db4f7);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x909)]=Scene_MenuBase['prototype'][_0x150bf7(0x6a3)],Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x6a3)]=function(){const _0x4413cc=_0x150bf7;VisuMZ[_0x4413cc(0x7d0)][_0x4413cc(0x909)][_0x4413cc(0x697)](this);if(SceneManager[_0x4413cc(0x50b)]()){if(_0x4413cc(0x816)!==_0x4413cc(0x8f0))this[_0x4413cc(0x24d)]();else return _0x393051['layoutSettings'][_0x4413cc(0x454)]['call'](this);}},Scene_MenuBase['prototype'][_0x150bf7(0x24d)]=function(){const _0x572aae=_0x150bf7;this[_0x572aae(0x5b4)]['x']=Graphics[_0x572aae(0x8f9)]+0x4;},VisuMZ[_0x150bf7(0x7d0)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x8d4)],Scene_MenuBase[_0x150bf7(0x8e0)]['createPageButtons']=function(){const _0x25a085=_0x150bf7;VisuMZ[_0x25a085(0x7d0)][_0x25a085(0x305)][_0x25a085(0x697)](this),SceneManager['isSideButtonLayout']()&&this[_0x25a085(0x296)]();},Scene_MenuBase[_0x150bf7(0x8e0)]['movePageButtonSideButtonLayout']=function(){const _0x166294=_0x150bf7;this[_0x166294(0x6a7)]['x']=-0x1*(this[_0x166294(0x6a7)][_0x166294(0x14c)]+this['_pagedownButton'][_0x166294(0x14c)]+0x8),this[_0x166294(0x2bf)]['x']=-0x1*(this[_0x166294(0x2bf)]['width']+0x4);},Scene_MenuBase['prototype']['isMenuButtonAssistEnabled']=function(){const _0x5ceb2d=_0x150bf7;return VisuMZ[_0x5ceb2d(0x7d0)][_0x5ceb2d(0x486)]['ButtonAssist']['Enable'];},Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x62a)]=function(){const _0x2033a5=_0x150bf7;if(SceneManager['isSideButtonLayout']()||SceneManager[_0x2033a5(0x168)]()){if(_0x2033a5(0x81e)==='SxpnQ')return VisuMZ['CoreEngine'][_0x2033a5(0x486)][_0x2033a5(0x5eb)]['Location'];else{if(!_0x266169[_0x2033a5(0x7df)]())return;if(!_0x448cde[_0x2033a5(0x2d6)]())return;_0x157f04[_0x2033a5(0x71e)][_0x2033a5(0x1bc)]=![],_0x34066a['CoreEngine'][_0x2033a5(0x753)]();}}else return _0x2033a5(0x2e0);},Scene_MenuBase[_0x150bf7(0x8e0)][_0x150bf7(0x6ae)]=function(){const _0x355c23=_0x150bf7;if(!this[_0x355c23(0x7f7)]())return;const _0x285cd3=this['buttonAssistWindowRect']();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x285cd3),this[_0x355c23(0x559)](this[_0x355c23(0x739)]);},Scene_MenuBase['prototype'][_0x150bf7(0x24a)]=function(){const _0x17a83c=_0x150bf7;return this['getButtonAssistLocation']()===_0x17a83c(0x2e0)?this[_0x17a83c(0x4fc)]():_0x17a83c(0x719)==='OOgRw'?this[_0x17a83c(0x318)]():0x0;},Scene_MenuBase['prototype']['buttonAssistWindowButtonRect']=function(){const _0x226a74=_0x150bf7,_0x52da18=ConfigManager['touchUI']?(Sprite_Button[_0x226a74(0x8e0)]['blockWidth']()+0x6)*0x2:0x0,_0x389fca=this[_0x226a74(0x667)](),_0x2cc895=Graphics[_0x226a74(0x8f9)]-_0x52da18*0x2,_0x265636=this[_0x226a74(0x752)]();return new Rectangle(_0x52da18,_0x389fca,_0x2cc895,_0x265636);},Scene_MenuBase['prototype'][_0x150bf7(0x318)]=function(){const _0x51bdd7=_0x150bf7,_0x1c3f6d=Graphics[_0x51bdd7(0x8f9)],_0x3d3064=Window_ButtonAssist[_0x51bdd7(0x8e0)][_0x51bdd7(0x60b)](),_0x261854=0x0;let _0x32141e=0x0;return this[_0x51bdd7(0x62a)]()===_0x51bdd7(0x381)?_0x32141e=0x0:_0x51bdd7(0x75c)!==_0x51bdd7(0x4a4)?_0x32141e=Graphics['boxHeight']-_0x3d3064:(_0x219aee[_0x51bdd7(0x7d0)]['Game_Temp_initialize'][_0x51bdd7(0x697)](this),this[_0x51bdd7(0x3fd)](),this[_0x51bdd7(0x5d0)](),this[_0x51bdd7(0x4bb)]()),new Rectangle(_0x261854,_0x32141e,_0x1c3f6d,_0x3d3064);},Scene_Menu[_0x150bf7(0x749)]=VisuMZ['CoreEngine'][_0x150bf7(0x486)][_0x150bf7(0x708)][_0x150bf7(0x679)],VisuMZ['CoreEngine'][_0x150bf7(0x160)]=Scene_Menu[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)],Scene_Menu[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)]=function(){const _0x565461=_0x150bf7;VisuMZ[_0x565461(0x7d0)][_0x565461(0x160)][_0x565461(0x697)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x150bf7(0x8e0)][_0x150bf7(0x437)]=function(){const _0x9bc2a6=_0x150bf7;if(this['_commandWindow']){if(_0x9bc2a6(0x393)!==_0x9bc2a6(0x635))this[_0x9bc2a6(0x134)][_0x9bc2a6(0x34c)](Scene_Menu['layoutSettings'][_0x9bc2a6(0x6db)]);else return _0x52d3e1[_0x9bc2a6(0x7d0)][_0x9bc2a6(0x7d7)][_0x9bc2a6(0x697)](this,_0x2ecf82);}this[_0x9bc2a6(0x72a)]&&this['_goldWindow'][_0x9bc2a6(0x34c)](Scene_Menu[_0x9bc2a6(0x749)]['GoldBgType']),this[_0x9bc2a6(0x11d)]&&(_0x9bc2a6(0x647)==='GOyuH'?this[_0x9bc2a6(0x5b4)]['y']=0x0:this['_statusWindow'][_0x9bc2a6(0x34c)](Scene_Menu[_0x9bc2a6(0x749)][_0x9bc2a6(0x129)]));},Scene_Menu[_0x150bf7(0x8e0)][_0x150bf7(0x535)]=function(){const _0x417423=_0x150bf7;return Scene_Menu['layoutSettings'][_0x417423(0x82f)][_0x417423(0x697)](this);},Scene_Menu['prototype'][_0x150bf7(0x442)]=function(){return Scene_Menu['layoutSettings']['GoldRect']['call'](this);},Scene_Menu[_0x150bf7(0x8e0)][_0x150bf7(0x41c)]=function(){const _0x4e5de2=_0x150bf7;return Scene_Menu[_0x4e5de2(0x749)][_0x4e5de2(0x6c0)][_0x4e5de2(0x697)](this);},Scene_Item[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)]['Settings'][_0x150bf7(0x708)][_0x150bf7(0x776)],VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x8b4)]=Scene_Item[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)],Scene_Item[_0x150bf7(0x8e0)]['create']=function(){const _0xda91e=_0x150bf7;VisuMZ['CoreEngine']['Scene_Item_create'][_0xda91e(0x697)](this),this[_0xda91e(0x437)]();},Scene_Item[_0x150bf7(0x8e0)][_0x150bf7(0x437)]=function(){const _0x2436bd=_0x150bf7;this[_0x2436bd(0x71b)]&&this[_0x2436bd(0x71b)][_0x2436bd(0x34c)](Scene_Item['layoutSettings']['HelpBgType']),this[_0x2436bd(0x769)]&&this['_categoryWindow'][_0x2436bd(0x34c)](Scene_Item[_0x2436bd(0x749)][_0x2436bd(0x718)]),this[_0x2436bd(0x28f)]&&this[_0x2436bd(0x28f)][_0x2436bd(0x34c)](Scene_Item[_0x2436bd(0x749)][_0x2436bd(0x6d8)]),this[_0x2436bd(0x459)]&&this[_0x2436bd(0x459)][_0x2436bd(0x34c)](Scene_Item[_0x2436bd(0x749)][_0x2436bd(0x772)]);},Scene_Item['prototype'][_0x150bf7(0x4b1)]=function(){const _0x2064b3=_0x150bf7;return Scene_Item[_0x2064b3(0x749)][_0x2064b3(0x4eb)][_0x2064b3(0x697)](this);},Scene_Item['prototype'][_0x150bf7(0x6e0)]=function(){const _0x2f5761=_0x150bf7;return Scene_Item[_0x2f5761(0x749)]['CategoryRect'][_0x2f5761(0x697)](this);},Scene_Item[_0x150bf7(0x8e0)][_0x150bf7(0x1bb)]=function(){const _0x5175f4=_0x150bf7;return Scene_Item['layoutSettings']['ItemRect'][_0x5175f4(0x697)](this);},Scene_Item[_0x150bf7(0x8e0)][_0x150bf7(0x524)]=function(){const _0x11f890=_0x150bf7;return Scene_Item[_0x11f890(0x749)][_0x11f890(0x873)][_0x11f890(0x697)](this);},Scene_Skill[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)]['MenuLayout'][_0x150bf7(0x63b)],VisuMZ['CoreEngine'][_0x150bf7(0x120)]=Scene_Skill[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)],Scene_Skill[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)]=function(){const _0x1c0970=_0x150bf7;VisuMZ['CoreEngine']['Scene_Skill_create'][_0x1c0970(0x697)](this),this[_0x1c0970(0x437)]();},Scene_Skill[_0x150bf7(0x8e0)][_0x150bf7(0x437)]=function(){const _0x363066=_0x150bf7;this[_0x363066(0x71b)]&&(_0x363066(0x32d)==='UsSYb'?this[_0x363066(0x71b)][_0x363066(0x34c)](Scene_Skill['layoutSettings'][_0x363066(0x1ff)]):this['processKeyboardEnd']());this['_skillTypeWindow']&&this['_skillTypeWindow'][_0x363066(0x34c)](Scene_Skill[_0x363066(0x749)][_0x363066(0x377)]);this['_statusWindow']&&this['_statusWindow'][_0x363066(0x34c)](Scene_Skill[_0x363066(0x749)][_0x363066(0x129)]);this[_0x363066(0x28f)]&&this[_0x363066(0x28f)][_0x363066(0x34c)](Scene_Skill[_0x363066(0x749)]['ItemBgType']);if(this[_0x363066(0x459)]){if('nyaCK'!=='MZOBO')this[_0x363066(0x459)][_0x363066(0x34c)](Scene_Skill['layoutSettings']['ActorBgType']);else return _0x3c9aa8=_0x538fe8(_0x29b833),this[_0x363066(0x7e8)]=this['_colorCache']||{},_0x26561e[_0x363066(0x60c)](/#(.*)/i)?this[_0x363066(0x7e8)][_0x50fefd]='#%1'[_0x363066(0x322)](_0xdaefaa(_0x357a4f['$1'])):this[_0x363066(0x7e8)][_0x560a0c]=this[_0x363066(0x420)](_0x3ef2ab(_0x29941f)),this['_colorCache'][_0x2f0179];}},Scene_Skill[_0x150bf7(0x8e0)][_0x150bf7(0x4b1)]=function(){const _0x4ca81e=_0x150bf7;return Scene_Skill['layoutSettings'][_0x4ca81e(0x4eb)]['call'](this);},Scene_Skill[_0x150bf7(0x8e0)][_0x150bf7(0x7d6)]=function(){const _0xd297ce=_0x150bf7;return Scene_Skill[_0xd297ce(0x749)]['SkillTypeRect'][_0xd297ce(0x697)](this);},Scene_Skill['prototype'][_0x150bf7(0x41c)]=function(){const _0x5f02aa=_0x150bf7;return Scene_Skill['layoutSettings'][_0x5f02aa(0x6c0)][_0x5f02aa(0x697)](this);},Scene_Skill[_0x150bf7(0x8e0)]['itemWindowRect']=function(){const _0x2a5517=_0x150bf7;return Scene_Skill[_0x2a5517(0x749)][_0x2a5517(0x454)][_0x2a5517(0x697)](this);},Scene_Skill[_0x150bf7(0x8e0)][_0x150bf7(0x524)]=function(){const _0x2fc5f6=_0x150bf7;return Scene_Skill['layoutSettings'][_0x2fc5f6(0x873)]['call'](this);},Scene_Equip[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)][_0x150bf7(0x708)]['EquipMenu'],VisuMZ['CoreEngine'][_0x150bf7(0x2e3)]=Scene_Equip['prototype']['create'],Scene_Equip[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)]=function(){const _0x3744a6=_0x150bf7;VisuMZ['CoreEngine'][_0x3744a6(0x2e3)][_0x3744a6(0x697)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype'][_0x150bf7(0x437)]=function(){const _0x4dbccf=_0x150bf7;this[_0x4dbccf(0x71b)]&&this[_0x4dbccf(0x71b)][_0x4dbccf(0x34c)](Scene_Equip[_0x4dbccf(0x749)][_0x4dbccf(0x1ff)]),this['_statusWindow']&&this[_0x4dbccf(0x11d)][_0x4dbccf(0x34c)](Scene_Equip[_0x4dbccf(0x749)]['StatusBgType']),this[_0x4dbccf(0x134)]&&this[_0x4dbccf(0x134)][_0x4dbccf(0x34c)](Scene_Equip['layoutSettings'][_0x4dbccf(0x6db)]),this['_slotWindow']&&this[_0x4dbccf(0x2f1)][_0x4dbccf(0x34c)](Scene_Equip[_0x4dbccf(0x749)]['SlotBgType']),this[_0x4dbccf(0x28f)]&&this[_0x4dbccf(0x28f)][_0x4dbccf(0x34c)](Scene_Equip[_0x4dbccf(0x749)][_0x4dbccf(0x6d8)]);},Scene_Equip['prototype'][_0x150bf7(0x4b1)]=function(){const _0x3358fc=_0x150bf7;return Scene_Equip[_0x3358fc(0x749)]['HelpRect'][_0x3358fc(0x697)](this);},Scene_Equip[_0x150bf7(0x8e0)][_0x150bf7(0x41c)]=function(){const _0x449abd=_0x150bf7;return Scene_Equip[_0x449abd(0x749)][_0x449abd(0x6c0)][_0x449abd(0x697)](this);},Scene_Equip[_0x150bf7(0x8e0)]['commandWindowRect']=function(){const _0x3d8517=_0x150bf7;return Scene_Equip['layoutSettings']['CommandRect'][_0x3d8517(0x697)](this);},Scene_Equip['prototype'][_0x150bf7(0x8a6)]=function(){const _0xc6823=_0x150bf7;return Scene_Equip[_0xc6823(0x749)][_0xc6823(0x2ab)][_0xc6823(0x697)](this);},Scene_Equip[_0x150bf7(0x8e0)][_0x150bf7(0x1bb)]=function(){const _0x5760a0=_0x150bf7;return Scene_Equip[_0x5760a0(0x749)][_0x5760a0(0x454)]['call'](this);},Scene_Status[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)]['MenuLayout'][_0x150bf7(0x76f)],VisuMZ[_0x150bf7(0x7d0)]['Scene_Status_create']=Scene_Status[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)],Scene_Status['prototype'][_0x150bf7(0x4e6)]=function(){const _0x12c5f6=_0x150bf7;VisuMZ[_0x12c5f6(0x7d0)]['Scene_Status_create'][_0x12c5f6(0x697)](this),this[_0x12c5f6(0x437)]();},Scene_Status[_0x150bf7(0x8e0)][_0x150bf7(0x437)]=function(){const _0x1cdfc8=_0x150bf7;this['_profileWindow']&&this[_0x1cdfc8(0x557)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x1cdfc8(0x11a)]),this[_0x1cdfc8(0x11d)]&&this['_statusWindow'][_0x1cdfc8(0x34c)](Scene_Status['layoutSettings'][_0x1cdfc8(0x129)]),this[_0x1cdfc8(0x53d)]&&this[_0x1cdfc8(0x53d)]['setBackgroundType'](Scene_Status[_0x1cdfc8(0x749)][_0x1cdfc8(0x390)]),this[_0x1cdfc8(0x470)]&&this[_0x1cdfc8(0x470)][_0x1cdfc8(0x34c)](Scene_Status[_0x1cdfc8(0x749)][_0x1cdfc8(0x2f7)]);},Scene_Status[_0x150bf7(0x8e0)][_0x150bf7(0x7d5)]=function(){const _0x36878e=_0x150bf7;return Scene_Status[_0x36878e(0x749)][_0x36878e(0x912)][_0x36878e(0x697)](this);},Scene_Status[_0x150bf7(0x8e0)][_0x150bf7(0x41c)]=function(){const _0x4dcbcc=_0x150bf7;return Scene_Status[_0x4dcbcc(0x749)][_0x4dcbcc(0x6c0)]['call'](this);},Scene_Status[_0x150bf7(0x8e0)][_0x150bf7(0x542)]=function(){const _0x1341eb=_0x150bf7;return Scene_Status[_0x1341eb(0x749)]['StatusParamsRect'][_0x1341eb(0x697)](this);},Scene_Status[_0x150bf7(0x8e0)][_0x150bf7(0x710)]=function(){const _0x23b6e6=_0x150bf7;return Scene_Status[_0x23b6e6(0x749)][_0x23b6e6(0x1a4)][_0x23b6e6(0x697)](this);},Scene_Options[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)]['Settings'][_0x150bf7(0x708)][_0x150bf7(0x162)],VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x1bf)]=Scene_Options['prototype'][_0x150bf7(0x4e6)],Scene_Options['prototype']['create']=function(){const _0x3c10ba=_0x150bf7;VisuMZ[_0x3c10ba(0x7d0)][_0x3c10ba(0x1bf)][_0x3c10ba(0x697)](this),this[_0x3c10ba(0x437)]();},Scene_Options[_0x150bf7(0x8e0)]['setCoreEngineUpdateWindowBg']=function(){const _0x397776=_0x150bf7;this[_0x397776(0x64e)]&&this[_0x397776(0x64e)][_0x397776(0x34c)](Scene_Options['layoutSettings'][_0x397776(0x16b)]);},Scene_Options[_0x150bf7(0x8e0)][_0x150bf7(0x4ec)]=function(){const _0xbc810e=_0x150bf7;return Scene_Options[_0xbc810e(0x749)][_0xbc810e(0x859)]['call'](this);},Scene_Save[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)][_0x150bf7(0x708)][_0x150bf7(0x57b)],Scene_Save['prototype'][_0x150bf7(0x4e6)]=function(){const _0x327b8e=_0x150bf7;Scene_File['prototype'][_0x327b8e(0x4e6)][_0x327b8e(0x697)](this),this[_0x327b8e(0x437)]();},Scene_Save[_0x150bf7(0x8e0)][_0x150bf7(0x437)]=function(){const _0x1c557e=_0x150bf7;this[_0x1c557e(0x71b)]&&(_0x1c557e(0x2e9)!==_0x1c557e(0x11f)?this[_0x1c557e(0x71b)][_0x1c557e(0x34c)](Scene_Save[_0x1c557e(0x749)][_0x1c557e(0x1ff)]):(_0xa3ff27[_0x1c557e(0x7d0)]['Bitmap_resize'][_0x1c557e(0x697)](this,_0x199e5b,_0x5a6561),this['markCoreEngineModified']())),this[_0x1c557e(0x69b)]&&(_0x1c557e(0x41b)!=='aKxGm'?this[_0x1c557e(0x69b)][_0x1c557e(0x34c)](Scene_Save[_0x1c557e(0x749)][_0x1c557e(0x189)]):_0x10e64b(_0x3803e8));},Scene_Save[_0x150bf7(0x8e0)][_0x150bf7(0x4b1)]=function(){const _0x51b409=_0x150bf7;return Scene_Save['layoutSettings'][_0x51b409(0x4eb)][_0x51b409(0x697)](this);},Scene_Save['prototype']['listWindowRect']=function(){const _0x2c3a08=_0x150bf7;return Scene_Save[_0x2c3a08(0x749)][_0x2c3a08(0x40d)][_0x2c3a08(0x697)](this);},Scene_Load[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)]['MenuLayout'][_0x150bf7(0x505)],Scene_Load[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)]=function(){const _0x39b30b=_0x150bf7;Scene_File[_0x39b30b(0x8e0)]['create'][_0x39b30b(0x697)](this),this[_0x39b30b(0x437)]();},Scene_Load['prototype'][_0x150bf7(0x437)]=function(){const _0x3e0e92=_0x150bf7;if(this[_0x3e0e92(0x71b)]){if(_0x3e0e92(0x1c3)!=='fHUvv'){const _0x4a7fea=_0x5f045e[_0x3e0e92(0x55b)],_0x24a9c6=_0x2e8191[_0x3e0e92(0x7de)]||'',_0x38389c=_0x5e993b[_0x3e0e92(0x15f)]||'',_0x32b9cb=_0x4c56b8['CoreEngine']['Settings'][_0x3e0e92(0x708)][_0x3e0e92(0x684)]['DocumentTitleFmt'],_0x24b8ca=_0x32b9cb[_0x3e0e92(0x322)](_0x4a7fea,_0x24a9c6,_0x38389c);_0x2e1f9f[_0x3e0e92(0x6f4)]=_0x24b8ca;}else this[_0x3e0e92(0x71b)]['setBackgroundType'](Scene_Load[_0x3e0e92(0x749)]['HelpBgType']);}this['_listWindow']&&this[_0x3e0e92(0x69b)][_0x3e0e92(0x34c)](Scene_Load[_0x3e0e92(0x749)][_0x3e0e92(0x189)]);},Scene_Load['prototype']['helpWindowRect']=function(){const _0xfeb27e=_0x150bf7;return Scene_Load[_0xfeb27e(0x749)][_0xfeb27e(0x4eb)]['call'](this);},Scene_Load['prototype']['listWindowRect']=function(){const _0x485d06=_0x150bf7;return Scene_Load[_0x485d06(0x749)][_0x485d06(0x40d)][_0x485d06(0x697)](this);},Scene_GameEnd[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)][_0x150bf7(0x708)][_0x150bf7(0x431)],VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x204)]=Scene_GameEnd[_0x150bf7(0x8e0)][_0x150bf7(0x30f)],Scene_GameEnd[_0x150bf7(0x8e0)][_0x150bf7(0x30f)]=function(){const _0x1c6791=_0x150bf7;Scene_MenuBase[_0x1c6791(0x8e0)][_0x1c6791(0x30f)][_0x1c6791(0x697)](this);},Scene_GameEnd['prototype'][_0x150bf7(0x5cc)]=function(){const _0x269880=_0x150bf7,_0x2b4251=this[_0x269880(0x535)]();this[_0x269880(0x134)]=new Window_GameEnd(_0x2b4251),this[_0x269880(0x134)][_0x269880(0x4e0)](_0x269880(0x2b1),this['popScene'][_0x269880(0x45b)](this)),this[_0x269880(0x559)](this['_commandWindow']),this[_0x269880(0x134)][_0x269880(0x34c)](Scene_GameEnd[_0x269880(0x749)][_0x269880(0x6db)]);},Scene_GameEnd[_0x150bf7(0x8e0)]['commandWindowRect']=function(){const _0x16e523=_0x150bf7;return Scene_GameEnd[_0x16e523(0x749)]['CommandRect'][_0x16e523(0x697)](this);},Scene_Shop[_0x150bf7(0x749)]=VisuMZ[_0x150bf7(0x7d0)]['Settings']['MenuLayout'][_0x150bf7(0x358)],VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x632)]=Scene_Shop[_0x150bf7(0x8e0)][_0x150bf7(0x4e6)],Scene_Shop['prototype'][_0x150bf7(0x4e6)]=function(){const _0x1611d7=_0x150bf7;VisuMZ[_0x1611d7(0x7d0)]['Scene_Shop_create'][_0x1611d7(0x697)](this),this[_0x1611d7(0x437)]();},Scene_Shop[_0x150bf7(0x8e0)]['setCoreEngineUpdateWindowBg']=function(){const _0x559e84=_0x150bf7;this[_0x559e84(0x71b)]&&this[_0x559e84(0x71b)][_0x559e84(0x34c)](Scene_Shop[_0x559e84(0x749)][_0x559e84(0x1ff)]);this[_0x559e84(0x72a)]&&this[_0x559e84(0x72a)][_0x559e84(0x34c)](Scene_Shop[_0x559e84(0x749)]['GoldBgType']);this[_0x559e84(0x134)]&&this['_commandWindow']['setBackgroundType'](Scene_Shop['layoutSettings']['CommandBgType']);if(this['_dummyWindow']){if('voMax'===_0x559e84(0x624)){return _0x488f7e[_0x559e84(0x8e0)][_0x559e84(0x8dd)]['call'](this)+_0x5ba762[_0x559e84(0x7d0)][_0x559e84(0x486)][_0x559e84(0x751)][_0x559e84(0x6ca)];;}else this[_0x559e84(0x5b1)][_0x559e84(0x34c)](Scene_Shop['layoutSettings'][_0x559e84(0x45c)]);}this[_0x559e84(0x79a)]&&this['_numberWindow']['setBackgroundType'](Scene_Shop['layoutSettings']['NumberBgType']),this[_0x559e84(0x11d)]&&this[_0x559e84(0x11d)]['setBackgroundType'](Scene_Shop[_0x559e84(0x749)][_0x559e84(0x129)]),this[_0x559e84(0x78d)]&&this[_0x559e84(0x78d)]['setBackgroundType'](Scene_Shop[_0x559e84(0x749)][_0x559e84(0x6c6)]),this['_categoryWindow']&&('CSXTs'==='VXKfW'?((this[_0x559e84(0x804)]!==_0x3ebfa0||this[_0x559e84(0x509)]!==_0x1de180)&&(this[_0x559e84(0x7e2)](_0x559e84(0x126)),this['_movementWholeDuration']=_0x36c070),_0x1f561a[_0x559e84(0x7d0)][_0x559e84(0x4af)]['call'](this,_0x551b90,_0x5a1ff3,_0x51158c)):this[_0x559e84(0x769)][_0x559e84(0x34c)](Scene_Shop['layoutSettings'][_0x559e84(0x718)])),this[_0x559e84(0x3b6)]&&('CwHht'!==_0x559e84(0x6ac)?this[_0x559e84(0x3b6)][_0x559e84(0x34c)](Scene_Shop[_0x559e84(0x749)]['SellBgType']):this[_0x559e84(0x134)][_0x559e84(0x34c)](_0x1c3d98['layoutSettings'][_0x559e84(0x6db)]));},Scene_Shop[_0x150bf7(0x8e0)][_0x150bf7(0x4b1)]=function(){const _0x5910e4=_0x150bf7;return Scene_Shop[_0x5910e4(0x749)][_0x5910e4(0x4eb)][_0x5910e4(0x697)](this);},Scene_Shop[_0x150bf7(0x8e0)][_0x150bf7(0x442)]=function(){const _0x575f6=_0x150bf7;return Scene_Shop[_0x575f6(0x749)][_0x575f6(0x32b)][_0x575f6(0x697)](this);},Scene_Shop['prototype'][_0x150bf7(0x535)]=function(){const _0x57c1e7=_0x150bf7;return Scene_Shop['layoutSettings']['CommandRect'][_0x57c1e7(0x697)](this);},Scene_Shop[_0x150bf7(0x8e0)]['dummyWindowRect']=function(){const _0x23f04c=_0x150bf7;return Scene_Shop['layoutSettings'][_0x23f04c(0x220)][_0x23f04c(0x697)](this);},Scene_Shop[_0x150bf7(0x8e0)][_0x150bf7(0x8b1)]=function(){const _0x3766bb=_0x150bf7;return Scene_Shop[_0x3766bb(0x749)]['NumberRect'][_0x3766bb(0x697)](this);},Scene_Shop[_0x150bf7(0x8e0)][_0x150bf7(0x41c)]=function(){const _0x2d6faa=_0x150bf7;return Scene_Shop[_0x2d6faa(0x749)][_0x2d6faa(0x6c0)][_0x2d6faa(0x697)](this);},Scene_Shop[_0x150bf7(0x8e0)]['buyWindowRect']=function(){const _0xa9e9a9=_0x150bf7;return Scene_Shop[_0xa9e9a9(0x749)]['BuyRect'][_0xa9e9a9(0x697)](this);},Scene_Shop[_0x150bf7(0x8e0)][_0x150bf7(0x6e0)]=function(){const _0x2e7310=_0x150bf7;return Scene_Shop['layoutSettings'][_0x2e7310(0x20f)][_0x2e7310(0x697)](this);},Scene_Shop[_0x150bf7(0x8e0)]['sellWindowRect']=function(){const _0x23fa29=_0x150bf7;return Scene_Shop[_0x23fa29(0x749)][_0x23fa29(0x743)][_0x23fa29(0x697)](this);},Scene_Name['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x150bf7(0x708)][_0x150bf7(0x548)],VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x5dc)]=Scene_Name['prototype'][_0x150bf7(0x4e6)],Scene_Name['prototype'][_0x150bf7(0x4e6)]=function(){const _0x366507=_0x150bf7;VisuMZ[_0x366507(0x7d0)][_0x366507(0x5dc)][_0x366507(0x697)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0x150bf7(0x8e0)][_0x150bf7(0x437)]=function(){const _0x2223aa=_0x150bf7;this[_0x2223aa(0x7d2)]&&this[_0x2223aa(0x7d2)]['setBackgroundType'](Scene_Name['layoutSettings'][_0x2223aa(0x7aa)]);if(this['_inputWindow']){if('EqOwo'!==_0x2223aa(0x233))this[_0x2223aa(0x29c)]['setBackgroundType'](Scene_Name[_0x2223aa(0x749)][_0x2223aa(0x58c)]);else{const _0x48be94=this['isMVAnimation'](_0x275100),_0x9ab35a=new(_0x48be94?_0x2aee71:_0x4c0978)();_0x9ab35a[_0x2223aa(0x840)]=_0x3f6b85,_0x9ab35a[_0x2223aa(0x136)](_0x186ecc,_0x145eab,_0x390860,_0x588e2d),_0x9ab35a[_0x2223aa(0x7b2)](_0x224da8),this['_effectsContainer']['addChild'](_0x9ab35a),this[_0x2223aa(0x8e2)][_0x2223aa(0x4c5)](_0x9ab35a);}}},Scene_Name[_0x150bf7(0x8e0)]['helpAreaHeight']=function(){return 0x0;},Scene_Name['prototype'][_0x150bf7(0x4bd)]=function(){const _0x3ea0dc=_0x150bf7;return Scene_Name[_0x3ea0dc(0x749)][_0x3ea0dc(0x50c)][_0x3ea0dc(0x697)](this);},Scene_Name[_0x150bf7(0x8e0)]['inputWindowRect']=function(){const _0x13dab0=_0x150bf7;return Scene_Name[_0x13dab0(0x749)][_0x13dab0(0x1a5)][_0x13dab0(0x697)](this);},Scene_Name[_0x150bf7(0x8e0)][_0x150bf7(0x367)]=function(){const _0x38c1d5=_0x150bf7;if(!this[_0x38c1d5(0x29c)])return![];return VisuMZ[_0x38c1d5(0x7d0)][_0x38c1d5(0x486)][_0x38c1d5(0x38e)][_0x38c1d5(0x367)];},Scene_Name[_0x150bf7(0x8e0)]['buttonAssistKey1']=function(){const _0x8f5cf7=_0x150bf7;if(this['EnableNameInput']())return _0x8f5cf7(0x65f)===_0x8f5cf7(0x65f)?TextManager[_0x8f5cf7(0x246)]('tab'):_0x44ae62['CoreEngine'][_0x8f5cf7(0x486)]['QoL'][_0x8f5cf7(0x7dc)]?0x0:_0x4e2dc4[_0x8f5cf7(0x7d0)][_0x8f5cf7(0x39e)][_0x8f5cf7(0x697)](this,_0xd6c0bf);else{if(_0x8f5cf7(0x259)!==_0x8f5cf7(0x7be))return Scene_MenuBase[_0x8f5cf7(0x8e0)][_0x8f5cf7(0x425)][_0x8f5cf7(0x697)](this);else this[_0x8f5cf7(0x8ec)]();}},Scene_Name[_0x150bf7(0x8e0)][_0x150bf7(0x20d)]=function(){const _0xe78c5e=_0x150bf7;if(this[_0xe78c5e(0x367)]()){const _0x1917ac=VisuMZ[_0xe78c5e(0x7d0)][_0xe78c5e(0x486)][_0xe78c5e(0x38e)];return this[_0xe78c5e(0x29c)][_0xe78c5e(0x4b4)]==='keyboard'?_0x1917ac[_0xe78c5e(0x732)]||_0xe78c5e(0x732):_0x1917ac[_0xe78c5e(0x78b)]||_0xe78c5e(0x78b);}else return _0xe78c5e(0x424)!=='OcGAw'?Scene_MenuBase[_0xe78c5e(0x8e0)]['buttonAssistText1'][_0xe78c5e(0x697)](this):_0x3d9a98?_0x4b62d0(_0x41b15b['round'](_0x26bdf7*0x64))+'%':_0x2c18ec;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x448)]=Scene_Name[_0x150bf7(0x8e0)][_0x150bf7(0x2f3)],Scene_Name['prototype'][_0x150bf7(0x2f3)]=function(){const _0x46a17c=_0x150bf7;this['doesNameContainBannedWords']()?this[_0x46a17c(0x52d)]():_0x46a17c(0x14f)!==_0x46a17c(0x14f)?(this['setMoveEasingType']('Linear'),this[_0x46a17c(0x7cf)]=_0x4dd8b2):VisuMZ['CoreEngine'][_0x46a17c(0x448)][_0x46a17c(0x697)](this);},Scene_Name['prototype'][_0x150bf7(0x63d)]=function(){const _0x496d63=_0x150bf7,_0x16dc8b=VisuMZ['CoreEngine'][_0x496d63(0x486)]['KeyboardInput'];if(!_0x16dc8b)return![];const _0x4579e1=_0x16dc8b[_0x496d63(0x741)];if(!_0x4579e1)return![];const _0x5c5c1c=this['_editWindow']['name']()['toLowerCase']();for(const _0x36d26d of _0x4579e1){if('wWaTV'==='EJtES')_0x27d328=_0x4f5954[_0x496d63(0x5aa)](),_0x2edabf=_0x13026d[_0x496d63(0x22b)]();else{if(_0x5c5c1c['includes'](_0x36d26d[_0x496d63(0x560)]()))return!![];}}return![];},Scene_Name['prototype'][_0x150bf7(0x52d)]=function(){const _0x470393=_0x150bf7;SoundManager[_0x470393(0x15d)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x1c8)]=Scene_Battle['prototype']['update'],Scene_Battle['prototype'][_0x150bf7(0x5cd)]=function(){const _0x37497e=_0x150bf7;VisuMZ['CoreEngine'][_0x37497e(0x1c8)][_0x37497e(0x697)](this);if($gameTemp[_0x37497e(0x5ea)])this[_0x37497e(0x824)]();},Scene_Battle[_0x150bf7(0x8e0)][_0x150bf7(0x824)]=function(){const _0x359b5d=_0x150bf7;if(!BattleManager[_0x359b5d(0x71a)]()&&!this[_0x359b5d(0x3ba)]&&!$gameMessage['isBusy']()){if(_0x359b5d(0x5a3)!==_0x359b5d(0x6a8))this[_0x359b5d(0x3ba)]=!![],this[_0x359b5d(0x5cd)](),SceneManager[_0x359b5d(0x3e0)](),this[_0x359b5d(0x3ba)]=![];else{let _0x247785=_0x359b5d(0x8d9)+_0x34b1d3+'Total';if(this[_0x359b5d(0x283)](_0x247785))return this['_cache'][_0x247785];return this[_0x359b5d(0x44f)][_0x247785]=_0x3cfb9b[_0x359b5d(0x7d0)][_0x359b5d(0x486)][_0x359b5d(0x6b9)][_0x359b5d(0x6e4)]['call'](this,_0x1d87b4),this[_0x359b5d(0x44f)][_0x247785];}}},VisuMZ['CoreEngine'][_0x150bf7(0x394)]=Scene_Battle[_0x150bf7(0x8e0)][_0x150bf7(0x6a3)],Scene_Battle['prototype'][_0x150bf7(0x6a3)]=function(){const _0x19aa95=_0x150bf7;VisuMZ[_0x19aa95(0x7d0)]['Scene_Battle_createCancelButton'][_0x19aa95(0x697)](this),SceneManager[_0x19aa95(0x50b)]()&&this[_0x19aa95(0x6f9)]();},Scene_Battle[_0x150bf7(0x8e0)][_0x150bf7(0x6f9)]=function(){const _0x11813e=_0x150bf7;this[_0x11813e(0x5b4)]['x']=Graphics['boxWidth']+0x4,this[_0x11813e(0x5c5)]()?this[_0x11813e(0x5b4)]['y']=Graphics['boxHeight']-this[_0x11813e(0x752)]():'qUlbP'===_0x11813e(0x87d)?_0x2c06f7+=_0x33a4f7(_0x629c25):this['_cancelButton']['y']=0x0;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x31c)]=Sprite_Button[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)],Sprite_Button[_0x150bf7(0x8e0)]['initialize']=function(_0x52dad6){const _0x5db9fd=_0x150bf7;VisuMZ[_0x5db9fd(0x7d0)][_0x5db9fd(0x31c)][_0x5db9fd(0x697)](this,_0x52dad6),this[_0x5db9fd(0x450)]();},Sprite_Button['prototype'][_0x150bf7(0x450)]=function(){const _0x5f1f2b=_0x150bf7,_0x25e733=VisuMZ[_0x5f1f2b(0x7d0)][_0x5f1f2b(0x486)]['UI'];this[_0x5f1f2b(0x353)]=![];switch(this[_0x5f1f2b(0x228)]){case _0x5f1f2b(0x2b1):this[_0x5f1f2b(0x353)]=!_0x25e733[_0x5f1f2b(0x1c1)];break;case _0x5f1f2b(0x37d):case _0x5f1f2b(0x6c3):this[_0x5f1f2b(0x353)]=!_0x25e733[_0x5f1f2b(0x590)];break;case'down':case'up':case _0x5f1f2b(0x321):case _0x5f1f2b(0x3be):case'ok':this[_0x5f1f2b(0x353)]=!_0x25e733[_0x5f1f2b(0x77f)];break;case _0x5f1f2b(0x8fe):this[_0x5f1f2b(0x353)]=!_0x25e733['menuShowButton'];break;}},VisuMZ[_0x150bf7(0x7d0)]['Sprite_Button_updateOpacity']=Sprite_Button[_0x150bf7(0x8e0)][_0x150bf7(0x7af)],Sprite_Button[_0x150bf7(0x8e0)][_0x150bf7(0x7af)]=function(){const _0xe2c047=_0x150bf7;SceneManager[_0xe2c047(0x168)]()||this['_isButtonHidden']?_0xe2c047(0x3c5)==='YTWLk'?this[_0xe2c047(0x488)]():this[_0xe2c047(0x459)][_0xe2c047(0x34c)](_0x589c0c[_0xe2c047(0x749)][_0xe2c047(0x772)]):_0xe2c047(0x583)==='ddWXb'?VisuMZ[_0xe2c047(0x7d0)][_0xe2c047(0x60e)][_0xe2c047(0x697)](this):this[_0xe2c047(0x41e)]=_0x3df518;},Sprite_Button[_0x150bf7(0x8e0)][_0x150bf7(0x488)]=function(){const _0x4b97bf=_0x150bf7;this[_0x4b97bf(0x814)]=![],this[_0x4b97bf(0x7a5)]=0x0,this['x']=Graphics[_0x4b97bf(0x14c)]*0xa,this['y']=Graphics[_0x4b97bf(0x567)]*0xa;},VisuMZ['CoreEngine'][_0x150bf7(0x4af)]=Sprite_Battler[_0x150bf7(0x8e0)][_0x150bf7(0x601)],Sprite_Battler[_0x150bf7(0x8e0)]['startMove']=function(_0x162646,_0x554b36,_0x578157){const _0x492ccb=_0x150bf7;(this[_0x492ccb(0x804)]!==_0x162646||this[_0x492ccb(0x509)]!==_0x554b36)&&(this[_0x492ccb(0x7e2)](_0x492ccb(0x126)),this[_0x492ccb(0x7cf)]=_0x578157),VisuMZ[_0x492ccb(0x7d0)]['Sprite_Battler_startMove']['call'](this,_0x162646,_0x554b36,_0x578157);},Sprite_Battler[_0x150bf7(0x8e0)][_0x150bf7(0x7e2)]=function(_0xfa7541){const _0x96d67c=_0x150bf7;this[_0x96d67c(0x14e)]=_0xfa7541;},Sprite_Battler[_0x150bf7(0x8e0)][_0x150bf7(0x5e6)]=function(){const _0x24f4f1=_0x150bf7;if(this[_0x24f4f1(0x86b)]<=0x0)return;const _0x16c0a8=this[_0x24f4f1(0x86b)],_0x1a920d=this[_0x24f4f1(0x7cf)],_0x77f5ff=this['_moveEasingType'];this[_0x24f4f1(0x40b)]=this[_0x24f4f1(0x8fa)](this[_0x24f4f1(0x40b)],this[_0x24f4f1(0x804)],_0x16c0a8,_0x1a920d,_0x77f5ff),this[_0x24f4f1(0x301)]=this[_0x24f4f1(0x8fa)](this['_offsetY'],this[_0x24f4f1(0x509)],_0x16c0a8,_0x1a920d,_0x77f5ff),this[_0x24f4f1(0x86b)]--;if(this[_0x24f4f1(0x86b)]<=0x0)this[_0x24f4f1(0x8b6)]();},Sprite_Battler[_0x150bf7(0x8e0)][_0x150bf7(0x8fa)]=function(_0x1ecb2f,_0x31cd79,_0x15189c,_0x5b8041,_0x70856){const _0x5907e1=_0x150bf7,_0x3f813a=VisuMZ[_0x5907e1(0x39f)]((_0x5b8041-_0x15189c)/_0x5b8041,_0x70856||_0x5907e1(0x126)),_0x4e679b=VisuMZ['ApplyEasing']((_0x5b8041-_0x15189c+0x1)/_0x5b8041,_0x70856||_0x5907e1(0x126)),_0x105cf8=(_0x1ecb2f-_0x31cd79*_0x3f813a)/(0x1-_0x3f813a);return _0x105cf8+(_0x31cd79-_0x105cf8)*_0x4e679b;},VisuMZ['CoreEngine'][_0x150bf7(0x26b)]=Sprite_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x5c6)],Sprite_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x5c6)]=function(_0x2a5fa8){const _0x5ed43a=_0x150bf7;if(VisuMZ[_0x5ed43a(0x7d0)][_0x5ed43a(0x486)]['UI'][_0x5ed43a(0x5c9)]){if(_0x5ed43a(0x30b)===_0x5ed43a(0x34d)){if(this[_0x5ed43a(0x4b4)]==='keyboard'&&!_0x37fc09[_0x5ed43a(0x429)]())return;if(_0x2eb41c[_0x5ed43a(0x808)]())return;_0x3077bf[_0x5ed43a(0x7d0)][_0x5ed43a(0x19b)][_0x5ed43a(0x697)](this,_0x5eddff),this['switchModes'](_0x5ed43a(0x368));}else this[_0x5ed43a(0x2cd)](_0x2a5fa8);}else VisuMZ['CoreEngine'][_0x5ed43a(0x26b)][_0x5ed43a(0x697)](this,_0x2a5fa8);},Sprite_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x2cd)]=function(_0x2ed3f9){const _0x4e659c=_0x150bf7;let _0x2daf66=Math[_0x4e659c(0x469)](Graphics[_0x4e659c(0x14c)]/0x2+0xc0);_0x2daf66-=Math['floor']((Graphics[_0x4e659c(0x14c)]-Graphics[_0x4e659c(0x8f9)])/0x2),_0x2daf66+=_0x2ed3f9*0x20;let _0x38370a=Graphics[_0x4e659c(0x567)]-0xc8-$gameParty[_0x4e659c(0x73b)]()*0x30;_0x38370a-=Math[_0x4e659c(0x7d1)]((Graphics['height']-Graphics[_0x4e659c(0x336)])/0x2),_0x38370a+=_0x2ed3f9*0x30,this['setHome'](_0x2daf66,_0x38370a);},Sprite_Actor['prototype'][_0x150bf7(0x3b8)]=function(){const _0x401a02=_0x150bf7;this[_0x401a02(0x601)](0x4b0,0x0,0x78);},Sprite_Animation[_0x150bf7(0x8e0)]['setMute']=function(_0x4ec6c3){const _0x178e71=_0x150bf7;this[_0x178e71(0x725)]=_0x4ec6c3;},VisuMZ[_0x150bf7(0x7d0)]['Sprite_Animation_processSoundTimings']=Sprite_Animation['prototype'][_0x150bf7(0x337)],Sprite_Animation[_0x150bf7(0x8e0)][_0x150bf7(0x337)]=function(){const _0x2eb7f1=_0x150bf7;if(this[_0x2eb7f1(0x725)])return;VisuMZ['CoreEngine'][_0x2eb7f1(0x572)][_0x2eb7f1(0x697)](this);},VisuMZ[_0x150bf7(0x7d0)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x150bf7(0x8e0)]['setViewport'],Sprite_Animation[_0x150bf7(0x8e0)][_0x150bf7(0x7a9)]=function(_0x2c3b98){const _0x25423b=_0x150bf7;this[_0x25423b(0x49c)]()?this[_0x25423b(0x8a9)](_0x2c3b98):VisuMZ[_0x25423b(0x7d0)][_0x25423b(0x2b3)][_0x25423b(0x697)](this,_0x2c3b98);},Sprite_Animation['prototype'][_0x150bf7(0x49c)]=function(){const _0x394596=_0x150bf7;if(!this[_0x394596(0x653)])return![];const _0x50a9cc=this[_0x394596(0x653)][_0x394596(0x42a)]||'';if(_0x50a9cc['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x50a9cc[_0x394596(0x60c)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x394596(0x7d0)][_0x394596(0x486)][_0x394596(0x51b)][_0x394596(0x33e)];},Sprite_Animation[_0x150bf7(0x8e0)][_0x150bf7(0x8a9)]=function(_0xfbfc36){const _0x1f1a83=_0x150bf7,_0x645323=this['_viewportSize'],_0x2db8c7=this[_0x1f1a83(0x3f9)],_0x104050=this[_0x1f1a83(0x653)][_0x1f1a83(0x7f5)]*(this[_0x1f1a83(0x614)]?-0x1:0x1)-_0x645323/0x2,_0x3d1135=this['_animation'][_0x1f1a83(0x359)]-_0x2db8c7/0x2,_0x12450d=this[_0x1f1a83(0x4ad)](_0xfbfc36);_0xfbfc36['gl'][_0x1f1a83(0x369)](_0x104050+_0x12450d['x'],_0x3d1135+_0x12450d['y'],_0x645323,_0x2db8c7);},Sprite_Animation[_0x150bf7(0x8e0)][_0x150bf7(0x16d)]=function(_0x153652){const _0x261dcd=_0x150bf7;if(_0x153652[_0x261dcd(0x89f)]){}const _0x4f7463=this[_0x261dcd(0x653)][_0x261dcd(0x42a)];let _0x145db2=_0x153652['height']*_0x153652['scale']['y'],_0x22b063=0x0,_0x5a7b8b=-_0x145db2/0x2;if(_0x4f7463['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x5a7b8b=-_0x145db2;if(_0x4f7463['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x5a7b8b=0x0;if(this[_0x261dcd(0x653)][_0x261dcd(0x887)])_0x5a7b8b=0x0;if(_0x4f7463[_0x261dcd(0x60c)](/<(?:LEFT)>/i))_0x22b063=-_0x153652[_0x261dcd(0x14c)]/0x2;if(_0x4f7463[_0x261dcd(0x60c)](/<(?:RIGHT)>/i))_0x22b063=_0x153652[_0x261dcd(0x14c)]/0x2;_0x4f7463['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x261dcd(0x845)===_0x261dcd(0x58d)?this[_0x261dcd(0x71b)][_0x261dcd(0x34c)](_0x412582[_0x261dcd(0x749)][_0x261dcd(0x1ff)]):_0x22b063=Number(RegExp['$1'])*_0x153652['width']);_0x4f7463[_0x261dcd(0x60c)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x5a7b8b=(0x1-Number(RegExp['$1']))*-_0x145db2);if(_0x4f7463[_0x261dcd(0x60c)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)){if('ccOPE'!=='NFtcl')_0x22b063=Number(RegExp['$1'])*_0x153652[_0x261dcd(0x14c)],_0x5a7b8b=(0x1-Number(RegExp['$2']))*-_0x145db2;else{this[_0x261dcd(0x5bd)](),this[_0x261dcd(0x21a)][_0x261dcd(0x62c)](),this[_0x261dcd(0x21a)]['fontSize']=_0x52b1c5[_0x261dcd(0x7d0)][_0x261dcd(0x486)][_0x261dcd(0x57a)][_0x261dcd(0x785)];const _0x13604c=_0x2f5845[_0x261dcd(0x7d0)][_0x261dcd(0x486)][_0x261dcd(0x57a)]['GoldIcon'],_0x2d8495=this['itemLineRect'](0x0);if(_0x13604c>0x0){const _0x22986a=_0x2d8495['y']+(this[_0x261dcd(0x60b)]()-_0x137621[_0x261dcd(0x265)])/0x2;this[_0x261dcd(0x5b0)](_0x13604c,_0x2d8495['x'],_0x22986a);const _0x534876=_0x4a4b2a[_0x261dcd(0x17a)]+0x4;_0x2d8495['x']+=_0x534876,_0x2d8495[_0x261dcd(0x14c)]-=_0x534876;}this['changeTextColor'](_0x15ebe5[_0x261dcd(0x660)]()),this[_0x261dcd(0x714)](this[_0x261dcd(0x22f)](),_0x2d8495['x'],_0x2d8495['y'],_0x2d8495[_0x261dcd(0x14c)],_0x261dcd(0x3f7));const _0x357972=this[_0x261dcd(0x2b4)](this[_0x261dcd(0x22f)]())+0x6;;_0x2d8495['x']+=_0x357972,_0x2d8495[_0x261dcd(0x14c)]-=_0x357972,this[_0x261dcd(0x59d)]();const _0x33bb86=this[_0x261dcd(0x78f)](),_0x495174=this[_0x261dcd(0x2b4)](this[_0x261dcd(0x464)]?_0x1e7945[_0x261dcd(0x2fc)](this[_0x261dcd(0x78f)]()):this[_0x261dcd(0x78f)]());_0x495174>_0x2d8495[_0x261dcd(0x14c)]?this[_0x261dcd(0x714)](_0x16515e['CoreEngine']['Settings'][_0x261dcd(0x57a)]['GoldOverlap'],_0x2d8495['x'],_0x2d8495['y'],_0x2d8495[_0x261dcd(0x14c)],'right'):this[_0x261dcd(0x714)](this[_0x261dcd(0x78f)](),_0x2d8495['x'],_0x2d8495['y'],_0x2d8495['width'],'right'),this[_0x261dcd(0x5bd)]();}}if(_0x4f7463[_0x261dcd(0x60c)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x22b063+=Number(RegExp['$1']);if(_0x4f7463['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x5a7b8b+=Number(RegExp['$1']);_0x4f7463[_0x261dcd(0x60c)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x22b063+=Number(RegExp['$1']),_0x5a7b8b+=Number(RegExp['$2']));const _0x4168ee=new Point(_0x22b063,_0x5a7b8b);return _0x153652[_0x261dcd(0x6cd)](),_0x153652[_0x261dcd(0x6fa)][_0x261dcd(0x67e)](_0x4168ee);},Sprite_AnimationMV[_0x150bf7(0x8e0)][_0x150bf7(0x2d0)]=function(){const _0x51f9c6=_0x150bf7;this[_0x51f9c6(0x786)]=VisuMZ[_0x51f9c6(0x7d0)]['Settings']['QoL'][_0x51f9c6(0x6f6)]??0x4,this[_0x51f9c6(0x82d)](),this[_0x51f9c6(0x786)]=this[_0x51f9c6(0x786)][_0x51f9c6(0x4fe)](0x1,0xa);},Sprite_AnimationMV[_0x150bf7(0x8e0)][_0x150bf7(0x82d)]=function(){const _0x1bcd59=_0x150bf7;if(!this[_0x1bcd59(0x653)]);const _0x1cb16f=this['_animation'][_0x1bcd59(0x42a)]||'';if(_0x1cb16f[_0x1bcd59(0x60c)](/<RATE:[ ](\d+)>/i)){if(_0x1bcd59(0x7c3)==='ejCGY'){const _0x19b184=_0x211383[_0x3e61ba];_0x19b184?this['setup'](_0x19b184[_0x1bcd59(0x2c6)],0x0):this[_0x1bcd59(0x622)]();}else this['_rate']=(Number(RegExp['$1'])||0x1)[_0x1bcd59(0x4fe)](0x1,0xa);}},Sprite_AnimationMV[_0x150bf7(0x8e0)][_0x150bf7(0x7b2)]=function(_0x126917){const _0x156f70=_0x150bf7;this[_0x156f70(0x725)]=_0x126917;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x43d)]=Sprite_AnimationMV['prototype'][_0x150bf7(0x503)],Sprite_AnimationMV['prototype'][_0x150bf7(0x503)]=function(_0x5ba424){const _0x50eb58=_0x150bf7;this[_0x50eb58(0x725)]&&('TmOjZ'==='YuJQJ'?this['_pointAnimationQueue']=[]:(_0x5ba424=JsonEx[_0x50eb58(0x4d4)](_0x5ba424),_0x5ba424['se']&&(_0x5ba424['se']['volume']=0x0))),VisuMZ[_0x50eb58(0x7d0)][_0x50eb58(0x43d)]['call'](this,_0x5ba424);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x8bb)]=Sprite_AnimationMV[_0x150bf7(0x8e0)][_0x150bf7(0x8a4)],Sprite_AnimationMV['prototype'][_0x150bf7(0x8a4)]=function(){const _0x516dd2=_0x150bf7;VisuMZ[_0x516dd2(0x7d0)]['Sprite_AnimationMV_updatePosition'][_0x516dd2(0x697)](this);if(this[_0x516dd2(0x653)][_0x516dd2(0x205)]===0x3){if(_0x516dd2(0x3a4)!==_0x516dd2(0x3a4))_0x2eda39[_0x516dd2(0x7d0)][_0x516dd2(0x821)][_0x516dd2(0x697)](this);else{if(this['x']===0x0)this['x']=Math[_0x516dd2(0x469)](Graphics[_0x516dd2(0x14c)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x516dd2(0x567)]/0x2);}}},Sprite_Damage[_0x150bf7(0x8e0)][_0x150bf7(0x674)]=function(_0x2ec584){const _0x3e3db1=_0x150bf7;let _0x268039=Math[_0x3e3db1(0x419)](_0x2ec584)[_0x3e3db1(0x3cf)]();this['useDigitGrouping']()&&(_0x268039=VisuMZ['GroupDigits'](_0x268039));const _0x104e66=this[_0x3e3db1(0x7a6)](),_0x34631c=Math[_0x3e3db1(0x7d1)](_0x104e66*0.75);for(let _0x53feb7=0x0;_0x53feb7<_0x268039[_0x3e3db1(0x452)];_0x53feb7++){const _0x49133e=this['createChildSprite'](_0x34631c,_0x104e66);_0x49133e[_0x3e3db1(0x219)]['drawText'](_0x268039[_0x53feb7],0x0,0x0,_0x34631c,_0x104e66,_0x3e3db1(0x1e5)),_0x49133e['x']=(_0x53feb7-(_0x268039[_0x3e3db1(0x452)]-0x1)/0x2)*_0x34631c,_0x49133e['dy']=-_0x53feb7;}},Sprite_Damage[_0x150bf7(0x8e0)][_0x150bf7(0x3d1)]=function(){const _0x1151b1=_0x150bf7;return VisuMZ['CoreEngine'][_0x1151b1(0x486)][_0x1151b1(0x51b)][_0x1151b1(0x6a4)];},Sprite_Damage[_0x150bf7(0x8e0)]['valueOutlineColor']=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x418)]=Sprite_Gauge[_0x150bf7(0x8e0)][_0x150bf7(0x4be)],Sprite_Gauge[_0x150bf7(0x8e0)]['gaugeRate']=function(){const _0x567279=_0x150bf7;return VisuMZ[_0x567279(0x7d0)][_0x567279(0x418)][_0x567279(0x697)](this)[_0x567279(0x4fe)](0x0,0x1);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x3a5)]=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge['prototype'][_0x150bf7(0x5e9)]=function(){const _0x100c50=_0x150bf7;let _0x31d1fc=VisuMZ[_0x100c50(0x7d0)][_0x100c50(0x3a5)][_0x100c50(0x697)](this);return _0x31d1fc;},Sprite_Gauge[_0x150bf7(0x8e0)]['drawValue']=function(){const _0x5f1042=_0x150bf7;let _0x3beaea=this[_0x5f1042(0x5e9)]();if(this[_0x5f1042(0x3d1)]()){if(_0x5f1042(0x8c8)===_0x5f1042(0x8c8))_0x3beaea=VisuMZ[_0x5f1042(0x2fc)](_0x3beaea);else{const _0x481e0f=this[_0x5f1042(0x535)]();this[_0x5f1042(0x134)]=new _0x3c2bbc(_0x481e0f),this['_commandWindow'][_0x5f1042(0x4e0)](_0x5f1042(0x2b1),this['popScene'][_0x5f1042(0x45b)](this)),this['addWindow'](this[_0x5f1042(0x134)]),this[_0x5f1042(0x134)]['setBackgroundType'](_0x524af7[_0x5f1042(0x749)][_0x5f1042(0x6db)]);}}const _0x350e17=this['bitmapWidth']()-0x1,_0x1e7605=this[_0x5f1042(0x918)]?this[_0x5f1042(0x918)]():this[_0x5f1042(0x595)]();this[_0x5f1042(0x65d)](),this[_0x5f1042(0x219)][_0x5f1042(0x714)](_0x3beaea,0x0,0x0,_0x350e17,_0x1e7605,_0x5f1042(0x400));},Sprite_Gauge[_0x150bf7(0x8e0)][_0x150bf7(0x574)]=function(){return 0x3;},Sprite_Gauge[_0x150bf7(0x8e0)][_0x150bf7(0x3d1)]=function(){const _0x3b7952=_0x150bf7;return VisuMZ[_0x3b7952(0x7d0)][_0x3b7952(0x486)][_0x3b7952(0x51b)][_0x3b7952(0x876)];},Sprite_Gauge[_0x150bf7(0x8e0)][_0x150bf7(0x850)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ[_0x150bf7(0x7d0)]['Sprite_Picture_loadBitmap']=Sprite_Picture['prototype'][_0x150bf7(0x4c8)],Sprite_Picture['prototype'][_0x150bf7(0x4c8)]=function(){const _0x276283=_0x150bf7;this[_0x276283(0x432)][_0x276283(0x60c)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x276283(0x68f)](Number(RegExp['$1'])):VisuMZ[_0x276283(0x7d0)][_0x276283(0x319)][_0x276283(0x697)](this);},Sprite_Picture[_0x150bf7(0x8e0)]['loadIconBitmap']=function(_0x3acec9){const _0xdea4cb=_0x150bf7,_0x2a3e72=ImageManager['iconWidth'],_0x245986=ImageManager[_0xdea4cb(0x265)],_0x2bea63=this['_pictureName'][_0xdea4cb(0x60c)](/SMOOTH/i);this[_0xdea4cb(0x219)]=new Bitmap(_0x2a3e72,_0x245986);const _0x2a58e0=ImageManager['loadSystem'](_0xdea4cb(0x4db)),_0x8af1c5=_0x3acec9%0x10*_0x2a3e72,_0x5181e9=Math[_0xdea4cb(0x7d1)](_0x3acec9/0x10)*_0x245986;this[_0xdea4cb(0x219)][_0xdea4cb(0x6bc)]=_0x2bea63,this[_0xdea4cb(0x219)][_0xdea4cb(0x465)](_0x2a58e0,_0x8af1c5,_0x5181e9,_0x2a3e72,_0x245986,0x0,0x0,_0x2a3e72,_0x245986);};function Sprite_TitlePictureButton(){const _0xa80686=_0x150bf7;this[_0xa80686(0x8aa)](...arguments);}Sprite_TitlePictureButton[_0x150bf7(0x8e0)]=Object[_0x150bf7(0x4e6)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x150bf7(0x8e0)][_0x150bf7(0x771)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(_0x37b83a){const _0x40ed24=_0x150bf7;Sprite_Clickable[_0x40ed24(0x8e0)][_0x40ed24(0x8aa)][_0x40ed24(0x697)](this),this['_data']=_0x37b83a,this[_0x40ed24(0x738)]=null,this[_0x40ed24(0x136)]();},Sprite_TitlePictureButton['prototype']['setup']=function(){const _0x4fba36=_0x150bf7;this['x']=Graphics['width'],this['y']=Graphics[_0x4fba36(0x567)],this[_0x4fba36(0x814)]=![],this[_0x4fba36(0x3c2)]();},Sprite_TitlePictureButton[_0x150bf7(0x8e0)][_0x150bf7(0x3c2)]=function(){const _0x5393ea=_0x150bf7;this[_0x5393ea(0x219)]=ImageManager[_0x5393ea(0x80c)](this[_0x5393ea(0x1f0)]['PictureFilename']),this[_0x5393ea(0x219)]['addLoadListener'](this[_0x5393ea(0x2e7)]['bind'](this));},Sprite_TitlePictureButton[_0x150bf7(0x8e0)][_0x150bf7(0x2e7)]=function(){const _0x5eb036=_0x150bf7;this['_data'][_0x5eb036(0x713)][_0x5eb036(0x697)](this),this[_0x5eb036(0x1f0)]['PositionJS'][_0x5eb036(0x697)](this),this[_0x5eb036(0x6e3)](this[_0x5eb036(0x1f0)][_0x5eb036(0x893)][_0x5eb036(0x45b)](this));},Sprite_TitlePictureButton[_0x150bf7(0x8e0)][_0x150bf7(0x5cd)]=function(){const _0x1a45d7=_0x150bf7;Sprite_Clickable['prototype']['update'][_0x1a45d7(0x697)](this),this[_0x1a45d7(0x7af)](),this[_0x1a45d7(0x54b)]();},Sprite_TitlePictureButton[_0x150bf7(0x8e0)]['fadeSpeed']=function(){const _0x19060e=_0x150bf7;return VisuMZ[_0x19060e(0x7d0)][_0x19060e(0x486)][_0x19060e(0x708)][_0x19060e(0x684)][_0x19060e(0x536)];},Sprite_TitlePictureButton['prototype'][_0x150bf7(0x7af)]=function(){const _0x271893=_0x150bf7;this[_0x271893(0x530)]||this[_0x271893(0x266)]?this[_0x271893(0x7a5)]=0xff:(this[_0x271893(0x7a5)]+=this['visible']?this[_0x271893(0x410)]():-0x1*this[_0x271893(0x410)](),this[_0x271893(0x7a5)]=Math[_0x271893(0x6d6)](0xc0,this[_0x271893(0x7a5)]));},Sprite_TitlePictureButton[_0x150bf7(0x8e0)][_0x150bf7(0x6e3)]=function(_0xa6d846){const _0xbbaed0=_0x150bf7;this[_0xbbaed0(0x738)]=_0xa6d846;},Sprite_TitlePictureButton['prototype'][_0x150bf7(0x13c)]=function(){const _0x55167f=_0x150bf7;this[_0x55167f(0x738)]&&this[_0x55167f(0x738)]();},VisuMZ['CoreEngine'][_0x150bf7(0x541)]=Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)],Spriteset_Base['prototype'][_0x150bf7(0x8aa)]=function(){const _0xfc7358=_0x150bf7;VisuMZ[_0xfc7358(0x7d0)][_0xfc7358(0x541)][_0xfc7358(0x697)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x86a)]=function(){const _0x40c237=_0x150bf7;this[_0x40c237(0x439)]=[],this[_0x40c237(0x8e2)]=[],this['_cacheScaleX']=this[_0x40c237(0x6ba)]['x'],this[_0x40c237(0x8e9)]=this[_0x40c237(0x6ba)]['y'];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x3e1)]=Spriteset_Base['prototype'][_0x150bf7(0x792)],Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x792)]=function(_0x121605){const _0x294af2=_0x150bf7;this[_0x294af2(0x88f)](),this['removeAllPointAnimations'](),VisuMZ[_0x294af2(0x7d0)][_0x294af2(0x3e1)][_0x294af2(0x697)](this,_0x121605);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x1b7)]=Spriteset_Base['prototype'][_0x150bf7(0x5cd)],Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x5cd)]=function(){const _0xaa2fc5=_0x150bf7;VisuMZ[_0xaa2fc5(0x7d0)][_0xaa2fc5(0x1b7)][_0xaa2fc5(0x697)](this),this[_0xaa2fc5(0x4cb)](),this[_0xaa2fc5(0x68b)](),this[_0xaa2fc5(0x42d)]();},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x4cb)]=function(){const _0x4e9b11=_0x150bf7;if(!VisuMZ[_0x4e9b11(0x7d0)][_0x4e9b11(0x486)][_0x4e9b11(0x51b)]['AntiZoomPictures'])return;if(this[_0x4e9b11(0x2e1)]===this[_0x4e9b11(0x6ba)]['x']&&this['_cacheScaleY']===this['scale']['y'])return;this[_0x4e9b11(0x917)](),this[_0x4e9b11(0x2e1)]=this['scale']['x'],this['_cacheScaleY']=this[_0x4e9b11(0x6ba)]['y'];},Spriteset_Base['prototype'][_0x150bf7(0x917)]=function(){const _0x54ff4e=_0x150bf7;this[_0x54ff4e(0x6ba)]['x']!==0x0&&(this['_pictureContainer'][_0x54ff4e(0x6ba)]['x']=0x1/this[_0x54ff4e(0x6ba)]['x'],this[_0x54ff4e(0x31f)]['x']=-(this['x']/this['scale']['x'])),this[_0x54ff4e(0x6ba)]['y']!==0x0&&(_0x54ff4e(0x770)!==_0x54ff4e(0x770)?this[_0x54ff4e(0x63d)]()?this[_0x54ff4e(0x52d)]():_0x44c00b[_0x54ff4e(0x7d0)]['Scene_Name_onInputOk'][_0x54ff4e(0x697)](this):(this[_0x54ff4e(0x31f)]['scale']['y']=0x1/this[_0x54ff4e(0x6ba)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x54ff4e(0x6ba)]['y'])));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x6e9)]=Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x8a4)],Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x8a4)]=function(){const _0x9c1f07=_0x150bf7;VisuMZ[_0x9c1f07(0x7d0)][_0x9c1f07(0x6e9)][_0x9c1f07(0x697)](this),this['updatePositionCoreEngine']();},Spriteset_Base['prototype']['updatePositionCoreEngine']=function(){const _0x43b684=_0x150bf7;if(!$gameScreen)return;if($gameScreen[_0x43b684(0x5ee)]<=0x0)return;this['x']-=Math[_0x43b684(0x469)]($gameScreen['shake']());const _0x19ce17=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x43b684(0x3ae)]()){case _0x43b684(0x832):this[_0x43b684(0x16f)]();break;case _0x43b684(0x8e8):this[_0x43b684(0x66c)]();break;case _0x43b684(0x7a0):this['updatePositionCoreEngineShakeVert']();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base['prototype'][_0x150bf7(0x16f)]=function(){const _0x59913f=_0x150bf7,_0x29ac4f=VisuMZ['CoreEngine']['Settings'][_0x59913f(0x1de)];if(_0x29ac4f&&_0x29ac4f['originalJS'])return _0x29ac4f[_0x59913f(0x2d7)][_0x59913f(0x697)](this);this['x']+=Math[_0x59913f(0x469)]($gameScreen[_0x59913f(0x1a2)]());},Spriteset_Base[_0x150bf7(0x8e0)]['updatePositionCoreEngineShakeRand']=function(){const _0x52029b=_0x150bf7,_0x362086=VisuMZ['CoreEngine'][_0x52029b(0x486)][_0x52029b(0x1de)];if(_0x362086&&_0x362086[_0x52029b(0x172)])return _0x362086[_0x52029b(0x172)]['call'](this);const _0x517978=$gameScreen['_shakePower']*0.75,_0x1d54ab=$gameScreen[_0x52029b(0x422)]*0.6,_0x36844d=$gameScreen[_0x52029b(0x5ee)];this['x']+=Math[_0x52029b(0x469)](Math['randomInt'](_0x517978)-Math[_0x52029b(0x85e)](_0x1d54ab))*(Math[_0x52029b(0x6d6)](_0x36844d,0x1e)*0.5),this['y']+=Math['round'](Math['randomInt'](_0x517978)-Math[_0x52029b(0x85e)](_0x1d54ab))*(Math[_0x52029b(0x6d6)](_0x36844d,0x1e)*0.5);},Spriteset_Base[_0x150bf7(0x8e0)]['updatePositionCoreEngineShakeHorz']=function(){const _0x383a77=_0x150bf7,_0x40551a=VisuMZ['CoreEngine']['Settings'][_0x383a77(0x1de)];if(_0x40551a&&_0x40551a[_0x383a77(0x3e8)]){if(_0x383a77(0x320)===_0x383a77(0x7fa)){const _0x2dc56a=_0x3b9989[_0x383a77(0x7d0)][_0x383a77(0x486)][_0x383a77(0x80e)][_0x652bdc],_0x3dbdec='img/%1/'[_0x383a77(0x322)](_0x4e01bb);for(const _0x3cffb4 of _0x2dc56a){_0x5b6825[_0x383a77(0x4c8)](_0x3dbdec,_0x3cffb4);}}else return _0x40551a[_0x383a77(0x3e8)][_0x383a77(0x697)](this);}const _0x49a578=$gameScreen['_shakePower']*0.75,_0x58a178=$gameScreen['_shakeSpeed']*0.6,_0x5690de=$gameScreen[_0x383a77(0x5ee)];this['x']+=Math[_0x383a77(0x469)](Math[_0x383a77(0x85e)](_0x49a578)-Math[_0x383a77(0x85e)](_0x58a178))*(Math[_0x383a77(0x6d6)](_0x5690de,0x1e)*0.5);},Spriteset_Base['prototype'][_0x150bf7(0x47a)]=function(){const _0x473260=_0x150bf7,_0x2d7d19=VisuMZ[_0x473260(0x7d0)]['Settings']['ScreenShake'];if(_0x2d7d19&&_0x2d7d19[_0x473260(0x57e)])return _0x2d7d19[_0x473260(0x57e)][_0x473260(0x697)](this);const _0x13eda8=$gameScreen[_0x473260(0x1b0)]*0.75,_0x745a40=$gameScreen[_0x473260(0x422)]*0.6,_0x401b78=$gameScreen[_0x473260(0x5ee)];this['y']+=Math[_0x473260(0x469)](Math[_0x473260(0x85e)](_0x13eda8)-Math[_0x473260(0x85e)](_0x745a40))*(Math[_0x473260(0x6d6)](_0x401b78,0x1e)*0.5);},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x68b)]=function(){const _0x37e031=_0x150bf7;for(const _0x5cef92 of this[_0x37e031(0x439)]){if(_0x37e031(0x2ac)==='TXtQa'){let _0xc04ea4='',_0x18a89e=this[_0x37e031(0x169)]+0x1;while(this[_0x37e031(0x1c5)][_0x18a89e]&&this[_0x37e031(0x1c5)][_0x18a89e][_0x37e031(0x3f1)]===0x195){_0xc04ea4+=this[_0x37e031(0x1c5)][_0x18a89e][_0x37e031(0x155)][0x0]+'\x0a',_0x18a89e++;}return _0xc04ea4;}else{if(!_0x5cef92[_0x37e031(0x1f1)]()){if(_0x37e031(0x2a3)!=='cCffG')this[_0x37e031(0x1a3)](_0x5cef92);else{const _0x421bc9=_0x37e031(0x86d);this[_0x37e031(0x7e8)]=this[_0x37e031(0x7e8)]||{};if(this[_0x37e031(0x7e8)][_0x421bc9])return this[_0x37e031(0x7e8)][_0x421bc9];const _0x46e902=_0x571951['CoreEngine'][_0x37e031(0x486)][_0x37e031(0x49f)][_0x37e031(0x4e4)];return this['getColorDataFromPluginParameters'](_0x421bc9,_0x46e902);}}}}this[_0x37e031(0x6dc)]();},Spriteset_Base[_0x150bf7(0x8e0)]['processFauxAnimationRequests']=function(){const _0x335ff2=_0x150bf7;for(;;){const _0xdbf1fa=$gameTemp[_0x335ff2(0x495)]();if(_0xdbf1fa)this['createFauxAnimation'](_0xdbf1fa);else{if('mdxvR'!==_0x335ff2(0x6b7))return 0x0;else break;}}},Spriteset_Base['prototype'][_0x150bf7(0x2d5)]=function(_0x37f0a8){const _0x4722fb=_0x150bf7,_0x36a01b=$dataAnimations[_0x37f0a8[_0x4722fb(0x203)]],_0x21b0f3=_0x37f0a8[_0x4722fb(0x471)],_0x45264a=_0x37f0a8[_0x4722fb(0x46a)],_0x5f4b16=_0x37f0a8[_0x4722fb(0x44d)];let _0x1d8dc8=this[_0x4722fb(0x1df)]();const _0x37302c=this[_0x4722fb(0x860)]();if(this[_0x4722fb(0x6e5)](_0x36a01b)){if('TdXSF'===_0x4722fb(0x558)){const _0x4ccd60=_0x4722fb(0x149);this[_0x4722fb(0x7e8)]=this['_colorCache']||{};if(this[_0x4722fb(0x7e8)][_0x4ccd60])return this[_0x4722fb(0x7e8)][_0x4ccd60];const _0x2e7458=_0x4c946b[_0x4722fb(0x7d0)][_0x4722fb(0x486)][_0x4722fb(0x49f)][_0x4722fb(0x533)];return this[_0x4722fb(0x3cc)](_0x4ccd60,_0x2e7458);}else for(const _0x581585 of _0x21b0f3){this[_0x4722fb(0x830)]([_0x581585],_0x36a01b,_0x45264a,_0x1d8dc8,_0x5f4b16),_0x1d8dc8+=_0x37302c;}}else this[_0x4722fb(0x830)](_0x21b0f3,_0x36a01b,_0x45264a,_0x1d8dc8,_0x5f4b16);},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x830)]=function(_0x290370,_0x36c4f4,_0x41c41f,_0x5e639d,_0x11e920){const _0x313ca5=_0x150bf7,_0x18eaa4=this['isMVAnimation'](_0x36c4f4),_0x2a4e8a=new(_0x18eaa4?Sprite_AnimationMV:Sprite_Animation)(),_0x2e6af4=this['makeTargetSprites'](_0x290370);if(this[_0x313ca5(0x3a3)](_0x290370[0x0])){if(_0x313ca5(0x211)!==_0x313ca5(0x211)){if(_0x4a812e[_0x313ca5(0x60c)](/backspace/i))return this[_0x313ca5(0x331)]===0x8;if(_0x3a856e[_0x313ca5(0x60c)](/enter/i))return this[_0x313ca5(0x331)]===0xd;if(_0x549345[_0x313ca5(0x60c)](/escape/i))return this[_0x313ca5(0x331)]===0x1b;}else _0x41c41f=!_0x41c41f;}_0x2a4e8a['targetObjects']=_0x290370,_0x2a4e8a[_0x313ca5(0x136)](_0x2e6af4,_0x36c4f4,_0x41c41f,_0x5e639d),_0x2a4e8a['setMute'](_0x11e920),this[_0x313ca5(0x722)]['addChild'](_0x2a4e8a),this[_0x313ca5(0x439)]['push'](_0x2a4e8a);},Spriteset_Base[_0x150bf7(0x8e0)]['removeFauxAnimation']=function(_0xc5974c){const _0xca74ac=_0x150bf7;this['_fauxAnimationSprites']['remove'](_0xc5974c),this[_0xca74ac(0x722)][_0xca74ac(0x602)](_0xc5974c);for(const _0x25d1de of _0xc5974c[_0xca74ac(0x840)]){_0xca74ac(0x66d)!=='CMxgu'?_0x25d1de[_0xca74ac(0x2a0)]&&_0x25d1de[_0xca74ac(0x2a0)]():_0x35e929+=_0x40b31a(_0x13fe71);}_0xc5974c[_0xca74ac(0x792)]();},Spriteset_Base[_0x150bf7(0x8e0)]['removeAllFauxAnimations']=function(){const _0x454748=_0x150bf7;for(const _0x1ef6b5 of this[_0x454748(0x439)]){this[_0x454748(0x1a3)](_0x1ef6b5);}},Spriteset_Base['prototype'][_0x150bf7(0x11b)]=function(){const _0xa151e1=_0x150bf7;return this[_0xa151e1(0x439)][_0xa151e1(0x452)]>0x0;},Spriteset_Base[_0x150bf7(0x8e0)]['updatePointAnimations']=function(){const _0x473448=_0x150bf7;for(const _0x408dbd of this['_pointAnimationSprites']){!_0x408dbd[_0x473448(0x1f1)]()&&(_0x473448(0x74c)===_0x473448(0x74c)?this[_0x473448(0x176)](_0x408dbd):this['catchLoadError'](_0x33d49e));}this['processPointAnimationRequests']();},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x2eb)]=function(){const _0x3604ef=_0x150bf7;for(;;){const _0x21fc36=$gameTemp[_0x3604ef(0x497)]();if(_0x21fc36)this[_0x3604ef(0x41a)](_0x21fc36);else break;}},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x41a)]=function(_0x438f7e){const _0x6c7e09=_0x150bf7,_0x152989=$dataAnimations[_0x438f7e[_0x6c7e09(0x203)]],_0x18f5cf=this[_0x6c7e09(0x5ed)](_0x438f7e),_0x7be04d=_0x438f7e[_0x6c7e09(0x46a)],_0x4f638f=_0x438f7e[_0x6c7e09(0x44d)];let _0x4aae6d=this[_0x6c7e09(0x1df)]();const _0x37fa33=this['animationNextDelay']();if(this['isAnimationForEach'](_0x152989))for(const _0x5bba32 of _0x18f5cf){this[_0x6c7e09(0x276)]([_0x5bba32],_0x152989,_0x7be04d,_0x4aae6d,_0x4f638f),_0x4aae6d+=_0x37fa33;}else _0x6c7e09(0x46d)===_0x6c7e09(0x374)?(this['drawIcon'](_0x43a7ca,_0x501865+0x2,_0x4ab8cf+0x2),_0x26e728-=_0x49a4cb[_0x6c7e09(0x17a)]+0x4,_0x5514ab+=_0x531e4c[_0x6c7e09(0x17a)]+0x4):this['createPointAnimationSprite'](_0x18f5cf,_0x152989,_0x7be04d,_0x4aae6d,_0x4f638f);},Spriteset_Base[_0x150bf7(0x8e0)]['createPointAnimationTargets']=function(_0x3d968c){const _0x2721ca=_0x150bf7,_0x2526f3=new Sprite_Clickable();_0x2526f3['x']=_0x3d968c['x'],_0x2526f3['y']=_0x3d968c['y'],_0x2526f3['z']=0x64;const _0xd9f89f=this['getPointAnimationLayer']();return _0xd9f89f[_0x2721ca(0x5a8)](_0x2526f3),[_0x2526f3];},Spriteset_Base[_0x150bf7(0x8e0)]['getPointAnimationLayer']=function(){return this;},Spriteset_Map[_0x150bf7(0x8e0)][_0x150bf7(0x27f)]=function(){const _0x54a402=_0x150bf7;return this[_0x54a402(0x138)]||this;},Spriteset_Battle['prototype'][_0x150bf7(0x27f)]=function(){return this['_battleField']||this;},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x276)]=function(_0x1c970c,_0x10b8a5,_0x24f9bf,_0x369a85,_0xa8d7f2){const _0x55fb14=_0x150bf7,_0x1f99a6=this['isMVAnimation'](_0x10b8a5),_0x4441e4=new(_0x1f99a6?Sprite_AnimationMV:Sprite_Animation)();_0x4441e4['targetObjects']=_0x1c970c,_0x4441e4[_0x55fb14(0x136)](_0x1c970c,_0x10b8a5,_0x24f9bf,_0x369a85),_0x4441e4['setMute'](_0xa8d7f2),this['_effectsContainer'][_0x55fb14(0x5a8)](_0x4441e4),this['_pointAnimationSprites'][_0x55fb14(0x4c5)](_0x4441e4);},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x176)]=function(_0x34d387){const _0x4c8a1c=_0x150bf7;this[_0x4c8a1c(0x8e2)][_0x4c8a1c(0x7b8)](_0x34d387),this['_effectsContainer']['removeChild'](_0x34d387);for(const _0x436be2 of _0x34d387[_0x4c8a1c(0x840)]){if('zJwSC'===_0x4c8a1c(0x791))_0x1c902e[_0x4c8a1c(0x7d0)][_0x4c8a1c(0x2a1)][_0x4c8a1c(0x697)](this);else{_0x436be2[_0x4c8a1c(0x2a0)]&&(_0x4c8a1c(0x504)===_0x4c8a1c(0x504)?_0x436be2[_0x4c8a1c(0x2a0)]():(_0x5d2c8b[_0x4c8a1c(0x7d0)][_0x4c8a1c(0x6d5)][_0x4c8a1c(0x697)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x4c8a1c(0x4bc)](),this[_0x4c8a1c(0x61f)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),_0x17c76a[_0x4c8a1c(0x6b6)]()));const _0x3dac7d=this[_0x4c8a1c(0x27f)]();if(_0x3dac7d)_0x3dac7d[_0x4c8a1c(0x602)](_0x436be2);}}_0x34d387['destroy']();},Spriteset_Base[_0x150bf7(0x8e0)]['removeAllPointAnimations']=function(){const _0x1bacaa=_0x150bf7;for(const _0xb1443b of this[_0x1bacaa(0x8e2)]){this[_0x1bacaa(0x176)](_0xb1443b);}},Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x502)]=function(){const _0x26c298=_0x150bf7;return this[_0x26c298(0x8e2)][_0x26c298(0x452)]>0x0;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x837)]=Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x4ea)],Spriteset_Base[_0x150bf7(0x8e0)][_0x150bf7(0x4ea)]=function(){const _0x58335d=_0x150bf7;return VisuMZ['CoreEngine']['Spriteset_Base_isAnimationPlaying'][_0x58335d(0x697)](this)||this[_0x58335d(0x502)]();},Spriteset_Battle['prototype'][_0x150bf7(0x30f)]=function(){const _0xbe9ae7=_0x150bf7;this['_backgroundFilter']=new PIXI[(_0xbe9ae7(0x218))][(_0xbe9ae7(0x4d0))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0xbe9ae7(0x84b)]['bitmap']=SceneManager[_0xbe9ae7(0x4d7)](),this[_0xbe9ae7(0x84b)][_0xbe9ae7(0x218)]=[this[_0xbe9ae7(0x554)]],this[_0xbe9ae7(0x663)][_0xbe9ae7(0x5a8)](this['_backgroundSprite']);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x709)]=Spriteset_Battle['prototype'][_0x150bf7(0x53c)],Spriteset_Battle[_0x150bf7(0x8e0)][_0x150bf7(0x53c)]=function(){const _0x44fee1=_0x150bf7;this[_0x44fee1(0x253)]()&&(_0x44fee1(0x208)!==_0x44fee1(0x208)?_0x2d865f[_0x44fee1(0x6a2)]&&(this[_0x44fee1(0x85c)]='ETB'):this[_0x44fee1(0x799)]()),VisuMZ[_0x44fee1(0x7d0)][_0x44fee1(0x709)][_0x44fee1(0x697)](this);},Spriteset_Battle[_0x150bf7(0x8e0)]['coreEngineRepositionEnemies']=function(){const _0x3c35e3=_0x150bf7,_0x36d181=VisuMZ[_0x3c35e3(0x7d0)][_0x3c35e3(0x486)][_0x3c35e3(0x555)];if(!_0x36d181)return![];if(Utils[_0x3c35e3(0x899)]>=_0x3c35e3(0x118)&&!_0x36d181['RepositionEnemies130']){if('clYJx'==='clYJx')return![];else for(const _0x1fe26c in _0x192a7f){const _0x16dd07=_0x25aa5e[_0x1fe26c];_0x16dd07['name'][_0x3c35e3(0x60c)](/(.*)\/(.*)/i)&&(_0x16dd07[_0x3c35e3(0x42a)]=_0x2f2c89(_0x7874f2['$2'][_0x3c35e3(0x37c)]()));}}return _0x36d181[_0x3c35e3(0x501)];},Spriteset_Battle['prototype'][_0x150bf7(0x799)]=function(){const _0x5995eb=_0x150bf7;for(member of $gameTroop[_0x5995eb(0x691)]()){member['moveRelativeToResolutionChange']();}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x1c9)]=Window_Base[_0x150bf7(0x8e0)]['initialize'],Window_Base['prototype'][_0x150bf7(0x8aa)]=function(_0x3378a3){const _0x2d1e68=_0x150bf7;_0x3378a3['x']=Math[_0x2d1e68(0x469)](_0x3378a3['x']),_0x3378a3['y']=Math[_0x2d1e68(0x469)](_0x3378a3['y']),_0x3378a3[_0x2d1e68(0x14c)]=Math[_0x2d1e68(0x469)](_0x3378a3['width']),_0x3378a3[_0x2d1e68(0x567)]=Math['round'](_0x3378a3[_0x2d1e68(0x567)]),this['initDigitGrouping'](),VisuMZ[_0x2d1e68(0x7d0)][_0x2d1e68(0x1c9)][_0x2d1e68(0x697)](this,_0x3378a3),this[_0x2d1e68(0x57d)]();},Window_Base[_0x150bf7(0x8e0)]['initDigitGrouping']=function(){const _0x5098dc=_0x150bf7;this[_0x5098dc(0x464)]=VisuMZ['CoreEngine'][_0x5098dc(0x486)][_0x5098dc(0x51b)][_0x5098dc(0x392)],this[_0x5098dc(0x41e)]=VisuMZ[_0x5098dc(0x7d0)][_0x5098dc(0x486)][_0x5098dc(0x51b)][_0x5098dc(0x53a)];},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x60b)]=function(){const _0x35529a=_0x150bf7;return VisuMZ[_0x35529a(0x7d0)][_0x35529a(0x486)][_0x35529a(0x751)][_0x35529a(0x327)];},Window_Base['prototype'][_0x150bf7(0x8ba)]=function(){const _0x176950=_0x150bf7;return VisuMZ['CoreEngine'][_0x176950(0x486)][_0x176950(0x751)][_0x176950(0x2a8)];},Window_Base['prototype']['updateBackOpacity']=function(){const _0x15144d=_0x150bf7;$gameSystem[_0x15144d(0x700)]?_0x15144d(0x867)!=='tFSEB'?this[_0x15144d(0x795)]=$gameSystem[_0x15144d(0x700)]():(_0x41cfe1<_0x5d5286-_0x4f4080||_0x3a3aed&&_0x580e58===0x1)&&this['smoothSelect']((_0x3e5a64+_0x4d23ab)%_0x440a50):this['backOpacity']=VisuMZ[_0x15144d(0x7d0)][_0x15144d(0x486)]['Window']['BackOpacity'];},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x1fb)]=function(){const _0x2d0f53=_0x150bf7;return VisuMZ['CoreEngine'][_0x2d0f53(0x486)][_0x2d0f53(0x751)][_0x2d0f53(0x641)];},Window_Base['prototype']['openingSpeed']=function(){const _0xdc9c38=_0x150bf7;return VisuMZ[_0xdc9c38(0x7d0)][_0xdc9c38(0x486)][_0xdc9c38(0x751)][_0xdc9c38(0x8ee)];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x7fe)]=Window_Base['prototype'][_0x150bf7(0x5cd)],Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x5cd)]=function(){const _0x39e3b6=_0x150bf7;VisuMZ[_0x39e3b6(0x7d0)][_0x39e3b6(0x7fe)][_0x39e3b6(0x697)](this),this['updateCoreEasing']();},Window_Base['prototype'][_0x150bf7(0x8f7)]=function(){const _0x23435e=_0x150bf7;if(this[_0x23435e(0x133)]){this[_0x23435e(0x8d5)]+=this['openingSpeed']();if(this[_0x23435e(0x529)]()){if(_0x23435e(0x6e6)===_0x23435e(0x6e6))this[_0x23435e(0x133)]=![];else return _0x40cddd[_0x23435e(0x246)]('ok');}}},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x6a0)]=function(){const _0x57ca1c=_0x150bf7;this[_0x57ca1c(0x62b)]&&(_0x57ca1c(0x1b2)===_0x57ca1c(0x1b2)?(this[_0x57ca1c(0x8d5)]-=this['openingSpeed'](),this[_0x57ca1c(0x884)]()&&(this[_0x57ca1c(0x62b)]=![])):this['_forcedTroopView']='FV');},VisuMZ[_0x150bf7(0x7d0)]['Window_Base_drawText']=Window_Base[_0x150bf7(0x8e0)]['drawText'],Window_Base[_0x150bf7(0x8e0)]['drawText']=function(_0x2af706,_0x13ce91,_0x51cc0a,_0x5eeb2c,_0x4e5a00){const _0x277d8f=_0x150bf7;if(this[_0x277d8f(0x3d1)]())_0x2af706=VisuMZ[_0x277d8f(0x2fc)](_0x2af706);VisuMZ[_0x277d8f(0x7d0)][_0x277d8f(0x312)]['call'](this,_0x2af706,_0x13ce91,_0x51cc0a,_0x5eeb2c,_0x4e5a00);},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x3d1)]=function(){const _0x5049bc=_0x150bf7;return this[_0x5049bc(0x464)];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x207)]=Window_Base[_0x150bf7(0x8e0)]['createTextState'],Window_Base[_0x150bf7(0x8e0)]['createTextState']=function(_0x149619,_0x50ba64,_0x541f13,_0x463c05){const _0x39516e=_0x150bf7;var _0x352d26=VisuMZ['CoreEngine'][_0x39516e(0x207)][_0x39516e(0x697)](this,_0x149619,_0x50ba64,_0x541f13,_0x463c05);if(this[_0x39516e(0x1ce)]())_0x352d26[_0x39516e(0x5e7)]=VisuMZ[_0x39516e(0x2fc)](_0x352d26[_0x39516e(0x5e7)]);return _0x352d26;},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x1ce)]=function(){const _0x45b7ff=_0x150bf7;return this[_0x45b7ff(0x41e)];},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x817)]=function(_0x4f6281){this['_digitGrouping']=_0x4f6281;},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x1d6)]=function(_0x41cb13){this['_digitGroupingEx']=_0x41cb13;},VisuMZ['CoreEngine'][_0x150bf7(0x49d)]=Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x5b0)],Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x5b0)]=function(_0x2617ca,_0x4c4636,_0x267429){const _0x2543c5=_0x150bf7;_0x4c4636=Math[_0x2543c5(0x469)](_0x4c4636),_0x267429=Math['round'](_0x267429),VisuMZ[_0x2543c5(0x7d0)][_0x2543c5(0x49d)][_0x2543c5(0x697)](this,_0x2617ca,_0x4c4636,_0x267429);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x5ba)]=Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x38c)],Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x38c)]=function(_0x2bb738,_0x5cd005,_0x446ba0,_0x56f622,_0x409ce0,_0x36ef27){const _0x4951ad=_0x150bf7;_0x409ce0=_0x409ce0||ImageManager[_0x4951ad(0x7ca)],_0x36ef27=_0x36ef27||ImageManager[_0x4951ad(0x5d5)],_0x446ba0=Math[_0x4951ad(0x469)](_0x446ba0),_0x56f622=Math[_0x4951ad(0x469)](_0x56f622),_0x409ce0=Math['round'](_0x409ce0),_0x36ef27=Math[_0x4951ad(0x469)](_0x36ef27),VisuMZ[_0x4951ad(0x7d0)][_0x4951ad(0x5ba)][_0x4951ad(0x697)](this,_0x2bb738,_0x5cd005,_0x446ba0,_0x56f622,_0x409ce0,_0x36ef27);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x84c)]=Window_Base[_0x150bf7(0x8e0)]['drawCharacter'],Window_Base['prototype'][_0x150bf7(0x723)]=function(_0x281021,_0x3cc57a,_0x177784,_0x3c1762){const _0x1f54c6=_0x150bf7;_0x177784=Math['round'](_0x177784),_0x3c1762=Math[_0x1f54c6(0x469)](_0x3c1762),VisuMZ[_0x1f54c6(0x7d0)][_0x1f54c6(0x84c)]['call'](this,_0x281021,_0x3cc57a,_0x177784,_0x3c1762);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x629)]=Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x427)],Window_Selectable[_0x150bf7(0x8e0)]['itemRect']=function(_0xde5da9){const _0x41cc4d=_0x150bf7;let _0x17564d=VisuMZ[_0x41cc4d(0x7d0)][_0x41cc4d(0x629)][_0x41cc4d(0x697)](this,_0xde5da9);return _0x17564d['x']=Math['round'](_0x17564d['x']),_0x17564d['y']=Math[_0x41cc4d(0x469)](_0x17564d['y']),_0x17564d['width']=Math[_0x41cc4d(0x469)](_0x17564d[_0x41cc4d(0x14c)]),_0x17564d[_0x41cc4d(0x567)]=Math[_0x41cc4d(0x469)](_0x17564d[_0x41cc4d(0x567)]),_0x17564d;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x447)]=Window_StatusBase[_0x150bf7(0x8e0)][_0x150bf7(0x12d)],Window_StatusBase[_0x150bf7(0x8e0)][_0x150bf7(0x12d)]=function(_0x57e419,_0x108749,_0xa1db03){const _0x372cb8=_0x150bf7;_0x108749=Math[_0x372cb8(0x469)](_0x108749),_0xa1db03=Math[_0x372cb8(0x469)](_0xa1db03),VisuMZ['CoreEngine'][_0x372cb8(0x447)][_0x372cb8(0x697)](this,_0x57e419,_0x108749,_0xa1db03);},Window_Base[_0x150bf7(0x8e0)]['initCoreEasing']=function(){const _0x47077d=_0x150bf7;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x47077d(0x197),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x47077d(0x7a5)],'targetBackOpacity':this[_0x47077d(0x795)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base['prototype']['updateCoreEasing']=function(){const _0x30c5d9=_0x150bf7;if(!this[_0x30c5d9(0x121)])return;if(this[_0x30c5d9(0x121)][_0x30c5d9(0x2fd)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x30c5d9(0x121)][_0x30c5d9(0x7bd)]),this['y']=this[_0x30c5d9(0x41f)](this['y'],this[_0x30c5d9(0x121)][_0x30c5d9(0x5a1)]),this['scale']['x']=this['applyCoreEasing'](this[_0x30c5d9(0x6ba)]['x'],this[_0x30c5d9(0x121)]['targetScaleX']),this['scale']['y']=this[_0x30c5d9(0x41f)](this[_0x30c5d9(0x6ba)]['y'],this[_0x30c5d9(0x121)][_0x30c5d9(0x672)]),this[_0x30c5d9(0x7a5)]=this[_0x30c5d9(0x41f)](this[_0x30c5d9(0x7a5)],this[_0x30c5d9(0x121)]['targetOpacity']),this[_0x30c5d9(0x795)]=this[_0x30c5d9(0x41f)](this['backOpacity'],this[_0x30c5d9(0x121)][_0x30c5d9(0x5a2)]),this[_0x30c5d9(0x511)]=this['applyCoreEasing'](this[_0x30c5d9(0x511)],this[_0x30c5d9(0x121)][_0x30c5d9(0x50d)]),this[_0x30c5d9(0x121)]['duration']--;},Window_Base[_0x150bf7(0x8e0)]['applyCoreEasing']=function(_0x6f47d,_0x337042){const _0x186f9a=_0x150bf7;if(!this[_0x186f9a(0x121)])return _0x337042;const _0x2616ed=this[_0x186f9a(0x121)][_0x186f9a(0x2fd)],_0x4c3119=this['_coreEasing']['wholeDuration'],_0x2ddd01=this[_0x186f9a(0x5a5)]((_0x4c3119-_0x2616ed)/_0x4c3119),_0x317454=this[_0x186f9a(0x5a5)]((_0x4c3119-_0x2616ed+0x1)/_0x4c3119),_0xe5bcba=(_0x6f47d-_0x337042*_0x2ddd01)/(0x1-_0x2ddd01);return _0xe5bcba+(_0x337042-_0xe5bcba)*_0x317454;},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x5a5)]=function(_0x1e1235){const _0x171a79=_0x150bf7;if(!this[_0x171a79(0x121)])return _0x1e1235;return VisuMZ[_0x171a79(0x39f)](_0x1e1235,this[_0x171a79(0x121)][_0x171a79(0x53f)]||'LINEAR');},Window_Base['prototype'][_0x150bf7(0x212)]=function(_0x5d806a,_0x501c8a){const _0x5e263e=_0x150bf7;if(!this[_0x5e263e(0x121)])return;this['x']=this[_0x5e263e(0x121)][_0x5e263e(0x7bd)],this['y']=this[_0x5e263e(0x121)][_0x5e263e(0x5a1)],this['scale']['x']=this[_0x5e263e(0x121)][_0x5e263e(0x340)],this[_0x5e263e(0x6ba)]['y']=this[_0x5e263e(0x121)]['targetScaleY'],this[_0x5e263e(0x7a5)]=this[_0x5e263e(0x121)][_0x5e263e(0x3c1)],this[_0x5e263e(0x795)]=this[_0x5e263e(0x121)][_0x5e263e(0x5a2)],this[_0x5e263e(0x511)]=this[_0x5e263e(0x121)][_0x5e263e(0x50d)],this['setupCoreEasing'](_0x5d806a,_0x501c8a,this['x'],this['y'],this[_0x5e263e(0x6ba)]['x'],this[_0x5e263e(0x6ba)]['y'],this[_0x5e263e(0x7a5)],this[_0x5e263e(0x795)],this['contentsOpacity']);},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x132)]=function(_0x231ff5,_0x55208d,_0x4dcef4,_0x11c5f0,_0x3e6b09,_0x546e0c,_0x32151c,_0x1767ee,_0x221d36){const _0x29fe5f=_0x150bf7;this[_0x29fe5f(0x121)]={'duration':_0x231ff5,'wholeDuration':_0x231ff5,'type':_0x55208d,'targetX':_0x4dcef4,'targetY':_0x11c5f0,'targetScaleX':_0x3e6b09,'targetScaleY':_0x546e0c,'targetOpacity':_0x32151c,'targetBackOpacity':_0x1767ee,'targetContentsOpacity':_0x221d36};},Window_Base[_0x150bf7(0x8e0)]['drawCurrencyValue']=function(_0x3460b5,_0x2c6ef6,_0x2368b0,_0x4e3a66,_0x10cb23){const _0x103a2e=_0x150bf7;this['resetFontSettings'](),this['contents']['fontSize']=VisuMZ[_0x103a2e(0x7d0)][_0x103a2e(0x486)]['Gold'][_0x103a2e(0x785)];const _0x264aa3=VisuMZ[_0x103a2e(0x7d0)]['Settings']['Gold'][_0x103a2e(0x2be)];if(_0x264aa3>0x0&&_0x2c6ef6===TextManager[_0x103a2e(0x22f)]){if(_0x103a2e(0x8b9)!==_0x103a2e(0x404)){const _0x6b7412=_0x4e3a66+(this['lineHeight']()-ImageManager[_0x103a2e(0x265)])/0x2;this['drawIcon'](_0x264aa3,_0x2368b0+(_0x10cb23-ImageManager[_0x103a2e(0x17a)]),_0x6b7412),_0x10cb23-=ImageManager[_0x103a2e(0x17a)]+0x4;}else _0x19890a[_0x103a2e(0x3b5)]=!![],_0x3e21bd[_0x103a2e(0x7d0)][_0x103a2e(0x35f)][_0x103a2e(0x697)](this,_0x3f9483,_0x1d1556),_0x2e9841[_0x103a2e(0x3b5)]=_0x2c9cef;}else{if('DdjfR'==='vrWEG'){const _0x2c7e81=_0x103a2e(0x8be);this[_0x103a2e(0x7e8)]=this[_0x103a2e(0x7e8)]||{};if(this['_colorCache'][_0x2c7e81])return this[_0x103a2e(0x7e8)][_0x2c7e81];const _0x133df8=_0x40c3a6['CoreEngine'][_0x103a2e(0x486)][_0x103a2e(0x49f)]['ColorHPGauge1'];return this[_0x103a2e(0x3cc)](_0x2c7e81,_0x133df8);}else this[_0x103a2e(0x348)](ColorManager[_0x103a2e(0x660)]()),this['drawText'](_0x2c6ef6,_0x2368b0,_0x4e3a66,_0x10cb23,_0x103a2e(0x400)),_0x10cb23-=this[_0x103a2e(0x2b4)](_0x2c6ef6)+0x6;}this[_0x103a2e(0x59d)]();const _0x1aaa0e=this[_0x103a2e(0x2b4)](this[_0x103a2e(0x464)]?VisuMZ[_0x103a2e(0x2fc)](_0x3460b5):_0x3460b5);_0x1aaa0e>_0x10cb23?_0x103a2e(0x526)!==_0x103a2e(0x526)?this[_0x103a2e(0x8aa)](...arguments):this[_0x103a2e(0x714)](VisuMZ['CoreEngine']['Settings'][_0x103a2e(0x57a)][_0x103a2e(0x48f)],_0x2368b0,_0x4e3a66,_0x10cb23,'right'):this[_0x103a2e(0x714)](_0x3460b5,_0x2368b0,_0x4e3a66,_0x10cb23,_0x103a2e(0x400)),this['resetFontSettings']();},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x798)]=function(_0x5b7d39,_0x5591cb,_0x416eef,_0x506aab,_0x1ad5cf){const _0x1c64c8=_0x150bf7,_0x237172=ImageManager['loadSystem'](_0x1c64c8(0x4db)),_0xdb6ead=ImageManager[_0x1c64c8(0x17a)],_0x4afee5=ImageManager[_0x1c64c8(0x265)],_0x411948=_0x5b7d39%0x10*_0xdb6ead,_0x1364a1=Math[_0x1c64c8(0x7d1)](_0x5b7d39/0x10)*_0x4afee5,_0x2fca51=_0x506aab,_0x44e42b=_0x506aab;this[_0x1c64c8(0x21a)]['_context'][_0x1c64c8(0x5fb)]=_0x1ad5cf,this[_0x1c64c8(0x21a)][_0x1c64c8(0x465)](_0x237172,_0x411948,_0x1364a1,_0xdb6ead,_0x4afee5,_0x5591cb,_0x416eef,_0x2fca51,_0x44e42b),this['contents'][_0x1c64c8(0x6fe)][_0x1c64c8(0x5fb)]=!![];},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x89d)]=function(_0x3f49a4,_0x5db567,_0x2b67c6,_0x3981b6,_0x5b8ea8,_0x110446){const _0x29b4d1=_0x150bf7,_0x26b263=Math[_0x29b4d1(0x7d1)]((_0x2b67c6-0x2)*_0x3981b6),_0x721a1=Sprite_Gauge[_0x29b4d1(0x8e0)][_0x29b4d1(0x724)][_0x29b4d1(0x697)](this),_0x514cbd=_0x5db567+this[_0x29b4d1(0x60b)]()-_0x721a1-0x2;this['contents'][_0x29b4d1(0x3a1)](_0x3f49a4,_0x514cbd,_0x2b67c6,_0x721a1,ColorManager[_0x29b4d1(0x5f1)]()),this[_0x29b4d1(0x21a)]['gradientFillRect'](_0x3f49a4+0x1,_0x514cbd+0x1,_0x26b263,_0x721a1-0x2,_0x5b8ea8,_0x110446);},Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x484)]=function(_0x1c79b3){const _0x273cf0=_0x150bf7;let _0x5e2956=this[_0x273cf0(0x287)]();const _0x5d7f03=this[_0x273cf0(0x466)](),_0x225832=this[_0x273cf0(0x3db)]();if(this[_0x273cf0(0x715)]()&&(_0x5e2956<_0x5d7f03||_0x1c79b3&&_0x225832===0x1)){_0x5e2956+=_0x225832;if(_0x5e2956>=_0x5d7f03)_0x5e2956=_0x5d7f03-0x1;this[_0x273cf0(0x299)](_0x5e2956);}else!this[_0x273cf0(0x715)]()&&((_0x5e2956<_0x5d7f03-_0x225832||_0x1c79b3&&_0x225832===0x1)&&this[_0x273cf0(0x299)]((_0x5e2956+_0x225832)%_0x5d7f03));},VisuMZ[_0x150bf7(0x7d0)]['Window_Selectable_cursorDown']=Window_Selectable['prototype'][_0x150bf7(0x484)],Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x484)]=function(_0x4a7b25){const _0x55ed4e=_0x150bf7;if(this[_0x55ed4e(0x715)]()&&_0x4a7b25&&this[_0x55ed4e(0x3db)]()===0x1&&this['index']()===this[_0x55ed4e(0x466)]()-0x1){if(_0x55ed4e(0x49e)!==_0x55ed4e(0x49e))return _0x16d7c4['CoreEngine'][_0x55ed4e(0x5e5)][_0x1d8845];else this['smoothSelect'](0x0);}else{if(_0x55ed4e(0x268)==='Qwxri')VisuMZ[_0x55ed4e(0x7d0)][_0x55ed4e(0x426)]['call'](this,_0x4a7b25);else{if(!this[_0x55ed4e(0x653)]);const _0x338e1d=this[_0x55ed4e(0x653)][_0x55ed4e(0x42a)]||'';_0x338e1d[_0x55ed4e(0x60c)](/<RATE:[ ](\d+)>/i)&&(this[_0x55ed4e(0x786)]=(_0x54501d(_0x1c160c['$1'])||0x1)[_0x55ed4e(0x4fe)](0x1,0xa));}}},Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x730)]=function(_0x31d48c){const _0x43276f=_0x150bf7;let _0x231e35=Math[_0x43276f(0x391)](0x0,this[_0x43276f(0x287)]());const _0x50b2ef=this[_0x43276f(0x466)](),_0x807c4c=this['maxCols']();if(this[_0x43276f(0x715)]()&&_0x231e35>0x0||_0x31d48c&&_0x807c4c===0x1){if(_0x43276f(0x146)==='FEAyn'){_0x231e35-=_0x807c4c;if(_0x231e35<=0x0)_0x231e35=0x0;this['smoothSelect'](_0x231e35);}else return _0x39590d[_0x43276f(0x7d0)]['Settings'][_0x43276f(0x751)][_0x43276f(0x245)];}else{if(!this['isUseModernControls']()){if(_0x231e35>=_0x807c4c||_0x31d48c&&_0x807c4c===0x1){if(_0x43276f(0x199)==='clPCP'){const _0x26fd88=_0x43276f(0x639);this[_0x43276f(0x7e8)]=this['_colorCache']||{};if(this[_0x43276f(0x7e8)][_0x26fd88])return this[_0x43276f(0x7e8)][_0x26fd88];const _0x97b2d8=_0x8a98df[_0x43276f(0x7d0)][_0x43276f(0x486)]['Color'][_0x43276f(0x757)];return this[_0x43276f(0x3cc)](_0x26fd88,_0x97b2d8);}else this['smoothSelect']((_0x231e35-_0x807c4c+_0x50b2ef)%_0x50b2ef);}}}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x1e7)]=Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x730)],Window_Selectable['prototype'][_0x150bf7(0x730)]=function(_0x238811){const _0x1615d5=_0x150bf7;this['isUseModernControls']()&&_0x238811&&this[_0x1615d5(0x3db)]()===0x1&&this['index']()===0x0?this[_0x1615d5(0x299)](this[_0x1615d5(0x466)]()-0x1):VisuMZ[_0x1615d5(0x7d0)][_0x1615d5(0x1e7)][_0x1615d5(0x697)](this,_0x238811);},Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x715)]=function(){const _0x344032=_0x150bf7;return VisuMZ[_0x344032(0x7d0)][_0x344032(0x486)][_0x344032(0x51b)]['ModernControls'];},VisuMZ[_0x150bf7(0x7d0)]['Window_Selectable_processCursorMove']=Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x255)],Window_Selectable['prototype'][_0x150bf7(0x255)]=function(){const _0x594696=_0x150bf7;this['isUseModernControls']()?(this['processCursorMoveModernControls'](),this['processCursorHomeEndTrigger']()):VisuMZ['CoreEngine'][_0x594696(0x821)]['call'](this);},Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x543)]=function(){return!![];},Window_Selectable[_0x150bf7(0x8e0)]['processCursorMoveModernControls']=function(){const _0x41b0fe=_0x150bf7;if(this[_0x41b0fe(0x174)]()){const _0x590a1e=this[_0x41b0fe(0x287)]();if(Input[_0x41b0fe(0x5fe)](_0x41b0fe(0x350))){if(Input[_0x41b0fe(0x15b)](_0x41b0fe(0x4f2))&&this[_0x41b0fe(0x543)]())this[_0x41b0fe(0x878)]();else{if('BuQCq'!==_0x41b0fe(0x298))return 0.5*_0x2a0175['pow'](0x2,0xa*_0xa2ca25);else this[_0x41b0fe(0x484)](Input['isTriggered']('down'));}}if(Input[_0x41b0fe(0x5fe)]('up')){if(_0x41b0fe(0x2de)!==_0x41b0fe(0x88c)){if(Input[_0x41b0fe(0x15b)](_0x41b0fe(0x4f2))&&this[_0x41b0fe(0x543)]())this[_0x41b0fe(0x280)]();else{if('VLSLa'!==_0x41b0fe(0x468)){let _0x1a85fd=_0x458f01[_0x41b0fe(0x469)](_0x1e3996[_0x41b0fe(0x14c)]/0x2+0xc0);_0x1a85fd-=_0x116a81[_0x41b0fe(0x7d1)]((_0x5336bf[_0x41b0fe(0x14c)]-_0x4d7605[_0x41b0fe(0x8f9)])/0x2),_0x1a85fd+=_0x254028*0x20;let _0x20c794=_0x436c8d[_0x41b0fe(0x567)]-0xc8-_0x25fc76[_0x41b0fe(0x73b)]()*0x30;_0x20c794-=_0x23d1fe[_0x41b0fe(0x7d1)]((_0x9db801[_0x41b0fe(0x567)]-_0x4da639[_0x41b0fe(0x336)])/0x2),_0x20c794+=_0x4e4b54*0x30,this['setHome'](_0x1a85fd,_0x20c794);}else this[_0x41b0fe(0x730)](Input[_0x41b0fe(0x8c0)]('up'));}}else{const _0x261f6b=this[_0x41b0fe(0x66b)]['worldTransform'][_0x41b0fe(0x67e)](new _0xe5c4d2(0x0,0x0)),_0x320471=this[_0x41b0fe(0x66b)][_0x41b0fe(0x408)];_0x320471['x']=_0x261f6b['x']+this[_0x41b0fe(0x883)]['x'],_0x320471['y']=_0x261f6b['y']+this[_0x41b0fe(0x883)]['y'],_0x320471[_0x41b0fe(0x14c)]=_0x5949bb[_0x41b0fe(0x8da)](this['innerWidth']*this[_0x41b0fe(0x6ba)]['x']),_0x320471[_0x41b0fe(0x567)]=_0x587813[_0x41b0fe(0x8da)](this[_0x41b0fe(0x2a4)]*this[_0x41b0fe(0x6ba)]['y']);}}Input[_0x41b0fe(0x5fe)]('right')&&this[_0x41b0fe(0x84d)](Input['isTriggered'](_0x41b0fe(0x400)));if(Input['isRepeated'](_0x41b0fe(0x3f7))){if(_0x41b0fe(0x847)===_0x41b0fe(0x847))this['cursorLeft'](Input[_0x41b0fe(0x8c0)](_0x41b0fe(0x3f7)));else{const _0x222fb6=_0x42b2ee[_0x3db806][_0x41b0fe(0x42a)];_0x415df4+=_0x44d4e3+_0x41b0fe(0x516)[_0x41b0fe(0x322)](_0x5454d9,_0x222fb6||_0x41b0fe(0x631))+_0x259c01;}}if(!this[_0x41b0fe(0x586)]('pagedown')&&Input[_0x41b0fe(0x5fe)](_0x41b0fe(0x6c3))){if('EUgRF'===_0x41b0fe(0x177))this[_0x41b0fe(0x878)]();else{const _0x5cc8af=_0x8c790f[_0x41b0fe(0x2f0)](_0x34464c,_0x41b0fe(0x617));}}!this[_0x41b0fe(0x586)](_0x41b0fe(0x37d))&&Input[_0x41b0fe(0x5fe)](_0x41b0fe(0x37d))&&(_0x41b0fe(0x7f0)!==_0x41b0fe(0x7f0)?(this[_0x41b0fe(0x3ba)]=!![],this['update'](),_0x5723f8[_0x41b0fe(0x3e0)](),this[_0x41b0fe(0x3ba)]=![]):this[_0x41b0fe(0x280)]()),this['index']()!==_0x590a1e&&this[_0x41b0fe(0x7d8)]();}},Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x862)]=function(){const _0x4891ae=_0x150bf7;if(this['isCursorMovable']()){const _0x2c8232=this[_0x4891ae(0x287)]();Input[_0x4891ae(0x8c0)](_0x4891ae(0x4fa))&&this[_0x4891ae(0x299)](Math[_0x4891ae(0x6d6)](this['index'](),0x0)),Input['isTriggered']('end')&&('vAWra'===_0x4891ae(0x6b0)?this[_0x4891ae(0x299)](Math[_0x4891ae(0x391)](this[_0x4891ae(0x287)](),this[_0x4891ae(0x466)]()-0x1)):this[_0x4891ae(0x164)]()),this[_0x4891ae(0x287)]()!==_0x2c8232&&(_0x4891ae(0x5ec)===_0x4891ae(0x5ec)?this[_0x4891ae(0x7d8)]():this[_0x4891ae(0x522)](_0x3d1854));}},VisuMZ[_0x150bf7(0x7d0)]['Window_Selectable_processTouch']=Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x54b)],Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x54b)]=function(){const _0x2370f7=_0x150bf7;if(this[_0x2370f7(0x715)]()){if('uUkqN'===_0x2370f7(0x2af)){if(_0x1b96dc[_0x2370f7(0x7df)]())_0x5cb0c8[_0x2370f7(0x193)](_0x1aa9a0);}else this[_0x2370f7(0x42c)]();}else VisuMZ['CoreEngine'][_0x2370f7(0x2a1)][_0x2370f7(0x697)](this);},Window_Selectable['prototype'][_0x150bf7(0x42c)]=function(){const _0x128b1e=_0x150bf7;VisuMZ[_0x128b1e(0x7d0)]['Window_Selectable_processTouch'][_0x128b1e(0x697)](this);},Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x216)]=function(){const _0x3dc8df=_0x150bf7;return VisuMZ['CoreEngine'][_0x3dc8df(0x486)][_0x3dc8df(0x751)][_0x3dc8df(0x262)];},Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x76c)]=function(){const _0x41a102=_0x150bf7;return VisuMZ[_0x41a102(0x7d0)][_0x41a102(0x486)][_0x41a102(0x751)]['RowSpacing'];},Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x8dd)]=function(){const _0x504748=_0x150bf7;return Window_Scrollable[_0x504748(0x8e0)]['itemHeight'][_0x504748(0x697)](this)+VisuMZ[_0x504748(0x7d0)][_0x504748(0x486)][_0x504748(0x751)][_0x504748(0x6ca)];;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x7d3)]=Window_Selectable['prototype'][_0x150bf7(0x7d4)],Window_Selectable[_0x150bf7(0x8e0)][_0x150bf7(0x7d4)]=function(_0x46bf1b){const _0x3dde24=_0x150bf7,_0x3650a6=VisuMZ[_0x3dde24(0x7d0)][_0x3dde24(0x486)]['Window'];if(_0x3650a6['ShowItemBackground']===![])return;_0x3650a6['DrawItemBackgroundJS']?_0x3650a6[_0x3dde24(0x412)][_0x3dde24(0x697)](this,_0x46bf1b):_0x3dde24(0x499)!==_0x3dde24(0x499)?_0x35701f[_0x3dde24(0x7d0)][_0x3dde24(0x532)]['call'](this):VisuMZ['CoreEngine'][_0x3dde24(0x7d3)][_0x3dde24(0x697)](this,_0x46bf1b);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x3bc)]=Window_Gold[_0x150bf7(0x8e0)][_0x150bf7(0x39d)],Window_Gold[_0x150bf7(0x8e0)]['refresh']=function(){const _0xc09132=_0x150bf7;if(this[_0xc09132(0x556)]())this[_0xc09132(0x506)]();else{if(_0xc09132(0x69a)!==_0xc09132(0x69a))return this[_0xc09132(0x36c)]()&&this[_0xc09132(0x17f)]<this[_0xc09132(0x15c)]*_0x237540[_0xc09132(0x7d0)][_0xc09132(0x486)][_0xc09132(0x6b9)][_0xc09132(0x7bf)];else VisuMZ[_0xc09132(0x7d0)][_0xc09132(0x3bc)][_0xc09132(0x697)](this);}},Window_Gold[_0x150bf7(0x8e0)][_0x150bf7(0x556)]=function(){const _0x1d7469=_0x150bf7;if(TextManager[_0x1d7469(0x22f)]!==this['currencyUnit']())return![];return VisuMZ[_0x1d7469(0x7d0)][_0x1d7469(0x486)][_0x1d7469(0x57a)]['ItemStyle'];},Window_Gold[_0x150bf7(0x8e0)]['drawGoldItemStyle']=function(){const _0x593145=_0x150bf7;this['resetFontSettings'](),this['contents'][_0x593145(0x62c)](),this[_0x593145(0x21a)][_0x593145(0x7a6)]=VisuMZ[_0x593145(0x7d0)][_0x593145(0x486)][_0x593145(0x57a)]['GoldFontSize'];const _0xa47891=VisuMZ[_0x593145(0x7d0)][_0x593145(0x486)][_0x593145(0x57a)][_0x593145(0x2be)],_0x3aa818=this['itemLineRect'](0x0);if(_0xa47891>0x0){const _0x1e54b9=_0x3aa818['y']+(this[_0x593145(0x60b)]()-ImageManager[_0x593145(0x265)])/0x2;this['drawIcon'](_0xa47891,_0x3aa818['x'],_0x1e54b9);const _0x3af464=ImageManager[_0x593145(0x17a)]+0x4;_0x3aa818['x']+=_0x3af464,_0x3aa818['width']-=_0x3af464;}this[_0x593145(0x348)](ColorManager[_0x593145(0x660)]()),this['drawText'](this[_0x593145(0x22f)](),_0x3aa818['x'],_0x3aa818['y'],_0x3aa818[_0x593145(0x14c)],_0x593145(0x3f7));const _0x102a6a=this[_0x593145(0x2b4)](this[_0x593145(0x22f)]())+0x6;;_0x3aa818['x']+=_0x102a6a,_0x3aa818[_0x593145(0x14c)]-=_0x102a6a,this[_0x593145(0x59d)]();const _0x4c56e2=this[_0x593145(0x78f)](),_0x2a9485=this['textWidth'](this['_digitGrouping']?VisuMZ[_0x593145(0x2fc)](this[_0x593145(0x78f)]()):this[_0x593145(0x78f)]());_0x2a9485>_0x3aa818['width']?this['drawText'](VisuMZ['CoreEngine'][_0x593145(0x486)][_0x593145(0x57a)][_0x593145(0x48f)],_0x3aa818['x'],_0x3aa818['y'],_0x3aa818['width'],_0x593145(0x400)):this[_0x593145(0x714)](this[_0x593145(0x78f)](),_0x3aa818['x'],_0x3aa818['y'],_0x3aa818[_0x593145(0x14c)],_0x593145(0x400)),this[_0x593145(0x5bd)]();},Window_StatusBase[_0x150bf7(0x8e0)][_0x150bf7(0x54d)]=function(_0x3b0d13,_0xb59df2,_0x44f432,_0x56b367,_0x7a9cd6){const _0x1dada1=_0x150bf7;_0x56b367=String(_0x56b367||'')[_0x1dada1(0x288)]();if(VisuMZ[_0x1dada1(0x7d0)][_0x1dada1(0x486)]['Param'][_0x1dada1(0x62e)]){const _0x5667f7=VisuMZ[_0x1dada1(0x801)](_0x56b367);if(_0x7a9cd6)this['drawIconBySize'](_0x5667f7,_0x3b0d13,_0xb59df2,this[_0x1dada1(0x562)]()),_0x44f432-=this[_0x1dada1(0x562)]()+0x2,_0x3b0d13+=this[_0x1dada1(0x562)]()+0x2;else{if(_0x1dada1(0x417)===_0x1dada1(0x27d)){_0x535141=_0x7e06a6(_0x3972ba)[_0x1dada1(0x288)]();const _0x22309e=_0x530c19[_0x1dada1(0x7d0)]['Settings'][_0x1dada1(0x6b9)];if(_0x32c4cd===_0x1dada1(0x7e1))return _0x22309e['IconParam0'];if(_0x290a9c==='MAXMP')return _0x22309e[_0x1dada1(0x47c)];if(_0x47c3b3===_0x1dada1(0x382))return _0x22309e['IconParam2'];if(_0x1750ab==='DEF')return _0x22309e['IconParam3'];if(_0x151ebd===_0x1dada1(0x4ef))return _0x22309e[_0x1dada1(0x12c)];if(_0x5d96f2===_0x1dada1(0x63a))return _0x22309e[_0x1dada1(0x3c0)];if(_0xd9057f==='AGI')return _0x22309e[_0x1dada1(0x4c0)];if(_0x5503ae===_0x1dada1(0x582))return _0x22309e[_0x1dada1(0x18d)];if(_0x1e1728===_0x1dada1(0x515))return _0x22309e[_0x1dada1(0x131)];if(_0x4c1fc5==='EVA')return _0x22309e[_0x1dada1(0x38d)];if(_0x5bd35c===_0x1dada1(0x1d1))return _0x22309e['IconXParam2'];if(_0x214e28===_0x1dada1(0x4fb))return _0x22309e[_0x1dada1(0x26c)];if(_0x16dd5c===_0x1dada1(0x8a0))return _0x22309e['IconXParam4'];if(_0x3248bf==='MRF')return _0x22309e['IconXParam5'];if(_0x2673fe===_0x1dada1(0x81c))return _0x22309e['IconXParam6'];if(_0x1d8d5f===_0x1dada1(0x4c4))return _0x22309e[_0x1dada1(0x1d5)];if(_0x171e3e===_0x1dada1(0x496))return _0x22309e[_0x1dada1(0x704)];if(_0x1675cf==='TRG')return _0x22309e[_0x1dada1(0x137)];if(_0x59b1d9==='TGR')return _0x22309e[_0x1dada1(0x621)];if(_0x5d0d56===_0x1dada1(0x8a2))return _0x22309e[_0x1dada1(0x67b)];if(_0x97520d==='REC')return _0x22309e[_0x1dada1(0x5ce)];if(_0x1e2482===_0x1dada1(0x24f))return _0x22309e[_0x1dada1(0x62f)];if(_0x306290==='MCR')return _0x22309e[_0x1dada1(0x788)];if(_0x138f5c===_0x1dada1(0x8b8))return _0x22309e[_0x1dada1(0x286)];if(_0x5ac62a===_0x1dada1(0x865))return _0x22309e[_0x1dada1(0x20b)];if(_0x41818d===_0x1dada1(0x4a8))return _0x22309e[_0x1dada1(0x343)];if(_0x5b7457===_0x1dada1(0x28a))return _0x22309e['IconSParam8'];if(_0x40a6d2===_0x1dada1(0x4c2))return _0x22309e['IconSParam9'];if(_0x47b330['CoreEngine'][_0x1dada1(0x53e)][_0xf9e434])return _0x9c8c1b['CoreEngine'][_0x1dada1(0x53e)][_0x2ee2bc]||0x0;return 0x0;}else this[_0x1dada1(0x5b0)](_0x5667f7,_0x3b0d13+0x2,_0xb59df2+0x2),_0x44f432-=ImageManager[_0x1dada1(0x17a)]+0x4,_0x3b0d13+=ImageManager[_0x1dada1(0x17a)]+0x4;}}const _0x5050d8=TextManager[_0x1dada1(0x467)](_0x56b367);this[_0x1dada1(0x5bd)](),this[_0x1dada1(0x348)](ColorManager[_0x1dada1(0x660)]()),_0x7a9cd6?_0x1dada1(0x5b6)!==_0x1dada1(0x5b6)?this[_0x1dada1(0x30c)](0x0):(this['contents'][_0x1dada1(0x7a6)]=this[_0x1dada1(0x5ab)](),this[_0x1dada1(0x21a)][_0x1dada1(0x714)](_0x5050d8,_0x3b0d13,_0xb59df2,_0x44f432,this[_0x1dada1(0x562)](),_0x1dada1(0x3f7))):_0x1dada1(0x201)!=='moyBe'?this[_0x1dada1(0x714)](_0x5050d8,_0x3b0d13,_0xb59df2,_0x44f432):_0x2d07b0[_0x1dada1(0x7d0)][_0x1dada1(0x40a)][_0x1dada1(0x697)](this),this[_0x1dada1(0x5bd)]();},Window_StatusBase['prototype'][_0x150bf7(0x5ab)]=function(){const _0x2ea8c0=_0x150bf7;return $gameSystem[_0x2ea8c0(0x1ab)]()-0x8;},Window_StatusBase[_0x150bf7(0x8e0)]['drawActorClass']=function(_0x25aae2,_0x1e417d,_0xeb4cdc,_0x262ddf){const _0x3f449e=_0x150bf7;_0x262ddf=_0x262ddf||0xa8,this['resetTextColor']();if(VisuMZ[_0x3f449e(0x7d0)][_0x3f449e(0x486)]['UI'][_0x3f449e(0x513)])this[_0x3f449e(0x5f6)](_0x25aae2['currentClass']()[_0x3f449e(0x42a)],_0x1e417d,_0xeb4cdc,_0x262ddf);else{const _0x1746d9=_0x25aae2[_0x3f449e(0x82e)]()[_0x3f449e(0x42a)][_0x3f449e(0x913)](/\\I\[(\d+)\]/gi,'');this[_0x3f449e(0x714)](_0x1746d9,_0x1e417d,_0xeb4cdc,_0x262ddf);}},Window_StatusBase[_0x150bf7(0x8e0)][_0x150bf7(0x243)]=function(_0x25208c,_0x50bf5d,_0x5b779b,_0x3b53a3){const _0x58ba1b=_0x150bf7;_0x3b53a3=_0x3b53a3||0x10e,this[_0x58ba1b(0x59d)]();if(VisuMZ[_0x58ba1b(0x7d0)]['Settings']['UI'][_0x58ba1b(0x90c)])'IIdVj'!=='aaRcn'?this['drawTextEx'](_0x25208c['nickname'](),_0x50bf5d,_0x5b779b,_0x3b53a3):_0x191bab[_0x58ba1b(0x386)](![]);else{const _0x244677=_0x25208c[_0x58ba1b(0x2f4)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x58ba1b(0x714)](_0x25208c[_0x58ba1b(0x2f4)](),_0x50bf5d,_0x5b779b,_0x3b53a3);}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x818)]=Window_StatusBase['prototype'][_0x150bf7(0x3dc)],Window_StatusBase[_0x150bf7(0x8e0)][_0x150bf7(0x3dc)]=function(_0x7f9dcc,_0x333ba8,_0xbb775d){const _0xa16d4e=_0x150bf7;if(this['isExpGaugeDrawn']())this[_0xa16d4e(0x5a0)](_0x7f9dcc,_0x333ba8,_0xbb775d);VisuMZ[_0xa16d4e(0x7d0)][_0xa16d4e(0x818)][_0xa16d4e(0x697)](this,_0x7f9dcc,_0x333ba8,_0xbb775d);},Window_StatusBase[_0x150bf7(0x8e0)]['isExpGaugeDrawn']=function(){const _0x5262bb=_0x150bf7;return VisuMZ['CoreEngine'][_0x5262bb(0x486)]['UI']['LvExpGauge'];},Window_StatusBase[_0x150bf7(0x8e0)][_0x150bf7(0x5a0)]=function(_0x5cfa59,_0xd029fb,_0x313d19){const _0xce888c=_0x150bf7;if(!_0x5cfa59)return;if(!_0x5cfa59[_0xce888c(0x5ac)]())return;const _0x1ea42b=0x80,_0x55444c=_0x5cfa59[_0xce888c(0x685)]();let _0x4dce1b=ColorManager[_0xce888c(0x64b)](),_0x2dd6ef=ColorManager['expGaugeColor2']();_0x55444c>=0x1&&(_0x4dce1b=ColorManager['maxLvGaugeColor1'](),_0x2dd6ef=ColorManager['maxLvGaugeColor2']()),this[_0xce888c(0x89d)](_0xd029fb,_0x313d19,_0x1ea42b,_0x55444c,_0x4dce1b,_0x2dd6ef);},Window_EquipStatus[_0x150bf7(0x8e0)]['drawAllParams']=function(){const _0x12ba88=_0x150bf7;let _0x2f778b=0x0;for(const _0x472cd8 of VisuMZ[_0x12ba88(0x7d0)][_0x12ba88(0x486)][_0x12ba88(0x6b9)][_0x12ba88(0x5f7)]){const _0x354187=this['itemPadding'](),_0x535b7b=this[_0x12ba88(0x3de)](_0x2f778b);this[_0x12ba88(0x761)](_0x354187,_0x535b7b,_0x472cd8),_0x2f778b++;}},Window_EquipStatus['prototype']['drawParamName']=function(_0x19b7ef,_0x542725,_0x48d2b1){const _0x5084d3=_0x150bf7,_0x55c675=this[_0x5084d3(0x4c3)]()-this[_0x5084d3(0x8ba)]()*0x2;this[_0x5084d3(0x54d)](_0x19b7ef,_0x542725,_0x55c675,_0x48d2b1,![]);},Window_EquipStatus['prototype'][_0x150bf7(0x8f3)]=function(_0x20e741,_0xe5c781,_0x1f6a8b){const _0x7d05d8=_0x150bf7,_0x2fe727=this[_0x7d05d8(0x6bd)]();this[_0x7d05d8(0x59d)](),this[_0x7d05d8(0x714)](this[_0x7d05d8(0x838)][_0x7d05d8(0x581)](_0x1f6a8b,!![]),_0x20e741,_0xe5c781,_0x2fe727,_0x7d05d8(0x400));},Window_EquipStatus['prototype'][_0x150bf7(0x4e3)]=function(_0x35c6d9,_0x1b720f){const _0x12600f=_0x150bf7,_0x4e2a79=this[_0x12600f(0x689)]();this[_0x12600f(0x348)](ColorManager['systemColor']());const _0xb2bdaa=VisuMZ[_0x12600f(0x7d0)]['Settings']['UI'][_0x12600f(0x45f)];this[_0x12600f(0x714)](_0xb2bdaa,_0x35c6d9,_0x1b720f,_0x4e2a79,_0x12600f(0x1e5));},Window_EquipStatus[_0x150bf7(0x8e0)][_0x150bf7(0x8f6)]=function(_0x1ba730,_0x4f4ddb,_0x22ea28){const _0x1becda=_0x150bf7,_0x19c5db=this['paramWidth'](),_0x43bf05=this[_0x1becda(0x8e3)][_0x1becda(0x581)](_0x22ea28),_0x11791a=_0x43bf05-this[_0x1becda(0x838)][_0x1becda(0x581)](_0x22ea28);this[_0x1becda(0x348)](ColorManager[_0x1becda(0x594)](_0x11791a)),this['drawText'](this[_0x1becda(0x8e3)][_0x1becda(0x581)](_0x22ea28,!![]),_0x1ba730,_0x4f4ddb,_0x19c5db,_0x1becda(0x400));},VisuMZ[_0x150bf7(0x7d0)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x150bf7(0x8e0)][_0x150bf7(0x3e6)],Window_EquipItem[_0x150bf7(0x8e0)][_0x150bf7(0x3e6)]=function(_0x5b621d){const _0xb31213=_0x150bf7;return _0x5b621d&&this[_0xb31213(0x838)]?this[_0xb31213(0x838)]['canEquip'](_0x5b621d):VisuMZ[_0xb31213(0x7d0)][_0xb31213(0x12a)]['call'](this,_0x5b621d);},Window_StatusParams['prototype'][_0x150bf7(0x466)]=function(){const _0x4066aa=_0x150bf7;return VisuMZ[_0x4066aa(0x7d0)][_0x4066aa(0x486)]['Param'][_0x4066aa(0x5f7)][_0x4066aa(0x452)];},Window_StatusParams['prototype'][_0x150bf7(0x761)]=function(_0x1b5021){const _0x14088b=_0x150bf7,_0x18cc3c=this['itemLineRect'](_0x1b5021),_0x1e8aff=VisuMZ[_0x14088b(0x7d0)][_0x14088b(0x486)][_0x14088b(0x6b9)][_0x14088b(0x5f7)][_0x1b5021],_0x170d2e=TextManager[_0x14088b(0x467)](_0x1e8aff),_0x1f5108=this['_actor'][_0x14088b(0x581)](_0x1e8aff,!![]);this[_0x14088b(0x54d)](_0x18cc3c['x'],_0x18cc3c['y'],0xa0,_0x1e8aff,![]),this[_0x14088b(0x59d)](),this['drawText'](_0x1f5108,_0x18cc3c['x']+0xa0,_0x18cc3c['y'],0x3c,_0x14088b(0x400));};function _0x36f3(_0x507299,_0xe35b8d){const _0x4e0e11=_0x4e0e();return _0x36f3=function(_0x36f385,_0x238af1){_0x36f385=_0x36f385-0x118;let _0x138037=_0x4e0e11[_0x36f385];return _0x138037;},_0x36f3(_0x507299,_0xe35b8d);}if(VisuMZ['CoreEngine'][_0x150bf7(0x486)][_0x150bf7(0x38e)]['EnableNameInput']){VisuMZ[_0x150bf7(0x7d0)]['Settings'][_0x150bf7(0x38e)][_0x150bf7(0x170)]&&(Window_NameInput[_0x150bf7(0x8c6)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x150bf7(0x2e8),'OK']);;VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x544)]=Window_NameInput['prototype'][_0x150bf7(0x8aa)],Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(_0x20142e){const _0x2722d2=_0x150bf7;this[_0x2722d2(0x4b4)]=this[_0x2722d2(0x843)](),VisuMZ[_0x2722d2(0x7d0)][_0x2722d2(0x544)][_0x2722d2(0x697)](this,_0x20142e);if(this[_0x2722d2(0x4b4)]===_0x2722d2(0x368)){if(_0x2722d2(0x2ec)===_0x2722d2(0x2ec))this[_0x2722d2(0x30c)](0x0);else return this['skills']()[_0x2722d2(0x81a)](_0x43af31=>this[_0x2722d2(0x161)](_0x43af31)&&this['skillTypes']()[_0x2722d2(0x886)](_0x43af31[_0x2722d2(0x81f)]));}else Input[_0x2722d2(0x62c)](),this[_0x2722d2(0x12b)]();},Window_NameInput['prototype'][_0x150bf7(0x843)]=function(){const _0x3bc20f=_0x150bf7;if(Input[_0x3bc20f(0x892)]())return _0x3bc20f(0x368);return VisuMZ['CoreEngine'][_0x3bc20f(0x486)][_0x3bc20f(0x38e)]['DefaultMode']||'keyboard';},VisuMZ['CoreEngine']['Window_NameInput_processHandling']=Window_NameInput['prototype'][_0x150bf7(0x866)],Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x866)]=function(){const _0x2d16b1=_0x150bf7;if(!this['isOpen']())return;if(!this['active'])return;if(this[_0x2d16b1(0x4b4)]==='keyboard'&&Input[_0x2d16b1(0x812)]())_0x2d16b1(0x7f3)!==_0x2d16b1(0x7f3)?(this[_0x2d16b1(0x464)]=_0x5e22e7[_0x2d16b1(0x7d0)][_0x2d16b1(0x486)][_0x2d16b1(0x51b)][_0x2d16b1(0x392)],this[_0x2d16b1(0x41e)]=_0x21e1e7[_0x2d16b1(0x7d0)][_0x2d16b1(0x486)]['QoL']['DigitGroupingExText']):this[_0x2d16b1(0x1d8)](_0x2d16b1(0x368));else{if(Input[_0x2d16b1(0x15a)](_0x2d16b1(0x6b8)))'DHfzM'!==_0x2d16b1(0x28d)?_0xe34aaa[_0x2d16b1(0x4c8)](_0x5e3aab,_0x330668):(Input[_0x2d16b1(0x62c)](),this[_0x2d16b1(0x28b)]());else{if(Input[_0x2d16b1(0x8c0)]('tab')){if(_0x2d16b1(0x2dc)==='CojUY')return 0x0;else Input['clear'](),this[_0x2d16b1(0x4b4)]===_0x2d16b1(0x224)?this[_0x2d16b1(0x1d8)](_0x2d16b1(0x368)):this[_0x2d16b1(0x1d8)](_0x2d16b1(0x224));}else{if(this[_0x2d16b1(0x4b4)]==='keyboard')this['processKeyboardHandling']();else{if(Input[_0x2d16b1(0x15a)]('escape')){if(_0x2d16b1(0x273)===_0x2d16b1(0x637))return _0x55efd6[_0x2d16b1(0x749)][_0x2d16b1(0x873)][_0x2d16b1(0x697)](this);else Input[_0x2d16b1(0x62c)](),this[_0x2d16b1(0x1d8)]('keyboard');}else VisuMZ['CoreEngine'][_0x2d16b1(0x314)]['call'](this);}}}}},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x59a)]=Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x54b)],Window_NameInput[_0x150bf7(0x8e0)]['processTouch']=function(){const _0x18884c=_0x150bf7;if(!this[_0x18884c(0x648)]())return;if(this[_0x18884c(0x4b4)]===_0x18884c(0x224)){if(_0x18884c(0x5be)==='HKODI'){if(TouchInput[_0x18884c(0x8c0)]()&&this[_0x18884c(0x3ec)]())'enkjQ'===_0x18884c(0x31d)?this['switchModes'](_0x18884c(0x368)):(_0x169671[_0x18884c(0x1b5)]=0x0,_0x34d19a[_0x18884c(0x3bd)]=0x0,_0xd6dc10[_0x18884c(0x2ba)]=0x0,_0x56dddd['seVolume']=0x0);else{if(TouchInput['isCancelled']()){if(_0x18884c(0x7b9)!=='dVRxt'){const _0x1c967a=_0xa1a0eb[_0x18884c(0x3a0)];let _0x1bfce8=_0x5385b7[_0x18884c(0x409)];if(['',_0x18884c(0x76b)][_0x18884c(0x886)](_0x1bfce8))_0x1bfce8=_0x2ce97c[_0x18884c(0x411)][_0x18884c(0x697)](this);const _0x1a17f4=_0x5e8cd0['EnableJS'][_0x18884c(0x697)](this),_0x5b70af=_0x341b98[_0x18884c(0x55e)][_0x18884c(0x697)](this);this[_0x18884c(0x1ea)](_0x1bfce8,_0x1c967a,_0x1a17f4,_0x5b70af),this[_0x18884c(0x4e0)](_0x1c967a,_0x3b1ecd['CallHandlerJS']['bind'](this,_0x5b70af));}else this[_0x18884c(0x1d8)](_0x18884c(0x368));}}}else _0x277589[_0x18884c(0x7d0)][_0x18884c(0x541)][_0x18884c(0x697)](this),this[_0x18884c(0x86a)]();}else{if(_0x18884c(0x24c)===_0x18884c(0x758))return 0x0;else VisuMZ[_0x18884c(0x7d0)]['Window_NameInput_processTouch'][_0x18884c(0x697)](this);}},Window_NameInput['prototype']['processKeyboardHandling']=function(){const _0x5248f8=_0x150bf7;if(Input[_0x5248f8(0x15a)]('enter'))Input[_0x5248f8(0x62c)](),this['onNameOk']();else{if(Input[_0x5248f8(0x7a3)]!==undefined){if(_0x5248f8(0x8c2)!==_0x5248f8(0x8c2))return[0x25,0x26,0x27,0x28][_0x5248f8(0x3d5)](this[_0x5248f8(0x331)]);else{let _0x1c88da=Input[_0x5248f8(0x7a3)],_0x385fb2=_0x1c88da[_0x5248f8(0x452)];for(let _0x39518e=0x0;_0x39518e<_0x385fb2;++_0x39518e){if('yIqlK'===_0x5248f8(0x4ed))this[_0x5248f8(0x7d2)]['add'](_0x1c88da[_0x39518e])?SoundManager['playOk']():SoundManager['playBuzzer']();else{this[_0x5248f8(0x21a)][_0x5248f8(0x62c)]();for(let _0x11297b=0x1;_0x11297b<=0x5;_0x11297b++){this[_0x5248f8(0x820)](_0x11297b);}}}Input['clear']();}}}},Window_NameInput['prototype'][_0x150bf7(0x1d8)]=function(_0x53b908){const _0x2d69e7=_0x150bf7;let _0x16056a=this[_0x2d69e7(0x4b4)];this[_0x2d69e7(0x4b4)]=_0x53b908,_0x16056a!==this[_0x2d69e7(0x4b4)]&&(_0x2d69e7(0x891)!==_0x2d69e7(0x891)?this[_0x2d69e7(0x5de)]():(this[_0x2d69e7(0x39d)](),SoundManager[_0x2d69e7(0x380)](),this[_0x2d69e7(0x4b4)]==='default'?this['select'](0x0):this[_0x2d69e7(0x30c)](-0x1)));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x620)]=Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x484)],Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x484)]=function(_0x5c945f){const _0x8eae64=_0x150bf7;if(this['_mode']==='keyboard'&&!Input[_0x8eae64(0x429)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x8eae64(0x7d0)]['Window_NameInput_cursorDown'][_0x8eae64(0x697)](this,_0x5c945f),this[_0x8eae64(0x1d8)]('default');},VisuMZ['CoreEngine'][_0x150bf7(0x416)]=Window_NameInput['prototype'][_0x150bf7(0x730)],Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x730)]=function(_0x5dd40c){const _0x4c294c=_0x150bf7;if(this['_mode']===_0x4c294c(0x224)&&!Input[_0x4c294c(0x429)]())return;if(Input[_0x4c294c(0x808)]())return;VisuMZ['CoreEngine'][_0x4c294c(0x416)][_0x4c294c(0x697)](this,_0x5dd40c),this[_0x4c294c(0x1d8)](_0x4c294c(0x368));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x2ea)]=Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x84d)],Window_NameInput[_0x150bf7(0x8e0)]['cursorRight']=function(_0x3b7266){const _0x235faa=_0x150bf7;if(this[_0x235faa(0x4b4)]===_0x235faa(0x224)&&!Input[_0x235faa(0x429)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x235faa(0x2ea)][_0x235faa(0x697)](this,_0x3b7266),this[_0x235faa(0x1d8)](_0x235faa(0x368));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x19b)]=Window_NameInput['prototype'][_0x150bf7(0x3b4)],Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x3b4)]=function(_0xd5433c){const _0x4c1143=_0x150bf7;if(this[_0x4c1143(0x4b4)]===_0x4c1143(0x224)&&!Input[_0x4c1143(0x429)]())return;if(Input[_0x4c1143(0x808)]())return;VisuMZ[_0x4c1143(0x7d0)][_0x4c1143(0x19b)][_0x4c1143(0x697)](this,_0xd5433c),this[_0x4c1143(0x1d8)](_0x4c1143(0x368));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x5da)]=Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x878)],Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x878)]=function(){const _0x53a22a=_0x150bf7;if(this[_0x53a22a(0x4b4)]===_0x53a22a(0x224))return;if(Input[_0x53a22a(0x808)]())return;VisuMZ[_0x53a22a(0x7d0)][_0x53a22a(0x5da)][_0x53a22a(0x697)](this),this[_0x53a22a(0x1d8)](_0x53a22a(0x368));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x1f7)]=Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x280)],Window_NameInput['prototype'][_0x150bf7(0x280)]=function(){const _0x586de2=_0x150bf7;if(this[_0x586de2(0x4b4)]===_0x586de2(0x224))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x586de2(0x7d0)]['Window_NameInput_cursorPageup'][_0x586de2(0x697)](this),this[_0x586de2(0x1d8)](_0x586de2(0x368));},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x1cf)]=Window_NameInput['prototype']['refresh'],Window_NameInput[_0x150bf7(0x8e0)][_0x150bf7(0x39d)]=function(){const _0x41fbee=_0x150bf7;if(this['_mode']===_0x41fbee(0x224)){if(_0x41fbee(0x2cc)===_0x41fbee(0x514))_0x487ac5(_0x41fbee(0x797)[_0x41fbee(0x322)](_0x3fa231,_0x475893,_0x58089d)),_0x3093df['exit']();else{this[_0x41fbee(0x21a)][_0x41fbee(0x62c)](),this['contentsBack']['clear'](),this['resetTextColor']();let _0x232159=VisuMZ[_0x41fbee(0x7d0)]['Settings']['KeyboardInput'][_0x41fbee(0x1f4)][_0x41fbee(0x835)]('\x0a'),_0x5bda94=_0x232159[_0x41fbee(0x452)],_0x174e43=(this[_0x41fbee(0x2a4)]-_0x5bda94*this[_0x41fbee(0x60b)]())/0x2;for(let _0x233ec4=0x0;_0x233ec4<_0x5bda94;++_0x233ec4){let _0x47ad62=_0x232159[_0x233ec4],_0x204783=this[_0x41fbee(0x385)](_0x47ad62)['width'],_0x1cb193=Math[_0x41fbee(0x7d1)]((this['contents'][_0x41fbee(0x14c)]-_0x204783)/0x2);this[_0x41fbee(0x5f6)](_0x47ad62,_0x1cb193,_0x174e43),_0x174e43+=this[_0x41fbee(0x60b)]();}}}else VisuMZ['CoreEngine'][_0x41fbee(0x1cf)]['call'](this);};};VisuMZ[_0x150bf7(0x7d0)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x150bf7(0x8e0)][_0x150bf7(0x3e6)],Window_ShopSell[_0x150bf7(0x8e0)][_0x150bf7(0x3e6)]=function(_0x2d3b68){const _0x1ad31d=_0x150bf7;return VisuMZ[_0x1ad31d(0x7d0)]['Settings'][_0x1ad31d(0x51b)][_0x1ad31d(0x289)]&&DataManager[_0x1ad31d(0x3af)](_0x2d3b68)?![]:VisuMZ[_0x1ad31d(0x7d0)][_0x1ad31d(0x7d7)][_0x1ad31d(0x697)](this,_0x2d3b68);},Window_NumberInput['prototype'][_0x150bf7(0x715)]=function(){return![];};VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)][_0x150bf7(0x38e)][_0x150bf7(0x69f)]&&(VisuMZ[_0x150bf7(0x7d0)]['Window_NumberInput_start']=Window_NumberInput[_0x150bf7(0x8e0)][_0x150bf7(0x2f6)],Window_NumberInput[_0x150bf7(0x8e0)][_0x150bf7(0x2f6)]=function(){const _0x2d7700=_0x150bf7;VisuMZ['CoreEngine'][_0x2d7700(0x303)][_0x2d7700(0x697)](this),this[_0x2d7700(0x30c)](this['_maxDigits']-0x1),Input[_0x2d7700(0x62c)]();},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x644)]=Window_NumberInput[_0x150bf7(0x8e0)][_0x150bf7(0x3ff)],Window_NumberInput[_0x150bf7(0x8e0)][_0x150bf7(0x3ff)]=function(){const _0x4d176f=_0x150bf7;if(!this[_0x4d176f(0x648)]())return;if(Input[_0x4d176f(0x808)]()){if(_0x4d176f(0x7ed)===_0x4d176f(0x2c7)){const _0x15cd26='_stored_powerDownColor';this['_colorCache']=this['_colorCache']||{};if(this[_0x4d176f(0x7e8)][_0x15cd26])return this[_0x4d176f(0x7e8)][_0x15cd26];const _0x8c76cf=_0x6af80c[_0x4d176f(0x7d0)][_0x4d176f(0x486)][_0x4d176f(0x49f)][_0x4d176f(0x796)];return this[_0x4d176f(0x3cc)](_0x15cd26,_0x8c76cf);}else this[_0x4d176f(0x5b8)]();}else{if(Input[_0x4d176f(0x15a)]('backspace'))this[_0x4d176f(0x6c8)]();else{if(Input[_0x4d176f(0x331)]===0x2e)this[_0x4d176f(0x143)]();else{if(Input['_inputSpecialKeyCode']===0x24)this[_0x4d176f(0x36d)]();else Input[_0x4d176f(0x331)]===0x23?this[_0x4d176f(0x436)]():VisuMZ[_0x4d176f(0x7d0)]['Window_NumberInput_processDigitChange']['call'](this);}}}},Window_NumberInput[_0x150bf7(0x8e0)]['processCursorMove']=function(){const _0x4bc7e2=_0x150bf7;if(!this[_0x4bc7e2(0x174)]())return;if(Input[_0x4bc7e2(0x808)]()){if('ucPCj'!==_0x4bc7e2(0x40e)){const _0x456a48=_0x5151b3[_0x172cbf];if(!_0x456a48)return'';let _0x459f06='';_0x459f06+=_0x456a48[_0x4bc7e2(0x42a)];for(const _0x506805 of _0x456a48['pages']){for(const _0x290c27 of _0x506805[_0x4bc7e2(0x2c6)]){[0x6c,0x198][_0x4bc7e2(0x886)](_0x290c27['code'])&&(_0x459f06+='\x0a',_0x459f06+=_0x290c27['parameters'][0x0]);}}return _0x459f06;}else this[_0x4bc7e2(0x5b8)]();}else Window_Selectable[_0x4bc7e2(0x8e0)][_0x4bc7e2(0x255)]['call'](this);},Window_NumberInput['prototype'][_0x150bf7(0x862)]=function(){},Window_NumberInput['prototype'][_0x150bf7(0x5b8)]=function(){const _0x7e209d=_0x150bf7;if(String(this[_0x7e209d(0x8f1)])[_0x7e209d(0x452)]>=this[_0x7e209d(0x37e)])return;const _0x404f2a=Number(String(this[_0x7e209d(0x8f1)])+Input['_inputString']);if(isNaN(_0x404f2a))return;this[_0x7e209d(0x8f1)]=_0x404f2a;const _0x13cbd5='9'['repeat'](this['_maxDigits']);this[_0x7e209d(0x8f1)]=this['_number'][_0x7e209d(0x4fe)](0x0,_0x13cbd5),Input[_0x7e209d(0x62c)](),this[_0x7e209d(0x39d)](),SoundManager['playCursor'](),this['select'](this['_maxDigits']-0x1);},Window_NumberInput[_0x150bf7(0x8e0)][_0x150bf7(0x6c8)]=function(){const _0x17d4f5=_0x150bf7;this[_0x17d4f5(0x8f1)]=Number(String(this[_0x17d4f5(0x8f1)])[_0x17d4f5(0x475)](0x0,-0x1)),this[_0x17d4f5(0x8f1)]=Math['max'](0x0,this[_0x17d4f5(0x8f1)]),Input[_0x17d4f5(0x62c)](),this[_0x17d4f5(0x39d)](),SoundManager[_0x17d4f5(0x6ee)](),this[_0x17d4f5(0x30c)](this[_0x17d4f5(0x37e)]-0x1);},Window_NumberInput[_0x150bf7(0x8e0)][_0x150bf7(0x143)]=function(){const _0x537498=_0x150bf7;this['_number']=Number(String(this[_0x537498(0x8f1)])['substring'](0x1)),this[_0x537498(0x8f1)]=Math[_0x537498(0x391)](0x0,this[_0x537498(0x8f1)]),Input[_0x537498(0x62c)](),this[_0x537498(0x39d)](),SoundManager['playCursor'](),this[_0x537498(0x30c)](this[_0x537498(0x37e)]-0x1);});;Window_TitleCommand[_0x150bf7(0x493)]=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)][_0x150bf7(0x323)],Window_TitleCommand[_0x150bf7(0x8e0)][_0x150bf7(0x1aa)]=function(){const _0x5dc4be=_0x150bf7;this[_0x5dc4be(0x4ca)]();},Window_TitleCommand[_0x150bf7(0x8e0)][_0x150bf7(0x4ca)]=function(){const _0x55e66b=_0x150bf7;for(const _0x15e065 of Window_TitleCommand['_commandList']){if(_0x15e065[_0x55e66b(0x83b)][_0x55e66b(0x697)](this)){if('Gwvnr'!==_0x55e66b(0x570)){const _0x565407=_0x15e065['Symbol'];let _0x20ecc2=_0x15e065[_0x55e66b(0x409)];if(['',_0x55e66b(0x76b)][_0x55e66b(0x886)](_0x20ecc2))_0x20ecc2=_0x15e065[_0x55e66b(0x411)][_0x55e66b(0x697)](this);const _0x393de7=_0x15e065[_0x55e66b(0x7c5)][_0x55e66b(0x697)](this),_0xa3238=_0x15e065[_0x55e66b(0x55e)][_0x55e66b(0x697)](this);this[_0x55e66b(0x1ea)](_0x20ecc2,_0x565407,_0x393de7,_0xa3238),this[_0x55e66b(0x4e0)](_0x565407,_0x15e065['CallHandlerJS']['bind'](this,_0xa3238));}else{if(_0x2fa57a)_0x3cdd33[_0x55e66b(0x196)](_0x3d5c03);}}}},Window_GameEnd['_commandList']=VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x486)][_0x150bf7(0x708)][_0x150bf7(0x431)]['CommandList'],Window_GameEnd['prototype'][_0x150bf7(0x1aa)]=function(){const _0x414d3f=_0x150bf7;this[_0x414d3f(0x4ca)]();},Window_GameEnd[_0x150bf7(0x8e0)][_0x150bf7(0x4ca)]=function(){const _0x14238f=_0x150bf7;for(const _0x2a59bf of Window_GameEnd[_0x14238f(0x493)]){if(_0x2a59bf[_0x14238f(0x83b)][_0x14238f(0x697)](this)){if(_0x14238f(0x748)!==_0x14238f(0x748))this['_rate']=_0x4285ba['CoreEngine'][_0x14238f(0x486)][_0x14238f(0x51b)][_0x14238f(0x6f6)]??0x4,this['setupCustomRateCoreEngine'](),this['_rate']=this['_rate']['clamp'](0x1,0xa);else{const _0x189974=_0x2a59bf[_0x14238f(0x3a0)];let _0x1f12f3=_0x2a59bf[_0x14238f(0x409)];if(['',_0x14238f(0x76b)][_0x14238f(0x886)](_0x1f12f3))_0x1f12f3=_0x2a59bf['TextJS'][_0x14238f(0x697)](this);const _0x1e9c66=_0x2a59bf[_0x14238f(0x7c5)][_0x14238f(0x697)](this),_0x3c62f5=_0x2a59bf[_0x14238f(0x55e)]['call'](this);this[_0x14238f(0x1ea)](_0x1f12f3,_0x189974,_0x1e9c66,_0x3c62f5),this['setHandler'](_0x189974,_0x2a59bf[_0x14238f(0x893)][_0x14238f(0x45b)](this,_0x3c62f5));}}}};function Window_ButtonAssist(){const _0x90fe1d=_0x150bf7;this[_0x90fe1d(0x8aa)](...arguments);}function _0x4e0e(){const _0x3246ec=['_clickHandler','_buttonAssistWindow','vGruO','maxBattleMembers','1694728mGVPvQ','helpAreaTop','_customModified','LevelUpFullMp','snYTm','BannedWords','mpGaugeColor1','SellRect','WIN_OEM_PA3','INOUTCUBIC','isSceneMap','〘Scrolling\x20Text〙\x0a','Gvbwr','layoutSettings','loadMapData','ExtractStrFromList','jUbps','runCombinedScrollingTextAsCode','Plus2','Scene_Map_initialize','Game_Picture_move','Window','buttonAreaHeight','ExportStrFromAllMaps','zIXCR','pointX','font','ColorTPGauge1','pouRu','advanced','drawGameSubtitle','ConvertParams','agUSk','SwitchToggleRange','sin','enemy','DimColor2','drawItem','getBattleSystem','ParseSkillNotetags','ctGaugeColor1','addLoadListener','REPLACE','MAXMP','_shouldPreventDefault','_categoryWindow','XParamVocab8','Untitled','rowSpacing','Scene_Battle_createSpritesetFix','IDs','StatusMenu','BlcnM','constructor','ActorBgType','ARRAYNUM','centerSprite','needsUpdate','ItemMenu','_colorTone','INOUTBACK','isItem','Center','FontSize','printError','FkjWB','PrVZS','numberShowButton','_pollGamepads','([\x5c+\x5c-]\x5cd+)([%％])>','seVolume','_menuButton','sparamFlat2','GoldFontSize','_rate','FontSmoothing','IconSParam4','padZero','clearZoom','Manual','areTileShadowsHidden','_buyWindow','createTroopNote','value','([\x5c+\x5c-]\x5cd+)>','EsuUc','destroy','isNormalPriority','isGamepadButtonPressed','backOpacity','ColorPowerDown','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawIconBySize','repositionEnemiesByResolution','_numberWindow','erasePicture','PIPE','playOnceParallelInterpreter','F20','xparamPlus1','vertical','SParamVocab8','setSideButtonLayout','_inputString','INQUART','opacity','fontSize','nMbxg','FTB','setViewport','EditBgType','F10','loadSystemImages','Iqzxa','context','updateOpacity','animations','repeat','setMute','EndingID','SHIFT','SwcrT','hpGaugeColor2','sqrt','remove','dVRxt','Key%1','applyForcedGameTroopSettingsCoreEngine','setBackgroundOpacity','targetX','hSiQS','CrisisRate','VisuMZ_1_BattleCore','tpCostColor','Game_Action_numRepeats','rnedm','outlineColor','EnableJS','UgbXZ','OBpOO','VisuMZ_2_BattleSystemBTB','isFullDocumentTitle','faceWidth','string','CustomParamType','join','F22','_movementWholeDuration','CoreEngine','floor','_editWindow','Window_Selectable_drawBackgroundRect','drawBackgroundRect','profileWindowRect','skillTypeWindowRect','Window_ShopSell_isEnabled','playCursorSound','paramBase','eventsXyNt','XTWSN','ImprovedAccuracySystem','HlryN','subtitle','isPlaytest','ZJThL','MAXHP','setMoveEasingType','toLocaleString','removeOnceParallelInterpreter','getLastPluginCommandInterpreter','CRSEL','ONE','_colorCache','aMIDr','EnableMasking','EXSEL','khSAC','DpypM','enemies','createJsQuickFunction','RWxjs','NUMPAD6','_stored_mpGaugeColor2','BVafz','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','offsetX','WwdhC','isMenuButtonAssistEnabled','ColorPowerUp','addEventListener','ZMtNw','Scene_Base_create','KtjhB','img/%1/','Window_Base_update','STR','uiAreaWidth','GetParamIcon','platform','qwsep','_targetOffsetX','SEMICOLON','_downArrowSprite','Control\x20Variables\x20Script\x20Error','isNumpadPressed','createBuffer','ESC','connected','loadPicture','test','ImgLoad','Game_Action_itemHit','OpenURL','PZojN','isGamepadTriggered','traitObjects','visible','DamageColor','AOFYX','enableDigitGrouping','Window_StatusBase_drawActorLevel','children','filter','bgs','CNT','playTestF7','SxpnQ','stypeId','drawSegment','Window_Selectable_processCursorMove','CLOSE_CURLY_BRACKET','tuBvV','updatePlayTestF7','CommandWidth','waiting','adjustBoxSize','ColorMPCost','startAutoNewGame','sparamPlus1','QMXhG','isSideView','setupCustomRateCoreEngine','currentClass','CommandRect','createFauxAnimationSprite','gainItem','original','checkSmartEventCollision','paramRate','split','CPQuU','Spriteset_Base_isAnimationPlaying','_actor','Chance','updateCurrentEvent','ShowJS','LevelUpFullHp','NewGameBoot','WIN_OEM_FJ_LOYA','itemHitImprovedAccuracy','targetObjects','Max','_storedStack','defaultInputMode','KeySHIFT','jYfMo','toFixed','ciHcJ','rIZEb','FqNWU','crCFw','_backgroundSprite','Window_Base_drawCharacter','cursorRight','addOnceParallelInterpreter','keyRepeatWait','valueOutlineColor','514241WIvYzo','numRepeats','sparamRate1','atbActive','IconXParam2','TxGxx','OutlineColorDmg','_windowskin','OptionsRect','Bitmap_measureTextWidth','stencilFunc','_forcedBattleSys','END','randomInt','Game_System_initialize','animationNextDelay','isMaxLevel','processCursorHomeEndTrigger','ShowButtons','checkSubstitute','PDR','processHandling','sJHze','updateWaitMode','stringKeyMap','initMembersCoreEngine','_movementDuration','_anchor','_stored_hpGaugeColor2','SystemLoadImages','battlebacks2','PRINTSCREEN','INOUTQUAD','mtLdD','ActorRect','Sprite_Picture_updateOrigin','showPointAnimations','DigitGroupingGaugeSprites','hWkHL','cursorPagedown','QoAhc','WZgfZ','UNDERSCORE','pixelated','JzjWi','vKvvQ','qnOaG','EscapeAlways','BgFilename1','SParamVocab9','origin','isClosed','_encounterCount','includes','alignBottom','Bitmap_initialize','PqWWs','reservePlayTestNewGameCommonEvent','getCustomBackgroundSettings','wsEdd','FUNC','helpAreaBottom','removeAllFauxAnimations','PAUSE','HBnTt','isGamepadConnected','CallHandlerJS','none','key%1','updateData','21kPpMvJ','characters','RPGMAKER_VERSION','process_VisuMZ_CoreEngine_jsQuickFunctions','showFauxAnimations','outbounce','drawGauge','setupBattleTestItems','_mainSprite','MEV','_commonEventLayers','GRD','\x5c}❪SHIFT❫\x5c{','updatePosition','uyrBW','slotWindowRect','GkZHt','PositionY','setViewportCoreEngineFix','initialize','globalAlpha','pDMhT','AqbtF','INCIRC','setEnemyAction','xmqqc','numberWindowRect','WIN_OEM_CLEAR','cJOJZ','Scene_Item_create','PictureID','onMoveEnd','ONE_MINUS_SRC_ALPHA','TCR','gURKy','itemPadding','Sprite_AnimationMV_updatePosition','Tvhhv','hOWNB','_stored_hpGaugeColor1','dimColor1','isTriggered','Game_Party_consumeItem','PfhNb','_backSprite1','Game_Picture_show','makeActionList','LATIN1','titles2','kuRSV','updateAnchor','rgba(0,\x200,\x200,\x201.0)','StartID','TfKwL','paramRate2','pictures','PreserveNumbers','ColorMPGauge1','KANA','_refreshBack','zwvQn','createPageButtons','openness','openURL','isForFriend','_pointAnimationQueue','sparam','ceil','Graphics_centerElement','BTestWeapons','itemHeight','ParamMax','INQUAD','prototype','startNormalGame','_pointAnimationSprites','_tempActor','buttonAssistText%1','OutlineColor','xparamRate1','xparamFlat2','horizontal','_cacheScaleY','disable','markCoreEngineModified','updateMotion','MultiKeyFmt','OpenSpeed','fillText','EVGOW','_number','zjIDe','drawCurrentParam','Exported_Script_%1.txt','ZRHLD','drawNewParam','updateOpen','TwGkj','boxWidth','applyEasing','Scene_Map_createSpriteset','_stored_deathColor','OUTQUAD','menu','Game_Event_isCollidedWithEvents','ShowDevTools','DEF','batch','itemHit','contentsBack','clearCachedKeys','HckRK','sparamPlus2','tzajR','Scene_MenuBase_createCancelButton','_stored_powerUpColor','csRLS','TextCodeNicknames','SUBTRACT','charAt','VisuMZ_2_BattleSystemFTB','DELETE','(\x5cd+\x5c.?\x5cd+)>','ProfileRect','replace','NUMPAD3','CustomParam','_updateFilterArea','adjustPictureAntiZoom','textHeight','1.3.0','initVisuMZCoreEngine','ProfileBgType','isFauxAnimationPlaying','maxTp','_statusWindow','isSceneBattle','WDfIH','Scene_Skill_create','_coreEasing','ASTERISK','IconSParam9','evaded','equips','Linear','BxYwa','show','StatusBgType','Window_EquipItem_isEnabled','deselect','IconParam4','drawActorSimpleStatus','_drawTextOutline','xScrollLinkedOffset','catchLoadError','IconXParam0','setupCoreEasing','_opening','_commandWindow','getGamepads','setup','IconXParam9','_tilemap','BIxbx','commandWindowRows','rqfuP','onClick','ButtonHeight','LoadError','loadWindowskin','Location','WirnJ','_balloonQueue','processKeyboardDelete','slkXH','_hideTileShadows','FEAyn','X:\x20%1','cFgFJ','_stored_gaugeBackColor','FadeSpeed','F18','width','Plus','_moveEasingType','JtgIO','SEPARATOR','onDatabaseLoaded','ARRAYSTR','XParamVocab3','mainAreaTopSideButtonLayout','parameters','_pictureCoordinatesMode','stencilOp','_battlerName','registerCommand','isSpecialCode','isPressed','mhp','playBuzzer','ILMgK','version','Scene_Menu_create','canUse','OptionsMenu','Padding','setGuard','item','Game_Character_processMoveCommand','BACK_SLASH','areButtonsHidden','_index','_lastPluginCommandInterpreter','OptionsBgType','Troop%1','targetSpritePosition','_pictureCoordinatesWindow','updatePositionCoreEngineShakeOriginal','QwertyLayout','isBottomHelpMode','randomJS','SystemSetWindowPadding','isCursorMovable','Basic','removePointAnimation','EUgRF','storeMapData','robHd','iconWidth','framebuffer','clearStencil','MAX_SAFE_INTEGER','Upper\x20Left','_hp','xQZfC','Yuvqz','HYPHEN_MINUS','_lastY','PictureEasingType','EQUAL','SParamVocab2','isCollidedWithEvents','qgLUX','ListBgType','command111','itemEva','ColorCrisis','IconParam7','note','F11','makeInputButtonString','UQuYc','system','log','XndOw','Input_onKeyDown','ParseActorNotetags','LINEAR','buttonAssistOk','HnABm','WQLgZ','Window_NameInput_cursorLeft','CONVERT','setupNewGame','buttonAssistOffset3','pointY','CchQc','_realScale','shake','removeFauxAnimation','StatusEquipRect','InputRect','INQUINT','ActorTPColor','yHhBP','【%1】\x0a','makeCommandList','mainFontSize','\x5c}❪TAB❫\x5c{','enable','LESS_THAN','ACCEPT','_shakePower','buttonAssistKey%1','CeFwB','DOLLAR','WismF','bgmVolume','CTB','Spriteset_Base_update','isCancelled','INEXPO','ColorDeath','itemWindowRect','_active','buttonAssistSwitch','getBackgroundOpacity','Scene_Options_create','hit','cancelShowButton','gold','fHUvv','indexOf','_list','SParamVocab5','mapId','Scene_Battle_update','Window_Base_initialize','easingType','save','Subtitle','_timerSprite','useDigitGroupingEx','Window_NameInput_refresh','AnimationPoint','CRI','makeAutoBattleActions','_bitmap','setColorTone','IconXParam7','enableDigitGroupingEx','setFrame','switchModes','setSkill','BTB','damageColor','resetBattleSystem','STB','ScreenShake','animationBaseDelay','SmartEventCollisionPriority','VlLPa','process_VisuMZ_CoreEngine_Notetags','en-US','isDying','center','〘Common\x20Event\x20%1:\x20%2〙\x20Start','Window_Selectable_cursorUp','paramMaxJS','Flat2','addCommand','XWhnn','ZyvvI','setSize','style','Origin','_data','isPlaying','CFEWR','Game_Interpreter_command122','NameInputMessage','bitmapWidth','makeDocumentTitle','Window_NameInput_cursorPageup','windowPadding','Abbreviation','initBasic','translucentOpacity','_storedMapText','move','SideButtons','HelpBgType','TILDE','SdImJ','INOUTQUART','animationId','Scene_GameEnd_createBackground','position','VisuMZ_2_BattleSystemSTB','Window_Base_createTextState','TbPlh','tpColor','mpColor','IconSParam6','IconXParam4','buttonAssistText1','GoldChange','CategoryRect','VRXyH','OwMqu','anchorCoreEasing','SceneManager_initialize','picture','BlzNg','colSpacing','CTRL','filters','bitmap','contents','%2%1%3','updateKeyText','_smooth','_height','Rate1','DummyRect','_targetScaleY','isTpb','WIN_OEM_PA2','keyboard','consumeItem','keypress','Rate2','_buttonType','MapOnceParallel','attackSkillId','maxLvGaugeColor2','onerror','_makeFontNameText','skills','currencyUnit','kJsQr','_defaultStretchMode','Vcwiz','HXBTB','Y:\x20%1','NUMPAD5','command357','updateOnceParallelInterpreters','sTZLu','mmVgV','_drawTextBody','send','drawCircle','crisisColor','Game_Interpreter_command355','_battleField','scaleMode','reserveCommonEvent','EQUALS','drawActorNickname','INOUTQUINT','RowSpacing','getInputButtonString','GpACy','isOptionValid','WIN_OEM_AUTO','buttonAssistWindowRect','fbZCw','ZIgXF','moveCancelButtonSideButtonLayout','getColor','PHA','battlebacks1','SideView','EncounterRateMinimum','coreEngineRepositionEnemies','WUosR','processCursorMove','Version','wait','Duration','pYAJB','catchUnknownError','NUMPAD1','SceneManager_onKeyDown','uzVKQ','QutDv','WTyFg','AsvzL','sAFkm','ColSpacing','ExportAllMapText','xxwxk','iconHeight','_hovered','skipBranch','Qwxri','CancelText','qKwax','Sprite_Actor_setActorHome','IconXParam3','ExtractStrFromMap','processMoveCommand','F19','startAnimation','NUMPAD4','random','XdGds','Game_Picture_updateMove','_fauxAnimationQueue','createPointAnimationSprite','PTB','Scene_MenuBase_mainAreaHeight','F15','application/json','renderNoMask','_mapNameWindow','Hxuqs','OPEN_CURLY_BRACKET','getPointAnimationLayer','cursorPageup','TAB','drawGameVersion','checkCacheKey','WIN_OEM_FJ_TOUROKU','(\x5cd+)>','IconSParam5','index','toUpperCase','KeyItemProtect','FDR','processBack','avaUc','DHfzM','alpha','_itemWindow','Actor','TextManager_param','ColorManager_loadWindowskin','qxjxr','OUTELASTIC','evade','movePageButtonSideButtonLayout','_origin','BuQCq','smoothSelect','ActorHPColor','nQkjl','_inputWindow','DocumentTitleFmt','createCustomParameter','updateScene','endAnimation','Window_Selectable_processTouch','focus','TRZqN','innerHeight','Game_BattlerBase_refresh','powerUpColor','_screenY','ItemPadding','DpWoI','RevertPreserveNumbers','SlotRect','JRcnC','measureText','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','jYQIi','CONTEXT_MENU','cancel','DzLgi','Sprite_Animation_setViewport','textWidth','IconParam2','calcEasing','buttonAssistKey5','AutoStretch','AMPERSAND','meVolume','jsQuickFunc','gainGold','IconParam0','GoldIcon','_pagedownButton','ColorTPGauge2','_forcedTroopView','processAlwaysEscape','exportAllTroopStrings','kWlXo','DataManager_setupNewGame','list','mPruk','ExRsM','updateDocumentTitle','darwin','lYIIH','EgZjF','setActorHomeRepositioned','dimColor2','XParameterFormula','setupRate','4fKiGKQ','ExportStrFromAllTroops','VisuMZ_1_OptionsCore','PxqxL','createFauxAnimation','isNwjs','originalJS','_drawTextShadow','ColorCTGauge1','_stored_ctGaugeColor2','GtgYr','rvEpb','twneN','XITyt','initCoreEngineScreenShake','button','_cacheScaleX','Scene_Map_updateScene','Scene_Equip_create','MCR','ActorMPColor','dVgYJ','onButtonImageLoad','Page','BqaPi','Window_NameInput_cursorRight','processPointAnimationRequests','PQZpR','hpColor','getInputMultiButtonStrings','Game_Picture_y','open','_slotWindow','Game_Interpreter_command111','onInputOk','nickname','anchor','start','StatusEquipBgType','_skillTypeWindow','WIN_OEM_ENLW','defineProperty','Bitmap_fillRect','GroupDigits','duration','Bitmap_clearRect','levelUp','_subject','_offsetY','ColorMPGauge2','Window_NumberInput_start','OUTQUINT','Scene_MenuBase_createPageButtons','rCSPI','result','HzVLB','Graphics','BottomButtons','DgMnM','select','onKeyDown','isMagical','createBackground','ItemBackColor2','parse','Window_Base_drawText','MIOhS','Window_NameInput_processHandling','subjectHitRate','PixelateImageRendering','powerDownColor','buttonAssistWindowSideRect','Sprite_Picture_loadBitmap','ColorNormal','resize','Sprite_Button_initialize','enkjQ','cUyKu','_pictureContainer','JBzWR','down2','format','TitleCommandList','VisuMZ_2_BattleSystemCTB','onKeyDownKeysF6F7','_targetX','LineHeight','Scene_MenuBase_mainAreaTop','Graphics_printError','maxGold','GoldRect','AHtUw','UsSYb','altKey','OPEN_BRACKET','tileWidth','_inputSpecialKeyCode','buttonAssistKey2','paramName','0.00','ENTER_SPECIAL','boxHeight','processSoundTimings','ATTN','innerWidth','updateMainMultiply','RIGHT','TimeProgress','lJVyn','AnimationMirrorOffset','BACKSPACE','targetScaleX','_targetOpacity','GFnjH','IconSParam7','ACdaV','_registerKeyInput','drawGameTitle','F12','changeTextColor','status','ColorSystem','_stored_systemColor','setBackgroundType','pyxck','ColorExpGauge1','mainAreaHeight','down','SwitchActorText','Graphics_defaultStretchMode','_isButtonHidden','ParseItemNotetags','TSNQh','_windowLayer','add','ShopMenu','offsetY','keyMapper','ueWaW','XParamVocab7','setMainFontSize','SParamVocab3','Game_Actor_changeClass','params','areButtonsOutsideMainUI','HANJA','restore','ETB','vzSrQ','itemBackColor1','EnableNameInput','default','viewport','tab','strokeRect','isAlive','processKeyboardHome','wRRsc','updateShadow','processEscape','ConvertNumberToString','DMqEO','%1/','TCGyw','ctrl','_pauseSignSprite','SkillTypeBgType','Bitmap_resize','nw.gui','getLevel','PLUS','trim','pageup','_maxDigits','HOME','playOk','top','ATK','kbAXy','NUM_LOCK','textSizeEx','setSideView','TRG','paramMax','FontShadows','kueIi','setLastPluginCommandInterpreter','drawFace','IconXParam1','KeyboardInput','Game_Action_setAttack','StatusParamsBgType','max','DigitGroupingStandardText','OlYLb','Scene_Battle_createCancelButton','BackOpacity','ExtDisplayedParams','nah','_action','LpfnC','TFRIX','_centerElement','lUIAz','refresh','Game_Action_itemEva','ApplyEasing','Symbol','fillRect','inbounce','animationShouldMirror','qtvff','Sprite_Gauge_currentValue','changeClass','VisuMZ_2_BattleSystemOTB','Rate','paramBaseAboveLevel99','F16','createCustomBackgroundImages','F6key','rXvXe','getCoreEngineScreenShakeStyle','isKeyItem','AllMaps','makeFontBigger','_lastOrigin','Scene_Map_update','cursorLeft','_changingClass','_sellWindow','_troopId','retreat','F13','_playtestF7Looping','_stored_normalColor','Window_Gold_refresh','bgsVolume','up2','nACGX','IconParam5','targetOpacity','setupButtonImage','DigitGroupingLocale','PA1','YTWLk','drawTextTopAligned','INSINE','REC','INSERT','setCommonEvent','cBgFM','getColorDataFromPluginParameters','ParseClassNotetags','buttonAssistText4','toString','jsonToZip','useDigitGrouping','CSxnc','flush','sparamPlus','contains','xgnwV','reserveNewGameCommonEvent','isMapScrollLinked','F21','setAction','maxCols','drawActorLevel','VdLsR','paramY','OUTQUART','updateEffekseer','Spriteset_Base_destroy','Bitmap_drawTextOutline','deathColor','useFontWidthFix','process_VisuMZ_CoreEngine_RegExp','isEnabled','expGaugeColor2','horzJS','ALWAYS','onload','Game_Interpreter_command105','isTouchedInsideFrame','viYgp','TnANe','command105','setCoreEngineScreenShakeStyle','code','Game_Event_start','OS_KEY','isInstanceOfSceneMap','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','cTfeE','left','font-smooth','_viewportSize','Game_Picture_initBasic','initMembers','paramPlus','forceOutOfPlaytest','helpAreaTopSideButtonLayout','processDigitChange','right','iTAoN','SubfolderParse','F17','bAbpJ','setActionState','end','Mute','filterArea','TextStr','Scene_Boot_startNormalGame','_offsetX','windowRect','ListRect','ucPCj','RDWiS','fadeSpeed','TextJS','DrawItemBackgroundJS','fQiwr','setValue','loadGameImagesCoreEngine','Window_NameInput_cursorUp','KSOOd','Sprite_Gauge_gaugeRate','abs','createPointAnimation','ICfSL','statusWindowRect','%1〘Choice\x20%2〙\x20%3%1','_digitGroupingEx','applyCoreEasing','textColor','BlendMode','_shakeSpeed','parallaxes','TZUUH','buttonAssistKey1','Window_Selectable_cursorDown','itemRect','MULTIPLY','isArrowPressed','name','initCoreEngine','processTouchModernControls','updatePointAnimations','SLASH','KeyTAB','VisuMZ_2_BattleSystemPTB','GameEnd','_pictureName','moveMenuButtonSideButtonLayout','yScrollLinkedOffset','parseForcedGameTroopSettingsCoreEngine','processKeyboardEnd','setCoreEngineUpdateWindowBg','pAsTg','_fauxAnimationSprites','volume','performMiss','_currentMap','Sprite_AnimationMV_processTimingData','makeFontSmaller','get','Game_Action_updateLastTarget','requestMotion','goldWindowRect','buttonAssistText2','XlHVm','DIVIDE','baWIo','Window_StatusBase_drawActorSimpleStatus','Scene_Name_onInputOk','WIN_OEM_COPY','QUESTION_MARK','LEFT','riFvU','mute','fillStyle','_cache','initButtonHidden','_refreshArrows','length','QUOTE','ItemRect','paramRate1','textAlign','Scene_Unlisted','BattleManager_processEscape','_actorWindow','BWZtW','bind','DummyBgType','Scene_Base_terminate','ZPcet','ParamArrow','Scene_Boot_loadSystemImages','Scene_Map_updateMainMultiply','NWmWO','ZwBgM','_digitGrouping','blt','maxItems','param','VLSLa','round','mirror','_dimmerSprite','moveRelativeToResolutionChange','UosoW','fhaQI','BasicParameterFormula','_statusEquipWindow','targets','makeTargetSprites','Power','ColorExpGauge2','slice','ParseStateNotetags','TWHEQ','overrideMimeType','_spriteset','updatePositionCoreEngineShakeVert','faces','IconParam1','COLON','XPvhl','WIN_OEM_FJ_JISHO','sparamPlusJS','level','_createInternalTextures','currentExp','cursorDown','BattleManager_checkSubstitute','Settings','ARRAYJSON','hideButtonFromView','_centerElementCoreEngine','CIRCUMFLEX','juGXI','itypeId','ExtractStrFromTroop','measureTextWidthNoRounding','GoldOverlap','NUMPAD9','isPhysical','pow','_commandList','showDevTools','retrieveFauxAnimation','MRG','retrievePointAnimation','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','BeKiI','Dgdry','map','isAnimationOffsetXMirrored','Window_Base_drawIcon','dgRFj','Color','_upArrowSprite','mpGaugeColor2','adjustSprite','isGameActive','YJBRL','Scene_Map_updateMain','requestFauxAnimation','_targetY','MDR','<JS\x20%1\x20%2:[\x20](.*)>','xparamRateJS','_internalTextures','clearOnceParallelInterpreters','targetPosition','iVupB','Sprite_Battler_startMove','OjOyu','helpWindowRect','playCancel','ExportString','_mode','DimColor1','xparamPlus','guardSkillId','Scene_Battle_createSpriteset','GfBVp','Speed','createPointAnimationQueue','process_VisuMZ_CoreEngine_Settings','editWindowRect','gaugeRate','Scene_Map_createSpritesetFix','IconParam6','Smooth','EXR','paramX','HRG','push','asin','TzbLX','loadBitmap','Sprite_destroy','makeCoreEngineCommandList','updatePictureAntiZoom','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Zvzdm','PeHYw','EREOF','BlurFilter','iRtXy','Bitmap_drawText','DhyAt','makeDeepCopy','sparamRate2','FINAL','backgroundBitmap','_isWindow','FunctionName','number','IconSet','uiAreaHeight','ExportAllTroopText','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','SSCcQ','setHandler','exit','WIN_OEM_FINISH','drawRightArrow','ColorHPGauge2','_onKeyPress','create','sparamRateJS','loadTitle1','OUTBACK','isAnimationPlaying','HelpRect','optionsWindowRect','yIqlK','_backSprite2','MAT','ParamName','sparamFlatJS','shift','playTestF6','XParamVocab1','CreateBattleSystemID','sv_enemies','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','JSON','SCROLL_LOCK','home','CEV','buttonAssistWindowButtonRect','TlJOt','clamp','gRbXa','isActiveTpb','RepositionEnemies','isPointAnimationPlaying','processTimingData','DktGl','LoadMenu','drawGoldItemStyle','cqvjH','_CoreEngineSettings','_targetOffsetY','text%1','isSideButtonLayout','EditRect','targetContentsOpacity','NumberRect','OkText','XParamVocab0','contentsOpacity','NUMPAD8','TextCodeClassNames','eYLUM','HIT','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Input_pollGamepads','URL','QOVnP','wQMxL','QoL','_repositioned','setupCoreEngine','setTargetAnchor','LOITC','gLrpE','performEscape','catchNormalError','ojEpp','actorWindowRect','Flat','rsNCd','Game_BattlerBase_initMembers','ADD','isOpen','Input_update','Game_Temp_initialize','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','onInputBannedWords','WIN_OEM_RESET','clearRect','_pressed','isRightInputMode','Scene_Boot_updateDocumentTitle','ColorGaugeBack','IconXParam6','commandWindowRect','ButtonFadeSpeed','fEDLd','titles1','bgm','DigitGroupingExText','qNPWq','createEnemies','_statusParamsWindow','CustomParamIcons','type','INELASTIC','Spriteset_Base_initialize','statusParamsWindowRect','allowShiftScrolling','Window_NameInput_initialize','EVA','PRINT','CommonEventID','NameMenu','zqoMb','Bitmap_strokeRect','processTouch','STENCIL_BUFFER_BIT','drawParamText','WIN_ICO_00','$dataMap','tpGaugeColor1','measureTextWidth','Bitmap_gradientFillRect','titleCommandWindow','_backgroundFilter','ScreenResolution','isItemStyle','_profileWindow','fOFLM','addWindow','DTB','gameTitle','xrXWd','destroyed','ExtJS','HjRrF','toLowerCase','Hnqtj','gaugeLineHeight','image-rendering','Tilemap_addShadow','DPrCg','WindowLayer_render','height','blockWidth','XSFtU','PictureEraseAll','pictureButtons','Input_setupEventHandlers','INOUTELASTIC','encounterStep','AGI','InDLr','actor','Sprite_Animation_processSoundTimings','battleSystem','valueOutlineWidth','RegExp','missed','aUezV','OUTCIRC','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','Gold','SaveMenu','CodeJS','initCoreEasing','vertJS','ParseEnemyNotetags','Wait','paramValueByName','LUK','ddWXb','dashToggle','fromCharCode','isHandled','subject','updateOrigin','ColorCTGauge2','terms','_coreEasingType','InputBgType','bSmSb','IconIndex','command355','pagedownShowButton','CANCEL','itemSuccessRate','initialBattleSystem','paramchangeTextColor','bitmapHeight','EXECUTE','isSmartEventCollisionOn','INOUTCIRC','_lastX','Window_NameInput_processTouch','sVKnJ','SceneManager_isGameActive','resetTextColor','exportAllMapStrings','learnings','drawActorExpGauge','targetY','targetBackOpacity','vYkZL','BTestItems','calcCoreEasing','ForceNoPlayTest','F14','addChild','ENTER','maxLvGaugeColor1','smallParamFontSize','isActor','optSideView','isWindowMaskingEnabled','zxrIy','drawIcon','_dummyWindow','displayX','playMiss','_cancelButton','Game_Interpreter_PluginCommand','bKoBU','updateLastTarget','processKeyboardDigitChange','WDHWd','Window_Base_drawFace','sPdAz','CLEAR','resetFontSettings','HKODI','Game_Picture_x','xparam','3238200HJuvOo','ABsUc','keyCode','setAnchor','isBottomButtonMode','setActorHome','outlineColorDmg','Input_shouldPreventDefault','RepositionActors','data/','process_VisuMZ_CoreEngine_CustomParameters','createCommandWindow','update','IconSParam2','GET','createFauxAnimationQueue','isEnemy','ShortcutScripts','skillTypes','clone','faceHeight','createWindowLayer','_scaleY','option','playLoad','Window_NameInput_cursorPagedown','Map%1.json','Scene_Name_create','XParamVocab9','setAttack','escape','_onKeyDown','tJoRJ','destroyCoreEngineMarkedBitmaps','MODECHANGE','VOLUME_MUTE','CustomParamNames','updateMove','text','paramFlat','currentValue','_playTestFastMode','ButtonAssist','meVXJ','createPointAnimationTargets','_shakeDuration','events','setEasingType','gaugeBackColor','isMaskingEnabled','mainAreaTop','urHXg','LAEQW','drawTextEx','DisplayedParams','%1\x0a','inBattle','_onceParallelInterpreters','imageSmoothingEnabled','encounterStepsMinimum','hpGaugeColor1','isRepeated','determineSideButtonLayoutValid','ctrlKey','startMove','removeChild','_stored_ctGaugeColor1','MRF','createSpriteset','itemBackColor2','184650MvNQAn','buttonAssistOffset4','akdlz','DOWN','lineHeight','match','return\x200','Sprite_Button_updateOpacity','SystemSetBattleSystem','TPB\x20WAIT','Plus1','buttonAssistText5','wXsnI','_mirror','XParamVocab6','transform','_blank','pages','123780GWtXbc','1346334OalhEp','OPEN_PAREN','mev','_stored_expGaugeColor2','scaleSprite','process_VisuMZ_CoreEngine_Functions','Window_NameInput_cursorDown','IconSParam0','terminate','OTB','aIoqF','command122','isBusy','paramFlatJS','ZERO','Window_Selectable_itemRect','getButtonAssistLocation','_closing','clear','createMenuButton','DrawIcons','IconSParam3','_scaleX','Unnamed','Scene_Shop_create','HniLn','cos','zTRWQ','STRUCT','DeWSm','addChildToBack','_stored_tpGaugeColor1','MDF','SkillMenu','WIN_OEM_JUMP','doesNameContainBannedWords','Icon','WIN_OEM_PA1','CLOSE_PAREN','TranslucentOpacity','xparamFlatJS','_hideButtons','Window_NumberInput_processDigitChange','Ngbni','CLOSE_BRACKET','ApKbD','isOpenAndActive','SPACE','NoTileShadows','expGaugeColor1','numActions','ScaleX','_optionsWindow','AccuracyBoost','xparamRate2','normal','_opacity','_animation','Game_Picture_calcEasing','KEEP','tilesets','SParamVocab0','PVSIo','INOUTEXPO','DefaultStyle','SwitchToggleOne','DOUBLE_QUOTE','setupValueFont','BaseTexture','ZcGmu','systemColor','AMYmy','concat','_baseSprite','Game_Troop_setup','buttonAssistOffset%1','BattleManager_update','buttonY','_gamepadWait','NewGameCommonEvent','SxBlR','_clientArea','updatePositionCoreEngineShakeHorz','OYCPr','KTBJQ','Bitmap_blt','ModernControls','NjReH','targetScaleY','ParseTilesetNotetags','createDigits','uyQSX','ColorTPCost','usableSkills','1050147CJUPWe','MainMenu','OUTBOUNCE','IconSParam1','ColorMaxLvGauge2','YslgE','apply','BoxMargin','stop','requestPointAnimation','zSMkl','oukhV','Title','expRate','xparamFlatBonus','ParseArmorNotetags','F7key','rightArrowWidth','Game_Map_setup','updateFauxAnimations','Script\x20Call\x20Error','_width','Scene_Title_drawGameTitle','loadIconBitmap','ARRAYEVAL','members','\x0a\x0a\x0a\x0a\x0a','refreshDimmerBitmap','Total','MAX_GL_TEXTURES','oCrTh','call','Scene_MenuBase_createBackground','_sideButtonLayout','ZUKGz','_listWindow','INOUTSINE','_stored_crisisColor','padding','EnableNumberInput','updateClose','Scene_Base_createWindowLayer','VisuMZ_2_BattleSystemETB','createCancelButton','DigitGroupingDamageSprites','Game_Screen_initialize','Layer','_pageupButton','ddQoZ','snapForBackground','ParseWeaponNotetags','buttonAssistKey4','TMSQl','GoldMax','createButtonAssistWindow','Game_Interpreter_updateWaitMode','vAWra','DECIMAL','Input_clear','evaluate','PERIOD','ARRAYFUNC','ParseAllNotetags','mdxvR','backspace','Param','scale','(\x5cd+)([%％])>','smooth','paramWidth','INBACK','fwrNa','StatusRect','_targetAnchor','sv_actors','pagedown','description','SCALE_MODES','BuyBgType','STENCIL_TEST','processKeyboardBackspace','isNextScene','ItemHeight','reduce','〘Show\x20Text〙\x0a','updateTransform','buttonAssistText3','PictureShowIcon','IpGtG','maxLevel','Flat1','CustomParamAbb','traitsPi','Scene_Boot_onDatabaseLoaded','min','Bitmap_drawCircle','ItemBgType','targetEvaRate','clearForcedGameTroopSettingsCoreEngine','CommandBgType','processFauxAnimationRequests','render','Conditional\x20Branch\x20Script\x20Error','UpdatePictureCoordinates','categoryWindowRect','initialLevel','pendingColor','setClickHandler','SParameterFormula','isAnimationForEach','gJCBJ','HELP','SystemSetFontSize','Spriteset_Base_updatePosition','_setupEventHandlers','exp','MIN_SAFE_INTEGER','SmLiU','playCursor','levelUpRecovery','Scene_MenuBase_helpAreaTop','PLAY','BattleSystem','currentLevelExp','title','xdg-open','MvAnimationRate','TGR','BoEHH','repositionCancelButtonSideButtonLayout','worldTransform','mmp','NEAREST','BTestAddedQuantity','_context','Game_Actor_levelUp','windowOpacity','forceStencil','LxzOR','levJK','IconXParam8','getCombinedScrollingText','Type','WIN_OEM_FJ_MASSHOU','MenuLayout','Spriteset_Battle_createEnemies','Scene_Base_terminateAnimationClearBugFix','background','geBxo','updateMain','startShake','<%1\x20%2:[\x20]','statusEquipWindowRect','setupFont','alwaysDash','OnLoadJS','drawText','isUseModernControls','catchException','BhKKU','CategoryBgType','OOgRw','isInputting','_helpWindow','SpkpN','PositionX','_scene','integer','_duration','mainAreaBottom','_effectsContainer','drawCharacter','gaugeHeight','_muteSound','MenuBg','alphabetic','_targets','_coreEngineShakeStyle','_goldWindow','updatePadding','JUNJA','Scene_Map_createMenuButton','%1%2','OutlineColorGauge','cursorUp','successRate','Keyboard','ALTGR','Show\x20Scrolling\x20Text\x20Script\x20Error','gradientFillRect','IconParam3','VGwzW'];_0x4e0e=function(){return _0x3246ec;};return _0x4e0e();}Window_ButtonAssist[_0x150bf7(0x8e0)]=Object[_0x150bf7(0x4e6)](Window_Base['prototype']),Window_ButtonAssist[_0x150bf7(0x8e0)][_0x150bf7(0x771)]=Window_ButtonAssist,Window_ButtonAssist[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(_0x1d8d0f){const _0x19a007=_0x150bf7;this[_0x19a007(0x1f0)]={},Window_Base[_0x19a007(0x8e0)]['initialize'][_0x19a007(0x697)](this,_0x1d8d0f),this[_0x19a007(0x34c)](VisuMZ[_0x19a007(0x7d0)]['Settings']['ButtonAssist']['BgType']||0x0),this[_0x19a007(0x39d)]();},Window_ButtonAssist[_0x150bf7(0x8e0)][_0x150bf7(0x3b1)]=function(){const _0xc611af=_0x150bf7;this['contents'][_0xc611af(0x7a6)]<=0x60&&(this['contents']['fontSize']+=0x6);},Window_ButtonAssist[_0x150bf7(0x8e0)][_0x150bf7(0x43e)]=function(){const _0x58e632=_0x150bf7;this[_0x58e632(0x21a)][_0x58e632(0x7a6)]>=0x18&&(this[_0x58e632(0x21a)]['fontSize']-=0x6);},Window_ButtonAssist[_0x150bf7(0x8e0)]['update']=function(){const _0x328d78=_0x150bf7;Window_Base[_0x328d78(0x8e0)]['update'][_0x328d78(0x697)](this),this['updateKeyText']();},Window_ButtonAssist[_0x150bf7(0x8e0)]['updatePadding']=function(){const _0x51179b=_0x150bf7;this[_0x51179b(0x69e)]=SceneManager[_0x51179b(0x71e)][_0x51179b(0x62a)]()!==_0x51179b(0x2e0)?0x0:0x8;},Window_ButtonAssist[_0x150bf7(0x8e0)][_0x150bf7(0x21c)]=function(){const _0x3d40c6=_0x150bf7,_0x172fc6=SceneManager[_0x3d40c6(0x71e)];for(let _0x3cdccc=0x1;_0x3cdccc<=0x5;_0x3cdccc++){if(this[_0x3d40c6(0x1f0)][_0x3d40c6(0x895)[_0x3d40c6(0x322)](_0x3cdccc)]!==_0x172fc6['buttonAssistKey%1'['format'](_0x3cdccc)]())return this[_0x3d40c6(0x39d)]();if(this[_0x3d40c6(0x1f0)][_0x3d40c6(0x50a)[_0x3d40c6(0x322)](_0x3cdccc)]!==_0x172fc6[_0x3d40c6(0x8e4)['format'](_0x3cdccc)]())return this['refresh']();}},Window_ButtonAssist[_0x150bf7(0x8e0)][_0x150bf7(0x39d)]=function(){const _0xf84f5f=_0x150bf7;this[_0xf84f5f(0x21a)][_0xf84f5f(0x62c)]();for(let _0x1f1e5c=0x1;_0x1f1e5c<=0x5;_0x1f1e5c++){if('mmVgV'!==_0xf84f5f(0x239))return'CTB';else this[_0xf84f5f(0x820)](_0x1f1e5c);}},Window_ButtonAssist[_0x150bf7(0x8e0)][_0x150bf7(0x820)]=function(_0x2374c2){const _0x376dc3=_0x150bf7,_0x1b00a3=this[_0x376dc3(0x339)]/0x5,_0x166b05=SceneManager[_0x376dc3(0x71e)],_0x2d0d75=_0x166b05[_0x376dc3(0x1b1)[_0x376dc3(0x322)](_0x2374c2)](),_0x1cfe39=_0x166b05[_0x376dc3(0x8e4)[_0x376dc3(0x322)](_0x2374c2)]();this[_0x376dc3(0x1f0)]['key%1'['format'](_0x2374c2)]=_0x2d0d75,this[_0x376dc3(0x1f0)][_0x376dc3(0x50a)[_0x376dc3(0x322)](_0x2374c2)]=_0x1cfe39;if(_0x2d0d75==='')return;if(_0x1cfe39==='')return;const _0x4f2c27=_0x166b05[_0x376dc3(0x665)[_0x376dc3(0x322)](_0x2374c2)](),_0x55f07e=this['itemPadding'](),_0x400aca=_0x1b00a3*(_0x2374c2-0x1)+_0x55f07e+_0x4f2c27,_0x3685b6=VisuMZ[_0x376dc3(0x7d0)]['Settings']['ButtonAssist']['TextFmt'];this[_0x376dc3(0x5f6)](_0x3685b6[_0x376dc3(0x322)](_0x2d0d75,_0x1cfe39),_0x400aca,0x0,_0x1b00a3-_0x55f07e*0x2);},VisuMZ['CoreEngine'][_0x150bf7(0x6af)]=Game_Interpreter[_0x150bf7(0x8e0)]['updateWaitMode'],Game_Interpreter[_0x150bf7(0x8e0)][_0x150bf7(0x868)]=function(){const _0x5e8505=_0x150bf7;if($gameTemp[_0x5e8505(0x156)]!==undefined){if(_0x5e8505(0x609)===_0x5e8505(0x5b9)){let _0x25eb51=_0x5616d2[_0x5e8505(0x7a3)],_0x5059fb=_0x25eb51[_0x5e8505(0x452)];for(let _0x52db7d=0x0;_0x52db7d<_0x5059fb;++_0x52db7d){this['_editWindow'][_0x5e8505(0x357)](_0x25eb51[_0x52db7d])?_0x3d09c9[_0x5e8505(0x380)]():_0x30f414[_0x5e8505(0x15d)]();}_0xe796c4[_0x5e8505(0x62c)]();}else return VisuMZ[_0x5e8505(0x7d0)]['UpdatePictureCoordinates']();}return VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode'][_0x5e8505(0x697)](this);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x6df)]=function(){const _0x1d3a4e=_0x150bf7,_0x4d5b35=$gameTemp[_0x1d3a4e(0x156)]||0x0;(_0x4d5b35<0x0||_0x4d5b35>0x64||TouchInput[_0x1d3a4e(0x1b8)]()||Input['isTriggered'](_0x1d3a4e(0x2b1)))&&($gameTemp[_0x1d3a4e(0x156)]=undefined,Input[_0x1d3a4e(0x62c)](),TouchInput[_0x1d3a4e(0x62c)]());const _0x4a6493=$gameScreen[_0x1d3a4e(0x214)](_0x4d5b35);return _0x4a6493&&(_0x4a6493['_x']=TouchInput['_x'],_0x4a6493['_y']=TouchInput['_y']),VisuMZ[_0x1d3a4e(0x7d0)]['updatePictureCoordinates'](),$gameTemp[_0x1d3a4e(0x156)]!==undefined;},VisuMZ[_0x150bf7(0x7d0)]['updatePictureCoordinates']=function(){const _0x10bbce=_0x150bf7,_0x12aded=SceneManager[_0x10bbce(0x71e)];if(!_0x12aded)return;if(!_0x12aded['_pictureCoordinatesWindow']){if('GkZHt'!==_0x10bbce(0x8a7)){if(this[_0x10bbce(0x668)])return;_0x3137fd[_0x10bbce(0x7d0)][_0x10bbce(0x517)][_0x10bbce(0x697)](this);}else SoundManager[_0x10bbce(0x5d9)](),_0x12aded['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x12aded[_0x10bbce(0x5a8)](_0x12aded[_0x10bbce(0x16e)]);}$gameTemp[_0x10bbce(0x156)]===undefined&&(SoundManager[_0x10bbce(0x4b2)](),_0x12aded[_0x10bbce(0x602)](_0x12aded[_0x10bbce(0x16e)]),_0x12aded[_0x10bbce(0x16e)]=undefined);};function Window_PictureCoordinates(){const _0x2145d2=_0x150bf7;this[_0x2145d2(0x8aa)](...arguments);}Window_PictureCoordinates[_0x150bf7(0x8e0)]=Object[_0x150bf7(0x4e6)](Window_Base['prototype']),Window_PictureCoordinates[_0x150bf7(0x8e0)][_0x150bf7(0x771)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x150bf7(0x8e0)][_0x150bf7(0x8aa)]=function(){const _0x598493=_0x150bf7;this[_0x598493(0x3b2)]=_0x598493(0x397),this[_0x598493(0x599)]=_0x598493(0x397),this[_0x598493(0x183)]='nah';const _0x25f76d=this['windowRect']();Window_Base['prototype'][_0x598493(0x8aa)][_0x598493(0x697)](this,_0x25f76d),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x150bf7(0x8e0)][_0x150bf7(0x40c)]=function(){const _0x199c57=_0x150bf7;let _0x50c38d=0x0,_0x4433d6=Graphics[_0x199c57(0x567)]-this[_0x199c57(0x60b)](),_0x574554=Graphics[_0x199c57(0x14c)],_0x174164=this[_0x199c57(0x60b)]();return new Rectangle(_0x50c38d,_0x4433d6,_0x574554,_0x174164);},Window_PictureCoordinates['prototype'][_0x150bf7(0x72b)]=function(){const _0x3966e7=_0x150bf7;this[_0x3966e7(0x69e)]=0x0;},Window_PictureCoordinates['prototype'][_0x150bf7(0x5cd)]=function(){const _0x1b4bd3=_0x150bf7;Window_Base[_0x1b4bd3(0x8e0)][_0x1b4bd3(0x5cd)]['call'](this),this['updateData']();},Window_PictureCoordinates['prototype'][_0x150bf7(0x896)]=function(){const _0x4deb13=_0x150bf7;if(!this[_0x4deb13(0x775)]())return;this[_0x4deb13(0x39d)]();},Window_PictureCoordinates['prototype'][_0x150bf7(0x775)]=function(){const _0x46c08e=_0x150bf7,_0x9197d4=$gameTemp[_0x46c08e(0x156)],_0x35a928=$gameScreen[_0x46c08e(0x214)](_0x9197d4);return _0x35a928?'LpfnC'===_0x46c08e(0x399)?this[_0x46c08e(0x3b2)]!==_0x35a928[_0x46c08e(0x297)]||this[_0x46c08e(0x599)]!==_0x35a928['_x']||this[_0x46c08e(0x183)]!==_0x35a928['_y']:_0x585a45[_0x46c08e(0x7d0)]['Settings'][_0x46c08e(0x708)][_0x46c08e(0x684)][_0x46c08e(0x536)]:![];},Window_PictureCoordinates['prototype'][_0x150bf7(0x39d)]=function(){const _0x22b35d=_0x150bf7;this[_0x22b35d(0x21a)]['clear']();const _0x46edd4=$gameTemp[_0x22b35d(0x156)],_0x1bea22=$gameScreen[_0x22b35d(0x214)](_0x46edd4);if(!_0x1bea22)return;this[_0x22b35d(0x3b2)]=_0x1bea22['_origin'],this[_0x22b35d(0x599)]=_0x1bea22['_x'],this[_0x22b35d(0x183)]=_0x1bea22['_y'];const _0x3da51f=ColorManager[_0x22b35d(0x366)]();this[_0x22b35d(0x21a)][_0x22b35d(0x3a1)](0x0,0x0,this[_0x22b35d(0x339)],this[_0x22b35d(0x2a4)],_0x3da51f);const _0x66fd4a='\x20Origin:\x20%1'[_0x22b35d(0x322)](_0x1bea22[_0x22b35d(0x297)]===0x0?_0x22b35d(0x17e):_0x22b35d(0x77a)),_0x4f64d4=_0x22b35d(0x147)['format'](_0x1bea22['_x']),_0x27354e='Y:\x20%1'[_0x22b35d(0x322)](_0x1bea22['_y']),_0x365017='%1:\x20Exit\x20'['format'](TextManager['getInputButtonString'](_0x22b35d(0x2b1)));let _0x34319a=Math[_0x22b35d(0x7d1)](this[_0x22b35d(0x339)]/0x4);this['drawText'](_0x66fd4a,_0x34319a*0x0,0x0,_0x34319a),this[_0x22b35d(0x714)](_0x4f64d4,_0x34319a*0x1,0x0,_0x34319a,_0x22b35d(0x1e5)),this[_0x22b35d(0x714)](_0x27354e,_0x34319a*0x2,0x0,_0x34319a,_0x22b35d(0x1e5));const _0x2fa4f1=this[_0x22b35d(0x385)](_0x365017)[_0x22b35d(0x14c)],_0x105bcb=this[_0x22b35d(0x339)]-_0x2fa4f1;this['drawTextEx'](_0x365017,_0x105bcb,0x0,_0x2fa4f1);},VisuMZ[_0x150bf7(0x900)]=function(_0x5a7c1f){const _0x568598=_0x150bf7;if(Utils['isOptionValid'](_0x568598(0x80d))){if('cUHMs'==='cUHMs'){var _0x5c03ae=require(_0x568598(0x379))[_0x568598(0x751)][_0x568598(0x43f)]();SceneManager[_0x568598(0x494)]();if(_0x5a7c1f)setTimeout(_0x5c03ae[_0x568598(0x2a2)][_0x568598(0x45b)](_0x5c03ae),0x190);}else _0x13d60c[_0x568598(0x193)](_0x568598(0x68c)),_0x4d6722[_0x568598(0x193)](_0x450779);}},VisuMZ['ApplyEasing']=function(_0x3fe5a8,_0x417c14){const _0x537823=_0x150bf7;_0x417c14=_0x417c14['toUpperCase']();var _0x482e44=1.70158,_0x2cbee4=0.7;switch(_0x417c14){case'LINEAR':return _0x3fe5a8;case _0x537823(0x3c7):return-0x1*Math[_0x537823(0x634)](_0x3fe5a8*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x537823(0x75e)](_0x3fe5a8*(Math['PI']/0x2));case _0x537823(0x69c):return-0.5*(Math[_0x537823(0x634)](Math['PI']*_0x3fe5a8)-0x1);case _0x537823(0x8df):return _0x3fe5a8*_0x3fe5a8;case _0x537823(0x8fd):return _0x3fe5a8*(0x2-_0x3fe5a8);case _0x537823(0x871):return _0x3fe5a8<0.5?0x2*_0x3fe5a8*_0x3fe5a8:-0x1+(0x4-0x2*_0x3fe5a8)*_0x3fe5a8;case'INCUBIC':return _0x3fe5a8*_0x3fe5a8*_0x3fe5a8;case'OUTCUBIC':var _0x2f56c3=_0x3fe5a8-0x1;return _0x2f56c3*_0x2f56c3*_0x2f56c3+0x1;case _0x537823(0x745):return _0x3fe5a8<0.5?0x4*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8:(_0x3fe5a8-0x1)*(0x2*_0x3fe5a8-0x2)*(0x2*_0x3fe5a8-0x2)+0x1;case _0x537823(0x7a4):return _0x3fe5a8*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8;case _0x537823(0x3df):var _0x2f56c3=_0x3fe5a8-0x1;return 0x1-_0x2f56c3*_0x2f56c3*_0x2f56c3*_0x2f56c3;case _0x537823(0x202):var _0x2f56c3=_0x3fe5a8-0x1;return _0x3fe5a8<0.5?0x8*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8:0x1-0x8*_0x2f56c3*_0x2f56c3*_0x2f56c3*_0x2f56c3;case _0x537823(0x1a6):return _0x3fe5a8*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8;case _0x537823(0x304):var _0x2f56c3=_0x3fe5a8-0x1;return 0x1+_0x2f56c3*_0x2f56c3*_0x2f56c3*_0x2f56c3*_0x2f56c3;case _0x537823(0x244):var _0x2f56c3=_0x3fe5a8-0x1;return _0x3fe5a8<0.5?0x10*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8*_0x3fe5a8:0x1+0x10*_0x2f56c3*_0x2f56c3*_0x2f56c3*_0x2f56c3*_0x2f56c3;case _0x537823(0x1b9):if(_0x3fe5a8===0x0){if('DMqEO'!==_0x537823(0x372))_0x4de5a6[_0x537823(0x576)]=![],_0x173b7c[_0x537823(0x124)]=!![];else return 0x0;}return Math[_0x537823(0x492)](0x2,0xa*(_0x3fe5a8-0x1));case'OUTEXPO':if(_0x3fe5a8===0x1)return 0x1;return-Math[_0x537823(0x492)](0x2,-0xa*_0x3fe5a8)+0x1;case _0x537823(0x659):if(_0x3fe5a8===0x0||_0x3fe5a8===0x1)return _0x3fe5a8;var _0x12a5f1=_0x3fe5a8*0x2,_0x56fc77=_0x12a5f1-0x1;if(_0x12a5f1<0x1)return 0.5*Math[_0x537823(0x492)](0x2,0xa*_0x56fc77);return 0.5*(-Math['pow'](0x2,-0xa*_0x56fc77)+0x2);case _0x537823(0x8ae):var _0x12a5f1=_0x3fe5a8/0x1;return-0x1*(Math['sqrt'](0x1-_0x12a5f1*_0x3fe5a8)-0x1);case _0x537823(0x578):var _0x2f56c3=_0x3fe5a8-0x1;return Math[_0x537823(0x7b7)](0x1-_0x2f56c3*_0x2f56c3);case _0x537823(0x598):var _0x12a5f1=_0x3fe5a8*0x2,_0x56fc77=_0x12a5f1-0x2;if(_0x12a5f1<0x1)return-0.5*(Math[_0x537823(0x7b7)](0x1-_0x12a5f1*_0x12a5f1)-0x1);return 0.5*(Math[_0x537823(0x7b7)](0x1-_0x56fc77*_0x56fc77)+0x1);case _0x537823(0x6be):return _0x3fe5a8*_0x3fe5a8*((_0x482e44+0x1)*_0x3fe5a8-_0x482e44);case _0x537823(0x4e9):var _0x12a5f1=_0x3fe5a8/0x1-0x1;return _0x12a5f1*_0x12a5f1*((_0x482e44+0x1)*_0x12a5f1+_0x482e44)+0x1;break;case _0x537823(0x778):var _0x12a5f1=_0x3fe5a8*0x2,_0x346e56=_0x12a5f1-0x2,_0x462291=_0x482e44*1.525;if(_0x12a5f1<0x1)return 0.5*_0x12a5f1*_0x12a5f1*((_0x462291+0x1)*_0x12a5f1-_0x462291);return 0.5*(_0x346e56*_0x346e56*((_0x462291+0x1)*_0x346e56+_0x462291)+0x2);case _0x537823(0x540):if(_0x3fe5a8===0x0||_0x3fe5a8===0x1)return _0x3fe5a8;var _0x12a5f1=_0x3fe5a8/0x1,_0x56fc77=_0x12a5f1-0x1,_0x415872=0x1-_0x2cbee4,_0x462291=_0x415872/(0x2*Math['PI'])*Math[_0x537823(0x4c6)](0x1);return-(Math[_0x537823(0x492)](0x2,0xa*_0x56fc77)*Math[_0x537823(0x75e)]((_0x56fc77-_0x462291)*(0x2*Math['PI'])/_0x415872));case _0x537823(0x294):var _0x415872=0x1-_0x2cbee4,_0x12a5f1=_0x3fe5a8*0x2;if(_0x3fe5a8===0x0||_0x3fe5a8===0x1)return _0x3fe5a8;var _0x462291=_0x415872/(0x2*Math['PI'])*Math[_0x537823(0x4c6)](0x1);return Math[_0x537823(0x492)](0x2,-0xa*_0x12a5f1)*Math[_0x537823(0x75e)]((_0x12a5f1-_0x462291)*(0x2*Math['PI'])/_0x415872)+0x1;case _0x537823(0x56d):var _0x415872=0x1-_0x2cbee4;if(_0x3fe5a8===0x0||_0x3fe5a8===0x1){if(_0x537823(0x51a)===_0x537823(0x51a))return _0x3fe5a8;else _0x2f3fb4[_0x537823(0x7df)]()&&(_0x1a4f69[_0x537823(0x193)]('Script\x20Call\x20Error'),_0x2d1cad[_0x537823(0x193)](_0x282010));}var _0x12a5f1=_0x3fe5a8*0x2,_0x56fc77=_0x12a5f1-0x1,_0x462291=_0x415872/(0x2*Math['PI'])*Math['asin'](0x1);if(_0x12a5f1<0x1)return-0.5*(Math[_0x537823(0x492)](0x2,0xa*_0x56fc77)*Math[_0x537823(0x75e)]((_0x56fc77-_0x462291)*(0x2*Math['PI'])/_0x415872));return Math[_0x537823(0x492)](0x2,-0xa*_0x56fc77)*Math[_0x537823(0x75e)]((_0x56fc77-_0x462291)*(0x2*Math['PI'])/_0x415872)*0.5+0x1;case _0x537823(0x67a):var _0x12a5f1=_0x3fe5a8/0x1;if(_0x12a5f1<0x1/2.75){if('LAgfG'===_0x537823(0x19a)){const _0x558c5d=_0x537823(0x61d);this[_0x537823(0x7e8)]=this[_0x537823(0x7e8)]||{};if(this['_colorCache'][_0x558c5d])return this[_0x537823(0x7e8)][_0x558c5d];const _0x2a612a=_0x12a91e[_0x537823(0x7d0)]['Settings'][_0x537823(0x49f)][_0x537823(0x474)];return this[_0x537823(0x3cc)](_0x558c5d,_0x2a612a);}else return 7.5625*_0x12a5f1*_0x12a5f1;}else{if(_0x12a5f1<0x2/2.75){if(_0x537823(0x70c)!==_0x537823(0x70c)){if(_0x4e20b6&&_0x4dcc07[_0x537823(0x78c)]())return;_0x156874[_0x537823(0x7d0)][_0x537823(0x564)][_0x537823(0x697)](this,_0x1eb798,_0x39cd2a,_0x331184,_0x2b583e);}else{var _0x346e56=_0x12a5f1-1.5/2.75;return 7.5625*_0x346e56*_0x346e56+0.75;}}else{if(_0x12a5f1<2.5/2.75){var _0x346e56=_0x12a5f1-2.25/2.75;return 7.5625*_0x346e56*_0x346e56+0.9375;}else{var _0x346e56=_0x12a5f1-2.625/2.75;return 7.5625*_0x346e56*_0x346e56+0.984375;}}}case'INBOUNCE':var _0x4ced2f=0x1-VisuMZ[_0x537823(0x39f)](0x1-_0x3fe5a8,_0x537823(0x89c));return _0x4ced2f;case'INOUTBOUNCE':if(_0x3fe5a8<0.5){if(_0x537823(0x877)==='gLHbM')return this[_0x537823(0x6a7)]&&this[_0x537823(0x6a7)][_0x537823(0x814)]?_0x299a0a[_0x537823(0x1bd)]:'';else var _0x4ced2f=VisuMZ[_0x537823(0x39f)](_0x3fe5a8*0x2,_0x537823(0x3a2))*0.5;}else var _0x4ced2f=VisuMZ[_0x537823(0x39f)](_0x3fe5a8*0x2-0x1,_0x537823(0x89c))*0.5+0.5;return _0x4ced2f;default:return _0x3fe5a8;}},VisuMZ[_0x150bf7(0x801)]=function(_0x55640b){const _0x4f02cf=_0x150bf7;_0x55640b=String(_0x55640b)['toUpperCase']();const _0x2042cf=VisuMZ[_0x4f02cf(0x7d0)][_0x4f02cf(0x486)]['Param'];if(_0x55640b===_0x4f02cf(0x7e1))return _0x2042cf[_0x4f02cf(0x2bd)];if(_0x55640b==='MAXMP')return _0x2042cf[_0x4f02cf(0x47c)];if(_0x55640b===_0x4f02cf(0x382))return _0x2042cf[_0x4f02cf(0x2b5)];if(_0x55640b==='DEF')return _0x2042cf[_0x4f02cf(0x736)];if(_0x55640b===_0x4f02cf(0x4ef))return _0x2042cf[_0x4f02cf(0x12c)];if(_0x55640b===_0x4f02cf(0x63a))return _0x2042cf[_0x4f02cf(0x3c0)];if(_0x55640b===_0x4f02cf(0x56f))return _0x2042cf['IconParam6'];if(_0x55640b===_0x4f02cf(0x582))return _0x2042cf[_0x4f02cf(0x18d)];if(_0x55640b===_0x4f02cf(0x515))return _0x2042cf[_0x4f02cf(0x131)];if(_0x55640b==='EVA')return _0x2042cf[_0x4f02cf(0x38d)];if(_0x55640b==='CRI')return _0x2042cf[_0x4f02cf(0x855)];if(_0x55640b===_0x4f02cf(0x4fb))return _0x2042cf[_0x4f02cf(0x26c)];if(_0x55640b===_0x4f02cf(0x8a0))return _0x2042cf[_0x4f02cf(0x20c)];if(_0x55640b==='MRF')return _0x2042cf['IconXParam5'];if(_0x55640b==='CNT')return _0x2042cf[_0x4f02cf(0x534)];if(_0x55640b==='HRG')return _0x2042cf[_0x4f02cf(0x1d5)];if(_0x55640b===_0x4f02cf(0x496))return _0x2042cf[_0x4f02cf(0x704)];if(_0x55640b===_0x4f02cf(0x387))return _0x2042cf[_0x4f02cf(0x137)];if(_0x55640b===_0x4f02cf(0x6f7))return _0x2042cf['IconSParam0'];if(_0x55640b===_0x4f02cf(0x8a2))return _0x2042cf[_0x4f02cf(0x67b)];if(_0x55640b===_0x4f02cf(0x3c8))return _0x2042cf[_0x4f02cf(0x5ce)];if(_0x55640b===_0x4f02cf(0x24f))return _0x2042cf[_0x4f02cf(0x62f)];if(_0x55640b===_0x4f02cf(0x2e4))return _0x2042cf['IconSParam4'];if(_0x55640b===_0x4f02cf(0x8b8))return _0x2042cf[_0x4f02cf(0x286)];if(_0x55640b==='PDR')return _0x2042cf[_0x4f02cf(0x20b)];if(_0x55640b==='MDR')return _0x2042cf[_0x4f02cf(0x343)];if(_0x55640b===_0x4f02cf(0x28a))return _0x2042cf['IconSParam8'];if(_0x55640b===_0x4f02cf(0x4c2))return _0x2042cf[_0x4f02cf(0x123)];if(VisuMZ[_0x4f02cf(0x7d0)][_0x4f02cf(0x53e)][_0x55640b])return VisuMZ[_0x4f02cf(0x7d0)][_0x4f02cf(0x53e)][_0x55640b]||0x0;return 0x0;},VisuMZ[_0x150bf7(0x371)]=function(_0x402aca,_0x97eafa,_0x56a7a3){const _0x54c47c=_0x150bf7;if(_0x56a7a3===undefined&&_0x402aca%0x1===0x0)return _0x402aca;if(_0x56a7a3!==undefined&&[_0x54c47c(0x7e1),_0x54c47c(0x767),_0x54c47c(0x382),_0x54c47c(0x901),'MAT','MDF',_0x54c47c(0x56f),_0x54c47c(0x582)]['includes'](String(_0x56a7a3)[_0x54c47c(0x288)]()[_0x54c47c(0x37c)]()))return _0x402aca;_0x97eafa=_0x97eafa||0x0;if(VisuMZ['CoreEngine']['CustomParamAbb'][_0x56a7a3]){if(VisuMZ[_0x54c47c(0x7d0)]['CustomParamType'][_0x56a7a3]==='integer')return _0x402aca;else{if(_0x54c47c(0x5f4)==='urHXg')return String((_0x402aca*0x64)[_0x54c47c(0x846)](_0x97eafa))+'%';else _0x5db31f+=_0x54c47c(0x1a9)['format'](_0x42164f[_0x54c47c(0x155)][0x4]);}}return String((_0x402aca*0x64)[_0x54c47c(0x846)](_0x97eafa))+'%';},VisuMZ['GroupDigits']=function(_0x560cf2){const _0x2221a4=_0x150bf7;_0x560cf2=String(_0x560cf2);if(!_0x560cf2)return _0x560cf2;if(typeof _0x560cf2!=='string')return _0x560cf2;const _0x173236=VisuMZ[_0x2221a4(0x7d0)][_0x2221a4(0x486)][_0x2221a4(0x51b)][_0x2221a4(0x3c3)]||_0x2221a4(0x1e3),_0x5063cd={'maximumFractionDigits':0x6};_0x560cf2=_0x560cf2['replace'](/\[(.*?)\]/g,(_0x477038,_0x27bebd)=>{const _0x454e9a=_0x2221a4;return VisuMZ[_0x454e9a(0x8cf)](_0x27bebd,'[',']');}),_0x560cf2=_0x560cf2[_0x2221a4(0x913)](/<(.*?)>/g,(_0x4756fb,_0x52ae49)=>{const _0xf7fb50=_0x2221a4;if(_0xf7fb50(0x28c)==='avaUc')return VisuMZ['PreserveNumbers'](_0x52ae49,'<','>');else _0x5a8da2[_0xf7fb50(0x46c)]();}),_0x560cf2=_0x560cf2['replace'](/\{\{(.*?)\}\}/g,(_0x290c7f,_0x4013e7)=>{const _0x5165d0=_0x2221a4;return VisuMZ[_0x5165d0(0x8cf)](_0x4013e7,'','');}),_0x560cf2=_0x560cf2[_0x2221a4(0x913)](/(\d+\.?\d*)/g,(_0x13b190,_0x3d61df)=>{const _0x1b3486=_0x2221a4;let _0xbfdb90=_0x3d61df;if(_0xbfdb90[0x0]==='0')return _0xbfdb90;if(_0xbfdb90[_0xbfdb90[_0x1b3486(0x452)]-0x1]==='.'){if(_0x1b3486(0x7e0)!==_0x1b3486(0x2dd))return Number(_0xbfdb90)[_0x1b3486(0x7e3)](_0x173236,_0x5063cd)+'.';else{if(this['_CoreEngineSettings']===_0x222960)this[_0x1b3486(0x42b)]();if(this[_0x1b3486(0x508)][_0x1b3486(0x33c)]===_0x37747d)this[_0x1b3486(0x42b)]();this['_CoreEngineSettings'][_0x1b3486(0x163)]=_0x212ab6;}}else{if(_0xbfdb90[_0xbfdb90[_0x1b3486(0x452)]-0x1]===',')return Number(_0xbfdb90)[_0x1b3486(0x7e3)](_0x173236,_0x5063cd)+',';else{if('xTOJM'==='YqHpz'){if(_0x49a949===_0x2be772&&_0x2bb846%0x1===0x0)return _0x18963f;if(_0x4023eb!==_0x5ba698&&[_0x1b3486(0x7e1),'MAXMP',_0x1b3486(0x382),'DEF','MAT',_0x1b3486(0x63a),_0x1b3486(0x56f),_0x1b3486(0x582)][_0x1b3486(0x886)](_0x3a5991(_0x56e3f6)['toUpperCase']()['trim']()))return _0x9490af;_0x3c28fa=_0x1ba3a5||0x0;if(_0x133d0e[_0x1b3486(0x7d0)][_0x1b3486(0x6d3)][_0x494c42])return _0x57a279[_0x1b3486(0x7d0)][_0x1b3486(0x7cc)][_0x4bb9e4]===_0x1b3486(0x71f)?_0x113282:_0x2d5c6b((_0x1060ff*0x64)['toFixed'](_0x2c4259))+'%';return _0x124bc8((_0x3d42f9*0x64)['toFixed'](_0x2c346a))+'%';}else return Number(_0xbfdb90)[_0x1b3486(0x7e3)](_0x173236,_0x5063cd);}}});let _0x203cf3=0x3;while(_0x203cf3--){if(_0x2221a4(0x6d0)!=='IpGtG')return'';else _0x560cf2=VisuMZ[_0x2221a4(0x2aa)](_0x560cf2);}return _0x560cf2;},VisuMZ[_0x150bf7(0x8cf)]=function(_0x4cc136,_0x2cbb23,_0x50476e){const _0x21efad=_0x150bf7;return _0x4cc136=_0x4cc136['replace'](/(\d)/gi,(_0x2efbb6,_0x209966)=>'PRESERVCONVERSION(%1)'[_0x21efad(0x322)](Number(_0x209966))),_0x21efad(0x21b)[_0x21efad(0x322)](_0x4cc136,_0x2cbb23,_0x50476e);},VisuMZ[_0x150bf7(0x2aa)]=function(_0x26a0fd){const _0x5ca9e9=_0x150bf7;return _0x26a0fd=_0x26a0fd[_0x5ca9e9(0x913)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x35d0ba,_0x2d9baa)=>Number(parseInt(_0x2d9baa))),_0x26a0fd;},VisuMZ[_0x150bf7(0x8d6)]=function(_0x2e4aa5){const _0x546797=_0x150bf7;SoundManager[_0x546797(0x380)]();if(!Utils[_0x546797(0x2d6)]()){if('ywcWl'!==_0x546797(0x3f6)){const _0x443173=window[_0x546797(0x2f0)](_0x2e4aa5,_0x546797(0x617));}else _0x18a68c['VisuMZ_2_BattleSystemOTB']&&(this[_0x546797(0x85c)]=_0x546797(0x623));}else{const _0x41f75e=process['platform']==_0x546797(0x2ca)?'open':process[_0x546797(0x802)]=='win32'?_0x546797(0x2f6):_0x546797(0x6f5);require('child_process')['exec'](_0x41f75e+'\x20'+_0x2e4aa5);}},Game_Picture['prototype'][_0x150bf7(0x2f5)]=function(){const _0x382de4=_0x150bf7;return this[_0x382de4(0x86c)];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x3fa)]=Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x1fa)],Game_Picture[_0x150bf7(0x8e0)]['initBasic']=function(){const _0x2f3f8c=_0x150bf7;VisuMZ['CoreEngine'][_0x2f3f8c(0x3fa)][_0x2f3f8c(0x697)](this),this[_0x2f3f8c(0x86c)]={'x':0x0,'y':0x0},this[_0x2f3f8c(0x6c1)]={'x':0x0,'y':0x0};},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x274)]=Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x5e6)],Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x5e6)]=function(){const _0x33a1db=_0x150bf7;this[_0x33a1db(0x8c9)]();const _0x4cee1f=this[_0x33a1db(0x720)];VisuMZ[_0x33a1db(0x7d0)]['Game_Picture_updateMove'][_0x33a1db(0x697)](this),_0x4cee1f>0x0&&this[_0x33a1db(0x720)]<=0x0&&(this['_x']=this[_0x33a1db(0x326)],this['_y']=this[_0x33a1db(0x4a7)],this[_0x33a1db(0x630)]=this['_targetScaleX'],this[_0x33a1db(0x5d7)]=this[_0x33a1db(0x221)],this[_0x33a1db(0x652)]=this['_targetOpacity'],this[_0x33a1db(0x86c)]&&(this['_anchor']['x']=this['_targetAnchor']['x'],this[_0x33a1db(0x86c)]['y']=this[_0x33a1db(0x6c1)]['y']));},VisuMZ['CoreEngine'][_0x150bf7(0x8c4)]=Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x128)],Game_Picture['prototype'][_0x150bf7(0x128)]=function(_0x5485af,_0x417cd1,_0x4d4090,_0x4612b6,_0x1c9b6d,_0x4d8b38,_0x124d82,_0x1fbb29){const _0x383a95=_0x150bf7;VisuMZ[_0x383a95(0x7d0)][_0x383a95(0x8c4)]['call'](this,_0x5485af,_0x417cd1,_0x4d4090,_0x4612b6,_0x1c9b6d,_0x4d8b38,_0x124d82,_0x1fbb29),this[_0x383a95(0x5c4)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x417cd1]||{'x':0x0,'y':0x0});},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x750)]=Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x1fd)],Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x1fd)]=function(_0x5f35f2,_0x239cb8,_0x5b5c41,_0x29ddcd,_0x5cc158,_0x49f232,_0x16bb73,_0x50d0e0,_0x23f97e){const _0x156c09=_0x150bf7;VisuMZ[_0x156c09(0x7d0)][_0x156c09(0x750)][_0x156c09(0x697)](this,_0x5f35f2,_0x239cb8,_0x5b5c41,_0x29ddcd,_0x5cc158,_0x49f232,_0x16bb73,_0x50d0e0,_0x23f97e),this[_0x156c09(0x51e)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5f35f2]||{'x':0x0,'y':0x0});},Game_Picture[_0x150bf7(0x8e0)][_0x150bf7(0x8c9)]=function(){const _0x17ab07=_0x150bf7;this[_0x17ab07(0x720)]>0x0&&(_0x17ab07(0x24b)!=='iaEaP'?(this[_0x17ab07(0x86c)]['x']=this[_0x17ab07(0x8fa)](this[_0x17ab07(0x86c)]['x'],this['_targetAnchor']['x']),this['_anchor']['y']=this[_0x17ab07(0x8fa)](this[_0x17ab07(0x86c)]['y'],this[_0x17ab07(0x6c1)]['y'])):(this[_0x17ab07(0x7d2)]&&this[_0x17ab07(0x7d2)][_0x17ab07(0x34c)](_0xcb5ffd['layoutSettings'][_0x17ab07(0x7aa)]),this[_0x17ab07(0x29c)]&&this['_inputWindow']['setBackgroundType'](_0x283ce8[_0x17ab07(0x749)][_0x17ab07(0x58c)])));},Game_Picture[_0x150bf7(0x8e0)]['setAnchor']=function(_0x295fd1){const _0x115666=_0x150bf7;this[_0x115666(0x86c)]=_0x295fd1,this[_0x115666(0x6c1)]=JsonEx[_0x115666(0x4d4)](this[_0x115666(0x86c)]);},Game_Picture['prototype'][_0x150bf7(0x51e)]=function(_0x74e3f2){const _0x1d230a=_0x150bf7;this[_0x1d230a(0x6c1)]=_0x74e3f2;},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x874)]=Sprite_Picture[_0x150bf7(0x8e0)]['updateOrigin'],Sprite_Picture['prototype'][_0x150bf7(0x588)]=function(){const _0xc21b2=_0x150bf7,_0x35c39f=this[_0xc21b2(0x214)]();if(!_0x35c39f[_0xc21b2(0x2f5)]()){if(_0xc21b2(0x293)===_0xc21b2(0x4ae))return _0x31fe9f['mev'];else VisuMZ[_0xc21b2(0x7d0)][_0xc21b2(0x874)][_0xc21b2(0x697)](this);}else{if(_0xc21b2(0x264)!==_0xc21b2(0x264))return _0x9c4bed[_0xc21b2(0x7d0)][_0xc21b2(0x39e)][_0xc21b2(0x697)](this,_0x54813a);else this[_0xc21b2(0x2f5)]['x']=_0x35c39f[_0xc21b2(0x2f5)]()['x'],this[_0xc21b2(0x2f5)]['y']=_0x35c39f[_0xc21b2(0x2f5)]()['y'];}},Game_Action[_0x150bf7(0x8e0)][_0x150bf7(0x8af)]=function(_0x5c4890){const _0x281604=_0x150bf7;if(_0x5c4890){const _0x3112ae=_0x5c4890['skillId'];if(_0x3112ae===0x1&&this[_0x281604(0x587)]()[_0x281604(0x22a)]()!==0x1)this[_0x281604(0x5de)]();else{if(_0x3112ae===0x2&&this[_0x281604(0x587)]()[_0x281604(0x4b7)]()!==0x2){if(_0x281604(0x3bf)!==_0x281604(0x3dd))this[_0x281604(0x164)]();else{const _0x4f49a4=_0x106b23[_0x281604(0x78f)](_0x23c202);_0x4ae1e3[_0x281604(0x414)](_0x2040a3,!_0x4f49a4);}}else'aUezV'!==_0x281604(0x577)?(_0x49a65d['CoreEngine']['Scene_Map_updateMainMultiply'][_0x281604(0x697)](this),_0x55e70d[_0x281604(0x5ea)]&&!_0x5429c5['isBusy']()&&(this[_0x281604(0x70d)](),_0x7a7712['updateEffekseer']())):this[_0x281604(0x1d9)](_0x3112ae);}}else this['clear']();},Game_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x677)]=function(){const _0x38f364=_0x150bf7;return this[_0x38f364(0x22e)]()['filter'](_0x4c9664=>this[_0x38f364(0x161)](_0x4c9664)&&this[_0x38f364(0x5d3)]()[_0x38f364(0x886)](_0x4c9664[_0x38f364(0x81f)]));},Window_Base[_0x150bf7(0x8e0)]['createDimmerSprite']=function(){const _0x837023=_0x150bf7;this['_dimmerSprite']=new Sprite(),this['_dimmerSprite'][_0x837023(0x219)]=new Bitmap(0x0,0x0),this[_0x837023(0x46b)]['x']=0x0,this['addChildToBack'](this[_0x837023(0x46b)]);},Window_Base[_0x150bf7(0x8e0)][_0x150bf7(0x693)]=function(){const _0x356dcb=_0x150bf7;if(this['_dimmerSprite']){if(_0x356dcb(0x849)!==_0x356dcb(0x4ce)){const _0x5a12d2=this[_0x356dcb(0x46b)][_0x356dcb(0x219)],_0x204f29=this[_0x356dcb(0x14c)],_0x21105c=this[_0x356dcb(0x567)],_0xc4951b=this[_0x356dcb(0x69e)],_0x3234ca=ColorManager[_0x356dcb(0x8bf)](),_0x480b10=ColorManager['dimColor2']();_0x5a12d2[_0x356dcb(0x31b)](_0x204f29,_0x21105c),_0x5a12d2[_0x356dcb(0x735)](0x0,0x0,_0x204f29,_0xc4951b,_0x480b10,_0x3234ca,!![]),_0x5a12d2[_0x356dcb(0x3a1)](0x0,_0xc4951b,_0x204f29,_0x21105c-_0xc4951b*0x2,_0x3234ca),_0x5a12d2[_0x356dcb(0x735)](0x0,_0x21105c-_0xc4951b,_0x204f29,_0xc4951b,_0x3234ca,_0x480b10,!![]),this[_0x356dcb(0x46b)][_0x356dcb(0x1d7)](0x0,0x0,_0x204f29,_0x21105c);}else _0x49795d['CoreEngine']['Bitmap_gradientFillRect']['call'](this,_0x1af480,_0x4c24fb,_0x3e277b,_0xe0b1c0,_0x5b0c28,_0x461932,_0x556341),this[_0x356dcb(0x8eb)]();}},Game_Actor['prototype'][_0x150bf7(0x1d2)]=function(){const _0x315edf=_0x150bf7;for(let _0x24719f=0x0;_0x24719f<this[_0x315edf(0x64c)]();_0x24719f++){if('TbKqR'==='TbKqR'){const _0x2b7d69=this[_0x315edf(0x8c5)]();let _0x414278=Number[_0x315edf(0x6ec)];this[_0x315edf(0x3da)](_0x24719f,_0x2b7d69[0x0]);for(const _0xaaa9a8 of _0x2b7d69){const _0x2ea319=_0xaaa9a8[_0x315edf(0x6b3)]();_0x2ea319>_0x414278&&(_0x414278=_0x2ea319,this['setAction'](_0x24719f,_0xaaa9a8));}}else return this[_0x315edf(0x318)]();}this[_0x315edf(0x405)](_0x315edf(0x826));},Window_BattleItem[_0x150bf7(0x8e0)][_0x150bf7(0x3e6)]=function(_0x5e5adb){const _0x35cbed=_0x150bf7;return BattleManager[_0x35cbed(0x571)]()?BattleManager[_0x35cbed(0x571)]()['canUse'](_0x5e5adb):'VNvfy'==='gAAbG'?![]:Window_ItemList[_0x35cbed(0x8e0)]['isEnabled'][_0x35cbed(0x697)](this,_0x5e5adb);},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x4bf)]=Scene_Map[_0x150bf7(0x8e0)]['createSpriteset'],Scene_Map['prototype'][_0x150bf7(0x605)]=function(){const _0x30874a=_0x150bf7;VisuMZ['CoreEngine'][_0x30874a(0x4bf)]['call'](this);const _0x1316e7=this[_0x30874a(0x479)]['_timerSprite'];if(_0x1316e7)this[_0x30874a(0x5a8)](_0x1316e7);},VisuMZ['CoreEngine'][_0x150bf7(0x76d)]=Scene_Battle['prototype']['createSpriteset'],Scene_Battle[_0x150bf7(0x8e0)]['createSpriteset']=function(){const _0x5cc940=_0x150bf7;VisuMZ[_0x5cc940(0x7d0)][_0x5cc940(0x76d)][_0x5cc940(0x697)](this);const _0x5d08b3=this['_spriteset'][_0x5cc940(0x1cd)];if(_0x5d08b3)this[_0x5cc940(0x5a8)](_0x5d08b3);},Sprite_Actor[_0x150bf7(0x8e0)][_0x150bf7(0x5cd)]=function(){const _0xc165ec=_0x150bf7;Sprite_Battler[_0xc165ec(0x8e0)][_0xc165ec(0x5cd)]['call'](this),this[_0xc165ec(0x36f)]();if(this[_0xc165ec(0x838)])this[_0xc165ec(0x8ec)]();else this['_battlerName']!==''&&(this[_0xc165ec(0x158)]='');},Window[_0x150bf7(0x8e0)][_0x150bf7(0x451)]=function(){const _0x71fdf1=_0x150bf7,_0x4ae5b0=this[_0x71fdf1(0x68d)],_0x247189=this[_0x71fdf1(0x21e)],_0x2cc3a9=0x18,_0x18d46f=_0x2cc3a9/0x2,_0x5c23f9=0x60+_0x2cc3a9,_0x397435=0x0+_0x2cc3a9;this['_downArrowSprite']['bitmap']=this['_windowskin'],this[_0x71fdf1(0x806)][_0x71fdf1(0x2f5)]['x']=0.5,this[_0x71fdf1(0x806)][_0x71fdf1(0x2f5)]['y']=0.5,this['_downArrowSprite'][_0x71fdf1(0x1d7)](_0x5c23f9+_0x18d46f,_0x397435+_0x18d46f+_0x2cc3a9,_0x2cc3a9,_0x18d46f),this[_0x71fdf1(0x806)][_0x71fdf1(0x1fd)](Math[_0x71fdf1(0x469)](_0x4ae5b0/0x2),Math['round'](_0x247189-_0x18d46f)),this[_0x71fdf1(0x4a0)][_0x71fdf1(0x219)]=this[_0x71fdf1(0x858)],this[_0x71fdf1(0x4a0)][_0x71fdf1(0x2f5)]['x']=0.5,this[_0x71fdf1(0x4a0)][_0x71fdf1(0x2f5)]['y']=0.5,this['_upArrowSprite']['setFrame'](_0x5c23f9+_0x18d46f,_0x397435,_0x2cc3a9,_0x18d46f),this['_upArrowSprite'][_0x71fdf1(0x1fd)](Math[_0x71fdf1(0x469)](_0x4ae5b0/0x2),Math['round'](_0x18d46f));},Window[_0x150bf7(0x8e0)]['_refreshPauseSign']=function(){const _0x5c3659=_0x150bf7,_0x661a6c=0x90,_0x474474=0x60,_0x3f9e28=0x18;this['_pauseSignSprite']['bitmap']=this[_0x5c3659(0x858)],this[_0x5c3659(0x376)][_0x5c3659(0x2f5)]['x']=0.5,this['_pauseSignSprite']['anchor']['y']=0x1,this[_0x5c3659(0x376)]['move'](Math['round'](this[_0x5c3659(0x68d)]/0x2),this[_0x5c3659(0x21e)]),this[_0x5c3659(0x376)][_0x5c3659(0x1d7)](_0x661a6c,_0x474474,_0x3f9e28,_0x3f9e28),this['_pauseSignSprite'][_0x5c3659(0x28e)]=0xff;},Window[_0x150bf7(0x8e0)][_0x150bf7(0x916)]=function(){const _0x316557=_0x150bf7,_0xb46440=this[_0x316557(0x66b)][_0x316557(0x6fa)][_0x316557(0x67e)](new Point(0x0,0x0)),_0x4129b9=this[_0x316557(0x66b)][_0x316557(0x408)];_0x4129b9['x']=_0xb46440['x']+this[_0x316557(0x883)]['x'],_0x4129b9['y']=_0xb46440['y']+this[_0x316557(0x883)]['y'],_0x4129b9[_0x316557(0x14c)]=Math[_0x316557(0x8da)](this[_0x316557(0x339)]*this['scale']['x']),_0x4129b9['height']=Math[_0x316557(0x8da)](this[_0x316557(0x2a4)]*this[_0x316557(0x6ba)]['y']);},Window[_0x150bf7(0x8e0)][_0x150bf7(0x8d2)]=function(){const _0x5376e7=_0x150bf7,_0x1194bc=this['_margin'],_0x168972=Math[_0x5376e7(0x391)](0x0,this['_width']-_0x1194bc*0x2),_0x326cb7=Math[_0x5376e7(0x391)](0x0,this[_0x5376e7(0x21e)]-_0x1194bc*0x2),_0x5ba9f8=this['_backSprite'],_0xabf221=_0x5ba9f8[_0x5376e7(0x819)][0x0];_0x5ba9f8[_0x5376e7(0x219)]=this[_0x5376e7(0x858)],_0x5ba9f8[_0x5376e7(0x1d7)](0x0,0x0,0x60,0x60),_0x5ba9f8[_0x5376e7(0x1fd)](_0x1194bc,_0x1194bc),_0x5ba9f8[_0x5376e7(0x6ba)]['x']=_0x168972/0x60,_0x5ba9f8[_0x5376e7(0x6ba)]['y']=_0x326cb7/0x60,_0xabf221[_0x5376e7(0x219)]=this[_0x5376e7(0x858)],_0xabf221[_0x5376e7(0x1d7)](0x0,0x60,0x60,0x60),_0xabf221[_0x5376e7(0x1fd)](0x0,0x0,_0x168972,_0x326cb7),_0xabf221['scale']['x']=0x1/_0x5ba9f8[_0x5376e7(0x6ba)]['x'],_0xabf221[_0x5376e7(0x6ba)]['y']=0x1/_0x5ba9f8[_0x5376e7(0x6ba)]['y'],_0x5ba9f8[_0x5376e7(0x1d4)](this[_0x5376e7(0x777)]);},Game_Temp[_0x150bf7(0x8e0)]['sceneTerminationClearEffects']=function(){const _0x5ae907=_0x150bf7;this['_animationQueue']=[],this['_fauxAnimationQueue']=[],this[_0x5ae907(0x8d8)]=[],this[_0x5ae907(0x142)]=[];},VisuMZ[_0x150bf7(0x7d0)]['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x150bf7(0x8e0)][_0x150bf7(0x622)],Scene_Base['prototype'][_0x150bf7(0x622)]=function(){const _0x2b9eec=_0x150bf7;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x2b9eec(0x7d0)][_0x2b9eec(0x70a)][_0x2b9eec(0x697)](this);},Bitmap['prototype']['measureTextWidthNoRounding']=function(_0x827e53){const _0x4ee650=_0x150bf7,_0x2edbdd=this[_0x4ee650(0x7ae)];_0x2edbdd[_0x4ee650(0x1cb)](),_0x2edbdd[_0x4ee650(0x756)]=this['_makeFontNameText']();const _0x3af1f5=_0x2edbdd[_0x4ee650(0x2ad)](_0x827e53)[_0x4ee650(0x14c)];return _0x2edbdd[_0x4ee650(0x363)](),_0x3af1f5;},Window_Message[_0x150bf7(0x8e0)][_0x150bf7(0x2b4)]=function(_0x46bd58){const _0x93411a=_0x150bf7;return this[_0x93411a(0x3e4)]()?this[_0x93411a(0x21a)][_0x93411a(0x48e)](_0x46bd58):_0x93411a(0x5af)!=='zxrIy'?_0x1fdf99['eva']:Window_Base[_0x93411a(0x8e0)][_0x93411a(0x2b4)]['call'](this,_0x46bd58);},Window_Message['prototype'][_0x150bf7(0x3e4)]=function(){const _0x1d628f=_0x150bf7;return VisuMZ['CoreEngine']['Settings'][_0x1d628f(0x51b)]['FontWidthFix']??!![];},VisuMZ[_0x150bf7(0x7d0)][_0x150bf7(0x7c2)]=Game_Action[_0x150bf7(0x8e0)][_0x150bf7(0x852)],Game_Action[_0x150bf7(0x8e0)][_0x150bf7(0x852)]=function(){const _0x36f927=_0x150bf7;if(this['item']()){if('yUCXQ'!==_0x36f927(0x66a))return VisuMZ[_0x36f927(0x7d0)]['Game_Action_numRepeats'][_0x36f927(0x697)](this);else{if(this[_0x36f927(0x508)]===_0x6c2156)this[_0x36f927(0x42b)]();if(this[_0x36f927(0x508)]['TimeProgress']===_0x4e4d32)this[_0x36f927(0x42b)]();this[_0x36f927(0x508)][_0x36f927(0x77b)]=_0x397a59;}}else{if(_0x36f927(0x87e)===_0x36f927(0x36e))_0x6b8d4c[_0x36f927(0x193)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),_0x146255[_0x36f927(0x193)](_0x5c0148);else return 0x0;}},VisuMZ['CoreEngine'][_0x150bf7(0x38f)]=Game_Action[_0x150bf7(0x8e0)][_0x150bf7(0x5de)],Game_Action[_0x150bf7(0x8e0)]['setAttack']=function(){const _0x1bd3f8=_0x150bf7;if(this['subject']()&&this['subject']()['canAttack']())VisuMZ[_0x1bd3f8(0x7d0)][_0x1bd3f8(0x38f)][_0x1bd3f8(0x697)](this);else{if('cFgFJ'===_0x1bd3f8(0x148))this[_0x1bd3f8(0x62c)]();else{const _0x1f113b=this['isMVAnimation'](_0x2b355c),_0xa0014=new(_0x1f113b?_0xa495f9:_0x584584)(),_0x1d8f6d=this[_0x1bd3f8(0x472)](_0x8d4350);this[_0x1bd3f8(0x3a3)](_0x4ffc4d[0x0])&&(_0x748234=!_0x20072d),_0xa0014[_0x1bd3f8(0x840)]=_0x48b6a3,_0xa0014[_0x1bd3f8(0x136)](_0x1d8f6d,_0xc4b458,_0x1d10de,_0xf731a3),_0xa0014[_0x1bd3f8(0x7b2)](_0x372e3f),this['_effectsContainer']['addChild'](_0xa0014),this[_0x1bd3f8(0x439)][_0x1bd3f8(0x4c5)](_0xa0014);}}},Sprite_Name[_0x150bf7(0x8e0)][_0x150bf7(0x595)]=function(){return 0x24;},Sprite_Name[_0x150bf7(0x8e0)]['redraw']=function(){const _0x525af8=_0x150bf7,_0x5d991c=this[_0x525af8(0x42a)](),_0x24acb1=this[_0x525af8(0x1f5)](),_0x423f61=this[_0x525af8(0x595)]();this[_0x525af8(0x711)](),this[_0x525af8(0x219)][_0x525af8(0x62c)](),this['bitmap'][_0x525af8(0x3c6)](_0x5d991c,0x0,0x0,_0x24acb1,_0x423f61,_0x525af8(0x3f7));},Bitmap[_0x150bf7(0x8e0)][_0x150bf7(0x3c6)]=function(_0xa17b84,_0x2d2c38,_0x5bb8d3,_0x5c9fd7,_0x5b3e7a,_0x492f93){const _0x24939c=_0x150bf7,_0x34ac16=this[_0x24939c(0x7ae)],_0x276836=_0x34ac16[_0x24939c(0x8ab)];_0x5c9fd7=_0x5c9fd7||0xffffffff;let _0x5f2cb0=_0x2d2c38,_0x4615ef=Math[_0x24939c(0x469)](_0x5bb8d3+0x18/0x2+this[_0x24939c(0x7a6)]*0.35);_0x492f93===_0x24939c(0x1e5)&&(_0x5f2cb0+=_0x5c9fd7/0x2),_0x492f93===_0x24939c(0x400)&&('fKgwC'===_0x24939c(0x671)?(this[_0x24939c(0x134)]&&this[_0x24939c(0x134)][_0x24939c(0x34c)](_0x5be319[_0x24939c(0x749)]['CommandBgType']),this[_0x24939c(0x72a)]&&this[_0x24939c(0x72a)][_0x24939c(0x34c)](_0x407ee2[_0x24939c(0x749)]['GoldBgType']),this['_statusWindow']&&this[_0x24939c(0x11d)][_0x24939c(0x34c)](_0x5a1914[_0x24939c(0x749)][_0x24939c(0x129)])):_0x5f2cb0+=_0x5c9fd7),_0x34ac16[_0x24939c(0x1cb)](),_0x34ac16[_0x24939c(0x756)]=this[_0x24939c(0x22d)](),_0x34ac16[_0x24939c(0x456)]=_0x492f93,_0x34ac16['textBaseline']=_0x24939c(0x727),_0x34ac16[_0x24939c(0x8ab)]=0x1,this[_0x24939c(0x12e)](_0xa17b84,_0x5f2cb0,_0x4615ef,_0x5c9fd7),_0x34ac16[_0x24939c(0x8ab)]=_0x276836,this[_0x24939c(0x23a)](_0xa17b84,_0x5f2cb0,_0x4615ef,_0x5c9fd7),_0x34ac16['restore'](),this['_baseTexture']['update']();},VisuMZ['CoreEngine'][_0x150bf7(0x485)]=BattleManager[_0x150bf7(0x864)],BattleManager[_0x150bf7(0x864)]=function(_0x28c49b){const _0x39a2a1=_0x150bf7;if(this[_0x39a2a1(0x398)][_0x39a2a1(0x8d7)]())return![];return VisuMZ['CoreEngine'][_0x39a2a1(0x485)][_0x39a2a1(0x697)](this,_0x28c49b);};