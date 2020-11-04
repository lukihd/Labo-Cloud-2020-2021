# TP2 Docker compose et Docker swarm

Ce tp a pour but de prendre en main docker compose et une breve introduction a docker swarm.

Le rendu sera sous forme d'un ficher .md ou vous remplirez les instructions pour chaque :triangular_flag_on_post:.

- [TP2 Docker compose et Docker swarm](#tp2-docker-compose-et-docker-swarm)
  - [1. Docker compose](#1-docker-compose)
    - [Dockerhub](#dockerhub)
    - [Un premier docker compose](#un-premier-docker-compose)
    - [Un cas pratique](#un-cas-pratique)
  - [2. Docker swarm](#2-docker-swarm)
    - [Prérequis](#prérequis)
    - [initialisation du swarm](#initialisation-du-swarm)
    - [Une première application orchestrée](#une-première-application-orchestrée)
    - [Centraliser l'accès au service](#centraliser-laccès-au-service)

## 1. Docker compose

### Dockerhub

- Connectez vous ou inscrivez vous sur dockerhub.
- a l'aide de la commande ``docker push`` téléchargez une image de votre l'application nodejs du tp1.
- :triangular_flag_on_post: faites une capture d'écran de votre dockerhub avec l'image

### Un premier docker compose

- Faites un docker compose qui contient:
  - l'application nodejs du tp1
  - mariadb avec le volume du tp1 monté correctement
- :bulb: Pensez a regarder dans la doc les options ``volume`` ``links`` ``networks`` et ``image``.
- :bulb: regardez aussi les options ``build`` ou ``command`` et ``environment`` pour une autre façon de le faire.
- :triangular_flag_on_post: montrez et expliquez le docker-compose.yml crée

### Un cas pratique

- Mettez en place un environnement de development wordpress.
- pour faire ceci votre docker compose doit contenir:
  - un service mysql avec un volume qui copie tout ce qu'il y'a dans ``/var/lib/mysql`` vers l'hôte dans un dossier nommé db
  - un service wordpress avec un volume qui copie tout ce qu'il y'a dans ``var/www/html`` vers l'hôte dans un dossier nommé wordpress et ne doit pas se lancer avant mysql
  - un service phpmyadmin avec un volume qui copie tout ce qu'il y'a dans ``/etc/phpmyadmin`` vers l'hôte dans un dossier nommé phpmyadmin et ne doit pas se lancer avant mysql
  - le tout dans un réseau nommé wordpress
- :bulb: lisez attentivement la doc sur dockerhub pour chaque image
- :bulb: aucun build n'est requis pour cette partie
- :bulb: pour s'assurer que un service ne lance pas avant un autre regardez l'option ``depends_on``
- :bulb: consultez la cheat sheet et la doc dans le cours
- :triangular_flag_on_post: montrez et expliquez le docker compose
- :triangular_flag_on_post: faites une capture d'écran du wordpress
- :triangular_flag_on_post: faites une capture d'écran du phpmyadmin
- :triangular_flag_on_post: faites une capture d'écran du contenu des dossiers db phpmyadmin et wordpress sur votre hôte.

## 2. Docker swarm

### Prérequis

- Pour la deuxième partie du TP, il vous faudra 3 vm's linux avec:
  - une carte NAT
  - une carte host only en ip statique
  - le parefeu déactivé ``systemctl stop firewalld``
  - SElinux déactivé ``sudo setenforce 0``
  - docker installé
  - docker compose installé

:exclamation: pour le reste du tp chaque machine sera nommée m1 m2 m3

### initialisation du swarm

- Mettez en place votre cluster.

```markdown
# Sur m1
docker swarm init --advertise-addr <LAN_IP>

# Obtenir un token pour ajouter des workers au cluster
docker swarm join-token worker

# Obtenir un token pour ajouter des managerss au cluster
docker swarm join-token manager

# Sur m2 et m3
docker swarm join ... # réutiliser la commande obtenue avec le 'join-token'
```

- Avec la commande ``docker node ls`` nous pouvons voir quelles machines sont connecté au cluster.
- :triangular_flag_on_post: affichez tout les noeuds du cluster

### Une première application orchestrée

- toute application orchestrée utilise un docker-compose.yml avec ``docker stack deploy -c /path/to/docker-compose.yml stack_name``

- pour avoir une info sur une stack:

```markdown
# Liste les stacks
docker stack ls

# Liste les services d'une stack
docker stack services <STACK_NAME>

# Récupère les logs d'un service
docker service logs <SERVICE_NAME>

# Récupère des infos sur un service
docker service ps <SERVICE_NAME>

```

- récupérez l'application python utilisé dans le cours [ici](../../ressources/docker-compose/flask/docker-compose.yml) avec tout les fichiers dans cette arborescence
- buildez une image du dockerfile et téléchargez le sur dockerhub
- **faites un docker pull de l'image sur tout les noeuds du cluster**
- rédigez un docker-compose qui ressemble a ceci:

  ```YAML
  version: '3'
  services:
    web:
      image: <ID_dockerhub/votre_image:tag>
      ports:
      - "8080:5000"
    redis:
      image: "redis:alpine"
  ```

- déployez l'application python sur le cluster
- :triangular_flag_on_post: faites un curl vers l'application depuis tout les noeuds
- :triangular_flag_on_post: listez les stacks
- :triangular_flag_on_post: listez les services du stack ou repose l'application python
- :triangular_flag_on_post: récupérez des infos sur le service web
- utilisez la commande ``docker service scale`` afin d'augmenter le nombre de services web.
- :triangular_flag_on_post: listez les servies du stack

### Centraliser l'accès au service

Nous allons mettre en place un reverse proxy dynamique [Traefik](https://traefik.io/traefik/) qui s'intègre nativement avec Swarm.
Il est capable de détecter des applications qui sont créées dans le Swarm, et de modifier automatiquement sa configuration afin de les servir.

- sur m1 créez un réseau qui scope le swarm avec ``docker network create --driver overlay traefik``
- créez une stack avec ce docker-compose.yml:

```YAML
version: '3'

services:
  reverse-proxy:
    image: traefik:v2.1.3
    command:
      - "--providers.docker.endpoint=unix:///var/run/docker.sock"
      - "--providers.docker.swarmMode=true"
      - "--providers.docker.exposedbydefault=false"
      - "--providers.docker.network=traefik"
      - "--entrypoints.web.address=:80"
      - "--api.dashboard=true"
      - "--api.insecure=true"
    ports:
      - 8080:8080
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - traefik
    deploy:
      placement:
        constraints:
          - node.role == manager

networks:
  traefik:
    external: true
```

- :triangular_flag_on_post: faites une capture d'écran du dashboard traefik sur ``http://<IP_VM>:8080/dashboard``
- réutilisez encore le docker.compose.yml de l'app Python
- positionnez ces labels dans le docker-compose.yml afin que Traefik détecte l'application

```yaml
    deploy:
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.webapp.rule=Host(`webapp`)"
        - "traefik.http.routers.webapp.entrypoints=web"
        - "traefik.http.services.webapp.loadbalancer.server.port=3000"
```

- **enlevez le partage de ports que vous aviez mis**

- déployez la nouvelle stack python
- :triangular_flag_on_post: faites une capture d'écran de l'application python dans le dashboard traefik
