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
    projects[projectIndex].todos.push(todo);
    saveData(); 
    displayTodos(projectIndex);
  };
  

//Editing a project
let editingProjectIndex = null; // Variable to store the index of the project being edited

const editProject = (index) => {
    editingProjectIndex = index; // Store the index of the project being edited
    const projectNameInput = document.getElementById("projectName");
    projectNameInput.value = projects[index].name; // Pre-fill the input with the current project name
    document.getElementById('projectModalTitle').textContent = 'Update Project'; // Set modal title
    showModal('projectModal'); // Show the project modal
};

const deleteProject = (index) => {
  if (confirm("Are you sure you want to delete this project and all its todos?")) {
    projects.splice(index, 1); // Remove the project from the array
    saveData(); // Save the updated data to localStorage
    displayProjects(); // Re-display the projects
    displayTodos(null, 'all');
    activateNavItem('show-all-todos'); // Activate the "To Do" nav item
    }
}

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

        // Add click event listener to the project name
        projectName.addEventListener('click', () => {
          const allProjectNames = document.querySelectorAll('.project-name');
          const navItems = document.querySelectorAll('.nav-link'); // Select all nav items

          // Remove active class from all nav items
          navItems.forEach(item => {
              item.classList.remove('nav-active'); // Remove active class from all nav items
          });
          allProjectNames.forEach((name) => name.classList.remove('project-active'));

        // Add active class to the clicked project name
        projectName.classList.add('project-active');

        displayTodos(index); // Show todos for the clicked project
      });

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

//update todo
let editingTodoIndex = null; // Variable to store the index of the todo being edited

const editTodo = (projectIndex, todoIndex) => {

    editingTodoIndex = todoIndex; // Store the index of the todo being edited
    const todo = projects[projectIndex].todos[todoIndex]; // Get the current todo

    // Pre-fill the input fields with the current todo details
    document.getElementById('title').value = todo.title;
    document.getElementById('details').value = todo.description;
    document.getElementById('date').value = todo.dueDate;
    selectedPriority = todo.priority; // Set the selected priority

    selectedProjectIndex = projectIndex; 
    
    updateButtonStyles(selectedPriority === 'Low' ? 'low-btn' : 'high-btn', selectedPriority === 'High' ? 'low-btn' : 'high-btn'); // Update button styles
      
    document.getElementById('todoModalTitle').textContent = 'Update Task'; // Set modal title
    showModal('todoModal'); // Show the todo modal
};
  
const deleteTodo = (projectIndex, index) => {

  projects[projectIndex].todos.splice(index, 1); // Remove the todo
  displayTodos(null, "all"); // Re-render the todos
  saveData(); // Save the updated data to localStorage
};

  const displayTodos = (projectIndex = null, filter = null) => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear previous todos

    let todosToDisplay = [];


  if (filter === 'all') {
    todosToDisplay = projects.flatMap((project, projectIndex) =>
        project.todos.map((todo, todoIndex) => ({
            ...todo,
            projectName: project.name,
            projectIndex,
            todoIndex, // Add the index of the todo within the specific project
        }))
    );
} else if (filter === 'important') {
    todosToDisplay = projects.flatMap((project, projectIndex) =>
        project.todos
            .filter(todo => todo.priority === 'High')
            .map((todo, todoIndex) => ({
                ...todo,
                projectName: project.name,
                projectIndex,
                todoIndex, // Add the index of the todo within the specific project
            }))
    );
} else if (projectIndex !== null) {
    // Display todos for a specific project
    if (projects[projectIndex]) {
        todosToDisplay = projects[projectIndex].todos.map((todo, todoIndex) => ({
            ...todo,
            projectName: projects[projectIndex].name,
            projectIndex,
            todoIndex, // Add the index of the todo within the specific project
        }));
    }
}

    if (todosToDisplay.length === 0) {
        todoList.innerHTML = "<p class='no-todo'>No todos found :(</p>";
        return;
    }
    
    todosToDisplay.forEach((todo, index) => {
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

        // Add the project name
        const projectNameElement = document.createElement('div');
        projectNameElement.classList.add('projectName');
        projectNameElement.textContent = `Project: ${todo.projectName}`;
        todoItem.appendChild(projectNameElement);

        // Add edit buttons
        const editContainer = document.createElement('div');
        editContainer.classList.add('edit-item');

        const editBtn = document.createElement('span');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTodo(todo.projectIndex, todo.todoIndex); 
        editContainer.appendChild(editBtn);

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('edit-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(todo.projectIndex, todo.todoIndex); 
        editContainer.appendChild(deleteBtn);

        todoItem.appendChild(editContainer);

        // Append the todoItem to the todoList
        todoList.appendChild(todoItem);
    });
};


  const resetModal = () => {
    document.getElementById('todo-form').reset(); // Reset the todo form
    document.getElementById('project-form').reset(); // Reset the project form
    selectedPriority = ''; // Reset selected priority
    editingTodoIndex = null; // Reset editing index for todos
    editingProjectIndex = null; // Reset editing index for projects
     // Reset button styles for priority selection
     const priorityButtons = document.querySelectorAll('.priority-btn .btn'); // Select all buttons within the priority-btn div
     priorityButtons.forEach(button => {
         button.classList.remove('selected'); // Remove the selected class from all buttons
     });
    document.getElementById('todoModalTitle').textContent = 'New Task'; // Reset modal title for todo
    document.getElementById('projectModalTitle').textContent = 'New Project'; // Reset modal title for project
};




const showModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';

  const closeBtn = modal.querySelector('.closeBtn');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    resetModal(); 
  });

  // Close modal when clicking outside of the modal content
  // window.addEventListener("click", closeModalOnOutsideClick(e, modalId));

};

// Close modal on outside click
// function closeModalOnOutsideClick(e, modalId) {
//   const modal = document.getElementById(modalId);
//   const modalContent = document.getElementById('.modal-content');

//  // Check if the click is outside the modal content
//  if (!modalContent.contains(e.target)) {
//   modal.style.display = 'none'; // Close modal
//   resetModal(); // Reset modal data when closed
//   window.removeEventListener("click", (e) => closeModalOnOutsideClick(e, modalId)); // Remove the event listener
// }
// };

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

let selectedProjectIndex = null; 

  const handleTodoSubmit = (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('details').value;
    const dueDate = document.getElementById('date').value;

   
    if (!selectedPriority) {
      alert('Please select a priority!');
      return;
    }

    const priority = selectedPriority;

    if (editingTodoIndex !== null) {
      // If editing an existing todo
      const projectIndex = selectedProjectIndex; // Get the current project index
      if (projects[projectIndex]) { // Check if the project exists
          projects[projectIndex].todos[editingTodoIndex] = TodoFactory(title, description, dueDate, priority); // Update the todo
          displayTodos(projectIndex); 
          editingTodoIndex = null; // Reset the editing index
      } else {
          alert('Error: Project not found.'); // Handle error if project is not found
      }
    } else {
      // If creating a new todo
      const todo = TodoFactory(title, description, dueDate, priority);
      addTodoToProject(selectedProjectIndex, todo);
    } 
    saveData(); 

    const modal = document.getElementById('todoModal');
    modal.style.display = 'none';
    updateButtonStyles(); // Reset button styles
    resetModal(); 
  };


  
  // Update button styles to indicate selection
function updateButtonStyles(selectedId, otherId) {
  const selectedButton = document.getElementById(selectedId);
  const otherButton = document.getElementById(otherId);

  if (selectedButton) {
    selectedButton.classList.add('selected'); // Add selected style
  }

  if (otherButton) {
    otherButton.classList.remove('selected'); // Remove selected style
  }
}

  const handleProjectSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("projectName").value; 

    if (editingProjectIndex !== null) {
      projects[editingProjectIndex].name = name;
      displayProjects(); 
      editingProjectIndex = null;
    } else {
      addProject(name);
    }

    saveData();
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    resetModal(); 
  }
  

// Function to activate the clicked navigation item
const activateNavItem = (activeId) => {
  const navItems = document.querySelectorAll('.nav-link'); // Select all nav items
  const projectNames = document.querySelectorAll('.project-name');

  // Remove active class from all project names
  projectNames.forEach(item => {
    item.classList.remove('project-active'); // Remove active class from all nav items
});


  // Remove active class from all nav items
  navItems.forEach(item => {
      item.classList.remove('nav-active'); // Remove active class from all nav items
  });

  // Add active class to the clicked nav item
  const activeNavItem = document.getElementById(activeId);
  if (activeNavItem) {
      activeNavItem.classList.add('nav-active'); // Add active class to the clicked item
  }
};

  // Event listeners
  // document.getElementById('show-todo-modal').addEventListener('click', () => showModal('todoModal'));
  document.getElementById('show-project-modal').addEventListener('click', () => showModal('projectModal'));
  document.getElementById('todo-form').addEventListener('submit', handleTodoSubmit);
  document.getElementById('project-form').addEventListener('submit', handleProjectSubmit);
  // document.getElementById('importantNav').addEventListener('click', () => displayTodos(null, "important"));
  // document.getElementById('show-all-todos').addEventListener('click', () => displayTodos(null, "all"));

  // Event listener for showing all todos
  document.getElementById('show-all-todos').addEventListener('click', () => {
    displayTodos(null, "all"); // Call the function to display all todos
    activateNavItem('show-all-todos'); // Activate the "To Do" nav item
  });

  // Event listener for showing important todos
  document.getElementById('importantNav').addEventListener('click', () => {
    displayTodos(null, "important"); // Call the function to display important todos
    activateNavItem('importantNav'); // Activate the "Important" nav item
  });

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
        displayTodos(null, 'all');
        activateNavItem('show-all-todos'); // Activate the "To Do" nav item

        
    } 
};
  
const saveData = () => {
    localStorage.setItem('todoAppData', JSON.stringify(projects));
};
  
document.addEventListener('DOMContentLoaded', () => {
  loadData(); // Load initial data

});
