//=============================================================================
// DamagePatch.js
//=============================================================================

/*:
 * @plugindesc Diplay patch on enemy sprite. Version 1.03
 * @author suppon
 *
 * @param Default patch number
 * @desc The amount number of default patch.
 * @default 20
 *
 * @param Default patch size
 * @desc The amount number(floating point number) of default patch.
 * @default 1.0
 *
 * @help Don't forget copy "Patch.png" to " project/img/system/" folder.
 * This plugin does not provide plugin commands.
 * When you want to set patch number individuallity.
 * Enter a tag in Enemy Note as follows.
 *
 *   <patchNumber:100> 
 *
 * If you want to set patch size individuallity.
 * Enter a tag in Enemy Note as follows.(Enter as a floating point number)
 * 
 *   <patchSize:1.5>
 *
 *
 *
 *
 *
 *
 */

/*:ja
 * @plugindesc エネミースプライトにダメージパッチを表示します。
 * @author Suppon
 *
 * @param Default patch number
 * @desc デフォルトのパッチ数
 * @default 20
 *
 * @param Default patch size
 * @desc デフォルトのパッチサイズ(小数でいれてください。)
 * @default 1.0
 *
 * @help "Patch.png"というファイルを "project/img/system/"フォルダーにコピーしてください。
 * このプラグインには、プラグインコマンドはありません。
 * エネミーごとにパッチの数を設定したい場合は、以下のようにEnemy Noteに入力してください。
 * <patchNumber:100> 
 * エネミーごとにパッチサイズを変更したいときは以下のようにEnemy Noteに入力してください。
 * <patchSize:1.5>
 *
 */

(function() {
    
    var parameters = PluginManager.parameters('DamagePatch');
    var defaultPatchNumber = Number(parameters['Default patch number'] || 20);
    var defaultPatchSize = Number(parameters['Default patch size'] || 1.0);

    var _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function(){
        _Sprite_Battler_initMembers.call(this);
        this._patchSprites = [];
        this._updatedBitmap = false;
    }
    
    Sprite_Battler.prototype.makePatchSprite = function(){
        var bitmap = new Bitmap();
        bitmap = ImageManager.loadSystem('Patch', 0);
        var sprite = new Sprite(bitmap);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        //sprite.scale.x = 0.5;
        //sprite.scale.y = 0.5;
        return sprite;
    }
    
    var _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
    Sprite_Enemy.prototype.loadBitmap = function(name, hue){
        _Sprite_Enemy_loadBitmap.call(this, name, hue);
        this._updatedBitmap = true;
    }
    
    var _Sprite_Enemy_updateMain = Sprite_Enemy.prototype.updateMain;
    Sprite_Enemy.prototype.updateMain = function(){
        _Sprite_Enemy_updateMain.call(this);
        if (this._updatedBitmap){
            this.makePatchSprites();
        } 
        if (this._battler._refreshPatchRequested){
            this.refreshPatch();
        }
    }
    
    Sprite_Enemy.prototype.makePatchSprites = function(){
        if(this.bitmap.width == 0){return};
        var n = defaultPatchNumber;
        var size = defaultPatchSize;
        if (this._battler.enemy().meta.patchNumber){
            n = this._battler.enemy().meta.patchNumber;
        }
        if (this._battler.enemy().meta.patchSize){
            size = this._battler.enemy().meta.patchSize;
        }
        for (var i=0; i<n; i++){
            for (var j=0; j<100; j++){
                var x = Math.randomInt(this.bitmap.width);
                var y = Math.randomInt(this.bitmap.height);
                if (this.bitmap.getAlphaPixel(x, y) > 200){
                    var sprite = this.makePatchSprite();
                    sprite.x = x - this.bitmap.width/2;
                    sprite.y = y - this.bitmap.height;
                    sprite.scale.x = 0.5 * size;
                    sprite.scale.y = 0.5 * size;
                    sprite.visible = false;
                    this._patchSprites.push(sprite);
                    this.addChild(sprite);
                    break;
                }
            }
        }
        this._updatedBitmap = false;
    }
    
    Sprite_Enemy.prototype.refreshPatch = function(){
        var hp = this._battler.hp;
        var mhp = this._battler.mhp;
        var patchNum = Math.floor(((mhp-hp)/mhp)*this._patchSprites.length);
        for (var i=0; i<this._patchSprites.length; i++){
            this._patchSprites[i].visible = i < patchNum;
        }
    }
    
    var _Sprite_Enemy_setupDagamePopup = Sprite_Enemy.prototype.setupDamagePopup;
    Sprite_Enemy.prototype.setupDamagePopup = function(){
        if(this._battler.isDamagePopupRequested()){
            this.refreshPatch();
        }
        _Sprite_Enemy_setupDagamePopup.call(this);
    }
})();
