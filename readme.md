# GraphQL Playground

## 01 Hello

```bash
node server.js
```

```graphql
query {
  greeting
}
```

## 02 Job Board

Server

```bash
npm start
```

Client

```bash
npm start
```

### Queries

- Get Jobs

```graphql
query {
  jobs {
    id
    title
    company {
      id
      name
    }
  }
}
```

- Get Job

```graphql
query JobQuery($id: ID!) {
  job(id: $id) {
    id
    title
    company {
      id
      name
    }
    description
  }
}
```

Variables

```json
{
 "id": "J-ONE"
}
```

- Get Company

```graphql
query ComapnyQuery($id: ID!) {
  company(id: $id) {
    id
    name
    description
    jobs {
      id
      title
    }
  }
}
```

Variables

```json
{
 "id": "C-ONE"
}
```

### Mutations

- Create Job

```graphql
mutation CreateJob($input: CreateJobInput) {
  job: createJob(input: $input) {
    id
    title
    company {
      id
      name
    }
    description
  }
}
```

Variables

```json
{
 "input": {
  //  "companyId": "C-ONE",
   "title": "New Job",
   "description": "This is a new Job"
 }
}
```

Headers

```json
{
  "authorization": "Bearer <YOUR TOKEN>"
}
```
