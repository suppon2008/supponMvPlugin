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
    
//    var _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
//    Sprite_Enemy.prototype.initialize = function(battler) {
//        _Sprite_Enemy_initialize.call(this, battler);
//        this.changeScale();
//        this.changeTone();
//    };
    var _Sprite_Enemy_prototype_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_prototype_initMembers.call(this);
        this._skinBitmap = null;
        this._skinIsReady = false;
    };
    
    var _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
    Sprite_Enemy.prototype.loadBitmap = function(name, hue) {
        _Sprite_Enemy_loadBitmap.call(this, name, hue);
        this.changeScale();
        this.changeTone();
        if (this.skin()){
            this._skinBitmap = ImageManager.loadSvEnemy(this.skin(), 0);
            
        }
    };
    //this._loadingState === 'loaded' this._loadingState === 'none'
    
    Sprite_Enemy.prototype.skin = function(){
        return this._battler.enemy().meta.skin;
    }
    
    var _Sprite_Enemy_prototype_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        _Sprite_Enemy_prototype_updateBitmap.call(this);
        if (this.skin() && !this._skinIsReady) {
            if (this._skinBitmap.isReady() && this.bitmap.isReady()){
                var skinBitmap = this._skinBitmap;
                this.bitmap.blt(skinBitmap, 0,0,skinBitmap.width,skinBitmap.height,0,0,skinBitmap.width,skinBitmap.height);
                this._skinIsReady = true;
            }
        }
    };
    
    Sprite_Enemy.prototype.changeScale = function(){
        var scale = this._battler.enemy().meta.scale;
        if (scale){
            this.scale.x = scale;
            this.scale.y = scale;
        }
    }
    
    Sprite_Animation.prototype.updatePosition = function() {
        if (this._animation.position === 3) {
            this.x = this.parent.width / 2;
            this.y = this.parent.height / 2;
        } else {
            var parent = this._target.parent;
            var grandparent = parent ? parent.parent : null;
            this.x = this._target.x;
            this.y = this._target.y;
            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= this._target.height * this._target.scale.y;
            } else if (this._animation.position === 1) {
                this.y -= this._target.height * this._target.scale.y / 2;
            }
        }
    };
    
    Sprite_Enemy.prototype.changeTone = function(){
        var colorTone = this._battler.enemy().meta.colorTone;
        if (colorTone){
            this.setColorTone(eval(colorTone));
        }
    }
    
    var _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character){
        _Sprite_Character_initialize.call(this, character);
        if(character.constructor === Game_Event){
            var scale = character.event().meta.scale;
            if(scale){
                this.scale.x = scale;
                this.scale.y = scale;
            }
        }
    }
})();