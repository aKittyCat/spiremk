(function (w) {
  // —— แก้/เติมรายการที่นี่ —————————————————————
  // ปิดการเลือกทั้ง "ประเภท" (เช่น Gemstone, Generic Variant, Treasure (Gemstone) ฯลฯ)
  const DISABLE_TYPES = new Set([
    // ตัวอย่าง:
    // 'Gemstone',
    'Craft',
    'Craft, Potion, Glass Arboretum',
    'Craft Only Item',
    'Craft Only Item, Battleaxe, Martial Weapon, Melee Weapon',
    'Craft Only Item, Dagger, Simple Weapon, Melee Weapon',
    'Craft Only Item, Flail, Martial Weapon, Melee Weapon',
    'Craft Only Item, Greataxe, Martial Weapon, Melee Weapon',
    'Craft Only Item, Greatsword, Martial Weapon, Melee Weapon',
    'Craft Only Item, Longsword, Martial Weapon, Melee Weapon',
    'Craft Only Item, Mace, Simple Weapon, Melee Weapon',
    'Craft Only Item, Mace, Wand, Simple Weapon, Melee Weapon',
    'Craft Only Item, Morningstar, Martial Weapon, Melee Weapon',
    'Craft Only Item, Martial Weapon, Longsword',
    'Craft Only Item, Pike, Simple Weapon, Melee Weapon',
    'Craft Only Item, Rapier, Martial Weapon, Melee Weapon',
    'Craft Only Item, Ring',
    'Craft Only Item, Rod',
    'Craft Only Item, Shortbow, Simple Weapon, Range Weapon',
    'Craft Only Item, Simple Weapon (Spear)',
    'Craft Only Item, Spear, Simple Weapon, Melee Weapon',
    'Craft Only Item, Staff, Simple Weapon, Melee Weapon',
    'Craft Only Item, Trident, Martial Weapon, Melee Weapon',
    'Craft Only Item, Wand',
    'Craft Only Item, Warhammer, Martial Weapon, Melee Weapon',
    'Craft Only Item, Warpick, Martial Weapon, Melee Weapon',
    'Craft Only Item, Weapon, Generic Variant',
    'Craft Only Item, Whip, Martial Weapon, Melee Weapon',
    'Craft Only Item, Whip, Simple Weapon, Melee Weapon',
    'Craft Only Item, Wondrous Item',
    'Trade Good',
    'Treasure (Gemstone)',
    'Mount',
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