import {getTodos, toggleTodo, removeTodo} from './todos'
import {getFilters} from './filters'

// Render application todos based on filters
const renderTodos = () => {
	const todoEl = document.querySelector('#todos')
	const filters = getFilters()
	const filteredTodos = getTodos().filter((todo) => {
		const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
		const hideCompletedMatch = !filters.hideCompleted || !todo.completed

		return searchTextMatch && hideCompletedMatch
	})
	const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

	todoEl.innerHTML = ''
	generateSummaryDOM(incompleteTodos)

	if (filteredTodos.length > 0) {
		filteredTodos.forEach((todo) => {
			todoEl.appendChild(generateTodoDOM(todo))
		})
	} else {
		const messageEl = document.createElement('p')
		messageEl.classList.add('empty-message')
		messageEl.textContent = 'There are no to-dos to show'
		todoEl.appendChild(messageEl)
	}
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
	const todoEl = document.createElement('label')
	const containerEl = document.createElement('div')
	const checkbox = document.createElement('input')
	const todoText = document.createElement('span')
	const removeButton = document.createElement('button')

	// Setup todo checkbox
	checkbox.classList.add('checkbox')
	checkbox.setAttribute('type', 'checkbox')
	checkbox.checked = todo.completed
	containerEl.appendChild(checkbox)
	checkbox.addEventListener('change', () => {
		toggleTodo(todo.id)
		renderTodos()
	})

	// Setup the todo text
	todoText.textContent = todo.text
	todoText.classList.add('item__text')
	containerEl.appendChild(todoText)

	// Setup container
	todoEl.classList.add('item')
	containerEl.classList.add('item__content')
	todoEl.appendChild(containerEl)

	// Setup the remove button
	removeButton.textContent = 'x'
	removeButton.classList.add('btn', 'btn--remove')
	containerEl.appendChild(removeButton)
	removeButton.addEventListener('click', () => {
		removeTodo(todo.id)
		renderTodos()
	})

	return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
	const summary = document.querySelector('#summary')
	const plural = incompleteTodos.length === 1 ? '' : 's'
	summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
}

export {generateTodoDOM, renderTodos, generateSummaryDOM}
