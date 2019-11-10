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

Queries

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

```json
{
 "id": "J-ONE"
}
```

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

```json
{
 "id": "C-ONE"
}
```

Mutations

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

```json
{
 "input": {
   "companyId": "C-ONE",
   "title": "New Job",
   "description": "This is a new Job"
 }
}
```
