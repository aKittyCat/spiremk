// ========== ข้อมูลสัตว์เลี้ยงแบบแยก Tier/CR ==========
// 1. BASE PETS (สัตว์เลี้ยงพื้นฐานของ CR นั้นๆ เริ่มต้นที่ Tier ใด)
const petsCR0_T1_BASE = [
  "Almiraj", "Baboon", "Badger", "Bat", "Cat", "Chimeric Baboon", "Chimeric Cat", "Chimeric Fox", "Chimeric Hare", "Chimeric Rat", "Chimeric Weasel", "Crab",
  "Deer", "Dusktail", "Eagle", "Emberbat", "Everbug", "Fish", "Fox", "Frog",
  "Giant Fire Beetle", "Gibberling", "Goat", "Hare", "Hawk", "Hyena", "Jackal", "Knucklehead Trout",
  "Lizard", "Octopus", "Owl", "Peacock", "Piccolo", "Pig", "Quipper", "Rat",
  "Raven", "Rooster", "Scorpion", "Sea Horse", "Seal", "Sheep", "Space Guppy", "Space Hamster", "Space Mollymawk", "Spider", "Vulture", "Weasel", "Wild Dog"
];

const petsCR1_8_T1_BASE = [
  "Blood Hawk", "Camel", "Caterpede", "Clawfish", "Flying Snake", "Giant Crab", "Giant Rat", "Glassbeetle",
  "Knifewing", "Manes", "Giant Weasel", "Mastiff", "Mountain Goat", "Mule",
  "Poisonous Snake", "Pony", "Skitterling", "Wharfling"
];

const petsCR1_4_T2_BASE = [
  "Abyssal Chicken", "Abyssal Wretch", "Animated Broom", "Animated Halberd", "Animated Jade Serpent", "Axe Beak", "Boar", "Broom of Animated Attack", "Cave Badger", "Constrictor Snake", 
  "Cow", "Crystal Battleaxe", "Deep Rothé", "Diatryma", "Dimetrodon", "Draft Horse", "Dretch", "Elk", "Fastieth", "Flying Shield", "Flying Staff", "Flying Sword", "Flying Trident", 
  "Flying Wand", "Garroter Crab", "Giant Badger", "Giant Bat", "Giant Centipede", "Giant Frog", "Giant Lizard", "Giant Mosquito", "Giant Poisonous Snake", "Giant Riding Lizard", 
  "Giant Snail", "Giant Space Hamster", "Giant Wolf Spider", "Golden Stag", "Hadrosaurus", "Hellwasp Grub", "Lion's Blume", "Living Wick", "Mohler", "Needle Blight", "Ox", "Panther", 
  "Paper Whirlwind", "Pteranodon", "Red-Banded Line Spider", "Reindeer", "Riding Horse", "Rothé", "Sled Dog", "Space Swine", "Suturefly", "Swamp Adder", "Swarm of Animated Books", 
  "Swarm of Bats", "Swarm of Blood Bats", "Swarm of Books", "Swarm of Rats", "Swarm of Ravens", "Thornlamm", "Velociraptor", "Violet Fungus", "Walrus", "Wolf", "Yak", "Zebra"
];

const petsCR1_2_T2_BASE = [
  "Anvilwrought Raptor", "Archer Flower", "Bird of Prey", "Black Bear", "Bone Crab", "Camel", "Clockwork Beetle", "Clockwork Watchman", "Crocodile", "Duergar Spore Servant", 
  "Fallen Luyarnhian", "Fiendish Giant Spider", "Gas Spore", "Giant Canary", "Giant Dragonfly", "Giant Goat", "Giant Sea Horse", "Giant Spider Rat", "Giant Wasp", "Jaculi", "Kiddywidget", 
  "Koi Prawn", "Metal Wasp", "Nupperibo", "Reef Shark", "Shieldhead", "Skull Flier", "Slicar", "Space Eel", "Stench Kow", "Swarm of Beetles", "Swarm of Bluebees", "Swarm of Centipedes", 
  "Swarm of Dusktails", "Swarm of Emberbats", "Swarm of Gimlets", "Swarm of Insects", "Swarm of Mechanical Spiders", "Swarm of Rot Grubs", "Swarm of Spiders", "Swarm of Wasps", 
  "Thorn Slinger", "Vine Blight", "Warhorse", "War Ostrich", "Watchwood Tree", "Xanka"
];

