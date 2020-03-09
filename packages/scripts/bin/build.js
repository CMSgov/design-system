#!/usr/bin/env node

const gulp = require('gulp');
const path = require('path');
const yargs = require('yargs');

const argv = yargs.command('$0 <sourcePackageDir>').argv;

require('../gulp/build')(gulp, argv.sourcePackageDir);

gulp.task('build')();
