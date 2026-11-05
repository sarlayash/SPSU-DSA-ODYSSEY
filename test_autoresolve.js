const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("====================================================");
console.log("  TESTING AUTO-RESOLVE ENGINE (2 WRONG ATTEMPTS)");
console.log("====================================================");

const levelsCode = fs.readFileSync(path.join(__dirname, 'spsu_levels.js'), 'utf8');

// Mock DOM container
function createMockContainer() {
  const elements = {};
  const container = {
    innerHTML: '',
    querySelector: (sel) => {
      const clean = sel.replace('#', '').replace('.', '');
      if (!elements[clean]) {
        elements[clean] = {
          textContent: '',
          innerHTML: '',
          style: {},
          classList: {
            add: () => {},
            remove: () => {},
            contains: () => false
          },
          onclick: null,
          appendChild: () => {}
        };
      }
      return elements[clean];
    },
    querySelectorAll: (sel) => {
      return [
        { getAttribute: () => 'S', classList: { add: () => {}, remove: () => {} }, onclick: null },
        { getAttribute: () => 'A', classList: { add: () => {}, remove: () => {} }, onclick: null },
        { getAttribute: () => 'D', classList: { add: () => {}, remove: () => {} }, onclick: null },
        { getAttribute: () => 'T', classList: { add: () => {}, remove: () => {} }, onclick: null }
      ];
    }
  };
  return { container, elements };
}

const sandbox = {
  window: {
    spsuAudio: {
      click: () => {},
      laser: () => {},
      success: () => {},
      error: () => {},
      bossHit: () => {},
      levelUp: () => {}
    }
  },
  document: {
    createElement: () => ({
      className: '',
      innerHTML: '',
      textContent: '',
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {}
    })
  },
  setTimeout: (fn, ms) => fn(), // execute immediately for test
  Math: Math
};

vm.createContext(sandbox);
vm.runInContext(levelsCode, sandbox);

const levels = sandbox.window.SPSU_LEVELS;

// Test Level 1 Auto-Resolve
console.log("🧪 Testing Level 1 Auto-Resolve after 2 wrong attempts...");
{
  const { container, elements } = createMockContainer();
  let completed = false;
  levels[0].init(container, (success) => { completed = success; });

  const lockBtn = elements['btn-lock'];
  // First wrong attempt
  lockBtn.onclick();
  console.log(`   Attempt 1: ${elements['lvl1-log'].innerHTML.includes('Attempt 1/2')}`);

  // Second wrong attempt -> Triggers Auto-Resolve!
  lockBtn.onclick();
  const autoResolved = elements['lvl1-log'].innerHTML.includes('AUTO-RESOLVED');
  console.log(`   Attempt 2 Auto-Resolved: ${autoResolved}`);
  if (!autoResolved) throw new Error("Level 1 Auto-Resolve failed!");
}

// Test Level 3 Auto-Resolve
console.log("\n🧪 Testing Level 3 Auto-Resolve after 2 wrong attempts...");
{
  const { container, elements } = createMockContainer();
  let completed = false;
  levels[2].init(container, (success) => { completed = success; });

  const traverseBtn = elements['btn-traverse'];
  traverseBtn.onclick();
  traverseBtn.onclick();
  const autoResolved = elements['lvl3-log'].innerHTML.includes('AUTO-RESOLVE ENGAGED');
  console.log(`   Attempt 2 Auto-Resolved: ${autoResolved}`);
  if (!autoResolved) throw new Error("Level 3 Auto-Resolve failed!");
}

// Test Level 5 Auto-Resolve
console.log("\n🧪 Testing Level 5 Auto-Resolve after 2 wrong attempts...");
{
  const { container, elements } = createMockContainer();
  let completed = false;
  levels[4].init(container, (success) => { completed = success; });

  const checkBtn = elements['btn-check-partition'];
  checkBtn.onclick();
  checkBtn.onclick();
  const autoResolved = elements['lvl5-log'].innerHTML.includes('AUTO-RESOLVE ENGAGED');
  console.log(`   Attempt 2 Auto-Resolved: ${autoResolved}`);
  if (!autoResolved) throw new Error("Level 5 Auto-Resolve failed!");
}

// Test Level 8 Auto-Resolve
console.log("\n🧪 Testing Level 8 Auto-Resolve after 2 wrong attempts...");
{
  const { container, elements } = createMockContainer();
  let completed = false;
  levels[7].init(container, (success) => { completed = success; });

  const checkBtn = elements['btn-check-queens'];
  checkBtn.onclick();
  checkBtn.onclick();
  const autoResolved = elements['lvl8-log'].innerHTML.includes('AUTO-RESOLVE ENGAGED');
  console.log(`   Attempt 2 Auto-Resolved: ${autoResolved}`);
  if (!autoResolved) throw new Error("Level 8 Auto-Resolve failed!");
}

// Test Level 9 Auto-Resolve
console.log("\n🧪 Testing Level 9 Auto-Resolve after 2 wrong attempts...");
{
  const { container, elements } = createMockContainer();
  let completed = false;
  levels[8].init(container, (success) => { completed = success; });

  const checkBtn = elements['btn-verify-dp'];
  checkBtn.onclick();
  checkBtn.onclick();
  const autoResolved = elements['lvl9-log'].innerHTML.includes('AUTO-RESOLVE ENGAGED');
  console.log(`   Attempt 2 Auto-Resolved: ${autoResolved}`);
  if (!autoResolved) throw new Error("Level 9 Auto-Resolve failed!");
}

console.log("\n====================================================");
console.log("  ALL AUTO-RESOLVE SUITES VERIFIED AND FUNCTIONING! 🚀");
console.log("====================================================");
