
let clicks = 0;
let startTime = null;
let interval = null;
let testDuration = 10;
let testActive = false;

// Mock login/subscription state (for demo, replace with real auth)
let isLoggedIn = false; // true if user is logged in
let isSubscribed = false; // true if user is subscribed

const cpsArea = document.getElementById('cps-area');
const placeholderText = document.getElementById('placeholder-text');
const clickCount = document.getElementById('click-count');
const cpsDisplay = document.getElementById('cps');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('reset-btn');
const testMessage = document.getElementById('test-message');
const cpsInfoRow = document.getElementById('cps-info-row');

const modeButtons = document.querySelectorAll('.mode-btn');
const customBtn = document.getElementById('custom-btn');
const customInput = document.getElementById('custom-input');
const customOverlay = document.getElementById('custom-overlay');
const customText = document.getElementById('custom-text');
const featureBoxes = document.querySelectorAll('.feature-box');

function startTest() {
  if (!startTime) {
    startTime = new Date().getTime();
    testActive = true;
    interval = setInterval(updateTimer, 50);
    placeholderText.classList.add('hidden');
    cpsInfoRow.classList.remove('opacity-0');
  }
}

function updateTimer() {
  let elapsed = (new Date().getTime() - startTime) / 1000;
  if (elapsed >= testDuration) {
    elapsed = testDuration;
    endTest();
  }
  timerDisplay.textContent = elapsed.toFixed(1);
  cpsDisplay.textContent = testActive ? (clicks / elapsed).toFixed(2) : '0.00';
}

function endTest() {
  clearInterval(interval);
  interval = null;
  testActive = false;
  const finalCPS = (clicks / testDuration).toFixed(2);
  testMessage.textContent = `${testDuration} seconds test over! Your CPS is ${finalCPS}`;
}

// CPS area click handler
cpsArea.addEventListener('click', (e) => {
  if (!testActive && startTime) return;
  startTest();
  clicks++;
  clickCount.textContent = clicks;

  // Ripple effect
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = cpsArea.getBoundingClientRect();
  ripple.style.left = (e.clientX - rect.left - 15) + 'px';
  ripple.style.top = (e.clientY - rect.top - 15) + 'px';
  ripple.style.width = ripple.style.height = '30px';
  cpsArea.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

// Reset button
resetBtn.addEventListener('click', () => {
  clicks = 0;
  startTime = null;
  testActive = false;
  clickCount.textContent = '0';
  cpsDisplay.textContent = '0.00';
  timerDisplay.textContent = '0.0';
  testMessage.textContent = '';
  placeholderText.classList.remove('hidden');
  cpsInfoRow.classList.add('opacity-0');
  if(interval) clearInterval(interval);

  modeButtons.forEach(b => b.classList.remove('scale-110','bg-purple-400','text-white'));
  customInput.classList.add('hidden');
  customBtn.classList.remove('scale-110','bg-purple-400','text-white');
  customOverlay.textContent = '';
});

// Mode buttons
modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    testDuration = parseInt(btn.dataset.time);
    resetBtn.click();

    modeButtons.forEach(b => b.classList.remove('scale-110','bg-purple-400','text-white'));
    btn.classList.add('scale-110','bg-purple-400','text-white');

    customInput.classList.add('hidden');
    customBtn.classList.remove('scale-110','bg-purple-400','text-white');
    customOverlay.textContent = '';
  });
});

// Custom mode
customBtn.addEventListener('click', () => {
  resetBtn.click();
  customInput.value = '';
  customInput.classList.remove('hidden');
  customInput.focus();

  modeButtons.forEach(b => b.classList.remove('scale-110','bg-purple-400','text-white'));
  customBtn.classList.add('scale-110','bg-purple-400','text-white');
  customOverlay.textContent = customInput.value || '10';
});

// Hover overlay updates
customBtn.addEventListener('mouseenter', () => {
  customOverlay.textContent = customInput.value + 's' || testDuration + 's';
});
customBtn.addEventListener('mouseleave', () => {
  customOverlay.textContent = '';
});

// Set custom time on Enter
customInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    let val = parseInt(customInput.value);
    if(!isNaN(val) && val >=1 && val <=100){
      testDuration = val;
    } else {
      testDuration = 10;
    }
    resetBtn.click();
  }
});

// Feature box click handler
featureBoxes.forEach(box => {
  box.addEventListener('click', () => {
    if(!isLoggedIn){
      window.location.href = 'login.html';
    } else if(!isSubscribed){
      window.location.href = 'pricing.html';
    } else {
      console.log(`Accessing feature: ${box.dataset.feature}`);
    }
  });
});
