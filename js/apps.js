/**
 * APPS.JS - Interactive Application Logic for Hood Maxxers Platform
 * Handles Trading Dashboard with real-time stock simulation, Whitelist tasks & pass generator,
 * MAXX IN locking alert, NFT trait inspector, and FAQ accordion.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ====================================================
  // 1. DASHBOARD - REAL-TIME STOCK TRADING PLATFORM
  // ====================================================
  const stockTokens = {
    AAPL: {
      name: 'Apple Inc.',
      price: 234.85,
      change: +1.42,
      high: 236.20,
      low: 232.10,
      history: [230.5, 231.2, 233.0, 232.4, 233.8, 234.2, 233.9, 234.5, 234.85]
    },
    TSLA: {
      name: 'Tesla Inc.',
      price: 218.40,
      change: -0.85,
      high: 222.50,
      low: 216.30,
      history: [221.0, 220.4, 219.0, 217.8, 219.2, 218.7, 218.1, 218.9, 218.40]
    },
    NVDA: {
      name: 'NVIDIA Corp.',
      price: 138.25,
      change: +3.65,
      high: 139.80,
      low: 134.50,
      history: [132.0, 133.5, 135.0, 136.2, 137.4, 136.8, 137.9, 138.1, 138.25]
    },
    GOOG: {
      name: 'Alphabet Inc.',
      price: 164.50,
      change: +0.72,
      high: 166.10,
      low: 163.20,
      history: [162.8, 163.5, 164.0, 163.7, 164.1, 163.9, 164.3, 164.2, 164.50]
    },
    AMZN: {
      name: 'Amazon.com',
      price: 188.90,
      change: +1.15,
      high: 190.40,
      low: 186.80,
      history: [186.2, 187.0, 188.1, 187.5, 188.4, 188.0, 188.6, 188.5, 188.90]
    },
    MSFT: {
      name: 'Microsoft Corp.',
      price: 418.30,
      change: -0.42,
      high: 421.50,
      low: 416.80,
      history: [420.1, 419.5, 418.8, 417.9, 418.5, 418.0, 417.7, 418.6, 418.30]
    }
  };

  let activeSym = 'AAPL';
  const canvas = document.getElementById('trading-chart-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  // Render Trading Canvas Chart
  function renderChart() {
    if (!canvas || !ctx) return;
    const stock = stockTokens[activeSym];
    if (!stock) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let y = 30; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    for (let x = 50; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Min and Max for normalization
    const data = stock.history;
    const minVal = Math.min(...data) * 0.998;
    const maxVal = Math.max(...data) * 1.002;
    const range = maxVal - minVal || 1;

    // Line & Area coordinates
    const stepX = (width - 40) / (data.length - 1);
    const points = data.map((val, i) => {
      const x = 20 + i * stepX;
      const y = height - 30 - ((val - minVal) / range) * (height - 60);
      return { x, y };
    });

    const isPositive = stock.change >= 0;
    const strokeCol = isPositive ? '#4ade80' : '#f87171';
    const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
    if (isPositive) {
      fillGradient.addColorStop(0, 'rgba(74, 222, 128, 0.35)');
      fillGradient.addColorStop(1, 'rgba(74, 222, 128, 0.0)');
    } else {
      fillGradient.addColorStop(0, 'rgba(248, 113, 113, 0.35)');
      fillGradient.addColorStop(1, 'rgba(248, 113, 113, 0.0)');
    }

    // Draw Fill Area
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - 20);
    points.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.lineTo(points[points.length - 1].x, height - 20);
    ctx.closePath();
    ctx.fillStyle = fillGradient;
    ctx.fill();

    // Draw Stroke Line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw End Glowing Dot
    const lastPt = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(lastPt.x, lastPt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = strokeCol;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw Current Price tag on chart
    ctx.fillStyle = strokeCol;
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`$${stock.price.toFixed(2)}`, lastPt.x - 45, Math.max(16, lastPt.y - 8));
  }

  // Stock Pair Selector Clicks
  const stockItems = document.querySelectorAll('.dash-stock-item');
  stockItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.RetroSound) window.RetroSound.click();
      stockItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const sym = item.getAttribute('data-sym');
      if (stockTokens[sym]) {
        activeSym = sym;
        updateActiveDisplay();
        renderChart();
      }
    });
  });

  function updateActiveDisplay() {
    const stock = stockTokens[activeSym];
    if (!stock) return;

    const symEl = document.getElementById('active-pair-sym');
    const priceEl = document.getElementById('active-pair-price');
    const isPositive = stock.change >= 0;

    if (symEl) symEl.textContent = `$${activeSym} / USD`;
    if (priceEl) {
      priceEl.textContent = `$${stock.price.toFixed(2)}`;
      priceEl.className = isPositive ? 'price-up' : 'price-down';
    }
  }

  // Real-Time Simulation Interval (price tick every 1.8 seconds)
  setInterval(() => {
    const syms = Object.keys(stockTokens);
    // Pick 1 or 2 random stocks to tick
    const sym = syms[Math.floor(Math.random() * syms.length)];
    const stock = stockTokens[sym];
    if (!stock) return;

    // Small random delta (+/- 0.15% to 0.45%)
    const pct = (Math.random() * 0.6 - 0.28) / 100;
    const oldPrice = stock.price;
    stock.price = Math.max(10, +(stock.price * (1 + pct)).toFixed(2));
    stock.change = +(stock.change + pct * 10).toFixed(2);
    stock.history.push(stock.price);
    if (stock.history.length > 16) stock.history.shift();

    // Update stock item in sidebar
    const priceEl = document.getElementById(`price-${sym}`);
    if (priceEl) {
      const isUp = stock.price >= oldPrice;
      const sign = stock.change >= 0 ? '+' : '';
      priceEl.innerHTML = `$${stock.price.toFixed(2)}<br><span style="font-size: 9.5px;">${sign}${stock.change.toFixed(2)}%</span>`;
      priceEl.className = 'dash-stock-price ' + (isUp ? 'price-up' : 'price-down');
    }

    if (sym === activeSym) {
      updateActiveDisplay();
      renderChart();
    }
  }, 1800);

  // Initial chart render
  setTimeout(() => {
    updateActiveDisplay();
    renderChart();
  }, 200);

  // Order Placement Alert
  const btnPlaceOrder = document.getElementById('btn-place-order');
  const btnTabBuy = document.getElementById('btn-tab-buy');
  const btnTabSell = document.getElementById('btn-tab-sell');

  if (btnTabBuy && btnTabSell) {
    btnTabBuy.addEventListener('click', () => {
      btnTabBuy.style.opacity = '1';
      btnTabSell.style.opacity = '0.6';
    });
    btnTabSell.addEventListener('click', () => {
      btnTabSell.style.opacity = '1';
      btnTabBuy.style.opacity = '0.6';
    });
  }

  if (btnPlaceOrder) {
    btnPlaceOrder.addEventListener('click', () => {
      if (window.RetroSound) window.RetroSound.buzzer();
      alert('⚠️ MAXX LEAGUE PRE-SEASON ACTIVE\n\nTrading orders are currently disabled until Season 1 officially commences.\n\nMake sure to complete your Whitelist Application and MAXX IN your NFT to receive starting $10,000 MAXX CASH!');
    });
  }

  // ====================================================
  // 2. WHITELIST APPLICATION & VIP PASS GENERATOR
  // ====================================================
  const btnAutofillWl = document.getElementById('btn-autofill-wl');
  const wlWalletInput = document.getElementById('wl-wallet-input');
  const chkTask1 = document.getElementById('chk-task-1');
  const chkTask2 = document.getElementById('chk-task-2');
  const chkTask3 = document.getElementById('chk-task-3');
  const chkTask4 = document.getElementById('chk-task-4');
  const chkTask5 = document.getElementById('chk-task-5');
  const wlTaggedInput = document.getElementById('wl-tagged-input');
  const btnTask1 = document.getElementById('btn-task-1');
  const btnTask2 = document.getElementById('btn-task-2');
  const btnTask4 = document.getElementById('btn-task-4');
  const btnSubmitWl = document.getElementById('btn-submit-whitelist');
  const wlFormContainer = document.getElementById('wl-form-container');
  const wlPassResult = document.getElementById('wl-pass-result');
  const btnResetWl = document.getElementById('btn-reset-wl');

  // Helper check actions
  if (btnTask1 && chkTask1) {
    btnTask1.addEventListener('click', () => {
      setTimeout(() => { chkTask1.checked = true; }, 500);
    });
  }
  if (btnTask2 && chkTask2) {
    btnTask2.addEventListener('click', () => {
      setTimeout(() => { chkTask2.checked = true; }, 500);
    });
  }
  if (btnTask4 && chkTask4) {
    btnTask4.addEventListener('click', () => {
      setTimeout(() => { chkTask4.checked = true; }, 500);
    });
  }
  if (wlTaggedInput && chkTask3) {
    wlTaggedInput.addEventListener('input', () => {
      if (wlTaggedInput.value.trim().length > 3) chkTask3.checked = true;
    });
  }

  // Auto-fill test wallet helper
  if (btnAutofillWl && wlWalletInput) {
    btnAutofillWl.addEventListener('click', () => {
      if (window.RetroSound) window.RetroSound.click();
      const randHex = Math.floor(Math.random() * 89999 + 10000);
      wlWalletInput.value = `0x71C269dEaD84B29F01A6894c0DeAd777420${randHex}`;
      if (chkTask5) chkTask5.checked = true;
    });
  }

  if (wlWalletInput && chkTask5) {
    wlWalletInput.addEventListener('input', () => {
      if (wlWalletInput.value.trim().startsWith('0x') || wlWalletInput.value.trim().length > 10) {
        chkTask5.checked = true;
      }
    });
  }

  // Submit Whitelist Application
  if (btnSubmitWl) {
    btnSubmitWl.addEventListener('click', () => {
      const walletVal = wlWalletInput ? wlWalletInput.value.trim() : '';

      if (!walletVal) {
        if (window.RetroSound) window.RetroSound.buzzer();
        alert('Please provide your EVM or Solana wallet address to receive your Whitelist allocation!');
        if (wlWalletInput) wlWalletInput.focus();
        return;
      }

      if (window.RetroSound) window.RetroSound.click();
      btnSubmitWl.disabled = true;
      btnSubmitWl.textContent = 'VERIFYING TASKS ON-CHAIN...';

      setTimeout(() => {
        if (window.RetroSound) window.RetroSound.tada();

        // Reveal pass
        if (wlFormContainer) wlFormContainer.classList.add('hidden');
        if (wlPassResult) {
          wlPassResult.classList.remove('hidden');
          const randSerial = Math.floor(Math.random() * 8888 + 1111);
          const serialEl = document.getElementById('pass-serial-id');
          const walletTextEl = document.getElementById('pass-wallet-text');
          const timestampEl = document.getElementById('pass-timestamp-text');

          if (serialEl) serialEl.textContent = `#HM-WL-${randSerial}`;
          if (walletTextEl) walletTextEl.textContent = walletVal;
          if (timestampEl) {
            const d = new Date();
            timestampEl.textContent = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }

          // Also update Dashboard wallet text
          const dashWallet = document.getElementById('dash-wallet-display');
          if (dashWallet) {
            dashWallet.textContent = walletVal.slice(0, 6) + '...' + walletVal.slice(-4);
            dashWallet.style.color = '#4ade80';
          }
        }
      }, 900);
    });
  }

  if (btnResetWl) {
    btnResetWl.addEventListener('click', () => {
      if (window.RetroSound) window.RetroSound.click();
      if (wlFormContainer) wlFormContainer.classList.remove('hidden');
      if (wlPassResult) wlPassResult.classList.add('hidden');
      if (btnSubmitWl) {
        btnSubmitWl.disabled = false;
        btnSubmitWl.textContent = 'CLAIM WHITELIST PASS';
      }
    });
  }

  // ====================================================
  // 3. MAXX IN STAKING VAULT & ALERT MODAL
  // ====================================================
  const btnTriggerMaxxin = document.getElementById('btn-trigger-maxxin');
  const modalMaxxinLocked = document.getElementById('modal-maxxin-locked');
  const btnCloseMaxxinModal = document.getElementById('btn-close-maxxin-modal');

  if (btnTriggerMaxxin && modalMaxxinLocked) {
    btnTriggerMaxxin.addEventListener('click', () => {
      if (window.RetroSound) window.RetroSound.buzzer();
      modalMaxxinLocked.classList.remove('hidden');
    });
  }

  if (btnCloseMaxxinModal && modalMaxxinLocked) {
    btnCloseMaxxinModal.addEventListener('click', () => {
      if (window.RetroSound) window.RetroSound.click();
      modalMaxxinLocked.classList.add('hidden');
    });
  }

  // ====================================================
  // 4. MAXXERS NFT SHOWCASE & TRAIT INSPECTOR
  // ====================================================
  const nftCards = document.querySelectorAll('.nft-card-item');
  const inspectName = document.getElementById('inspect-nft-name');
  const inspectRarity = document.getElementById('inspect-nft-rarity');
  const inspectHead = document.getElementById('inspect-trait-head');
  const inspectJaw = document.getElementById('inspect-trait-jaw');
  const inspectSuit = document.getElementById('inspect-trait-suit');
  const inspectBonus = document.getElementById('inspect-trait-bonus');

  nftCards.forEach(card => {
    card.addEventListener('click', () => {
      if (window.RetroSound) window.RetroSound.click();
      nftCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const name = card.getAttribute('data-name');
      const id = card.getAttribute('data-id');
      const rarity = card.getAttribute('data-rarity');
      const head = card.getAttribute('data-head');
      const jaw = card.getAttribute('data-jaw');
      const suit = card.getAttribute('data-suit');
      const bonus = card.getAttribute('data-bonus');

      if (inspectName) inspectName.textContent = name;
      if (inspectRarity) {
        inspectRarity.textContent = `${rarity.toUpperCase()} ${id}`;
        if (rarity === 'Legendary') {
          inspectRarity.style.background = '#fef08a';
          inspectRarity.style.color = '#854d0e';
        } else if (rarity === 'Epic') {
          inspectRarity.style.background = '#f3e8ff';
          inspectRarity.style.color = '#6b21a8';
        } else {
          inspectRarity.style.background = '#dbeafe';
          inspectRarity.style.color = '#1e40af';
        }
      }
      if (inspectHead) inspectHead.textContent = head;
      if (inspectJaw) inspectJaw.textContent = jaw;
      if (inspectSuit) inspectSuit.textContent = suit;
      if (inspectBonus) inspectBonus.textContent = bonus;
    });
  });

  // ====================================================
  // 5. FAQ ACCORDION
  // ====================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        if (window.RetroSound) window.RetroSound.click();
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

});
