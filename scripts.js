var taskInput = document.getElementById('new-task')
var addButton = document.getElementById('add-button')
var clearButton = document.getElementById('clear-button')
var incompleteTasks = document.getElementById('incomplete-tasks')
var completedTasks = document.getElementById('completed-tasks')
var createNewTaskElement = function (taskString) {
    var listItem = document.createElement('li')
    var checkBtn = document.createElement('input')
    var label = document.createElement('label')
    var editButton = document.createElement('button')
    var deleteButton = document.createElement('button')

    checkBtn.type = 'checkbox'
    editButton.innerText = 'Edit'
    editButton.className = 'edit'
    deleteButton.innerText = 'Delete'
    deleteButton.className = 'delete'
    label.innerText = taskString
    listItem.appendChild(checkBtn)
    listItem.appendChild(label)
    listItem.appendChild(editButton)
    listItem.appendChild(deleteButton)

    checkBtn.addEventListener('change', function () {
        if (checkBtn.checked) {
            completedTasks.appendChild(listItem)
            editButton.style.display = 'none'
        } else {
            incompleteTasks.appendChild(listItem)
            editButton.style.display = 'inline'
        }
    })

    deleteButton.addEventListener('click', function () {
        listItem.parentNode.removeChild(listItem)
    })
   editButton.addEventListener('click', function () {
       var originalText = label.textContent // Save the original text of the task
       label.contentEditable = true
       label.focus()


       var handleBlur = function () {
           if (label.textContent.trim() === '') {
               alert('Task cannot be empty!')
               label.textContent = originalText // Reset to original value if empty
           }
           label.contentEditable = false
           label.removeEventListener('blur', handleBlur) // Remove the event listener after it's triggered
       }

       // Attach the blur event listener
       label.addEventListener('blur', handleBlur)
   })
    return listItem
}

var addTask = function () {
    console.log('Add task...')
    if (taskInput.value == '') {
        alert('please add Some Text')
    } else {
        var listItem = createNewTaskElement(taskInput.value)
        incompleteTasks.appendChild(listItem)
        taskInput.value = ''
    }
}


addButton.addEventListener('click', addTask)
clearButton.addEventListener('click', function () {
    incompleteTasks.innerHTML = ''
    completedTasks.innerHTML = ''
})


// Apply edit and delete functionality to pre-existing tasks in the HTML
document.querySelectorAll('#incomplete-tasks .edit, #completed-tasks .edit').forEach(function (button) {
    button.addEventListener('click', function () {
        var label = this.previousElementSibling;
        var originalText = label.textContent; // Save the original text before editing
        label.contentEditable = true;
        label.focus();

        // Listen for blur event (when user clicks away)
        label.addEventListener('blur', function () {
            if (label.textContent.trim() === '') {
                alert('Task cannot be empty!');
                label.textContent = originalText; // Reset to original value if empty
            }
            label.contentEditable = false;
        });
    });
});

// Apply delete functionality to pre-existing tasks
document.querySelectorAll('#incomplete-tasks .delete, #completed-tasks .delete').forEach(function (button) {
    button.addEventListener('click', function () {
        this.parentElement.remove();
    });
});

// Apply checkbox functionality to pre-existing tasks
document.querySelectorAll('#incomplete-tasks input[type="checkbox"], #completed-tasks input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        var listItem = this.parentElement;
        if (this.checked) {
            completedTasks.appendChild(listItem);
            listItem.querySelector('.edit').style.display = 'none';
        } else {
            incompleteTasks.appendChild(listItem);
            listItem.querySelector('.edit').style.display = 'inline';
        }
    });

    // Set initial state based on whether the checkbox is checked
    if (checkbox.checked) {
        completedTasks.appendChild(checkbox.parentElement);
        checkbox.parentElement.querySelector('.edit').style.display = 'none';
    } else {
        incompleteTasks.appendChild(checkbox.parentElement);
        checkbox.parentElement.querySelector('.edit').style.display = 'inline';
    }
});
