# 1. Group Task Management (GTM) - Version 1.0 Project Planner

## 1.1. Abstract

TBA

## 1.2. Document Status

* Status: **Draft**

This document is currently under ongoing revision and refinements. Please do not use this document as the basis of important decision makings.

## 1.3. Table of Content

- [1. Group Task Management (GTM) - Version 1.0 Project Planner](#1-group-task-management-gtm---version-10-project-planner)
  - [1.1. Abstract](#11-abstract)
  - [1.2. Document Status](#12-document-status)
  - [1.3. Table of Content](#13-table-of-content)
  - [1.4. Project Overview](#14-project-overview)
  - [1.5. Use Cases](#15-use-cases)
    - [1.5.1. Account](#151-account)
    - [1.5.2. Task Group](#152-task-group)
    - [1.5.3. Task](#153-task)
    - [1.5.4. Search](#154-search)
  - [1.6. 8.4 Project Milestones](#16-84-project-milestones)

## 1.4. Project Overview

(aka Project Goal Summary)

The immediate goal of this project is to able to deliver an MVP for the GTM web app allowing anyone to join and use it.

There are plenty of existing, polished products serving an exact purpose (such as Trello, Asana), and whilst we still yet to come up with our distinctive value proposition, we want to have the base features in place and set up an excellent foundation for future, unknown feature growth.

## 1.5. Use Cases

Below is a list of use cases to cater, include ones already implemented during the prototype:

### 1.5.1. Account

* Guest able to create an account
* Guest able to provide credentials and becomes an User
* Guest able to submit a lost password request
* Guest able to verify registration through email token
* User able to change his password

### 1.5.2. Task Group

* User able to see list of his task groups
* User able to create a task group
* User able to modify description of a task group belongs to him
* User able to delete a task group that belongs to him
* User able to add another user to his task group as 'collaborator
* User able to remove an existing collaborator from his task group
* Collaborator able to see the tasks of the task group he part takes in
* Collaborator able to remove himself from a task group

### 1.5.3. Task

* User able to see list of tasks of a given task group
* User able to add a task into his task group
* User able to modify description of a task belongs to him
* User able to delete a task belongs to him
* User able to set a collaborator to a task as 'assignee'
* User able to unset an existing assignee from his task
* Assignee able to unassign himself from a task he's assigned to
* Assignee able to update completion status of a task he's assigned to

### 1.5.4. Search

* User able to search his task groups by common filters (such as keywords, date, etc)
* User able to search his tasks by common filters
* User able to search tasks he's assigned to by common filters

## 1.6. 8.4 Project Milestones

This project aimed to complete with 4 weeks of development effort

* First 2 weeks
  * Have a production-ready infrastructure in place, such as:
    * Server environment
    * Database environment
  * Complete API user guide
  * Complete developers' integration test suites
  * Setup mock API endpoints allowing consuming test (by front-end team)
* Second 2 weeks
  * Revise and replicate the product infrastructure as a stage environment
  * Complete development implementation
