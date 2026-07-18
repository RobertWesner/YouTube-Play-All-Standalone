# YouTube-Play-All-Standalone

Standalone extension for the YouTube Play All userscript.

Currently in development, not available at Chrome **yet**.

## Releasing

Releases are created manually from the **Release** workflow in GitHub Actions.
Enter an upstream YouTube-Play-All tag without or with its leading `v`, for
example `20260523-0`.

The standalone extension uses one version in its manifests, build artifacts,
and GitHub Release tag. Its third component is the number of days since the
upstream project's initial commit on 2024-03-26:

```text
upstream 20260523-0 -> standalone 1.1.788.0
```

The project major/minor version and upstream date epoch are configured in
`project.ini`. For example, starting the next minor release line only requires
changing `baseVersion` to `1.2`.
