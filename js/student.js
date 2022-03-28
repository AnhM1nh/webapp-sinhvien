function save() {
    let fullname = document.getElementById('fullname').value;
    let age = document.getElementById('age').value;
    let place = document.getElementById('place').value;
    let point = document.getElementById('point').value;
    let gender = document.getElementById('gender').value;
    
    
    checkInput();
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    
    students.push({
        fullname: fullname,
        age: age,
        place: place,
        point: point,
        gender: gender,
    }
    );
    
    localStorage.setItem('students', JSON.stringify(students));
    
    this.renderListStudent();
}

function checkInput() {
    const fullnameValue = fullname.value;
    const ageValue = age.value;
    const placeValue = place.value;
    const pointValue = point.value;
    const genderValue = gender.value;

    if(fullnameValue === '') {
        setErrorFor(fullname, 'Vui lòng nhập họ và tên');
    } else {
        setSuccess(fullname);
    }
    
    if(isNaN(ageValue)) {
        setErrorFor(age, 'Tuổi không hợp lệ');
    } if (ageValue === '') {
        setErrorFor(age, 'Tuổi không hợp lệ');
    } else {
        setSuccess(age);
    }

    if(placeValue === '') {
        setErrorFor(place, 'Vui lòng nhập quê quán');
    } else {
        setSuccess(place);
    }

    if(pointValue === '' || isNaN(pointValue) > 10) {
        setErrorFor(point, 'Điểm không hợp lệ');
    } else {
        setSuccess(point);
    }

    if (genderValue !== 'Nam' && genderValue !== 'Nữ') {
        setErrorFor(gender, 'Giới tính không hợp lệ');
    } else {
        setSuccess(gender);
    }
    
    if (fullnameValue === '' || isNaN(ageValue) || ageValue === '' || placeValue === '' || 
        isNaN(pointValue) || isNaN(pointValue) > 10 || pointValue === '' || genderValue !== 'Nam' && genderValue !== 'Nữ') {
        preventDefault()    
    } 

}

const setErrorFor = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    // inputControl.classList.remove('error');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    // inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

    if (students.length === 0) return false;
    
    let table = `<tr>
        <th>Họ và tên</th>
        <th>Tuổi</th>
        <th>Quê quán</th>
        <th>Điểm</th>
        <th>Giới tính</th>
        <th>Khác</th>
    </tr>`;
    
    students.forEach((student, index) => {
    table += `<tr>
        <td>${student.fullname}</td>
        <td>${student.age}</td>
        <td>${student.place}</td>
        <td>${student.point}</td>
        <td>${student.gender}</td>
        <td>
            <button onclick = "editItem(${index})" class="edit">Edit</button> |
            <button onclick = "deleteItem(${index})">Delete</button>
        </td>
    </tr>`;
    })
    document.getElementById('grid-students').innerHTML = table;
}

function deleteItem(id) {
    if (confirm('Xóa ?')) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        students.splice(id, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderListStudent(localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []);
    }
}

function editItem(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    fullname.value = students[id].fullname
    age.value = students[id].age
    place.value = students[id].place
    point.value = students[id].point
    gender.value = students[id].gender

    document.getElementById("index").value = id

    document.getElementById("update").style.display="inline-block"
}

function update() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    let id = document.getElementById("index").value
    students[id] = {
        fullname: document.getElementById('fullname').value,
        age: document.getElementById('age').value,
        place: document.getElementById('place').value,
        point: document.getElementById('point').value,
        gender: document.getElementById('gender').value,
    }
    localStorage.setItem('students', JSON.stringify(students));
    this.renderListStudent()
}