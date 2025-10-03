// ========== ข้อมูลสัตว์เลี้ยง ==========
const petsByCR = {
  "0": [
  "Almiraj", "Baboon", "Badger", "Bat", "Campestri", "Cat", "Clockwork Observer", "Crab",
  "Deer", "Dusktail", "Eagle", "Emberbat", "Everbug", "Fish", "Fox", "Frog",
  "Giant Fire Beetle", "Goat", "Hare", "Hawk", "Hyena", "Jackal", "Knucklehead Trout",
  "Lizard", "Octopus", "Owl", "Peacock", "Piccolo", "Pig", "Quipper", "Rat",
  "Raven", "Rooster", "Scorpion", "Sea Horse", "Seal", "Sheep", "Spider", "Vulture", "Weasel", "Wild Dog"
  ],
  "1/8": [
  "Blood Hawk", "Clockwork Mule", "Flying Rocking Horse", "Giant Crab", "Giant Rat",
  "Giant Weasel", "Mastiff", "Monodrone", "Mountain Goat", "Mule",
  "Poisonous Snake", "Pony", "Twig Blight", "Wooden Donkey"
  ],
  "1/4": [
  "Axe Beak", "Boar", "Cave Badger", "Constrictor Snake", "Cow",
  "Deep Rothé", "Draft Horse", "Elk", "Giant Badger", "Giant Bat",
  "Giant Centipede", "Giant Frog", "Giant Lizard", "Giant Poisonous Snake", "Giant Riding Lizard",
  "Giant Wolf Spider", "Golden Stag", "Needle Blight", "Ox", "Panther",
  "Reindeer", "Riding Horse", "Rothé", "Sled Dog", "Walrus",
  "Wolf", "Yak", "Zebra"
  ],
  "1/2": [
  "Anvilwrought Raptor", "Bird of Prey", "Black Bear", "Camel", "Crocodile",
  "Giant Canary", "Giant Dragonfly", "Giant Goat", "Giant Sea Horse", "Giant Wasp",
  "Koi Prawn", "Metal Wasp", "Reef Shark", "Slicar", "Vine Blight",
  "War Ostrich", "Warhorse"
  ]
};

// ========== ราคา ==========
const buyCost = {
  "0": { gp: 300, favor: 25 },
  "1/8": { gp: 450, favor: 50 },
  "1/4": { gp: 600, favor: 75 },
  "1/2": { gp: 750, favor: 100 }
};

const changeCost = {
  "0": 10,
  "1/8": 25,
  "1/4": 50,
  "1/2": 75
};

// ========== ทักษะที่ฝึกได้ ==========
const SKILLS = ["Guard", "Grapple", "Search", "Keep Watch", "Fetch", "Shove"];

// ========== DOM Elements ==========
const modal = document.getElementById('petModal');
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

// ========== อัปเดตลิสต์สัตว์เลี้ยงตาม CR ==========
function updatePetList(cr) {
  petSelect.innerHTML = '';
  if (cr && petsByCR[cr]) {
    petsByCR[cr].forEach(pet => {
      const opt = document.createElement('option');
      opt.value = pet;
      opt.textContent = pet;
      petSelect.appendChild(opt);
    });
    petSelect.disabled = false;
  } else {
    petSelect.disabled = true;
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '-- โปรดเลือก CR ก่อน --';
    petSelect.appendChild(opt);
  }
}

// ========== ตั้งค่าเริ่มต้นเมื่อเปิด Modal ==========
function resetModalToDefault() {
  crSelect.value = "0";
  updatePetList("0");
  if (petsByCR["0"] && petsByCR["0"].length > 0) {
    petSelect.value = petsByCR["0"][0]; // เช่น "Almiraj"
  }
  const enabled = petSelect.value !== '';
  buyBtn.disabled = !enabled;
  changeBtn.disabled = !enabled;
  trainBtn.disabled = !enabled;
}

// ========== Event: เปลี่ยน CR ==========
crSelect.addEventListener('change', () => {
  const cr = crSelect.value;
  updatePetList(cr);
  // หลังเปลี่ยน CR ให้เลือกตัวแรกอัตโนมัติ
  if (petsByCR[cr] && petsByCR[cr].length > 0) {
    petSelect.value = petsByCR[cr][0];
  }
  const enabled = petSelect.value !== '';
  buyBtn.disabled = !enabled;
  changeBtn.disabled = !enabled;
  trainBtn.disabled = !enabled;
});

// ========== Event: เปลี่ยนสัตว์เลี้ยง ==========
petSelect.addEventListener('change', () => {
  const enabled = petSelect.value !== '';
  buyBtn.disabled = !enabled;
  changeBtn.disabled = !enabled;
  trainBtn.disabled = !enabled;
});

// ========== เปิด/ปิด Modal ==========
if (openModalBtn) {
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    resetModalToDefault(); // ✅ ตั้งค่าเริ่มต้นทุกครั้งที่เปิด
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
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

  // จำกัดการเลือกไม่เกิน 3
  const checkboxes = document.querySelectorAll('.skill-checkbox');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = document.querySelectorAll('.skill-checkbox:checked');
      if (checked.length > 3) {
        cb.checked = false;
        showToast('⚠️ เลือกได้สูงสุด 3 ทักษะ');
      }
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
  });
}

// ========== กลับไปหน้าหลัก ==========
if (backToMainBtn) {
  backToMainBtn.addEventListener('click', () => {
    trainStep.classList.add('hidden');
    mainStep.classList.remove('hidden');
  });
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

    // สร้างข้อความทักษะ
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
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300 opacity-0';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 2500);
}