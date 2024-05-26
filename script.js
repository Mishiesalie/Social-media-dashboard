document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switcher');
    const body = document.body;
  
    // Theme switcher logic
    themeSwitch.addEventListener('change', () => {
      body.classList.toggle('light-mode', themeSwitch.checked);
    });
  
    // Fetch data and update the dashboard
    fetchDataAndUpdate();
  
    // Function to fetch data from JSON file
    async function fetchDataAndUpdate() {
      try {
        const response = await fetch('data.json');
        const data = await response.json();
        updateDashboard(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Function to update the dashboard with fetched data
    function updateDashboard(data) {
      const mediasWrapper = document.querySelector('.media-wrapper');
      const minimediaWrapper = document.querySelector('.mini-media-wrapper');
      const totalFollowers = document.getElementById('total-followers');
  
      // Update total followers
      totalFollowers.textContent = data.totalFollowers;
  
      // Clear existing content
      mediasWrapper.innerHTML = '';
      minimediaWrapper.innerHTML = '';
  
      // Populate main medias
      data.medias.forEach(media => {
        const mediaElement = document.createElement('div');
        mediaElement.className = `media ${media.type}`;
        mediaElement.innerHTML = `
          <div class="media-header-wrapper">
            <img src="${media.icon}" alt="${media.platform} logo">
            <h2>${media.username}</h2>
          </div>
          <p class="followers">${media.followers}</p>
          <p class="follower-text">${media.followerText}</p>
          <div class="media-footer">
            <img src="${media.changeIcon}" alt="up/down arrow">
            <p class="media-follower-update">${media.change} Today</p>
          </div>
        `;
        mediasWrapper.appendChild(mediaElement);
      });
  
      // Populate mini medias
      data.minimedias.forEach(minimedia => {
        const minimediaElement = document.createElement('div');
        minimediaElement.className = 'mini-media';
        minimediaElement.innerHTML = `
          <div class="views-wrapper">
            <h3>${minimedia.title}</h3>
            <img src="${minimedia.icon}" alt="${minimedia.platform} logo">
          </div>
          <div class="update-wrapper">
            <h3 class="mini-media-follower">${minimedia.number}</h3>
            <div class="mini-footer-wrapper">
              <img src="${minimedia.changeIcon}" alt="up/down arrow">
              <h4 class="percentage-update">${minimedia.percentage}%</h4>
            </div>
          </div>
        `;
        minimediaWrapper.appendChild(minimediaElement);
      });
    }
  });



// const themeSwitcher = document.querySelector('.switcher-name');

// themeSwitcherToggle.addEventListener('click', () => {
//     themeSwitcherToggle.classList.switcher-name('active');
//   document.body.classList.switcher-name('light mode');
// });