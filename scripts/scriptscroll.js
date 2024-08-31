document.addEventListener('DOMContentLoaded', () => {
  // Check if IntersectionObserver is supported
  if (typeof window.IntersectionObserver !== 'undefined') {
    const options = {
      threshold: 0, // Trigger as soon as the section reaches the top of the viewport
      rootMargin: '-100px 0px 0px 0px' // Trigger when the section reaches the top
    };

    const targets = document.querySelectorAll('.cb'); // Sections that will trigger the change
    const locker = document.querySelector('.locker__container'); // Container holding the images

    function handleIntersection(entries) {
      entries.forEach((entry) => {
        const swapClass = entry.target.dataset.swap; // Class to swap from data attribute

        if (entry.isIntersecting) {
          // Show the corresponding image
          locker.querySelectorAll('.image').forEach(img => img.classList.remove('active'));
          locker.querySelector("." + swapClass).classList.add('active');
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, options);
    targets.forEach((target) => observer.observe(target));
  } else {
    console.log("IntersectionObserver is not supported in this browser.");
  }
});
