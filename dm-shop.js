(function () {
  // ====== ใช้ helper จากหน้าเดิม ถ้าไม่มีให้ fallback ======
  const call = (name, def) => (typeof window[name] === 'function' ? window[name] : def);
  const fmt = (n) => call('fmt', (x)=> String(Number(x)||0))(n);
  const parsePrice = (s) => call('parsePrice', (t)=> Number(String(t).replace(/[^0-9.\-]/g,''))||0)(s);
  const isGemstone = (it) => call('isGemstone', (x)=> /\bgemstone\b/i.test(x?.type||''))(it);
  const getGemAddon = () => call('getGemAddon', ()=> null);
  const getGVAddon  = () => call('getGVAddon',  ()=> null);

  // อ้างอิงรายการที่อยู่บนหน้า (currentItems) หากไม่มีก็อิงอาเรย์ว่าง
  const itemsRef = () => Array.isArray(window.currentItems) ? window.currentItems : [];
  const findItem = (id) => {
    const byArray = itemsRef().find(x => String(x.id) === String(id));
    if (byArray) return byArray;

    // หาแถวจากเช็คบ็อกซ์ แล้วดึงข้อมูลจาก data-* ที่ข้อ 1 เราเพิ่งใส่ไว้
    const sel = `input.row-select[data-id="${CSS.escape(String(id))}"]`;
    const tr  = document.querySelector(sel)?.closest('tr');
    if (!tr) return null;

    return {
      id: id,
      name:  tr.dataset.name  || '',
      type:  tr.dataset.type  || '',
      price: tr.dataset.price || '0 gp'
    };
  };

  function getSelectedIds() {
    // 1) มี selectedIds (Set) ก็ใช้เลย
    if (window.selectedIds && window.selectedIds.size) return Array.from(window.selectedIds);

    // 2) สำรอง: เก็บจาก checkbox บนตาราง
    const list = document.getElementById('itemsList');
    const boxes = list ? list.querySelectorAll('input.row-select:checked') : [];
    const ids = [];
    boxes.forEach(b => {
      const id = b.dataset.id || b.value || b.closest('tr')?.dataset?.id;
      if (id) ids.push(id);
    });
    return ids;
  }

  // ดึง "ราคาเริ่มต้น" ให้ฉลาดขึ้น (รองรับ Gemstone/GV ที่เลือกไว้แล้วบนหน้า ถ้ามี)
  function deriveDefaultPrice(item) {
    let base = parsePrice(item.price);
    const gemSel = getGemAddon()?.(item);           // { name, factor, final }
    if (isGemstone(item) && gemSel && isFinite(Number(gemSel.final))) {
      base = Number(gemSel.final);
    }
    const gvSel = getGVAddon()?.(item);             // { name, resultName?, price }
    if (gvSel && isFinite(Number(gvSel.price))) {
      base += Number(gvSel.price);
    }
    return { base,
      tags: [
        gemSel ? `${gemSel.name} ${fmt(gemSel.worth)} gp worth × ${Number(gemSel.factor||1).toFixed(2)} = ${fmt(gemSel.final)} gp` : null,
        gvSel  ? `Base: ${gvSel.resultName || gvSel.name}` : null
      ].filter(Boolean)
    };
  }

  // ====== modal: สร้างครั้งเดียวแล้ว reuse ======
  function ensureModal() {
    if (document.getElementById('dmShopModal')) return;

    const wrap = document.createElement('div');
    wrap.id = 'dmShopModal';
    wrap.className = 'fixed inset-0 z-50 hidden';
    wrap.innerHTML = `
      <div class="absolute inset-0 bg-black/70"></div>
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <div class="w-full max-w-3xl bg-gray-900 rounded-xl border border-fantasy-gold shadow-xl max-h-[90vh] overflow-y-auto">
          <div class="px-5 py-4 border-b border-gray-700 flex items-center justify-between">
            <h3 class="font-bold text-fantasy-gold text-lg">🏪 DM Shop Session(อยู่ระหว่างการทดสอบ)</h3>
            <button id="dmShopClose" class="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-red-900/50 transition-all hover:scale-110">
            &times;
            </button>
          </div>

          <div class="p-5 space-y-4">
            <div class="grid md:grid-cols-2 gap-3">
              <input id="dmShopTitle" class="p-2 rounded bg-gray-800 text-white"
                     placeholder="ชื่อร้าน/หัวข้อ (เช่น Session ของ DM a)">
              <input id="dmShopNote" class="p-2 rounded bg-gray-800 text-white"
                     placeholder="หมายเหตุ (ไม่บังคับ)">
            </div>

            <div class="rounded-lg border border-gray-800 overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-800/70">
                  <tr>
                    <th class="text-left px-3 py-2 w-1/2">ไอเทม</th>
                    <th class="text-right px-3 py-2">ราคา (gp)</th>
                    <th class="text-center px-3 py-2">จำนวน</th>
                    <th class="px-2 py-2"></th>
                  </tr>
                </thead>
                <tbody id="dmShopBody"></tbody>
              </table>
            </div>
          </div>

          <div class="px-5 py-4 border-t border-gray-700 flex flex-col md:flex-row items-center md:justify-between gap-3">
            <div class="text-gray-400 text-sm">
              * ปรับราคา/จำนวนได้ตามต้องการ (ค่าเริ่มต้นดึงจากข้อมูลปัจจุบันบนหน้า)
            </div>
            <div class="flex gap-2">
              <button id="dmShopCopy"
                class="bg-fantasy-gold text-black px-4 py-2 rounded font-bold hover:bg-yellow-400">คัดลอกร้านค้า</button>
              <button id="dmShopCancel"
                class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">ปิด</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    // bind close
    wrap.querySelector('#dmShopClose').addEventListener('click', closeModal);
    wrap.querySelector('#dmShopCancel').addEventListener('click', closeModal);

    // copy
    wrap.querySelector('#dmShopCopy').addEventListener('click', () => {
      const text = buildDiscordText();
      navigator.clipboard.writeText(text).then(() => {
        const btn = wrap.querySelector('#dmShopCopy');
        const old = btn.textContent;
        btn.textContent = 'คัดลอกแล้ว ✓';
        setTimeout(() => btn.textContent = old, 1200);
      });
    });
  }

  function openModal(ids) {
    ensureModal();
    const modal = document.getElementById('dmShopModal');
    const body  = modal.querySelector('#dmShopBody');

    // ล้างรายการเดิม
    body.innerHTML = '';

    // สร้างแถวจากไอเทมที่เลือก
    ids.forEach(id => {
      const it = findItem(id);
      if (!it) return;

      const { base, tags } = deriveDefaultPrice(it);

      const tr = document.createElement('tr');
      tr.className = 'border-t border-gray-800';
      tr.dataset.id = it.id;
      tr.innerHTML = `
        <td class="px-3 py-2">
          <div class="font-semibold">${escapeHtml(it.name)}</div>
          ${tags.length ? `<div class="text-xs text-gray-400 mt-0.5">${tags.map(t=>`<span class="mr-1">[${escapeHtml(t)}]</span>`).join('')}</div>` : ''}
        </td>
        <td class="px-3 py-2 text-right">
          <input type="number" min="0" step="1" class="w-28 text-right bg-gray-800 rounded p-1"
                 value="${base}" data-price>
        </td>
        <td class="px-3 py-2 text-center">
          <input type="number" min="1" step="1" class="w-16 text-center bg-gray-800 rounded p-1"
                 value="1" data-qty>
        </td>
        <td class="px-2 py-2 text-center">
          <button class="text-red-400 hover:text-red-300" title="ลบแถว" data-remove>✕</button>
        </td>
      `;
      tr.querySelector('[data-remove]').addEventListener('click', () => {
        tr.remove();
      });

      body.appendChild(tr);
    });

    // แสดง modal
    modal.classList.remove('hidden');
  }

  function closeModal() {
    const modal = document.getElementById('dmShopModal');
    if (modal) modal.classList.add('hidden');
  }

  function buildDiscordText() {
    const modal = document.getElementById('dmShopModal');
    const title = modal.querySelector('#dmShopTitle').value.trim();
    const note  = modal.querySelector('#dmShopNote').value.trim();
    const rows  = Array.from(modal.querySelectorAll('#dmShopBody tr'));

    const lines = [];
    rows.forEach(tr => {
      const id = tr.dataset.id;
      const it = findItem(id);
      if (!it) return;
      const name = it.name;
      const price = Number(tr.querySelector('[data-price]').value)||0;
      const qty   = Math.max(1, Number(tr.querySelector('[data-qty]').value)||1);

      // ดึง tag ที่เราวางตอนสร้างแถว (สำหรับแสดงกำกับ เช่น Base/Gem)
      const tagEl = tr.querySelector('td > div + div');
      const tags  = tagEl ? tagEl.textContent.trim().replace(/\s+/g,' ') : '';
      const tagStr= tags ? ` ${tags}` : '';

      lines.push(`- ${name}${tagStr} — ${fmt(price)} gp (x${qty})`);
    });

    const header = `# 🏪 DM Shop Session${title ? ` — ${title}` : ''}`;
    const noteLn = note ? `\n> ${note}` : '';
    const hint   = `\n\nหมายเหตุ: ราคานี้ตั้งโดย DM อาจปรับเปลี่ยนได้ตามดุลยพินิจ`;
    return "" + header + noteLn + "\n\n" + lines.join("\n") + hint + ""; // <--- No Markdown
    // return "```md\n" + header + noteLn + "\n\n" + lines.join("\n") + hint + "\n```"; // <--- แบบ Markdown
  }

  // ====== bind ปุ่มหลักบนหน้า “รายการสินค้า” ======
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('dmShopBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const ids = getSelectedIds();
      if (!ids.length) {
        alert('กรุณาเลือกไอเทมอย่างน้อย 1 ชิ้นก่อน');
        return;
      }
      openModal(ids);
    });
  });
})();
