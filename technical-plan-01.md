# 1. Technical Plan Document V1

For group task management (GTM) web app version 1.

## 1.1. Executive Summary

After the protopype of GTM API design (previously referred as 'todo list app'), we want to push forward with a MVP to serve as our very first product release.

This document is aimed to evaluate our solution design, technical needs to push the product out and how we will grow this project.

## 1.2. Document Status

* Status: **Draft**

This document is currently under ongoing revision and refinements. Please do not use this document as basis of important decision makings.

Please review 'history' of this document to see its revisions.

## 1.3. Table of Content

- [1. Technical Plan Document V1](#1-technical-plan-document-v1)
  - [1.1. Executive Summary](#11-executive-summary)
  - [1.2. Document Status](#12-document-status)
  - [1.3. Table of Content](#13-table-of-content)
  - [1.4. Purpose of This Document](#14-purpose-of-this-document)
    - [1.4.1. What this Document is not for](#141-what-this-document-is-not-for)
  - [1.5. Project Goal Summary](#15-project-goal-summary)
  - [1.6. Problem Space Descriptions](#16-problem-space-descriptions)
    - [1.6.1. User Stories](#161-user-stories)
    - [1.6.2. Use Cases](#162-use-cases)
      - [1.6.2.1. Account](#1621-account)
      - [1.6.2.2. Task Group](#1622-task-group)
      - [1.6.2.3. Task](#1623-task)
      - [1.6.2.4. Search](#1624-search)
  - [1.7. Solution Space Descriptions](#17-solution-space-descriptions)
    - [1.7.1. Infrastructure Design](#171-infrastructure-design)
    - [1.7.2. Data Model](#172-data-model)
      - [1.7.2.1. Data Structure](#1721-data-structure)
    - [1.7.3. API Structure](#173-api-structure)
    - [1.7.4. API Definition](#174-api-definition)
      - [1.7.4.1. Account](#1741-account)
      - [1.7.4.2. User](#1742-user)
      - [1.7.4.3. Task Group](#1743-task-group)
      - [1.7.4.4. Task](#1744-task)
    - [1.7.5. 8.4 Project Milestones](#175-84-project-milestones)
  - [1.8. Roadmap](#18-roadmap)
    - [1.8.1. Version 1.1](#181-version-11)
    - [1.8.2. Version 1.2](#182-version-12)
    - [1.8.3. Unversioned](#183-unversioned)
      - [1.8.3.1. Infrastructure](#1831-infrastructure)
      - [1.8.3.2. Feature](#1832-feature)
  - [1.9. Appendix](#19-appendix)
    - [1.9.1. Roles](#191-roles)

## 1.4. Purpose of This Document

This document will provide required summary on project direction and immediate action plan. It will also include outline of the roadmap after this deliverable.

When this document is finalised, it may serve as a blueprint allowing other teams to plan around it. For example: UX team shall able to work with front-end team now they able to visualize the content delivery strategy and formulate visual design solutions.

### 1.4.1. What this Document is not for

* Purpose of this document is not to cater for visual design or serving as templating guide to the front-end development. 
* There are no considerations for marketing nor commmunity growth strategy.

## 1.5. Project Goal Summary

The immediate goal of this project is to able to deliver a MVP for GTM web app allowing anyone to join and use.

There are plenty of existing, polished products serving exact purpose (such as: Trello, Asana), and whist we still yet to come up with our distinctive value proposition, we want to have the base features in place and setup an excellent foundation for future, unknown feature growht.

## 1.6. Problem Space Descriptions

In this section of the document, we will discuss about our understanding and intepreatation of the problem we trying to solve.

### 1.6.1. User Stories

Below is a list of user stories to address in this project:

* *"Users want to create a managing group of tasks, or part time an existing task group."*
* *"Onboarding process for guests should be minimal, allowing guests to become task participants without much overheads."*
* *"Users should easily track task progressions, be able to report or analysis if needed."*
* *"The web app should have very high perceived speed, especially when it comes to mobile usages."*

### 1.6.2. Use Cases

Below is a list of use cases to cater, include ones already implemented during the prototype:

#### 1.6.2.1. Account

* Guest able to create an account
* Guest able to provide credentials and becomes an User
* Guest able to submit lost password request
* Guest able to verify registration through email token
* User able to change his password

#### 1.6.2.2. Task Group

* User able to create a task group
* User able to modify description of a task group belongs to him
* User able to delete a task group belongs to him
* User able to add other user to his task group as 'collaobrator'
* User able to remove existing collaborator from his task group
* Collaborator able to see the tasks of the task group he part takes in
* Collaborator able to remove himself from a task group

#### 1.6.2.3. Task

* User able to add task into his task group
* User able to modify description of a task belongs to him
* User able to delete a task belongs to him
* User able to set a collaborator to a task as 'assignee'
* User able to unset an existing assignee from his task
* Assignee able to unassign himself from a task he's assigned to
* Assignee able to update completion status of a task he's assigned to

#### 1.6.2.4. Search

* User able to search his task groups by common filters (such as: keywords, date, etc)
* User able to search his tasks by common filters
* User able to search tasks he's assigned to by common filters

## 1.7. Solution Space Descriptions

In this section of the document, we will discuss about our solution design and rationale behind it.

### 1.7.1. Infrastructure Design

For our immediate concern, we will be utilizing PaaS (such as Heroku) to speed development without having to worry for dev op tasks. Moving forward, we want to use IaaS (such as Amazon EC2) to manage our own instances where we have greater capabilities for customization and fine tuning.

Disregard of destination, we want to ensure infrastructure setup can be programaticed, where we will be able to reproduce and replicate instances as needed.

In this project, we will require 2 types of instance:

* API server
* Database

### 1.7.2. Data Model

* User
  * Refers to users who are using our platform
  * Must have an email address
  * In order to use majority of the product, user has to verify his email address
  * User can have 0 to many task groups
* Task Group
  * Belongs to exactly 1 user
* Task
  * Assigned to 0 or 1 user
* Task Group Owner
  * A specialized user
  * Refers to owner of a task group
  * Can manage users in a task group to be 'collaboators'
  * Can manage users in a task to be 'assignee'
* Task Group Collaborator
  * A specialized user
  * Refers to participants of a task group
  * Can participate the task group he's been invited to
* Task Assignee
  * A specialized user
  * Refers to participants of a task been assigned to by the task group owner
  * Can participate the task he's been invited to

#### 1.7.2.1. Data Structure

Below is a defintion of data structure in pseudo code:

* Users

```txt
  id        INTEGER PK
  email     TEXT    NOT NULL
  password  TEXT    NOT NULL
```

* Tasks

```txt
  id        INTEGER   PK
  content   TEXT      NOT NULL
  userId    INTEGER   FK NOT NULL
```

* TaskGroups

```txt
  id      INTEGER PK
  title   TEXT    NOT NULL
  userId  INTEGER FK
```

* TaskGroup_Users

Joining table for establishing many-to-many relationship between users and task groups.

```txt
  id          INTEGER PK
  taskGroupId INTEGER FK NOT NULL
  userId      INTEGER FK NOT NULL
```

### 1.7.3. API Structure

* Using version number from the start
  * Example: `https://api.product.io/v1/`
* Environment variants shall use prefixes, example:
  * For stage environment: `https://stage-api.product.io/v1/`
  * For nightly release: `https://nightly-api.product.io/v1/`
  * For project specific releases: `https://atlas-api.product.io/v1/`
    * `atlas` been the code name of a certain release
* API request
  * To follow RESTful API guideline
  * Well polished, generated API doc
  * Support for global params for common interfacing needs
    * `format`: default to JSON, but able to provide other formats for different purpose.
* API response
  * When there's data in response, use common data wrapper
    * This will provide greater forward compaitablity
  * Logical errors shoudl all have same format
    * Error message is designed to be exposed to public, hence should consider level of details
    * An erorr reference value shall be provdied for troubleshoot purpose.

### 1.7.4. API Definition

#### 1.7.4.1. Account

* `POST /users`
  * To register an user
* `POST /users/login`
  * To login an user with provided credentials
  
#### 1.7.4.2. User

* `GET /users/me`
  * Obtain user information of the authorized account




#### 1.7.4.3. Task Group

* `GET /taskGroups`
  * User to list his task groups
* `POST /taskGroups`
  * User to create a task group
* `GET /taskGroups/:taskGroupId`
  * Task group owner to get details of his task group
* `PUT /taskGroups/:taskGroupId`
  * Task group owner to modify details of his task group
* `DELETE /taskGroups/:taskGroupId`
  * Task group owner to delete his task group
* `POST /taskGroups/:taskGroupId/collaborators/:collaboratorId`
  * Task group owner to set an user to his task group as 'collaborator'
* `DELETE /taskGroups/:taskGroupId/collaborators/:collaboratorId`
  * Task group owner to unset a collaborator from his task group

#### 1.7.4.4. Task

* `POST /taskGroups/:taskGroupId/tasks/:taskId`
  * Task group owner to create a task into his task group
* `DELETE /taskGroups/:taskGroupId/tasks/:taskId`
  * Task group owner to delete a task from his task group
* `PATCH /taskGroups/:taskGroupId/tasks/:taskId/complete`
  * Assignee to update completion status of his assigned task
* `POST /taskGroups/:taskGroupId/tasks/:taskId/assignee/:assigneeId`
  * Task group owner to set a collaborator to a task as assignee
* `DELETE /taskGroups/:taskGroupId/tasks/:taskId/assignee/:assigneeId`
  * Task group owner to unset an assignee from a task

### 1.7.5. 8.4 Project Milestones

* Target 4 weeks for this delivery cycle
* Enough should be structured for the first 2 weeks, other departments should be able to delay on this from week 3 onward.

## 1.8. Roadmap

In this section of the document, we will define our forward compatibility consideration

### 1.8.1. Version 1.1

* Uncover uncertainty
* Revision control
  * soft delete should be supeceded
  * some createdAt and updatedAt metadata no longer required
  * revision data should be stored in separate data storage

### 1.8.2. Version 1.2

* Separate concern of 'account' and 'user', allowing OAuth or other types of login methods
* Discourage user registration with weak password
* Allowing users to comment a task

### 1.8.3. Unversioned

#### 1.8.3.1. Infrastructure

* Define log store and analyze
* Define data store instance for blob file storage
* Define cache instance
* Define load balance instance

#### 1.8.3.2. Feature

* Allowing multiple assignee per task

## 1.9. Appendix

### 1.9.1. Roles

* Guest
  * Visitor of the web app who we cannot identify
* User
  * Registered user of the product
* Task group owner
  * User who is the created of the task group of concern
* Task group collaborator
  * User who is defined to allow to part take a task group of concern
* Task assignee
  * User who is designed to allow to part take a task of concern
