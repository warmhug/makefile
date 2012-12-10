
var fs = require('fs'),
    os = require('os');

var makefile = {
    init: function (arg) {
        var dotIndex = arg.lastIndexOf('.');
        if (dotIndex > -1) {
            this.fname = arg.substring(0, dotIndex);
            this.ext = arg.substr(dotIndex);
            this.createfile();
        } else {
            this.dir_name = arg;
            this.create_app_dir();
        }
    },
    info: (function () {
        var date = new Date();
        var hh = date.getHours(), mm = date.getMinutes();
        var hhh = parseInt(hh) < 10 ? '0' + hh : hh,
            mmm = parseInt(mm) < 10 ? '0' + mm : mm;
        var dt = date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate() + ' ' + hhh + ':' + mmm + ':' + date.getSeconds();
        return {
            time: dt,
            user: os.hostname()
        };
    })(),
    // 生成单个文件
    createfile: function () {

        var temp = '',
            fname = this.fname,
            ext = this.ext;
        switch (ext) {
            case '.html':
            case '.htm':
                temp = '<!doctype html>\n' +
                        '<html>\n' +
                        '<head>\n' +
                        '    <meta charset="utf-8" />\n' +
                        '    <title>' + fname + '</title>\n' +
                        '    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />\n' +
                        '    <meta content="yes" name="apple-mobile-web-app-capable" />\n' +
                        '    <meta content="black" name="apple-mobile-web-app-status-bar-style" />\n' +
                        '    <meta name="format-detection" content="telephone=no" />\n\n' +
                        '    <!--<script src="http://zeptojs.com/zepto.js"></script>\n' +
                        '    <script src="http://code.jquery.com/jquery.js"></script>-->\n\n' +
                        '</head>\n' +
                        '<body>\n\n' +
                        '    <script>\n\n' +
                        '    </script>\n' +
                        '</body>\n' +
                        '</html>\n';
                break;
            case '.css':
            case '.js':
                temp = '/****************************************************\n' +
                        '* author：  ' + this.info.user + '\n' +
                        '* time：    ' + this.info.time + '\n' +
                        '* fileName：' + fname + '.' + ext + '\n' +
                        '*****************************************************/\n';
                break;
        }

        // 生成文件
        fs.writeFile('./' + name, temp, function (err) {
            if (err) throw err;
            console.log('makefile success');
        });
    },
    //生成 应用目录
    create_app_dir: function () {

        // 遍历目录
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
                    if (err && err.code === 'ENOENT') {
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
                            fs.writeFileSync(npath, data);
                        } else if (stats.isDirectory()) {
                            fs.mkdirSync(path);
                        }
                    }
                    break;
            }

        }
        modifySync({
            'ori_dir': './seajs_template',
            'tar_dir': './' + this.dir_name,
            'flag': 'copy'
        });
    }
}

exports.makefile = makefile;