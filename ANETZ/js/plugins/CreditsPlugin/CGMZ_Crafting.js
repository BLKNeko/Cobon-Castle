/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/crafting/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Adds a crafting system to your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.4.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * Description: Adds a crafting system to your game that works well with CGMZ
 * Professions. It can handle item requirements (consumed on craft), tool
 * requirements (not consumed on craft), products (produced on craft success)
 * and fail products (produced on craft fail). Recipes can be discovered by 
 * using an item or via plugin command.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------------Saved Games------------------------------------
 * This plugin partially supports saved games. Adding new recipes is supported,
 * but removing or modifying existing recipes is not supported. This is
 * because everything is saved when the game is saved. Any issues with
 * removed/modified recipes will only occur in previously saved games.
 *
 * Generic Item Info supports saved games completely, you can add/edit/remove
 * generic item information in saved games. However, the generic item type in
 * the recipe parameters does not support saved games.
 * --------------------------Crafting In/Output--------------------------------
 * Recipes have 4 categories of items associated with them: "Products", "Fail
 * Products", "Tools", and "Ingredients".
 * - Products are items that are received by the player directly into the
 *   inventory on a successful craft.
 * - Fail Products are items that are received by the player directly into the
 *   inventory on a failed craft. This is an optional parameter.
 * - Tools are items that are required to craft the recipe, but which are NOT
 *   consumed on craft.
 * - Ingredients are items that are required to craft the recipe, and are
 *   consumed on craft.
 * --------------------------Generic Item Types--------------------------------
 * Recipes can use "generic item types" for their ingredients or tools. What
 * this means is that if you need a "skillet" tool to craft an "omelet", you
 * could designate your "iron skillet" and "steel skillet" as a "skillet" type
 * item, and then either could be used to craft the "omelet".
 *
 * See note tag section for setting an item's type.
 *
 * Caution: Care should be taken if an item belongs to multiple generic
 * categories and the recipe uses multiple generic categories, as the item
 * could be double counted when calculating the amount of items the player has.
 * -------------------------------Note Tags------------------------------------
 * You can make items that, when used, will cause a recipe to be learned.
 * To do so, put the following tag in its notebox:
 * <cgmzrecipe:RecipeName>
 * And replace RecipeName with the name of the recipe.
 *
 * You can make weapons or armors that, when equipped, will add to a recipe
 * success chance. To do so, put the following note tags in the equip notebox:
 * <cgmzrecipetype:RecipeName>
 * <cgmzrecipebonus:BonusAmount>
 *
 * You can make "generic" types of items/weapons/armors to be used as either
 * ingredients or tools. To do so, enter the following note tag into any
 * item/armor/weapon notebox:
 * <cgmzcraftinggeneric:GenericType,GenericType2,etc>
 * Caution: Please be aware that generics can ONLY be used for ingredients or
 *          tools!
 *
 * Note: When typing a note tag, it is CASE SENSITIVE which means that
 *       "Cooking" is not the same as "cOOking"
 * ----------------------------Plugin Commands---------------------------------
 * This plugin supports the following commands:
 * Discover: Discovers (or undiscovers) the given recipe by name
 * Call Scene: Calls the crafting scene. Specify a profession type (case
 *             sensitive) to only include certain recipes in the scene.
 * Set Description: Changes the given recipe's description
 * Reinitialize: Reinitializes crafting data as if you had started a new game.
 * ------------------------Calling the Scene-----------------------------------
 * The JS to call the scene is: SceneManager.push(CGMZ_Scene_Crafting);
 * You can also prepare the crafting scene to show only certain recipes with:
 * SceneManager.prepareNextScene(["Type", "Type2"]);
 * -------------------------Version History------------------------------------
 * Version 1.0.0 - Initial Release
 *
 * Version 1.0.1
 * - Made it easier to select items/armors/weapons for crafting recipes
 * - Fixed crash if recipe had no toast SE but Toast Manager was imported
 *
 * Version 1.0.2
 * - Added option to hide the percentage text on the progress window
 * - Made the recipe list refresh after every craft
 *
 * Version 1.0.3
 * - Added option to show the current supply of ingredients in craft window
 *
 * Version 1.0.4
 * - Rearranged the recipe parameter to show the name first
 *
 * Version 1.1.0
 * - Added ability to make the windows transparent
 * - Added ability to use your own background image for the scene
 * - Added option to close crafting scene on profession level up
 * - Added ability to increase success chance by profession level
 * - Added ability to increase success change by equipment
 * - Added ability to use gold as ingredient, tool, fail product, or product
 *
 * Version 1.2.0
 * - Descriptions and item names now compatible with text codes such as \c[x]
 * - Added ability to use custom icon image in place of big icon in display
 *   window
 * - Added option to show a confirmation window before crafting
 * - Added option to change label text color
 * - Added plugin command to set a recipe's description
 * - The display window now shows the current profession level
 * - Changed the Call Scene plugin command. You can now input multiple
 *   professions to include more than 1 type in the scene
 * - New recipes should be automatically recognized on saved game load
 * - Compatibility with CGMZ Profession profession level buffs
 *
 * Version 1.2.1
 * - Fixed bug with click to craft for windows that don't scroll
 *
 * Version 1.2.2
 * - Fixed bug when using cgmz professions but a recipe doesn't have a
 *   profession
 * - Fixed bug with back button on non-scrolling display window
 *
 * Version 1.3.0
 * - Added ability to change what info is displayed in display window
 * - Added ability to change the order of information in display window
 * - Added ability to show fail products in display window
 * - You can now set recipe(s) to be learned when crafting another recipe
 * - More documentation added
 * - Documentation no longer horizontally scrolls
 *
 * Version 1.4.0
 * - Added ability to increase a variable after a successful craft
 * - Added generic items, you can now designate multiple item/wep/armor
 *   as a "type" and crafting ingredient/tools will count any items of
 *   that type
 *
 * Version 1.4.1
 * - Fixed crash if using CGMZ Professions and recipe profession did not
 *   exist
 *
 * @command discover
 * @text Discover
 * @desc Discover (or undiscover) a recipe
 *
 * @arg name
 * @type text
 * @text Recipe Name
 * @desc The name of the recipe to discover
 * @default
 *
 * @arg discover
 * @type boolean
 * @text Discover
 * @desc Whether to discover or undiscover the recipe
 * @default true
 *
 * @command Call Scene
 * @desc Calls the crafting scene
 *
 * @arg type
 * @type text[]
 * @text Type
 * @desc The type of recipes to include. Leave this blank to include all discovered recipes
 * @default []
 *
 * @command Set Description
 * @desc Set a recipe's description
 *
 * @arg name
 * @text Recipe Name
 * @desc The name of the recipe to change description (case sensitive)
 *
 * @arg description
 * @text Description
 * @type note
 * @default ""
 * @desc The new description
 *
 * @command Reinitialize
 * @desc Resets all crafting data. Use for saved games to recognize changed data
 *
 * @param Recipes
 * @type struct<Recipe>[]
 * @default []
 * @desc Set up recipes here
 *
 * @param Generic Items
 * @type struct<GenericItem>[]
 * @default []
 * @desc Set up generic items here
 *
 * @param Window Options
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc Whether the crafting windows are transparent or not
 * @default false
 *
 * @param Background Image
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param ScrollSpeed
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the recipe window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Show Ingredient Amount
 * @parent Window Options
 * @type boolean
 * @default true
 * @desc Show the current amount of ingredients the player has?
 *
 * @param Show Confirm Window
 * @parent Window Options
 * @type boolean
 * @desc Determine if there should be an additional confirmation window before starting to craft
 * @default false
 *
 * @param Show Progress Percentage
 * @parent Window Options
 * @desc Whether to show the progress % text or not
 * @type boolean
 * @default true
 *
 * @param Display Window Info
 * @parent Window Options
 * @type select[]
 * @option Name
 * @option Image
 * @option Times Crafted
 * @option Success Rate
 * @option Exp
 * @option Level Required
 * @option Current Level
 * @option Description
 * @option Products
 * @option Tools
 * @option Ingredients
 * @option Fail Products
 * @option Info Header
 * @option Description Header
 * @option Product Header
 * @option Tool Header
 * @option Ingredient Header
 * @option Fail Product Header
 * @option Blank Line
 * @desc Determines the order and what info the display window shows.
 * @default ["Name","Image","Times Crafted","Success Rate","Exp","Level Required","Current Level","Description","Product Header","Products","Tool Header","Tools","Ingredient Header","Ingredients"]
 *
 * @param Text Options
 *
 * @param Description Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the description text.
 * @default left
 *
 * @param Success Rate Text
 * @parent Text Options
 * @desc Text to show to describe the success rate of a recipe
 * @default Success Rate: 
 *
 * @param Times Crafted Text
 * @parent Text Options
 * @desc Text to show to describe the amount of times a recipe has been crafted
 * @default Times Crafted: 
 *
 * @param Experience Text
 * @parent Text Options
 * @desc Text to show to describe the experience gained for crafting the recipe (Requires CGMZ Professions)
 * @default Exp Gain: 
 *
 * @param Level Requirement Text
 * @parent Text Options
 * @desc Text to show to describe the level required to craft the recipe (Requires CGMZ Professions)
 * @default Level Req: 
 *
 * @param Current Level Text
 * @parent Text Options
 * @desc Text to show to describe the current level of the required profession (Requires CGMZ Professions)
 * @default Level: 
 *
 * @param Level Abbreviation Text
 * @parent Text Options
 * @desc Text to abbreviate level requirement to (Requires CGMZ Professions)
 * @default Lv.
 *
 * @param Craft Confirm Text
 * @parent Text Options
 * @desc Text to show to describe the command for crafting
 * @default Craft
 *
 * @param Craft Cancel Text
 * @parent Text Options
 * @desc Text to show to describe the command for cancelling a craft
 * @default Cancel
 *
 * @param Progress Text
 * @parent Text Options
 * @desc Text to show to describe the progress of the currently crafting recipe
 * @default Progress: 
 *
 * @param Success Text
 * @parent Text Options
 * @desc Text to show to describe a successful craft
 * @default Craft Success!
 *
 * @param Failure Text
 * @parent Text Options
 * @desc Text to show to describe a failed craft
 * @default Craft Failed!
 *
 * @param Label Text Color
 * @parent Text Options
 * @desc The color of the text labels in the crafting scene
 * @min 0
 * @default 16
 *
 * @param Progress Color1
 * @parent Window Options
 * @desc First color of the progress bar using Windowskin colors
 * @min 0
 * @default 28
 *
 * @param Progress Color2
 * @parent Window Options
 * @desc Second color of the progress bar using Windowskin colors
 * @min 0
 * @default 29
 *
 * @param Success Color
 * @parent Text Options
 * @desc Color of the Successful Craft Text using Windowskin colors
 * @min 0
 * @default 29
 *
 * @param Failure Color
 * @parent Text Options
 * @desc Color of the Failure Craft Text using Windowskin colors
 * @min 0
 * @default 18
 *
 * @param Info Header Text
 * @parent Text Options
 * @desc Text in the Info Header of display window
 * @default Info
 *
 * @param Desc Header Text
 * @parent Text Options
 * @desc Text in the Description Header of display window
 * @default Description
 *
 * @param Ingredient Header Text
 * @parent Text Options
 * @desc Text in the Ingredient Header of display window
 * @default Ingredients
 *
 * @param Tool Header Text
 * @parent Text Options
 * @desc Text in the Tool Header of display window
 * @default Tools
 *
 * @param Product Header Text
 * @parent Text Options
 * @desc Text in the Product Header of display window
 * @default Products
 *
 * @param Fail Product Header Text
 * @parent Text Options
 * @desc Text in the Fail Product Header of display window
 * @default Fail Products
 *
 * @param Other CGMZ Plugin Options
 *
 * @param Show Learn Toast
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window upon learning a new recipe (requires CGMZ ToastManager)
 *
 * @param Toast Text
 * @parent Other CGMZ Plugin Options
 * @default Learned Recipe: 
 * @desc Text to describe a recently learned recipe in the toast window (requires CGMZ ToastManager)
 *
 * @param Always Award Exp
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Award exp even on recipe failure? (requires CGMZ Professions)
 *
 * @param Always Show Recipes
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show recipes even if profession level not high enough? (requires CGMZ Professions)
 *
 * @param Close On Level Up
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @desc Close the crafting scene on profession level up?
 * @default false
