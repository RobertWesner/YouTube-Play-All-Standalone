<?php

$outputDir = __DIR__ . '/../output';
if (!is_dir($outputDir)) {
    mkdir($outputDir, recursive: true);
}

exec(__DIR__ . '/icons.sh');

$uri = 'https://github.com/RobertWesner/YouTube-Play-All/raw/main/script.user.js';
if (($argv[1] ?? null) === 'development') {
    $uri = 'https://github.com/RobertWesner/YouTube-Play-All/raw/refs/heads/development/script.user.js';
}
$content = file_get_contents($uri);

$script = <<<JS
    // noinspection All
    import { GM } from '../shim/gm.js';
    
    const _environment_ = 'extension';
    
    const run = () => {
    $content
    };
    
    export default run;
    JS;

preg_match_all('/\/\/ @(\w+)\s+([^\n]+)/m', $content, $matches, PREG_SET_ORDER);
$meta = array_column($matches, 2, 1);

$parts = explode('-', $meta['version']);
if (count($parts) <= 1) {
    $parts = ['0', '0'];
}
$meta['browserVersion'] = '1.0.' . $parts[0] . '.' . $parts[1];

$dir = __DIR__ . '/../prepared';
if (!is_dir($dir)) {
    mkdir($dir, recursive: true);
}

function buildJsdocExtractionRegex(string $type): string
{
    return '/\/(?:(?!\/\*\*)[\s\S])*?}\s*\b' . addslashes($type) . '\b[\s\S]*?\*\/\n/m';
}

preg_match('/const\s+HtmlCreation\s+=\s*\(\(\)\s*=>\s*{\s*?\n(\s+)([\s\S]+?)return\s*{\s*[\s,$\w]+?\$builder[\s,$\w]+?}\s*?;\n\s+}\)\(\);/m', $content, $matches);
$builderDSL = preg_replace(
    '/^const\s+(\$builder|\$style)/m',
    'export const $1',
    preg_replace('/^' . $matches[1] . '|/m', '', $matches[2]),
);
preg_match(buildJsdocExtractionRegex('WrappedElementBuilderOnHandler'), $content, $matches);
$builderDSL .= $matches[0];
preg_match(buildJsdocExtractionRegex('WrappedElementBuilderBase'), $content, $matches);
$builderDSL .= $matches[0];
preg_match(buildJsdocExtractionRegex('WrappedElementBuilder'), $content, $matches);
$builderDSL .= $matches[0];

file_put_contents($dir . '/ytpa.js', $script);
file_put_contents($dir . '/meta.json', json_encode($meta, JSON_PRETTY_PRINT));
file_put_contents($dir . '/builder.js', $builderDSL);
