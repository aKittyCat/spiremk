/* cart.js — ตะกร้าสินค้า (รองรับ Generic Variant + Gemstone + ขายของ) */
(function () {
  // ===== helpers: เรียกสดจาก window เสมอ (กันกรณีประกาศช้ากว่า cart.js) =====
  const call = (name, def) =>
    typeof window[name] === "function" ? window[name] : def;
  const fmt = (n) => call("fmt", (x) => String(Number(x) || 0))(n);
  const parsePrice = (s) =>
    call(
      "parsePrice",
      (t) => Number(String(t).replace(/[^0-9.\-]/g, "")) || 0
    )(s);
  const isGemstone = (it) =>
    call("isGemstone", (x) => /\bgemstone\b/i.test(x?.type || ""))(it);
  const getGemAddon = () => call("getGemAddon", () => null);
  const getGVAddon = () => call("getGVAddon", () => null);

  const itemsRef = () =>
    Array.isArray(window.currentItems)
      ? window.currentItems
      : typeof window.currentItems !== "undefined"
        ? window.currentItems
        : typeof window.currentItems === "undefined" &&
          typeof window.currentItems !== "object" &&
          typeof currentItems !== "undefined"
          ? currentItems
          : [];

  const itemById = (id) => itemsRef().find((x) => String(x.id) === String(id));

  // ===== state =====
  const cart = new Map(); // key -> entry (สินค้าซื้อ)
  const sellCart = new Map(); // key -> entry (สินค้าขาย)

  // ===== model =====
  function buildEntryFromItem(item) {
    const opts = [];

    // 1) ราคาเริ่มต้นของไอเทม
    let baseGp = parsePrice(item.price);

    // 2) ถ้าเป็น Gemstone และผู้ใช้เลือกแล้ว → ใช้ราคาสุดท้าย (final)
    const gemSel = getGemAddon()?.(item);
    if (isGemstone(item)) {
      if (gemSel && isFinite(Number(gemSel.final))) {
        baseGp = Number(gemSel.final);
        opts.push(
          `${gemSel.name} ${fmt(gemSel.worth)} gp worth × ${Number(
            gemSel.factor || 1
          ).toFixed(2)} = ${fmt(gemSel.final)} gp`
        );
      } else {
        const m = String(item.name || "").match(/([\d,.]+)\s*gp/i);
        baseGp = m ? Number(m[1].replace(/,/g, "")) : 0;
      }
    }

    // 3) ถ้าเป็น Generic Variant แล้วมี Base item → บวกราคา Base
    const gvSel = getGVAddon()?.(item); // {name,resultName?,price}
    if (gvSel && isFinite(Number(gvSel.price))) {
      baseGp += Number(gvSel.price);
      opts.push(
        `Base: ${gvSel.resultName || gvSel.name} (+${fmt(gvSel.price)})`
      );
    }

    // 4) คีย์แยกตามตัวเลือก เพื่อรวมจำนวนของ "รายการเดียวกัน+ตัวเลือกเดียวกัน"
    const key = [
      item.id,
      gvSel?.resultName || gvSel?.name || "",
      gemSel ? `${gemSel.name}|${gemSel.worth}|${gemSel.final}` : "",
    ].join("|");

    return {
      key,
      id: item.id,
      name: item.name,
      unitGp: baseGp, // ราคาต่อชิ้น (gp)
      qty: 1,
      options: opts, // array ของป้ายกำกับ
    };
  }

  function upsert(entry) {
    if (cart.has(entry.key)) {
      const e = cart.get(entry.key);
      e.qty += entry.qty;
    } else {
      cart.set(entry.key, entry);
    }
    render();
  }

  // ===== Sell Item Functions =====
  function addSellItem(name, qty, originalPrice) {
    const sellPrice = Math.floor(originalPrice / 2);
    const key = `sell|${name}|${originalPrice}`;

    if (sellCart.has(key)) {
      const e = sellCart.get(key);
      e.qty += qty;
    } else {
      sellCart.set(key, {
        key,
        name,
        originalPrice,
        sellPrice,
        qty,
      });
    }
    render();
  }

  // ฟังก์ชันขายจากไอเทมในระบบ (รองรับ Gemstone + Generic Variant)
  function addSellItemFromItem(item) {
    const opts = [];

    // 1) ราคาเริ่มต้นของไอเทม
    let baseGp = parsePrice(item.price);

    // 2) ถ้าเป็น Gemstone และผู้ใช้เลือกแล้ว → ใช้ราคาสุดท้าย (final)
    const gemSel = getGemAddon()?.(item);
    if (isGemstone(item)) {
      if (gemSel && isFinite(Number(gemSel.final))) {
        baseGp = Number(gemSel.final);
        opts.push(
          `${gemSel.name} ${fmt(gemSel.worth)} gp worth × ${Number(
            gemSel.factor || 1
          ).toFixed(2)} = ${fmt(gemSel.final)} gp`
        );
      } else {
        const m = String(item.name || "").match(/([\d,.]+)\s*gp/i);
        baseGp = m ? Number(m[1].replace(/,/g, "")) : 0;
      }
    }

    // 3) ถ้าเป็น Generic Variant แล้วมี Base item → บวกราคา Base
    const gvSel = getGVAddon()?.(item); // {name,resultName?,price}
    if (gvSel && isFinite(Number(gvSel.price))) {
      baseGp += Number(gvSel.price);
      opts.push(
        `Base: ${gvSel.resultName || gvSel.name} (+${fmt(gvSel.price)})`
      );
    }

    // 4) คำนวณราคาขาย (originalPrice ก่อนหาร 2)
    const sellPrice = Math.floor(baseGp / 2);

    // 5) สร้างชื่อแสดงผลรวม options
    const displayName = opts.length
      ? `${item.name} [${opts.join(" • ")}]`
      : item.name;

    // 6) คีย์แยกตามตัวเลือก
    const key = [
      "sell",
      item.id,
      gvSel?.resultName || gvSel?.name || "",
      gemSel ? `${gemSel.name}|${gemSel.worth}|${gemSel.final}` : "",
    ].join("|");

    if (sellCart.has(key)) {
      const e = sellCart.get(key);
      e.qty += 1;
    } else {
      sellCart.set(key, {
        key,
        name: displayName,
        originalPrice: baseGp,
        sellPrice,
        qty: 1,
        options: opts,
      });
    }
    render();
  }

  function removeSell(key) {
    sellCart.delete(key);
    render();
  }

  function setSellQty(key, n) {
    const e = sellCart.get(key);
    if (!e) return;
    e.qty = Math.max(1, Number(n) || 1);
    render();
  }

  function countSellItems() {
    let c = 0;
    sellCart.forEach((e) => (c += e.qty));
    return c;
  }

  function totalSellGp() {
    let t = 0;
    sellCart.forEach((e) => (t += e.sellPrice * e.qty));
    return t;
  }

  // ===== public API =====
  function addSelected(idList) {
    idList.forEach((id) => {
      const it = itemById(id);
      if (!it) return;
      const e = buildEntryFromItem(it);
      upsert(e);
    });
  }
  function remove(key) {
    cart.delete(key);
    render();
  }
  function setQty(key, n) {
    const e = cart.get(key);
    if (!e) return;
    e.qty = Math.max(1, Number(n) || 1);
    render();
  }
  function clear() {
    cart.clear();
    sellCart.clear();
    render();
  }
  function totalGp() {
    let t = 0;
    cart.forEach((e) => (t += e.unitGp * e.qty));
    return t;
  }
  function countItems() {
    let c = 0;
    cart.forEach((e) => (c += e.qty));
    return c;
  }

  // ===== copy to Discord (รวมทั้งซื้อและขาย) =====
  function toDiscordText() {
    const sections = [];
    const buyTotal = totalGp();
    const sellTotal = totalSellGp();
    const hasBoth = cart.size > 0 && sellCart.size > 0;

    // ส่วนซื้อ
    if (cart.size > 0) {
      const buyLines = [];
      cart.forEach((e) => {
        const opt = e.options.length ? ` [${e.options.join(" • ")}]` : "";
        const unit = `${fmt(e.unitGp)} gp`;
        const sum = `${fmt(e.unitGp * e.qty)} gp`;
        buyLines.push(`${e.name}${opt} | ${unit} × ${e.qty} — รวม: ${sum}`);
      });
      const buyHeader = `ซื้อ (${countItems()} ชิ้น)`;
      const buyFooter = hasBoth ? ` — รายการซื้อทั้งหมด: - ${fmt(buyTotal)} gp` : "";
      sections.push(buyHeader + "\n" + buyLines.join("\n") + "\n" + buyFooter);
    }

    // ส่วนขาย
    if (sellCart.size > 0) {
      const sellLines = [];
      sellCart.forEach((e) => {
        // แสดงรูปแบบ: ชื่อ | ราคาเดิม/2 gp × จำนวน — รวม: ราคาขาย gp
        sellLines.push(`${e.name} | ${fmt(e.originalPrice)}/2 gp × ${e.qty} — รวม: ${fmt(e.sellPrice * e.qty)} gp`);
      });
      const sellHeader = `ขาย (${countSellItems()} ชิ้น)`;
      const sellFooter = hasBoth ? ` — รายการขายทั้งหมด: + ${fmt(sellTotal)} gp` : "";
      sections.push((hasBoth ? "\n" : "") + sellHeader + "\n" + sellLines.join("\n") + "\n" + sellFooter);
    }

    if (sections.length === 0) {
      return "ไม่มีรายการในตะกร้า";
    }

    // คำนวณยอดรวมทั้งสิ้น (ซื้อ - ขาย)
    const netTotal = buyTotal - sellTotal;
    const sign = netTotal >= 0 ? "- " : "+ ";
    const grandTotal = `\n**— รวมทั้งสิ้น: ${sign}${fmt(Math.abs(netTotal))} gp**`;

    return sections.join("\n") + (hasBoth ? "\n" : "") + grandTotal;
  }

  // ===== view =====
  function render() {
    // badge - รวมทั้งซื้อและขาย
    const badge = document.getElementById("cartBadge");
    if (badge) {
      const c = countItems() + countSellItems();
      badge.textContent = String(c);
      badge.classList.toggle("hidden", c === 0);
    }

    const empty = document.getElementById("cartEmpty");
    const table = document.getElementById("cartTable");
    const footer = document.getElementById("cartFooter");
    const body = document.getElementById("cartBody");
    const total = document.getElementById("cartTotal");
    if (!empty || !table || !footer || !body || !total) return;

    body.innerHTML = "";
    const hasItems = cart.size > 0 || sellCart.size > 0;

    if (!hasItems) {
      empty.classList.remove("hidden");
      table.classList.add("hidden");
      footer.classList.add("hidden");
      total.textContent = "0";
      return;
    }
    empty.classList.add("hidden");
    table.classList.remove("hidden");
    footer.classList.remove("hidden");

    const rows = [];

    // แสดงรายการซื้อ
    if (cart.size > 0) {
      rows.push(`
        <tr class="bg-red-900/30">
          <td colspan="6" class="px-4 py-2 font-bold text-red-300">🛒 รายการซื้อ</td>
        </tr>
      `);
      cart.forEach((e) => {
        rows.push(`
          <tr class="border-t border-gray-700/40">
            <td class="px-4 py-3">
              <div class="font-semibold text-red-200">${escapeHtml(e.name)}</div>
            </td>
            <td class="px-4 py-3 text-gray-300">
              ${e.options
            .map(
              (o) =>
                `<span class="inline-block bg-red-700/40 px-2 py-0.5 rounded mr-1 mb-1">${escapeHtml(
                  o
                )}</span>`
            )
            .join("")}
            </td>
            <td class="px-4 py-3 text-right tabular-nums whitespace-nowrap">${fmt(
              e.unitGp
            )} gp</td>
            <td class="px-2 py-3 text-center">
              <div class="inline-flex items-center bg-gray-700/60 rounded">
                <button class="px-2" data-dec="${e.key
          }" aria-label="decrease">−</button>
                <input class="w-14 text-center bg-transparent outline-none" data-qty="${e.key
          }" value="${e.qty}">
                <button class="px-2" data-inc="${e.key
          }" aria-label="increase">+</button>
              </div>
            </td>
            <td class="px-4 py-3 text-right tabular-nums text-red-300">${fmt(
            e.unitGp * e.qty
          )} gp</td>
            <td class="px-2 py-3 text-center">
              <button class="text-red-400 hover:text-red-300" title="ลบ" data-remove="${e.key
          }">✕</button>
            </td>
          </tr>
        `);
      });
    }

    // แสดงรายการขาย
    if (sellCart.size > 0) {
      rows.push(`
        <tr class="bg-emerald-900/30">
          <td colspan="6" class="px-4 py-2 font-bold text-emerald-300">💰 รายการขาย</td>
        </tr>
      `);
      sellCart.forEach((e) => {
        rows.push(`
          <tr class="border-t border-gray-700/40">
            <td class="px-4 py-3">
              <div class="font-semibold text-emerald-200">${escapeHtml(e.name)}</div>
            </td>
            <td class="px-4 py-3 text-gray-300">
              <span class="inline-block bg-emerald-700/40 px-2 py-0.5 rounded mr-1 mb-1">ราคาเดิม: ${fmt(e.originalPrice)} gp</span>
            </td>
            <td class="px-4 py-3 text-right tabular-nums whitespace-nowrap">${fmt(e.originalPrice)}/2 = ${fmt(e.sellPrice)} gp</td>
            <td class="px-2 py-3 text-center">
              <div class="inline-flex items-center bg-gray-700/60 rounded">
                <button class="px-2" data-sell-dec="${e.key}" aria-label="decrease">−</button>
                <input class="w-14 text-center bg-transparent outline-none" data-sell-qty="${e.key}" value="${e.qty}">
                <button class="px-2" data-sell-inc="${e.key}" aria-label="increase">+</button>
              </div>
            </td>
            <td class="px-4 py-3 text-right tabular-nums text-emerald-300">${fmt(e.sellPrice * e.qty)} gp</td>
            <td class="px-2 py-3 text-center">
              <button class="text-red-400 hover:text-red-300" title="ลบ" data-sell-remove="${e.key}">✕</button>
            </td>
          </tr>
        `);
      });
    }

    body.innerHTML = rows.join("");

    // แสดงยอดรวม (ซื้อ - ขาย) พร้อมเครื่องหมาย +/-
    const buyTotal = totalGp();
    const sellTotal = totalSellGp();
    const netTotal = buyTotal - sellTotal;
    const totalSign = document.getElementById("cartTotalSign");

    if (totalSign) {
      if (netTotal >= 0) {
        totalSign.textContent = "- ";
        totalSign.className = "text-2xl font-bold tabular-nums text-red-400";
      } else {
        totalSign.textContent = "+ ";
        totalSign.className = "text-2xl font-bold tabular-nums text-emerald-400";
      }
    }
    total.textContent = fmt(Math.abs(netTotal));
    total.className = netTotal >= 0 ? "text-2xl font-bold tabular-nums text-red-400" : "text-2xl font-bold tabular-nums text-emerald-400";

    // events สำหรับรายการซื้อ
    body.querySelectorAll("[data-remove]").forEach((b) => {
      b.addEventListener("click", (e) =>
        remove(e.currentTarget.dataset.remove)
      );
    });
    body.querySelectorAll("[data-inc]").forEach((b) => {
      b.addEventListener("click", (e) => {
        const k = e.currentTarget.dataset.inc;
        const x = cart.get(k);
        if (!x) return;
        setQty(k, x.qty + 1);
      });
    });
    body.querySelectorAll("[data-dec]").forEach((b) => {
      b.addEventListener("click", (e) => {
        const k = e.currentTarget.dataset.dec;
        const x = cart.get(k);
        if (!x) return;
        setQty(k, Math.max(1, x.qty - 1));
      });
    });
    body.querySelectorAll("[data-qty]").forEach((inp) => {
      inp.addEventListener("input", (e) => {
        const k = e.currentTarget.dataset.qty;
        const v = Math.max(1, Number(e.currentTarget.value) || 1);
        setQty(k, v);
      });
    });

    // events สำหรับรายการขาย
    body.querySelectorAll("[data-sell-remove]").forEach((b) => {
      b.addEventListener("click", (e) =>
        removeSell(e.currentTarget.dataset.sellRemove)
      );
    });
    body.querySelectorAll("[data-sell-inc]").forEach((b) => {
      b.addEventListener("click", (e) => {
        const k = e.currentTarget.dataset.sellInc;
        const x = sellCart.get(k);
        if (!x) return;
        setSellQty(k, x.qty + 1);
      });
    });
    body.querySelectorAll("[data-sell-dec]").forEach((b) => {
      b.addEventListener("click", (e) => {
        const k = e.currentTarget.dataset.sellDec;
        const x = sellCart.get(k);
        if (!x) return;
        setSellQty(k, Math.max(1, x.qty - 1));
      });
    });
    body.querySelectorAll("[data-sell-qty]").forEach((inp) => {
      inp.addEventListener("input", (e) => {
        const k = e.currentTarget.dataset.sellQty;
        const v = Math.max(1, Number(e.currentTarget.value) || 1);
        setSellQty(k, v);
      });
    });
  }

  // ===== wire cart page buttons =====
  document.addEventListener("DOMContentLoaded", () => {
    // ปุ่มคัดลอก (รองรับทั้ง id เดิมและใหม่)
    const copyBtn =
      document.getElementById("copyCartBtn") ||
      document.getElementById("copyCartEmbedBtn");
    if (copyBtn)
      copyBtn.addEventListener("click", async () => {
        const text = toDiscordText();
        await navigator.clipboard.writeText(text);
        const old = copyBtn.textContent;
        copyBtn.textContent = "คัดลอกแล้ว ✓";
        setTimeout(() => (copyBtn.textContent = old), 1200);
      });

    const clearBtn = document.getElementById("clearCartBtn");
    if (clearBtn) clearBtn.addEventListener("click", clear);

    // ===== Sell Item Modal =====
    const sellModal = document.getElementById("sellItemModal");
    const addSellBtn = document.getElementById("addSellItemBtn");
    const closeSellBtn = document.getElementById("closeSellItemModalBtn");
    const sellForm = document.getElementById("sellItemForm");
    const sellPriceInput = document.getElementById("sellItemPrice");
    const sellPreview = document.getElementById("sellItemPreview");

    function openSellModal() {
      if (sellModal) {
        sellModal.classList.remove("hidden");
        document.getElementById("sellItemName")?.focus();
      }
    }

    function closeSellModal() {
      if (sellModal) {
        sellModal.classList.add("hidden");
        sellForm?.reset();
        if (sellPreview) sellPreview.textContent = "0";
      }
    }

    // อัพเดทราคาขายแบบเรียลไทม์
    if (sellPriceInput && sellPreview) {
      sellPriceInput.addEventListener("input", () => {
        const price = Number(sellPriceInput.value) || 0;
        sellPreview.textContent = fmt(Math.floor(price / 2));
      });
    }

    if (addSellBtn) addSellBtn.addEventListener("click", openSellModal);
    if (closeSellBtn) closeSellBtn.addEventListener("click", closeSellModal);

    // ปิดเมื่อคลิกพื้นหลัง
    if (sellModal) {
      sellModal.addEventListener("click", (e) => {
        if (e.target === sellModal) closeSellModal();
      });
    }

    // จัดการ form submit
    if (sellForm) {
      sellForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("sellItemName")?.value?.trim();
        const qty = Number(document.getElementById("sellItemQty")?.value) || 1;
        const price = Number(document.getElementById("sellItemPrice")?.value) || 0;

        if (!name) {
          alert("กรุณาใส่ชื่อไอเทม");
          return;
        }
        if (price <= 0) {
          alert("กรุณาใส่ราคาไอเทม");
          return;
        }

        addSellItem(name, qty, price);
        closeSellModal();
      });
    }
  });

  // expose
  window.CART = { addSelected, remove, setQty, clear, render, addSellItem, addSellItemFromItem };
})();
