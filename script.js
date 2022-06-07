//------------- ~ > Elements < ~ \\-------------

const inputElement = document.querySelector(".new-task-input");
const addTasktButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

//------------- ~ > Functions < ~ \\-------------

const valideInput = () => {
  return inputElement.value.trim().length > 0;
};

const handleAddTask = () => {
  const isInputValided = valideInput();

  if (!isInputValided) {
    return inputElement.classList.add("error");
  }

  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");

  const itemText = document.createElement("p");
  itemText.innerText = inputElement.value;

  itemText.addEventListener("click", () => handleClick(itemText));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");

  deleteItem.addEventListener("click", () =>
    handleDelete(itemContainer, itemText)
  );

  itemContainer.appendChild(itemText);
  itemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(itemContainer);

  inputElement.value = "";
  updateLocalStorage();
};

const handleClick = (itemText) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const taskClicked = task.firstChild.isSameNode(itemText);

    if (taskClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDelete = (itemContainer, itemText) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const taskClicked = task.firstChild.isSameNode(itemText);
    if (taskClicked) {
      itemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleChangeInput = () => {
  const isInputValided = valideInput();

  if (isInputValided) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const tasksDatabase = [...tasks].map((task) => {
    const item = task.firstChild;
    const finished = item.classList.contains("completed");

    return { description: item.innerText, isCompleted: finished };
  });

  localStorage.setItem("tasks", JSON.stringify(tasksDatabase));
};

const refreshLocalStorage = () => {
  const tasksFromDB = JSON.parse(localStorage.getItem("tasks"));

  for (const task of tasksFromDB) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    const itemText = document.createElement("p");
    itemText.innerText = task.description;

    if (task.isCompleted) {
      itemText.classList.add("completed");
    }

    itemText.addEventListener("click", () => handleClick(itemText));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () =>
      handleDelete(itemContainer, itemText)
    );

    itemContainer.appendChild(itemText);
    itemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(itemContainer);
  }
};

refreshLocalStorage();

//------------- ~ > Events < ~ \\-------------

addTasktButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleChangeInput());
