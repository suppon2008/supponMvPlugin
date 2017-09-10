//=============================================================================
// SupponInstantWindow.js
//=============================================================================

/*:
 * @plugindesc Instant scene. Version 1.00
 * @author Suppon
 */

//(function() {
//test001 = function(){
//    var items = [
//        'abc',
//        'def',
//        'h',
//        'spovaisdfsadfasfdasdfsafjwa',
//        '\\V[1]'
//    ];
//    var obj = {items:items, 
//               variableId:1, 
//               caption:'this is caption', 
//              };
//    var w = new Window_InstantCommand(obj);
//}

function Window_InstantCommand() {
    this.initialize.apply(this, arguments);
}

Window_InstantCommand.prototype = Object.create(Window_Selectable.prototype);
Window_InstantCommand.prototype.constructor = Window_InstantCommand;

Window_InstantCommand.prototype.initialize = function(obj) {
    this._items = obj.items;
    this._variableId = obj.variableId;
    this._caption = obj.caption;
    if (obj.enabledList){
        this._enabledList = obj.enabledList;
    } else {
        var el = []
        for(var i = 0; i<this._items.length; i++){
            el.push(true);
        }
        this._enabledList = el;
    }
    //this._enabledList = obj.enabledList;
    this._lastWindow = [];
    this.deactivateOtherWindows();
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.x = Graphics.width / 2 - this.width / 2;
    this.y = Graphics.height / 2 - this.height / 2;
    this.openness = 0;
    this.open();
    this.refresh();
    this.select(0);
    this.activate();
    SceneManager._scene._windowLayer.addChild(this);
    SceneManager._scene._active = false;
    this.makeCaptionSprite();
    //this.makeBackSprite();
};

Window_InstantCommand.prototype.deactivateOtherWindows = function(){
    SceneManager._scene._windowLayer.children.forEach(function(w){
        if (w.active){
            w.deactivate();
            this._lastWindow.push(w);
        }
    },this)
}

Window_InstantCommand.prototype.makeCaptionSprite = function(){    
    this._captionSprite = new Sprite_Caption(this._caption, this.y);
    SceneManager._scene.addChild(this._captionSprite);
}
//    Window_InstantCommand.prototype.makeBackSprite = function() {
//        this._backSprite = new Sprite();
//        this._backSprite.bitmap = SceneManager.snap();
//        this._backSprite.bitmap.blur();
//        SceneManager._scene._active = false;
//        SceneManager._scene._windowLayer.addChild(this._backSprite);
//        SceneManager._scene._windowLayer.addChild(this);
//    };

Window_InstantCommand.prototype.windowWidth = function() {
    return this.resizeWidth();
};

Window_InstantCommand.prototype.windowHeight = function() {
    var height = this.fittingHeight(this.numVisibleRows());
    return height.clamp(height, Math.ceil(Graphics.height*2/3));
};

Window_InstantCommand.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};

Window_InstantCommand.prototype.maxItems = function() {
    return this._items.length;
};

Window_InstantCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    var text = this._items[index];
    text = this.convertEscapeCharacters(text);
    this.changePaintOpacity(this._enabledList[index]);
    this.drawText(text, rect.x, rect.y, rect.width, align);
};

Window_InstantCommand.prototype.resizeWidth = function() {
    var width = 1;
    var bitmap = new Bitmap(1, 1);
    this._items.forEach(function(obj){
        var string = this.convertEscapeCharacters(obj);
        var textWidth = bitmap.measureTextWidth(string);
        textWidth += (this.standardPadding()*2 + this.textPadding()*2);
        if(width < textWidth){
            width = textWidth;
        }
    },this);
    return width;
};

Window_InstantCommand.prototype.itemTextAlign = function() {
    return 'left';
};

Window_InstantCommand.prototype.isOkEnabled = function() {
    return true;//this.isHandled('ok');
    //if (!this._enabledList){return true};
    //return this._enabledList[this.index()];
};

Window_InstantCommand.prototype.isCancelEnabled = function() {
    return true;//this.isHandled('cancel');
};
Window_InstantCommand.prototype.isTouchOkEnabled = function() {
    //return true;//this.isOkEnabled();
    return this.isOkEnabled();
};

Window_InstantCommand.prototype.isCurrentItemEnabled = function() {
    if (!this._enabledList){return true};
    return this._enabledList[this.index()];
};

Window_InstantCommand.prototype.callOkHandler = function() {
    var value = this._index + 1;
    if(this._variableId){
        $gameVariables.setValue(this._variableId, value);
    }
    this.dispose();
    Window_Selectable.prototype.callOkHandler.call(this);
};

Window_InstantCommand.prototype.callCancelHandler = function() {
    if(this._variableId){
        $gameVariables.setValue(this._variableId, 0);
    }
    Window_Selectable.prototype.callCancelHandler.call(this);
    this.dispose();
};

Window_InstantCommand.prototype.dispose = function(){
//        if(this._lastWindow){
//            this._lastWindow.activate();
//        }
    this._captionSprite.startDispose();
    this._lastWindow.forEach(function(w){
        w.activate();
    })
    //this.parent.removeChild(this._backSprite);
    //this.parent.removeChild(this);
    this.close();
    SceneManager._scene._active = true;
}

function Sprite_Caption() {
    this.initialize.apply(this, arguments);
}

Sprite_Caption.prototype = Object.create(Sprite.prototype);
Sprite_Caption.prototype.constructor = Sprite_Caption;

Sprite_Caption.prototype.initialize = function(string, y) {
    var bitmap = new Bitmap(1, 1);
    var width = Graphics.width;
    var height = bitmap.fontSize+8;
    bitmap.resize(width, height);
    bitmap.outlineColor = 'rgba(0, 0, 0, 1)';
    bitmap.outlineWidth = 6;
    bitmap.drawText(string, 0, 0, width, height, 'center');
    Sprite.prototype.initialize.call(this,bitmap);
    this._baseY = y - this.height*1.5;
    this.y = -height*1.5;
    this._effect = 'appear';
};

Sprite_Caption.prototype.update = function(){
    Sprite.prototype.update.call(this);
    if (this._effect == 'appear'){
        this.y += 10;
        if (this.y > this._baseY){
            this._effect = '';
            this.y = this._baseY;
        }
    } else if (this._effect == 'dispose'){
        this.y -= 10;
        if (this.y + this.height < 0){
            this.parent.removeChild(this);
        }
    } else {
        this.y = this._baseY + Math.sin(Graphics.frameCount*0.1)*5;
    }
}

Sprite_Caption.prototype.startDispose = function(){
    this._effect = 'dispose';
}
    
//})();