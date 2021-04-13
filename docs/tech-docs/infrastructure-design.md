# 1. Group Task Management (GTM) - Infrastructure Design

## 1.1. Abstract

TBA

## 1.2. Document Status

* Status: **Draft**

This document is currently under ongoing revision and refinements. Please do not use this document as the basis of important decision makings.

## 1.3. Table of Content

- [1. Group Task Management (GTM) - Infrastructure Design](#1-group-task-management-gtm---infrastructure-design)
  - [1.1. Abstract](#11-abstract)
  - [1.2. Document Status](#12-document-status)
  - [1.3. Table of Content](#13-table-of-content)
  - [1.4. Design Description](#14-design-description)

## 1.4. Design Description

For our immediate concern, we will be utilizing PaaS (such as Heroku) to speed development without having to worry about dev op tasks. Moving forward, we want to use IaaS (such as Amazon EC2) to manage our own instances where we have greater capabilities for customization and fine-tuning.

Disregard of destination, we want to ensure infrastructure setup can be done programmatically, where we will be able to reproduce and replicate instances as needed.

In this project, we will require 2 types of instance:

* API server
* Database
