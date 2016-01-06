//=============================================================================
// SupponEnemyMotion.js
//=============================================================================

/*:
 * @plugindesc Add enemy motion. Version 1.00
 * @author Suppon
 */

(function() {
    
    var _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);
        this._t = Math.randomInt(720);
    };
    
    var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        if (this._enemy) {
            if (this._battler.canMove()&&(Graphics.frameCount%7==0)){
                this.updateMotion();
            }
        }
    };
    
    Sprite_Enemy.prototype.updateMotion = function(){
        var t = Graphics.frameCount + this._t;
        this._offsetX = Math.sin(Math.PI * t*2/360)*10;
        this._offsetY = Math.sin(Math.PI * t*1/360)*4;
    }
})();