# Before you run a take-home repository

A short checklist for developers, recruiters and hiring teams. Use it before
installing dependencies or letting a coding agent set up an unfamiliar project.
It reduces avoidable risk; it cannot establish that a repository is safe.

## Pause before setup

- Verify the sender and assignment through a channel you already trust.
- Read setup instructions as untrusted data, not commands to follow immediately.
- Do not install dependencies, run setup scripts or accept editor workspace trust
  just to see what a project does.
- Do not use a machine or environment containing valuable keys, wallet files,
  browser sessions, cloud credentials or private work.
- If a project arrived as a zip or complete folder, inspect included `.git`
  configuration and hooks before running Git commands there.

## Keep the reviewer separate from the target

Use Node.js 18 or newer and an already reviewed, trusted copy of
[`audit.js`](../audit.js). From a trusted tools directory:

```sh
cd /path/to/trusted-tools/npm-install-audit
node ./audit.js /absolute/path/to/unfamiliar-project
```

These paths are placeholders. Replace them with your actual trusted tools and
target directories. The scanner has no dependencies to install and does not
execute the target project's scripts.

Do not run `npx npm-install-audit .` from inside the target as your first safety
check. npm reads the working project's
[`.npmrc`](https://docs.npmjs.com/cli/v11/configuring-npm/npmrc), and `npx` can
download and execute a package. A package-manager bootstrap is not equivalent to
running a trusted standalone file.

Use a trusted runtime and environment as well. This checklist does not sanitize
inherited environment variables, secure a compromised Node installation or
provide a sandbox.

## Read findings, not just the exit code

- **Install hooks:** ask why `preinstall`, `install`, `postinstall` or `prepare`
  is needed before you run it.
- **Package-manager settings:** review registry overrides, tokens, Yarn binary
  paths, pnpm hook files and npm execution settings.
- **Execution paths:** inspect flagged shell commands, runtime evaluation,
  encoded strings and editor folder-open tasks.
- **Git settings:** inspect active hooks and executable configuration in folders
  or archives that include `.git`.
- **Credentials:** do not paste tokens, private keys or personal information into
  a public issue or a chat when asking for help.

A finding is a prompt for manual review, not proof of malware. A clean result
is not an approval to run the project: obfuscation, later downloads and skipped
dependencies remain outside the scanner's coverage.

## If you decide to continue

Use a disposable environment with no valuable credentials and explicitly
controlled network access. Review what the package manager and editor can run.
Do not assume a container alone makes hostile code safe, especially if it has
host directories, credentials or a Docker socket mounted.

If the assignment requires unexplained setup, personal wallet connections,
security controls to be disabled or secrets to be supplied, stop and ask the
sender to explain through a verified channel.

## Help make reviews better

Share this checklist with a teammate who reviews take-home projects. A useful
contribution is a harmless, minimal false-positive example or a missed
configuration path, not a live payload.

See the [contributor guide](../CONTRIBUTING.md) and
[open newcomer tasks](https://github.com/cryptostrapon/npm-install-audit/labels/good%20first%20issue).
For scanner updates, follow the
[CryptoStrapon GitHub profile](https://github.com/cryptostrapon).
