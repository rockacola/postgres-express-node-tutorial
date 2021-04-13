# 1. Group Task Management (GTM) - Data Model

## 1.1. Abstract

TBA

## 1.2. Document Status

* Status: **Draft**

This document is currently under ongoing revision and refinements. Please do not use this document as the basis of important decision makings.

## 1.3. Table of Content

- [1. Group Task Management (GTM) - Data Model](#1-group-task-management-gtm---data-model)
  - [1.1. Abstract](#11-abstract)
  - [1.2. Document Status](#12-document-status)
  - [1.3. Table of Content](#13-table-of-content)
  - [1.4. Model Description](#14-model-description)
  - [1.5. Data Structure](#15-data-structure)

## 1.4. Model Description

* User
  * Refers to users who are using our platform
  * Must have an email address
  * To use the majority of the product, the user has to verify his email address
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

## 1.5. Data Structure

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
