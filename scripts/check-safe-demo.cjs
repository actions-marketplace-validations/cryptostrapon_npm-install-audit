const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "safe-audit-demo-"));
try {
  fs.cpSync(path.join(root, "examples/safe-take-home"), tmp, { recursive: true });
  const scan = spawnSync(process.execPath, [path.join(root, "audit.js"), "--json", tmp], {
    encoding: "utf8",
  });
  assert.equal(scan.status, 1, scan.stderr);
  const findings = JSON.parse(scan.stdout);
  assert.deepEqual(findings.map((finding) => finding.file).sort(), [".npmrc", "package.json"]);
  assert.ok(findings.some((finding) => finding.rule === "postinstall hook runs: node setup.cjs"));
  assert.ok(findings.some((finding) => finding.rule.includes("ignore-scripts=false")));
  assert.equal(fs.existsSync(path.join(tmp, "DEMO_HOOK_RAN")), false);
  console.log("PASS safe demo: two expected findings; install hook not executed");
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
