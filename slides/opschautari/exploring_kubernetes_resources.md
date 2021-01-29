# Exploring Kubernetes Resources

---
## PODS

--
class: pic
![In real world](https://i.imgur.com/uld0kOl.png)

---
## PODS

- building blocks/units of what moves around in k8s world

- pods holds one or more containers and volumes, co-scheduled

- containers run in shared contexts: namespaces, cgroups

- ref: https://kubernetes.io/docs/concepts/workloads/pods/
- yes, multiple containers live in a pod like in a pea pods
- relatively tightly coupled containers

---
## PODS

- lets create our first pod with yaml file, shall we ?

.exercise[
  - deploying pod that greets you welcome, easy way obviously ;)
  ```bash
  kubectl run busybox --image=busybox  \
    --dry-run=client -o yaml \
    -- sh -c 'echo hello there, sup && sleep 300s' > pod.yml
  ```
  - lets take some time to sneak-peak inside that yaml file
  - please save it to file first and run with `kubectl apply -f pod.yml`
]

---
## PODS
  - ref: https://kubernetes.io/docs/concepts/workloads/pods/
  - not to be confused with container and pods
  - pod is is not a process, but an environment to run containers
  - pod is scheduled to run in nodes
  ```quote
  pods are generally created/managed by controllers, what does that mean ?
  ```
---
## Revision
  - controllers ??
    - control loop that watches the shared state of the cluster through the apiserver
    - and makes changes attempting to move the current state towards the desired state.
  - pod
    - smallest building block of k8s
    - one or many containers running with shared context{volume,network}
    - 1c in 1pod, many in 1 pod
  - namespace

---
## Assignment#2

- Create a pod with yaml file with following specification:
  - labels: { app=frontend, version=10 }
  - first container:
    - use image busybox and run this command
      - "while true do; date > /tmp/date.txt && sleep 5s; done"
  - second container:
    - use image nginx
    - nginx should render /tmp/date.txt output
    - you can use alternative path: /usr/share/nginx/html/index.html

- Guideline: in case if you are confused.
  - create individual containers first
  - pod-busybox.yml and pod-nginx.yml
  - combine the yml file
  - kubectl apply -f combined.yml

---
## Labels
  - [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) are arbitrary key/value pairs attached to objects{like pods, deployments,...}
  - they enable users to map their own organizational structures onto the k8s system objects
  - like tags on goats at [Manakamana Cable Car](https://en.wikipedia.org/wiki/Manakamana_Cable_Car)

--

  - Common examples:
   ```
   "release" : "stable", "release" : "canary"
   "environment" : "dev", "environment" : "qa", "environment" : "production"
   "tier" : "frontend", "tier" : "backend", "tier" : "cache"
   "partition" : "customerA", "partition" : "customerB"
   "track" : "daily", "track" : "weekly"
   ```
---
## Labels

  - Lets create a busybox pod with custom labels:
    - name: webserver
    - env: production
  - and verify labels are there with `kubectl describe...`

--

.exercise[
```bash
  # let try easy lazy way to create our pod
  kubectl run busybox --image=busybox \
    --labels="name=webserver,env=production" \
    -o yaml --dry-run=client \
    -- sh -c "while true; do echo $date hello there; sleep 2s; done"> busybox-pod.yml

  # do your changes on busybox-pod.yml
  kubectl apply -f busybox-pod.yml

  # describe your pod
  kubectl describe -f busybox-pod.yml
```
]

---
## Lables | Selector
    - using selector defined earlier, lets check logs on that pod

---
## ReplicaSets

- This k8s workload resource  ensure desired number of pods is running as specified

- Internally it uses [ReplicaSetController](https://github.com/kubernetes/kubernetes/blob/a04b6e4b1671810ede5b8cacf4527741781d6fb9/pkg/controller/replicaset/replica_set.go#L77) which is responsible for synchronizing ReplicaSet objects stored in system with actual running pods

--

  ??? well that is mouth full :D what does it mean ???


---
## Deployment
  - [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) is a higher-level concept that manages ReplicaSets

  - provides declarative updates to Pods along with -

--
  - a lot of other useful features:
    - change the actual state to desired state at controlled rate
    - pause/unpause new rollouts
    - rollback to earlier revisions
    - check rollout status
    - scale up/down pods

--

  - Deployment encapsulates everything we learned so far about pods and replicaSets

---

## Deployment
  - Create a deployment nginx with 3 pods and image=1.18.0-alpine
  - update the deployment to new version: `1.19.6-alpine`

--

.exercise[
```bash
  # use declarative command
  kubectl create deployent nginx --image=nginx:1.18.0-alpine

  # describe the deployment
  kubectl describe deploy/nginx

  # edit the deployment
  kubectl edit deploy/nginx

  #find in spec section, image and modify the line and save and exit the file
  kubectl rollout status deploy/nginx
```
]

---
## Revision
    - Pod -> ReplicaSet -> Deployment
    - ReplicaSet : which ensure replica matches to desired value
    - Deployment : which uses RS with declarative ways of managing lifecycle of pods
    - Labels/Selectors: arbitrary `key: value` pairs that helps select k8s resources, like filter

    - lets see it in animation: https://k8s101.netlify.app/slides/kube-selfpaced.yml.html#229

    - Assignment#2 | Solution

---
## Service
   - Its an abstraction which ensures your request lands on correct pods

   - Pods life is fragile, they come and go, that means:
     - if my application is composed of multiple internal small apps
     - small apps working together with each others help (like micro-services)
     - there must be a way they resolve each others address and ports

--

   - Service is what makes it possible
   - To begin with, service is yet another k8s resource which routes traffic to right sets of pod
--
   - well not always though, there are other types of service, we will talk briefly in moment.

---
### Service | [Example](https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service)
   ```yaml
   apiVersion: v1
   kind: Service

   metadata:
     name: my-service

   spec:
     selector:
       app: my-app               # select pods with label {app: my-app}
     ports:
      - protocol: TCP
        port: 80                 # service listens on this port
        targetPort: 1234         # container port to forward request to
   ```

--

   This specification creates a new Service object named "my-service", which targets TCP port 1234 on any Pod with the app=MyApp label.
---

## Secrets
  - Secret is k8s resource that allows us to:

    - save credentials, environment variables
    - later to be used it inside pods as environment variable
    - or as files with volume mount, *there is options in yaml we will explore later*

--

.exercise[
```bash
    #lets create our secrets :D,
    kubectl create secret generic my-secret \
       --from-literal=key1=supersecret --from-literal=key2=topsecret
    #also try with --dry-run=client -o yaml

    #if you want to create it from your existing env file
    kubectl create secret generic my-secret --from-env-file=path/to/bar.env

    #and if you are curious or lost
    kubectl create secrets --help
```
]

---
## ConfigMaps
   Similar concept to the **secrets** but it more of used for config file like nginx.conf

.exercise[
```bash
   #create config map
   curl -sL https://git.io/Jt80f  > /tmp/site.conf
   kubectl create cm nginx-config --from-file=/tmp/site.conf -o yaml --dry-run=client

   #lets see it in action, will ya ?
   kubectl create cm nginx-config --from-file=/tmp/site.conf
   kubectl apply -f https://git.io/Jt8uz

   #see it in action
   kubectl port-forward nginx-config 8080:80
   #visit your browser
   http://localhost:8080/google/kubernetes
```
]

---
## Ingress


---
## Namespace

...
