const themeBtn = document.getElementById('toggle-theme');
const copyBtn = document.getElementById('copy-mail');
const email = 'lily8codes@gmail.com';

if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
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

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(email)
        .then( ()=> {
            copyBtn.textContent = 'Copied!';
            setTimeout(()=> {
                copyBtn.textContent = 'Contact';
            }, 2000);
        })
        .catch(()=> {
            copyBtn.textContent = 'Failed to copy :(';
        });
});

updateClock();
setInterval(updateClock, 60000);