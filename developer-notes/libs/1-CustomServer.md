## `CustomServer`:

A `Constructor Function` that:

1. creates an http server using `http.createServer` method
2. manage routes in callback
3. adds `this` of `CustomServer` to `master` @property of server that is created in "1".
4. return server