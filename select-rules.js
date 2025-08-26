(function (w) {
  // —— แก้/เติมรายการที่นี่ —————————————————————
  // ปิดการเลือกทั้ง "ประเภท" (เช่น Gemstone, Generic Variant, Treasure (Gemstone) ฯลฯ)
  const DISABLE_TYPES = new Set([
    // ตัวอย่าง:
    // 'Gemstone',
    'Treasure (Gemstone)',
  ].map(s => s.toLowerCase().trim()));

  // ปิดการเลือกตาม "ชื่อไอเทม"
  // ใส่ได้ทั้งสตริงเป๊ะ ๆ หรือ RegExp
  const DISABLE_NAMES = [
    // 'Potion of Invisibility',
  ];

  // ปิดการเลือกตาม id (ถ้ารู้ id จากข้อมูล)
  const DISABLE_IDS = new Set([
    // 'abc123', 'def456'
  ]);

  // กติกาพิเศษเพิ่มเติม (ทางเลือก): คืนข้อความเหตุผลถ้าต้องการปิด
  // ใช้เมื่ออยากปิดตามเงื่อนไขซับซ้อน เช่น rarity, tier, attunement ฯลฯ
  function customRule(item) {
    // ตัวอย่าง:
    // if (String(item.rarity).toLowerCase()==='artifact') return 'ห้ามเลือก Artifact';
    return null;
  }

  function reason(item) {
    if (!item) return null;

    if (DISABLE_IDS.has(item.id)) return 'ไอเทมนี้ถูกปิดการเลือก';

    const type = String(item.type || '').toLowerCase().trim();
    if (DISABLE_TYPES.has(type)) return `ปิดประเภท ${item.type}`;

    const name = String(item.name || '');
    for (const pat of DISABLE_NAMES) {
      if (typeof pat === 'string') {
        if (name.toLowerCase() === pat.toLowerCase()) return `ปิด ${pat}`;
      } else if (pat instanceof RegExp && pat.test(name)) {
        return 'ปิดตามกฎชื่อไอเทม';
      }
    }

    const why = customRule(item);
    if (why) return why;

    return null;
  }

  w.SELECT_RULES = {
    shouldDisable: reason,
    // เผื่ออยากแก้จากคอนโซล:
    config: { DISABLE_TYPES, DISABLE_NAMES, DISABLE_IDS },
  };
})(window);