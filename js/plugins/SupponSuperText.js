//=============================================================================
// SupponSuperText.js
//=============================================================================

/*:
 * @plugindesc SupponSuperText. Version 1.00
 * @author suppon

 */

(function() {
    
    var parameters = PluginManager.parameters('DamagePatch');
    
    var _Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _Window_Base_initialize.call(this, x ,y, width, height);
        this._spriteForSST = new Sprite();
        this.addChild(this._spriteForSST);
    };
    
    Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
        if(align == 'center' || align == 'right'){
            this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
        } else {
            this.drawTextEx(text, x, y);
        }
        
    };
    
    Window_Base.prototype.processNormalCharacter = function(textState) {
        var c = textState.text[textState.index++];
        var w = this.textWidth(c);
        var bitmap = new Bitmap(50, 50);
        bitmap.drawText(c, 0, 0, w*2, textState.height);
        var sprite = new Sprite();
        //bitmap.resize(w, textState.height);
        sprite.bitmap = bitmap;
        sprite.width = w;
        sprite.height = textState.height;
        sprite.anchor = new Point(0.5, 0.5);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.filters = [new PIXI.PixelateFilter()]
        
        //this._spriteForSST.addChild(sprite);
        
        SceneManager._scene.addChild(sprite);
        var padding = this.standardPadding() + this.textPadding()*3;
        sprite.x = textState.x + padding;
        sprite.y = textState.y + padding;
        //this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
        textState.x += w;
    };
    
//    var _Window_Message_initMembers = Window_Message.prototype.initMembers;
//    Window_Message.prototype.initMembers = function() {
//        _Window_Message_initMembers.call(this);
//        this._spriteForSST.children = [];
//    };
    
    Window_Message.prototype.terminateMessage = function() {
        this._spriteForSST.children = [];
        this.close();
        this._goldWindow.close();
        $gameMessage.clear();
    };
    
    function Sprite_SST() {
        this.initialize.apply(this, arguments);
    }

//    Sprite_SST.prototype = Object.create(Sprite.prototype);
//    Sprite_SST.prototype.constructor = Sprite_SST;
//    
//    Sprite_SST.prototype.initialize = function() {
//        Sprite.prototype.initialize.call(this);
//        //this._t = Math.random()*5;
//        //this._rSpeed = 0.1*Math.sin(Math.random()*5);
//        //var filter = new PIXI.PixelateFilter();
//        this.filters = [new PIXI.PixelateFilter()];
//    };
    
//    Sprite_SST.prototype.update = function(){
//        Sprite.prototype.update.call(this);
//        var s = 1+0.5*(Math.sin(this._t));
//        this.scale.x = 1+0.5*(Math.sin(this._t));
//        this.scale.y = 1+0.5*(Math.sin(this._t*1.2));
//        this._t += 0.08;
//        this.rotation += this._rSpeed;
//    }
    
//    Scene_Title.prototype.createBackground = function() {
//        this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
//        this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
//        this._backSprite1.filters =[new PIXI.PixelateFilter()];
//        this.addChild(this._backSprite1);
//        this.addChild(this._backSprite2);
//    };

})();
