var courseApi = 'http://localhost:8000/api/todos';

function start() {
    getCourse(renderCourse);

    handleCreateForm();
}

start();

function getCourse(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// Create data

async function postData(url = '', data = {}) {
    // Default options are marked with *
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

function renderCourse(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var cour = courses.todos;
    var htmls = cour.map(function (course) {
        return `
            <li>
                <h4>${course.task}</h4>
                <button onclick="deleteCourses('${course._id}')">Delete</button>
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