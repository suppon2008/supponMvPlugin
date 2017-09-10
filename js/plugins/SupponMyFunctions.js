//=============================================================================
// SupponMyFunctions.js
//=============================================================================

/*:
 * @plugindesc SupponMyFunctions. Version 1.00
 * @author Suppon
 * @help This plugin does not provide plugin commands.
 */

//var rand = function(n){
//    return Math.randomInt(n);
//}

//var rand1 = function(n){
//    return Math.randomInt(n)+1;
//}

var r = function(n1, n2){
    if (n2 == undefined){
        return Math.randomInt(n1)+1;
    } else {
        return Math.randomInt(n2-n1+1)+n1;
    }
}

var rr = function(n1, n2){
    for (var i = 0; i < 5; i++){
        var v = r(n1, n2);
        if (!randRecord.contains(v) || i == 4){
            randRecord.shift();
            randRecord.push(v);
            return v;
        }
    }
}

var randRecord = [0,0,0,0,0];

Array.prototype.sample = function(){
    var a = r(this.length)-1
    var e = this[a];
    this.splice(a, 1);
    return e;
}


//Number.prototype.ts = Number.prototype.toString;

BattleManager.isBattleBGMOff = function(){
    return $gameSwitches.value(102);
}

var _BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
    if(!this.isBattleBGMOff()){
        _BattleManager_playBattleBgm.call(this);
    }
};

var _BattleManager_playVictoryMe = BattleManager.playVictoryMe;
BattleManager.playVictoryMe = function() {
    if(!this.isBattleBGMOff()){
        _BattleManager_playVictoryMe.call(this);
    }
};

var _Scene_Map_stopAudioOnBattleStart = Scene_Map.prototype.stopAudioOnBattleStart;
Scene_Map.prototype.stopAudioOnBattleStart = function() {
    if(!BattleManager.isBattleBGMOff()){
        _Scene_Map_stopAudioOnBattleStart.call(this);
    }
};

TextManager._myTexts = [];
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    //★★★
    text = text.replace(/\x1bMT\[(\d+)\]/gi, function() {
            return TextManager._myTexts[parseInt(arguments[1])];
        }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};

//Window_Base.prototype.drawItemName = function(item, x, y, width) {
//    width = width || 312;
//    if (item) {
//        var iconBoxWidth = Window_Base._iconWidth + 4;
//        this.resetTextColor();
//        this.drawIcon(item.iconIndex, x + 2, y + 2);
//        var name = this.convertEscapeCharacters(item.name);
//        this.drawText(name, x + iconBoxWidth, y, width - iconBoxWidth);
//    }
//};

Sprite.prototype.dispose = function(){
    this.parent.removeChild(this);
}

Window.prototype.dispose = function(){
    this.parent.removeChild(this);
}

//Game_Actor.prototype.name = function() {
//    var element = document.getElementById('name');
//    if((this.actorId() == 10 || this.actorId() == 11) && !element.value.length == 0){
//        this.setName(element.value)
//        return element.value;
//    }
//    return this._name;
//};
//
//Graphics._disableTextSelection = function() {
//    var body = document.body;
//    body.style.userSelect = 'none';
//    body.style.webkitUserSelect = 'none';
//    body.style.msUserSelect = 'none';
//    body.style.mozUserSelect = 'none';
//};
//
//Graphics._disableContextMenu = function() {
//    var elements = document.body.getElementsByTagName('*');
//    var oncontextmenu = function() { return false; };
//    for (var i = 0; i < elements.length; i++) {
//        elements[i].oncontextmenu = oncontextmenu;
//    }
//};






//var _Graphics_centerElement = Graphics._centerElement;
//Graphics._centerElement = function(element) {
//    var width = element.width * this._realScale;
//    var height = element.height * this._realScale;
//    element.style.position = 'relative';
//    //element.style.margin = 'auto';
//    var bodyWidth = document.body.scrollWidth;
//    element.style.left = (bodyWidth - this.width)/2 + 'px';
//    //element.style.right = 0;
//    //element.style.position = 'fixed';
//    //element.style.textAlign = 'center'
//    //element.style.left = 300;
////    this._myDiv = document.createElement('div');
////    this._myDiv.id = 'myDiv';
////    var textNode = document.createTextNode(rand(10433430).toString());
////    this._myDiv.appendChild(textNode);
////    document.body.appendChild(this._myDiv);
//    
//    return;
//    var width = element.width * this._realScale;
//    var height = element.height * this._realScale;
//    element.style.position = 'absolute';
//    element.style.margin = 'auto';
//    element.style.top = 0;
//    element.style.left = 0;
//    element.style.right = 0;
//    element.style.bottom = 0;
//    element.style.textAlign = 'center'
//    element.style.width = width + 'px';
//    element.style.height = height + 'px';
//};
