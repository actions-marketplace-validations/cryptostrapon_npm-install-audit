# Review a take-home repository without installing it

This deliberately harmless fixture shows two reasons to review an unfamiliar
project before installing dependencies. It contains no dependencies, credentials,
downloads or live malicious payloads; the scanner reads its files without running
the setup hook.

## Try the read-only scan

Use Node 18 or newer and a reviewed, trusted checkout of npm-install-audit.
Stay in that trusted checkout, not in a repository supplied by a stranger:

```sh
node ./audit.js ./examples/safe-take-home
```

The expected findings are:

```text
! .npmrc: ignore-scripts=false explicitly enables npm lifecycle scripts
! package.json: postinstall hook runs: node setup.cjs

2 finding(s). Read them before you run npm install.
```

Exit code 1 means the scan found review signals, not that the scanner crashed.
Do not run `npm install` in the example; it is not needed for this demonstration.

## Understand the findings

- `postinstall` would run the example's `setup.cjs` during installation. In this
  fixture it only writes a local `DEMO_HOOK_RAN` marker; in an unfamiliar project,
  inspect the actual referenced code before deciding what to do.
- `.npmrc` explicitly enables lifecycle scripts. This setting can be legitimate,
  but it deserves review when it arrives in someone else's repository.

The marker must not be created by the scan. The automated check verifies that
the two expected findings are returned and the hook did not run:

```sh
node ./scripts/check-safe-demo.cjs
```

This is an educational example, not a real malware detection result. A finding
does not prove malicious intent, and a clean scan does not establish safety.
For an actual unfamiliar project, use the
[manual review checklist](take-home-safety-checklist.md) and an isolated,
disposable environment without valuable credentials.

## Share feedback safely

Report reproducible false positives or missed configuration patterns in
[GitHub Discussions](https://github.com/cryptostrapon/npm-install-audit/discussions/20).
Use a minimal harmless example, redact secrets and do not share live payloads.
If the tool is useful, a repository star helps other developers discover it.
