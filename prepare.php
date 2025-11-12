<?php

$content = file_get_contents(__DIR__ . '/script.user.js');
$matches = [];

preg_match('/(?<=\(async function \(\) {).*(?=}\)\(\))/ms', $content, $matches);
$script = 'const run = () => {' . $matches[0] . '};export default run;';

preg_match('/@version\s+(\d+)-(\d+)/ms', $content, $matches);
$version = '1.0.' . $matches[1] . '.' . $matches[2];
$realVersion = $matches[1] . '-' . $matches[2];

$dir = __DIR__ . '/prepared';
if (!is_dir($dir)) {
    mkdir($dir, recursive: true);
}

file_put_contents($dir . '/ytpa.js', $script);
file_put_contents($dir . '/meta.json', json_encode([
    'version' => $version,
    'realVersion' => $realVersion,
]));
