# Kubernetes first contact 

- In this section we explore different ways to explore kubernetes resource.

- Configure our machines so we could talk to kubernetes

- Quick deploy some apps and browse it ;)

---

## Kubernetes | Client

- Talking is kubernetes is just like:

   - sending HTTP request to the kubernetes apiserver

   - query or update some resources stored on etcd
  
--

- and we use the clients:

   - official client is `kubectl`

   - options: there are other awesome cli tools like: [k9s](https://k9scli.io/)

   - or gui: [kubernetes-dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/), [k8slens](https://k8slens.dev/)

---
## kubectl this || kubectl that...

- Installing:
  - straight forward 
  - ref: https://kubernetes.io/docs/tasks/tools/install-kubectl/ 
  
.exercise[
- grab the binary from upstream release  
```bash
VERSION=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)
curl -LO "https://storage.googleapis.com/kubernetes-release/release/${VERSION}/bin/linux/amd64/kubectl"
```
- copy it to system path && make it executable 
```bash
install -m 755 kubectl -t /usr/local/bin/
```
- see it working
```bash
kubectl version
```
]

---
## kubectl this || kubectl that...

you might see a msg with client version info:
```json
Client Version: version.Info{Major:"1", Minor:"20", GitVersion:"v1.20.2", GitCommit:"faecb196815e248d3ecfb03c680a4507229c2a56", GitTreeState:"clean", BuildDate:"2021-01-13T13:28:09Z", GoVersion:"go1.15.5", Compiler:"gc", Platform:"linux/amd64"}
The connection to the server localhost:8080 was refused -
...did you specify the right host or port?
```

No need of worry its okay, that is kubectl telling you, it can't find k8s server, its because we haven't put config file yet !! 

--

🎊 cheers, kubectl is installed 🎊 lets move to configuration part.

---
## kubectl this || kubectl that...
- Configuring:

  - telling kubectl where your server(s) is/are located
  - how to authenticate to k8s api(s)
--

- Sample skeleton: 

```yaml
apiVersion: v1
kind: Config

clusters: [...]  # cluster{ ca-auth-data:xxx, server:url }, name:blah 
users:    [...]  # user{exec:...|| username,password || token}, name:johndoe
contexts: [...]  # context{ cluster:blah, namespace:xxx, user:yyy }, name:zzz
...
```

--
🗒 If you are using civo, download the Kubeconfig file from the dashboard and save it as `~/.kube/config`


