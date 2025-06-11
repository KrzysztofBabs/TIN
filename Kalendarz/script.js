class TaskCalendar{
    constructor(){
        this.currentDate=new Date();
        this.tasks=JSON.parse(localStorage.getItem('tasks')) || [];
        this.inicjalizujElementy();
        this.dodajNasluchiwaczeZdarzen();
        this.wyswietlKalendarz();
        this.wyswietlZadania();
        this.ustawSynchronizacje();
    }

    inicjalizujElementy(){
        this.calendarDays=document.getElementById('dniKalendarza');
        this.currentMonthElement=document.getElementById('aktualnyMiesiac');
        this.prevMonthBtn=document.getElementById('poprzedniMiesiac');
        this.nextMonthBtn=document.getElementById('nastepnyMiesiac');
        this.addTaskBtn=document.getElementById('dodajZadanie');
        this.taskTitleInput=document.getElementById('tytulZadania');
        this.taskDescriptionInput=document.getElementById('opisZadania');
        this.taskDateInput=document.getElementById('dataZadania');
        this.tasksList=document.getElementById('listaZadan');
    }

    dodajNasluchiwaczeZdarzen(){
        this.prevMonthBtn.addEventListener('click',()=>this.zmienMiesiac(-1));
        this.nextMonthBtn.addEventListener('click',()=>this.zmienMiesiac(1));
        this.addTaskBtn.addEventListener('click',()=>this.dodajZadanie());
    }

    zmienMiesiac(a){
        this.currentDate.setMonth(this.currentDate.getMonth()+a);
        this.wyswietlKalendarz();
    }

    wyswietlKalendarz(){
        const year=this.currentDate.getFullYear();
        const month=this.currentDate.getMonth();
        
        const firstDay=new Date(year,month,1);
        const lastDay = new Date(year, month + 1, 0);
        
        const monthNames=['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
                         'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];


        // naglowek
        this.currentMonthElement.textContent=`${monthNames[month]} ${year}`;
        
        this.calendarDays.innerHTML='';
        
        // tworzenie pustych dni
        for(let i=0;i<firstDay.getDay();i++){
            const emptyDay=document.createElement('div');
            emptyDay.className='dzien pusty';
            const emptyContent=document.createElement('div');
            emptyContent.className='zawartosc-dnia';
            emptyDay.appendChild(emptyContent);
            this.calendarDays.appendChild(emptyDay);
        }

        // tworzenie komorek dla miesiecy
        for(let day=1;day<=lastDay.getDate();day++){
            const dayElement=document.createElement('div');
            dayElement.className='dzien';
            
            const dayContent=document.createElement('div');
            dayContent.className='zawartosc-dnia';
            
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2,'0')}`;
            const tasksForDay=this.tasks.filter(task=>task.date===dateString);
            
            const dayNumber=document.createElement('div');
            dayNumber.className='numer-dnia';
            dayNumber.textContent=day;
            dayContent.appendChild(dayNumber);

            // kontenerek na zadania
            if(tasksForDay.length>0){
                const tasksContainer=document.createElement('div');
                tasksContainer.className='zadania-dnia';
                
                tasksForDay.forEach(task=>{
                    const taskElement=document.createElement('div');
                    taskElement.className=`zadanie-dnia ${task.completed?'zakonczone':''}`;
                    
                    const taskTitle=document.createElement('div');
                    taskTitle.className='tytul-zadania';
                    taskTitle.textContent=task.title;
                    
                    const taskDescription=document.createElement('div');
                    taskDescription.className='opis-zadania';
                    taskDescription.textContent=task.description;
                    
                    taskElement.appendChild(taskTitle);
                    taskElement.appendChild(taskDescription);
                    tasksContainer.appendChild(taskElement);
                });
                
                dayContent.appendChild(tasksContainer);
                // dzien ktory ma zadania
                dayElement.classList.add('ma-zadania');
            }
            
            dayElement.appendChild(dayContent);
            dayElement.addEventListener('click',()=>this.pokazZadaniaDlaDaty(dateString));
            this.calendarDays.appendChild(dayElement);
        }
    }


    // sprawdzam czy sa zadania dla danej daty
    czyMaZadaniaNaDate(dateString){
        return this.tasks.some(task=>task.date===dateString);
    }

    pokazZadaniaDlaDaty(dateString){
        const tasksForDate=this.tasks.filter(task=>task.date===dateString);
        this.wyswietlZadania(tasksForDate);
        this.taskDateInput.value=dateString;
        
        const taskForm=document.querySelector('.formularz-zadania');
        taskForm.scrollIntoView({behavior:'smooth'});
        taskForm.style.backgroundColor='#e3f2fd';
        setTimeout(()=>{
            taskForm.style.backgroundColor='#f9f9f9';
        },1000);
    }

    dodajZadanie(){
        const title=this.taskTitleInput.value.trim();
        const description=this.taskDescriptionInput.value.trim();
        const date=this.taskDateInput.value;

        if(!title || !date){
            alert('Wypelnij wymagane pola!');
            return;
        }

        const task={
            id:Date.now(),
            title,
            description,
            date,
            completed : false
        };

        this.tasks.push(task);
        this.zapiszZadania();
        this.wyswietlKalendarz();
        this.wyswietlZadania();
        this.wyczyscFormularz();
    }

    usunZadanie(taskId){
        this.tasks=this.tasks.filter(task=>task.id!==taskId);
        this.zapiszZadania();
        this.wyswietlKalendarz();
        this.wyswietlZadania();
    }

    edytujZadanie(taskId){
        const task=this.tasks.find(t=>t.id===taskId);
        if(task){
            this.taskTitleInput.value=task.title;
            this.taskDescriptionInput.value=task.description;
            this.taskDateInput.value=task.date;
            this.usunZadanie(taskId);
        }
    }

    przelaczZadanieZakonczone(taskId){
        const task=this.tasks.find(t=>t.id===taskId);
        if(task){
            task.completed=!task.completed;
            this.zapiszZadania();
            this.wyswietlZadania();
        }
    }

    wyczyscFormularz(){
        this.taskTitleInput.value='';
        this.taskDescriptionInput.value='';
        this.taskDateInput.value='';
    }

    wyswietlZadania(przefiltrowaneZadania=null){
        const zadaniaDoWyswietlenia=przefiltrowaneZadania || this.tasks;
        this.tasksList.innerHTML='';

        zadaniaDoWyswietlenia.forEach(task=>{
            const taskElement=document.createElement('div');
            taskElement.className=`element-zadania ${task.completed?'zakonczone':''}`;
            
            taskElement.innerHTML=`
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <p>Data: ${task.date}</p>
                <div class="akcje-zadania">
                    <button class="przycisk-edytuj" onclick="calendar.edytujZadanie(${task.id})">Edytuj</button>
                    <button class="przycisk-usun" onclick="calendar.usunZadanie(${task.id})">Usuń</button>
                    <button class="przycisk-zakoncz" onclick="calendar.przelaczZadanieZakonczone(${task.id})">
                        ${task.completed?'Cofnij':'Zakończ'}
                    </button>
                </div>
            `;
            
            this.tasksList.appendChild(taskElement);
        });
    }

    ustawSynchronizacje() {
        window.addEventListener('storage', (e) => {
            if (e.key==='tasks') {
                this.tasks=JSON.parse(e.newValue) || [];
                this.wyswietlKalendarz();
                this.wyswietlZadania();
            }
        });

        setInterval(()=> {
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            if (JSON.stringify(storedTasks) !== JSON.stringify(this.tasks)) {
                this.tasks=storedTasks;
                this.wyswietlKalendarz();
                this.wyswietlZadania();
            }
        },30000);
    }

    zapiszZadania(){
        localStorage.setItem('tasks',JSON.stringify(this.tasks));
        window.dispatchEvent(new StorageEvent('storage',{
            key:'tasks',
            newValue:JSON.stringify(this.tasks)
        }));
    }
}

const calendar=new TaskCalendar(); 
