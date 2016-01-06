//=============================================================================
// SupponActionSkip.js
//=============================================================================

/*:
 * @plugindesc ActionSkip in battle. Version 1.01
 * @author Suppon
 *
 * @param Trigger Switch ID
 * @desc Trigger Switch ID number. This work always when it set 0. 
 * @default 0 
 *
 * @help
 * It work when Trigger Switch is ON and 'OK'key is pressed long.
 * If you don't set Trigger Switch, leave the Parameter box blank.
 * This plugin has no plugin command.
 */

/*:ja
 * @plugindesc 戦闘中のアクションを高速スキップします。
 * @author Suppon
 *
 * @param Trigger Switch ID
 * @desc トリガーとなるスイッチのIDです。 0にすると常に作動します。
 * @default 0 
 * 
 * @help
 * トリガースイッチがONの時に'OK'キーを押しっぱなしにすると作動します。
 * トリガースイッチを設定しない場合は、Parameter boxを0にしてください。
 * このプラグインにはプラグインコマンドはありません。
 *
 * 
 */
(function() {
    
    var parameters = PluginManager.parameters('SupponActionSkip');
    var switchId = Number(parameters['Trigger Switch ID']);
    
    IsActionSkipOn = function(){
        if (switchId == 0){return true};
        return $gameSwitches.value(switchId);
    }
    
    var _Window_BattleLog_isBusy = Window_BattleLog.prototype.isBusy
    Window_BattleLog.prototype.isBusy = function() {
        if (this.isFastForward() && IsActionSkipOn()) {return false}
        _Window_BattleLog_isBusy.call(this);
    };
    
    var _Window_BattleLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function() {
        if (this.isFastForward() && IsActionSkipOn()) {
        this.callNextMethod();
        this.callNextMethod();
        this.callNextMethod();
        this.callNextMethod();
        } else {
            _Window_BattleLog_update.call(this);
        }
    };
    
    BattleManager.isBusy = function() {
    return ($gameMessage.isBusy() || 
            (!(this._logWindow.isFastForward() && IsActionSkipOn()) &&
            this._spriteset.isBusy()) ||
            this._logWindow.isBusy());
    };
    
    var _BattleManager_endTurn = BattleManager.endTurn;
    BattleManager.endTurn = function() {
        if (this._logWindow._methods.length > 0) {
            return};
        _BattleManager_endTurn.call(this);
    };
    
    var _BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function() {
        if (this._logWindow._methods.length > 0) {
            return false};
        _BattleManager_checkBattleEnd.call(this);
    };
    
    var _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function() {
        if (this._logWindow._methods.length > 0) {return false};
        if($gameMessage.isBusy()){return};
        _BattleManager_updateBattleEnd.call(this);
    };
})();