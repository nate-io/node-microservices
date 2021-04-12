# Mini Blog Demo

## Rationale
This is a contrived example in order to demonstrate the pros/cons of monolithic & 
service-based architecture. The prime consideration to be examined is the synchronous nature of the monolith versus the asynchronous nature of microservices. 

## System Architecture
The app is a mini-blog app which allows the user to create blog <em>posts</em> which users can then attach <em>comments</em> to via a React <em>client</em>.

```
.               // run `npm start` at root to start all three children
+-- client      // react front end served on port 3000 
+-- comments    // comments service served on port 4001
+-- event-bus   // event bus served on port 4005
+-- infra       // kubernetes config
+-- moderation  // moderation service served on port 4003
+-- posts       // posts service served on port 4000
+-- query       // query service served on port 4002
```

Since the posts & post comments are separate services for every post we must execute an additional call to fetch all comments for the post. Over time this leads
to a very chatty service which will get bogged down. 

## Running the System
1. Use Skaffold `skaffold dev` 
   1. This method allows a way to provide a hot reload style feature by running our client and all of our services with one command, `skaffold dev`. Note this is only possible because each of the services uses a tool to allow hot reload - `client` uses Creat React App hot reloading and the backend pieces use `nodemon`.
2. ~~Manually Run Kubernetes Deployments & Services~~
   1. This method employed K8s deployment & service objects to run the pod however there was no 'hot reload' style development wherein changes were made and reflected in the system. Rather a multi-step process using Docker Hub was followed:
      1. Make changes to code
      2. Apply changes to environment
         1. if `deployment` file:
            1. build new image from work dir `docker build -t <dh-username>/<depl-name> .`.
            2. push image to Docker Hub `docker push <dh-username>/<depl-name>`
            3. rollout to system `kubectl rollout restart deployment <depl-name>`
         2. if K8s code `services`, `ingress`
            1. `kubectl apply -f <filename>`
3. ~~Run System With Concurrently~~
   1. Original method to launch all services & client with root level `npm start` command which uses the `concurrently` package to simultaneously executing each sub-directory's `npm start`. No longer works because the internal references to the other services used *localhost:port* in the URLs which were removed when implementing Kubernetes Cluster IP services.
   
   
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
When talking about async communication the system will still contain the existing comments/posts services but will also include a separate Query service and an even bus. The data flow in this architecture is the posts/comments work as before but when conducting data ops they emit events to an event bus which the query service subscribes to and updates it's own data store. To repeat, each service has it's own data store.

  * #### Pros
    * Query service has zero direct dependencies
    * Query service is extremely fast
  * #### Cons
    * Data duplication
    * Harder to understand, especially as features are added

## This Repo Is Not Religious
It is 100% understood here this is a contrived example which would easily be handled by a monolith. By keeping the app simple it is easier to keep a mental model of the app in order to study pros & cons of a service/event based system.