# 1. Group Task Management (GTM) - API Definitions

## 1.1. Abstract

TBA

## 1.2. Document Status

* Status: **Draft**

This document is currently under ongoing revision and refinements. Please do not use this document as the basis of important decision makings.

This document will eventually phase out and replaced by an auto-generated API document.

## 1.3. Table of Content

- [1. Group Task Management (GTM) - API Definitions](#1-group-task-management-gtm---api-definitions)
  - [1.1. Abstract](#11-abstract)
  - [1.2. Document Status](#12-document-status)
  - [1.3. Table of Content](#13-table-of-content)
  - [1.4. API Definition](#14-api-definition)
    - [1.4.1. Account](#141-account)
    - [1.4.2. User](#142-user)
    - [1.4.3. Task Group](#143-task-group)
    - [1.4.4. Task](#144-task)
    - [1.4.5. Search](#145-search)

## 1.4. API Definition

### 1.4.1. Account

* `POST /users`
  * To register an user
* `POST /users/login`
  * To login an user with provided credentials
  * Request body
    * `email` text, required
    * `password` text, required
* `GET /users/verification/:token`
  * To provide email verification with a given token
* `POST /users/password-reset`
  * To submit request for password reset
  * Request body
    * `email` text, required

### 1.4.2. User

* `GET /users/me`
  * Obtain user information of the authorized account
  * Required authentication
* `PATCH /users/:userId/password`
  * Change user password
  * Required authentication
  * Request body
    * `existingPassword` text, required
    * `newPassword` text, required

### 1.4.3. Task Group

* `GET /taskGroups`
  * User to list his task groups
  * Required authentication
* `POST /taskGroups`
  * User to create a task group
  * Required authentication
  * Request body
    * `title` text, required
* `GET /taskGroups/:taskGroupId`
  * Task group owner to get details of his task group
  * Required authentication
* `PUT /taskGroups/:taskGroupId`
  * Task group owner to modify details of his task group
  * Required authentication
  * Request body
    * `title` text, required
* `DELETE /taskGroups/:taskGroupId`
  * Task group owner to delete his task group
  * Required authentication
* `POST /taskGroups/:taskGroupId/collaborators/:collaboratorId`
  * Task group owner to set an user to his task group as 'collaborator'
  * Required authentication
* `DELETE /taskGroups/:taskGroupId/collaborators/:collaboratorId`
  * Task group owner to unset a collaborator from his task group
  * Collaborator himself may also use the same endpoint to remove himself from the specified task group
  * Required authentication
* `GET /collaborator/:collaboratorId/taskGroups`
  * List task groups an user collaborated in
  * Required authentication

### 1.4.4. Task

* `POST /taskGroups/:taskGroupId/tasks/:taskId`
  * Task group owner to create a task into his task group
  * Required authentication
  * Request body
    * `content` text, required
* `PUT /taskGroups/:taskGroupId/tasks/:taskId`
  * Task group owner to modify a task into his task group
  * Required authentication
  * Request body
    * `content` text, required
* `DELETE /taskGroups/:taskGroupId/tasks/:taskId`
  * Task group owner to delete a task from his task group
  * Required authentication
* `PATCH /taskGroups/:taskGroupId/tasks/:taskId/complete`
  * Assignee to update completion status of his assigned task
  * Required authentication
  * Request body
    * `complete` boolean, required
* `POST /taskGroups/:taskGroupId/tasks/:taskId/assignee/:assigneeId`
  * Task group owner to set a collaborator to a task as assignee
  * Required authentication
* `DELETE /taskGroups/:taskGroupId/tasks/:taskId/assignee/:assigneeId`
  * Task group owner to unset an assignee from a task
  * Assignee himself may also use the same endpoint to remove himself from the specified task
  * Required authentication

### 1.4.5. Search

* `GET /taskGroups/search`
  * User to search for his task groups
  * Required authentication
  * Request parameters
    * `q` text
    * `from` date
    * `to` date
* `GET /tasks/search`
  * User to search for his tasks
  * Required authentication
  * Request parameters
    * `q` text
    * `from` date
    * `to` date
* `GET /tasks/search/assignee`
  * User to search for his assigned tasks
  * Required authentication
  * Request parameters
    * `q` text
    * `from` date
    * `to` date
