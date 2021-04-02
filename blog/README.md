# Mini Blog Demo

## Rationale
This is a contrived example in order to demonstrate the pros/cons of monolithic & 
service-based architecture. The prime consideration to be examined is the synchronous nature of the monolith versus the asynchronous nature of microservices. 

## System Architecture
The app is a mini-blog app which allows the user to create blog <em>posts</em> which users can then attach <em>comments</em> to via a React <em>client</em>.

```
.               // run `npm start` at root to start all three children
+-- client      // react front end served at localhost 3000 
+-- comments    // backend comments service served at localhost 4001
+-- posts       // backend posts service served at localhost 4000
```

Since the posts & post comments are separate services for every post we must execute an additional call to fetch all comments for the post. Over time this leads
to a very chatty service which will get bogged down. 

## Sync/Async Pros & Cons

Since the requirements would be easily handled by synchronous communication, what are some pros/cons of sync/async communication style? 

* ### Sync Communications
When talking about sync communication, the app is still microservices, not a monolith. So instead of making multiple calls to each microservice we'd just call the posts service which would then itself call the comments service to hydrate the full data structure for consumers before returning.

  * #### Pros
    * Conceptually easy to understand
  * #### Cons
    * Introduces dependencies between services
    * If any inter-service request fails the overall request fails
    * The entire request is only as fast as the slowest request
    * Can easily introduce webs of requests

* ### Async Communications
When talking about async communication the system will still contain the existing comments/posts services but will also include a separate Query service and an even bus. The data flow in this architecture is the posts/comments work as before but when conducting data ops they emit events to an event bus which the query service subscribes to and updates it's own data store. TO repeat, each service has it's own data store.

  * #### Pros
    * Query service has zero direct dependencies
    * Query service is extremely fast
  * #### Cons
    * Data duplication
    * Harder to understand, especially as features are added


## This Repo Is Not Religious
It is 100% understood here this is a contrived example which would easily be handled by a monolith. By keeping the app simple it is easier to keep a mental model of the app in order to study pros & cons of a service/event based system.