const petsCR1_T3_BASE = [
  "Abyssal Hyena", "Animated Armor", "Animated Armor Detention Drone", "Animated Chained Library", "Animated Drow Statue", "Ashen Animated Armor", "Bag Jelly", "Bronze Sable", "Broodiken", 
  "Brown Bear", "Clawfoot", "Clockwork Bronze Scout", "Clockwork Defender", "Corvian Dweller", "Deinonychus", "Demonfeed Spiderling", "Dire Wolf", "Dogmole", "Firelance", "Galvanice Weird", 
  "Gerridae", "Giant Blood Eel", "Giant Flying Spider", "Giant Hyena", "Giant Octopus", "Giant Ram", "Giant Rocktopus", "Giant Spider", "Giant Spore Lizard", "Giant Strider", "Giant Toad", 
  "Glass Gator", "Hypnotic Eldritch Blossom", "Ice Spider", "Jammer Leech", "Lesser Demon", "Lion", "Living Burning Hands", "Lupilisk Whelp", "Mantrap", "Maw Demon", "Moorbounder", 
  "Mountain Lion", "Purple Jam", "Quaggoth Spore Servant", "Razorvine Blight", "Rime Worm Grub", "Skeletal Fish", "Sloth Galloper", "Snow Leopard", "Spore Servant Octopus", "Stone Cursed", 
  "Swarm of Campestris", "Swarm of Giant Mosquitoes", "Swarm of Quippers", "Terracotta Warrior", "Thorny Vegepygmy", "Tiger", "Tin Soldier", "Vargouille", "Young Winter Wolf", 
  "Zanskaran Viper"
];

const petsCR2_T4_BASE = [
  "Allosaurus", "Animated Ballista", "Animated Slime", "Animated Table", "Animatronic Allosaurus", "Ankheg", "Aurochs", "Aurumvorax", "Autognome", "Bearracuda", "Burnished Hart", 
  "Carrion Crawler", "Cave Bear", "Clockwork Hound", "Cloverback Toad", "Cobbleswarm", "Cosmoth", "Diseased Grick", "Doppelrat", "Duergar Hammerer", "Eala", "Egg Hunter Hatchling", 
  "Eldritch Horror Hatchling", "Enormous Tentacle", "Firegeist", "Gargantuan Rug of Smothering", "Gelatinous Cube", "Giant Ant", "Giant Boar", "Giant Constrictor Snake", "Giant Crayfish", 
  "Giant Tick", "Giant White Moray Eel", "Glasswork Golem", "Grick", "Griffon", "Guard Drake", "Huge Ochre Jelly", "Huge Polar Bear", "Hunter Shark", "Ice Spider Queen", "Invisiboar", 
  "Lightning Eel", "Mimic", "Mjork Sootling Swarm", "Ochre Jelly", "Oozing Vulture", "Plainscow", "Plesiosaurus", "Polar Bear", "Purple Wormling", "Quetzalcoatlus", "Reduced-Threat Carrion Crawler", 
  "Reduced-Threat Ochre Jelly", "Relic Sloth", "Rhinoceros", "Rug of Smothering", "Rutterkin", "Saber-Toothed Tiger", "Scarapit", "Sentient Ochre Jelly", "Shadow Mastiff", "Shell Shark", "Shieldscale Drangolin", 
  "Skyjek Roc", "Slimesworn Cultist", "Spider Thief", "Stoneback Isopod", "Swarm of Hoard Scarabs", "Swarm of Maggots", "Swarm of Poisonous Snakes", "Swarm of Rain Hornets", "Two-Headed Cerberus", "Vegepygmy Thorny Hunter", 
  "White Dragon Wyrmling", "Yellow Musk Creeper", "Young Bulette", "Young Wakewyrm"
];