*/
/*~struct~Recipe:
 * @param Name
 * @type text
 * @desc The name of the recipe.
 *
 * @param Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by crafting the recipe
 *
 * @param Fail Products
 * @type struct<Item>[]
 * @default []
 * @desc The items produced by a failed craft of this recipe
 *
 * @param Ingredients
 * @type struct<Item>[]
 * @default []
 * @desc The items required to craft the recipe that are consumed on craft
 *
 * @param Tools
 * @type struct<Item>[]
 * @default []
 * @desc The items required to craft the recipe that are not consumed on craft
 * 
 * @param Discovered
 * @type boolean
 * @default false
 * @desc Determine whether the recipe is discovered at the beginning of the game.
 *
 * @param Picture
 * @type file
 * @dir img/pictures
 * @desc The image to use for the recipe in place of the big icon (recommended size: 64x64). Leave blank to not use.
 * 
 * @param Icon
 * @type number
 * @default 0
 * @min -1
 * @max 99999
 * @desc Icon index to use for the recipe
 *
 * @param Description
 * @type note
 * @default ""
 * @desc Recipe description
 *
 * @param Success Rate
 * @type number
 * @min 1
 * @max 100
 * @default 100
 * @desc The % chance that the craft will succeed.
 *
 * @param Time
 * @type number
 * @min 1
 * @default 120
 * @desc The time (in frames, 60f = 1sec) it takes to craft the recipe
 *
 * @param Success Rate Per Level
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The change (additive) in % chance that the craft will succeed per level beyond the level requirement. (Requires CGMZ Professions)
 *
 * @param Experience
 * @type number
 * @min 1
 * @default 1
 * @desc The amount of experience to award for crafting this recipe (Requires CGMZ Professions)
 *
 * @param Profession
 * @type text
 * @desc The profession name which the recipe belongs to if using CGMZ Professions. The type of recipe if not using CGMZ Professions.
 *
 * @param Level Requirement
 * @type number
 * @default 1
 * @min 0
 * @desc Profession level required to craft (Requires CGMZ Professions)
 *
 * @param Craft Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting the recipe
 *
 * @param Fail Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting fails
 *
 * @param Success Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when crafting succeeds
 *
 * @param Toast Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when displaying a toast window for the recipe (Requires CGMZ ToastManager)
 *
 * @param Learn On Craft
 * @type text[]
 * @default []
 * @desc Recipe name(s) to learn when this recipe is crafted
 *
 * @param Learn On Craft Chance
 * @type number[]
 * @default []
 * @min 1
 * @max 100
 * @desc Percentage of learning the corresponding recipe in Learn On Craft param
 *
 * @param Success Variable
 * @type variable
 * @default 0
 * @desc Variable ID which, on successful craft, will increase by 1
 */
 /*~struct~Item:
 * @param Item
 * @type item
 * @default 0
 * @desc The item to use. If you set this, do not set armor/weapon.
 *
 * @param Weapon
 * @type weapon
 * @default 0
 * @desc The weapon to use. If you set this, do not set armor/item.
 *
 * @param Armor
 * @type armor
 * @default 0
 * @desc The item to use. If you set this, do not set item/weapon.
 *
 * @param Gold
 * @type boolean
 * @default false
 * @desc True to set a gold amount.
 *
 * @param Generic
 * @desc A generic type to use. Only for use in Ingredients/Tools! Ignored for Products.
 * 
 * @param Amount
 * @type number
 * @default 1
 * @desc The amount of this item needed
*/
/*~struct~GenericItem:
 * @param Type
 * @desc The id/type of the generic item. Used internally to refer to this generic item.
 *
 * @param Display Name
 * @desc The displayed name of the generic item
 *
 * @param Icon Index
 * @type number
 * @default 0
 * @min 0
 * @desc The icon to use to represent the generic item
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/crafting/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc 手工艺系统（物品合成制作）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】V 1.4.1
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * 【插件描述】
 * 功能全面的传统物品合成插件。
 * 通过设置配方的材料和工具，来合成获得产物，或得到废品。
 * 可以通过合成来领悟新的配方。
 * 可以设定和使用相同属性工具或材料作为合成替代品。
 * 可以使用物品或触发事件来获取配方。
 *
 * 【搭配插件】
 * CGMZ Core:核心插件，运行作者插件的必须插件。
 * CGMZ Toast Manager:提示插件，提示配方得失，专业技能升级等。
 * CGMZ Profession:专业插件，用专业等级作为合成条件，获得经验升级和提高成功率等。 
 * 注：本插件在插件列表中必须置于"核心插件Core"和"提示插件Toast Manager"之下。
 * ----------------------------------------------------------------------------
 * 【使用说明】
 *
 * 一、配方设置（4个主要项目）
 *   1.产物：合成成功的产物，可以设置多种产物和不同数量。
 *   2.废品：合成失败的产物，可以不设置。
 *   3.工具：合成所需工具，需持有但不会消耗。可以不设置。
 *   4.材料：合成所需的物品，合成时会被消耗。
 *       注：以上项目可以设置为：物品/武器/防具/金钱。
 *   5.专业：定义配方的类型，在打开合成界面时使用。
 *       注：如果配合专业插件，可以拓展以专业等级作为合成条件。
 *   6.领悟：在合成时，有几率获得新的配方。
 *
 * 二、物品属性和合成次数（1.4.0新增功能）
 *   1.可以定义作为材料或工具的物品/武器/防具的属性。
 *     拥有相同属性的物品可以在配方合成时作为替代品。
 *     尽量避免一个配方中的一个物品有多种属性的设置。（详细设置见备注指令的说明）
 *     举例1：制作皮革需要剥皮刀工具，铁刀、银刀、金刀均为剥皮刀属性的物品，
 *            拥有其中之一即可制作皮革配方。
 *     举例2：制作沙拉需要5个蔬菜属性的物品，
 *            你可以使用同为蔬菜属性的白菜和番茄来制作，满足材料需求数量即可。
 *            同类物品会按照物品ID顺序从小到大消耗。
 *   2.可以获取某个配方的成功合成次数作为变量在游戏中使用。
 *
 * 三、备注指令（在物品/武器/防具设置界面备注栏输入）
 *   1.制作使用后可获得配方的物品：
 *     <cgmzrecipe:配方名称>
 *   2.制作装备后提高合成成功率百分比的武器或防具：
 *     <cgmzrecipetype:配方名称>
 *     <cgmzrecipebonus:提升数值>
 *   3.定义工具或材料的属性
 *     <cgmzcraftinggeneric:属性1, 属性2, 属性3等>
 *     注：只能定义工具或材料，产物和废品无效。
 *
 * 四、插件指令（事件中使用插件指令）
 *   1.打开菜单：打开合成菜单显示已获得的配方。
 *               设置一种或多种专业，则可以同时打开所选专业对应的配方。
 *               不设置则打开所有已获得配方。
 *   2.获得配方：设置获得或失去配方。
 *   3.修改描述：修改一个配方的备注描述。
 *   4.重置数据：调试用指令，重置合成数据到新游戏开始状态。
 * 
 * 五、脚本指令（事件中运行脚本指令）
 *   1.打开合成界面：SceneManager.push(CGMZ_Scene_Crafting);
 *   2.打开指定专业的合成界面：SceneManager.prepareNextScene(["专业1", "专业2"]);
 * 
 * 六、关于所有设置中的配方名称、物品属性、专业名称：
 *     字符必须一致，并区分大小写。如Cooking和cooKING会定义为不同的配方或专业。
 *
 * 七、关于插件对已保存游戏的支持。
 *     大概意思是支持加入新配方，不支持配方修改或删除。
 *     不太明白，请各位参考原文。
 *     This plugin partially supports saved games. Adding new recipes is supported,
 *     but removing or modifying existing recipes is not supported. This is
 * 	   because everything is saved when the game is saved. Any issues with
 *     removed/modified recipes will only occur in previously saved games.
 * 
 * ---------------------------------------------------------------------------
 *【版本更新历史】
 * Version 1.0.0 - Initial Release
 * Version 1.0.1
 * - Made it easier to select items/armors/weapons for crafting recipes
 * - Fixed crash if recipe had no toast SE but Toast Manager was imported
 * Version 1.0.2
 * - Added option to hide the percentage text on the progress window
 * - Made the recipe list refresh after every craft
 * Version 1.0.3
 * - Added option to show the current supply of ingredients in craft window
 * Version 1.0.4
 * - Rearranged the recipe parameter to show the name first
 * Version 1.1.0
 * - Added ability to make the windows transparent
 * - Added ability to use your own background image for the scene
 * - Added option to close crafting scene on profession level up
 * - Added ability to increase success chance by profession level
 * - Added ability to increase success change by equipment
 * - Added ability to use gold as ingredient, tool, fail product, or product
 * Version 1.2.0
 * - Descriptions and item names now compatible with text codes such as \c[x]
 * - Added ability to use custom icon image in place of big icon in display
 *   window
 * - Added option to show a confirmation window before crafting
 * - Added option to change label text color
 * - Added plugin command to set a recipe's description
 * - The display window now shows the current profession level
 * - Changed the Call Scene plugin command. You can now input multiple
 *   professions to include more than 1 type in the scene
 * - New recipes should be automatically recognized on saved game load
 * - Compatibility with CGMZ Profession profession level buffs
 * Version 1.2.1
 * - Fixed bug with click to craft for windows that don't scroll
 * Version 1.2.2
 * - Fixed bug when using cgmz professions but a recipe doesn't have a
 *   profession
 * - Fixed bug with back button on non-scrolling display window
 * Version 1.3.0
 * - Added ability to change what info is displayed in display window
 * - Added ability to change the order of information in display window
 * - Added ability to show fail products in display window
 * - You can now set recipe(s) to be learned when crafting another recipe
 * - More documentation added
 * - Documentation no longer horizontally scrolls
 * Version 1.4.0
 * - Added ability to increase a variable after a successful craft
 * - Added generic items, you can now designate multiple item/wep/armor
 *   as a "type" and crafting ingredient/tools will count any items of
 *   that type
 * Version 1.4.1
 * - Fixed crash if using CGMZ Professions and recipe profession did not
 *   exist
 *
 * @command discover
 * @text 获得配方
 * @desc 获得或失去配方。
 *
 * @arg name
 * @type text
 * @text 配方名称
 * @desc 获得或失去的配方的名称。
 * @default
 *
 * @arg discover
 * @type boolean
 * @text 获得/失去
 * @desc Ture获得/False失去配方。
 * @default true
 *
 * @command Call Scene
 * @text 打开合成菜单
 * @desc 打开合成菜单，如果不设置专业则显示所有已获得的配方。
 *
 * @arg type
 * @type text[]
 * @text 专业
 * @desc 设置专业，打开菜单时会显示所有属于该专业的已获得的配方。
 * @default []
 *
 * @command Set Description
 * @text 修改配方描述
 * @desc 修改一个配方的备注描述。
 *
 * @arg name
 * @text 配方名称
 * @desc 需要修改描述的配方名称。
 *
 * @arg description
 * @text 新的描述
 * @type note
 * @default ""
 * @desc 输入新的配方描述。
 *
 * @command Reinitialize
 * @text 重置数据
 * @desc 调试用指令，重置合成数据到新游戏开始状态。
 *
 * @param Recipes
 * @text 配方设置
 * @type struct<Recipe>[]
 * @default []
 * @desc 设置你需要的配方。
 *
 * @param Generic Items
 * @text 物品属性设置
 * @type struct<GenericItem>[]
 * @default []
 * @desc 设置物品/武器/防具的属性，使其可以作为配方中通用的工具或材料。
 *
 * @param Window Options
 * @text 窗口设置
 *
 * @param Transparent Windows
 * @text 窗口透明
 * @parent Window Options
 * @type boolean
 * @desc 设置合成界面的边框是否透明。（默认：不透明）
 * @default false
 *
 * @param Background Image
 * @text 背景图片
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc 设置合成界面的背景图片，不设置则作模糊化处理。
 *
 * @param ScrollSpeed
 * @text 滚动速度
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the recipe window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @text 滚动等待
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @text 滚动减速
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @text 自动滚动
 * @parent Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Show Ingredient Amount
 * @text 显示材料库存数量
 * @parent Window Options
 * @type boolean
 * @default true
 * @desc 显示玩家持有的合成材料的数量。
 *
 * @param Show Confirm Window
 * @parent Window Options
 * @text 显示确定窗口
 * @type boolean
 * @desc 是否在制作时显示一个确认窗口。
 * @default false
 *
 * @param Show Progress Percentage
 * @text 显示进度
 * @parent Window Options
 * @desc 是否显示合成进度条中的百分比。
 * @type boolean
 * @default true
 *
 * @param Display Window Info
 * @text 设置界面显示标签
 * @parent Window Options
 * @type select[]
 * @option Name
 * @option Image
 * @option Times Crafted
 * @option Success Rate
 * @option Exp
 * @option Level Required
 * @option Current Level
 * @option Description
 * @option Products
 * @option Tools
 * @option Ingredients
 * @option Fail Products
 * @option Info Header
 * @option Description Header
 * @option Product Header
 * @option Tool Header
 * @option Ingredient Header
 * @option Fail Product Header
 * @option Blank Line
 * @desc 设置合成界面中你想要显示的项目、标签和内容。
 * @default ["Name","Image","Times Crafted","Success Rate","Exp","Level Required","Current Level","Description","Product Header","Products","Tool Header","Tools","Ingredient Header","Ingredients"]
 *
 * @param Text Options
 * @text 文本描述设置
 *
 * @param Description Alignment
 * @text 描述位置
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 描述位置：Left-靠左，Center-居中，Right-靠右。
 * @default left
 *
 * @param Success Rate Text
 * @text 成功率的描述
 * @parent Text Options
 * @desc 关于配方制作成功率的文本描述。
 * @default 成功率: 
 *
 * @param Times Crafted Text
 * @text 制作次数的描述
 * @parent Text Options
 * @desc 关于配方制作成功的次数统计的文本描述。
 * @default 制作次数: 
 *
 * @param Experience Text
 * @text 经验值的描述
 * @parent Text Options
 * @desc 关于获得经验值的文本描述(需要CGMZ Professions插件)
 * @default 获得经验: 
 *
 * @param Level Requirement Text
 * @text 专业等级要求的描述
 * @parent Text Options
 * @desc 关于制作需要的专业技能等级要求的文本描述(需要CGMZ Professions插件)
 * @default 专业等级要求: 
 *
 * @param Current Level Text
 * @text 当前专业等级的描述
 * @parent Text Options
 * @desc 关于当前的专业技能等级的文本描述(需要CGMZ Professions插件)
 * @default 专业等级: 
 *
 * @param Level Abbreviation Text
 * @text 专业等级缩写的描述
 * @parent Text Options
 * @desc 关于等级的缩写文本描述(需要CGMZ Professions插件)
 * @default Lv.
 *
 * @param Craft Confirm Text
 * @text 确认合成的描述
 * @parent Text Options
 * @desc 关于确认并开始合成的文本描述。
 * @default 合成
 *
 * @param Craft Cancel Text
 * @text 取消合成的描述
 * @parent Text Options
 * @desc 关于取消这次合成的文本描述。
 * @default 取消
 *
 * @param Progress Text
 * @text 进度的描述
 * @parent Text Options
 * @desc 关于合成时进度的文本描述。
 * @default 进度 
 *
 * @param Success Text
 * @text 合成成功的描述
 * @parent Text Options
 * @desc 关于合成成功时显示的文字描述。
 * @default 合成成功！
 *
 * @param Failure Text
 * @text 合成失败的描述
 * @parent Text Options
 * @desc 关于合成失败时显示的文字描述。
 * @default 合成失败！
 *
 * @param Label Text Color
 * @text 标签颜色
 * @parent Text Options
 * @desc 合成界面中各种标签文字的颜色。（如制作次数、成功率等标签）
 * @min 0
 * @default 16
 *
 * @param Progress Color1
 * @text 进度条的颜色1
 * @parent Window Options
 * @desc 合成进度条的第一种颜色。
 * @min 0
 * @default 28
 *
 * @param Progress Color2
 * @text 进度条的颜色2
 * @parent Window Options
 * @desc 合成进度条的第二种颜色。
 * @min 0
 * @default 29
 *
 * @param Success Color
 * @text 合成成功的文本颜色
 * @parent Text Options
 * @desc 合成成功时显示的文本的颜色。
 * @min 0
 * @default 29
 *
 * @param Failure Color
 * @text 合成失败的文本颜色
 * @parent Text Options
 * @desc 合成失败时显示的文本的颜色。
 * @min 0
 * @default 18
 *
 * @param Info Header Text
 * @text 信息的标签
 * @parent Text Options
 * @desc 合成界面中关于配方信息标签的描述。（须在"设置界面显示标签"内增加）
 * @default 配方内容
 *
 * @param Desc Header Text
 * @text 配方描述的标签
 * @parent Text Options
 * @desc 合成界面中关于配方内容信息标签的描述。（须在"设置界面显示标签"内增加）
 * @default 配方描述
 *
 * @param Ingredient Header Text
 * @text 配方材料的标签
 * @parent Text Options
 * @desc 合成界面中关于配方材料标签的描述。
 * @default 材料
 *
 * @param Tool Header Text
 * @text 制作工具的标签
 * @parent Text Options
 * @desc 合成界面中关于制作工具标签的描述。
 * @default 工具
 *
 * @param Product Header Text
 * @text 配方产物的标签
 * @parent Text Options
 * @desc 合成界面中关于成功产物标签的描述。
 * @default 产品
 *
 * @param Fail Product Header Text
 * @text 失败产物的标签
 * @parent Text Options
 * @desc 合成界面中关于失败产物标签的描述。
 * @default 废品
 *
 * @param Other CGMZ Plugin Options
 * @text 其他关联插件的设置
 *
 * @param Show Learn Toast
 * @text 弹窗:获得配方
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default false
 * @desc 当获得配方时跳出弹窗提示(需要CGMZ ToastManager插件)
 *
 * @param Toast Text
 * @text 弹窗描述：获得配方
 * @parent Other CGMZ Plugin Options
 * @default 获得了配方： 
 * @desc 当获得配方时弹窗的内容描述(需要CGMZ ToastManager插件)
 *
 * @param Always Award Exp
 * @text 失败经验
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc 合成失败时是否也依然获得经验？ (需要CGMZ Professions插件)
 *
 * @param Always Show Recipes
 * @text 总是显示配方
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc 当专业技能等级不足时，是否依然显示配方。(需要CGMZ Professions插件)
 *
 * @param Close On Level Up
 * @text 专业升级时关闭合成界面
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @desc 当专业技能等级提升时是否关闭合成界面。(需要CGMZ Professions插件)
 * @default false
*/
/*~struct~Recipe:zh-CN
 * @param Name
 * @text 配方名称
 * @type text
 * @desc 设置一个配方的名称。
 *
 * @param Products
 * @text 产品
 * @type struct<Item>[]
 * @default []
 * @desc 合成成功时获得的物品。
 *
 * @param Fail Products
 * @text 废品
 * @type struct<Item>[]
 * @default []
 * @desc 合成失败时获得的物品。可选设置。
 *
 * @param Ingredients
 * @text 材料
 * @type struct<Item>[]
 * @default []
 * @desc 合成所需的材料。
 *
 * @param Tools
 * @text 工具
 * @type struct<Item>[]
 * @default []
 * @desc 合成所需的工具，不会被消耗。可选设置。
 * 
 * @param Discovered
 * @text 是否学会
 * @type boolean
 * @default false
 * @desc 新游戏开始时是否已学会该配方。
 *
 * @param Picture
 * @text 大图标
 * @type file
 * @dir img/pictures
 * @desc 设置一张64*64图片作为配方内显示的大图标。不设置为无图标。
 * 
 * @param Icon
 * @text 小图标
 * @type number
 * @default 0
 * @min -1
 * @max 99999
 * @desc 从IconSet内选择一个图标作为配方列表内的配方图标。
 *
 * @param Description
 * @text 配方描述
 * @type note
 * @default ""
 * @desc 设置配方的描述。
 *
 * @param Success Rate
 * @text 成功率
 * @type number
 * @min 1
 * @max 100
 * @default 100
 * @desc 设置配方的成功率百分比值。
 *
 * @param Time
 * @text 合成时间
 * @type number
 * @min 1
 * @default 120
 * @desc 设置合成该配方所需的时间。（单位：帧，60帧=1秒）
 *
 * @param Success Rate Per Level
 * @text 专业成功率加成
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc 设置该配方关于专业技能等级的等级加成。(需要CGMZ Professions插件)
 *
 * @param Experience
 * @text 获得经验
 * @type number
 * @min 1
 * @default 1
 * @desc 设置合成该配方后可获得的专业技能经验值。(需要CGMZ Professions插件)
 *
 * @param Profession
 * @text 专业
 * @type text
 * @desc 设置该配方的专业类型，如锻造、炼金术等。（当使用CGMZ Professions插件后，会指向到专业插件设定的专业技能）
 *
 * @param Level Requirement
 * @text 专业等级要求
 * @type number
 * @default 1
 * @min 0
 * @desc 设置合成该配方所需要的专业技能等级。(需要CGMZ Professions插件)
 *
 * @param Craft Sound Effect
 * @text 合成音效
 * @type file
 * @dir audio/se
 * @desc 设置合成该配方时播放的音效。
 *
 * @param Fail Sound Effect
 * @text 失败音效
 * @type file
 * @dir audio/se
 * @desc 设置合成失败时播放的音效。
 *
 * @param Success Sound Effect
 * @text 成功音效
 * @type file
 * @dir audio/se
 * @desc 设置合成成功时播放的音效。
 *
 * @param Toast Sound Effect
 * @text 弹窗音效
 * @type file
 * @dir audio/se
 * @desc 设置关于该配方跳出弹窗时的音效。 (需要CGMZ ToastManager插件)
 *
 * @param Learn On Craft
 * @text 领悟新配方
 * @type text[]
 * @default []
 * @desc 设置当合成时会领悟的新配方。领悟新配方的序号对应领悟几率的序号。
 *
 * @param Learn On Craft Chance
 * @text 领悟几率
 * @type number[]
 * @default []
 * @min 1
 * @max 100
 * @desc 设置合成时领悟新配方的几率。领悟几率的序号对应新配方的序号。
 *
 * @param Success Variable
 * @text 获取制作次数变量
 * @type variable
 * @default 0
 * @desc 指定一个变量来获取某个配方的合成次数。
*/
 /*~struct~Item:zh-CN
 * @param Item
 * @text 物品
 * @type item
 * @default 0
 * @desc 当选择物品作为项目参数时，请勿同时设置武器、防具、金钱或物品属性。
 *
 * @param Weapon
 * @text 武器
 * @type weapon
 * @default 0
 * @desc 当选择武器作为项目参数时，请勿同时设置物品、防具、金钱或物品属性。
 *
 * @param Armor
 * @text 防具
 * @type armor
 * @default 0
 * @desc 当选择防具作为项目参数时，请勿同时设置物品、武器、金钱或物品属性。
 *
 * @param Gold
 * @text 金钱
 * @type boolean
 * @default false
 * @desc 设置True时，请勿同时设置物品、武器、防具或物品属性。[数量]的设置也将变为金钱数而不是物品数。
 *
 * @param Generic
 * @text 物品属性
 * @desc 设当选择物品属性作为项目参数时，请勿同时设置物品、武器、防具或金钱。该设置只适用于材料或工具。
 * 
 * @param Amount
 * @text 数量
 * @type number
 * @default 1
 * @desc 设置项目所需物品或金钱的数量。
*/
/*~struct~GenericItem:zh-CN
 * @param Type
 * @text 属性名称（参数）
 * @desc 指定一个物品属性的名称，该名称会作为插件相关设置的参数使用。如在备注命令、配方设置中。
 *
 * @param Display Name
 * @text 属性名称（显示）
 * @desc 设置你想显示的该物品属性的名称。如：炼金器材、采矿工具等。
 *
 * @param Icon Index
 * @text 属性图标
 * @type number
 * @default 0
 * @min 0
 * @desc 设置一个用来表示该类物品属性的图标。
*/
var Imported = Imported || {};
Imported.CGMZ_Crafting = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Crafting"] = "1.4.1";
CGMZ.Crafting = CGMZ.Crafting || {};
CGMZ.Crafting.parameters = PluginManager.parameters('CGMZ_Crafting');
CGMZ.Crafting.Recipes = JSON.parse(CGMZ.Crafting.parameters["Recipes"]);
CGMZ.Crafting.Generics = JSON.parse(CGMZ.Crafting.parameters["Generic Items"]);
CGMZ.Crafting.DisplayWindowInfo = JSON.parse(CGMZ.Crafting.parameters["Display Window Info"]);
CGMZ.Crafting.SceneBackgroundImage = CGMZ.Crafting.parameters["Background Image"];
CGMZ.Crafting.SuccessRateText = CGMZ.Crafting.parameters["Success Rate Text"];
CGMZ.Crafting.TimesCraftedText = CGMZ.Crafting.parameters["Times Crafted Text"];
CGMZ.Crafting.ExpText = CGMZ.Crafting.parameters["Experience Text"];
CGMZ.Crafting.LevelReqText = CGMZ.Crafting.parameters["Level Requirement Text"];
CGMZ.Crafting.CurrentLevelText = CGMZ.Crafting.parameters["Current Level Text"];
CGMZ.Crafting.LevelAbbrText = CGMZ.Crafting.parameters["Level Abbreviation Text"];
CGMZ.Crafting.ProgressText = CGMZ.Crafting.parameters["Progress Text"];
CGMZ.Crafting.SuccessText = CGMZ.Crafting.parameters["Success Text"];
CGMZ.Crafting.FailureText = CGMZ.Crafting.parameters["Failure Text"];
CGMZ.Crafting.InfoHeaderText = CGMZ.Crafting.parameters["Info Header Text"];
CGMZ.Crafting.DescHeaderText = CGMZ.Crafting.parameters["Desc Header Text"];
CGMZ.Crafting.IngredientHeaderText = CGMZ.Crafting.parameters["Ingredient Header Text"];
CGMZ.Crafting.ToolHeaderText = CGMZ.Crafting.parameters["Tool Header Text"];
CGMZ.Crafting.ProductHeaderText = CGMZ.Crafting.parameters["Product Header Text"];
CGMZ.Crafting.FailProductHeaderText = CGMZ.Crafting.parameters["Fail Product Header Text"];
CGMZ.Crafting.LabelColor = Number(CGMZ.Crafting.parameters["Label Text Color"]);
CGMZ.Crafting.ScrollSpeed = Number(CGMZ.Crafting.parameters["ScrollSpeed"]);
CGMZ.Crafting.ScrollWait = Number(CGMZ.Crafting.parameters["ScrollWait"]);
CGMZ.Crafting.ScrollDeceleration = parseFloat(CGMZ.Crafting.parameters["Scroll Deceleration"]);
CGMZ.Crafting.AutoScroll = (CGMZ.Crafting.parameters["Auto Scroll"] === "true");
CGMZ.Crafting.ProgressColor1 = Number(CGMZ.Crafting.parameters["Progress Color1"]);
CGMZ.Crafting.ProgressColor2 = Number(CGMZ.Crafting.parameters["Progress Color2"]);
CGMZ.Crafting.FailureColor = Number(CGMZ.Crafting.parameters["Failure Color"]);
CGMZ.Crafting.SuccessColor = Number(CGMZ.Crafting.parameters["Success Color"]);
CGMZ.Crafting.ToastText = CGMZ.Crafting.parameters["Toast Text"];
CGMZ.Crafting.ShowLearnToast = (CGMZ.Crafting.parameters["Show Learn Toast"] === "true");
CGMZ.Crafting.AlwaysAwardExp = (CGMZ.Crafting.parameters["Always Award Exp"] === "true");
CGMZ.Crafting.AlwaysShowRecipes = (CGMZ.Crafting.parameters["Always Show Recipes"] === "true");
CGMZ.Crafting.ShowProgressPercentage = (CGMZ.Crafting.parameters["Show Progress Percentage"] === "true");
CGMZ.Crafting.ShowIngredientAmount = (CGMZ.Crafting.parameters["Show Ingredient Amount"] === "true");
CGMZ.Crafting.WindowTransparency = (CGMZ.Crafting.parameters["Transparent Windows"] === "true");
CGMZ.Crafting.PopSceneOnLevel = (CGMZ.Crafting.parameters["Close On Level Up"] === "true");
CGMZ.Crafting.DescriptionAlignment = CGMZ.Crafting.parameters["Description Alignment"];
CGMZ.Crafting.CraftConfirmText = CGMZ.Crafting.parameters["Craft Confirm Text"];
CGMZ.Crafting.CraftCancelText = CGMZ.Crafting.parameters["Craft Cancel Text"];
CGMZ.Crafting.ShowConfirmationWindow = (CGMZ.Crafting.parameters["Show Confirm Window"] === "true");
//=============================================================================
// CGMZ_Recipe
//-----------------------------------------------------------------------------
// Store and manage recipe data
//=============================================================================
function CGMZ_Recipe() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.initialize = function(recipe) {
	this._name = recipe.Name;
	this._discovered = (recipe.Discovered === 'true') ? true : false;
	this._experience = Number(recipe.Experience);
	this._successRate = Number(recipe["Success Rate"]);
	this._time = Number(recipe.Time);
	this._profession = recipe.Profession;
	this._image = recipe.Picture;
	this._levelRequirement = Number(recipe["Level Requirement"]);
	this._addedSuccessPerLevel = Number(recipe["Success Rate Per Level"]);
	this._iconIndex = Number(recipe.Icon);
	this._successVariable = Number(recipe["Success Variable"]);
	this._description = JSON.parse(recipe.Description);
	this._toastSE = recipe["Toast Sound Effect"];
	this._craftSE = {name: recipe["Craft Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._failSE = {name: recipe["Fail Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._successSE = {name: recipe["Success Sound Effect"], pan: 0, pitch: 100, volume: 100};
	this._timesCrafted = 0;
	this._products = [];
	this._failProducts = [];
	this._ingredients = [];
	this._tools = [];
	this.setupArray(this._products, JSON.parse(recipe.Products), false);
	this.setupArray(this._ingredients, JSON.parse(recipe.Ingredients), true);
	this.setupArray(this._tools, JSON.parse(recipe.Tools), true);
	this.setupArray(this._failProducts, JSON.parse(recipe["Fail Products"]), false);
	this.setupLearnOnCraft(JSON.parse(recipe["Learn On Craft"]), JSON.parse(recipe["Learn On Craft Chance"]));
};
//-----------------------------------------------------------------------------
// Set up the arrays for items associated with the recipe.
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setupArray = function(array, recipeArray, allowGenerics) {
	if(recipeArray.length === 0) return;
	for(let i = 0; i < recipeArray.length; i++) {
		var item = JSON.parse(recipeArray[i]);
		if(Number(item.Item) !== 0) {
			item.ID = Number(item.Item);
			item.Type = "item";
		} else if(Number(item.Weapon) !== 0) {
			item.ID = Number(item.Weapon);
			item.Type = "weapon";
		} else if(Number(item.Armor) !== 0) {
			item.ID = Number(item.Armor);
			item.Type = "armor";
		} else if(allowGenerics && item.Generic) {
			item.ID = 0;
			item.Type = "generic";
			item.GenericCategory = item.Generic;
		} else {
			item.ID = 0;
			item.Type = "currency";
		}
		item.Amount = Number(item.Amount);
		array.push(item);
	}
};
//-----------------------------------------------------------------------------
// Set up the array for possible crafting recipes learned on successful craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setupLearnOnCraft = function(recipes, odds) {
	this._learnOnCraft = [];
	for(let i = 0; i < recipes.length; i++) {
		const obj = {recipe: recipes[i], odds: Number(odds[i])};
		this._learnOnCraft.push(obj);
	}
};
//-----------------------------------------------------------------------------
// Change discovered status of a recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.changeDiscoveredStatus = function(discovered) {
	this._discovered = discovered;
};
//-----------------------------------------------------------------------------
// Set new description
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setDescription = function(description) {
	this._description = JSON.parse(description);
};
//-----------------------------------------------------------------------------
// Set up learn toast (Requires CGMZ ToastManager)
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.setupLearnToast = function() {
	var toast = {};
	toast.CGMZRecipeToast = true;
	toast.name = this._name;
	toast.SE = {name: this._toastSE, pan: 0, pitch: 100, volume: 100};
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Perform the craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.doCraft = function(success) {
	this.takeItems(this._ingredients);
	if(Imported.CGMZ_Professions) this.awardExp(success);
	if(success) {
		this._timesCrafted++;
		this.learnRecipesOnCraft();
		this.giveItems(this._products);
		if(this._successVariable) {
			const val = $gameVariables.value(this._successVariable);
			$gameVariables.setValue(this._successVariable, val + 1);
		}
	}
	else {
		this.giveItems(this._failProducts);
	}
};
//-----------------------------------------------------------------------------
// Check if recipe can be crafted
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.canCraft = function() {
	if(!this.meetsLevelRequirements()) return false;
	if(!this.hasItemsNeeded()) return false;
	return true;
};
//-----------------------------------------------------------------------------
// Check if profession level requirements are met
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.meetsLevelRequirements = function() {
	if(!Imported.CGMZ_Professions) return true;
	let profession = $cgmz.getProfession(this._profession);
	if(profession) {
		return this._levelRequirement <= profession.getBuffedLevel();
	}
	return true;
};
//-----------------------------------------------------------------------------
// Check if player has the items required to craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.hasItemsNeeded = function() {
	for(let i = 0; i < this._tools.length; i++) {
		if(this._tools[i].Type === 'currency') {
			if($gameParty.gold() < this._tools[i].Amount) return false;
		} else if(this._tools[i].Type === 'generic') {
			const numItems = this.calculateTotalNumItemsOfGenericType(this._tools[i].GenericCategory);
			if(numItems < this._tools[i].Amount) return false;
		} else {
			const item = $cgmzTemp.lookupItem(this._tools[i].Type, this._tools[i].ID);
			if(item) {
				if($gameParty.numItems(item) < this._tools[i].Amount) return false;
			}
		}
	}
	for(let i = 0; i < this._ingredients.length; i++) {
		if(this._ingredients[i].Type === 'currency') {
			if($gameParty.gold() < this._ingredients[i].Amount) return false;
		} else if(this._ingredients[i].Type === 'generic') {
			const numItems = this.calculateTotalNumItemsOfGenericType(this._ingredients[i].GenericCategory);
			if(numItems < this._ingredients[i].Amount) return false;
		} else {
			const item = $cgmzTemp.lookupItem(this._ingredients[i].Type, this._ingredients[i].ID);
			if(item) {
				if($gameParty.numItems(item) < this._ingredients[i].Amount) return false;
			}
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Take away ingredients needed to craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.takeItems = function(itemArray) {
	for(let i = 0; i < itemArray.length; i++) {
		if(itemArray[i].Type === 'currency') {
			$gameParty.loseGold(itemArray[i].Amount);
		} else if(itemArray[i].Type === 'generic') {
			let amtToLose = itemArray[i].Amount;
			for(const item of $gameParty.allItems()) {
				if(amtToLose <= 0) break;
				const genericType = itemArray[i].GenericCategory;
				if(item.meta && item.meta.cgmzcraftinggeneric && item.meta.cgmzcraftinggeneric.split(",").includes(genericType)) {
					const itemAmt = $gameParty.numItems(item);
					(amtToLose > itemAmt) ? $gameParty.loseItem(item, itemAmt, true) : $gameParty.loseItem(item, amtToLose, true);
					amtToLose -= itemAmt;
				}
			}
		} else {
			const item = $cgmzTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
			if(item) {
				$gameParty.loseItem(item, itemArray[i].Amount, false);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Give item products generated from craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.giveItems = function(itemArray) {
	for(let i = 0; i < itemArray.length; i++) {
		if(itemArray[i].Type === 'currency') {
			$gameParty.gainGold(itemArray[i].Amount);
		} else {
			var item = $cgmzTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
			if(item) {
				$gameParty.gainItem(item, itemArray[i].Amount, false);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Learn a recipe and show toast if applicable
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.learn = function() {
	this.changeDiscoveredStatus(true);
	if(CGMZ.Crafting.ShowLearnToast && Imported.CGMZ_ToastManager) this.setupLearnToast();
};
//-----------------------------------------------------------------------------
// Award profession Exp if applicable
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.awardExp = function(success) {
	if(success || CGMZ.Crafting.AlwaysAwardExp) {
		$cgmz.changeProfessionExp(this._profession, "+", this._experience);
	}
};
//-----------------------------------------------------------------------------
// Try to learn applicable recipes on craft
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.learnRecipesOnCraft = function() {
	for(const obj of this._learnOnCraft) {
		const recipe = $cgmz.getRecipe(obj.recipe);
		const roll = Math.random()*100;
		if(recipe && !recipe._discovered && roll <= obj.odds) {
			recipe.learn();
		}
	}
};
//-----------------------------------------------------------------------------
// Calculate the success rate of the recipe
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.calculateSuccessRate = function() {
	let successRate = this._successRate;
	if(Imported.CGMZ_Professions) {
		const profession = $cgmz.getProfession(this._profession);
		if(profession) {
			successRate += this._addedSuccessPerLevel * (profession.getBuffedLevel() - this._levelRequirement);
		}
		for(const actor of $gameParty.members()) {
			for(const equip of actor.equips()) {
				if(equip && equip.meta && equip.meta.cgmzrecipetype === this._profession) {
					successRate += Number(equip.meta.cgmzrecipebonus) || 0;
				}
			}
		}
	}
	return Math.max(0.0, Math.min(successRate, 100.0));
};
//-----------------------------------------------------------------------------
// Calculate number of items/weapons/armors belonging to generic category
//-----------------------------------------------------------------------------
CGMZ_Recipe.prototype.calculateTotalNumItemsOfGenericType = function(genericType) {
	let itemCount = 0;
	for(const item of $gameParty.allItems()) {
		if(item.meta && item.meta.cgmzcraftinggeneric && item.meta.cgmzcraftinggeneric.split(",").includes(genericType)) {
			itemCount += $gameParty.numItems(item);
		}
	}
	return itemCount;
};
//=============================================================================
// CGMZ_CraftingGenericItem
//-----------------------------------------------------------------------------
// Object representing a generic item, not saved
//=============================================================================
function CGMZ_CraftingGenericItem() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize generic item data
//-----------------------------------------------------------------------------
CGMZ_CraftingGenericItem.prototype.initialize = function(generic) {
	this._type = generic.Type;
	this._name = generic["Display Name"];
	this._iconIndex = Number(generic["Icon Index"]);
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage recipe data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize recipe data
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Crafting_createPluginData.call(this);
	this.initializeRecipeData(false);
};
//-----------------------------------------------------------------------------
// Initialize recipe data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeRecipeData = function(reinitialize) {
	if(!this._recipes || reinitialize) {
		this.setupRecipeVariables();
	}
	for(let i = 0; i < CGMZ.Crafting.Recipes.length; i++) {
		const recipe = new CGMZ_Recipe(JSON.parse(CGMZ.Crafting.Recipes[i]));
		const existingRecipe = this.getRecipe(recipe._name);
		if(!existingRecipe) {
			this._recipes.push(recipe);
		} else if(!existingRecipe._learnOnCraft) {
			existingRecipe._learnOnCraft = recipe._learnOnCraft;
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize recipe variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupRecipeVariables = function() {
	this._recipes = [];
};
//-----------------------------------------------------------------------------
// Alias. Check for new recipes after loading saved game
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Crafting_onAfterLoad.call(this);
	this.initializeRecipeData(false);
};
//-----------------------------------------------------------------------------
// Returns array of all recipes
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllRecipes = function() {
	return this._recipes;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredRecipes = function() {
	let discoveredRecipes = [];
	for(let i = 0; i < this._recipes.length; i++) {
		if(this._recipes[i]._discovered) discoveredRecipes.push(this._recipes[i]);
	}
	return discoveredRecipes;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered recipes of certain type (profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredRecipesOfType = function(type) {
	let discoveredRecipes = [];
	for(let i = 0; i < this._recipes.length; i++) {
		if(this._recipes[i]._discovered && this._recipes[i]._profession === type) discoveredRecipes.push(this._recipes[i]);
	}
	return discoveredRecipes;
};
//-----------------------------------------------------------------------------
// Get recipe by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getRecipe = function(name) {
	for(let i = 0; i < this._recipes.length; i++) {
		if(name === this._recipes[i]._name) return this._recipes[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a recipe
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverRecipe = function(name, discovered) {
	let recipe = this.getRecipe(name);
	if(recipe) {
		(discovered === "true") ? discovered = true : discovered = false;
		(discovered) ? recipe.learn() : recipe.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Check if Item has a recipe learn property attached to it
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkItemForRecipe = function(item) {
	if(item) {
		if(item.meta && item.meta.cgmzrecipe){
			this.discoverRecipe(item.meta.cgmzrecipe, "true");
		}
	}
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Adds plugin commands and initializes generic item objects
//=============================================================================
//-----------------------------------------------------------------------------
// Set up generic item data
//-----------------------------------------------------------------------------
const CGMZ_Crafting_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	CGMZ_Crafting_CGMZTemp_createPluginData.call(this);
	this._craftingGenericItems = {};
	for(const itemJSON of CGMZ.Crafting.Generics) {
		const item = JSON.parse(itemJSON);
		const id = item.Type;
		this._craftingGenericItems[id] = new CGMZ_CraftingGenericItem(item);
	}
};
//-----------------------------------------------------------------------------
// Get crafting generic item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getGenericCraftingItem = function(type) {
	return this._craftingGenericItems[type];
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Crafting_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Crafting", "discover", this.pluginCommandCraftingDiscover);
	PluginManager.registerCommand("CGMZ_Crafting", "Call Scene", this.pluginCommandCraftingCallScene);
	PluginManager.registerCommand("CGMZ_Crafting", "Set Description", this.pluginCommandCraftingSetDescription);
	PluginManager.registerCommand("CGMZ_Crafting", "Reinitialize", this.pluginCommandCraftingReinitialize);
};
//-----------------------------------------------------------------------------
// Reinitialize the crafting data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingReinitialize = function() {
	$cgmz.initializeRecipeData(true);
};
//-----------------------------------------------------------------------------
// Discover a recipe by name
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingDiscover = function(args) {
	$cgmz.discoverRecipe(args.name, args.discover);
};
//-----------------------------------------------------------------------------
// Call the crafting scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingCallScene = function(args) {
	SceneManager.push(CGMZ_Scene_Crafting);
	SceneManager.prepareNextScene(JSON.parse(args.type));
};
//-----------------------------------------------------------------------------
// Set a recipe's description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCraftingSetDescription = function(args) {
	const recipe = $cgmz.getRecipe(args.name);
	if(recipe) {
		recipe.setDescription(args.description);
	}
};
//=============================================================================
// CGMZ_Scene_Crafting
//-----------------------------------------------------------------------------
// Handle the crafting scene
//=============================================================================
function CGMZ_Scene_Crafting(craftType) {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Crafting.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Crafting.prototype.constructor = CGMZ_Scene_Crafting;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.initialize = function(craftType = null) {
	this._craftType = (craftType) ? craftType : [];
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Prepare
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.prepare = function(craftType = null) {
	this._craftType = (craftType) ? craftType : [];
};
//-----------------------------------------------------------------------------
// Create crafting windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createListWindow();
	this.createDisplayWindow();
	this.createProgressWindow();
	this.createConfirmationWindow();
};
//-----------------------------------------------------------------------------
// Update scene - check for pop on level up
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
	if(this._progressWindow && this._progressWindow.isPopRequested()) {
		this.popScene();
	}
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_RecipeList(rect, this._craftType);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get the list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.listWindowRect = function() {
	const x = 0;
	const y = this.buttonAreaHeight();
	const height = Graphics.boxHeight - y;
	const width = Graphics.boxWidth / 3;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect();
    this._displayWindow = new CGMZ_Window_RecipeDisplay(rect);
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.setHandler('ok', this.onDisplayOk.bind(this));
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get the display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.displayWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const height = this._listWindow.height - this.calcWindowHeight(1, false);
	const width = Graphics.boxWidth - this._listWindow.width;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create progress window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createProgressWindow = function() {
	const rect = this.progressWindowRect();
    this._progressWindow = new CGMZ_Window_RecipeProgress(rect);
	this._listWindow.setProgressWindow(this._progressWindow);
	this._displayWindow.setProgressWindow(this._progressWindow);
	this._progressWindow.setDisplayWindow(this._displayWindow);
	this._progressWindow.setListWindow(this._listWindow);
    this.addWindow(this._progressWindow);
};
//-----------------------------------------------------------------------------
// Get rectangle for progress window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.progressWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._displayWindow.y + this._displayWindow.height;
	const height = this.calcWindowHeight(1, false);
	const width = this._displayWindow.width;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create progress window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createConfirmationWindow = function() {
	const rect = this.confirmationWindowRect();
    this._confirmationWindow = new CGMZ_Window_CraftConfirmation(rect);
	this._confirmationWindow.setHandler('craft', this.onCraftConfirm.bind(this));
	this._confirmationWindow.setHandler('cancel', this.onCraftCancel.bind(this));
	this._confirmationWindow.deactivate();
	this._confirmationWindow.hide();
    this.addWindow(this._confirmationWindow);
};
//-----------------------------------------------------------------------------
// Get rectangle for progress window
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.confirmationWindowRect = function() {
	const height = this.calcWindowHeight(2, true);
	const width = Graphics.boxWidth / 4;
	const x = Graphics.boxWidth / 2 - width / 2;
	const y = Graphics.boxHeight / 2 - height / 2;
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On Display Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onDisplayCancel = function() {
	if(!this._progressWindow.isCrafting()) {
		this._displayWindow.deactivate();
		this._listWindow.activate();
	}
};
//-----------------------------------------------------------------------------
// On Display Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onDisplayOk = function() {
	if(!this._progressWindow.isCrafting()) {
		if(this._displayWindow.canCraft()) {
			if(CGMZ.Crafting.ShowConfirmationWindow) {
				this._displayWindow.deactivate();
				this._confirmationWindow.activate();
				this._confirmationWindow.show();
			} else {
				this._progressWindow.startCraft();
			}
		}
		else {
			SoundManager.playBuzzer();
		}
	}
};
//-----------------------------------------------------------------------------
// On Craft Confirmation
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onCraftConfirm = function() {
	this._displayWindow.activate();
	this._confirmationWindow.deactivate();
	this._confirmationWindow.hide();
	this._progressWindow.startCraft();
};
//-----------------------------------------------------------------------------
// On Craft Confirmation Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.onCraftCancel = function() {
	this._displayWindow.activate();
	this._confirmationWindow.deactivate();
	this._confirmationWindow.hide();
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_Crafting.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.Crafting.SceneBackgroundImage) {
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadPicture(CGMZ.Crafting.SceneBackgroundImage);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Window_RecipeList
//-----------------------------------------------------------------------------
// Selectable window for choosing a recipe in a list.
//=============================================================================
function CGMZ_Window_RecipeList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_RecipeList.prototype.constructor = CGMZ_Window_RecipeList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.initialize = function(rect, craftType) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this._craftType = craftType;
	this._data = [];
	this.refresh();
	this.select(0);
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
	if(Imported.CGMZ_Professions && $cgmzTemp._professionBuffRemoved) {
		$cgmzTemp._professionBuffRemoved = false;
		this.refresh();
		if(this.index() > this.topIndex()) this.select(this.topIndex());
	}
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.makeItemList = function() {
	let list = [];
	if(this._craftType.length === 0) {
		list = $cgmz.getAllDiscoveredRecipes();
	}
	else {
		for(const craftType of this._craftType) {
			list = list.concat($cgmz.getDiscoveredRecipesOfType(craftType));
		}
	}
	this._data = list.filter(this.includeRecipeInList);
};
//-----------------------------------------------------------------------------
// Determine if recipe should be included based on profession level
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.includeRecipeInList = function(recipe) {
	if(CGMZ.Crafting.AlwaysShowRecipes) return true;
	return recipe.meetsLevelRequirements();
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.drawItem = function(index) {
    const item = this._data[index];
    let rect = this.itemRectWithPadding(index);
	let iconBoxWidth = 0;
	if(item._iconIndex >= 0) {
		this.drawIcon(item._iconIndex, rect.x, rect.y + 4);
		iconBoxWidth = ImageManager.iconWidth + 4;
	}
	this.changePaintOpacity(item.canCraft());
    this.drawText(item._name, rect.x + iconBoxWidth, rect.y, rect.width, 'left');
	this.changePaintOpacity(1);
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set progress window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.setProgressWindow = function(progressWindow) {
    this._progressWindow = progressWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
	if(this.active && this._progressWindow) {
		this._progressWindow.setItem(this.item());
	}
};
//-----------------------------------------------------------------------------
// If refresh is requested from other window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeList.prototype.requestRefresh = function() {
    this.refresh();
};
//=============================================================================
// CGMZ_Window_RecipeDisplay
//-----------------------------------------------------------------------------
// Window displaying recipe information
//=============================================================================
function CGMZ_Window_RecipeDisplay() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_RecipeDisplay.prototype.constructor = CGMZ_Window_RecipeDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Crafting.ScrollWait, CGMZ.Crafting.ScrollSpeed, CGMZ.Crafting.AutoScroll, CGMZ.Crafting.ScrollDeceleration);
	this._recipe = null;
	this._largeIconWidth = ImageManager.iconWidth*2.2;
	this._largeIconHeight = ImageManager.iconHeight*2.2;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this.deactivate();
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
	this._iconSprite = new Sprite();
	this.addInnerChild(this._iconSprite);
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.update = function() {
    CGMZ_Window_Scrollable.prototype.update.call(this);
	if(Imported.CGMZ_Professions && this._recipe) {
		const profession = $cgmz.getProfession(this._recipe._profession);
		if(profession && profession._needRefreshForBuff) {
			this.refresh();
		}
	}
};
//-----------------------------------------------------------------------------
// Process Handling
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.processHandling = function() {
	if(!this._progressWindow || !this._progressWindow.isCrafting()) {
		CGMZ_Window_Scrollable.prototype.processHandling.call(this);
	}
    if(this.isActive()) {
		if(this.shouldProcessOk()) {
			this.processOk();
		}
    }
};
//-----------------------------------------------------------------------------
// Check if should process ok
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.shouldProcessOk = function() {
    if(!this.isOkEnabled()) {
		return false;
	}
	if(Input.isRepeated('ok')) {
		return true;
	}
	if(TouchInput.isReleased() && (this._scrollLastTouchY === TouchInput.y || !this._scroll) && (TouchInput.y >= this.y)) {
		return true;
	}
	return false;
};
//-----------------------------------------------------------------------------
// Process Ok
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.processOk = function() {
    this.updateInputData();
    this.callOkHandler();
};
//-----------------------------------------------------------------------------
// Call Ok Handler
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.callOkHandler = function() {
    this.callHandler('ok');
};
//-----------------------------------------------------------------------------
// Check if ok handling exists
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.isOkEnabled = function() {
    return this.isHandled('ok');
};
//-----------------------------------------------------------------------------
// Set progress window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.setProgressWindow = function(progressWindow) {
    this._progressWindow = progressWindow;
};
//-----------------------------------------------------------------------------
// Determine if the recipe shown can be crafted
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.canCraft = function() {
	if(this._recipe) {
		return this._recipe.canCraft();
	}
	return false;
};
//-----------------------------------------------------------------------------
// Set the recipe to be displayed (do nothing if already being displayed)
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.setItem = function(recipe) {
	if(this._recipe && this._recipe._name === recipe._name) return;
	this._recipe = recipe;
	this.setupWindowForNewEntry();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.refresh = function() {
	if(!this._recipe) return;
	this.contents.clear();
	this._iconSprite.hide();
	this._iconDisplacement = {yStart:0,yEnd:0,xStart:0,xEnd:0,isDisplaced:false};
	this._neededHeight = 0;
	if(this._recipe._image) {
		this.loadRecipeImage();
		return; // Draw the rest of the stuff after sprite is done loading
	}
	this.drawRecipeInfo();
};
//-----------------------------------------------------------------------------
// Load recipe custom image
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.loadRecipeImage = function() {
	this._iconSprite.bitmap = ImageManager.loadPicture(this._recipe._image);
	this._iconSprite.bitmap.addLoadListener(this.drawRecipeInfo.bind(this));
};
//-----------------------------------------------------------------------------
// Display recipe custom image after load
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.displayPictureBitmap = function() {
	this._iconSprite.y = this._neededHeight;
	this._iconSprite.x = 0;
	this._iconSprite.show();
	this._iconDisplacement.yStart = this._neededHeight;
	this._iconDisplacement.yEnd = this._neededHeight + this._iconSprite.height;
	this._iconDisplacement.xEnd = this._iconSprite.width + 4;
	this._iconDisplacement.isDisplaced = true;
};
//-----------------------------------------------------------------------------
// Adjust available width for icon displacement (if any)
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.adjustWidthForIconDisplacement = function(width = this.contents.width) {
	if(!this._iconDisplacement.isDisplaced) return width;
	if(this._neededHeight >= this._iconDisplacement.yStart && this._neededHeight <= this._iconDisplacement.yEnd) {
		return width - this._iconDisplacement.xEnd;
	}
	return width;
};
//-----------------------------------------------------------------------------
// Adjust starting x for icon displacement (if any)
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.adjustXForIconDisplacement = function(x = 0) {
	if(!this._iconDisplacement.isDisplaced) return x;
	if(this._neededHeight >= this._iconDisplacement.yStart && this._neededHeight <= this._iconDisplacement.yEnd) {
		return x + this._iconDisplacement.xEnd;
	}
	return x;
};
//-----------------------------------------------------------------------------
// Draw Recipe info after loading everything
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeInfo = function() {
	const recipe = this._recipe;
	const width = this.contents.width;
	for(const section of CGMZ.Crafting.DisplayWindowInfo) {
		switch(section) {
			case "Name":
				this.drawRecipeName(recipe._name);
				this._neededHeight += this.lineHeight();
				break;
			case "Image":
				if(recipe._image) {
					this.displayPictureBitmap();
				} else if(recipe._iconIndex > 0) {
					this.drawLargeIcon(recipe._iconIndex);
				}
				break;
			case "Times Crafted":
				this.drawRecipeStandardLine(CGMZ.Crafting.TimesCraftedText, recipe._timesCrafted);
				this._neededHeight += this.lineHeight();
				break;
			case "Success Rate":
				this.drawRecipeStandardLine(CGMZ.Crafting.SuccessRateText, recipe.calculateSuccessRate() + "%");
				this._neededHeight += this.lineHeight();
				break;
			case "Exp":
				if(Imported.CGMZ_Professions && $cgmz.getProfession(recipe._profession)) {
					this.drawRecipeStandardLine(CGMZ.Crafting.ExpText, recipe._experience);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Level Required":
				if(Imported.CGMZ_Professions && $cgmz.getProfession(recipe._profession)) {
					this.drawRecipeStandardLine(CGMZ.Crafting.LevelReqText, recipe._profession + " " + CGMZ.Crafting.LevelAbbrText + " " + recipe._levelRequirement);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Current Level":
				if(Imported.CGMZ_Professions && $cgmz.getProfession(recipe._profession)) {
					this.drawRecipeStandardLine(recipe._profession + " " + CGMZ.Crafting.CurrentLevelText, $cgmz.getProfession(recipe._profession).getBuffedLevel());
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Description":
				this._neededHeight += this.drawRecipeDescription(recipe._description);
				break;
			case "Products":
				this.drawRecipeItems(recipe._products, true, false); // This function handles needed height itself
				break;
			case "Tools":
				this.drawRecipeItems(recipe._tools, false, false); // This function handles needed height itself
				break;
			case "Ingredients":
				this.drawRecipeItems(recipe._ingredients, false, true); // This function handles needed height itself
				break;
			case "Fail Products":
				this.drawRecipeItems(recipe._failProducts, true, false); // This function handles needed height itself
				break;
			case "Info Header":
				this.CGMZ_drawHeader(CGMZ.Crafting.InfoHeaderText, this._neededHeight);
				this._neededHeight += this.lineHeight();
				break;
			case "Description Header":
				this.CGMZ_drawHeader(CGMZ.Crafting.DescHeaderText, this._neededHeight);
				this._neededHeight += this.lineHeight();
				break;
			case "Product Header":
				if(recipe._products.length > 0) {
					this.CGMZ_drawHeader(CGMZ.Crafting.ProductHeaderText, this._neededHeight);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Tool Header":
				if(recipe._tools.length > 0) {
					this.CGMZ_drawHeader(CGMZ.Crafting.ToolHeaderText, this._neededHeight);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Ingredient Header":
				if(recipe._ingredients.length > 0) {
					this.CGMZ_drawHeader(CGMZ.Crafting.IngredientHeaderText, this._neededHeight);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Fail Product Header":
				if(recipe._failProducts.length > 0) {
					this.CGMZ_drawHeader(CGMZ.Crafting.FailProductHeaderText, this._neededHeight);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Blank Line":
				this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Name of recipe
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeName = function(name) {
	this.contents.fontBold = true;
	this.drawText(name, 0, this._neededHeight, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draw recipe description - returns height needed for description
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeDescription = function(description) {
	return this.CGMZ_drawText(description, 0, 0, this._neededHeight, this.contents.width, CGMZ.Crafting.DescriptionAlignment);
};
//-----------------------------------------------------------------------------
// Draws a standard line
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeStandardLine = function(descriptor1, descriptor2) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const totalString = '\\c[' + CGMZ.Crafting.LabelColor + ']' + descriptor1 + '\\c[0]' + descriptor2;
	this.CGMZ_drawTextLine(totalString, x, this._neededHeight, width, 'left');
};
//-----------------------------------------------------------------------------
// Draw large icon
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawLargeIcon = function(iconIndex) {
	const bitmap = this._iconBitmap;
	const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = iconIndex % 16 * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
	const dw = this._largeIconWidth;
	const dh = this._largeIconHeight;
	const x = 0;
	const y = this._neededHeight;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
	this._iconDisplacement.yStart = this._neededHeight;
	this._iconDisplacement.yEnd = this._neededHeight + this._largeIconHeight;
	this._iconDisplacement.xEnd = this._largeIconWidth + 4;
	this._iconDisplacement.isDisplaced = true;
};
//-----------------------------------------------------------------------------
// Draw regular icon
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawIcon = function(iconIndex, x, y) {
    const bitmap = this._iconBitmap;
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = iconIndex % 16 * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
//-----------------------------------------------------------------------------
// Draw Item Lists
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeDisplay.prototype.drawRecipeItems = function(itemArray, product, showAmount) {
	if(itemArray.length === 0) return;
	for(let i = 0; i < itemArray.length; i++) {
		if(itemArray[i].Type === 'currency') {
			const currentSupply = $gameParty.gold();
			const amount = itemArray[i].Amount + TextManager.currencyUnit;
			this.changePaintOpacity(product || itemArray[i].Amount <= currentSupply);
			let currentAmount = "";
			if(showAmount && CGMZ.Crafting.ShowIngredientAmount) {
				currentAmount = " (" + currentSupply + ")";
			}
			const string = amount + currentAmount;
			this.CGMZ_drawText(string, 0, 0, this._neededHeight, this.contents.width, 'center');
			this._neededHeight += this.lineHeight();
		} else if(itemArray[i].Type === 'generic') {
			const currentSupply = this._recipe.calculateTotalNumItemsOfGenericType(itemArray[i].GenericCategory);
			this.changePaintOpacity(itemArray[i].Amount <= currentSupply);
			let currentAmount = "";
			if(showAmount && CGMZ.Crafting.ShowIngredientAmount) {
				currentAmount = " (" + currentSupply + ")";
			}
			const itemData = $cgmzTemp.getGenericCraftingItem(itemArray[i].GenericCategory);
			let string = (itemData._iconIndex) ? '\\i[' + itemData._iconIndex + '] ' : "";
			string += (itemData._name + currentAmount);
			this.CGMZ_drawText(string, 0, 0, this._neededHeight, this.contents.width, 'center');
			this._neededHeight += this.lineHeight();
		} else {
			const item = $cgmzTemp.lookupItem(itemArray[i].Type, itemArray[i].ID);
			if(item) {
				const currentSupply = $gameParty.numItems(item);
				const amount = itemArray[i].Amount + "x ";
				const name = item.name;
				const iconIndex = item.iconIndex;
				this.changePaintOpacity(product || itemArray[i].Amount <= currentSupply);
				let currentAmount = "";
				if(showAmount && CGMZ.Crafting.ShowIngredientAmount) {
					currentAmount = " (" + currentSupply + ")";
				}
				const string = amount + "\\i[" + iconIndex + "]" + name + currentAmount;
				this.CGMZ_drawText(string, 0, 0, this._neededHeight, this.contents.width, 'center');
				this._neededHeight += this.lineHeight();
			}
		}
	}
	this.changePaintOpacity(true);
};
//=============================================================================
// CGMZ_Window_RecipeProgress
//-----------------------------------------------------------------------------
// Window displaying crafting progress
//=============================================================================
function CGMZ_Window_RecipeProgress() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_RecipeProgress.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_RecipeProgress.prototype.constructor = CGMZ_Window_RecipeProgress;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this._recipe = null;
	this._isCrafting = false;
	this._timeCrafting = 0;
	this._craftingSuccess = null;
	this._justFinishedCraft = false;
	this._requestPopScene = false;
	this._professionLevel = 0;
	this.refresh(0);
	this.setBackgroundType(2 * (CGMZ.Crafting.WindowTransparency));
};
//-----------------------------------------------------------------------------
// Determine if the crafting scene should pop after level up
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.isPopRequested = function() {
	return this._requestPopScene;
};
//-----------------------------------------------------------------------------
// Determine if the recipe can be crafted still
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.canCraft = function() {
	if(this._recipe) {
		return this._recipe.canCraft();
	}
	return false;
};
//-----------------------------------------------------------------------------
// Determine if crafting is currently taking place
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.isCrafting = function() {
	return this._isCrafting;
};
//-----------------------------------------------------------------------------
// Determine if crafting just finished
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.justFinishedCrafting = function() {
	return this._justFinishedCraft;
};
//-----------------------------------------------------------------------------
// Start the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.startCraft = function() {
	if(this._recipe) {
		this._timeCrafting = 0;
		AudioManager.playStaticSe(this._recipe._craftSE);
		if(Imported.CGMZ_Professions && CGMZ.Crafting.PopSceneOnLevel) {
			const profession = $cgmz.getProfession(this._recipe._profession);
			if(profession) {
				this._professionLevel = profession._level;
			}
		}
		if(this._recipe.calculateSuccessRate()/100.0 > Math.random()) {
			this._craftingSuccess = true;
			this._timeNeededForCraft = this._recipe._time;
		}
		else {
			this._craftingSuccess = false;
			this._timeNeededForCraft = Math.max(Math.random()*this._recipe._time, this._recipe._time/2);
		}
		this._justFinishedCraft = false;
		this._recipe.doCraft(this._craftingSuccess);
		this._isCrafting = true;
	}
};
//-----------------------------------------------------------------------------
// Stop the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.stopCraft = function() {
	this._timeCrafting = 0;
	this._isCrafting = false;
	this._justFinishedCraft = true;
	this.checkOtherWindowsForRefresh();
	this.refresh(0);
	const se = (this._craftingSuccess) ? this._recipe._successSE : this._recipe._failSE;
	AudioManager.playSe(se);
	if(Imported.CGMZ_Professions && CGMZ.Crafting.PopSceneOnLevel) {
		const profession = $cgmz.getProfession(this._recipe._profession);
		if(profession && profession._level > this._professionLevel) {
			this._requestPopScene = true;
		}
	}
};
//-----------------------------------------------------------------------------
// Update the crafting process
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if(this.isCrafting()) {
		this._timeCrafting++;
		this.refresh(this._timeCrafting/this._recipe._time);
		if(this._timeCrafting >= this._timeNeededForCraft){
			this.stopCraft();
		}
	}
	else if(this.justFinishedCrafting()) {
		this._timeCrafting++;
		if(this._timeCrafting >= 60){
			this._timeCrafting = 0;
			this._justFinishedCraft = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Set the recipe to be displayed
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.setItem = function(recipe) {
	this._recipe = recipe;
	this.refresh(0);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.refresh = function(rate) {
	this.contents.clear();
	const width = this.contents.width;
	if(this.justFinishedCrafting()) {
		if(this._craftingSuccess) {
			var descriptor = CGMZ.Crafting.SuccessText;
			var color = ColorManager.textColor(CGMZ.Crafting.SuccessColor);
		}
		else {
			var descriptor = CGMZ.Crafting.FailureText;
			var color = ColorManager.textColor(CGMZ.Crafting.FailureColor);
		}
		this.changeTextColor(color);
		this.drawText(descriptor, 0, 0, width, 'center');
		this.changeTextColor(ColorManager.normalColor());
	}
	else {
		this.changeTextColor(ColorManager.systemColor());
		var descriptor = CGMZ.Crafting.ProgressText;
		this.drawText(descriptor, 0, 0, width, 'left');
		this.changeTextColor(ColorManager.normalColor());
		var color1 = ColorManager.textColor(CGMZ.Crafting.ProgressColor1);
		var color2 = ColorManager.textColor(CGMZ.Crafting.ProgressColor2);
		var x = this.textWidth(descriptor);
		let rect = new Rectangle(x, 0, width-x, this.lineHeight());
		this.CGMZ_drawGauge(rect, rate, color1, color2);
		if(CGMZ.Crafting.ShowProgressPercentage) {
			this.drawText((rate*100).toFixed(2) + " %", x, 0, width-x, 'center');
		}
	}
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
};
//-----------------------------------------------------------------------------
// Set list window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.setListWindow = function(listWindow) {
    this._listWindow = listWindow;
};
//-----------------------------------------------------------------------------
// Set list window
//-----------------------------------------------------------------------------
CGMZ_Window_RecipeProgress.prototype.checkOtherWindowsForRefresh = function() {
    if(this._listWindow) this._listWindow.requestRefresh();
	if(this._displayWindow) this._displayWindow.requestRefresh();
};
//=============================================================================
// CGMZ_Window_CraftConfirmation
//-----------------------------------------------------------------------------
// Handle CGMZ Recipe Toasts
//=============================================================================
function CGMZ_Window_CraftConfirmation() {
    this.initialize(...arguments);
}
CGMZ_Window_CraftConfirmation.prototype = Object.create(Window_Command.prototype);
CGMZ_Window_CraftConfirmation.prototype.constructor = CGMZ_Window_CraftConfirmation;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
	this._waitTime = 10;
};
//-----------------------------------------------------------------------------
// Add commands
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.makeCommandList = function() {
	this.addCommand(CGMZ.Crafting.CraftConfirmText, "craft", true);
	this.addCommand(CGMZ.Crafting.CraftCancelText, "cancel", true);
};
//-----------------------------------------------------------------------------
// Add a wait period before being active after show
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.show = function() {
	Window_Command.prototype.show.call(this);
	this._waitTime = 5;
};
//-----------------------------------------------------------------------------
// Only allow OK trigger after wait time is over to prevent instant selection
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.isOkTriggered = function() {
	const triggered = Window_Command.prototype.isOkTriggered.call(this);
    return triggered && this._waitTime <= 0;
};
//-----------------------------------------------------------------------------
// Determine if OK is actually triggered
//-----------------------------------------------------------------------------
CGMZ_Window_CraftConfirmation.prototype.update = function() {
	Window_Command.prototype.update.call(this);
    this._waitTime--;
	if(this._waitTime < 0) this._waitTime = 0;
};
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMZ Recipe Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Processing for custom toasts. Alias
//-----------------------------------------------------------------------------
if(Imported.CGMZ_ToastManager) {
const alias_CGMZ_Crafting_processCustomToast = CGMZ_Window_Toast.prototype.processCustomToast;
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMZ_Crafting_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMZRecipeToast')) {
		this.drawText(CGMZ.Crafting.ToastText, 0, 0, this.contents.width, 'center');
		this.drawText(toastObject.name, 0, this.lineHeight(), this.contents.width, 'center');
	}
};
}
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Use recipe item processing
//=============================================================================
//-----------------------------------------------------------------------------
// Item use may cause learning of a recipe
//-----------------------------------------------------------------------------
const alias_CGMZ_Crafting_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	alias_CGMZ_Crafting_useItem.call(this, item);
	if (DataManager.isItem(item)) {
        $cgmz.checkItemForRecipe(item);
    }
};