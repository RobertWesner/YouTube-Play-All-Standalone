<?php

require __DIR__ . '/prepare.php';
exec('npm run zip -- --mv2 -b firefox');
exec('npm run zip -- --mv3 -b chromium');
rename(glob(__DIR__ . '/../.output/*-chromium.zip')[0], __DIR__ . '/../output/chromium.zip');
rename(glob(__DIR__ . '/../.output/*-firefox.zip')[0], __DIR__ . '/../output/firefox.zip');
