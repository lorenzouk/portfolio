// Role Text Animation
const roles = ['Game Developer', 'Software Engineer'];
const roleText = document.getElementById('roleText');

if (roleText) {
  let roleIndex = 0;
  const updateRole = () => {
    roleText.classList.remove('show');

    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleText.textContent = roles[roleIndex];
      roleText.classList.add('show');
    }, 220);
  };

  setInterval(updateRole, 3000);
  updateRole();
}

// Play showcase media on hover
document.querySelectorAll('.content-box').forEach(box => {
  const isMicroprojectsPage = document.body.classList.contains('microprojects-page');
  const video = box.querySelector('.showcase-section video');
  const image = box.querySelector('.showcase-section img[data-animated-src]');

  if (!isMicroprojectsPage && video) {
    let thumbnailTime = null;
    const initThumbnail = () => {
      const pauseTime = video.dataset.pauseTime;
      thumbnailTime = pauseTime !== undefined ? parseFloat(pauseTime) : Math.random() * video.duration;
      video.currentTime = thumbnailTime;
      video.pause();
    };

    if (video.readyState >= 1) {
      initThumbnail();
    } else {
      video.addEventListener('loadedmetadata', initThumbnail, { once: true });
    }

    box.addEventListener('mouseenter', () => {
      video.play();
    });

    box.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = thumbnailTime;
    });
  }

  if (!isMicroprojectsPage && image) {
    const animatedSrc = image.dataset.animatedSrc;
    const staticSrc = image.dataset.staticSrc || image.getAttribute('src');

    box.addEventListener('mouseenter', () => {
      if (animatedSrc) {
        image.src = animatedSrc;
      }
    });

    box.addEventListener('mouseleave', () => {
      if (staticSrc) {
        image.src = staticSrc;
      }
    });
  }

  // Make project card clickable
  const cardClickHref = box.dataset.cardHref;
  if (!isMicroprojectsPage && cardClickHref) {
    box.style.cursor = 'pointer';
    box.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        return;
      }
      window.location.href = cardClickHref;
    });
  }
});

const projectNavLinks = document.querySelectorAll('.project-side-nav a');
const projectCards = document.querySelectorAll('.featured-project-card');

if (projectNavLinks.length && projectCards.length) {
  const setActiveProjectLink = () => {
    let currentId = projectCards[0]?.id || '';

    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.3) {
        currentId = card.id;
      }
    });

    projectNavLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  setActiveProjectLink();
  window.addEventListener('scroll', setActiveProjectLink, { passive: true });
  window.addEventListener('resize', setActiveProjectLink);
}
