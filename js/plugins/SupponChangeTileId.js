//=============================================================================
// SupponChangeTileId.js
//=============================================================================

/*:
 * @plugindesc 同じマップ内のタイルのIDをコピーしてチェンジします。 Version 1.01
 * @author Suppon
 * @help
 *
 * このプラグインを使用するときは以下のようにプラグインコマンドを入力してください。
 * 
 * SupponCTI add 1 2 3 4 5 6 11 12 13
 * 
 * この場合、
 * IDが1、
 * コピー元のマップIDが2、
 * コピー元のX座標が3、
 * コピー元のY座標が4、
 * コピー元の幅が5、
 * コピー元の高さが6、
 * コピー先のマップIDが11、
 * コピー先のX座標が12、
 * コピー先のY座標が13、を意味します。
 * コピー元にリージョンが設定してあるとリージョンもコピーされます。
 * IDにはabcのような文字も使えます。
 * マップIDを省略した場合、同じマップ間でのコピーとなります。
 * 
 *
 * コピーのデータを削除したいときは以下のようにIDを指定してください。
 *
 * SupponCTI remove 1
 *
 * この場合、
 * IDが1のデータを削除します。同じIDのデータが複数ある場合には、一度に全て削除されます。
 */

(function() {

    var _Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command1, args) {
        _Game_Interpreter_pluginCommand.call(this, command1, args);
        args = args.filter(function(n){
            return n!=='';
        });
        if(!$gameParty._supponCTI){$gameParty._supponCTI=[]};
        if (command1 === 'SupponCTI') {
            var command2 = args.shift();
            switch (command2) {
            case 'add':
                $gameParty.addSupponCTI(args);
                break;
            case 'remove':
                $gameParty.removeSupponCTI(args[0]);
                break;
            }
        }
    };

    var _Game_Party_initialize = Game_Party.prototype.initialize
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this._supponCTI = [];
    };
    
    Game_Party.prototype.addSupponCTI = function(args){
        if (args.length == 7){
            var args = [args[0], $gameMap.mapId(), args[1], args[2], args[3], args[4],
                   $gameMap.mapId(), args[5], args[6]];
        } else if (args.length != 9){
            window.alert('Wrong args in supponCTI plugin');
        }
        var stop = false;
        this._supponCTI.forEach(function(element){
            if(element.equals(args)){stop = true};
        })
        if(stop){return};
        this._supponCTI.push(args);
        if(args[6] == $gameMap.mapId()){
            $gameMap._supponCTI.push(args);
        }
    }
    
    Game_Party.prototype.removeSupponCTI = function(id){
        this._supponCTI = this._supponCTI.filter(function(args){
            return args[0] !== id;
        })
        $gamePlayer._fadeType = null;
        SceneManager.goto(Scene_Map);
    }
    
    var _Game_Temp_initialize = Game_Temp.prototype.initialize
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this._supponCTINextMapId = 0;
    };
    
    
    var _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.call(this);
        this._supponCTI = [];
    };

    var _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        if(this._supponCTI.length > 0){
            this.updateSupponCTI();
        } else {
             _Game_Map_update.call(this, sceneActive);
        }  
    };
    
    Game_Map.prototype.updateSupponCTI = function(){
        while(this._supponCTI.length > 0){
            var a = this._supponCTI[0]
            if(this.mapId() == a[1]){
                //転送元のマップIDが現在のマップIDと同じなら
                var args = this._supponCTI.shift();
                DataManager.applySupponCTI(args, $dataMap);
            } else {
                //転送元のマップIDが現在のマップIDと違う場合
                if($gameTemp._supponCTINextMapId != a[1]){
                    //ロードが必要
                    $dataMapForSupponCTI = null;
                    var filename = 'Map%1.json'.format(a[1].padZero(3));
                    DataManager.loadDataFile('$dataMapForSupponCTI', filename);
                    $gameTemp._supponCTINextMapId = a[1];
                }   
                if($dataMapForSupponCTI){
                    //転送元のマップがロードされたら
                    var args = this._supponCTI.shift();
                    DataManager.applySupponCTI(args, $dataMapForSupponCTI);
                }
                if(!$dataMapForSupponCTI){
                    return;
                }
            }
        }
    }    
    
    $dataMapForSupponCTI = null;
    
    DataManager.applyAllSupponCTI = function(){
        if(!$gameParty._supponCTI){$gameParty._supponCTI=[]};
        $gameParty._supponCTI.forEach(function(args){
            if(args[6]==$gameMap.mapId()){
                $gameMap._supponCTI.push(args);
            }
        },this);
    }
    
    DataManager.applySupponCTI = function(args, sender){
        var id = Number(args[0]);
        var s = Number(args[1]);//送り元のマップID
        var x1 = Number(args[2]);
        var y1 = Number(args[3]);
        var w = Number(args[4]);
        var h = Number(args[5]);
        var d = Number(args[6]);//送り先のマップID
        var x2 = Number(args[7]);
        var y2 = Number(args[8]);
        var width = $dataMap.width;
        var height = $dataMap.height;
        var width0 = sender.width;
        var height0 = sender.height;
        for (var i=0; i<h; i++){
            for (var j=0; j<w; j++){
                for (var z=0; z<6; z++){
                    //if($gameMap.tileset().mode == 0 && )
                    var id0 = sender.data[(z * height0 + (y1+i)) * width0 + (x1+j)];
                    var id1 = $dataMap.data[(z * height + (y2+i)) * width + (x2+j)];
                    if ($gameMap.tileset().mode==0 && id0 == 2720) {continue};
                    if(id0 != 0 || z==4){
                        $dataMap.data[(z * height + (y2+i)) * width + (x2+j)] =
                            sender.data[(z * height0 + (y1+i)) * width0 + (x1+j)];
                    }
                }
            }
        }
    }

    var _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this)
        DataManager.applyAllSupponCTI();
    };

})();