const petsCR3_T5_BASE = [
  "Amphiptere", "Amphisbaena", "Animated Stove", "Ankylosaurus", "Armored Saber-Toothed Tiger", "Assassin Vine", "Barkburr", "Basilisk", "Blood Screechwing", "Brackish Trudge", "Bramble Creeper", "Bristled Moorbounder", 
  "Butcher", "Cactid", "Carrion Stalker", "Cave Fisher", "Citrullus", "Clockwork Beetle Swarm", "Clockwork Huntsman", "Duergar Screamer", "Encephalon Gemmule", "Flail Snail", "Flying Horror", 
  "Giant Jellyfish", "Giant Lightning Eel", "Giant Ox", "Giant Scorpion", "Giant Snapping Turtle", "Hill Dragon", "Hook Horror Spore Servant", "Ice Gargoyle", "J'ba Fofi Spider", "Juvenile Forest Prowler", 
  "Killer Whale", "Lupilisk", "Mahoru", "Mbielu Dinosaur", "Mud Hulk", "Night Scorpion", "Owlbear", "Razorblade Bitzer", "Sahuagin Hatchling Swarm", "Sand Spider", "Screechwing", "Sheep Dragon", "Snow Golem", 
  "Snowy Owlbear", "Spotted Lion", "Stul", "Stygian Fat-Tailed Scorpion", "Swarm of Gibberlings", "Swarm of Prismatic Beetles", "Swarm of Scarabs", "Swarm of Wharflings", "Trapper", "War Spider", "Young Horizonback Tortoise"
];


// 2. ADDITION PETS (สัตว์เลี้ยงเพิ่มเติมเฉพาะ Tier นั้นๆ ใน CR นั้นๆ)
const petsCR0_T2_ADD = ["Campestri", "Clockwork Observer", "Living Demiplane", "Living Unseen Servant", "Mold Spider", "Paper Bird", "Scufflecup Teacup", "Shrieker"];
const petsCR1_8_T2_ADD = ["Animated Knife", "Clockwork Mule", "Drow Spore Servant", "Flying Rocking Horse", "Monodrone", "Replica Monodrone", "Tribal Warrior Spore Servant", "Twig Blight", "Vox Seeker", "Wooden Donkey"];

const petsCR0_T3_ADD = ["Campestri", "Clockwork Observer", "Dustbunny", "Living Demiplane", "Living Unseen Servant", "Mold Spider", "Paper Bird", "Scufflecup Teacup", "Shrieker"];
const petsCR1_8_T3_ADD = ["Animated Knife", "Campestri", "Clockwork Mule", "Clockwork Observer", "Drow Spore Servant", "Dustbunny", "Flying Rocking Horse", "Living Demiplane", "Living Unseen Servant", "Mold Spider", "Monodrone", "Paper Bird", "Replica Monodrone", "Scufflecup Teacup", "Shrieker", "Sticky Slime", "Tribal Warrior Spore Servant", "Twig Blight", "Vox Seeker", "Wooden Donkey"];
const petsCR1_4_T3_ADD = ["Ashen Flying Sword", "Blood-Borne Ooze", "Caustic Slime", "Dipsa", "Fungusfeaster", "Mjork Sootling", "Treacle"];
const petsCR1_2_T3_ADD = ["Ashen Warhorse", "Cursed Slime", "Gray Ooze", "Gray Ooze Glob", "Reduced-Threat Gray Ooze", "Sentient Gray Ooze", "Shifting Slime", "Soda Slime"];

const petsCR0_T4_ADD = ["Campestri", "Clockwork Observer", "Dustbunny", "Infant Basilisk", "Living Demiplane", "Living Unseen Servant", "Mold Spider", "Paper Bird", "Scufflecup Teacup", "Shrieker", "Sitri Cat", "Torcheater", "Young Griffon (Tiny)"];
const petsCR1_8_T4_ADD = ["Animated Knife", "Clockwork Mule", "Displacer Beast Kitten", "Drow Spore Servant", "Ether Fish", "Flying Rocking Horse", "Hoard Scarab", "Leyleech", "Monodrone", "Replica Monodrone", "Sticky Slime", "Stirge", "Stirge Broodling", "Tribal Warrior Spore Servant", "Twig Blight", "Vox Seeker", "Wooden Donkey", "Young Kruthik"];
const petsCR1_4_T4_ADD = ["Ashen Flying Sword", "Blood-Borne Ooze", "Caustic Slime", "Corpsejaw", "Dipsa", "Fungusfeaster", "Gray Scavver", "Male Steeder", "Map Mimic", "Mjork Sootling", "Pest Mascot", "Treacle", "Wretched Sorrowsworn", "Young Griffon (Small)"];
const petsCR1_2_T4_ADD = ["Ambush Drake", "Amphisbaena", "Ashen Warhorse", "Cockatrice", "Cursed Slime", "Darkmantle", "Gray Ooze", "Gray Ooze Glob", "Hippocamp", "Ice Piercer", "Piercer", "Psybird", "Reduced-Threat Darkmantle", "Reduced-Threat Gray Ooze", "Rust Monster", "Sentient Gray Ooze", "Shifting Slime", "Soda Slime", "Zorbo"];
const petsCR1_T4_ADD = ["Category 1 Krasis", "Crag Cat", "Death Dog", "Female Steeder", "Giant Antlion Hatchling", "Hippogriff", "Hound of Ill Omen", "Infant Amphithere", "Mimic Mimiature", "Nyx-Fleece Ram", "Rot Monster", "Young Basilisk", "Young Griffon (Medium)"];

