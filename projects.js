const projectList = document.getElementById('project-list');
let allProjects = [];

function renderProjects(items) {
    projectList.innerHTML = '';

    items.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
            <div class="project-card-header">
                <h3 class="project-card-title">${project.title}</h3>
                <a href="${project.link}" target="_blank" class="project-card-github">
                <img src="assets/icons/github.svg" alt="GitHub">
                </a>
            </div>
            <p class="project-card-description">${project.description}</p>
            <div class="project-card-preview">
                <img src="${project.image}" alt="${project.title} preview">
            </div>
        `;

        projectList.appendChild(card);
    });

    document.querySelectorAll('.project-card-description').forEach(desc => {
    desc.addEventListener('click', () => {
      desc.classList.toggle('expanded');
    });
  });
}

fetch('assets/data/projects.json')
    .then(response => response.json())
    .then(data => {
        allProjects = data;
        renderProjects(allProjects);
    })
    .catch(error => {
        console.error('Please try to reload:', error);
    });

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.textContent.toLowerCase().replace(' ', '-');
    const filtered = allProjects.filter(p => p.category === category);
    renderProjects(filtered);
  });
});