<?php

$content = file_get_contents('https://github.com/RobertWesner/YouTube-Play-All/raw/main/script.user.js');
$matches = [];

preg_match('/(?<=\(async function \(\) {).*(?=}\)\(\))/ms', $content, $matches);
$script = 'const run = () => {' . $matches[0] . '};export default run;';

preg_match_all('/\/\/ @(\w+)\s+([^\n]+)/m', $content, $matches, PREG_SET_ORDER);
$meta = array_column($matches, 2, 1);

$parts = explode('-', $meta['version']);
$meta['browserVersion'] = '1.0.' . $parts[0] . '.' . $parts[1];

$dir = __DIR__ . '/prepared';
if (!is_dir($dir)) {
    mkdir($dir, recursive: true);
}

file_put_contents($dir . '/ytpa.js', $script);
file_put_contents($dir . '/meta.json', json_encode($meta));