const petsCR0_T5_ADD = ["Campestri", "Cranium Rat", "Dustbunny", "Infant Basilisk", "Living Demiplane", "Living Unseen Servant", "Mold Spider", "Paper Bird", "Scufflecup Teacup", "Shrieker", "Sitri Cat", "Sorrowfish", "Spythronar Sac", "Torcheater", "Young Griffon (Tiny)"];
const petsCR1_8_T5_ADD = ["Animated Knife", "Clockwork Mule", "Displacer Beast Kitten", "Drow Spore Servant", "Ether Fish", "Flying Dagger", "Flying Rocking Horse", "Hoard Scarab", "Leyleech", "Monodrone", "Replica Monodrone", "Slaad Tadpole", "Sticky Slime", "Stirge", "Stirge Broodling", "Tribal Warrior Spore Servant", "Twig Blight", "Vox Seeker", "Wooden Donkey", "Young Kruthik"];
const petsCR1_4_T5_ADD = ["Ashen Flying Sword", "Blood-Borne Ooze", "Caustic Slime", "Corpsejaw", "Dipsa", "Fungusfeaster", "Gray Scavver", "Male Steeder", "Map Mimic", "Mjork Sootling", "Pest Mascot", "Treacle", "Wretched Sorrowsworn", "Young Griffon (Small)"];
const petsCR1_2_T5_ADD = ["Ambush Drake", "Amphisbaena", "Ashen Warhorse", "Cockatrice", "Cursed Slime", "Darkmantle", "Gazer", "Gnome Squidling", "Gray Ooze", "Gray Ooze Glob", "Hippocamp", "Ice Piercer", "Piercer", "Psybird", "Reduced-Threat Darkmantle", "Reduced-Threat Gray Ooze", "Rust Monster", "Sentient Gray Ooze", "Shifting Slime", "Soda Slime", "Zorbo"];
const petsCR1_T5_ADD = ["Category 1 Krasis", "Choker", "Crag Cat", "Death Dog", "Female Steeder", "Giant Antlion Hatchling", "Hippogriff", "Hound of Ill Omen", "Infant Amphithere", "Mimic Mimiature", "Nyx-Fleece Ram", "Rot Monster", "Young Basilisk", "Young Griffon (Medium)"];
const petsCR2_T5_ADD = ["Gibbering Mouther", "Gingwatzim", "Horror Flit Hunter", "Sharkbody Abomination", "Spythronar Swarm", "Spythronar Web"];

