export const createAndAppendButton = (
  parent,
  label,
  attribute,
  atrrValue,
  callback,
  argument
) => {
  const button = document.createElement('button')
  button.innerText = label
  button.setAttribute(attribute, atrrValue)
  button.onclick = function () {
    callback(argument)
  }

  parent.appendChild(button)

  return button
}

export const createAndAppendElement = (
  parent,
  element,
  content,
  attribute,
  atrrValue
) => {
  const child = document.createElement(element)
  child.setAttribute(attribute, atrrValue)
  if (content) child.innerText = content

  parent.appendChild(child)

  return child
}

export const emptyInput = (inputValue, parent, children) => {
  const errorMessage = document.querySelector('.error-msg')

  if (!inputValue && !errorMessage) {
    children.map((child) => child.classList.add('error'))
    createAndAppendElement(
      parent,
      'p',
      "Can't add an empty todo",
      'class',
      'error-msg'
    )
    return
  }

  if (inputValue && errorMessage) {
    children.map((child) => child.classList.remove('error'))
    removeElement(parent, '.error-msg')
    return
  }
}

export const localStorageValues = (hasLocalStorageValues, key, value) => {
  if (hasLocalStorageValues) return JSON.parse(localStorage.getItem(key))

  return localStorage.setItem(key, JSON.stringify(value))
}

export const removeElement = (parent, selector, element) => {
  const child = document.querySelector(selector)
  parent.removeChild(element || child)

  return child
}
