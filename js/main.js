// Получаем элементы формы и списка контактов
const addContactForm = document.getElementById('add-contact-form');
const contactsList = document.getElementById('contacts-list');

// Функция для добавления контакта в список
function addContactToList(contact) {
  const li = document.createElement('li');
  li.style.color = "white"
  li.innerHTML = `
    <div class="contact">
      <div class="contact-name">${contact.name} ${contact.surname}</div>
      <div class="contact-phone">${contact.phone}</div>
      <div class="contact-email">${contact.email}</div>
      <div class="contact-address">${contact.address}</div>
      <div class="contact-actions">
        <button class="btn btn-primary btn-sm edit-contact">Редактировать</button>
        <button class="btn btn-danger btn-sm delete-contact">Удалить</button>
      </div>
    </div>
  `;
  contactsList.appendChild(li);
}

// Функция для получения списка контактов из Local Storage
function getContactsFromLocalStorage() {
  const contacts = localStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
}

// Функция для сохранения списка контактов в Local Storage
function saveContactsToLocalStorage(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Функция для добавления контакта в Local Storage и в список контактов
function addContact(contact) {
  const contacts = getContactsFromLocalStorage();
  contacts.push(contact);
  saveContactsToLocalStorage(contacts);
  addContactToList(contact);
}

// Функция для удаления контакта из Local Storage и из списка контактов
function deleteContact(index) {
  const contacts = getContactsFromLocalStorage();
  contacts.splice(index, 1);
  saveContactsToLocalStorage(contacts);
  location.reload();
}

// Функция для обновления контакта в Local Storage и в списке контактов
function updateContact(index, contact) {
  const contacts = getContactsFromLocalStorage();
  contacts[index] = contact;
  saveContactsToLocalStorage(contacts);
  location.reload();
}

// Функция для заполнения формы контакта при редактировании
  function fillContactForm(contact) {
    const nameInput = addContactForm.querySelector('#name');
    const surnameInput = addContactForm.querySelector('#surname');
    const addressInput = addContactForm.querySelector('#address');
    const phoneInput = addContactForm.querySelector('#phone');
    const emailInput = addContactForm.querySelector('#email');

    nameInput.value = contact.name;
    surnameInput.value = contact.surname;
    addressInput.value = contact.address;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
  }

// Обработчик отправки формы добавления контакта
addContactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = addContactForm.querySelector('#name').value;
  const surname = addContactForm.querySelector('#surname').value;
  const address = addContactForm.querySelector('#address').value;
  const phone = addContactForm.querySelector('#phone').value;
  const email = addContactForm.querySelector('#email').value;
  const contact = { name, surname, address, phone, email };
  addContact(contact);
  addContactForm.reset();
});

// Обработчик клика по кнопке удаления контакта
contactsList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-contact')) {
    const index = event.target.closest('li').dataset.index;
    deleteContact(index);
    }
    });