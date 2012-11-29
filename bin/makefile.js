#!/usr/bin/env node

var makefile = require('../app.js'),
    arg = process.argv[2];

makefile.content(arg);