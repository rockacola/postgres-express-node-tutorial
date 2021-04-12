# 1. Technical Plan Document V1

For group task management (GTM) web app version 1.

## 1.1. Executive Summary

After the prototype of GTM API design (previously referred a 'todo list app'), we want to push forward with an MVP to serve as our very first product release.

This document evaluates our solution design, technical needs to push the product out, and how we will grow this project.

The first deliverable is aimed at 4 weeks, where collaboration with other departments able to commence after the first 2 weeks.

## 1.2. Document Status

* Status: **Draft**

This document is currently under ongoing revision and refinements. Please do not use this document as the basis of important decision makings.

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
      - [1.7.4.5. Search](#1745-search)
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

This document will provide the required summary of project direction and immediate action plan. It will also include an outline of the roadmap after this deliverable.

When this document is finalized, it is to serve as a blueprint allowing other teams to plan around it. For example, UX team shall able to work with the front-end team now they able to visualize the content delivery strategy and formulate visual design solutions.

### 1.4.1. What this Document is not for

* Purpose of this document is not to cater for visual design or serving as templating guide to the front-end development. 
* There are no considerations for marketing nor community growth strategy.

## 1.5. Project Goal Summary

The immediate goal of this project is to able to deliver an MVP for the GTM web app allowing anyone to join and use it.

There are plenty of existing, polished products serving an exact purpose (such as Trello, Asana), and whilst we still yet to come up with our distinctive value proposition, we want to have the base features in place and set up an excellent foundation for future, unknown feature growth.

## 1.6. Problem Space Descriptions

In this section of the document, we will discuss our understanding and interpretation of the problem we trying to solve.

### 1.6.1. User Stories

Below is a list of user stories to address in this project:

* *"Users able to collaborate together and track for task completions"*
* *"Onboarding process for guests should be minimal, allowing guests to become task participants without many overheads."*
* *"Users should easily track task progressions, be able to report or analysis if needed."*
* *"The web app should have very high perceived speed, especially when it comes to mobile usages."*

### 1.6.2. Use Cases

Below is a list of use cases to cater, include ones already implemented during the prototype:

#### 1.6.2.1. Account

* Guest able to create an account
* Guest able to provide credentials and becomes an User
* Guest able to submit a lost password request
* Guest able to verify registration through email token
* User able to change his password

#### 1.6.2.2. Task Group

* User able to see list of his task groups
* User able to create a task group
* User able to modify description of a task group belongs to him
* User able to delete a task group that belongs to him
* User able to add another user to his task group as 'collaborator
* User able to remove an existing collaborator from his task group
* Collaborator able to see the tasks of the task group he part takes in
* Collaborator able to remove himself from a task group

#### 1.6.2.3. Task

* User able to see list of tasks of a given task group
* User able to add a task into his task group
* User able to modify description of a task belongs to him
* User able to delete a task belongs to him
* User able to set a collaborator to a task as 'assignee'
* User able to unset an existing assignee from his task
* Assignee able to unassign himself from a task he's assigned to
* Assignee able to update completion status of a task he's assigned to

#### 1.6.2.4. Search

* User able to search his task groups by common filters (such as keywords, date, etc)
* User able to search his tasks by common filters
* User able to search tasks he's assigned to by common filters

## 1.7. Solution Space Descriptions

In this section of the document, we will discuss our solution design and the rationale behind it.

### 1.7.1. Infrastructure Design

For our immediate concern, we will be utilizing PaaS (such as Heroku) to speed development without having to worry about dev op tasks. Moving forward, we want to use IaaS (such as Amazon EC2) to manage our own instances where we have greater capabilities for customization and fine-tuning.

Disregard of destination, we want to ensure infrastructure setup can be done programmatically, where we will be able to reproduce and replicate instances as needed.

In this project, we will require 2 types of instance:

* API server
* Database

### 1.7.2. Data Model

* User
  * Refers to users who are using our platform
  * Must have an email address
  * In order to use the majority of the product, the user has to verify his email address
  * User can have 0 to many task groups
* Task Group
  * Belongs to exactly 1 user
* Task
  * Assigned to 0 or 1 user
* Task Group Owner
  * A specialized user
  * Refers to the owner of a task group
  * Can manage users in a task group to be 'collaborators
  * Can manage users in a task to be 'assignee'
* Task Group Collaborator
  * A specialized user
  * Refers to participants of a task group
  * Can participate in the task group he's been invited to
* Task Assignee
  * A specialized user
  * Refers to participants of a task been assigned to by the task group owner
  * Can participate in the task he's been invited to

#### 1.7.2.1. Data Structure

Below is a definition of data structure in pseudo-code:

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

Joining table for establishing a many-to-many relationship between users and task groups.

```txt
  id          INTEGER PK
  taskGroupId INTEGER FK NOT NULL
  userId      INTEGER FK NOT NULL
```

### 1.7.3. API Structure

* Using API version number for better forward compatibility to major API changes
  * Example: `https://api.product.io/v1/`
* Environment variants by using prefixes, for example:
  * For stage environment: `https://stage-api.product.io/v1/`
  * For nightly release: `https://nightly-api.product.io/v1/`
  * For project-specific releases: `https://atlas-api.product.io/v1/`
    * `atlas` been the code name of a certain release
* API design to follow OpenAPI specification 3.1
* Generated API documentation using `swagger-codegen`

### 1.7.4. API Definition

#### 1.7.4.1. Account

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

#### 1.7.4.2. User

* `GET /users/me`
  * Obtain user information of the authorized account
  * Required authentication
* `PATCH /users/:userId/password`
  * Change user password
  * Required authentication
  * Request body
    * `existingPassword` text, required
    * `newPassword` text, required

#### 1.7.4.3. Task Group

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

#### 1.7.4.4. Task

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

#### 1.7.4.5. Search

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

### 1.7.5. 8.4 Project Milestones

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

## 1.8. Roadmap

In this section of the document, we will define our forward compatibility consideration

### 1.8.1. Version 1.1

* Further user requirement evaluation
* Add version control to user-generated content

### 1.8.2. Version 1.2

* Further user requirement evaluation
* Performance benchmark and evaluation
* Separate concern of 'account' and 'user', allowing OAuth or other types of login methods
* Discourage user registration with a weak password
* Allow users to comment on a task
* Allow users to comment on a comment

### 1.8.3. Unversioned

#### 1.8.3.1. Infrastructure

* Define log store and analyze
* Define data store instance for blob file storage
* Define cache instance
* Define load balance instance

#### 1.8.3.2. Feature

* Allow having multiple assignees per task
* Allow user to add reaction (in form of emoji) to a task
* Allow user to add reaction (in form of emoji) to a comment
* Allow more sophisticated 'task status' as opposed to just 'complete' boolean toggle

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
