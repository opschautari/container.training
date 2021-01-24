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
      - "date > /tmp/date.txt && sleep 5s"
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
## Service

---
## Secrets

---
## ConfigMaps

---
## Ingress


---
## Namespace

...
