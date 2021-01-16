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
## ReplicaSets 

---
## Deployment

---
## Service

---
## Secrets

---
## ConfigMaps

---
## Ingress

---
## Labels / Annotations

---
## Namespace

...
