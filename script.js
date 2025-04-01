// Mock data
const mockData = {
    student: {
        id: "22B91A6101",
        name: "John Doe",
        department: "CSE-AIML",
        year: "2nd Year",
        cgpa: 8.75,
        sgpa: 9.0,
        attendance: {
            overall: 85,
            subjects: [
                { name: "Data Structures", total: 45, attended: 40, percentage: 88.9 },
                { name: "Database Systems", total: 42, attended: 35, percentage: 83.3 },
                { name: "Computer Networks", total: 38, attended: 32, percentage: 84.2 },
                { name: "Operating Systems", total: 40, attended: 34, percentage: 85.0 }
            ]
        },
        marks: [
            { subject: "Data Structures", internal: 28, external: 65, total: 93, grade: "A+" },
            { subject: "Database Systems", internal: 25, external: 60, total: 85, grade: "A" },
            { subject: "Computer Networks", internal: 27, external: 62, total: 89, grade: "A" },
            { subject: "Operating Systems", internal: 26, external: 63, total: 89, grade: "A" }
        ]
    },
    users: {
        // Student logins with registration numbers
        "22B91A6101": { type: "student", password: "22B91A6101", id: "22B91A6101" },
        "22B91A6102": { type: "student", password: "22B91A6102", id: "22B91A6102" },
        "22B91A6103": { type: "student", password: "22B91A6103", id: "22B91A6103" },
        
        // Teacher logins
        "   ": { type: "teacher", password: "teacher001", name: "Dr. Smith", id: "TCHR2024001", subjects: ["Data Structures", "Operating Systems"] },
        "TCHR2024002": { type: "teacher", password: "teacher002", name: "Dr. Johnson", id: "TCHR2024002", subjects: ["Database Systems"] },
        
        // Parent logins
        "PRNT2024001": { type: "parent", password: "parent001", id: "PRNT2024001", studentId: "22B91A6101" },
        "PRNT2024002": { type: "parent", password: "parent002", id: "PRNT2024002", studentId: "22B91A6102" },
        
        // Admin logins
        "ADMIN2024001": { type: "admin", password: "admin001", id: "ADMIN2024001", name: "Admin User" },
        "ADMIN2024002": { type: "admin", password: "admin002", id: "ADMIN2024002", name: "System Admin" }
    },
    stats: {
        totalStudents: 450,
        totalTeachers: 45,
        averageCGPA: 8.2,
        departments: [
            { name: "CSE-AIML", students: 120, teachers: 12 },
            { name: "Electronics", students: 110, teachers: 11 },
            { name: "Mechanical", students: 115, teachers: 12 },
            { name: "Civil", students: 105, teachers: 10 }
        ]
    },
    studentsList: [
        { id: "22B91A6101", name: "John Doe", department: "CSE-AIML", year: "2nd Year", cgpa: 8.75 },
        { id: "22B91A6102", name: "Jane Smith", department: "Electronics", year: "3rd Year", cgpa: 9.1 },
        { id: "22B91A6103", name: "Mike Johnson", department: "Mechanical", year: "1st Year", cgpa: 8.2 }
    ]
};

// Login functionality
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;

    const user = mockData.users[username];
    
    if (user && user.password === password && user.type === userType) {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('dashboardSection').classList.remove('hidden');
        
        // Set user display name and ID
        let displayName = '';
        let displayId = user.id;

        switch(user.type) {
            case 'student':
                displayName = mockData.student.name;
                break;
            case 'teacher':
                displayName = user.name;
                break;
            case 'parent':
                displayName = `Parent of ${mockData.student.name}`;
                break;
            case 'admin':
                displayName = user.name;
                break;
        }

        document.getElementById('userDisplayName').textContent = `${displayName} (ID: ${displayId})`;

        if (user.type === 'student' || user.type === 'parent') {
            loadStudentDashboard();
        } else if (user.type === 'teacher') {
            loadTeacherDashboard();
        } else if (user.type === 'admin') {
            loadAdminDashboard();
        }
    } else {
        alert('Invalid credentials!');
    }
}

function logout() {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    // Hide all dashboard sections
    document.getElementById('studentProfile').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
}

