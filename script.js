const maxGuests = 10;
const guestList = document.getElementById('guestList');
const guestForm = document.getElementById('guestForm');
const guestInput = document.getElementById('guestName');
const guestCategory = document.getElementById('guestCategory');
const searchInput = document.getElementById('searchInput');

// Preloaded 10 guests
const initialGuests = [
  { name: "ariel wanjiku", category: "Friend" },
  { name: "Boby otis", category: "Family" },
  { name: "alvin Lee", category: "Colleague" },
  { name: "edrick munene", category: "Friend" },
  { name: "Elvis kimani", category: "Family" },
  { name: "willy mutunga", category: "Colleague" },
  { name: "Gidi godwill", category: "Friend" },
  { name: "imelda wambui", category: "Family" },
  { name: "santana muthoni", category: "Colleague" },

];

window.onload = function () {
  initialGuests.forEach(guest => addGuest(guest.name, guest.category));
};

guestForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = guestInput.value.trim();
  const category = guestCategory.value;

  if (!name) {
    alert("Please enter a guest name.");
    return;
  }

  if (guestList.children.length >= maxGuests) {
    alert("Guest limit reached (10 guests max).");
    return;
  }

  addGuest(name, category);
  guestInput.value = '';
});

searchInput.addEventListener('input', function () {
  const filter = searchInput.value.toLowerCase();
  const guests = guestList.querySelectorAll('li');
  guests.forEach(guest => {
    const name = guest.querySelector('.name').textContent.toLowerCase();
    guest.style.display = name.includes(filter) ? 'flex' : 'none';
  });
});

function addGuest(name, category) {
  const li = document.createElement('li');

  const header = document.createElement('div');
  header.className = 'guest-header';

  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;
  nameSpan.className = 'name';

  const tag = document.createElement('span');
  tag.textContent = category;
  tag.className = `tag ${category}`;

  header.appendChild(nameSpan);
  header.appendChild(tag);

  const timestamp = document.createElement('div');
  timestamp.className = 'meta';
  timestamp.textContent = `Added: ${new Date().toLocaleString()}`;

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  const rsvpBtn = document.createElement('button');
  rsvpBtn.textContent = 'Not Attending';
  rsvpBtn.className = 'rsvp-not-attending';
  rsvpBtn.onclick = () => toggleRSVP(rsvpBtn);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => editGuest(nameSpan);

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.onclick = () => li.remove();

  btnGroup.append(rsvpBtn, editBtn, removeBtn);
  li.append(header, timestamp, btnGroup);
  guestList.appendChild(li);
}

function toggleRSVP(button) {
  const attending = button.textContent === 'Attending';
  button.textContent = attending ? 'Not Attending' : 'Attending';
  button.className = attending ? 'rsvp-not-attending' : 'rsvp-attending';
}

function editGuest(nameSpan) {
  const newName = prompt("Enter new name:", nameSpan.textContent);
  if (newName && newName.trim()) {
    nameSpan.textContent = newName.trim();
  }
}

function clearGuests() {
  guestList.innerHTML = '';
}
