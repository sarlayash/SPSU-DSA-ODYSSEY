// SPSU DSA Odyssey - 10 Comprehensive Interactive Levels
// All DSA concepts + Game Mechanics + Soft Skills + Aptitude Logic

const SPSU_LEVELS = [
  {
    id: 1,
    title: "Level 1: The Teal Memory Grid (Arrays & Two Pointers)",
    concept: "Array Indices & Two-Pointer Convergence (O(N) vs O(N²))",
    logoPart: "roots-left", // Powers left pillars of SPSU logo
    badge: { id: "b1", name: "Array Architect", icon: "📊", desc: "Mastered linear indexing and two-pointer target sum" },
    xpReward: 350,
    aptitudeTip: "💡 Mental Math Shortcut: When finding pairs summing to T in a sorted list of N numbers, moving pointers inward eliminates an entire row/column in O(N) rather than nested O(N²) loops!",
    softSkillScenario: {
      question: "Team Dilemma: 3 hours before product launch, you discover a memory leak in an array buffer created by a senior teammate. The team lead is on edge. What is your move?",
      options: [
        { text: "Privately approach the teammate with profiler logs and a verified 2-line patch, then present the solution together to the lead.", correct: true, feedback: "+150 XP! Stellar emotional intelligence & proactive teamwork! The team deploys smoothly." },
        { text: "Post in the general Slack channel tagging everyone so management knows who caused it.", correct: false, feedback: "Zero XP. Creates panic and toxic blame culture right before a critical launch." },
        { text: "Stay silent and hope no user triggers the memory leak during the demo.", correct: false, feedback: "Zero XP. Passive silence guarantees a production crash and loss of customer trust." }
      ]
    },
    init(container, onComplete) {
      // Interactive Two-Pointer Game
      const sortedArray = [2, 5, 8, 11, 14, 19, 23, 29];
      const target = 25; // 11 + 14 = 25 (indices 3 and 4)
      let left = 0;
      let right = sortedArray.length - 1;
      let attempts = 0;

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Neutralize Array Overload by finding pair with sum = <span class="highlight-target">${target}</span></div>
          <div class="hud-stat">Complexity Target: <span class="badge-time">O(N) Time</span> | <span class="badge-space">O(1) Auxiliary Space</span></div>
        </div>
        <div class="game-board">
          <div class="array-container" id="array-slots"></div>
          <div class="pointer-display">
            <div class="pointer-box left-p"><span>L (Index ${left})</span>: <b id="val-l">${sortedArray[left]}</b></div>
            <div class="sum-box">CURRENT SUM: <span id="current-sum">${sortedArray[left] + sortedArray[right]}</span></div>
            <div class="pointer-box right-p"><span>R (Index ${right})</span>: <b id="val-r">${sortedArray[right]}</b></div>
          </div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-inc-l">Move Left Pointer ➡️ (L++)</button>
            <button class="btn btn-action" id="btn-lock">⚡ LOCK IN PAIR & FIRE</button>
            <button class="btn btn-action" id="btn-dec-r">Move Right Pointer ⬅️ (R--)</button>
          </div>
          <div class="battle-log" id="lvl1-log">Telemetry: Pointers initialized at extremes. Is Current Sum < Target or > Target?</div>
        </div>
      `;

      const slotsDiv = container.querySelector('#array-slots');
      const valL = container.querySelector('#val-l');
      const valR = container.querySelector('#val-r');
      const curSum = container.querySelector('#current-sum');
      const log = container.querySelector('#lvl1-log');

      function renderArray() {
        slotsDiv.innerHTML = '';
        sortedArray.forEach((val, idx) => {
          const slot = document.createElement('div');
          slot.className = 'array-slot';
          if (idx === left) slot.classList.add('active-left');
          if (idx === right) slot.classList.add('active-right');
          slot.innerHTML = `<span class="slot-idx">[${idx}]</span><span class="slot-val">${val}</span>`;
          slotsDiv.appendChild(slot);
        });
        valL.textContent = sortedArray[left];
        valR.textContent = sortedArray[right];
        const s = sortedArray[left] + sortedArray[right];
        curSum.textContent = s;
        if (s === target) {
          curSum.className = 'sum-match';
        } else {
          curSum.className = '';
        }
      }

      renderArray();

      container.querySelector('#btn-inc-l').onclick = () => {
        window.spsuAudio.click();
        if (left < right - 1) {
          left++;
          renderArray();
          log.textContent = `Moved L to [${left}]. Sum increased to ${sortedArray[left] + sortedArray[right]}.`;
        } else {
          log.textContent = `Warning: Pointers cannot cross!`;
        }
      };

      container.querySelector('#btn-dec-r').onclick = () => {
        window.spsuAudio.click();
        if (right > left + 1) {
          right--;
          renderArray();
          log.textContent = `Moved R to [${right}]. Sum decreased to ${sortedArray[left] + sortedArray[right]}.`;
        } else {
          log.textContent = `Warning: Pointers cannot cross!`;
        }
      };

      container.querySelector('#btn-lock').onclick = () => {
        const sum = sortedArray[left] + sortedArray[right];
        if (sum === target) {
          window.spsuAudio.success();
          log.innerHTML = `🎯 TARGET LOCKED! ${sortedArray[left]} + ${sortedArray[right]} = ${target}! Array Glitch Neutralized in O(N) operations!`;
          setTimeout(() => onComplete(true, 100), 1200);
        } else {
          window.spsuAudio.error();
          attempts++;
          if (sum < target) {
            log.innerHTML = `❌ Sum ${sum} is LESS than target ${target}! Algorithmic rule: When sum < target, advance LEFT pointer (L++)!`;
          } else {
            log.innerHTML = `❌ Sum ${sum} is GREATER than target ${target}! Algorithmic rule: When sum > target, retract RIGHT pointer (R--)!`;
          }
        }
      };
    }
  },

  {
    id: 2,
    title: "Level 2: The Quantum Stack Turret (LIFO & Syntax Balance)",
    concept: "Stack LIFO Dynamics & Valid Parentheses Parsing",
    logoPart: "roots-mid", // Powers center teal pillars
    badge: { id: "b2", name: "Stack Sentinel", icon: "🥞", desc: "Mastered LIFO memory buffers and balanced expression matching" },
    xpReward: 400,
    aptitudeTip: "💡 Aptitude Logic: A Stack operates strictly on Last-In, First-Out (LIFO). Whenever evaluating nested brackets or undo operations, the most recently opened symbol MUST be the first to close!",
    softSkillScenario: {
      question: "Workplace Aptitude: Your task list has 5 urgent tickets (LIFO interruptions from 3 managers). Deadlines collide at 5 PM. How do you communicate?",
      options: [
        { text: "Apply Eisenhower Matrix: align all 3 stakeholders in a 5-minute sync, clarify company impact, and agree on an explicit priority sequence.", correct: true, feedback: "+150 XP! Stellar prioritization & proactive boundary setting." },
        { text: "Context-switch every 10 minutes trying to secretly finish all 5, submitting half-baked code.", correct: false, feedback: "Zero XP. High risk of defects and burnout." },
        { text: "Work on whichever manager was loudest and ignore the other two.", correct: false, feedback: "Zero XP. Unprofessional communication failure." }
      ]
    },
    init(container, onComplete) {
      const tokens = ['{', '[', '(', ')', ']', '}'];
      let stream = ['{', '[', '(', ')', ']', '}'];
      let stack = [];
      let currentIdx = 0;

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Parse incoming code stream. Push open brackets '{, [, (' and Pop when matching closing brackets arrive!</div>
          <div class="hud-stat">Stream: <span class="highlight-target">${stream.join(' ')}</span></div>
        </div>
        <div class="game-board">
          <div class="stack-arena">
            <div class="stream-viewer">
              <span class="stream-label">CURRENT INCOMING TOKEN:</span>
              <div class="token-active" id="cur-token">${stream[currentIdx]}</div>
            </div>
            <div class="stack-shaft">
              <div class="stack-header">MEMORY STACK (TOP ⬇️)</div>
              <div class="stack-items" id="stack-items">
                <div class="stack-empty">Stack Empty</div>
              </div>
            </div>
          </div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-push">📥 PUSH TOKEN TO STACK</button>
            <button class="btn btn-action" id="btn-pop">📤 POP & MATCH PAIR</button>
          </div>
          <div class="battle-log" id="lvl2-log">Telemetry: Token '${stream[currentIdx]}' is waiting. Open bracket? PUSH it!</div>
        </div>
      `;

      const curTokenEl = container.querySelector('#cur-token');
      const stackItemsEl = container.querySelector('#stack-items');
      const log = container.querySelector('#lvl2-log');

      function updateUI() {
        if (currentIdx < stream.length) {
          curTokenEl.textContent = stream[currentIdx];
        } else {
          curTokenEl.textContent = 'END OF STREAM';
        }
        if (stack.length === 0) {
          stackItemsEl.innerHTML = '<div class="stack-empty">Stack Empty</div>';
        } else {
          stackItemsEl.innerHTML = '';
          for (let i = stack.length - 1; i >= 0; i--) {
            const item = document.createElement('div');
            item.className = 'stack-node';
            if (i === stack.length - 1) item.classList.add('stack-top');
            item.textContent = `${stack[i]} ${i === stack.length - 1 ? '(TOP)' : ''}`;
            stackItemsEl.appendChild(item);
          }
        }
      }

      function isMatching(open, close) {
        return (open === '(' && close === ')') ||
               (open === '[' && close === ']') ||
               (open === '{' && close === '}');
      }

      container.querySelector('#btn-push').onclick = () => {
        window.spsuAudio.laser();
        if (currentIdx >= stream.length) return;
        const tok = stream[currentIdx];
        if (['(', '[', '{'].includes(tok)) {
          stack.push(tok);
          currentIdx++;
          log.textContent = `✅ PUSHED '${tok}' onto stack. Stack height: ${stack.length}`;
          updateUI();
        } else {
          window.spsuAudio.error();
          log.textContent = `⚠️ Cannot PUSH closing bracket '${tok}'! It must POP its matching pair from TOP of stack!`;
        }
      };

      container.querySelector('#btn-pop').onclick = () => {
        window.spsuAudio.click();
        if (currentIdx >= stream.length) {
          if (stack.length === 0) {
            window.spsuAudio.success();
            log.innerHTML = `🎉 COMPILER HARMONY ACHIEVED! All brackets perfectly matched. Stack empty!`;
            setTimeout(() => onComplete(true, 100), 1000);
          }
          return;
        }
        const tok = stream[currentIdx];
        if ([')', ']', '}'].includes(tok)) {
          if (stack.length === 0) {
            window.spsuAudio.error();
            log.textContent = `❌ Stack Underflow! Closing bracket '${tok}' has no matching opener!`;
            return;
          }
          const top = stack.pop();
          if (isMatching(top, tok)) {
            window.spsuAudio.success();
            currentIdx++;
            log.textContent = `💥 MATCHED & NEUTRALIZED: '${top}' with '${tok}'!`;
            updateUI();
            if (currentIdx === stream.length && stack.length === 0) {
              log.innerHTML = `🎉 COMPILER HARMONY ACHIEVED! Stack balanced!`;
              setTimeout(() => onComplete(true, 100), 1200);
            }
          } else {
            window.spsuAudio.error();
            log.textContent = `❌ SYNTAX MISMATCH! Top is '${top}', but incoming was '${tok}'!`;
            stack.push(top);
          }
        } else {
          window.spsuAudio.error();
          log.textContent = `⚠️ '${tok}' is an opening bracket! Opening brackets must be PUSHED!`;
        }
      };
    }
  },

  {
    id: 3,
    title: "Level 3: The Linked Chrono-Chain (Pointers & Loop Breaker)",
    concept: "Singly Linked List Manipulation & Floyd's Cycle Detection",
    logoPart: "roots-right", // Powers right teal pillars
    badge: { id: "b3", name: "Pointer Pioneer", icon: "🔗", desc: "Successfully rewired address pointers and severed an infinite cycle" },
    xpReward: 450,
    aptitudeTip: "💡 Logic Tip (Floyd's Algorithm): If a Slow Pointer moves 1 step and a Fast Pointer moves 2 steps, they are GUARANTEED to collide inside a cycle of length C in at most C steps. Relative speed = 1 step/cycle!",
    softSkillScenario: {
      question: "Collaboration Skill: During an architectural review, another engineer proposes an overcomplicated recursive link structure. You know an iterative pointer approach is 10x faster and safer. How do you respond?",
      options: [
        { text: "\"I appreciate your creative approach! Let's benchmark both on latency and call-stack limits with a quick 5-minute test so the telemetry decides.\"", correct: true, feedback: "+150 XP! Collaborative, data-driven, and respectful disagreement without friction." },
        { text: "\"That's completely unviable, did you even study Big-O notation?\"", correct: false, feedback: "Zero XP. Demeaning peers creates resistance and destroys team psychological safety." },
        { text: "\"Whatever, do what you want, I won't be on-call when it crashes.\"", correct: false, feedback: "Zero XP. Cynical detachment hurts product quality." }
      ]
    },
    init(container, onComplete) {
      let chain = [
        { id: 101, val: "0x1A", next: 102 },
        { id: 102, val: "0x2B", next: 103 },
        { id: 103, val: "0x3C", next: 104 },
        { id: 104, val: "0x4D", next: 102 }, // Cycle back to 102!
        { id: 105, val: "0x5E (EXIT)", next: null }
      ];

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Sever the infinite memory cycle trap! Node 104 is looping back to Node 102 instead of exiting to 105!</div>
          <div class="hud-stat">Algorithm: <span class="badge-time">Floyd's Cycle Severance</span></div>
        </div>
        <div class="game-board">
          <div class="chain-diagram" id="chain-visual"></div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-sever">✂️ SEVER CYCLE: Point Node 104 -> 105 (EXIT)</button>
            <button class="btn btn-action" id="btn-traverse">🚀 RUN POINTER TEST RUNNER</button>
          </div>
          <div class="battle-log" id="lvl3-log">Telemetry: Loop detected! Node [104] next address is currently [102]. Click SEVER to redirect next pointer!</div>
        </div>
      `;

      const visual = container.querySelector('#chain-visual');
      const log = container.querySelector('#lvl3-log');
      let isSevered = false;

      function renderChain() {
        visual.innerHTML = '';
        chain.forEach((node) => {
          const nodeBox = document.createElement('div');
          nodeBox.className = 'chain-node';
          const nextTarget = node.next ? `-> [${node.next}]` : '-> NULL';
          const isGlitch = node.id === 104 && !isSevered;
          if (isGlitch) nodeBox.classList.add('node-glitch');
          if (node.id === 105) nodeBox.classList.add('node-exit');
          nodeBox.innerHTML = `
            <div class="node-id">ID: ${node.id}</div>
            <div class="node-val">${node.val}</div>
            <div class="node-pointer">${nextTarget}</div>
          `;
          visual.appendChild(nodeBox);
        });
      }

      renderChain();

      container.querySelector('#btn-sever').onclick = () => {
        window.spsuAudio.laser();
        chain[3].next = 105;
        isSevered = true;
        renderChain();
        log.innerHTML = `⚡ POINTER REWIRED: Node 104 now points directly to Exit Node 105! Click 'RUN POINTER TEST RUNNER' to verify!`;
      };

      container.querySelector('#btn-traverse').onclick = () => {
        window.spsuAudio.click();
        if (!isSevered) {
          window.spsuAudio.error();
          log.innerHTML = `⚠️ CRITICAL EXCEPTION: Infinite Loop Traversal! 101 -> 102 -> 103 -> 104 -> 102 -> 103... Call stack exhausted! Sever the link first!`;
        } else {
          window.spsuAudio.success();
          log.innerHTML = `🎉 POINTER REACHED NULL SAFELY! Traversed 101 -> 102 -> 103 -> 104 -> 105 -> NULL! Memory stream stabilized!`;
          setTimeout(() => onComplete(true, 100), 1200);
        }
      };
    }
  },

  {
    id: 4,
    title: "Level 4: The Binary Search Sonar (Divide & Conquer)",
    concept: "Logarithmic Search O(log N) & Midpoint Bisect",
    logoPart: "divider-line", // Powers the central horizon line of SPSU logo
    badge: { id: "b4", name: "Divide & Conquerer", icon: "🎯", desc: "Located hidden target in O(log N) steps with binary bisection" },
    xpReward: 500,
    aptitudeTip: "💡 Aptitude Tip: For 1,000 items, Linear Search takes up to 1,000 checks. Binary Search takes at most 10 (2¹⁰ = 1024)! Every single check cuts the unknown search space exactly in half!",
    softSkillScenario: {
      question: "Critical Thinking Dilemma: You have 10 candidate bugs causing system latency. Executive leadership demands an immediate root cause in 30 minutes. What strategy demonstrates high-level aptitude?",
      options: [
        { text: "Bisect the deployment history using binary search (git bisect) to isolate the exact commit causing the regression, backing up findings with timestamp logs.", correct: true, feedback: "+150 XP! Brilliant engineering methodology that executives trust." },
        { text: "Guess the bug based on gut feeling and patch random configuration files live in production.", correct: false, feedback: "Zero XP. Dangerous anti-pattern." },
        { text: "Send a lengthy email complaining that 30 minutes is unfair and refuse to investigate.", correct: false, feedback: "Zero XP. Poor adaptability and crisis communication." }
      ]
    },
    init(container, onComplete) {
      const secret = 67; // Target between 1 and 100
      let low = 1;
      let high = 100;
      let pingsLeft = 7; // log2(100) ≈ 6.64

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Pinpoint the stealth cyber-satellite frequency between <span class="highlight-target">1 and 100</span>!</div>
          <div class="hud-stat">Max Allowed Pings: <span id="pings-count" class="highlight-target">${pingsLeft}</span> (O(log₂ 100) = 7)</div>
        </div>
        <div class="game-board">
          <div class="sonar-range-box">
            <div class="range-indicator">CURRENT ACTIVE SEARCH DOMAIN: [<span id="disp-low">${low}</span> ... <span id="disp-high">${high}</span>]</div>
            <div class="mid-calc">Calculated Midpoint: <code>mid = ${low} + (${high} - ${low}) / 2 = <b id="disp-mid">${Math.floor(low + (high - low)/2)}</b></code></div>
          </div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-ping-mid">📡 PING MIDPOINT (PROBE FREQUENCY)</button>
          </div>
          <div class="battle-log" id="lvl4-log">Radar ready. Click 'PING MIDPOINT' to test the calculated bisection!</div>
        </div>
      `;

      const dispLow = container.querySelector('#disp-low');
      const dispHigh = container.querySelector('#disp-high');
      const dispMid = container.querySelector('#disp-mid');
      const pingsCount = container.querySelector('#pings-count');
      const log = container.querySelector('#lvl4-log');

      container.querySelector('#btn-ping-mid').onclick = () => {
        if (pingsLeft <= 0) {
          window.spsuAudio.error();
          log.textContent = `❌ OUT OF PINGS! Resetting frequency radar.`;
          low = 1; high = 100; pingsLeft = 7;
          dispLow.textContent = low; dispHigh.textContent = high;
          dispMid.textContent = Math.floor(low + (high - low)/2);
          pingsCount.textContent = pingsLeft;
          return;
        }

        const mid = Math.floor(low + (high - low)/2);
        pingsLeft--;
        pingsCount.textContent = pingsLeft;
        window.spsuAudio.laser();

        if (mid === secret) {
          window.spsuAudio.success();
          log.innerHTML = `🎯 DIRECT HIT AT FREQUENCY ${mid}! Target neutralized in ${7 - pingsLeft} pings! O(log N) mastery confirmed!`;
          setTimeout(() => onComplete(true, 100), 1200);
        } else if (mid < secret) {
          window.spsuAudio.click();
          log.innerHTML = `📡 SONAR FEEDBACK: Midpoint ${mid} is TOO LOW! Target is in the upper half! Setting low = ${mid + 1}.`;
          low = mid + 1;
        } else {
          window.spsuAudio.click();
          log.innerHTML = `📡 SONAR FEEDBACK: Midpoint ${mid} is TOO HIGH! Target is in the lower half! Setting high = ${mid - 1}.`;
          high = mid - 1;
        }

        dispLow.textContent = low;
        dispHigh.textContent = high;
        dispMid.textContent = Math.floor(low + (high - low)/2);
      };
    }
  },

  {
    id: 5,
    title: "Level 5: The Sorting Engine (QuickSort & Pivot Partition)",
    concept: "Divide & Conquer Pivot Partitioning (O(N log N))",
    logoPart: "divider-line", // Strengthens central resonance
    badge: { id: "b5", name: "Sorting Sorcerer", icon: "⚡", desc: "Executed in-place pivot partition separating elements in O(N log N)" },
    xpReward: 550,
    aptitudeTip: "💡 Logic Shortcut: QuickSort chooses a Pivot. Everything smaller moves to left, everything larger moves to right. If pivot divides evenly each time, recurrence is T(N) = 2T(N/2) + O(N) = O(N log N)!",
    softSkillScenario: {
      question: "Decision Making in Ambiguity: Two senior developers disagree passionately on whether to use MergeSort (stable, extra O(N) memory) vs QuickSort (in-place, worst case O(N²)) for a critical dataset. How do you facilitate?",
      options: [
        { text: "Ask the key constraint question: \"Is memory on this micro-controller constrained, and do we require stable ordering of identical timestamps?\" Choose based on constraints, not dogma.", correct: true, feedback: "+150 XP! Excellent objective leadership that resolves engineering stalemates." },
        { text: "Flip a coin so everyone moves on quickly.", correct: false, feedback: "Zero XP. Engineering architecture requires deliberate constraint evaluation." },
        { text: "Implement your own custom sorting algorithm in O(N³) to surprise them both.", correct: false, feedback: "Zero XP. Reinventing worse wheels wastes company resources." }
      ]
    },
    init(container, onComplete) {
      let data = [45, 12, 89, 34, 67, 23];
      const pivot = 40; // Split around 40

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Partition the data around Pivot <span class="highlight-target">${pivot}</span>!</div>
          <div class="hud-stat">Rule: Elements &lt; ${pivot} must be on LEFT, &gt;= ${pivot} on RIGHT!</div>
        </div>
        <div class="game-board">
          <div class="sort-slots" id="sort-items"></div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-check-partition">⚡ VERIFY PARTITION INTEGRITY</button>
            <button class="btn btn-action" id="btn-quick-solve">🪄 AUTO-OPTIMIZE SWAP STEP</button>
          </div>
          <div class="battle-log" id="lvl5-log">Telemetry: Click any two elements to SWAP their positions until all elements < ${pivot} are on the left!</div>
        </div>
      `;

      const slots = container.querySelector('#sort-items');
      const log = container.querySelector('#lvl5-log');
      let selectedIdx = null;

      function render() {
        slots.innerHTML = '';
        data.forEach((val, idx) => {
          const item = document.createElement('div');
          item.className = 'sort-card';
          if (val < pivot) item.classList.add('less-pivot');
          else item.classList.add('more-pivot');
          if (idx === selectedIdx) item.classList.add('selected');
          item.innerHTML = `<div class="card-val">${val}</div><div class="card-tag">${val < pivot ? '< 40' : '>= 40'}</div>`;
          item.onclick = () => handleSelect(idx);
          slots.appendChild(item);
        });
      }

      function handleSelect(idx) {
        window.spsuAudio.click();
        if (selectedIdx === null) {
          selectedIdx = idx;
          log.textContent = `Selected element ${data[idx]}. Click another element to SWAP!`;
          render();
        } else {
          // Swap
          const temp = data[selectedIdx];
          data[selectedIdx] = data[idx];
          data[idx] = temp;
          log.textContent = `Swapped ${temp} with ${data[selectedIdx]}!`;
          selectedIdx = null;
          render();
        }
      }

      container.querySelector('#btn-quick-solve').onclick = () => {
        window.spsuAudio.laser();
        data.sort((a, b) => a - b);
        log.textContent = `Partition aligned via algorithmic comparator!`;
        render();
      };

      container.querySelector('#btn-check-partition').onclick = () => {
        // Check if all elements < 40 come before elements >= 40
        let crossedOver = false;
        let valid = true;
        for (let i = 0; i < data.length; i++) {
          if (data[i] >= pivot) {
            crossedOver = true;
          } else if (crossedOver && data[i] < pivot) {
            valid = false;
            break;
          }
        }
        if (valid) {
          window.spsuAudio.success();
          log.innerHTML = `🎉 PERFECT PARTITION! All values < ${pivot} are on left, all values >= ${pivot} are on right!`;
          setTimeout(() => onComplete(true, 100), 1200);
        } else {
          window.spsuAudio.error();
          log.innerHTML = `❌ INVALID PARTITION! There is still an element < ${pivot} sitting to the right of an element >= ${pivot}! Swap them!`;
        }
      };

      render();
    }
  },

  {
    id: 6,
    title: "Level 6: The Upper Canopy (Binary Search Trees & AVL Rebalance)",
    concept: "Binary Search Tree Invariants & Rotation Balance Factor",
    logoPart: "canopy-center", // Powers the center trunk of SPSU tree
    badge: { id: "b6", name: "Tree Titan", icon: "🌳", desc: "Constructed balanced BST and resolved degenerate skew with AVL rotation" },
    xpReward: 600,
    aptitudeTip: "💡 Aptitude Tip: A degenerate/skewed BST degrades to a linked list with O(N) lookup. Self-balancing AVL trees maintain height H <= 1.44 log₂(N) via rotations, guaranteeing O(log N) search!",
    softSkillScenario: {
      question: "Organizational Logic: You are structuring an engineering team hierarchy of 30 developers. If one manager has 29 direct reports (degenerate tree), communication bottlenecks. What tree principle applies?",
      options: [
        { text: "Balanced Hierarchy (Span of Control): Form balanced sub-teams (Pods of 4-6 engineers with Tech Leads) so feedback propagates in O(log N) time rather than O(N) linear lag.", correct: true, feedback: "+150 XP! Superb organizational aptitude matching computer science principles!" },
        { text: "Have every engineer report to everyone else simultaneously in a complete mesh graph.", correct: false, feedback: "Zero XP. Communication overhead explodes to O(N²)." },
        { text: "Eliminate all structure and let tickets randomly assign with no team leads.", correct: false, feedback: "Zero XP. Chaos and uncoordinated delivery." }
      ]
    },
    init(container, onComplete) {
      // Skewed BST: 10 -> 20 -> 30 (Right-Right heavy, needs Left Rotation!)
      let isRotated = false;

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Fix the degenerate BST! Nodes [10 -> 20 -> 30] are right-heavy (Balance Factor = -2). Execute a Left Rotation on Node 10!</div>
          <div class="hud-stat">Target: Root becomes <span class="highlight-target">20</span> with Left Child <span class="highlight-target">10</span> and Right Child <span class="highlight-target">30</span></div>
        </div>
        <div class="game-board">
          <div class="tree-canvas" id="tree-canvas"></div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-left-rotate">🔄 EXECUTE LEFT ROTATION (AVL REBALANCE)</button>
          </div>
          <div class="battle-log" id="lvl6-log">Telemetry: Current Tree is unhealthily skewed! Search efficiency is O(N). Trigger AVL rotation to balance!</div>
        </div>
      `;

      const treeCanvas = container.querySelector('#tree-canvas');
      const log = container.querySelector('#lvl6-log');

      function drawTree() {
        if (!isRotated) {
          treeCanvas.innerHTML = `
            <div class="skewed-tree">
              <div class="tree-node node-root">10 (Root, BF = -2)</div>
              <div class="tree-branch-down">↘️</div>
              <div class="tree-node node-mid" style="margin-left: 60px;">20 (Right Child)</div>
              <div class="tree-branch-down" style="margin-left: 100px;">↘️</div>
              <div class="tree-node node-leaf" style="margin-left: 120px;">30 (Right Grandchild)</div>
            </div>
          `;
        } else {
          treeCanvas.innerHTML = `
            <div class="balanced-tree">
              <div class="tree-node node-root" style="border-color: #00e5ff; box-shadow: 0 0 20px #00e5ff;">20 (Balanced Root, BF = 0)</div>
              <div class="tree-sub-branches">
                <div class="tree-node node-left-child">↙️ 10 (Left Child)</div>
                <div class="tree-node node-right-child">↘️ 30 (Right Child)</div>
              </div>
            </div>
          `;
        }
      }

      drawTree();

      container.querySelector('#btn-left-rotate').onclick = () => {
        window.spsuAudio.laser();
        isRotated = true;
        drawTree();
        window.spsuAudio.success();
        log.innerHTML = `🎉 AVL ROTATION COMPLETE! Node 20 lifted to root! Heights balanced: h(Left)=1, h(Right)=1. BST O(log N) search restored! SPSU Tree canopy lights up!`;
        setTimeout(() => onComplete(true, 100), 1300);
      };
    }
  },

  {
    id: 7,
    title: "Level 7: The Neural Web (Graph Traversal & BFS Route)",
    concept: "Breadth-First Search (Queue) & Unweighted Shortest Path",
    logoPart: "canopy-left", // Powers left neural circuit branches
    badge: { id: "b7", name: "Graph Grandmaster", icon: "🕸️", desc: "Navigated complex adjacency network via Breadth-First Search" },
    xpReward: 650,
    aptitudeTip: "💡 Logic Rule: BFS explores level-by-level using a FIFO Queue. It is MATHEMATICALLY GUARANTEED to find the path with the fewest edges in any unweighted graph!",
    softSkillScenario: {
      question: "Cross-Functional Negotiation: You need an API route from the Data Science team, but their sprint is booked. How do you negotiate the shortest path to alignment?",
      options: [
        { text: "\"Can we co-define the JSON schema contract first? That way your team can build the endpoint whenever ready, while we mock it and keep moving with zero blockers.\"", correct: true, feedback: "+150 XP! Top-tier engineering diplomacy! Decouples dependencies and maintains velocity." },
        { text: "Escalate immediately to the VP demanding they drop their current sprint tasks.", correct: false, feedback: "Zero XP. Burning bridges with peer teams." },
        { text: "Build an unauthorized scraper against their private internal database.", correct: false, feedback: "Zero XP. Security violation that breaks production." }
      ]
    },
    init(container, onComplete) {
      // Graph nodes: S -> A -> D -> T (Target) vs S -> B -> C -> E -> T
      let selectedPath = ['S'];
      const correctShortestPath = ['S', 'A', 'D', 'T'];

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Find the SHORTEST PATH from Core Server [S] to Mainframe [T] using BFS level traversal!</div>
          <div class="hud-stat">Selected Path: <span id="path-disp" class="highlight-target">[S]</span> (Shortest = 3 Hops)</div>
        </div>
        <div class="game-board">
          <div class="graph-network" id="graph-network">
            <div class="graph-row">
              <button class="graph-node-btn active-node" data-id="S">CORE [S]</button>
            </div>
            <div class="graph-row">
              <button class="graph-node-btn" data-id="A">NODE [A] (Direct from S)</button>
              <button class="graph-node-btn" data-id="B">NODE [B] (Direct from S)</button>
            </div>
            <div class="graph-row">
              <button class="graph-node-btn" data-id="D">NODE [D] (From A)</button>
              <button class="graph-node-btn" data-id="C">NODE [C] (From B)</button>
            </div>
            <div class="graph-row">
              <button class="graph-node-btn" data-id="E">NODE [E] (From C)</button>
              <button class="graph-node-btn" data-id="T">MAINFRAME [T] (Goal!)</button>
            </div>
          </div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-verify-path">⚡ VERIFY BFS SHORTEST ROUTE</button>
            <button class="btn btn-action" id="btn-reset-path">🔄 RESET ROUTE</button>
          </div>
          <div class="battle-log" id="lvl7-log">Telemetry: Start at S. Click connected nodes in order: S -> A -> D -> T!</div>
        </div>
      `;

      const pathDisp = container.querySelector('#path-disp');
      const log = container.querySelector('#lvl7-log');
      const buttons = container.querySelectorAll('.graph-node-btn');

      buttons.forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute('data-id');
          if (id === 'S') return;
          window.spsuAudio.click();
          if (!selectedPath.includes(id)) {
            selectedPath.push(id);
            btn.classList.add('active-node');
            pathDisp.textContent = `[${selectedPath.join(' ➡️ ')}]`;
            log.textContent = `Added node [${id}] to route.`;
          }
        };
      });

      container.querySelector('#btn-reset-path').onclick = () => {
        selectedPath = ['S'];
        buttons.forEach(b => {
          if (b.getAttribute('data-id') !== 'S') b.classList.remove('active-node');
        });
        pathDisp.textContent = '[S]';
        log.textContent = 'Route reset to [S].';
      };

      container.querySelector('#btn-verify-path').onclick = () => {
        const isMatch = selectedPath.length === correctShortestPath.length &&
          selectedPath.every((val, idx) => val === correctShortestPath[idx]);

        if (isMatch) {
          window.spsuAudio.success();
          log.innerHTML = `🎉 OPTIMAL BFS ROUTE CONFIRMED! S -> A -> D -> T (3 edges)! Left branches of the SPSU Logo energized!`;
          setTimeout(() => onComplete(true, 100), 1200);
        } else {
          window.spsuAudio.error();
          log.innerHTML = `❌ NOT THE BFS SHORTEST PATH! BFS expands radially level by level. The shortest path from S to T requires exactly 3 hops (S -> A -> D -> T).`;
        }
      };
    }
  },

  {
    id: 8,
    title: "Level 8: The Backtracking Vault (N-Queens Cyber-Shield)",
    concept: "Recursive State Exploration & Backtrack Constraint Satisfaction",
    logoPart: "canopy-right", // Powers right neural circuit branches
    badge: { id: "b8", name: "Backtrack Blade", icon: "⚔️", desc: "Solved constraint satisfaction problem using state unwinding" },
    xpReward: 700,
    aptitudeTip: "💡 Logic Tip: Backtracking is an algorithmic paradigm that abandons a candidate path as soon as it determines the candidate CANNOT possibly lead to a valid solution ('pruning the decision tree').",
    softSkillScenario: {
      question: "Resilience in Practice: You spend 2 weeks writing a feature, but user feedback tests show 80% confusion. The product manager proposes pivoting and undoing the approach. How do you respond?",
      options: [
        { text: "\"Let's treat this like an algorithmic backtrack: our tests proved this branch invalid early before launch, saving months. Let's harvest the reusable modules and pivot to the verified path.\"", correct: true, feedback: "+150 XP! True senior engineering mindset! Zero ego, 100% focused on product excellence." },
        { text: "Argue that the users are simply not smart enough to understand your genius code.", correct: false, feedback: "Zero XP. Customer empathy failure." },
        { text: "Refuse to delete a single line of code and force the feature to ship.", correct: false, feedback: "Zero XP. Sunk cost fallacy." }
      ]
    },
    init(container, onComplete) {
      // 4x4 Grid for 4-Queens. Valid solution: (row 0, col 1), (row 1, col 3), (row 2, col 0), (row 3, col 2)
      let queens = [-1, -1, -1, -1]; // queens[row] = col

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Place 4 Cyber-Sentinels on the 4x4 matrix so NO TWO attack each other along Rows, Columns, or Diagonals!</div>
          <div class="hud-stat">Queens Placed: <span id="q-count" class="highlight-target">0 / 4</span></div>
        </div>
        <div class="game-board">
          <div class="chess-grid" id="chess-grid"></div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-check-queens">⚡ VALIDATE SENTINEL SHIELD</button>
            <button class="btn btn-action" id="btn-backtrack-one">⏪ BACKTRACK LAST PLACEMENT</button>
            <button class="btn btn-action" id="btn-auto-solve">✨ HINT (VALID 4-QUEENS PATTERN)</button>
          </div>
          <div class="battle-log" id="lvl8-log">Click any cell to place a sentinel in that row. Only 1 per row allowed!</div>
        </div>
      `;

      const grid = container.querySelector('#chess-grid');
      const qCount = container.querySelector('#q-count');
      const log = container.querySelector('#lvl8-log');

      function renderGrid() {
        grid.innerHTML = '';
        let placed = 0;
        for (let r = 0; r < 4; r++) {
          const rowDiv = document.createElement('div');
          rowDiv.className = 'chess-row';
          for (let c = 0; c < 4; c++) {
            const cell = document.createElement('div');
            cell.className = 'chess-cell';
            if ((r + c) % 2 === 1) cell.classList.add('cell-dark');
            if (queens[r] === c) {
              cell.classList.add('has-queen');
              cell.innerHTML = '🛡️';
              placed++;
            }
            cell.onclick = () => {
              window.spsuAudio.click();
              if (queens[r] === c) {
                queens[r] = -1; // Remove
              } else {
                queens[r] = c; // Place
              }
              renderGrid();
            };
            rowDiv.appendChild(cell);
          }
          grid.appendChild(rowDiv);
        }
        qCount.textContent = `${placed} / 4`;
      }

      function hasConflicts() {
        for (let i = 0; i < 4; i++) {
          if (queens[i] === -1) return true; // not full
          for (let j = i + 1; j < 4; j++) {
            if (queens[j] === -1) continue;
            // same column
            if (queens[i] === queens[j]) return true;
            // diagonal
            if (Math.abs(queens[i] - queens[j]) === Math.abs(i - j)) return true;
          }
        }
        return false;
      }

      container.querySelector('#btn-check-queens').onclick = () => {
        const placed = queens.filter(c => c !== -1).length;
        if (placed < 4) {
          window.spsuAudio.error();
          log.innerHTML = `⚠️ Need 4 sentinels placed! Currently only ${placed} active.`;
          return;
        }
        if (!hasConflicts()) {
          window.spsuAudio.success();
          log.innerHTML = `🎉 N-QUEENS CONSTRAINT SATISFIED! Zero row, column, or diagonal conflicts! The Right Canopy of the SPSU logo blazes with power!`;
          setTimeout(() => onComplete(true, 100), 1200);
        } else {
          window.spsuAudio.error();
          log.innerHTML = `❌ CONFLICT DETECTED! Two sentinels can attack each other along the same column or diagonal! Backtrack and adjust!`;
        }
      };

      container.querySelector('#btn-backtrack-one').onclick = () => {
        window.spsuAudio.laser();
        for (let i = 3; i >= 0; i--) {
          if (queens[i] !== -1) {
            queens[i] = -1;
            break;
          }
        }
        renderGrid();
        log.textContent = `⏪ Backtracked last placement! Pruned candidate branch.`;
      };

      container.querySelector('#btn-auto-solve').onclick = () => {
        window.spsuAudio.laser();
        queens = [1, 3, 0, 2]; // Classic solution
        renderGrid();
        log.textContent = `Loaded classic N-Queens solution: cols [1, 3, 0, 2]! Validate now!`;
      };

      renderGrid();
    }
  },

  {
    id: 9,
    title: "Level 9: The Matrix Forge (Dynamic Programming & Memoization)",
    concept: "Overlapping Subproblems, Optimal Substructure & 0/1 Knapsack",
    logoPart: "canopy-top", // Powers top circuit terminal tips
    badge: { id: "b9", name: "DP Dynamo", icon: "🧠", desc: "Constructed bottom-up memoization table to eliminate 2^N redundant work" },
    xpReward: 750,
    aptitudeTip: "💡 Aptitude Logic: When a problem exhibits Overlapping Subproblems and Optimal Substructure, pure recursion does 2ⁿ computations. Dynamic Programming stores previous answers in a table, dropping time complexity to polynomial O(N × W)!",
    softSkillScenario: {
      question: "Engineering Aptitude & Efficiency: Your team is repeatedly answering the same client onboarding questions every week, spending 15 hours each sprint. What is the DP (Memoization) equivalent in team management?",
      options: [
        { text: "Create a living, searchable Onboarding Knowledge Base & interactive FAQ documentation (Memoize once, query O(1) forever), liberating 15 engineering hours weekly.", correct: true, feedback: "+150 XP! Engineering leverage at its finest! Never solve the same solved problem twice." },
        { text: "Hire 3 more engineers just to re-type the same answers repeatedly.", correct: false, feedback: "Zero XP. Linear waste of capital." },
        { text: "Ignore the client questions completely and close their support tickets.", correct: false, feedback: "Zero XP. Destroying client relationships." }
      ]
    },
    init(container, onComplete) {
      // 0/1 Knapsack mini game: Max weight = 4 kg.
      // Items:
      // Item 1: W=1, V=$15
      // Item 2: W=2, V=$20
      // Item 3: W=3, V=$30
      // Optimal combo: Item 1 + Item 3 = W: 4kg, Value: $45
      let selectedItems = [];

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">MISSION: Pack the Quantum Core Vault to maximize ENERGY VALUE without exceeding MAX WEIGHT <span class="highlight-target">4 KG</span>!</div>
          <div class="hud-stat">Current Weight: <span id="cur-w" class="highlight-target">0</span> / 4 kg | Current Value: <span id="cur-v" class="highlight-target">$0</span></div>
        </div>
        <div class="game-board">
          <div class="knapsack-items">
            <div class="item-card" data-idx="0">
              <div class="item-title">🔋 Quantum Cell A</div>
              <div class="item-stats">Weight: <b>1 kg</b> | Value: <b>$15</b></div>
            </div>
            <div class="item-card" data-idx="1">
              <div class="item-title">💎 Cryo Crystal B</div>
              <div class="item-stats">Weight: <b>2 kg</b> | Value: <b>$20</b></div>
            </div>
            <div class="item-card" data-idx="2">
              <div class="item-title">⚡ Plasma Rod C</div>
              <div class="item-stats">Weight: <b>3 kg</b> | Value: <b>$30</b></div>
            </div>
          </div>
          <div class="dp-table-preview">
            <div class="dp-title">OPTIMAL DP EQUATION: <code>dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])</code></div>
          </div>
          <div class="controls-panel">
            <button class="btn btn-action" id="btn-verify-dp">⚡ ENGAGE OPTIMAL PAYLOAD</button>
            <button class="btn btn-action" id="btn-reset-dp">🔄 CLEAR VAULT</button>
          </div>
          <div class="battle-log" id="lvl9-log">Click on the items to toggle their selection! Target maximum possible value under 4 kg!</div>
        </div>
      `;

      const items = [
        { name: "A", w: 1, v: 15 },
        { name: "B", w: 2, v: 20 },
        { name: "C", w: 3, v: 30 }
      ];

      const curW = container.querySelector('#cur-w');
      const curV = container.querySelector('#cur-v');
      const log = container.querySelector('#lvl9-log');
      const cardEls = container.querySelectorAll('.item-card');

      function updateKnapsack() {
        let totalW = 0;
        let totalV = 0;
        selectedItems.forEach(idx => {
          totalW += items[idx].w;
          totalV += items[idx].v;
        });
        curW.textContent = `${totalW}`;
        curV.textContent = `$${totalV}`;
        cardEls.forEach(card => {
          const idx = parseInt(card.getAttribute('data-idx'));
          if (selectedItems.includes(idx)) card.classList.add('selected');
          else card.classList.remove('selected');
        });
      }

      cardEls.forEach(card => {
        card.onclick = () => {
          window.spsuAudio.click();
          const idx = parseInt(card.getAttribute('data-idx'));
          if (selectedItems.includes(idx)) {
            selectedItems = selectedItems.filter(i => i !== idx);
          } else {
            selectedItems.push(idx);
          }
          updateKnapsack();
        };
      });

      container.querySelector('#btn-reset-dp').onclick = () => {
        selectedItems = [];
        updateKnapsack();
        log.textContent = 'Vault emptied.';
      };

      container.querySelector('#btn-verify-dp').onclick = () => {
        let totalW = 0;
        let totalV = 0;
        selectedItems.forEach(idx => {
          totalW += items[idx].w;
          totalV += items[idx].v;
        });

        if (totalW > 4) {
          window.spsuAudio.error();
          log.innerHTML = `❌ VAULT OVERWEIGHT! ${totalW} kg exceeds 4 kg limit! Knapsack constraint violated!`;
        } else if (totalV === 45 && totalW === 4) {
          window.spsuAudio.success();
          log.innerHTML = `🎉 GLOBAL OPTIMAL SOLUTION REACHED! Packed Item A ($15, 1kg) + Item C ($30, 3kg) = $45 value at exactly 4kg! DP Memoization Mastered!`;
          setTimeout(() => onComplete(true, 100), 1200);
        } else {
          window.spsuAudio.error();
          log.innerHTML = `⚠️ Suboptimal payload ($${totalV}, ${totalW}kg). The optimal substructure can yield up to $45! Try another combination!`;
        }
      };
    }
  },

  {
    id: 10,
    title: "Level 10: The Grand SPSU Apex Boss (Algorithmic Gauntlet)",
    concept: "Grand Synthesis: Arrays, Trees, Graphs, DP & Behavioral Leadership",
    logoPart: "all", // Powers entire SPSU logo into full hyper-drive!
    badge: { id: "b10", name: "SPSU Apex Champion", icon: "👑", desc: "Defeated the Corrupted Glitch King and restored the SPSU Cyber-Matrix" },
    xpReward: 1000,
    aptitudeTip: "💡 The Ultimate Engineering Truth: Algorithms give you the raw computational power, but emotional intelligence, clear communication, and resilience build world-changing products!",
    softSkillScenario: {
      question: "Final Boss Interview Test (STAR Method): In your final executive interview, the CTO asks: 'Tell me about a time you faced an impossible system crisis and how you led the team through it.' What is the champion response?",
      options: [
        { text: "STAR Structure: 'Situation: Black Friday crash. Task: Restore checkout in 15 mins. Action: Isolated corrupted cache via binary bisect, kept executives updated every 5 mins with transparent telemetry. Result: Zero data loss, 99.99% uptime restored, and authored preventive runbooks.'", correct: true, feedback: "+250 XP! PERFECT STAR FRAMEWORK! The CTO stands and applauds. You are officially an SPSU Algorithmic Grandmaster!" },
        { text: "'I just worked really hard and yelled at everyone until the server worked again.'", correct: false, feedback: "Zero XP. Fails behavioral competency." },
        { text: "'I've never faced a crisis because my code is always 100% bug-free.'", correct: false, feedback: "Zero XP. Demonstrates lack of real-world experience and humility." }
      ]
    },
    init(container, onComplete) {
      let bossHP = 100;

      container.innerHTML = `
        <div class="level-hud">
          <div class="hud-target">⚔️ FINAL APEX BATTLE: THE CORRUPTED GLITCH KING HAS HIJACKED THE SPSU LOGO!</div>
          <div class="hud-stat">Glitch King HP: <span id="boss-hp" class="highlight-target">100 / 100</span></div>
        </div>
        <div class="game-board">
          <div class="boss-arena">
            <div class="boss-avatar">
              <div class="boss-core" id="boss-core">👾 [CORRUPTED GLITCH KING]</div>
              <div class="boss-hp-bar"><div class="boss-hp-fill" id="boss-hp-fill" style="width: 100%;"></div></div>
            </div>
            <div class="weapons-grid">
              <button class="btn btn-action weapon-btn" id="wpn-two-pointer">🏹 Two-Pointer Array Volley (-25 HP)</button>
              <button class="btn btn-action weapon-btn" id="wpn-binary-sonar">🎯 O(log N) Binary Laser (-25 HP)</button>
              <button class="btn btn-action weapon-btn" id="wpn-graph-bfs">⚡ BFS Network EMP Blast (-25 HP)</button>
              <button class="btn btn-action weapon-btn" id="wpn-dp-knapsack">🧠 Dynamic Programming Overload (-25 HP)</button>
            </div>
          </div>
          <div class="battle-log" id="lvl10-log">The Glitch King is absorbing campus bandwidth! Unleash your full algorithmic arsenal to purge the virus!</div>
        </div>
      `;

      const hpEl = container.querySelector('#boss-hp');
      const hpFill = container.querySelector('#boss-hp-fill');
      const log = container.querySelector('#lvl10-log');
      const weapons = container.querySelectorAll('.weapon-btn');

      weapons.forEach(btn => {
        btn.onclick = () => {
          if (bossHP <= 0) return;
          window.spsuAudio.bossHit();
          bossHP = Math.max(0, bossHP - 25);
          hpEl.textContent = `${bossHP} / 100`;
          hpFill.style.width = `${bossHP}%`;
          btn.disabled = true;
          btn.style.opacity = '0.5';

          if (bossHP > 0) {
            log.innerHTML = `💥 DIRECT HIT! Algorithmic strike dealt 25 damage! Glitch King HP reduced to ${bossHP}!`;
          } else {
            window.spsuAudio.levelUp();
            log.innerHTML = `👑 GLITCH KING DEFEATED! The SPSU Logo core is 100% PURIFIED & RADIATING UNSTOPPABLE NEON LIGHT!`;
            setTimeout(() => onComplete(true, 100), 1500);
          }
        };
      });
    }
  }
];

window.SPSU_LEVELS = SPSU_LEVELS;
