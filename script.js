const themeBtn = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('toggle-icon');
const copyBtn = document.getElementById('copy-mail');
const email = 'lily8codes@gmail.com';

const toggleSocialsBtn = document.getElementById('toggle-socials');
const closeSocialsBtn = document.getElementById('close-socials');
const navDefault = document.getElementById('nav-default');
const navSocials = document.getElementById('nav-socials');

if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeIcon.src = 'assets/icons/sun.svg';
  } else {
    localStorage.setItem('theme', 'light');
    themeIcon.src = 'assets/icons/moon.svg';
  }
});

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('nb-NO', {
        timeZone: 'Europe/Oslo',
        hour: '2-digit',
        minute: '2-digit'
    });

    document.getElementById('oslo-time').textContent = timeString;
}

if (copyBtn) {  
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Contact';
        }, 2000);
      })
      .catch(() => {
        copyBtn.textContent = 'Failed to copy :(';
      });
  });
}

if (toggleSocialsBtn) {
  toggleSocialsBtn.addEventListener('click', () => {
    navDefault.style.display = 'none';
    navSocials.style.display = 'flex';
  });
}

if (closeSocialsBtn) {
  closeSocialsBtn.addEventListener('click', () => {
    navDefault.style.display = 'flex';
    navSocials.style.display = 'none';
  });
}

updateClock();
setInterval(updateClock, 60000);