// 3. โครงสร้างหลัก: petsByTierCR[CR][Tier] = [Pet List]
const petsByTierCR = {
  "0": {
    "1": petsCR0_T1_BASE,
    "2": [...petsCR0_T2_ADD], 
    "3": [...petsCR0_T3_ADD],
    "4": [...petsCR0_T4_ADD], 
    "5": [...petsCR0_T5_ADD], 
  },
  "1/8": {
    "1": petsCR1_8_T1_BASE,
    "2": [...petsCR1_8_T2_ADD],
    "3": [...petsCR1_8_T3_ADD],
    "4": [...petsCR1_8_T4_ADD],
    "5": [...petsCR1_8_T5_ADD],
  },
  "1/4": {
    "2": petsCR1_4_T2_BASE,
    "3": [...petsCR1_4_T3_ADD],
    "4": [...petsCR1_4_T4_ADD],
    "5": [...petsCR1_4_T5_ADD],
  },
  "1/2": {
    "2": petsCR1_2_T2_BASE,
    "3": [...petsCR1_2_T3_ADD],
    "4": [...petsCR1_2_T4_ADD],
    "5": [...petsCR1_2_T5_ADD],
  },
  "1": {
    "3": petsCR1_T3_BASE,
    "4": [...petsCR1_T4_ADD],
    "5": [...petsCR1_T5_ADD],
  },
  "2": {
    "4": petsCR2_T4_BASE,
    "5": [...petsCR2_T5_ADD],
  },
  "3": {
    "5": petsCR3_T5_BASE,
  }
};

// ========== Mapping Tier กับ CR ==========
const crByTier = {
  "1": ["0", "1/8"],
  "2": ["0", "1/8", "1/4", "1/2"],
  "3": ["0", "1/8", "1/4", "1/2", "1"],
  "4": ["0", "1/8", "1/4", "1/2", "1", "2"],
  "5": ["0", "1/8", "1/4", "1/2", "1", "2", "3"]
};


// ========== ราคา ==========
const buyCost = {
  "0": { gp: 300, favor: 25 },
  "1/8": { gp: 450, favor: 50 },
  "1/4": { gp: 600, favor: 75 },
  "1/2": { gp: 750, favor: 100 },
  "1": { gp: 1000, favor: 150 },
  "2": { gp: 1500, favor: 200 },
  "3": { gp: 2000, favor: 250 }
};

const changeCost = {
  "0": 10,
  "1/8": 25,
  "1/4": 50,
  "1/2": 75,
  "1": 100,
  "2": 100,
  "3" : 150
};

// ========== ทักษะที่ฝึกได้ ==========
const SKILLS = ["Guard", "Grapple", "Search", "Keep Watch", "Fetch", "Shove"];

