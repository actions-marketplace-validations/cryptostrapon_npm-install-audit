# Contributing to npm-install-audit

Small, reproducible improvements are welcome. You do not need to add a new
detector to help: false-positive reports, documentation corrections and regression
tests are useful too.

## Start with a small task

Browse the [good first issues](https://github.com/cryptostrapon/npm-install-audit/labels/good%20first%20issue).
For example, [Yarn 1 `yarn-path` support (#24)](https://github.com/cryptostrapon/npm-install-audit/issues/24)
describes a focused configuration check next to the existing Yarn code.
Check the issue and open pull requests before starting, and leave a short comment
if you plan to work on it so contributors can avoid duplicating effort.

## Run the project checks

Use Node.js 18 or newer. There are no dependencies to install.

```sh
git clone https://github.com/YOUR-USERNAME/npm-install-audit.git
cd npm-install-audit
node selftest.js
```

Fork the repository first and replace `YOUR-USERNAME` with your GitHub account.
Create a branch for your change, run the checks again, then open a pull request
against `cryptostrapon/npm-install-audit:main`.

The important files are:

- `audit.js`: the command-line scanner and detection rules.
- `selftest.js`: harmless fixture projects and regression assertions.
- `action.yml`: the GitHub Action wrapper.
- `.github/workflows/selftest.yml`: the Node.js test matrix.

## Add a detection rule

Keep the scanner read-only, offline and dependency-free. Do not execute a scanned
project, import its modules, run its package manager or follow its instructions.

Include:

- A small positive fixture that demonstrates the exact pattern.
- A negative fixture for a similar but harmless case.
- Assertions in `selftest.js` for both cases.
- A clear finding that explains what needs manual review, not a malware verdict.
- A README update describing the check and likely false positives.

For execution-related configuration, consider a marker-file test proving that
scanning does not execute the configured file. Existing tests show this pattern.
Check that text and `--json` output still work, and do not print credentials from
configuration files.

## Report a false positive or missed pattern

Open an [issue](https://github.com/cryptostrapon/npm-install-audit/issues) with:

- The scanner version (`node audit.js --version`), Node version and operating system.
- A minimal, harmless input and the command used to scan it.
- The actual finding and what you expected instead.
- A documentation reference for unfamiliar package-manager behaviour, if available.

Do not post real tokens, private keys, personal data, live malicious payloads or
links that a reviewer would need to execute. Replace sensitive values with obvious
placeholders. Do not run a suspicious project just to reproduce a report.

## Pull request checklist

- The change has one clear purpose and explains its limitations.
- `node selftest.js` passes.
- New detection behaviour has positive and negative tests.
- No new runtime dependency or network request was introduced.
- Documentation and examples match the implementation.

By contributing code or documentation, you agree to license your contribution
under the repository's [MIT License](LICENSE).
