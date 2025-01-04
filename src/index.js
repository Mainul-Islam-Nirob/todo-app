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
    saveData(); 
    displayProjects();
  };
  
  const addTodoToProject = (projectIndex, todo) => {
    console.log("from add to do project", todo)
    projects[projectIndex].todos.push(todo);
    saveData(); 
    displayTodos(projectIndex);
  };
  
  console.log(projects);


  const displayProjects = () => {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = ''; // Clear previous projects

    projects.forEach((project, index) => {
        // Create a div for the project
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        // Create the project name span
        const projectName = document.createElement('span');
        projectName.classList.add('project-name');
        projectName.textContent = project.name;

        // Create the project buttons container
        const projectBtns = document.createElement('div');
        projectBtns.classList.add('projectBtns');

        // Create the edit button
        const editBtn = document.createElement('i');
        editBtn.classList.add('projectBtn', 'fa-solid', 'fa-pen-to-square');
        editBtn.onclick = () => editProject(index); // Add click event for editing

        // Create the delete button
        const deleteBtn = document.createElement('i');
        deleteBtn.classList.add('projectBtn', 'fa-regular', 'fa-trash');
        deleteBtn.onclick = () => deleteProject(index); // Add click event for deleting

        // Create the add todo button
        const addTodoBtn = document.createElement('i');
        addTodoBtn.classList.add('projectBtn', 'fa-sharp', 'fa-solid', 'fa-plus');
        addTodoBtn.onclick = () => {
          selectedProjectIndex = index; // Store the index of the project
          showModal('todoModal'); // Show the todo modal
        }

        // Append buttons to the buttons container
        projectBtns.appendChild(editBtn);
        projectBtns.appendChild(deleteBtn);
        projectBtns.appendChild(addTodoBtn);

        // Append the project name and buttons to the project div
        projectDiv.appendChild(projectName);
        projectDiv.appendChild(projectBtns);

        // Append the project div to the project list
        projectList.appendChild(projectDiv);
    });
};
  
  const displayTodos = (projectIndex) => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear previous todos
    console.log("project index", projectIndex)
    projects[projectIndex].todos.forEach((todo, index) => {
      console.log("todo from loop", todo, index)
      // Create a container for the todo item
      const todoItem = document.createElement('div');
      todoItem.classList.add('todoItem'); // Apply your custom CSS class
  
      // Add the title
      const titleElement = document.createElement('div');
      titleElement.classList.add('t-title');
      titleElement.textContent = todo.title;
      todoItem.appendChild(titleElement);
  
      // Add the description
      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('t-description');
      descriptionElement.textContent = todo.description;
      todoItem.appendChild(descriptionElement);
  
      // Add the priority
      const priorityElement = document.createElement('div');
      priorityElement.classList.add('t-priority');
      priorityElement.textContent = `Priority: ${todo.priority}`;
      todoItem.appendChild(priorityElement);
  
      // Add the due date
      const dueDateElement = document.createElement('div');
      dueDateElement.classList.add('t-dueDate');
      dueDateElement.textContent = `Due: ${todo.dueDate}`;
      todoItem.appendChild(dueDateElement);
  
      // Add edit buttons
      const editContainer = document.createElement('div');
      editContainer.classList.add('edit-item');
  
      const editBtn = document.createElement('span');
      editBtn.classList.add('edit-btn');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => {
        // Logic to edit the todo
        console.log(`Editing todo at index ${index}`);
      });
      editContainer.appendChild(editBtn);
  
      const deleteBtn = document.createElement('span');
      deleteBtn.classList.add('edit-btn');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        projects[projectIndex].todos.splice(index, 1); // Remove the todo
        displayTodos(projectIndex); // Re-render the todos
        saveData(); // Save the updated data to localStorage
      });
      editContainer.appendChild(deleteBtn);
  
      todoItem.appendChild(editContainer);
  
      // Append the todoItem to the todoList
      todoList.appendChild(todoItem);
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


  let selectedPriority = ''; // Variable to store the selected priority

// Add event listeners to the buttons
document.getElementById('low-btn').addEventListener('click', () => {
  selectedPriority = 'Low'; // Update the selected priority
  updateButtonStyles('low-btn', 'high-btn'); // Optional: Update styles to indicate selection
});

document.getElementById('high-btn').addEventListener('click', () => {
  selectedPriority = 'High'; // Update the selected priority
  updateButtonStyles('high-btn', 'low-btn'); // Optional: Update styles to indicate selection
});

let selectedProjectIndex = 0; // For simplicity, adding todos to the first project
  
  const handleTodoSubmit = (event) => {
    event.preventDefault();
    console.log("clicked add todo")
    const title = document.getElementById('title').value;
    const description = document.getElementById('details').value;
    const dueDate = document.getElementById('date').value;

   
    if (!selectedPriority) {
      alert('Please select a priority!');
      return;
    }

    const priority = selectedPriority;

  console.log(title, description, dueDate, priority)
    const todo = TodoFactory(title, description, dueDate, priority);
    console.log("todo details", todo);
    addTodoToProject(selectedProjectIndex, todo);
  
    const modal = document.getElementById('todoModal');
    modal.style.display = 'none';
  
    document.getElementById('todo-form').reset();
    selectedPriority = '';
    updateButtonStyles(); // Reset button styles
  };


  
  // Update button styles to indicate selection
function updateButtonStyles(selectedId, otherId) {
  console.log("Selected ID:", selectedId);
console.log("Other ID:", otherId);

  const selectedButton = document.getElementById(selectedId);
  const otherButton = document.getElementById(otherId);

  if (selectedButton) {
    selectedButton.classList.add('selected'); // Add selected style
    console.log(selectedButton)
    console.log("change selected button style")
  }

  if (otherButton) {
    otherButton.classList.remove('selected'); // Remove selected style
    console.log("change other button style")

  }
}

  const handleProjectSubmit = (event) => {
    event.preventDefault();
    console.log("clicked add")

    const name = document.getElementById("projectName").value; 
    console.log("project name", name)
    addProject(name);

    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
  
    document.getElementById('project-form').reset();

  }
  
  
  // Event listeners
  document.getElementById('show-todo-modal').addEventListener('click', () => showModal('todoModal'));
  document.getElementById('show-project-modal').addEventListener('click', () => showModal('projectModal'));
  document.getElementById('todo-form').addEventListener('submit', handleTodoSubmit);
  document.getElementById('project-form').addEventListener('submit', handleProjectSubmit);
  
  
  // Load data from localStorage if available
  // const loadData = () => {
  //   const data = localStorage.getItem('todoAppData');
  //   projects.length = 0; 
  //   if (data) {
  //     const parsedData = JSON.parse(data);
  //     parsedData.forEach(project => {
  //       const newProject = ProjectFactory(project.name);
  //       project.todos.forEach(todo => {
  //         newProject.todos.push(TodoFactory(todo.title, todo.description, todo.dueDate, todo.priority));
  //       });
  //       projects.push(newProject);
  //     });
  //     displayProjects();
  //   } else {
  //     // Create default project
  //     addProject('Default Project');
  //   }
  // };
  
  const loadData = () => {
    const data = localStorage.getItem('todoAppData');
    // projects.length = 0; 
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
        
        // Display todos for the first project if it exists
        if (projects.length > 0) {
            displayTodos(0); // Display todos for the first project
        }
    } else {
        // Create default project
        addProject('Default Project');
    }
};
  
  // loadData();
  // Save data to localStorage
  const saveData = () => {
    localStorage.setItem('todoAppData', JSON.stringify(projects));
  };
  
document.addEventListener('DOMContentLoaded', loadData);
