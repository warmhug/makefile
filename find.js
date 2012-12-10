/****************************************************
* author：  JHGH-WN8LNMB0N8
* time：    2012/12/6 18:58:49
* fileName：find.js
*****************************************************/
var fs = require('fs');
var util = require('util');

function find(ori_dir, tar_dir, callback) {

    /** //异步删除，会混乱
    //var finfo = {};
    var loop = function (dir, callback) {
        fs.readdir(dir, function (err, files) {
            if (err) { throw err; }
            //if (!files.length) return;
            files.forEach(function (file, index) {
                var path = dir + '/' + file;
                fs.stat(path, function (err, stats) {
                    if (err) { throw err; }
                    if (stats.isFile()) {
                        dirs.push({ "name": file, "type": "file" });
                    } else if (stats.isDirectory()) {
                        dirs.push({ "name": file, "type": "dir" });
                        loop(path, callback);
                    }
                    console.log(dirs);
                });
            });
        });
    };
    **/


    var searchSync = function (dir) {

        if (!dir) return false;
        try {
            fs.readdirSync(dir);
        } catch (e) {
            return false;
        }
        var dirArr = [];
        var search = function (dir) {
            try {
                var files = fs.readdirSync(dir);
                files.forEach(function (file, index) {
                    var path = dir + '/' + file;
                    var stats = fs.statSync(path);
                    if (stats.isDirectory()) {
                        search(path);
                    }
                    dirArr.push(path);
                });
            } catch (err) {
                //console.log(err);
                if (err && err.code === 'ENOENT') {
                    //fs.mkdirSync(dir);
                    console.log('the dir is not exist..');
                }
            }
        }
        search(dir);
        return dirArr;
    }

    var modifySync = function (option) {
        var ori_dir = option.ori_dir || '',
            tar_dir = option.tar_dir || '',
            tag = option.flag,
            stats;

        var ori_dirArr = searchSync(ori_dir),
            tar_dirArr = searchSync(tar_dir);
        console.log(ori_dirArr);
        console.log(tar_dirArr);

        var deleteSync = function (tar_dirArr) {
            if (!util.isArray(tar_dirArr)) return false;
            tar_dirArr.forEach(function (tar_dir, index) {
                stats = fs.statSync(tar_dir);
                if (stats.isFile()) {
                    fs.unlinkSync(tar_dir);
                } else if (stats.isDirectory()) {
                    fs.rmdirSync(tar_dir);
                }
            });
            return true;
        };

        switch (tag) {
            case 'delete':
                tar_dirArr = tar_dirArr || ori_dirArr;  //
                deleteSync(tar_dirArr);
                break;
            case 'copy':
                var ori_name = ori_dir.split('/').length > 1 && ori_dir.split('/')[1],
                    tar_name = tar_dir.split('/').length > 1 && tar_dir.split('/')[1];
                if (!deleteSync(tar_dirArr)) { // 如果不存在 目标目录
                    fs.mkdirSync(tar_name);
                }
                for (var i = ori_dirArr.length - 1; i >= 0; i--) {
                    var curr = ori_dirArr[i];
                    stats = fs.statSync(curr);
                    var fileName = curr.substring(curr.lastIndexOf('/') + 1, curr.lastIndexOf('.'));
                    var path = curr.replace('/' + ori_name + '/', '/' + tar_name + '/');
                    console.log(path);

                    if (stats.isFile()) {
                        var data = fs.readFileSync(curr);
                        var npath = path.replace('/' + fileName + '.', '/' + tar_name + '.');
                        //console.log(fileName);
                        //console.log(path);
                        fs.writeFileSync(npath, data);
                    } else if (stats.isDirectory()) {
                        fs.mkdirSync(path);
                    }
                }
                break;
            default:

        }

    }
    modifySync({
        'ori_dir': ori_dir,
        'tar_dir': tar_dir,
        'flag': 'copy'
    });
}
find('./seajs_template', './sea_copy', function () {

});