function loadStudentDashboard() {
    document.getElementById('studentProfile').classList.remove('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    
    // Set student details
    document.getElementById('studentId').textContent = mockData.student.id;
    document.getElementById('studentName').textContent = mockData.student.name;
    document.getElementById('studentDepartment').textContent = mockData.student.department;
    document.getElementById('studentYear').textContent = mockData.student.year;
    document.getElementById('studentCGPA').textContent = mockData.student.cgpa;
    document.getElementById('studentSGPA').textContent = mockData.student.sgpa;
    document.getElementById('overallAttendance').textContent = mockData.student.attendance.overall + '%';
    
    // Load attendance data
    const attendanceTableBody = document.getElementById('attendanceData');
    attendanceTableBody.innerHTML = mockData.student.attendance.subjects
        .map(subject => `
            <tr>
                <td>${subject.name}</td>
                <td>${subject.total}</td>
                <td>${subject.attended}</td>
                <td>${subject.percentage.toFixed(1)}%</td>
            </tr>
        `).join('');

    // Load marks data
    const marksTableBody = document.getElementById('marksData');
    marksTableBody.innerHTML = mockData.student.marks
        .map(mark => `
            <tr>
                <td>${mark.subject}</td>
                <td>${mark.internal}</td>
                <td>${mark.external}</td>
                <td>${mark.total}</td>
                <td>${mark.grade}</td>
            </tr>
        `).join('');
}

function loadTeacherDashboard() {
    document.getElementById('studentProfile').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');

    // Load students list
    const studentsTableBody = document.getElementById('teacherStudentsList');
    studentsTableBody.innerHTML = mockData.studentsList
        .map(student => `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.year}</td>
                <td>
                    <button onclick="viewStudentDetails('${student.id}')" class="action-btn">View Details</button>
                </td>
            </tr>
        `).join('');
}

function loadAdminDashboard() {
    document.getElementById('studentProfile').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');

    // Update overview stats
    document.getElementById('totalStudents').textContent = mockData.stats.totalStudents;
    document.getElementById('totalTeachers').textContent = mockData.stats.totalTeachers;
    document.getElementById('averageCGPA').textContent = mockData.stats.averageCGPA.toFixed(2);

    // Load department stats
    const deptTableBody = document.getElementById('departmentStats');
    deptTableBody.innerHTML = mockData.stats.departments
        .map(dept => `
            <tr>
                <td>${dept.name}</td>
                <td>${dept.students}</td>
                <td>${dept.teachers}</td>
                <td>${(dept.students / dept.teachers).toFixed(1)}</td>
            </tr>
        `).join('');

    // Load students list
    const studentsTableBody = document.getElementById('adminStudentsList');
    studentsTableBody.innerHTML = mockData.studentsList
        .map(student => `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.year}</td>
                <td>${student.cgpa}</td>
                <td>
                    <button onclick="editStudent('${student.id}')" class="action-btn edit-btn">Edit</button>
                    <button onclick="deleteStudent('${student.id}')" class="action-btn delete-btn">Delete</button>
                </td>
            </tr>
        `).join('');
}

// Admin functions
function addNewStudent(event) {
    event.preventDefault();
    const newStudent = {
        id: document.getElementById('newStudentId').value,
        name: document.getElementById('newStudentName').value,
        department: document.getElementById('newStudentDepartment').value,
        year: document.getElementById('newStudentYear').value,
        cgpa: 0
    };

    // Add student to mock data
    mockData.studentsList.push(newStudent);
    mockData.stats.totalStudents++;

    // Update department stats
    const dept = mockData.stats.departments.find(d => d.name === newStudent.department);
    if (dept) {
        dept.students++;
    }

    // Add user credentials
    mockData.users[newStudent.id] = {
        type: "student",
        password: "pass123",
        id: newStudent.id
    };

    loadAdminDashboard();
    closeAddStudentModal();
    alert('Student added successfully!');
}

function editStudent(studentId) {
    const student = mockData.studentsList.find(s => s.id === studentId);
    if (student) {
        alert(`Edit student: ${student.name}\nThis feature will be implemented soon.`);
    }
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        const studentIndex = mockData.studentsList.findIndex(s => s.id === studentId);
        if (studentIndex !== -1) {
            const student = mockData.studentsList[studentIndex];
            
            // Remove student from list
            mockData.studentsList.splice(studentIndex, 1);
            mockData.stats.totalStudents--;
            
            // Update department stats
            const dept = mockData.stats.departments.find(d => d.name === student.department);
            if (dept) {
                dept.students--;
            }
            
            // Remove user credentials
            delete mockData.users[studentId];
            
            loadAdminDashboard();
            alert('Student deleted successfully!');
        }
    }
}

// Modal functions
function openAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'block';
}

function closeAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'none';
}

function openAttendanceModal() {
    document.getElementById('attendanceModal').style.display = 'block';
}

function closeAttendanceModal() {
    document.getElementById('attendanceModal').style.display = 'none';
}

function openMarksModal() {
    document.getElementById('marksModal').style.display = 'block';
}

function closeMarksModal() {
    document.getElementById('marksModal').style.display = 'none';
}

function addAttendance(event) {
    event.preventDefault();
    const studentId = document.getElementById('attendanceStudentId').value;
    const subject = document.getElementById('subject').value;
    const total = parseInt(document.getElementById('totalClasses').value);
    const attended = parseInt(document.getElementById('attendedClasses').value);

    if (studentId === mockData.student.id) {
        const percentage = (attended / total) * 100;
        const subjectIndex = mockData.student.attendance.subjects.findIndex(s => s.name === subject);
        
        if (subjectIndex !== -1) {
            mockData.student.attendance.subjects[subjectIndex] = {
                name: subject,
                total,
                attended,
                percentage
            };
        }

        loadTeacherDashboard();
        closeAttendanceModal();
        alert('Attendance updated successfully!');
    } else {
        alert('Student not found!');
    }
}

function addMarks(event) {
    event.preventDefault();
    const studentId = document.getElementById('marksStudentId').value;
    const subject = document.getElementById('marksSubject').value;
    const internal = parseInt(document.getElementById('internalMarks').value);
    const external = parseInt(document.getElementById('externalMarks').value);

    if (studentId === mockData.student.id) {
        const total = internal + external;
        let grade = 'F';
        if (total >= 90) grade = 'A+';
        else if (total >= 80) grade = 'A';
        else if (total >= 70) grade = 'B';
        else if (total >= 60) grade = 'C';
        else if (total >= 50) grade = 'D';

        const subjectIndex = mockData.student.marks.findIndex(m => m.subject === subject);
        if (subjectIndex !== -1) {
            mockData.student.marks[subjectIndex] = {
                subject,
                internal,
                external,
                total,
                grade
            };
        }

        loadTeacherDashboard();
        closeMarksModal();
        alert('Marks updated successfully!');
    } else {
        alert('Student not found!');
    }
}

function viewStudentDetails(studentId) {
    if (studentId === mockData.student.id) {
        document.getElementById('studentProfile').classList.remove('hidden');
        loadStudentDashboard();
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = [
        document.getElementById('addStudentModal'),
        document.getElementById('attendanceModal'),
        document.getElementById('marksModal')
    ];
    
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};