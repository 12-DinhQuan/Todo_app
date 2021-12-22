var courseApi = 'http://localhost:8000/api/todos';

function start() {
    getCourse(renderCourse);

    handleCreateForm();
}

start();

//select all

function getCourse(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// Create data

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
  
  

//delete data

function deleteCourses(id) {
    var options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            fetch('http://localhost:8000/api/todo/'+id+'/delete', options)
                .then(function (response) {
                    response.json();
                })
                .then(function() {
                    getCourse(renderCourse);
                });
}

//Input update

function inputUpdate(id) {
    console.log(id)
    var createBtn = document.querySelector('#create');
    var updateBtn = document.querySelector('#update');
    createBtn.setAttribute('style', 'display: none;');
    updateBtn.setAttribute('style', 'display: block;');
    updateBtn.setAttribute('onclick', `updateCourses('${id}')`);


    fetch('http://localhost:8000/api/todo/'+id)
        .then(function (response) {
            return response.json();
        })
        .then(getCourseUpdate);
}

function getCourseUpdate(course) {
    document.querySelector('input[name="task"]').value = course.task;
    console.log(course.task)
}

function renderCourse(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var cour = courses.todos;
    var htmls = cour.map(function (course) {
        return `
            <li>
                <h4>${course.task}</h4>
                <button onclick="deleteCourses('${course._id}')">Delete</button>
                <button onclick="inputUpdate('${course._id}')">Update</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="task"]').value;
        var formData = {task: name}
        console.log(formData);
        postData('http://localhost:8000/api/todo/create', formData)
            .then(formData => {
            console.log(formData);
            })
            .then(function() {
                getCourse(renderCourse);
            })
        
    }
}

//update DB

async function putData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function updateCourses(id) {
    console.log(id)
    var task = document.querySelector('input[name="task"]').value;
    var formData = {task: task}
    console.log(formData);
    putData('http://localhost:8000/api/todo/'+id+'/update', formData)
            .then(formData => {
            console.log(formData);
            })
            .then(function() {
                getCourse(renderCourse);
            })

    var createBtn = document.querySelector('#create');
    var updateBtn = document.querySelector('#update');
    createBtn.setAttribute('style', 'display: block;');
    updateBtn.setAttribute('style', 'display: none;');
    document.querySelector('input[name="task"]').value = "";
}
