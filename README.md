# Mobita Backend

https://floating-gorge-16340.herokuapp.com/

The backend REST API of a MERN stack app for managing store branches and their inventory.

## Object Models

### Store

```json
{
    name: string,
    address: {
        street: string,
        district: string,
        province, string
    }
}
```

### Dorayaki

```json
{
    flavor: string,
    description: string,
    imgUrl: string
}
```

### storeStock

```json
{
    storeID: ObjectID,
    dorayakiID: ObjectID,
    quantity: Number,
    flavor: String,
    description: String,
    imgUrl: String
}
```

The storeStock model stores some properties of the dorayaki it is referencing, to eliminate the need of join queries

### image

```json
{
    contentType: String,
    data: Buffer
}
```

## Endpoints

### /store

#### GET

returns an array of stores

#### POST

creates a new store

request body:
corresponds to store model

### /store/:id

#### GET

returns a single store with the corresponding :id
status: 200 if found, 404 if not found

#### DELETE

deletes a single store with the corresponding :id
status: 200 if found, 404 if not found

#### PUT

updates a store with the given request body
status: 204 if found and updated, 404 if not found
request body: corresponds to store model

### /store/:id/dorayaki

#### GET

returns array of all stocks that matches storeID == :id

#### POST

creates a new stock for the store with \_id == :id

request body:

```json
{
    dorayakiID: objectID,
    quantity: Number
}
```

### /store/:id/dorayaki/:stockID

#### GET

returns a single stock item with the corresponding stockID

#### DELETE

deletes a single stock with the corresponding stockID

#### PATCH

sets the quantity of a stock with the corresponding stockID

request body:

```json
{
    quantity: Number
}
```

### /dorayaki

#### GET

returns array of all dorayaki

#### POST

creates a new dorayaki

request:

Content-Type: multipart/form-data
Key | Value
------------ | -------------
flavor | String
description | String
image | image file

### /dorayaki/:id

#### GET

returns a dorayaki with the corresponding :id

#### DELETE

deletes a dorayaki with th corresponding :id

#### PATCH

updates dorayaki with given request body

request body:

```json
{
    flavor: string,
    description: string
}
```
