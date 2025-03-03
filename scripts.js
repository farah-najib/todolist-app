class Task {
    constructor(taskText) {
        this.taskText = taskText
        this.listItem = this.createTaskElement()
    }

    createTaskElement() {
        const listItem = document.createElement('li')
        const checkBtn = document.createElement('input')
        const label = document.createElement('label')
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        checkBtn.type = 'checkbox'
        editButton.innerText = 'Ändra'
        editButton.className = 'edit'
        deleteButton.innerText = 'Radera'
        deleteButton.className = 'delete'
        label.innerText = this.taskText

        listItem.appendChild(checkBtn)
        listItem.appendChild(label)
        listItem.appendChild(editButton)
        listItem.appendChild(deleteButton)

        this.addEventListeners(
            listItem,
            checkBtn,
            editButton,
            deleteButton,
            label
        )

        return listItem
    }

    addEventListeners(listItem, checkBtn, editButton, deleteButton, label) {
        checkBtn.addEventListener('change', () => {
            if (checkBtn.checked) {
                TaskManager.completedTasks.appendChild(listItem)
                editButton.style.display = 'none'
            } else {
                TaskManager.incompleteTasks.appendChild(listItem)
                editButton.style.display = 'inline'
            }
        })

        deleteButton.addEventListener('click', () => listItem.remove())

        editButton.addEventListener('click', () => {
            const originalText = label.textContent
            label.contentEditable = true
            label.focus()

            label.addEventListener('blur', function handleBlur() {
                if (label.textContent.trim() === '') {
                    TaskManager.displayError('Task cannot be empty!')
                    label.textContent = originalText
                }
                label.contentEditable = false
                label.removeEventListener('blur', handleBlur)
            })
        })
    }
}

class TaskManager {
    static taskInput = document.getElementById('new-task')
    static addButton = document.getElementById('add-button')
    static clearButton = document.getElementById('clear-button')
    static incompleteTasks = document.getElementById('incomplete-tasks')
    static completedTasks = document.getElementById('completed-tasks')
    static errorDisplay = document.getElementById('error-message')

    static addTask() {
        const taskText = TaskManager.taskInput.value.trim()
        if (!taskText) {
            TaskManager.displayError('Please enter a task!')
            return
        }

        const task = new Task(taskText)
        TaskManager.incompleteTasks.appendChild(task.listItem)
        TaskManager.taskInput.value = ''
        TaskManager.clearError()
    }

    static clearTasks() {
        TaskManager.incompleteTasks.innerHTML = ''
        TaskManager.completedTasks.innerHTML = ''
    }

    static displayError(message) {
        TaskManager.errorDisplay.innerText = message
        TaskManager.errorDisplay.style.display = 'block'
    }

    static clearError() {
        TaskManager.errorDisplay.style.display = 'none'
    }

    static initialize() {
       
        document
            .querySelectorAll('#incomplete-tasks li')
            .forEach((listItem) => {
                TaskManager.attachTaskEvents(listItem, false)
            })


        document.querySelectorAll('#completed-tasks li').forEach((listItem) => {
            TaskManager.attachTaskEvents(listItem, true)
        })
    }

    static attachTaskEvents(listItem, isCompleted) {
        const checkBtn = listItem.querySelector('input[type="checkbox"]')
        const editButton = listItem.querySelector('.edit')
        const deleteButton = listItem.querySelector('.delete')
        const label = listItem.querySelector('label')

        if (isCompleted) {
            editButton.style.display = 'none'
        }

        checkBtn.addEventListener('change', () => {
            if (checkBtn.checked) {
                TaskManager.completedTasks.appendChild(listItem)
                editButton.style.display = 'none'
            } else {
                TaskManager.incompleteTasks.appendChild(listItem)
                editButton.style.display = 'inline'
            }
        })

        deleteButton.addEventListener('click', () => listItem.remove())

        editButton.addEventListener('click', () => {
            const originalText = label.textContent
            label.contentEditable = true
            label.focus()

            label.addEventListener('blur', function handleBlur() {
                if (label.textContent.trim() === '') {
                    TaskManager.displayError('Task cannot be empty!')
                    label.textContent = originalText
                }
                label.contentEditable = false
                label.removeEventListener('blur', handleBlur)
            })
        })
    }
}


TaskManager.addButton.addEventListener('click', TaskManager.addTask)
TaskManager.clearButton.addEventListener('click', TaskManager.clearTasks)
document.addEventListener('DOMContentLoaded', TaskManager.initialize)
