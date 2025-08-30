// Courses data
const allCourses = Array(21).fill().map((_, i) => ({
  id: i+1,
  studio: "Omar's Studio",
  master: "Master Potter",
  date: "18 Jan 2025",
  title: "Pottery: From Clay to Masterpiece",
  desc: "Learn the techniques of glazing to make beautiful work of pottery",
  price: "EGP 1,200"
}));

let visibleCourses = 12; // Pagination count
let filteredCourses = allCourses.slice();
let wishlist = new Set();

// Render courses
function renderCourses() {
  const coursesEl = document.getElementById('courses');
  coursesEl.innerHTML = '';
  const toShow = filteredCourses.slice(0, visibleCourses);
  toShow.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-img-placeholder">Image</div>
      <span class="wishlist${wishlist.has(course.id) ? ' active' : ''}" onclick="toggleWishlist(${course.id}, event)">&#9825;</span>
      <div class="course-meta">
        <img src="https://via.placeholder.com/20" alt="logo" class="studio-logo">
        ${course.studio} &nbsp; • &nbsp; ${course.master} &nbsp; • &nbsp; ${course.date}
      </div>
      <div class="course-title">${course.title}</div>
      <div class="course-desc">${course.desc}</div>
      <div class="price-row">
        <span class="course-price">EGP 1,200</span>
        <button class="add-btn">+</button>
      </div>
      <div class="course-actions">
        <button class="view-btn">View Course</button>
        <button class="buy-btn">Buy Now</button>
      </div>
    `;
    coursesEl.appendChild(card);
  });
  // Update showing desc
  document.getElementById('pagination-desc').textContent =
    `Showing 1-${Math.min(visibleCourses, filteredCourses.length)} of ${filteredCourses.length} items`;
  document.querySelector('.load-more-btn').style.display =
    filteredCourses.length > visibleCourses ? 'block' : 'none';
}

// Wishlist toggle
function toggleWishlist(id, event) {
  if(wishlist.has(id)) wishlist.delete(id);
  else wishlist.add(id);
  event.stopPropagation();
  renderCourses();
}

// Search filter
function filterCourses() {
  const query = document.getElementById('search').value.trim().toLowerCase();
  filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(query)
    || course.desc.toLowerCase().includes(query)
  );
  visibleCourses = 12;
  renderCourses();
}

// Load more
function loadMore() {
  visibleCourses += 12;
  renderCourses();
}

// Initial render
renderCourses();
