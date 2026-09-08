
// Accordion
document.querySelectorAll('[data-experiment="accordion"] .accordion-item').forEach(item => {
  item.addEventListener('click', () => {
    item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Slider
const rangeSlider = document.getElementById('range-slider');
const sliderBubble = document.getElementById('slider-bubble');

if(rangeSlider) {
  function updateSlider() {
    const value = rangeSlider.value;
    const percent = (value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min);

    sliderBubble.textContent = `${value}%`;
    sliderBubble.style.left = `calc(${percent * 100}%)`;
    
    const scale = 0.8 + (percent * 0.6);
  sliderBubble.style.transform = `translateX(-50%) translateY(-2.5rem) scale(${scale})`;
    rangeSlider.style.background = `linear-gradient(to right, #FF8FA3 ${percent * 100}%, #F2F2F2 ${percent * 100}%)`;
  }
    rangeSlider.addEventListener('input', updateSlider);
    updateSlider();
}

// Scramble
const scrambleEl = document.querySelector('.scramble-text');

if(scrambleEl) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const originalText = scrambleEl.dataset.text;
  let scrambleInterval;

  function scramble() {
    let iteration = 0;
    clearInterval(scrambleInterval);

    scrambleInterval = setInterval(() => {
      scrambleEl.textContent = originalText.split('').map((char, index) => {
        if(char === ' ') return ' ';
        if(index < iteration) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      if(iteration >= originalText.length) {
        clearInterval(scrambleInterval);
      }

      iteration += 1/3;
    }, 30);
  }
  scrambleEl.addEventListener('mouseenter', scramble);
}

// Music-player
const musicCover = document.getElementById('music-cover');
const progressFill = document.getElementById('music-progress-fill');
const currentTimeEl = document.getElementById('music-current-time');
const totalTimeEl = document.getElementById('music-total-time');

if(musicCover) {
  const totalSeconds = 2 * 60 + 49;
  let currentSeconds = 0;

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  setInterval(() => {
    currentSeconds += 1;
    const percent = (currentSeconds / totalSeconds) * 100;

    progressFill.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(currentSeconds);

    if (currentSeconds >= totalSeconds) {
      currentSeconds = 0;
    }
  }, 1000);
}