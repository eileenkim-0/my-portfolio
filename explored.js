
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

// Contrast checker
const contrastBg = document.getElementById('contrast-bg');
const contrastText = document.getElementById('contrast-text');
const contrastBgHex = document.getElementById('contrast-bg-hex');
const contrastTextHex = document.getElementById('contrast-text-hex');
const contrastPreview = document.getElementById('contrast-preview');
const contrastPreviewText = document.getElementById('contrast-preview-text');
const contrastRatio = document.getElementById('contrast-ratio');
const contrastQualityLabel = document.getElementById('contrast-quality-label');
const contrastStars = document.getElementById('contrast-stars');

if(contrastBg) {
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return[r,g,b];
  }

  function getLuminance([r,g,b]) {
    const [rs, gs, bs] = [r,g,b].map(c => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055)/1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  function getContrastRatio(hex1, hex2) {
    const lum1 = getLuminance(hexToRgb(hex1));
    const lum2 = getLuminance(hexToRgb(hex2));
    const lighter = Math.max(lum1,lum2);
    const darker = Math.min(lum1,lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function getQuality(ratio) {
    if (ratio >= 7) return {label: 'Excellent!', stars: 5};
    if (ratio >= 4.5) return {label: 'Good', stars: 4};
    if (ratio >= 3) return { label: 'Meh', stars: 3 };
    if (ratio >= 2) return { label: 'Poor', stars: 2 };
    return { label: 'Fail', stars: 1 };
  }

  function updateContrast() {
    const bg = contrastBg.value;
    const text = contrastText.value;

    contrastPreview.style.backgroundColor = bg;
    contrastPreviewText.style.color = text;

    const ratio = getContrastRatio(bg, text);
    contrastRatio.textContent = ratio.toFixed(2);

    const {label, stars} = getQuality(ratio);
    contrastQualityLabel.textContent = label;
    contrastStars.textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }

  contrastBg.addEventListener('input', () => {
    contrastBgHex.value = contrastBg.value.toUpperCase();
    updateContrast();
  });
  contrastText.addEventListener('input', () => {
    contrastTextHex.value = contrastText.value.toUpperCase();
    updateContrast();
  });

    contrastBgHex.addEventListener('input', () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(contrastBgHex.value)) {
      contrastBg.value = contrastBgHex.value;
      updateContrast();
    }
  });
  contrastTextHex.addEventListener('input', () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(contrastTextHex.value)) {
      contrastText.value = contrastTextHex.value;
      updateContrast();
    }
  });

  updateContrast();

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