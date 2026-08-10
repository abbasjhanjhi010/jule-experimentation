class DashboardApp {
    constructor() {
        this.tasks = [];
        this.exams = [];
        this.meetings = [];

        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('searchBtn').addEventListener('click', () => this.fetchSyllabus());
    }

    // --- Task Tracker ---
    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        if (text) {
            const task = { id: Date.now(), text };
            this.tasks.push(task);
            input.value = '';
            this.renderTasks();
        }
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.renderTasks();
    }

    renderTasks() {
        const list = document.getElementById('taskList');
        list.innerHTML = '';
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn" onclick="app.removeTask(${task.id})">Del</button>
            `;
            list.appendChild(li);
        });
    }

    // --- Exam Tracker ---
    addExam() {
        const nameInput = document.getElementById('examInput');
        const dateInput = document.getElementById('examDate');
        if (nameInput.value && dateInput.value) {
            const exam = { id: Date.now(), name: nameInput.value, date: dateInput.value };
            this.exams.push(exam);
            nameInput.value = '';
            dateInput.value = '';
            this.renderExams();
        }
    }

    removeExam(id) {
        this.exams = this.exams.filter(e => e.id !== id);
        this.renderExams();
    }

    renderExams() {
        const list = document.getElementById('examList');
        list.innerHTML = '';
        // Sort by date
        this.exams.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(exam => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${exam.name}</strong> <br> <small>${new Date(exam.date).toLocaleDateString()}</small></span>
                <button class="delete-btn" onclick="app.removeExam(${exam.id})">Del</button>
            `;
            list.appendChild(li);
        });
    }

    // --- Meeting Tracker ---
    addMeeting() {
        const nameInput = document.getElementById('meetingInput');
        const dateInput = document.getElementById('meetingDate');
        if (nameInput.value && dateInput.value) {
            const meeting = { id: Date.now(), name: nameInput.value, date: dateInput.value };
            this.meetings.push(meeting);
            nameInput.value = '';
            dateInput.value = '';
            this.renderMeetings();
        }
    }

    removeMeeting(id) {
        this.meetings = this.meetings.filter(m => m.id !== id);
        this.renderMeetings();
    }

    renderMeetings() {
        const list = document.getElementById('meetingList');
        list.innerHTML = '';
        this.meetings.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(meeting => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${meeting.name}</strong> <br> <small>${new Date(meeting.date).toLocaleString()}</small></span>
                <button class="delete-btn" onclick="app.removeMeeting(${meeting.id})">Del</button>
            `;
            list.appendChild(li);
        });
    }

    // --- Subject / Syllabus Tracker ---
    async fetchSyllabus() {
        const query = document.getElementById('programmeSearch').value.trim();
        if (!query) return alert('Please enter a degree name.');

        const container = document.getElementById('syllabusContainer');
        const loading = document.getElementById('loadingSyllabus');

        container.innerHTML = '';
        loading.style.display = 'block';

        try {
            const response = await fetch(`http://localhost:3000/api/scrape?programme=${encodeURIComponent(query)}`);
            const data = await response.json();

            loading.style.display = 'none';

            if (!response.ok) {
                container.innerHTML = `<p style="color: red;">${data.error || 'Error fetching syllabus.'}</p>`;
                return;
            }

            this.renderSyllabus(data);

        } catch (error) {
            loading.style.display = 'none';
            container.innerHTML = `<p style="color: red;">Failed to connect to the server. Make sure it is running.</p>`;
        }
    }

    renderSyllabus(data) {
        const container = document.getElementById('syllabusContainer');
        container.innerHTML = `<p>Showing results for: <strong><a href="${data.url}" target="_blank">${data.programme}</a></strong></p>`;

        if (data.syllabus.length === 0) {
             container.innerHTML += `<p>No course structure found on this page.</p>`;
             return;
        }

        data.syllabus.forEach((yearData, yearIdx) => {
            const section = document.createElement('div');
            section.className = 'year-section';

            const title = document.createElement('h3');
            title.textContent = yearData.year;
            section.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'subject-grid';

            yearData.subjects.forEach((subject, subIdx) => {
                const card = document.createElement('div');
                card.className = 'subject-card';

                const id = `sub_${yearIdx}_${subIdx}`;
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = id;

                const label = document.createElement('label');
                label.htmlFor = id;
                label.textContent = subject;

                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        label.classList.add('completed-subject');
                    } else {
                        label.classList.remove('completed-subject');
                    }
                });

                card.appendChild(checkbox);
                card.appendChild(label);
                grid.appendChild(card);
            });

            section.appendChild(grid);
            container.appendChild(section);
        });
    }
}

const app = new DashboardApp();
