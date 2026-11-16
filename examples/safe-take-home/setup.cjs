// Harmless demonstration only. The scanner must never execute this file.
require("fs").writeFileSync(require("path").join(__dirname, "DEMO_HOOK_RAN"), "demo");
console.log("Demo hook ran. A read-only scan must not run this hook.");
