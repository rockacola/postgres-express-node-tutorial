# Technical Planner

## Terminologies

* Todo list owner
* Todo list collaborator
* Todo item assignee

## Scope

* An user can owns 0 to many todo list; a todo list can be owned by exactly 1 user.
* Users can be invited to participate in a todo list, thus becomes a collaborator of the list.
* Collaborators of the todo list can work on its items (tasks), where he shall be assign to it and be allowed to change the status of the todo item.

## Use Cases

* 'Todo list owner' can manage collaborators to his todo list
* 'Todo list owner' can assign/unassign collaborator to a todo item to be 'todo item assignee'
* 'Todo item assignee' can change status of a todo item

---

## Development action plans

* Update 'Todo Item' model to include assignee's user ID
* API end point for 'Todo list owner' to adding assignee to a todo item
* API end point for 'Todo list owner' to removing assignee to a todo item
* API end point for 'Todo item assignee' updating todo item status
* Deprecates existing generic 'update todo item' API end point

---

## Variations

* Should user have the ability to agree to parttake a todo list, rather then be forcefully assigned to one?
* Can a collaborator assign todo item to himself? How about exit an assignment?
* What happens to the assigned todo items when a collaborator leaves the todo list?
* Do want to allow multiple assignees to a todo item? how about in the future?

(And plenty more...)
