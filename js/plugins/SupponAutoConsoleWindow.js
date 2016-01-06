//=============================================================================
// SupponAutoConsoleWindow.js
//=============================================================================

/*:
 * @plugindesc Auto console window. Version 1.00
 * @author Suppon
 *
 * @param Use specific position
 * @desc If you want to set specific window coodinates, enter true.
 * @default false
 * 
 * @param game window X
 * @desc X coodinate of game window.
 * @default 0
 *
 * @param game window Y
 * @desc Y coodinate of game window.
 * @default 0
 *
 * @param console window X
 * @desc X coodinate of console window.
 * @default 900
 *
 * @param console window Y
 * @desc Y coodinate of console window.
 * @default 0
 *
 * @help Turn off this plugin before uploading game file.
 *   
 */

/*:ja
 * @plugindesc コンソールウインドウ自動起動プラグイン。 Version 1.00
 * @author Suppon
 *
 * @param Use specific position
 * @desc 自分で表示位置を設定したい場合は、trueと入れてください。
 * @default false
 * 
 * @param game window X
 * @desc X coodinate of game window.
 * @default 0
 *
 * @param game window Y
 * @desc Y coodinate of game window.
 * @default 0
 *
 * @param console window X
 * @desc X coodinate of console window.
 * @default 900
 *
 * @param console window Y
 * @desc Y coodinate of console window.
 * @default 0
 *
 * @help 完成ゲームをアップロードするときは必ずこのプラグインをOFFにしてください。
 */

(function() {
    var parameters = PluginManager.parameters('SupponAutoConsoleWindow');
    var UseSpecificPosition = parameters['Use specific position'] === 'true';
    
    var _Scene_Boot_initialize = Scene_Boot.prototype.initialize;
    Scene_Boot.prototype.initialize = function() {
        _Scene_Boot_initialize.call(this);
        
        var gameWindowX = 10;
        var gameWindowY = screen.height/2 - Graphics.height/2;
        var consoleWindowX = Graphics.width+20;
        var consoleWindowY = screen.height/2-Graphics.height/2;
        if(UseSpecificPosition){
            var gameWindowX = Number(parameters['game window X'] || 0);
            var gameWindowY = Number(parameters['game window Y'] || 0);
            var consoleWindowX = Number(parameters['console window X'] || 900);
            var consoleWindowY = Number(parameters['console window Y'] || 0);
        }
        
        window.moveTo(gameWindowX, gameWindowY);
        require('nw.gui').Window.get().showDevTools().moveTo(consoleWindowX, consoleWindowY);
        window.focus();
    };
})();