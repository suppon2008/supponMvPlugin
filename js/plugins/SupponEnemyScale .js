//=============================================================================
// SupponEnemyScale.js
//=============================================================================

/*:
 * @plugindesc Add enemy motion. Version 1.00
 * @author Suppon
 * @help This plugin does not provide plugin commands.
 * Enter tag in enemy note field such as <scale:0.5>
 */

(function() {
    
    var _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
    Sprite_Enemy.prototype.initialize = function(battler) {
        _Sprite_Enemy_initialize.call(this, battler);
        var scale = this._battler.enemy().meta.scale;
        if (scale){
            this.scale.x = scale;
            this.scale.y = scale;
        } 
    };
    
})();