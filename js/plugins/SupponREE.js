//=============================================================================
// SupponRandomEnemyEmergence.js
//=============================================================================

/*:
 * @plugindesc Random Enemies emergence. Version 1.02
 * @author Suppon
 *
 * 
 * @help
 *
 * Plugin Command:
 *   supponREE ratio times id id id....       
 *   ratio : Emergence probability numer 
 *   times : Repetition number
 *   id    : Enemy ID
 *
 * Example
 *   supponREE 80 20 1 2 3 4
 *   
 *   Enter the sentence in Battle Event 1st page of Troops.
 *   It doesen't work when it put other page.
 *   Punctuate numbers by space, but don't put space at end.
 *   It can read and works more than 2 sentence at once.
 */

/*:ja
 * @plugindesc モンスターランダム出現です。
 * @author Suppon
 *
 * @help
 *
 * プラグインコマンド:
 *   supponREE ratio times id id id・・・
 *   ratio : 出現確率％です。
 *   times : 繰り返す回数です。
 *   id    : エネミーのIDです。
 * 
 * 使用例
 *   supponREE 80 20 1 2 3 4
 * 
 * TroopsのBattle Eventの1ページ目に入れてください。ほかのページでは動きません。
 * 複数行いれてもOKです。数字はスペースで区切ってください。最後にスペースを入れないでください。
 */
(function() {
    
    var _Game_Troop_initialize = Game_Troop.prototype.initialize;
    Game_Troop.prototype.initialize = function() {
        _Game_Troop_initialize.call(this);
        this._reeList = [];
    };
    
    var _Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command1, args) {
        _Game_Interpreter_pluginCommand.call(this, command1, args);
        args = args.filter(function(n){
            return n!=='';
        });
        if (command1 === 'supponREE') {
            $gameTroop._reeList.push(this._list[this._index]);
        }
    };

    var _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        this.clear();
        this.supponReUsed = false
        this._troopId = troopId;
        var enemyNumber = 0;
        if(this._reeList.length != 0){
            var lists = this._reeList;
        } else {
           var lists = $dataTroops[this._troopId].pages[0].list;
        }
        for (var i=0; i<lists.length; i++) {
            if (!lists[i].parameters[0] || !(lists[i].code === 356)){continue};
            var args = lists[i].parameters[0].split(" ")
            var command = args.shift();       
            if (command == "supponREE") {
                for (var j=0; j<args[1]; j++){
                if (args[0] > Math.randomInt(100) || enemyNumber == 0) {
                    var enemyId = args[2+Math.randomInt(args.length - 2)];
                    var enemy = new Game_Enemy(enemyId, 0, 0);
                    this._enemies.push(enemy);
                    enemyNumber++;
                    }             
                }
            } 
        };
        if (enemyNumber>0) {
            this._reeList = [];
            this.makeUniqueNames();
            this.supponReUsed = true
            return;
        } else {
        _Game_Troop_setup.call(this, troopId);
        }    
    }
    
    Spriteset_Battle.prototype.supponReLinedUpEnemy = function(){
        var whole_x = 0;
        var depth = 0;
        this._enemySprites.reverse();
        this._enemySprites.forEach(function(sprite){
            var base_y = Math.round(Graphics.height*0.7);
            depth = Math.round(Graphics.height*0.15);           
            sprite._homeY = base_y;
            whole_x += Math.ceil(sprite.width * sprite.scale.x);
             });
        var line = Math.floor(whole_x / Graphics.width)+1;
        var l = 0;
        var j = 1;
        var maxx = null;
        var minx = null;
        var size = this._enemySprites.length;
        var n = Math.ceil(size/line);
        this._enemySprites.forEach(function(sprite){
            l = Math.ceil(j/n);
            sprite._homeX = Graphics.width*((j-1)%n)/(n*1.2);
            sprite._homeX += Graphics.width*l/(n*1.2*line);
            sprite._homeY -= depth-(Math.ceil(depth*Math.pow(0.7,l)))
            if (j==1) {maxx = sprite._homeX; minx = sprite._homeX};
            if (maxx<sprite._homeX) {maxx=sprite._homeX};
            if (minx>sprite._homeX) {minx=sprite._homeY};
            j++;
        });
        var centerx = (maxx + minx)/2;
        var shiftx = (maxx + minx)/2-Graphics.width/2;
        this._enemySprites.forEach(function(sprite){
            sprite._homeX -= shiftx;
        });
    };
    
    Spriteset_Battle.prototype.supponReLinedUpEnemySV = function(){
        var whole_x = 0;
        var depth = 0;
        this._enemySprites.reverse();
        this._enemySprites.forEach(function(sprite){
            var base_y = Math.round(Graphics.height*0.5);
            depth = Math.round(Graphics.height*0.15);           
            sprite._homeY = base_y;
            whole_x += Math.ceil(sprite.width * sprite.scale.x);
             });
        var line = Math.floor(whole_x / Graphics.width*2)+1;
        var l = 0;
        var j = 1;
        var size = this._enemySprites.length;
        this._enemySprites.forEach(function(sprite){
            l = Math.floor(line*(j-1)/size);
            sprite._homeX = (Graphics.width/(1+size)*0.6)*(1+line*(j-1)%(size));
            sprite._homeY += (Graphics.height/line*3)*(line-l*2)/15-(j%2)*25
            -(Graphics.height/line*3)/30;
            j++;
        });
    };
    
    var _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function(){
        _Scene_Battle_start.call(this)
        if ($gameTroop.supponReUsed) {
            if ($dataSystem.optSideView){
                this._spriteset.supponReLinedUpEnemySV();
            } else {
                this._spriteset.supponReLinedUpEnemy();
            }   
        }
    }
    
})();