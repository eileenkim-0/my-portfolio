
// Accordion-eksperimentet
document.querySelectorAll('[data-experiment="accordion"] .accordion-item').forEach(item => {
  item.addEventListener('click', () => {
    item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});