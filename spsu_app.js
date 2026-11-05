// SPSU DSA Odyssey - Core Application Engine & State Controller

class SPSUGameApp {
  constructor() {
    this.state = {
      playerName: '',
      avatar: '🚀',
      xp: 0,
      unlockedLevel: 1,
      badges: [],
      levelStars: {},
      currentLevelId: null
    };

    this.loadState();
  }

  saveState() {
    try {
      localStorage.setItem('spsu_dsa_quest_save', JSON.stringify(this.state));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem('spsu_dsa_quest_save');
      if (saved) {
        this.state = Object.assign(this.state, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
    }
  }

  resetProgress() {
    if (confirm("Are you sure you want to reset your quest progress and start fresh?")) {
      localStorage.removeItem('spsu_dsa_quest_save');
      location.reload();
    }
  }

  init() {
    this.renderLogoEmblem();
    if (!this.state.playerName) {
      this.showScreen('onboarding');
    } else {
      this.showScreen('hub');
    }
    this.updateHeaderStats();
    this.bindGlobalEvents();

    // Auto-unlock Web Audio on first user interaction
    const unlockAudio = () => {
      window.spsuAudio.init();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
  }

  bindGlobalEvents() {
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', (e) => {
        const route = el.getAttribute('data-route');
        window.spsuAudio.click();
        this.showScreen(route);
      });
    });

