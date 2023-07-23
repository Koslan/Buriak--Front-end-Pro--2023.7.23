// for task 24

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUserIndex = null;

function renderUsers() {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  users.forEach((user, index) => {
    const userItem = document.createElement('li');
    userItem.innerHTML = `
      ${user.name} - ${user.email}
      <button onclick="editUser(${index})">Edit</button>
      <button onclick="viewUser(${index})">View</button>
      <button onclick="deleteUser(${index})">Remove</button>
    `;
    userList.appendChild(userItem);
  });
}

function addUser() {
  const userForm = document.getElementById('user-form');
  userForm.style.display = 'block';
  currentUserIndex = null;
}

function saveUser() {
  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  if (currentUserIndex === null) {
    users.push({ name: userName.value, email: userEmail.value });
  } else {
    users[currentUserIndex] = { name: userName.value, email: userEmail.value };
  }
  userName.value = '';
  userEmail.value = '';
  localStorage.setItem('users', JSON.stringify(users));
  renderUsers();
}

function editUser(index) {
  const userForm = document.getElementById('user-form');
  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  userForm.style.display = 'block';
  userName.value = users[index].name;
  userEmail.value = users[index].email;
  currentUserIndex = index;
}

function viewUser(index) {
  const user = users[index];
  alert(`Name: ${user.name}\nEmail: ${user.email}`);
}

function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();
  }
}

document.getElementById('add-user').addEventListener('click', addUser);
document.getElementById('save-user').addEventListener('click', saveUser);



// Utility functions

function selectElementTask2(index) {
  selectedItemTask2 = index;
  updateListTask();
}

function loadTabContent(tabId) {
  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(tabId).style.display = "block";
}

loadTabContent("hm24");

document.getElementById("task-select").addEventListener("change", (event) => {
  loadTabContent(event.target.value);
});

window.onload = function () {
  const currentPageUrl = window.location.href;
  const username = currentPageUrl.split("/")[2].split(".")[0];
  const repoName = currentPageUrl.split("/")[3];
  const githubRepoUrl = `https://github.com/${username}/${repoName}`;

  document.getElementById("github-link").href = githubRepoUrl;
  renderUsers();
};