// ========== DOM Elements ==========
const modal = document.getElementById('petModal');
const tierSelect = document.getElementById('tierSelect'); 
const crSelect = document.getElementById('crSelect');
const petSelect = document.getElementById('petSelect');
const buyBtn = document.getElementById('buyBtn');
const changeBtn = document.getElementById('changeBtn');
const trainBtn = document.getElementById('trainBtn');
const mainStep = document.getElementById('mainStep');
const trainStep = document.getElementById('trainStep');
const trainPetName = document.getElementById('trainPetName');
const skillsContainer = document.getElementById('skillsContainer');
const confirmTrainBtn = document.getElementById('confirmTrainBtn');
const backToMainBtn = document.getElementById('backToMainBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const openModalBtn = document.getElementById('openModalBtn');

// Preview elements
const buyPreview = document.getElementById('buyPreview');
const changePreview = document.getElementById('changePreview');
const trainPreview = document.getElementById('trainPreview');

// Image elements
const petImage = document.getElementById('petImage');
const petImageContainer = document.getElementById('petImageContainer');


// ========== แมป CR เป็น folder ==========
function getCRFolder(cr) {
  if (cr === "0") return "CR0";
  if (cr === "1/8") return "CR1_8";
  if (cr === "1/4") return "CR1_4";
  if (cr === "1/2") return "CR1_2";
  if (cr === "1") return "CR1";
  if (cr === "2") return "CR2";
  if (cr === "3") return "CR3";
  return "CR0";
}

// ========== แสดงรูปภาพสัตว์เลี้ยง ==========
function showPetImage(petName, cr) {
  if (!petName || !cr) {
    petImage.classList.add('hidden');
    return;
  }

  // แปลงชื่อให้ปลอดภัยสำหรับ URL (แทนช่องว่างด้วย %20 หรือใช้ encodeURI)
  const safeName = encodeURIComponent(petName.trim());
  const folder = getCRFolder(cr);
  const imageUrl = `https://raw.githubusercontent.com/aKittyCat/spiremk/refs/heads/main/pet/${folder}/${safeName}.png`;

  // ลองโหลดรูป
  const img = new Image();
  img.onload = () => {
    petImage.src = imageUrl;
    petImage.classList.remove('hidden');
  };
  img.onerror = () => {
    // ซ่อนรูปหากโหลดไม่ได้
    petImage.classList.add('hidden');
  };
  img.src = imageUrl; // เริ่มโหลด
}

// ========== อัปเดตลิสต์ CR ตาม Tier ==========
function updateCRList(tier) {
  crSelect.innerHTML = '';
  const crList = crByTier[tier];
  if (crList && crList.length > 0) {
    const fragment = document.createDocumentFragment();
    crList.forEach(cr => {
      const opt = document.createElement('option');
      opt.value = cr;
      opt.textContent = `CR ${cr}`;
      fragment.appendChild(opt);
    });
    crSelect.appendChild(fragment);
    crSelect.disabled = false;
    return crList[0];
  } else {
    crSelect.disabled = true;
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '-- ไม่พบ CR ใน Tier นี้ --';
    crSelect.appendChild(opt);
    return null;
  }
}

// ========== อัปเดตลิสต์สัตว์เลี้ยงตาม CR และ Tier (ปรับปรุงประสิทธิภาพ) ==========
function updatePetList(cr, tier) {
  petSelect.innerHTML = ''; // ล้างรายการเดิม
  
  if (!cr || !tier || !petsByTierCR[cr]) {
    petSelect.disabled = true;
    petSelect.innerHTML = '<option value="">-- โปรดเลือก CR ก่อน --</option>';
    return null;
  }

  const currentTier = parseInt(tier);
  let aggregatedPets = [];
  const petsInCR = petsByTierCR[cr];
  
  // หา Tier เริ่มต้นของ CR นี้
  const tierKeys = Object.keys(petsInCR).map(t => parseInt(t));
  const startingTier = tierKeys.length > 0 ? Math.min(...tierKeys) : 1;


  // วนลูปตั้งแต่ Tier เริ่มต้นของ CR จนถึง Tier ปัจจุบันที่เลือก เพื่อรวมรายการสัตว์เลี้ยง
  for (let t = startingTier; t <= currentTier; t++) {
    const tierKey = t.toString();
    
    if (petsInCR[tierKey]) {
      // เพิ่มรายการใหม่และกรองรายการซ้ำ
      const newPets = petsInCR[tierKey].filter(pet => !aggregatedPets.includes(pet));
      aggregatedPets = aggregatedPets.concat(newPets);
    }
  }
  
  // อัปเดต Dropdown
  if (aggregatedPets.length > 0) {
    aggregatedPets.sort(); // จัดเรียงตามตัวอักษร
    
    // **ใช้ DocumentFragment เพื่อลดความหน่วงในการ Manipulate DOM**
    const fragment = document.createDocumentFragment();
    
    aggregatedPets.forEach(pet => {
      const opt = document.createElement('option');
      opt.value = pet;
      opt.textContent = pet;
      fragment.appendChild(opt);
    });
    
    petSelect.appendChild(fragment); // แทรก Element เข้า DOM เพียงครั้งเดียว

    petSelect.disabled = false;
    return aggregatedPets[0]; 
  } else {
    petSelect.disabled = true;
    petSelect.innerHTML = '<option value="">-- ไม่พบสัตว์เลี้ยงในเงื่อนไขนี้ --</option>';
    return null;
  }
}

// ========== อัปเดต preview และรูปภาพ ==========
function updatePreviewsAndImage() {
  const pet = petSelect.value;
  const cr = crSelect.value;
  
  // ตรวจสอบว่ามีการเลือกสัตว์เลี้ยงและ CR
  const isEnabled = pet && cr;

  if (!isEnabled) {
    buyPreview.textContent = '';
    changePreview.textContent = '';
    petImage.classList.add('hidden');
    buyBtn.disabled = true;
    changeBtn.disabled = true;
    trainBtn.disabled = true;
    return;
  }

  // อัปเดต preview
  const buy = buyCost[cr];
  buyPreview.textContent = `ซื้อ ${pet} CR ${cr} โดยใช้ ${buy.gp}gp และ ${buy.favor} Favor`;

  const changeFavor = changeCost[cr];
  changePreview.textContent = `เปลี่ยนสัตว์เลี้ยงเป็น ${pet} CR ${cr} โดยใช้ ${changeFavor} Favor`;

  // เปิดใช้งานปุ่ม
  buyBtn.disabled = false;
  changeBtn.disabled = false;
  trainBtn.disabled = false;
  
  // แสดงรูปภาพ
  showPetImage(pet, cr);
}

// ========== ตั้งค่าเริ่มต้นเมื่อเปิด Modal ==========
function resetModalToDefault() {
  // ตั้งค่า Tier เริ่มต้นเป็น 1
  tierSelect.value = "1"; 
  const defaultTier = tierSelect.value;
  
  // อัปเดต CR ตาม Tier 1 (CR 0, 1/8)
  const defaultCR = updateCRList(defaultTier); 

  // อัปเดตสัตว์เลี้ยงตาม CR เริ่มต้นและ Tier
  const defaultPet = updatePetList(defaultCR, defaultTier); 
  
  // ตั้งค่าสัตว์เลี้ยงที่เลือก
  if (defaultPet) {
    petSelect.value = defaultPet;
  }
  
  updatePreviewsAndImage();
}

// ========== Event: เปลี่ยน Tier ==========
if (tierSelect) {
  tierSelect.addEventListener('change', () => {
    const tier = tierSelect.value;
    
    // อัปเดตลิสต์ CR
    const newCR = updateCRList(tier);
    
    // อัปเดตลิสต์สัตว์เลี้ยง (ส่ง tier ใหม่เข้าไป)
    const newPet = updatePetList(newCR, tier);
    
    // ตั้งค่าสัตว์เลี้ยงที่เลือก
    if (newPet) {
      petSelect.value = newPet;
    }
    
    updatePreviewsAndImage();
  });
}

// ========== Event: เปลี่ยน CR ==========
crSelect.addEventListener('change', () => {
  const cr = crSelect.value;
  const tier = tierSelect.value; // ดึงค่า tier ปัจจุบัน
  
  // อัปเดตลิสต์สัตว์เลี้ยง (ส่ง tier ปัจจุบันเข้าไป)
  const newPet = updatePetList(cr, tier);
  
  // ตั้งค่าสัตว์เลี้ยงที่เลือก
  if (newPet) {
    petSelect.value = newPet;
  }
  
  updatePreviewsAndImage();
});

// ========== Event: เปลี่ยนสัตว์เลี้ยง ==========
petSelect.addEventListener('change', () => {
  updatePreviewsAndImage();
});

// ========== เปิด/ปิด Modal ==========
if (openModalBtn) {
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    resetModalToDefault();
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    
    if (openModalBtn) {
      openModalBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// ========== ปุ่ม "ซื้อ" ==========
if (buyBtn) {
  buyBtn.addEventListener('click', () => {
    const pet = petSelect.value;
    const cr = crSelect.value;
    if (!pet || !cr) return;
    const cost = buyCost[cr];
    const text = `ซื้อ ${pet} CR ${cr} โดยใช้ ${cost.gp}gp และ ${cost.favor} Favor`;
    copyAction(text);
  });
}

// ========== ปุ่ม "เปลี่ยน" ==========
if (changeBtn) {
  changeBtn.addEventListener('click', () => {
    const pet = petSelect.value;
    const cr = crSelect.value;
    if (!pet || !cr) return;
    const favor = changeCost[cr];
    const text = `เปลี่ยนสัตว์เลี้ยงเป็น ${pet} CR ${cr} โดยใช้ ${favor} Favor`;
    copyAction(text);
  });
}

// ========== สร้าง checkbox ทักษะ ==========
function renderSkillCheckboxes() {
  skillsContainer.innerHTML = '';
  SKILLS.forEach(skill => {
    const id = `skill-${skill.replace(/\s+/g, '-')}`;
    const div = document.createElement('div');
    div.className = 'flex items-center';
    div.innerHTML = `
      <input type="checkbox" id="${id}" value="${skill}" class="skill-checkbox mr-2 h-4 w-4 rounded">
      <label for="${id}" class="text-white text-sm">${skill}</label>
    `;
    skillsContainer.appendChild(div);
  });

  const checkboxes = document.querySelectorAll('.skill-checkbox');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = document.querySelectorAll('.skill-checkbox:checked');
      if (checked.length > 3) {
        cb.checked = false;
        showToast('⚠️ เลือกได้สูงสุด 3 ทักษะ');
      }
      updateTrainPreview();
    });
  });
}

