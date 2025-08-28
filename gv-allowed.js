// ===== gv-allowed.js =====
// กำหนด "รายการอนุญาต" ของแต่ละ Generic Variant แบบเป็นมิตรต่อการแก้ไข
// key ของ variant ใช้รูปแบบ:
//   "weapon+1", "weapon+2", "weapon+3", "shield+1", "adamantine-weapon", ...
// list: รายชื่อ Base Item ที่อนุญาต (เทียบกับ item.name ใน currentItems แบบไม่สนตัวพิมพ์)

(function(){
  // weapon
  const WEAPON_BASES = [
    "Antimatter Rifle","Automatic Pistol","Automatic Rifle","Battleaxe","Blowgun","Blunderbuss",
    "Boarding Axe","Cannon","Cleaver","Club","Dagger","Dart","Double-Bladed Scimitar","Flail",
    "Flintlock","Glaive","Greataxe","Greatclub","Greatsword","Halberd","Hand Crossbow","Handaxe",
    "Heavy Crossbow","Hooked Shortspear","Hoopak","Hunting Rifle","Javelin","Lance","Laser Pistol",
    "Laser Rifle","Light Crossbow","Light Hammer","Light Repeating Crossbow","Longbow","Longsword",
    "Mace","Maul","Morningstar","Musket","Pike","Pistol","Quarterstaff","Rapier","Revolver","Rifle",
    "Scimitar","Scythe","Shears","Shortbow","Shortsword","Shotgun","Sickle","Sling","Spear","Trident",
    "Twinshot Hand Crossbow","War Pick","Warhammer","Whip","Yklwa"
  ];

  const BLOODEDSHED_BLADE_BASES = [
    "Double-Bladed Scimitar","Greatsword","Longsword","Rapier","Scimitar","Shortsword"
  ];

  const DEMONBONE_POLEARM_BASES = [
    "Glaive","Halberd","Scythe"
  ];

  const FORCEBREAKER_WEAPON_BASES = [
    "Club","Flail","Greatclub","Light Hammer","Mace","Maul","Quarterstaff","Sling","Staff","Warhammer","Wooden Staff"
  ];  

  const GLIMMERLING_MOONBOW_BASES = [
    "Longbow","Shortbow"
  ];

  const STARSHOT_CROSSBOW_BASES = [
    "Hand Crossbow","Heavy Crossbow","Light Crossbow","Light Repeating Crossbow"
  ];
  // armor
  const ARMOR_BASES = [
    "Breastplate","Chain Mail","Chain Shirt","Half Plate Armor","Hide Armor","Leather Armor","Padded Armor","Plate Armor",
    "Ring Mail","Scale Mail", "Spiked Armor","Splint Armor","Studded Leather Armor"
  ];

  const ARMOR_OF_FUNGAL_SPORES_BASES = [ 
    "Breastplate","Chain Shirt","Half Plate Armor","Hide Armor","Scale Mail","Spiked Armor"
  ];

  const ARMOR_OF_THE_FALLEN_BASES = [ 
    "Breastplate","Chain Mail","Chain Shirt","Half Plate Armor","Hide Armor","Plate Armor","Ring Mail","Scale Mail","Spiked Armor","Splint Armor"
  ];

  const ARMOR_OF_SAFEGUARDING_BASES = [ 
    "Chain Mail","Plate Armor","Ring Mail","Splint Armor"
  ];

  const ARMOR_OF_VULNARABILITY_BASES = [
    "Plate Armor"
  ];

  const MITHRAL_ARMOR_BASES = [ 
    "Breastplate","Chain Mail","Chain Shirt","Half Plate Armor","Plate Armor",
    "Ring Mail","Scale Mail", "Spiked Armor","Splint Armor"
  ];

  const ZEPHYR_ARMOR_BASES = [ 
    "Leather Armor","Padded Armor","Studded Leather Armor"
  ];

  const SHIELD_BASES = [
    "Shield"
  ];

  const makeSet = (arr)=> new Set(arr.map(s=>String(s).toLowerCase()));

  // ตั้งค่าวิธีสร้างชื่อ "ผลลัพธ์หลังอัพเกรด" ต่อ base item แต่ละ variant
  const GV_ALLOWED = {
    "weapon+1":           { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} +1` },
    "weapon+2":           { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} +2` },
    "weapon+3":           { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} +3` },
    "armor+1":            { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} +1` },
    "armor+2":            { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} +2` },
    "armor+3":            { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} +3` },
    "shield+1":           { kind: "shield",   list: makeSet(SHIELD_BASES),            makeName: (base)=> `${base} +1` },
    "shield+2":           { kind: "shield",   list: makeSet(SHIELD_BASES),            makeName: (base)=> `${base} +2` },
    "shield+3":           { kind: "shield",   list: makeSet(SHIELD_BASES),            makeName: (base)=> `${base} +3` },
    "adamantine-weapon":  { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Adamantine ${base}` },
    "adamantine-armor":   { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Adamantine ${base}` },
    "armor-of-fungal-spores": { kind: "armor",   list: makeSet(ARMOR_OF_FUNGAL_SPORES_BASES), makeName: (base)=> `${base} of Fungal Spores` },
    "armor-of-the-fallen": { kind: "armor",   list: makeSet(ARMOR_OF_THE_FALLEN_BASES), makeName: (base)=> `${base} of the Fallen` },
    "armor-of-safeguarding": { kind: "armor",   list: makeSet(ARMOR_OF_SAFEGUARDING_BASES), makeName: (base)=> `${base} of Safeguarding` },
    "armor-of-weightlessness": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} of Weightlessness` },
    "armor-of-vulnerability": { kind: "armor",   list: makeSet(ARMOR_OF_VULNARABILITY_BASES), makeName: (base)=> `${base} of Vulnerability` },
    "bloodshed-blade":   { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `Bloodshed ${base}` },
    "bow-of-conflagration": { kind: "weapon",  list: makeSet(GLIMMERLING_MOONBOW_BASES), makeName: (base)=> `${base} of Conflagration` },
    "bow-of-melodies": { kind: "weapon",  list: makeSet(GLIMMERLING_MOONBOW_BASES), makeName: (base)=> `${base} of Melodies` },
    "clockwork-armor": { kind: "armor",   list: makeSet(ARMOR_OF_SAFEGUARDING_BASES),  makeName: (base)=> `Clockwork ${base}` },
    "demonbone-polearm": { kind: "weapon",  list: makeSet(DEMONBONE_POLEARM_BASES), makeName: (base)=> `Demonbone ${base}` },
    "demon-skin":       { kind: "armor",   list: makeSet(ARMOR_OF_SAFEGUARDING_BASES),           makeName: (base)=> `Demon Skin ${base}` },
    "fool's-blade":     { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Fool's ${base}` },
    "forcebreaker-weapon": { kind: "weapon",  list: makeSet(FORCEBREAKER_WEAPON_BASES), makeName: (base)=> `Forcebreaker ${base}` },
    "glimmerling-moonbow": { kind: "weapon",  list: makeSet(GLIMMERLING_MOONBOW_BASES), makeName: (base)=> `Glimmerling Moon ${base}` },
    "hellfire-weapon":  { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Hellfire ${base}` },
    "mithral-armor":    { kind: "armor",   list: makeSet(MITHRAL_ARMOR_BASES),    makeName: (base)=> `Mithral ${base}` },
    "oceanic-weapon":   { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Oceanic ${base}` },
    "ruidium-armor":    { kind: "armor",   list: makeSet(MITHRAL_ARMOR_BASES),           makeName: (base)=> `Ruidium ${base}` },
    "ruidium-weapon":   { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Ruidium ${base}` },
    "smoldering-armor": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Smoldering ${base}` },
    "starshot-crossbow": { kind: "weapon",  list: makeSet(STARSHOT_CROSSBOW_BASES), makeName: (base)=> `Starshot ${base}` },
    "silvered-weapon":   { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Silvered ${base}` },
    "vicious-weapon":    { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Vicious ${base}` },
    "vicious-weapon+1": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Vicious ${base} +1` },
    "weapon-of-certain-death": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> ` ${base} of Certain Death` },
    "weapon-of-throne's-command": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> ` ${base} of Throne's Command` },
    "weapon-of-warning": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Weapon of Warning ${base}` },
    "zephyr-armor":     { kind: "armor",   list: makeSet(ZEPHYR_ARMOR_BASES),     makeName: (base)=> `Zephyr ${base}` },
    // เพิ่มคีย์ใหม่ ๆ ได้ตามต้องการ เช่น:
    // "armor+2": { kind: "armor", list: makeSet([...]), makeName: (base)=> `+2 ${base}` },
  };

  // โยนขึ้น global
  window.GV_ALLOWED = GV_ALLOWED;
})();
