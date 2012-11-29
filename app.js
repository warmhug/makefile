
var fs = require('fs'),
    os = require('os');
    
var date = new Date(),
    dt = date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate() + ' ' +
         date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
var makefile = {
    info:{
        time: dt,
        user: os.hostname()
    },
    content: function (name) {

        if (!name) return 'please input filename';

        var temp = '',
            lastIndex = name.lastIndexOf('.'),
            ext = name.substr(lastIndex);
        switch (ext) {
            case '.html':
            case '.htm':
                temp = '<!doctype html>\n' +
                        '<html>\n' +
                        '<head>\n' +
                        '    <meta charset="utf-8" />\n' +
                        '    <title>' + name.substring(0, lastIndex) + '</title>\n' +
                        '    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />\n' +
                        '    <meta content="yes" name="apple-mobile-web-app-capable" />\n' +
                        '    <meta content="black" name="apple-mobile-web-app-status-bar-style" />\n' +
                        '    <meta name="format-detection" content="telephone=no" />\n\n' +
                        '    <!--<script src="http://zeptojs.com/zepto.js" type="text/javascript"></script>\n' +
                        '    <script src="http://code.jquery.com/jquery.js" type="text/javascript"></script>-->\n\n' +
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
                        '* fileName：' + name + '\n' +
                        '*****************************************************/\n';
                break;
        }

        this.createfile(name, temp);
    },
    createfile: function (name, content) {
        fs.writeFile('./' + name, content, function (err) {
            if (err) throw err;
            console.log('makefile success');
        });
    }
}

exports.file = makefile;