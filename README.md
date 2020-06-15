## Setting up a development environment

For a development environment you need working Docker and docker-compose. Then
you need to copy the `*.example` files and fill out the missing parts.

Once that's done you can start the development environment with:

```
docker-compose -f docker-compose.dev.yaml up --build
```

## Running automated tests

The automated test environment is the same as above but with the following 
command:

```
docker-compose -f docker-compose.test.yaml up --abort-on-container-exit --exit-code-from sut 
```

It will run `test.py` in the `test` directory.