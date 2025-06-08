class TaskCalendar{
    constructor(){
        this.currentDate=new Date();
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.initializeElements();
        this.attachEventListeners();
        this.renderCalendar();
        this.renderTasks();
    }

    initializeElements(){
        this.calendarDays=document.getElementById('calendarDays');
        this.currentMonthElement=document.getElementById('currentMonth');
        this.prevMonthBtn=document.getElementById('prevMonth');
        this.nextMonthBtn=document.getElementById('nextMonth');
        this.addTaskBtn=document.getElementById('addTask');
        this.taskTitleInput=document.getElementById('taskTitle');
        this.taskDescriptionInput=document.getElementById('taskDescription');
        this.taskDateInput=document.getElementById('taskDate');
        this.tasksList=document.getElementById('tasksList');
    }

    attachEventListeners(){
        this.prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
        this.nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
        this.addTaskBtn.addEventListener('click', () => this.addTask());
    }

    changeMonth(delta){
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }

    renderCalendar(){
        const year=this.currentDate.getFullYear();
        const month=this.currentDate.getMonth();
        
        const firstDay=new Date(year, month, 1);
        const lastDay=new Date(year, month + 1, 0);
        
        const monthNames=['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec', 
                          'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
        
        this.currentMonthElement.textContent=`${monthNames[month]} ${year}`;
        
        this.calendarDays.innerHTML = '';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            const emptyContent = document.createElement('div');
            emptyContent.className = 'day-content';
            emptyDay.appendChild(emptyContent);
            this.calendarDays.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            
            const dayContent = document.createElement('div');
            dayContent.className = 'day-content';
            
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const tasksForDay = this.tasks.filter(task => task.date === dateString);
            
            // Dodajemy numer dnia
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayContent.appendChild(dayNumber);
            
            // Dodajemy zadania do dnia
            if (tasksForDay.length > 0) {
                const tasksContainer = document.createElement('div');
                tasksContainer.className = 'day-tasks';
                
                tasksForDay.forEach(task => {
                    const taskElement = document.createElement('div');
                    taskElement.className = `day-task ${task.completed ? 'completed' : ''}`;
                    
                    const taskTitle = document.createElement('div');
                    taskTitle.className = 'task-title';
                    taskTitle.textContent = task.title;
                    
                    const taskDescription = document.createElement('div');
                    taskDescription.className = 'task-description';
                    taskDescription.textContent = task.description;
                    
                    taskElement.appendChild(taskTitle);
                    taskElement.appendChild(taskDescription);
                    tasksContainer.appendChild(taskElement);
                });
                
                dayContent.appendChild(tasksContainer);
                dayElement.classList.add('has-tasks');
            }
            
            dayElement.appendChild(dayContent);
            dayElement.addEventListener('click', () => this.showTasksForDate(dateString));
            this.calendarDays.appendChild(dayElement);
        }
    }

    hasTasksForDate(dateString) {
        return this.tasks.some(task => task.date === dateString);
    }

    showTasksForDate(dateString) {
        const tasksForDate = this.tasks.filter(task => task.date === dateString);
        this.renderTasks(tasksForDate);
        this.taskDateInput.value = dateString;
        
        const taskForm = document.querySelector('.task-form');
        taskForm.scrollIntoView({ behavior: 'smooth' });
        taskForm.style.backgroundColor = '#e3f2fd';
        setTimeout(() => {
            taskForm.style.backgroundColor = '#f9f9f9';
        }, 1000);
    }

    addTask() {
        const title = this.taskTitleInput.value.trim();
        const description = this.taskDescriptionInput.value.trim();
        const date = this.taskDateInput.value;

        if (!title || !date) {
            alert('Proszę wypełnić wszystkie wymagane pola!');
            return;
        }

        const task = {
            id: Date.now(),
            title,
            description,
            date,
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderCalendar();
        this.renderTasks();
        this.clearForm();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderCalendar();
        this.renderTasks();
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            this.taskTitleInput.value = task.title;
            this.taskDescriptionInput.value = task.description;
            this.taskDateInput.value = task.date;
            this.deleteTask(taskId);
        }
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    clearForm() {
        this.taskTitleInput.value = '';
        this.taskDescriptionInput.value = '';
        this.taskDateInput.value = '';
    }

    renderTasks(filteredTasks = null) {
        const tasksToRender = filteredTasks || this.tasks;
        this.tasksList.innerHTML = '';

        tasksToRender.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskElement.innerHTML = `
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <p>Data: ${task.date}</p>
                <div class="task-actions">
                    <button class="edit-btn" onclick="calendar.editTask(${task.id})">Edytuj</button>
                    <button class="delete-btn" onclick="calendar.deleteTask(${task.id})">Usuń</button>
                    <button class="complete-btn" onclick="calendar.toggleTaskComplete(${task.id})">
                        ${task.completed ? 'Cofnij' : 'Zakończ'}
                    </button>
                </div>
            `;
            
            this.tasksList.appendChild(taskElement);
        });
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

// Initialize the calendar
const calendar = new TaskCalendar(); 