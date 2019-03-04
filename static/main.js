/* eslint-disable no-undef */
const inputForm = document.querySelector('#inputForm');
const dateInput = document.querySelector('#date');
const messageInput = document.querySelector('#complain');
const displayResult = document.querySelector('#displayData');
const loadPage = document.querySelector('body');

// display data
const displayOutput = sarri => {
  const display = document.createElement('tr');
  display.classList.add('displayList');
  const displayDate = document.createElement('td');
  displayDate.classList.add('dateList');
  const displayComplaint = document.createElement('td');
  displayComplaint.classList.add('complaintList');
  const actions = document.createElement('td');
  actions.classList.add('actions');

  const pen = document.createElement('a');
  pen.classList.add('delete');
  pen.innerHTML = '&times;';
  pen.addEventListener('click', deleteData);
  pen.setAttribute('data-id', sarri.id);

  const edit = document.createElement('a');
  edit.classList.add('edit');
  edit.innerHTML = '&#9998;';
  edit.addEventListener('click', () => {
    displayComplaint.setAttribute('contentEditable', true);
    displayComplaint.setAttribute('data-id', sarri.id);
    displayComplaint.focus();
    displayComplaint.addEventListener('blur', updateData);
  });

  displayDate.innerHTML = sarri.date;
  displayComplaint.innerHTML = sarri.complaints;

  display.appendChild(displayDate);
  display.appendChild(displayComplaint);
  display.appendChild(actions);
  actions.appendChild(edit);
  actions.appendChild(pen);
  displayResult.appendChild(display);
};

// create data
const postData = () => {
  fetch('/api/v1/sarri', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'POST',
    body: JSON.stringify({
      date: dateInput.value,
      complaints: messageInput.value
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.result);
      displayOutput(data.result);
    })
    .catch(err => console.log(err));
};

//  fetch data
const fetchData = () => {
  fetch('/api/v1/sarri')
    .then(response => response.json())
    .then(data => {
      data.forEach(displayOutput);
    });
};

// Update Data
const updateData = e => {
  const id = e.target.getAttribute('data-id');
  fetch(`/api/v1/sarri/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'PATCH',
    body: JSON.stringify({
      complaints: e.target.innerText
    })
  })
    .then(response => response.json())
    .then(data => console.log(data.results));
};

// delete data
const deleteData = e => {
  e.preventDefault();
  const id = e.target.getAttribute('data-id');
  fetch(`/api/v1/sarri/${id}`, {
    method: 'DELETE'
  }).then(() => displayResult.removeChild(e.target.parentNode.parentNode));
};

inputForm.addEventListener('submit', e => {
  postData();
  e.preventDefault();
});
loadPage.addEventListener('load', fetchData());
