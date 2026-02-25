// ===== pic.js — Item Image Display =====
// ค้นหารูปภาพไอเทมจาก 5etools-img และ homebrew-img บน GitHub
// แล้วแสดงต่อจาก Source ในแถวรายละเอียดไอเทม

(function () {
  'use strict';

  // === Image Source URLs ===
  const IMG_SOURCES = [
    // Primary: 5etools-mirror-3
    (book, name) =>
      `https://raw.githubusercontent.com/5etools-mirror-3/5etools-img/refs/heads/main/items/${encodeURIComponent(book)}/${encodeURIComponent(name)}.webp`,
    // Fallback: homebrew-img
    (book, name) =>
      `https://raw.githubusercontent.com/TheGiddyLimit/homebrew-img/main/img/items/${encodeURIComponent(book)}/${encodeURIComponent(name)}.webp`,
  ];

  // === Cache เก็บผลลัพธ์ URL ที่โหลดสำเร็จ / ล้มเหลว ===
  const _cache = new Map(); // key => url | null

  function _cacheKey(book, name) {
    return `${book}||${name}`;
  }

  /**
   * ดึงชื่อย่อหนังสือจากข้อความ source เช่น
   *   "DMG, p.155"  → "DMG"
   *   "PHB p.200"   → "PHB"
   *   "TCE"         → "TCE"
   *   "XGE,p.20"    → "XGE"
   */
  function _extractBookAbbrev(raw) {
    if (!raw) return '';
    // ตัดส่วนหลัง comma หรือ " p." หรือ " p " ออก
    return raw.replace(/[,;]\s*.*/g, '')   // ตัดหลัง , หรือ ;
      .replace(/\s+p\.\s*\d.*/gi, '') // ตัดหลัง " p.123"
      .trim();
  }

  /**
   * แปลงชื่อไอเทมเป็น title case มาตรฐาน
   * เช่น "Boots Of Elvenkind" → "Boots of Elvenkind"
   * คำเล็ก (of, the, and, a, an, ...) จะเป็นตัวเล็กยกเว้นคำแรก
   */
  const SMALL_WORDS = new Set([
    'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'if', 'in',
    'into', 'nor', 'of', 'on', 'or', 'out', 'so', 'the', 'to', 'up', 'vs', 'with', 'yet'
  ]);

  function _normalizeItemName(name) {
    if (!name) return '';
    return name.trim().split(/\s+/).map((word, i) => {
      if (i === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      const lower = word.toLowerCase();
      if (SMALL_WORDS.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  /**
   * ลองโหลดรูปจาก URL ที่ให้มา
   * return Promise<string|null>  — URL ที่โหลดสำเร็จ หรือ null
   */
  function _probe(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  /**
   * หา URL รูปภาพที่ใช้ได้สำหรับไอเทม
   * @param {string} itemName  — ชื่อไอเทม (เช่น "Bag of Holding")
   * @param {string} bookSource — ชื่อย่อหนังสือ (เช่น "DMG" หรือ "DMG, p.155")
   * @returns {Promise<string|null>}
   */
  async function findItemImageUrl(itemName, bookSource) {
    if (!itemName || !bookSource) return null;

    // ดึงเฉพาะชื่อย่อหนังสือ เช่น "DMG, p.155" → "DMG"
    const book = _extractBookAbbrev(bookSource);
    if (!book) return null;

    const key = _cacheKey(book, itemName);
    if (_cache.has(key)) return _cache.get(key);

    // ลองทั้งชื่อที่ normalize แล้วและชื่อดั้งเดิม
    const normalized = _normalizeItemName(itemName);
    const namesToTry = [normalized];
    if (normalized !== itemName.trim()) namesToTry.push(itemName.trim());

    for (const buildUrl of IMG_SOURCES) {
      for (const tryName of namesToTry) {
        const url = buildUrl(book, tryName);
        const result = await _probe(url);
        if (result) {
          _cache.set(key, result);
          return result;
        }
      }
    }

    _cache.set(key, null);
    return null;
  }

  /**
   * แสดงรูปภาพไอเทมใน container ที่กำหนด
   * @param {HTMLElement} containerEl — div ที่จะ render รูปเข้าไป
   * @param {string} itemName
   * @param {string} bookSource
   */
  async function renderItemImage(containerEl, itemName, bookSource) {
    if (!containerEl) return;

    // แสดง loading state
    containerEl.innerHTML = `
      <div class="item-img-loading">
        <div class="item-img-spinner"></div>
        <span class="text-gray-500 text-xs">กำลังค้นหารูปภาพ...</span>
      </div>`;

    const url = await findItemImageUrl(itemName, bookSource);

    if (!url) {
      // ไม่พบรูป — ซ่อน container
      containerEl.innerHTML = '';
      containerEl.style.display = 'none';
      return;
    }

    // แสดงรูป
    containerEl.style.display = '';
    containerEl.innerHTML = `
      <div class="item-img-wrapper">
        <img
          src="${url}"
          alt="${itemName}"
          class="item-img"
          loading="lazy"
          onerror="this.parentElement.parentElement.style.display='none'"
        />
      </div>`;
  }

  // === Inject CSS ===
  const style = document.createElement('style');
  style.textContent = `
    /* --- Item Image Styles --- */
    .item-img-container {
      margin-top: 0.75rem;
      display: flex;
      justify-content: center;
    }

    .item-img-wrapper {
      position: relative;
      max-width: 320px;
      width: 100%;
      border-radius: 1rem;
      overflow: hidden;
      background: rgba(17, 24, 39, 0.6);
      border: 1px solid rgba(139, 92, 246, 0.3);
      box-shadow:
        0 0 20px rgba(139, 92, 246, 0.08),
        0 4px 24px rgba(0, 0, 0, 0.3);
      animation: itemImgFadeIn 0.4s ease-out;
    }

    .item-img-wrapper:hover {
      border-color: rgba(139, 92, 246, 0.5);
      box-shadow:
        0 0 30px rgba(139, 92, 246, 0.15),
        0 8px 32px rgba(0, 0, 0, 0.4);
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }

    .item-img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      border-radius: 1rem;
    }

    .item-img-loading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
    }

    .item-img-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(139, 92, 246, 0.3);
      border-top-color: #8b5cf6;
      border-radius: 50%;
      animation: itemImgSpin 0.6s linear infinite;
    }

    @keyframes itemImgSpin {
      to { transform: rotate(360deg); }
    }

    @keyframes itemImgFadeIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(8px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .item-img-wrapper {
        max-width: 240px;
      }
    }

    @media (max-width: 480px) {
      .item-img-wrapper {
        max-width: 180px;
        border-radius: 0.75rem;
      }
      .item-img {
        border-radius: 0.75rem;
      }
    }
  `;
  document.head.appendChild(style);

  // === Expose globally ===
  window.ItemPic = {
    findItemImageUrl,
    renderItemImage,
  };
})();
