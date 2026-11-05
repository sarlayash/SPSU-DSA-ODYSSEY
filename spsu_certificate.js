// SPSU DSA Odyssey - Dynamic Master Certificate Generator
// Generates official-grade, printable & downloadable Certificate of Algorithmic Mastery

class SPSUCertificateEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
  }

  generateCertificate(playerName, totalXP, badgesCount, container, isFullMastery = false, currentLevel = 1) {
    const issueDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const verificationCode = isFullMastery 
      ? ('SPSU-DSA-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-VERIFIED')
      : 'SPSU-DSA-IN-PROGRESS-TRAINING';

    const bannerHtml = !isFullMastery ? `
      <div class="cert-status-banner" style="background: rgba(255, 183, 3, 0.15); border: 2px solid #ffb703; padding: 14px 20px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
        <span style="font-size: 20px;">🛡️</span>
        <b style="color: #ffb703; font-size: 15px;"> CADET IN TRAINING PREVIEW (${Math.min(10, currentLevel - 1)} / 10 LEVELS CLEARED)</b>
        <p style="font-size: 13px; color: #cbd5e1; margin-top: 4px;">
          Complete all 10 DSA cyber-levels and defeat the Apex Boss to unlock the official verified University seal!
        </p>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="cert-wrapper">
        ${bannerHtml}
        <div class="cert-card" id="printable-cert">
          <div class="cert-border-outer">
            <div class="cert-border-inner">
              <div class="cert-header">
                <img src="spsu_logo.png" class="cert-logo-img" alt="SPSU Logo" onerror="this.style.display='none'">
                <div class="cert-org-title">SIR PADAMPAT SINGHANIA UNIVERSITY</div>
                <div class="cert-sub-org">School of Computer Science & Algorithmic Engineering</div>
              </div>

              <div class="cert-badge-ribbon">⭐ CERTIFICATE OF ALGORITHMIC EXCELLENCE ⭐</div>

              <div class="cert-body">
                <p class="cert-intro">This is to officially certify that</p>
                <div class="cert-player-name">${playerName.toUpperCase() || 'CADET ALGORITHMIST'}</div>
                <p class="cert-description">
                  has successfully mastered all 10 cyber-levels of the <b>SPSU DSA Quest</b>, demonstrating verified computational mastery across 
                  <b>Arrays, Two-Pointers, Stacks, Queues, Linked Lists, Binary Search, Sorting, Binary Trees, AVL Rotations, Graph BFS/Dijkstra, Backtracking (N-Queens), Dynamic Programming (0/1 Knapsack)</b>, along with demonstrated high-stakes <b>Soft Skills, Critical Aptitude & STAR Leadership Prowess</b>.
                </p>

                <div class="cert-stats-grid">
                  <div class="cert-stat-box">
                    <span class="cert-stat-label">TOTAL XP EARNED</span>
                    <span class="cert-stat-val">${totalXP} XP</span>
                  </div>
                  <div class="cert-stat-box">
                    <span class="cert-stat-label">BADGES UNLOCKED</span>
                    <span class="cert-stat-val">${badgesCount} / 10 BADGES</span>
                  </div>
                  <div class="cert-stat-box">
                    <span class="cert-stat-label">DISTINCTION TIER</span>
                    <span class="cert-stat-val">APEX ARCHITECT</span>
                  </div>
                </div>

                <div class="cert-signatures">
                  <div class="sig-block">
                    <div class="sig-line">Dr. Algorithmic Chair</div>
                    <div class="sig-role">Dean, Computing Sciences SPSU</div>
                  </div>
                  <div class="sig-seal">
                    <div class="official-seal">
                      <span>SPSU</span>
                      <span>VERIFIED</span>
                      <span>★ 2026 ★</span>
                    </div>
                  </div>
                  <div class="sig-block">
                    <div class="sig-line">${issueDate}</div>
                    <div class="sig-role">Credential Verification: <code>${verificationCode}</code></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cert-actions">
          <button class="btn btn-action" id="btn-print-cert">🖨️ PRINT / EXPORT PDF</button>
          <button class="btn btn-action" id="btn-render-png">🖼️ DOWNLOAD CERTIFICATE (PNG)</button>
          <button class="btn btn-action" id="btn-cert-back">🎮 RETURN TO MISSION HUB</button>
        </div>
        <div id="cert-canvas-holder" style="display:none;"></div>
      </div>
    `;

    container.querySelector('#btn-print-cert').onclick = () => {
      window.print();
    };

    container.querySelector('#btn-render-png').onclick = () => {
      this.renderToCanvas(playerName, totalXP, badgesCount, issueDate, verificationCode);
    };

    container.querySelector('#btn-cert-back').onclick = () => {
      window.spsuApp.showScreen('hub');
    };
  }

  renderToCanvas(playerName, totalXP, badgesCount, issueDate, verificationCode) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGrad.addColorStop(0, '#0a1128');
    bgGrad.addColorStop(0.5, '#001e4d');
    bgGrad.addColorStop(1, '#051329');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // Golden / Cyan Borders
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 1140, 740);

    ctx.strokeStyle = '#ffb703';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 1120, 720);

    // University Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('SIR PADAMPAT SINGHANIA UNIVERSITY', 600, 110);

    ctx.fillStyle = '#00e5ff';
    ctx.font = '18px sans-serif';
    ctx.fillText('School of Computer Science & Algorithmic Engineering', 600, 140);

    // Ribbon
    ctx.fillStyle = '#ffb703';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('★ CERTIFICATE OF ALGORITHMIC EXCELLENCE ★', 600, 195);

    // Text
    ctx.fillStyle = '#a0aec0';
    ctx.font = '18px sans-serif';
    ctx.fillText('This is to officially certify that', 600, 240);

    // Player Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 15;
    ctx.fillText(playerName.toUpperCase() || 'CADET ALGORITHMIST', 600, 310);
    ctx.shadowBlur = 0;

    // Body description
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px sans-serif';
    ctx.fillText('has successfully mastered all 10 cyber-levels of the SPSU DSA Quest, demonstrating verified competency in:', 600, 370);
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Arrays • Stacks & Queues • Linked Lists • Binary Search • Sorting • Binary Trees & AVL', 600, 405);
    ctx.fillText('Graph BFS & Dijkstra • Backtracking (N-Queens) • Dynamic Programming • STAR Behavioral Leadership', 600, 435);

    // Stats
    ctx.fillStyle = '#0f274d';
    ctx.fillRect(200, 480, 800, 80);
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 1;
    ctx.strokeRect(200, 480, 800, 80);

    ctx.fillStyle = '#ffb703';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`${totalXP} XP EARNED`, 330, 525);

    ctx.fillStyle = '#00e5ff';
    ctx.fillText(`${badgesCount} / 10 BADGES UNLOCKED`, 600, 525);

    ctx.fillStyle = '#4ade80';
    ctx.fillText('APEX ARCHITECT TIER', 870, 525);

    // Signatures and date
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('Issued on: ' + issueDate, 350, 660);
    ctx.fillText('Verification: ' + verificationCode, 350, 685);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Dean, Computing Sciences SPSU', 850, 660);
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#00e5ff';
    ctx.fillText('Sir Padampat Singhania University', 850, 685);

    // Download trigger
    const link = document.createElement('a');
    link.download = `SPSU_DSA_Master_Certificate_${playerName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}

window.spsuCert = new SPSUCertificateEngine();
