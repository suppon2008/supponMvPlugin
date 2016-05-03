//=============================================================================
// SupponRussianRoulette.js
//=============================================================================

/*:
 * @plugindesc ロシアンルーレットプラグイン. Version 1.00
 * @author Suppon
 *
 * @param Roulette Speed
 * @desc ルーレットの速さです。1以上の数字を入れてください。1が最速です。
 * @default 10
 * 
 * @param Randomize of Roulette
 * @desc ルーレットのランダム化。有効にする場合はtrueにしてください。
 * @default false
 *
 *
 * @help 全ての選択ウインドウがロシアンルーレットと化します。当たるとリセットされます。
 *   
 */

(function() {
    var parameters = PluginManager.parameters('SupponRussianRoulette');
    var UseRandmizedRoulette = parameters['Randomize of Roulette'] === 'true';
    var RouletteSpeed = Number(parameters['Roulette Speed']||5)
    
    var _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
    Window_Selectable.prototype.initialize = function(x, y, width, height) {
      _Window_Selectable_initialize.call(this, x, y, width, height);
        this.makeResetBitmap();
        this._resetIndex = -1;
    };
    
    Window_Selectable.prototype.makeResetBitmap = function(){
        var bitmap = new Bitmap(1, 1);
        var rect = this.itemRect(0);
        bitmap.resize(rect.width, rect.height);
        bitmap.fillAll('#FF0000');
        var icons = ImageManager.loadSystem('IconSet');
        bitmap.blt(icons, 32, 0, 32, 32, rect.width/2 - 40 - 32, rect.height/2 - 16);
        bitmap.blt(icons, 32, 0, 32, 32, rect.width/2 + 40     , rect.height/2 - 16);
        bitmap.drawText('Reset',0,0,bitmap.width, bitmap.height, 'center');
        this._resetBitmap = bitmap;
    }
    var _Window_Selectable_update = Window_Selectable.prototype.update;
    Window_Selectable.prototype.update = function(){
        if (Graphics.frameCount % RouletteSpeed == 0 && this.maxItems() > 1){
            this.updateRoulette();
        }
        _Window_Selectable_update.call(this);
    }
    
    Window_Selectable.prototype.updateRoulette = function(){
        this.redrawItem(this._resetIndex);
        if(UseRandmizedRoulette){
            this._resetIndex = Math.randomInt(this.maxItems());
        } else {
            this._resetIndex = (this._resetIndex+1) % this.maxItems();
        }
        var rect = this.itemRect(this._resetIndex);
        this.contents.blt(this._resetBitmap, 0, 0, rect.width, rect.height, rect.x, rect.y);
    }
    
    var _Window_Selectable_processOk = Window_Selectable.prototype.processOk;
    Window_Selectable.prototype.processOk = function() {
        if (this._index == this._resetIndex){
            this.playBuzzerSound();
            this.rouletteHit();
        }
        _Window_Selectable_processOk.call(this);
    };
    
    Window_Selectable.prototype.rouletteHit = function(){
        if (Utils.isNwjs()) {
            this.playBuzzerSound();
            location.reload();
        }
    }
})();