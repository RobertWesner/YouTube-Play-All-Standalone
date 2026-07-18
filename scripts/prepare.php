<?php

$outputDir = __DIR__ . '/../output';
if (!is_dir($outputDir)) {
    mkdir($outputDir, recursive: true);
}

exec(__DIR__ . '/icons.sh');

$upstreamRef = $argv[1] ?? 'main';
if (!preg_match('/^(?:main|development|v?\d{8}-\d+)$/', $upstreamRef)) {
    throw new InvalidArgumentException('Invalid upstream ref: ' . $upstreamRef);
}

$uri = match ($upstreamRef) {
    'main' => 'https://github.com/RobertWesner/YouTube-Play-All/raw/refs/heads/main/script.user.js',
    'development' => 'https://github.com/RobertWesner/YouTube-Play-All/raw/refs/heads/development/script.user.js',
    default => sprintf(
        'https://github.com/RobertWesner/YouTube-Play-All/raw/refs/tags/%s/script.user.js',
        str_starts_with($upstreamRef, 'v') ? $upstreamRef : 'v' . $upstreamRef,
    ),
};

$content = file_get_contents($uri);
if ($content === false) {
    throw new RuntimeException('Unable to download upstream userscript from ' . $uri);
}

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

$upstreamVersion = $meta['version'] ?? '';
if (!preg_match('/^(\d{8})-(\d+)$/', $upstreamVersion, $versionParts)) {
    throw new RuntimeException('Unsupported upstream version: ' . $upstreamVersion);
}
if (
    !in_array($upstreamRef, ['main', 'development'], true)
    && ltrim($upstreamRef, 'v') !== $upstreamVersion
) {
    throw new RuntimeException(sprintf(
        'Requested upstream version %s but downloaded %s.',
        ltrim($upstreamRef, 'v'),
        $upstreamVersion,
    ));
}

$projectConfig = parse_ini_file(__DIR__ . '/../project.ini');
if ($projectConfig === false) {
    throw new RuntimeException('Unable to read project.ini.');
}

$baseVersion = $projectConfig['baseVersion'] ?? '';
if (!preg_match('/^(0|[1-9]\d*)\.(0|[1-9]\d*)$/', $baseVersion, $baseVersionParts)) {
    throw new RuntimeException('baseVersion must contain a major and minor version, for example 1.1.');
}
if ((int)$baseVersionParts[1] > 65535 || (int)$baseVersionParts[2] > 65535) {
    throw new RuntimeException('baseVersion components must not exceed 65535.');
}

$versionEpoch = $projectConfig['versionEpoch'] ?? '';
$epoch = DateTimeImmutable::createFromFormat('!Y-m-d', $versionEpoch, new DateTimeZone('UTC'));
$epochErrors = DateTimeImmutable::getLastErrors();
if (
    $epoch === false
    || ($epochErrors !== false && ($epochErrors['warning_count'] > 0 || $epochErrors['error_count'] > 0))
    || $epoch->format('Y-m-d') !== $versionEpoch
) {
    throw new RuntimeException('versionEpoch must be a valid YYYY-MM-DD date.');
}

$upstreamDate = DateTimeImmutable::createFromFormat('!Ymd', $versionParts[1], new DateTimeZone('UTC'));
$dateErrors = DateTimeImmutable::getLastErrors();
if (
    $upstreamDate === false
    || ($dateErrors !== false && ($dateErrors['warning_count'] > 0 || $dateErrors['error_count'] > 0))
    || $upstreamDate->format('Ymd') !== $versionParts[1]
) {
    throw new RuntimeException('Invalid upstream version date: ' . $versionParts[1]);
}

if ($upstreamDate < $epoch) {
    throw new RuntimeException('Upstream version predates the configured version epoch.');
}

$daysSinceEpoch = (int)$epoch->diff($upstreamDate)->format('%a');
$upstreamRevision = (int)$versionParts[2];
// JUST IN CASE 170 YEARS PASS: bump the minor version and change epoch
if ($daysSinceEpoch > 65535 || $upstreamRevision > 65535) {
    throw new RuntimeException('Upstream version cannot be represented as a Chrome extension version.');
}

$meta['browserVersion'] = sprintf('%s.%d.%d', $baseVersion, $daysSinceEpoch, $upstreamRevision);

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