// ========== ปุ่ม "ฝึกสัตว์เลี้ยง" ==========
if (trainBtn) {
  trainBtn.addEventListener('click', () => {
    const pet = petSelect.value;
    if (!pet) return;
    trainPetName.textContent = pet;
    renderSkillCheckboxes();
    mainStep.classList.add('hidden');
    trainStep.classList.remove('hidden');
    updateTrainPreview();
  });
}

// ========== กลับไปหน้าหลัก ==========
if (backToMainBtn) {
  backToMainBtn.addEventListener('click', () => {
    trainStep.classList.add('hidden');
    mainStep.classList.remove('hidden');
  });
}

// ========== อัปเดต preview ฝึก ==========
function updateTrainPreview() {
  const pet = trainPetName.textContent;
  if (!pet) {
    trainPreview.textContent = '';
    return;
  }

  const selected = Array.from(document.querySelectorAll('.skill-checkbox:checked')).map(cb => cb.value);
  if (selected.length === 0) {
    trainPreview.textContent = 'เลือกทักษะเพื่อดูตัวอย่าง';
    return;
  }

  let skillText;
  if (selected.length === 1) {
    skillText = selected[0];
  } else if (selected.length === 2) {
    skillText = `${selected[0]} และ ${selected[1]}`;
  } else {
    skillText = `${selected.slice(0, -1).join(', ')} และ ${selected[selected.length - 1]}`;
  }

  const totalFavor = selected.length * 25;
  trainPreview.textContent = `ทำการฝึก ${skillText} ให้ ${pet} โดยใช้ ${totalFavor} Favor`;
}

