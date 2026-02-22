#!/bin/sh

(
    cd "$(dirname "$0")/.." || exit

    if command -v magick >/dev/null 2>&1; then
        IM="magick"
    elif command -v convert >/dev/null 2>&1; then
        IM="convert"
    else
        echo "ImageMagick not found"
        exit 1
    fi

    _convert() {
        $IM icon.png -resize ${1}x${1} public/icon-${1}.png
    }

    _convert 128
    _convert 96
    _convert 64
    _convert 48
    _convert 24
    _convert 16
)
