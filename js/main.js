import {
  createAndAppendButton,
  createAndAppendElement,
  emptyInput,
  localStorageValues,
  removeElement,
} from './utils.js'

const main = document.querySelector('.main')
const input = document.querySelector('.input')
const inputSection = document.querySelector('.input-section')
const addBtn = document.querySelector('.add-btn')
const todoContainer = document.querySelector('.todo-container')
const todoList = document.querySelector('.todo-list')

let id = 0
let items = []

const renderTodos = () => {
  todoContainer.style.display = 'block'
  todoList.innerHTML = ''
  input.value = ''

  items.map(({ id, todo }) => {
    const todoItem = createAndAppendElement(
      todoList,
      'li',
      '',
      'class',
      `item-${id} todo-item`
    )

    createAndAppendElement(todoItem, 'p', todo, 'class', `item-content`)

    createAndAppendButton(
      todoItem,
      'Delete',
      'class',
      'delete-button',
      deleteTodo,
      id
    )
  })
}

const addTodo = (event) => {
  event.preventDefault()

  if (!input.value)
    return emptyInput(input.value, inputSection, [input, addBtn])

  id++
  items.push({
    id,
    todo: input.value,
  })

  localStorageValues(false, 'todoList-vanilla', items)

  if (items.length === 1) {
    createAndAppendButton(
      main,
      'Delete all',
      'class',
      'delete-all-button',
      deleteAllTodos
    )
  }

  todoContainer.style.display = 'block'
  input.focus()
  renderTodos()
}

const deleteTodo = (idTodo) => {
  removeElement(todoList, `.item-${idTodo}`)
  items = items.filter((todo) => todo.id !== idTodo)

  const isItemsEmpty = items.length === 0
  localStorageValues(false, 'todoList-vanilla', isItemsEmpty ? null : items)

  if (isItemsEmpty) {
    id = 0
    removeElement(main, '.delete-all-button')
    todoContainer.style.display = 'none'
  }
}

const deleteAllTodos = () => {
  items = []
  id = 0

  localStorageValues(false, 'todoList-vanilla', null)
  removeElement(main, '.delete-all-button')

  todoContainer.style.display = 'none'
}

;(function () {
  const localStorageValue = localStorageValues(true, 'todoList-vanilla')

  if (localStorageValue) {
    localStorageValue.map((todo) => (id = todo.id))
    items = localStorageValue

    createAndAppendButton(
      main,
      'Delete all todos',
      'class',
      'delete-all-button',
      deleteAllTodos
    )
    renderTodos()
  }
})()

addBtn.addEventListener('click', addTodo)
input.addEventListener('input', function () {
  emptyInput(input.value, inputSection, [input, addBtn])
})
