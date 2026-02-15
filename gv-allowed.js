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

  const ARMBLADE_BASES = [
    "Battleaxe","Cleaver","Club","Dagger","Flail","Handaxe","Hooked Shortspear","Javelin","Lance","Light Hammer",
    "Mace","Morningstar","Quarterstaff","Rapier","Scimitar","Shears","Shortsword","Sickle","Spear","Trident","War Pick","Warhammer","Whip","Yklwa"
  ];

  const BLOODEDSHED_BLADE_BASES = [
    "Double-Bladed Scimitar","Greatsword","Longsword","Rapier","Scimitar","Shortsword"
  ];

  const COMET_SMASHER_BASES = [
    "Club","Dagger","Greatclub","Light Hammer","Mace","Maul","Quarterstaff","Warhammer"
  ];

  const DEMONBONE_POLEARM_BASES = [
    "Glaive","Halberd","Scythe"
  ];

  const FORCEBREAKER_WEAPON_BASES = [
    "Club","Flail","Greatclub","Light Hammer","Mace","Maul","Quarterstaff","Sling","Staff","Warhammer","Wooden Staff"
  ];

  const GIANT_SLAYER_BASES = [
    "Battleaxe","Boarding Axe","Double-Bladed Scimitar","Greataxe","Greatsword","Handaxe","Longsword","Rapier","Scimitar","Shortsword"
  ];

  const GLIMMERING_MOONBOW_BASES = [
    "Longbow","Shortbow"
  ];

  const JO_CATIAN_DENIER_BASES = [
    "Longsword","Scimitar","Shortsword"
  ];

  const ORB_OF_SHIELDING_BASES = [
    "Crystal","Orb"
  ];

  const SABER_OF_UNITY_BASES = [
    "Rapier","Scimitar"
  ];

  const STARCROSSED_BOW_BASES = [
    "Hand Crossbow","Heavy Crossbow","Light Crossbow","Light Repeating Crossbow","Longbow","Shortbow"
  ];

  const STARSHOT_CROSSBOW_BASES = [
    "Hand Crossbow","Heavy Crossbow","Light Crossbow","Light Repeating Crossbow"
  ];

  const SWORD_OF_SHARPNESS_BASES = [
    "Double-Bladed Scimitar","Greatsword","Longsword","Scimitar"
  ];
  const SWORD_OF_ANSWERING_BASES = [
    "Longsword"
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

  const MYCELIAWEAVE_BASES= [
    "Hide Armor","Leather Armor","Studded Leather Armor"
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
    "acheron-blade":  { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `Acheron Blade ${base}` },
    "antimagic-armor": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Antimagic ${base}` },
    "armblade":        { kind: "weapon",  list: makeSet(ARMBLADE_BASES),          makeName: (base)=> `${base} Armblade` },
    "armor-of-fungal-spores": { kind: "armor",   list: makeSet(ARMOR_OF_FUNGAL_SPORES_BASES), makeName: (base)=> `${base} of Fungal Spores` },
    "armor-of-gleaming": { kind: "armor",   list: makeSet(ARMOR_OF_THE_FALLEN_BASES),           makeName: (base)=> `${base} of Gleaming` },
    "armor-of-the-fallen": { kind: "armor",   list: makeSet(ARMOR_OF_THE_FALLEN_BASES), makeName: (base)=> `${base} of the Fallen` },
    "armor-of-resistance": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} of Resistance(อย่าลืมระบุกันธาตุ)` },
    "armor-of-safeguarding": { kind: "armor",   list: makeSet(ARMOR_OF_SAFEGUARDING_BASES), makeName: (base)=> `${base} of Safeguarding` },
    "armor-of-weightlessness": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `${base} of Weightlessness` },
    "armor-of-vulnerability": { kind: "armor",   list: makeSet(ARMOR_OF_VULNARABILITY_BASES), makeName: (base)=> `${base} of Vulnerability(อย่าลืมระบุประเภท)` },
    "blade-of-the-medusa": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `${base} of the Medusa` },
    "blade-of-the-wood": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `${base} of the Wood` },
    "bloodshed-blade":   { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `Bloodshed ${base}` },
    "bow-of-conflagration": { kind: "weapon",  list: makeSet(GLIMMERLING_MOONBOW_BASES), makeName: (base)=> `${base} of Conflagration` },
    "bow-of-melodies": { kind: "weapon",  list: makeSet(GLIMMERLING_MOONBOW_BASES), makeName: (base)=> `${base} of Melodies` },
    "cast-off-armor": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Cast-Off ${base}` },
    "clockwork-armor": { kind: "armor",   list: makeSet(ARMOR_OF_SAFEGUARDING_BASES),  makeName: (base)=> `Clockwork ${base}` },
    "comet-smasher":      { kind: "weapon",  list: makeSet(COMET_SMASHER_BASES),          makeName: (base)=> `Comet Smasher ${base}` },
    "corpse-slayer":      { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Corpse Slayer ${base}` },
    "crystal-blade":     { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Crystal ${base}` },
    "dancing-sword":     { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Dancing ${base}` },
    "defender":     { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Defender ${base}` },
    "demonbone-polearm": { kind: "weapon",  list: makeSet(DEMONBONE_POLEARM_BASES), makeName: (base)=> `Demonbone ${base}` },
    "demon-skin":       { kind: "armor",   list: makeSet(ARMOR_OF_SAFEGUARDING_BASES),           makeName: (base)=> `Demon Skin ${base}` },
    "delerium-forged-blade": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `Delerium-Forged Blade ${base}` },
    "dragon-slayer":     { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Dragon Slayer ${base}` },
    "dragon-wing-bow": { kind: "weapon",  list: makeSet(GLIMMERLING_MOONBOW_BASES), makeName: (base)=> `Dragon Wing ${base}` },
    "eternal-slayer":    { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Eternal Slayer ${base}` },
    "sagittarian-vestments": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Sagittarian ${base}` },
    "slumbering-dragons-wrath-weapon": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Slumbering Dragon Wrath ${base}` },
    "stirring-dragons-wrath-weapon": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Stirring Dragon Wrath ${base}` },
    "sword-of-answering": { kind: "weapon",  list: makeSet(SWORD_OF_ANSWERING_BASES),          makeName: (base)=> `Sword of Answering ${base}(อย่าลืมระบุประเภท)` },
    "sword-of-the-planes": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `${base} of the Planes` },
    "sword-of-retribution": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `${base} of Retribution` },
    "flame-tongue":     { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Flame Tongue ${base}` },
    "fools-blade":     { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Fool's ${base}` },
    "forcebreaker-weapon": { kind: "weapon",  list: makeSet(FORCEBREAKER_WEAPON_BASES), makeName: (base)=> `Forcebreaker ${base}` },
    "frost-brand":      { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Frost Brand ${base}` },
    "giant-slayer":    { kind: "weapon",  list: makeSet(GIANT_SLAYER_BASES),          makeName: (base)=> `Giant Slayer ${base}` },
    "glimmering-moonbow": { kind: "weapon",  list: makeSet(GLIMMERING_MOONBOW_BASES), makeName: (base)=> `Glimmering Moon ${base}` },
    "hellfire-weapon":  { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Hellfire ${base}` },
    "holy-avenger":      { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES),          makeName: (base)=> `Holy Avenger ${base}` },
    "jocatian-denier":  { kind: "weapon",  list: makeSet(JO_CATIAN_DENIER_BASES), makeName: (base)=> `Jo'Catian Denier ${base}` },
    "last-stand-armor": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Last Stand ${base}` },
    "living-armor":   { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Living ${base}` },
    "lycan-weapon":      { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Lycan ${base}` },
    "mariners-armor":  { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Mariner's ${base}` },
    "mithral-armor":    { kind: "armor",   list: makeSet(MITHRAL_ARMOR_BASES),    makeName: (base)=> `Mithral ${base}` },
    "mizzium-armor":    { kind: "armor",   list: makeSet(MITHRAL_ARMOR_BASES),           makeName: (base)=> `Mizzium ${base}` },
    "molten-bronze-skin": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Molten Bronze Skin (${base})` },
    "moon-touched-sword": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `Moon-Touched ${base}` },
    "myceliaweave-armor": { kind: "armor",   list: makeSet(MYCELIAWEAVE_BASES),           makeName: (base)=> `Myceliaweave (${base})` },
    "nine-lives-stealer": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `Nine Lives Stealer ${base}` },
    "oceanic-weapon":   { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Oceanic ${base}` },
    "orb-of-shielding": { kind: "spellcasting-focus",  list: makeSet(ORB_OF_SHIELDING_BASES), makeName: (base)=> `Orb of Shielding: Base items:${base}(อย่าลืมระบุประเภท)` },
    "red-feather-bow": { kind: "weapon",  list: makeSet(GLIMMERLING_MOONBOW_BASES), makeName: (base)=> `Red-Feather ${base}` },
    "ruidium-armor":    { kind: "armor",   list: makeSet(MITHRAL_ARMOR_BASES),           makeName: (base)=> `Ruidium ${base}` },
    "ruidium-weapon":   { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Ruidium ${base}` },
    "saber-of-unity":  { kind: "weapon",  list: makeSet(SABER_OF_UNITY_BASES),  makeName: (base)=> `Saber of Unity ${base}` },
    "smoldering-armor": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Smoldering ${base}` },
    "starcrossed-bow":  { kind: "weapon",  list: makeSet(STARCROSSED_BOW_BASES),  makeName: (base)=> `Starcrossed ${base}` },
    "starshot-crossbow": { kind: "weapon",  list: makeSet(STARSHOT_CROSSBOW_BASES), makeName: (base)=> `Starshot ${base}` },
    "silvered-weapon":   { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Silvered ${base}` },
    "smoldering-armor": { kind: "armor",   list: makeSet(ARMOR_BASES),           makeName: (base)=> `Smoldering ${base}` },
    "sword-of-life-stealing": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `${base} of Life Stealing` },
    "sword-of-sharpness": { kind: "weapon",  list: makeSet(SWORD_OF_SHARPNESS_BASES), makeName: (base)=> `${base} of Sharpness` },
    "sword-of-wounding": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `${base} of Wounding` },
    "sword-of-vengeance": { kind: "weapon",  list: makeSet(BLOODEDSHED_BLADE_BASES), makeName: (base)=> `${base} of Vengeance` },
    "vicious-weapon":    { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Vicious ${base}` },
    "vicious-weapon+1": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Vicious ${base} +1` },
    "vorpal-sword": { kind: "weapon",  list: makeSet(SWORD_OF_SHARPNESS_BASES), makeName: (base)=> `Vorpal ${base}` },
    "weapon-of-certain-death": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} of Certain Death` },
    "weapon-of-thrones-command": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} of Throne's Command` },
    "weapon-of-warning": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `${base} of Warning` },
    "dragon-wrath-weapon-slumbering": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Slumbering Dragon's Wrath ${base}` },
    "dragon-wrath-weapon-stirring": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Stirring Dragon's Wrath ${base}` },
    "dragon-wrath-weapon-ascendent": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Ascendent Dragon's Wrath ${base}` },
    "dragon-wrath-weapon-wakened": { kind: "weapon",  list: makeSet(WEAPON_BASES),          makeName: (base)=> `Wakened Dragon's Wrath ${base}` },
    "zephyr-armor":     { kind: "armor",   list: makeSet(ZEPHYR_ARMOR_BASES),     makeName: (base)=> `Zephyr ${base}` },
    // เพิ่มคีย์ใหม่ ๆ ได้ตามต้องการ เช่น:
    // "armor+2": { kind: "armor", list: makeSet([...]), makeName: (base)=> `+2 ${base}` },
  };

  // โยนขึ้น global
  window.GV_ALLOWED = GV_ALLOWED;
})();
