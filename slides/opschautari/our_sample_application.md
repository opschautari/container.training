# Our sample application

- there is this sample application called [example-voting](https://github.com/dockersamples/example-voting-app/blob/master/architecture.png) 

- This is the app we are going to run as docker-container with docker-compose and then learn to deploy them to kubernetes 

- For ease, you could create account on [play-with-docker](https://labs.play-with-docker.com/) where you get some hours of sandbox instance to try these quick.

.exercise[

- Clone the repository:
  ```bash
  git clone https://github.com/opschautari/example-voting-app
  ```

]

(You can also fork the repository on GitHub and clone your fork if you prefer that.)

---

## Downloading and running the application

Let's start this before we look around, as downloading will take a little time...

.exercise[

- Use Compose to build and run all containers:
  ```bash
  cd example-voting-app
  docker-compose up
  ```
]

Compose tells Docker to build all container images (pulling
the corresponding base images), then starts all containers,
and displays aggregated logs.

---

## What's this application?

--
class: pic
![Architecture diagram](https://raw.githubusercontent.com/dockersamples/example-voting-app/master/architecture.png)
--
---
## How this app works:

  - It is a simple voting application .emoji[❎🐳📦🚢]
  - A front-end web app in [python](https://github.com/dockersamples/example-voting-app/tree/master/vote) or [ASP.NET Core](https://github.com/dockersamples/example-voting-app/tree/master/vote/dotnet) which lets you vote between two options
  - A [Redis](https://hub.docker.com/_/redis/) or [NATS](https://hub.docker.com/_/nats/) queue which collects new votes
  - A [.NET Core](https://github.com/dockersamples/example-voting-app/tree/master/worker/src/Worker), [Java](https://github.com/dockersamples/example-voting-app/tree/master/worker/src/main) or [.NET Core 2.1](https://github.com/dockersamples/example-voting-app/tree/master/worker/dotnet) worker which consumes votes and stores them in…
  - A [Postgres](https://hub.docker.com/_/postgres/) or [TiDB](https://hub.docker.com/r/dockersamples/tidb/tags/) database backed by a Docker volume
  - A [Node.js](https://github.com/dockersamples/example-voting-app/tree/master/result) or [ASP.NET Core SignalR](https://github.com/dockersamples/example-voting-app/tree/master/result/dotnet) webapp which shows the results of the voting in real time

*(This app just shows us examples on using containers with different services in different language stack)*

---

## Service discovery in container-land

How does each service find out the address of the other ones?

--

- We do not hard-code IP addresses in the code

- We do not hard-code FQDNs in the code, either

- We just connect to a service name, and container-magic does the rest

  (And by container-magic, we mean "a crafty, dynamic, embedded DNS server")

---

## Example in `vote/app.py`

```python
def get_redis():
    if not hasattr(g, 'redis'):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis
```

(Full source code available [here](
https://github.com/dockersamples/example-voting-app/blob/7bbb599a4b35c91cb92ea53aa5488da4c40fe8cc/vote/app.py#L14-L17
))

---
## Compose file format version

*This is relevant only if you have used Compose before 2016...*

- Compose 1.6 introduced support for a new Compose file format (aka "v2")

- Services are no longer at the top level, but under a `services` section

- There has to be a `version` key at the top level, with value `"2"` (as a string, not an integer)

- Containers are placed on a dedicated network, making links unnecessary

- There are other minor differences, but upgrade is easy and straightforward

---

## Our application at work

- On the left-hand side, the "rainbow strip" shows the container names

- On the right-hand side, we see the output of our containers

---

## Connecting to the web UI

- "Logs are exciting and fun!" (No-one, ever)

- The `webui` container exposes a web dashboard; let's view it

.exercise[

- With a web browser, connect to `node1` on port 5000

- Remember: the `nodeX` aliases are valid only on the nodes themselves

- In your browser, you need to enter the IP address of your node

<!-- ```open http://node1:8000``` -->

]

---

class: self-paced, extra-details

## Stopping the application

- If we interrupt Compose (with `^C`), it will politely ask the Docker Engine to stop the app

- The Docker Engine will send a `TERM` signal to the containers

- If the containers do not exit in a timely manner, the Engine sends a `KILL` signal

.exercise[

- Stop the application by hitting `^C`

<!--
```key ^C```
-->

]

--

Some containers exit immediately, others take longer.

The containers that do not handle `SIGTERM` end up being killed after a 10s timeout. If we are very impatient, we can hit `^C` a second time!