    const muteBtn = document.getElementById('btn-mute');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = window.spsuAudio.toggleMute();
        muteBtn.textContent = isMuted ? '🔇 Audio: OFF' : '🔊 Audio: ON';
      });
    }

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetProgress());
    }

    const downloadBtn = document.getElementById('btn-download-offline');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => this.downloadOfflinePackage());
    }

    const demoSwitchBtn = document.getElementById('btn-demo-switch');
    if (demoSwitchBtn) {
      demoSwitchBtn.addEventListener('click', () => {
        const choice = prompt("Select Demo Cadet Profile:\n1: Aarav Sharma (Level 1 - Fresh Cadet)\n2: Priya Patel (Level 6 - Mid-Tier)\n3: Yash Birla (Level 10 - Apex Master with Certificate)", "3");
        if (choice === "1") this.loadDemoUser(1);
        else if (choice === "2") this.loadDemoUser(2);
        else if (choice === "3") this.loadDemoUser(3);
      });
    }
  }

  showScreen(screenId) {
    document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.classList.add('active');
    }

    if (screenId === 'hub') {
      this.renderHub();
    } else if (screenId === 'trophies') {
      this.renderTrophies();
    } else if (screenId === 'certificate') {
      this.renderCertificateScreen();
    }
    this.updateHeaderStats();
  }

  updateHeaderStats() {
    const nameEl = document.getElementById('hdr-player-name');
    const xpEl = document.getElementById('hdr-player-xp');
    const badgeEl = document.getElementById('hdr-player-badges');
    const avatarEl = document.getElementById('hdr-player-avatar');
    
    if (nameEl) nameEl.textContent = this.state.playerName || 'Guest Cadet';
    if (xpEl) xpEl.textContent = `${this.state.xp} XP`;
    if (badgeEl) badgeEl.textContent = `${this.state.badges.length} / 10`;
    if (avatarEl) avatarEl.textContent = this.state.avatar || '⚡';

    this.updateLogoActivation();
  }

  renderLogoEmblem() {
    const emblemHolders = document.querySelectorAll('.spsu-vector-emblem');
    const svgCode = `
      <svg viewBox="0 0 400 400" class="spsu-svg-core">
        <defs>
          <linearGradient id="neonCyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#00f2fe" />
            <stop offset="100%" stop-color="#4facfe" />
          </linearGradient>
          <linearGradient id="deepRoyal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0052cc" />
            <stop offset="100%" stop-color="#1a73e8" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- UPPER CIRCUIT TREE CANOPY (RECURSION, TREES, GRAPHS, BACKTRACKING) -->
        <g id="spsu-tree-canopy" class="logo-part-canopy" filter="url(#glowEffect)">
          <!-- Main Trunk -->
          <line x1="200" y1="210" x2="200" y2="100" stroke="#0052cc" stroke-width="6" stroke-linecap="round" />
          
          <!-- Primary Branches -->
          <line x1="200" y1="180" x2="160" y2="140" stroke="#0052cc" stroke-width="5" stroke-linecap="round" />
          <line x1="200" y1="180" x2="240" y2="140" stroke="#0052cc" stroke-width="5" stroke-linecap="round" />
          <line x1="200" y1="140" x2="140" y2="90" stroke="#0052cc" stroke-width="4" stroke-linecap="round" />
          <line x1="200" y1="140" x2="260" y2="90" stroke="#0052cc" stroke-width="4" stroke-linecap="round" />
          <line x1="200" y1="110" x2="180" y2="60" stroke="#0052cc" stroke-width="4" stroke-linecap="round" />
          <line x1="200" y1="110" x2="220" y2="60" stroke="#0052cc" stroke-width="4" stroke-linecap="round" />

          <!-- Outer Circuit Nodes -->
          <circle cx="200" cy="50" r="7" fill="#0052cc" class="node-circle" />
          <circle cx="180" cy="60" r="6" fill="#0052cc" class="node-circle" />
          <circle cx="220" cy="60" r="6" fill="#0052cc" class="node-circle" />
          <circle cx="140" cy="90" r="6" fill="#0052cc" class="node-circle" />
          <circle cx="260" cy="90" r="6" fill="#0052cc" class="node-circle" />
          <circle cx="160" cy="140" r="6" fill="#0052cc" class="node-circle" />
          <circle cx="240" cy="140" r="6" fill="#0052cc" class="node-circle" />
          <circle cx="115" cy="120" r="5" fill="#0052cc" class="node-circle" />
          <circle cx="285" cy="120" r="5" fill="#0052cc" class="node-circle" />
        </g>

        <!-- HORIZON DIVIDER LINE -->
        <g id="spsu-divider" class="logo-part-divider">
          <line x1="100" y1="215" x2="300" y2="215" stroke="#0052cc" stroke-width="6" stroke-linecap="round" />
        </g>

        <!-- LOWER PILLARS / ARRAYS / DP MEMORY BARS -->
        <g id="spsu-roots-pillars" class="logo-part-roots" filter="url(#glowEffect)">
          <line x1="120" y1="225" x2="120" y2="245" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="135" y1="225" x2="135" y2="260" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="150" y1="225" x2="150" y2="275" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="165" y1="225" x2="165" y2="290" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="180" y1="225" x2="180" y2="300" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="200" y1="225" x2="200" y2="305" stroke="#00bba7" stroke-width="5" stroke-linecap="round" />
          <line x1="220" y1="225" x2="220" y2="300" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="235" y1="225" x2="235" y2="290" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="250" y1="225" x2="250" y2="275" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="265" y1="225" x2="265" y2="260" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
          <line x1="280" y1="225" x2="280" y2="245" stroke="#00bba7" stroke-width="4" stroke-linecap="round" />
        </g>

        <!-- TYPOGRAPHY CORE -->
        <g class="spsu-text-brand">
          <text x="200" y="355" font-family="'Inter', 'Arial Black', sans-serif" font-size="44" font-weight="900" fill="#0052cc" text-anchor="middle" letter-spacing="4">SPSU</text>
          <text x="200" y="380" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#1a56db" text-anchor="middle">Sir Padampat Singhania University</text>
        </g>
      </svg>
    `;
    emblemHolders.forEach(holder => holder.innerHTML = svgCode);
  }

  updateLogoActivation() {
    const percentage = Math.min(100, Math.round(((this.state.unlockedLevel - 1) / 10) * 100));
    const pctDisplays = document.querySelectorAll('.logo-pct-display');
    pctDisplays.forEach(d => d.textContent = `${percentage}% MATRIX CHARGE`);

    const canopies = document.querySelectorAll('.logo-part-canopy');
    const dividers = document.querySelectorAll('.logo-part-divider');
    const roots = document.querySelectorAll('.logo-part-roots');

    const lvl = this.state.unlockedLevel;
    roots.forEach(r => {
      if (lvl >= 2) r.classList.add('glow-teal');
    });
    dividers.forEach(d => {
      if (lvl >= 5) d.classList.add('glow-blue');
    });
    canopies.forEach(c => {
      if (lvl >= 7) c.classList.add('glow-hyper');
    });

    if (lvl > 10) {
      document.querySelectorAll('.spsu-svg-core').forEach(svg => svg.classList.add('hyper-drive-all'));
    }
  }

  startOnboarding() {
    const input = document.getElementById('input-player-name');
    const name = input ? input.value.trim() : '';
    if (!name) {
      alert("Please enter your Cadet/Engineer name to initialize your SPSU profile!");
      return;
    }
    const selectedAvatar = document.querySelector('.avatar-opt.selected');
    this.state.playerName = name;
    this.state.avatar = selectedAvatar ? selectedAvatar.getAttribute('data-avatar') : '⚡';
    this.state.xp = 100; // Starter cadet bonus
    this.saveState();
    window.spsuAudio.levelUp();
    this.showScreen('hub');
  }

  renderHub() {
    const container = document.getElementById('levels-grid');
    if (!container) return;
    container.innerHTML = '';

    window.SPSU_LEVELS.forEach(lvl => {
      const card = document.createElement('div');
      const isUnlocked = lvl.id <= this.state.unlockedLevel;
      const isCleared = lvl.id < this.state.unlockedLevel;
      
      card.className = `level-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCleared ? 'cleared' : ''}`;
      
      const stars = this.state.levelStars[lvl.id] || (isCleared ? 3 : 0);
      const starIcons = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

      card.innerHTML = `
        <div class="lvl-badge-corner">${lvl.badge.icon}</div>
        <div class="lvl-number">LEVEL ${lvl.id}</div>
        <div class="lvl-title">${lvl.title.split(': ')[1] || lvl.title}</div>
        <div class="lvl-concept">${lvl.concept}</div>
        <div class="lvl-status-row">
          <span class="lvl-stars">${isCleared ? starIcons : (isUnlocked ? 'AVAILABLE' : 'LOCKED 🔒')}</span>
          <span class="lvl-xp-pill">+${lvl.xpReward} XP</span>
        </div>
      `;

      if (isUnlocked) {
        card.onclick = () => {
          window.spsuAudio.click();
          this.launchLevel(lvl.id);
        };
      }

      container.appendChild(card);
    });

    // Check if certificate can be unlocked (Level 10 completed)
    const certNotice = document.getElementById('hub-cert-notice');
    if (certNotice) {
      if (this.state.unlockedLevel > 10) {
        certNotice.style.display = 'block';
      } else {
        certNotice.style.display = 'none';
      }
    }
  }

  launchLevel(levelId) {
    const lvl = window.SPSU_LEVELS.find(l => l.id === levelId);
    if (!lvl) return;
    this.state.currentLevelId = levelId;

    const titleEl = document.getElementById('play-level-title');
    const conceptEl = document.getElementById('play-level-concept');
    const tipEl = document.getElementById('play-aptitude-tip');
    const arenaEl = document.getElementById('play-arena-container');

    if (titleEl) titleEl.textContent = lvl.title;
    if (conceptEl) conceptEl.textContent = `Concept: ${lvl.concept}`;
    if (tipEl) tipEl.textContent = lvl.aptitudeTip;

    this.showScreen('gameplay');

    lvl.init(arenaEl, (success, bonusXP) => {
      if (success) {
        this.triggerSoftSkillDilemma(lvl);
      }
    });
  }

  triggerSoftSkillDilemma(lvl) {
    const scenario = lvl.softSkillScenario;
    const modal = document.getElementById('softskill-modal');
    const qEl = document.getElementById('softskill-question');
    const optsEl = document.getElementById('softskill-options');

    qEl.textContent = scenario.question;
    optsEl.innerHTML = '';

    scenario.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-dilemma-opt';
      btn.innerHTML = `<span class="opt-key">[Option ${String.fromCharCode(65 + idx)}]</span> ${opt.text}`;
      btn.onclick = () => {
        window.spsuAudio.click();
        optsEl.innerHTML = `
          <div class="dilemma-feedback ${opt.correct ? 'feedback-correct' : 'feedback-wrong'}">
            ${opt.feedback}
          </div>
          <button class="btn btn-action" id="btn-finish-level" style="margin-top:15px; width:100%;">
            ${opt.correct ? '🏆 CLAIM LEVEL VICTORY' : 'RETRY SCENARIO'}
          </button>
        `;

        const finishBtn = optsEl.querySelector('#btn-finish-level');
        if (opt.correct) {
          window.spsuAudio.success();
          finishBtn.onclick = () => {
            modal.style.display = 'none';
            this.handleLevelVictory(lvl);
          };
        } else {
          window.spsuAudio.error();
          finishBtn.onclick = () => {
            this.triggerSoftSkillDilemma(lvl);
          };
        }
      };
      optsEl.appendChild(btn);
    });

    modal.style.display = 'flex';
  }

  handleLevelVictory(lvl) {
    const xpGained = lvl.xpReward + 150; // Level XP + Soft Skill Master Bonus
    this.state.xp += xpGained;
    this.state.levelStars[lvl.id] = 3;

    // Award badge if not already owned
    if (!this.state.badges.includes(lvl.badge.id)) {
      this.state.badges.push(lvl.badge.id);
      window.spsuAudio.badgeUnlocked();
    } else {
      window.spsuAudio.levelUp();
    }

    // Unlock next level
    if (this.state.unlockedLevel === lvl.id) {
      this.state.unlockedLevel = lvl.id + 1;
    }

    this.saveState();
    this.updateHeaderStats();

    // Show Victory Screen
    const victoryModal = document.getElementById('victory-modal');
    document.getElementById('vic-level-name').textContent = lvl.title;
    document.getElementById('vic-xp-gained').textContent = `+${xpGained} XP`;
    document.getElementById('vic-badge-name').textContent = lvl.badge.name;
    const iconEl = document.getElementById('vic-badge-icon');
    if (iconEl) iconEl.textContent = lvl.badge.icon;
    document.getElementById('vic-badge-desc').textContent = lvl.badge.desc;

    victoryModal.style.display = 'flex';

    document.getElementById('btn-vic-hub').onclick = () => {
      victoryModal.style.display = 'none';
      if (this.state.unlockedLevel > 10) {
        this.showScreen('certificate');
      } else {
        this.showScreen('hub');
      }
    };
  }

  loadDemoUser(cadetId) {
    if (cadetId === 1) {
      this.state = {
        playerName: 'Aarav Sharma',
        avatar: '🌱',
        xp: 150,
        unlockedLevel: 1,
        badges: [],
        levelStars: {},
        currentLevelId: null
      };
    } else if (cadetId === 2) {
      this.state = {
        playerName: 'Priya Patel',
        avatar: '⚡',
        xp: 2850,
        unlockedLevel: 6,
        badges: ['b1', 'b2', 'b3', 'b4', 'b5'],
        levelStars: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
        currentLevelId: null
      };
    } else if (cadetId === 3) {
      this.state = {
        playerName: 'Yash Birla',
        avatar: '👑',
        xp: 6450,
        unlockedLevel: 11,
        badges: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
        levelStars: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3 },
        currentLevelId: null
      };
    }
    this.saveState();
    window.spsuAudio.levelUp();
    this.showScreen('hub');
    this.updateHeaderStats();
  }

  renderTrophies() {
    const grid = document.getElementById('trophy-grid');
    if (!grid) return;
    grid.innerHTML = '';

    window.SPSU_LEVELS.forEach(lvl => {
      const b = lvl.badge;
      const isEarned = this.state.badges.includes(b.id);
      const card = document.createElement('div');
      card.className = `trophy-card ${isEarned ? 'earned' : 'locked'}`;
      card.innerHTML = `
        <div class="trophy-logo-crest">
          <img src="spsu_logo.png" class="badge-spsu-logo" alt="SPSU Logo" onerror="this.style.display='none'">
          <span class="badge-icon-overlay">${b.icon}</span>
        </div>
        <div class="badge-spsu-tag">SPSU CERTIFIED BADGE</div>
        <div class="trophy-title">${b.name}</div>
        <div class="trophy-desc">${b.desc}</div>
        <div class="trophy-status">${isEarned ? 'UNLOCKED ✅' : `BEAT LEVEL ${lvl.id} TO EARN 🔒`}</div>
      `;
      grid.appendChild(card);
    });
  }

  renderCertificateScreen() {
    const container = document.getElementById('cert-output-container');
    if (!container) return;
    const isMastery = this.state.unlockedLevel > 10;
    window.spsuCert.generateCertificate(
      this.state.playerName,
      this.state.xp,
      this.state.badges.length,
      container,
      isMastery,
      this.state.unlockedLevel
    );
  }

  downloadOfflinePackage() {
    // Attempt to download the pre-packaged standalone file, or fallback to current DOM blob
    fetch('spsu_dsa_quest_standalone.html')
      .then(res => {
        if (!res.ok) throw new Error('File not fetched');
        return res.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SPSU_DSA_Odyssey_Standalone_Game.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert("🚀 SPSU DSA Odyssey standalone game downloaded! Double-click it anytime to play 100% offline!");
      })
      .catch(() => {
        const htmlContent = document.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SPSU_DSA_Odyssey_Offline_Game.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert("🚀 SPSU DSA Odyssey is downloaded! You can open this single file offline on ANY browser, computer, or phone without internet!");
      });
  }
}

window.spsuApp = new SPSUGameApp();
document.addEventListener('DOMContentLoaded', () => {
  window.spsuApp.init();
});
