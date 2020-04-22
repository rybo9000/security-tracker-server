# SECURITY TRACKER API

## The Back-End application which allows an MSP to track the security posture of their clients

**[FRONT-END GITHUB LINK](https://github.com/rybo9000/security-tracker)**

### What technology is this built with?

- NODEJS
- EXPRESSJS
- POSTGRESQL

### How Does It Work?

1. The system consists of Clients, Security Items, and Categories.
2. A Category defines a grouping of related Security Items.
3. A Security Item defines an aspect of security a managed client might have installed such as Antivirus or Web Filtering.
4. A Security Item MUST be assigned to a Category.
5. After defining the appropriate Security Items and Categories you can then create and adjust the active Security Items for different clients.
6. Lastly, you can run a report on a client to view their overall posture score.

### Current Endpoints V 1.0 _(Refactor Coming Soon)_

**GET - /api/categories**
_Return all categories_

**POST - /api/categories**
_Create a new category_

**GET - /api/clients**
_Return all clients_

**POST - /api/clients**
_Create a new client_

**GET - /api/clients/:id**
_Return a single client by ID_

**GET - /api/securityitems**
_Return all Security Items_

**POST - /api/securityitems**
_Create a new Security Item_

**GET - /api/status**
_Return all status entries_

**GET - /api/status?id=XXXX**
_Return a status entry by ID_

**PATCH - /api/status**
_Toggle the true / false column of a status row by ID_

**GET - /api/status/name**
_Return all status entries with the name returned instead of ID_
