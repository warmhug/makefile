#!/usr/bin/env node

var makefile = require('../app.js').makefile,
    arg = process.argv[2];
//console.log(makefile);

makefile.init(arg);