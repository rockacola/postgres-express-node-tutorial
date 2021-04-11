# 1. Technical Plan Document V1

For group task management (GTM) web app version 1.

## 1.1. Executive Summary

After the protopype of GTM API design (base of a todo list app demo), we want to push forward with a MVP to serve as our very first public product release as a team collaboration tool.

This document will provide technical summary base off current implementation, and proposed technical solution deriving from it.

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
      - [Account](#account)
      - [Task Group](#task-group)
      - [Task](#task)
      - [Search](#search)
  - [1.7. Solution Space Descriptions](#17-solution-space-descriptions)
    - [1.7.1. Infrastructure Design](#171-infrastructure-design)
    - [1.7.2. Data Model](#172-data-model)
      - [Table Schema](#table-schema)
    - [1.7.3. API Structure and Definitions](#173-api-structure-and-definitions)
    - [1.7.4. 8.4 Project Milestones](#174-84-project-milestones)
  - [1.8. Future (TBD)](#18-future-tbd)
  - [1.9. Appendix](#19-appendix)
    - [1.9.1. Roles](#191-roles)
    - [1.9.2. Terminologies](#192-terminologies)

## 1.4. Purpose of This Document

This document will provide required summary on project direction and immediate action plan.

When this document is finalised, it may serve as a blueprint allowing other departs to proceed their planning on top of this. For examples:

* Front end team and UX team shall able to visualize the content delivery strategy and formulate its design solution.

### 1.4.1. What this Document is not for

Purpose of this document is not to cater for visual design or serving as templating guide to the front end development.

There are no consideration for marketing nor commmunity growth strategy from here.

This is not a document to provide nor track actionable development tasks.

## 1.5. Project Goal Summary

The immediate goal of this project is to able to deliver a MVP for GTM web app allowing anyone to join and use.

There are plenty of existing, polished products serving exact purpose, and whist we still yet to come up with our distinctive value proposition, we want to have the base functionality delivered and have good API foundation in place.

## 1.6. Problem Space Descriptions

In this section of the document, we will discuss about our understanding and intepreatation of the problem we trying to solve.

### 1.6.1. User Stories

Below is a comprehensive list of user stories defined to cover concern of this document.

* *"Users want to create a managing group of tasks, or part time an existing task group."*
* *"Onboarding process for guests should be minimal, allowing guests to become task participants without much overheads."*
* *"Users should easily track task progressions, be able to report or analysis if needed."*
* *"The web app should have very high perceived speed"*

### 1.6.2. Use Cases

Since this is the first document, it will contain the use cases from the prototype.

#### Account

* Guest able to create an account
* Guest able to provide credentials and becomes an User
* Guest able to submit lost password request
* Guest able to verify registration through email token
* User able to change his password

#### Task Group

* User able to create a task group
* User able to modify description of a task group belongs to him
* User able to delete a task group belongs to him
* User able to add other user to his task group as 'collaobrator'
* User able to remove existing collaborator from his task group
* Collaborator able to see the tasks of the task group he part takes in
* Collaborator able to remove himself from a task group

#### Task

* User able to add task into his task group
* User able to modify description of a task belongs to him
* User able to delete a task belongs to him
* User able to set a collaborator to a task as 'assignee'
* User able to unset an existing assignee from his task
* Assignee able to unassign himself from a task he's assigned to
* Assignee able to update completion status of a task he's assigned to

#### Search

* User able to search his task groups by common filters (such as: keywords, date, etc)
* User able to search his tasks by common filters
* User able to search tasks he's assigned to by common filters

## 1.7. Solution Space Descriptions

In this section of the document, we will discuss about our solution design and rationale behind it.

### 1.7.1. Infrastructure Design

* Cloud VPS with docker
* Microservice infrastructor, breaking up each components to individual virtual server
  * API server
  * Database
  * File storage
  * Cache
* Using Ansible from mostly-automatic server setup
* Analytic tools like Sentry for debugability

### 1.7.2. Data Model

* User
* Task
* Task Group

#### Table Schema

* Users
* Tasks
* TaskGroups
* Joining tables:
  * TBA

### 1.7.3. API Structure and Definitions

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

### 1.7.4. 8.4 Project Milestones

* Target 4 weeks for this delivery cycle
* Enough should be structured for the first 2 weeks, other departments should be able to delay on this from week 3 onward.

## 1.8. Future (TBD)

In this section of the document, we will decide our forward compatibility consideration for ever changing software space.

* Revision control
  * soft delete should be supeceded
  * some createdAt and updatedAt metadata no longer required
  * revision data should be stored in separate data storage

* Uncover uncertainty

## 1.9. Appendix

### 1.9.1. Roles

* Guest
* User
* Task group owner
* Task group collaborator
* Task assignee

### 1.9.2. Terminologies

* Task group
* Task
