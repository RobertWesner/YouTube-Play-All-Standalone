#!/bin/sh

(
    cd $(dirname $0)/..

    _convert() {
        magick icon.png -resize ${1}x${1} public/icon-${1}.png
    }

    _convert 128
    _convert 96
    _convert 64
    _convert 48
    _convert 24
    _convert 16
)
