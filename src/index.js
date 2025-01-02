// Factory function for creating todo objects
const TodoFactory = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority };
  };
  
  // Factory function for creating project objects
  const ProjectFactory = (name) => {
    const todos = [];
    return { name, todos };
  };
  
  // Functionality for managing projects and todos
  const projects = [];
  
  const addProject = (name) => {
    const project = ProjectFactory(name);
    projects.push(project);
    displayProjects();
  };
  
  const addTodoToProject = (projectIndex, todo) => {
    projects[projectIndex].todos.push(todo);
    displayTodos(projectIndex);
  };
  
  const displayProjects = () => {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
      const li = document.createElement('li');
      li.textContent = project.name;
      li.addEventListener('click', () => displayTodos(index));
      projectList.appendChild(li);
    });
  };
  
  const displayTodos = (projectIndex) => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    projects[projectIndex].todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = `${todo.title} - ${todo.dueDate}`;
      todoList.appendChild(li);
    });
  };
  
  const showModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
  
    const closeBtn = modal.querySelector('.closeBtn');
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('date').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
  
    const todo = TodoFactory(title, description, dueDate, priority);
    const selectedProjectIndex = 0; // For simplicity, adding todos to the first project
    addTodoToProject(selectedProjectIndex, todo);
  
    const modal = document.getElementById('todoModal');
    modal.style.display = 'none';
  
    document.getElementById('modal-form').reset();
  };
  
  // Event listeners
  document.getElementById('addTodo').addEventListener('click', () => showModal('todoModal'));
  document.getElementById('add-project-btn').addEventListener('click', () => showModal('projectModal'));
  document.getElementById('modal-form').addEventListener('submit', handleSubmit);
  
  // Load data from localStorage if available
  const loadData = () => {
    const data = localStorage.getItem('todoAppData');
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.forEach(project => {
        const newProject = ProjectFactory(project.name);
        project.todos.forEach(todo => {
          newProject.todos.push(TodoFactory(todo.title, todo.description, todo.dueDate, todo.priority));
        });
        projects.push(newProject);
      });
      displayProjects();
    } else {
      // Create default project
      addProject('Default Project');
    }
  };
  loadData();
  
  // Save data to localStorage
  const saveData = () => {
    localStorage.setItem('todoAppData', JSON.stringify(projects));
  };
  