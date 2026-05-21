// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all links and sections
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // Add active class to clicked link
    link.classList.add('active');
    
    // Show corresponding section
    const sectionId = link.getAttribute('data-section');
    document.getElementById(sectionId).classList.add('active');
  });
});

// Render Laws
function renderLaws() {
  const partContainers = {
    1: document.getElementById('part1'),
    2: document.getElementById('part2'),
    3: document.getElementById('part3'),
    4: document.getElementById('part4'),
    5: document.getElementById('part5')
  };

  lawsData.forEach(law => {
    const card = document.createElement('div');
    card.className = 'law-card';
    card.innerHTML = `
      <span class="law-number">LAW ${law.number}</span>
      <div class="law-title">${law.title}</div>
      <div class="law-quote">"${law.quote}"</div>
      <div class="law-description">
        <p><strong>PURPOSE:</strong> ${law.purpose}</p>
        <p><strong>EXPLANATION:</strong> ${law.explanation}</p>
        <p><strong>COMMANDS:</strong></p>
        <pre><code>${law.commands}</code></pre>
        <p><strong>DEFENSIVE APPLICATION:</strong> ${law.defensive}</p>
        <p><strong>PRO TIP:</strong> ${law.tip}</p>
      </div>
      <div class="law-toggle">Click to expand details</div>
    `;
    
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
      const toggle = card.querySelector('.law-toggle');
      toggle.textContent = card.classList.contains('expanded') ? 'Click to collapse' : 'Click to expand details';
    });
    
    partContainers[law.part].appendChild(card);
  });
}

// Render Reference Table
function renderReference() {
  const tableContainer = document.getElementById('reference-table');
  let html = `
    <table class="reference-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Law Title</th>
          <th>Key Takeaway</th>
          <th>Core Tool</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  referenceGuide.forEach(item => {
    html += `
      <tr>
        <td class="law-num">${item.num}</td>
        <td>${item.title}</td>
        <td>${item.takeaway}</td>
        <td><span class="tool-badge">${item.tool}</span></td>
      </tr>
    `;
  });
  
  html += `
      </tbody>
    </table>
  `;
  
  tableContainer.innerHTML = html;
}

// Render Framework
function renderFramework() {
  const container = document.getElementById('framework-content');
  framework.forEach(item => {
    const card = document.createElement('div');
    card.className = 'framework-card';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(card);
  });
}

// Initialize
function init() {
  renderLaws();
  renderReference();
  renderFramework();
}

document.addEventListener('DOMContentLoaded', init);
