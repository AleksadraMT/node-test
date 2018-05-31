# node-test
Node.js task - delegating to web server

We need to create server that will be handling some heavy computation tasks for us. Tasks are going into FIFO queue and we can check out task all the time to see it’s status, get ETD or get result. There can be only one task executed at the time.
End-points
_Server should have 3 endpoints and we should use Express.js_

`/create` - which will return unique ID and ETD for task that is created for us, task should have two inputs by your choice
`/check` - which will return status of our task. Status should have fields:

`status(in queue, in progress, done) 
position(only if status is in queue)`

`ETD (only if status is in queue or in progress)` - including task that is currently running
result (only if status is done)

`/list` - return array of objects with ID and ETD

Note: all endpoints must validate params/body params and let us know if there is not task

Task definition
Computation task don’t really needs to be real computation task. We can use setTimeout to represent heavy computation in interval of 30-90 seconds randomly. But have in mind that we are going to implement task directly in javascript so try to think of setTimeout as SYNC execution and how we should run that in order not to block everything.

ETD - Estimated Time of Delivery
Don’t overthink this. It can be calculated on current average time of execution time for all previous tasks.

Additional
Using ES6 is huge plus
We don’t need to use any DB for this we can do everything in memory
We don’t recommend using immutability
