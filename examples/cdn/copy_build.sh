#!/usr/bin/env bash

cp -R ../../packages/design-system/dist/css/* css
mkdir -p js && cp -R ../../packages/design-system/dist/js/* js
mkdir -p fonts && cp -R ../../packages/design-system/dist/fonts fonts

