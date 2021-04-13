# 1. Group Task Management (GTM) - API Style Guide

## 1.1. Abstract

TBA

## 1.2. Document Status

* Status: **Draft**

This document is currently under ongoing revision and refinements. Please do not use this document as the basis of important decision makings.

## 1.3. Table of Content

- [1. Group Task Management (GTM) - API Style Guide](#1-group-task-management-gtm---api-style-guide)
  - [1.1. Abstract](#11-abstract)
  - [1.2. Document Status](#12-document-status)
  - [1.3. Table of Content](#13-table-of-content)
  - [1.4. API Structure](#14-api-structure)

## 1.4. API Structure

* Using API version number for better forward compatibility to major API changes
  * Example: `https://api.product.io/v1/`
* Environment variants by using prefixes, for example:
  * For stage environment: `https://stage-api.product.io/v1/`
  * For nightly release: `https://nightly-api.product.io/v1/`
  * For project-specific releases: `https://atlas-api.product.io/v1/`
    * `atlas` been the code name of a certain release
* API design to follow OpenAPI specification 3.1
* Generated API documentation using `swagger-codegen`
