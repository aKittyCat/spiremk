/* cart.js — ตะกร้าสินค้า (รองรับ Generic Variant + Gemstone) */
(function () {
  // ===== helpers: เรียกสดจาก window เสมอ (กันกรณีประกาศช้ากว่า cart.js) =====
  const call = (name, def) => (typeof window[name] === "function" ? window[name] : def);
  const fmt = (n) => call("fmt", (x) => String(Number(x)||0))(n);
  const parsePrice = (s) => call("parsePrice", (t)=>Number(String(t).replace(/[^0-9.\-]/g,""))||0)(s);
  const isGemstone = (it) => call("isGemstone", (x)=>/\bgemstone\b/i.test(x?.type||""))(it);
  const getGemAddon = () => call("getGemAddon", ()=>null);
  const getGVAddon  = () => call("getGVAddon",  ()=>null);

  const itemsRef = () =>
    Array.isArray(window.currentItems) ? window.currentItems :
    (typeof window.currentItems !== "undefined" ? window.currentItems :
      (typeof window.currentItems === "undefined" && typeof window.currentItems !== "object" && typeof currentItems !== "undefined" ? currentItems : []));

  const itemById = (id) => itemsRef().find(x => String(x.id) === String(id));

  // ===== state =====
  const cart = new Map();   // key -> entry

  // ===== model =====
  function buildEntryFromItem(item){
    const opts = [];

    // 1) ราคาเริ่มต้นของไอเทม
    let baseGp = parsePrice(item.price);

    // 2) ถ้าเป็น Gemstone และผู้ใช้เลือกแล้ว → ใช้ราคาสุดท้าย (final)
    const gemSel = getGemAddon()?.(item);
    if (isGemstone(item)) {
      if (gemSel && isFinite(Number(gemSel.final))) {
        baseGp = Number(gemSel.final);
        opts.push(`${gemSel.name} ${fmt(gemSel.worth)} gp worth × ${Number(gemSel.factor||1).toFixed(2)} = ${fmt(gemSel.final)} gp`);
      } else {
        const m = String(item.name||"").match(/([\d,.]+)\s*gp/i);
        baseGp = m ? Number(m[1].replace(/,/g,"")) : 0;
      }
    }

    // 3) ถ้าเป็น Generic Variant แล้วมี Base item → บวกราคา Base
    const gvSel = getGVAddon()?.(item); // {name,resultName?,price}
    if (gvSel && isFinite(Number(gvSel.price))) {
      baseGp += Number(gvSel.price);
      opts.push(`Base: ${gvSel.resultName || gvSel.name}`);
    }

    // 4) คีย์แยกตามตัวเลือก เพื่อรวมจำนวนของ “รายการเดียวกัน+ตัวเลือกเดียวกัน”
    const key = [
      item.id,
      gvSel?.resultName || gvSel?.name || "",
      gemSel ? `${gemSel.name}|${gemSel.worth}|${gemSel.final}` : ""
    ].join("|");

    return {
      key,
      id: item.id,
      name: item.name,
      unitGp: baseGp,   // ราคาต่อชิ้น (gp)
      qty: 1,
      options: opts     // array ของป้ายกำกับ
    };
  }

  function upsert(entry){
    if (cart.has(entry.key)) {
      const e = cart.get(entry.key);
      e.qty += entry.qty;
    } else {
      cart.set(entry.key, entry);
    }
    render();
  }

  // ===== public API =====
  function addSelected(idList){
    idList.forEach(id => {
      const it = itemById(id);
      if (!it) return;
      const e = buildEntryFromItem(it);
      upsert(e);
    });
  }
  function remove(key){ cart.delete(key); render(); }
  function setQty(key, n){
    const e = cart.get(key); if (!e) return;
    e.qty = Math.max(1, Number(n)||1); render();
  }
  function clear(){ cart.clear(); render(); }
  function totalGp(){
    let t=0; cart.forEach(e => t += e.unitGp * e.qty); return t;
  }
  function countItems(){
    let c=0; cart.forEach(e => c += e.qty); return c;
  }

  // ===== copy to Discord (ข้อความแบบเดียวกับ “คัดลอกที่เลือกไป Discord”) =====
  function toDiscordText(){
    const lines = [];
    cart.forEach(e => {
      const opt = e.options.length ? ` [${e.options.join(" • ")}]` : "";
      const unit = `${fmt(e.unitGp)} gp`;
      const sum  = `${fmt(e.unitGp * e.qty)} gp`;
      lines.push(`- ${e.name}${opt} | ${unit} × ${e.qty} — รวม: ${sum}`);
    });

    const header = `สั่งซื้อ (${countItems()} ชิ้น)`;
    const total  = `รวมทั้งสิ้น: ${fmt(totalGp())} gp`;
    return "" + header + "\n" + lines.join("\n") + "\n— " + total + ""; // <--- No Markdown
    // return "```md\n" + header + "\n" + lines.join("\n") + "\n— " + total + "\n```"; // <--- แบบ Markdown
  }

  // ===== view =====
  function render(){
    // badge
    const badge = document.getElementById("cartBadge");
    if (badge){
      const c = countItems();
      badge.textContent = String(c);
      badge.classList.toggle("hidden", c===0);
    }

    const empty = document.getElementById("cartEmpty");
    const table = document.getElementById("cartTable");
    const footer= document.getElementById("cartFooter");
    const body  = document.getElementById("cartBody");
    const total = document.getElementById("cartTotal");
    if (!empty || !table || !footer || !body || !total) return;

    body.innerHTML = "";
    if (cart.size === 0){
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
    cart.forEach(e => {
      rows.push(`
        <tr class="border-t border-gray-700/40">
          <td class="px-4 py-3">
            <div class="font-semibold">${escapeHtml(e.name)}</div>
          </td>
          <td class="px-4 py-3 text-gray-300">
            ${e.options.map(o=>`<span class="inline-block bg-gray-700/60 px-2 py-0.5 rounded mr-1 mb-1">${escapeHtml(o)}</span>`).join("")}
          </td>
          <td class="px-4 py-3 text-right tabular-nums whitespace-nowrap">${fmt(e.unitGp)} gp</td>
          <td class="px-2 py-3 text-center">
            <div class="inline-flex items-center bg-gray-700/60 rounded">
              <button class="px-2" data-dec="${e.key}" aria-label="decrease">−</button>
              <input class="w-14 text-center bg-transparent outline-none" data-qty="${e.key}" value="${e.qty}">
              <button class="px-2" data-inc="${e.key}" aria-label="increase">+</button>
            </div>
          </td>
          <td class="px-4 py-3 text-right tabular-nums">${fmt(e.unitGp * e.qty)} gp</td>
          <td class="px-2 py-3 text-center">
            <button class="text-red-400 hover:text-red-300" title="ลบ" data-remove="${e.key}">✕</button>
          </td>
        </tr>
      `);
    });
    body.innerHTML = rows.join("");
    total.textContent = fmt(totalGp());

    // events
    body.querySelectorAll("[data-remove]").forEach(b => {
      b.addEventListener("click", e => remove(e.currentTarget.dataset.remove));
    });
    body.querySelectorAll("[data-inc]").forEach(b => {
      b.addEventListener("click", e => {
        const k = e.currentTarget.dataset.inc; const x = cart.get(k); if (!x) return;
        setQty(k, x.qty + 1);
      });
    });
    body.querySelectorAll("[data-dec]").forEach(b => {
      b.addEventListener("click", e => {
        const k = e.currentTarget.dataset.dec; const x = cart.get(k); if (!x) return;
        setQty(k, Math.max(1, x.qty - 1));
      });
    });
    body.querySelectorAll("[data-qty]").forEach(inp => {
      inp.addEventListener("input", e => {
        const k = e.currentTarget.dataset.qty;
        const v = Math.max(1, Number(e.currentTarget.value)||1);
        setQty(k, v);
      });
    });
  }

  // ===== wire cart page buttons =====
  document.addEventListener("DOMContentLoaded", () => {
    // ปุ่มคัดลอก (รองรับทั้ง id เดิมและใหม่)
    const copyBtn = document.getElementById("copyCartBtn") || document.getElementById("copyCartEmbedBtn");
    if (copyBtn) copyBtn.addEventListener("click", async () => {
      const text = toDiscordText();
      await navigator.clipboard.writeText(text);
      const old = copyBtn.textContent;
      copyBtn.textContent = "คัดลอกแล้ว ✓";
      setTimeout(()=> copyBtn.textContent = old, 1200);
    });

    const clearBtn = document.getElementById("clearCartBtn");
    if (clearBtn) clearBtn.addEventListener("click", clear);
  });

  // expose
  window.CART = { addSelected, remove, setQty, clear, render };
})();