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
