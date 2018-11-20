PipeMaster 3000
===============

Simple tool that lets you see how a message moved through your data-pipeline.

Each component in your pipeline must send a request when it receives data and when it sends data (if applicable).


## Architecture

The system consists of a UI and an API, both of which are running in the generated Docker container.


## Database

The API requires a [MongoDB](https://mongodb.com) instance.

By default it will connect to `mongodb://localhost:27017/PipeMaster3000`, where `PipeMaster3000` is the database name.

It currently uses 2 collections:

1. `traces`
2. `_migrations`

You can provide your own connection string via the `MONGO_URL` environment variable.


## Authentication

The API requires a valid [JWT](https://jwt.io/) to be passed in via the `Authorization` header like so `Authorization: Bearer <token>`.


### Signing

The API expects the token to be signed using the `HS256` algorithm with the secret `karmachameleon`. You should of course tell the system
what secret you actually use when creating your tokens. You can pass in your secret via the `TOKEN_SECRET` environment variable.


### Validation

By default, the token must be issued by `God` and have a claim with type `pm3k` (the value does not matter) - e.g.

```
{
    "iss": "God",
    "pm3k": 1
}
``` 

It is however possible to provide your own custom validation function. This will be run after the standard verification stuff, like expiration etc.

You pass in the `base64` encoded function body via the `TOKEN_VALIDATION_FUNCTION` environment variable.

The function must have the signature `(Object decodedToken) : bool`.

The default validation function looks like this:

```
function isValid(decodedToken) {
    return decodedToken['pm3k'] && decodedToken['iss'] && decodedToken['iss'] === 'God';
}
```

#### An example

If you wanted to use the following - "excellent" - validation function:

```
function isValid(decodedToken) {
    return false;
}
```

You would take the function body - i.e. `return false;` and base64 encode, giving you `cmV0dXJuIGZhbHNlOw==`.


## Running it

```
docker run\
    -p 8080:8080\
    -p 3000:3000\
    -e MONGO_URL=mongodb://localhost:27017/PipeMaster3000
    -e TOKEN_SECRET=karmachameleon
    pingvinen/pipemaster3000
```