// ========== ยืนยันการฝึก ==========
if (confirmTrainBtn) {
  confirmTrainBtn.addEventListener('click', () => {
    const selected = Array.from(document.querySelectorAll('.skill-checkbox:checked')).map(cb => cb.value);
    const pet = trainPetName.textContent;

    if (selected.length === 0) {
      showToast('⚠️ กรุณาเลือกอย่างน้อย 1 ทักษะ');
      return;
    }

    let skillText;
    if (selected.length === 1) {
      skillText = selected[0];
    } else if (selected.length === 2) {
      skillText = `${selected[0]} และ ${selected[1]}`;
    } else {
      skillText = `${selected.slice(0, -1).join(', ')} และ ${selected[selected.length - 1]}`;
    }

    const totalFavor = selected.length * 25;
    const text = `ทำการฝึก ${skillText} ให้ ${pet} โดยใช้ ${totalFavor} Favor`;
    copyAction(text);
  });
}

// ========== คัดลอกข้อความ + ปิด modal + แสดง toast ==========
async function copyAction(text) {
  try {
    await navigator.clipboard.writeText(text);
    if (modal) modal.classList.add('hidden');
    showToast(`✅ ${text}`);
  } catch (err) {
    console.error('Copy failed:', err);
    showToast('❌ ไม่สามารถคัดลอกข้อความได้');
  }
}

// ========== Toast Notification ==========
function showToast(message) {
  let toast = document.getElementById('toast');
  
  if (!toast || !document.body.contains(toast)) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300 opacity-0';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove('hidden', 'opacity-0');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 2500);
}

// ========== Lightbox Elements ==========
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightboxBtn = document.getElementById('closeLightboxBtn');
const petImageEl = document.getElementById('petImage');

// ========== เปิด Lightbox ==========
if (petImageEl) {
  petImageEl.addEventListener('click', () => {
    if (petImageEl.src && !petImageEl.classList.contains('hidden')) {
      lightboxImage.src = petImageEl.src;
      imageLightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // ปิด scroll
    }
  });
}

// ========== ปิด Lightbox ==========
function closeLightbox() {
  imageLightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

if (closeLightboxBtn) {
  closeLightboxBtn.addEventListener('click', closeLightbox);
}

// ปิดเมื่อคลิกนอกภาพ
if (imageLightbox) {
  imageLightbox.addEventListener('click', (e) => {
    if (e.target === imageLightbox) {
      closeLightbox();
    }
  });
}