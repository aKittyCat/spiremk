// ===== gv-allowed.js =====
// กำหนด "รายการอนุญาต" ของแต่ละ Generic Variant แบบเป็นมิตรต่อการแก้ไข
// key ของ variant ใช้รูปแบบ:
//   "weapon+1", "weapon+2", "weapon+3", "shield+1", "adamantine-weapon", ...
// list: รายชื่อ Base Item ที่อนุญาต (เทียบกับ item.name ใน currentItems แบบไม่สนตัวพิมพ์)

(function(){
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

  const ARMOR_BASES = [
    "Breastplate","Chain Mail","Chain Shirt","Half Plate Armor","Hide Armor","Leather Armor","Padded Armor","Plate Armor",
    "Ring Mail","Scale Mail", "Spiked Armor","Splint Armor","Studded Leather Armor"
  ];

  const SHIELD_BASES = [
    "Shield"
  ];

  const makeSet = (arr)=> new Set(arr.map(s=>String(s).toLowerCase()));

  // ตั้งค่าวิธีสร้างชื่อ "ผลลัพธ์หลังอัพเกรด" ต่อ base item แต่ละ variant
  const GV_ALLOWED = {
    "weapon+1":           { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} +1 ` },
    "weapon+2":           { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} +2 ` },
    "weapon+3":           { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} +3 ` },
    "armor+1":            { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} +1 ` },
    "armor+2":            { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} +2 ` },
    "armor+3":            { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} +3 ` },
    "shield+1":           { kind: "shield",   list: makeSet([SHIELD_BASES]),            makeName: (base)=> `${base} +1 ` },
    "shield+2":           { kind: "shield",   list: makeSet([SHIELD_BASES]),            makeName: (base)=> `${base} +2 ` },
    "shield+3":           { kind: "shield",   list: makeSet([SHIELD_BASES]),            makeName: (base)=> `${base} +3 ` },
    "adamantine-weapon":  { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Adamantine ${base}` },
    "adamantine-armor":   { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Adamantine ${base}` },
    "ruidium-weapon":   { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Ruidium ${base}` },
    "smoldering-armor": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Smoldering ${base}` },
    "silvered-weapon":   { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Silvered ${base}` },
    "vicious-weapon":    { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Vicious ${base}` },
    "vicious-weapon+1": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Vicious ${base} +1 ` },
    "weapon-of-certain-death": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Weapon of Certain Death ${base}` },
    "weapon-of-throne's-command": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Weapon of Throne's Command ${base}` },
    "weapon-of-warning": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Weapon of Warning ${base}` },
    // เพิ่มคีย์ใหม่ ๆ ได้ตามต้องการ เช่น:
    // "armor+2": { kind: "armor", list: makeSet([...]), makeName: (base)=> `+2 ${base}` },
  };

  // โยนขึ้น global
  window.GV_ALLOWED = GV_ALLOWED;
})();
