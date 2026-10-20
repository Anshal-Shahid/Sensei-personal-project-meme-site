# 🖥️ DumRose - Windows 11 PC Desktop & Meme/NFT Platform

An authentic, fully-functional Windows PC desktop website designed for the **DumRose NFT & Meme Brand**, matching the client's exact requirements and screenshots.

---

## 🌟 Key Updates & Enhancements

### 1. 🖼️ Custom Pixel Art Wallpaper Fit
- Replaced the desktop background with the client's uploaded **Pixel Art Bliss Wallpaper** (`assets/images/pixel_bliss_wallpaper_hd.png`).
- Upscaled 2x with nearest-neighbor rendering to ensure razor-sharp pixels on high-DPI retina and 4K displays.
- Styled with `background-size: cover; background-position: center bottom; image-rendering: pixelated;` to fit the viewport without distortion or blurriness.

### 2. 🪟 Windows 11 Light Acrylic Taskbar Dock (Matching Screenshot)
- **Visual Design**: Light silvery acrylic bar (`rgba(236, 239, 244, 0.94)` with `backdrop-filter: blur(24px)`) styled to mirror the screenshot.
- **Windows 11 Start Button**: Cyan blue 4-square logo on the left.
- **Task View Icon**: Overlapping dark & translucent square icon.
- **Docked App Icons**:
  - **Allowlist Application** (clipboard & checkmark)
  - **MAXX IN Portal** (lightning bolt degen badge)
  - **About Us** (info icon)
  - **Discord** (with the red circular **`9+` notification badge**, white active card tile, and blue indicator pill matching the screenshot)
  - **Google Chrome** (colored browser circle)
  - **Telegram** (paper airplane)
  - **Steam** (game launcher)
  - **Spotify** (green audio circle)
  - **NFT Mint & Gallery** (gemstone)
  - **Tokenomics** (pie chart)
  - **How To Buy** (shopping cart)
  - **Recycle Bin** (trash can)
  - **Home** (enforcer window)
- **Active / Running Indicators**:
  - Running apps show a subtle indicator pill at the bottom.
  - Active focused app shows a **white rounded card background** and **blue horizontal indicator pill** (matching Discord in the screenshot).
- **Interactive Windows PC Behavior**:
  - Clicking any dock icon launches the app or brings it to the front.
  - Clicking an already-focused app **minimizes** it to the taskbar.
  - Multiple apps can be opened concurrently, dragged, stacked, minimized, maximized, and closed.
  - Hovering over an app icon displays a Windows-style tooltip preview.
- **System Tray (Right Side)**:
  - Overflow chevron `▲`
  - Wi-Fi icon `📶`
  - Sound toggle `🔊` / `🔇` (retro Web Audio synth sounds)
  - Real-time digital clock and date (`12:35 PM` over `10/11/2026`)
  - Far-right "Show Desktop" peek line (`#btn-peek-desktop`) that toggles minimizing/restoring all open windows.

---

## 📱 Requested Platform Applications

| App | Description & Interactive Features |
| :--- | :--- |
| 📋 **Allowlist Application** | Phase 1 WL Form with wallet address (with "Auto-Fill" button), Twitter handle, Discord tag, and allocation preference. Submitting generates an official holographic **Rebel Allowlist Pass Certificate** with unique Pass #! |
| ⚡ **MAXX IN Portal** | 1-Click Degen Buy portal with amount presets (`0.1 ETH`, `0.5 ETH`, `1.0 ETH`, and `🔥 ALL IN`), live calculating token yield with +20% Rebel Bonus, plus an NFT Staking Vault with live claiming rewards! |
| 💬 **Discord Client** | High-fidelity Discord dark UI with channel list (`#announcements`, `#general-chat`, `#allowlist-proof`, `#memes-only`), red `9+` notification badge, active community chatter, and working message composer with automated replies! |
| 🌐 **Google Chrome** | In-desktop web browser with tabs for Uniswap, DexScreener, and OpenSea, complete with an interactive Uniswap swap calculator! |
| 🎮 **Steam Game Hub** | Gaming library featuring the playable **Rebel Clicker 98** mini-game right inside the Steam client! |
| ✈️ **Telegram** | Official channel broadcast with live announcement feeds and direct invite links! |
| 🏠 **Home (Welcome)** | The original mockup window with the pixel enforcer character, lore text, and the interactive **"Get Banned"** security alert button! |
| 🖼️ **NFT Mint & Gallery** | Interactive minting terminal with supply counter (`4,269 / 10,000`), quantity selector, simulated minting with victory fanfare, and filterable 6-piece pixel NFT collection! |
| 🛒 **How To Buy** | Contract address bar with 1-click clipboard copy feedback and 4 visual beginner steps! |
| 📊 **Tokenomics** | 1B Total Supply, 0% Tax, 100% Burned LP, and distribution pie chart! |
| 🎵 **Spotify / Music** | 8-bit chiptune synthesizer with animated visualizer bars! |
| 🗑️ **Recycle Bin** | Contains paper-hands files with an "Empty Recycle Bin" liquidation button! |

---

## 🚀 How to View and Demo for the Client

1. Open [`index.html`](file:///Users/workos/Documents/Work%20folder%20to%20save/sensei%20new%20personal%20meme%20website/index.html) in any browser (Chrome, Safari, Edge, Brave):
   ```bash
   open index.html
   ```
2. Or run a local static server:
   ```bash
   npx serve .
   ```
