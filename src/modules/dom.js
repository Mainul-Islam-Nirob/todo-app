const dom = (() => {
    const addTodo = document.getElementById("#addTodo");

    console.log("mmmmmmmmmmmmmmmm");
    addTodo.addEventListener(click, openTodoModal);

    function openTodoModal() {
      console.log("Open modal");
      const modal = document.getElementById("#todoModal");
      modal.style.display = "block";
    }
  })();

  export default dom;
  
