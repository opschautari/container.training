# Pre-requirements

- Be comfortable with the UNIX command line

  - navigating directories

  - editing yaml files

  - a little bit of bash-fu (environment variables, loops)

- Some Container/Docker knowledge

  - `docker run`, `docker ps`, `docker build`

  - ideally, you know how to write a Dockerfile and build it
    <br/>
    (even if it's a `FROM` line and a couple of `RUN` commands)

- It's totally OK if you are not a Docker expert!!

---
## Dockerfile

```json
FROM nginx
ENV AUTHOR=Docker

WORKDIR /usr/share/nginx/html
COPY Hello_docker.html /usr/share/nginx/html

CMD cd /usr/share/nginx/html && sed -e s/Docker/"$AUTHOR"/ Hello_docker.html > index.html ; nginx -g 'daemon off;'

```
src: https://github.com/docker/labs/blob/master/beginner/static-site/Dockerfile
---

class: title

*Tell me and I forget.*
<br/>
*Teach me and I remember.*
<br/>
*Involve me and I learn.*

Misattributed to Benjamin Franklin

[(Probably inspired by Chinese Confucian philosopher Xunzi)](https://www.barrypopik.com/index.php/new_york_city/entry/tell_me_and_i_forget_teach_me_and_i_may_remember_involve_me_and_i_will_lear/)

---

## Hands-on sections

- We are trying to be hands-on more to theory on k8s 

- We are going to build, ship, and run containers!

- You are invited to reproduce all the demos

- All hands-on sections are clearly identified, like the gray rectangle below

.exercise[

- This is the stuff you're supposed to do!

<!-- - Go to @@SLIDES@@ to view these slides -->

<!-- ```open @@SLIDES@@``` -->

]

---

class: in-person

## Where are we going to run our containers?

---

class: in-person, pic

![You get a cluster](images/you-get-a-cluster.jpg)

---

class: in-person

## You get a cluster of cloud VMs

- We would start with k8s deployed on place like civo.com 

- You could use my referral code: https://www.civo.com/?ref=8c6deb for easy ;) 

- We would jump around different good resources on internet, like [katakoda](https://www.katacoda.com/courses/kubernetes), [okteto](https://okteto.com/), play-with-docker, [play-with-kubernetes](https://labs.play-with-k8s.com/)

- In civo, though we can't ssh to servers, they provide k8s plane close to cluster we get on managed services 

---
## Credits

 - These course material is forked from [container.training](https://github.com/jpetazzo/container.training)
 - As it is best resource out there
 - We have made adjustments on it for our need
 - Super thankful for [Jérôme Petazzoni](https://github.com/jpetazzo) and team
 - Original materials are published here: https://container.training 
