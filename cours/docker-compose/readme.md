# Docker compose

## 1. Docker compose

* Docker compose est une librairie python qui permet d'orchestrer plusieurs conteneurs a la fois a partir d'un fichier YAML.

* Docker compose permet utilise des commandes docker et donc dans un seul fichier permet de centraliser la gestion des réseaux docker et des volumes.

voici un exemple simple d'un docker-compose

```docker
version: '3'
services:
  web:
    build: .
    ports:
     - "8080:5000"
    volumes:
     - .:/code
  redis:
    image: "redis:alpine"
```

* Vous trouverez l'application python dans les [ressources](../../ressources/docker-compose/flask/docker-compose.yml).

* Voici une petite cheat sheet docker/dockercompose assez complete pour vous aider pour les commandes
[https://dockerlabs.collabnix.com/docker/cheatsheet/](https://dockerlabs.collabnix.com/docker/cheatsheet/)

* Ainsi que la documentation officielle qui est bien écrite.
[https://docs.docker.com/compose/compose-file/
](https://docs.docker.com/compose/compose-file/)

## 2. docker swarm

* Docker swarm permet d'orchestrer un cluster machines docker.

* Ceci permet de mettre des service conteneurisé en haute disponibilité.  

* Une machine sur un cluster peut avoir un des deux roles possibles: worker ou manager.
  * Les managers peuvent effectuer des actions sur le cluster tel que créer un réseau partagé sur tout le cluster ou deployer des conteneurs sur tout les noeuds.  
  * Les workers repartissent les conteneurs a tourner entre eux pour équilibrer la charge entre eux.
* Dans un swarm docker on déploie une stack a partir d'un docker-compose.yml qui peux contenir un ou plusieurs services qui sont des conteneurs individuels.
* par exemple:
une stack nommé wordpress contiendrais plusieurs services pour chaque conteneur:
  * un service wordpress
  * un service phpmyadmin
  * un service mysql

:warning: **prenez en compte que docker swarm réplique absolument tout dans un service donné donc un service exposé par des ports est exposé sur tout les noeuds et la gestion de volumes et des images de docker-compose doit être identique dans tout les noeuds.** :warning:
