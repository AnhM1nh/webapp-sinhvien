function save() {
    let fullname = document.getElementById('fullname').value;
    let age = document.getElementById('age').value;
    let place = document.getElementById('place').value;
    let point = document.getElementById('point').value;
    let gender = '';
        if (document.getElementById('male').checked) {
            gender = document.getElementById('male').value;
        } else if ((document.getElementById('famale').checked)) 
            gender = document.getElementById('famale').value;
    
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    
    students.push({
        fullname: fullname,
        age: age,
        place: place,
        point: point,
        gender: gender,
    });

   localStorage.setItem('students', JSON.stringify(students));

   this.renderListStudent();
}

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
    let renderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
    table += `<tr>
        <td>${student.fullname}</td>
        <td>${student.age}</td>
        <td>${student.place}</td>
        <td>${student.point}</td>
        <td>${renderLabel}</td>
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
    document.getElementById("index").value = id

    document.getElementById("update").style.display="inline-block"
}

function update() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    let id = document.getElementById("index").value
    console.log(id)
    students[id] = {
        fullname: document.getElementById('fullname').value,
        age: document.getElementById('age').value,
        place: document.getElementById('place').value,
        point: document.getElementById('point').value,
    }
    localStorage.setItem('students', JSON.stringify(students));
    this.renderListStudent()
}