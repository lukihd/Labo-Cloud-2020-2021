# Docker cheat sheet

## quick start

- télécharger une image
``docker image pull alpine:3.12.0``

- créer une image:
``docker build -t alpine:3.12.0 .``

- lancer un conteneur:
``docker container run --name web -p 5000:80 alpine:3.12.0 <``
- éteindre un conteneur:
``docker container kill web``

afficher les conteneurs qui tournent
``docker ps``

## image

- télécharger une image: ``docker pull [nom de l'image sur dockerhub]``

- créer une image: `` docker image build [OPTIONS] PATH ``
:boom: ``.`` en tant que PATH prend le fichier nommé dockerfile

- renommer une image ``docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]``

- afficher les images ``docker image ls``

- supprimer une image ``docker image prune``

### options

- ajouter un tag``--tag , -t``

## conteneur

- lancer un conteneur ``docker container run [OPTIONS] IMAGE``

- arrêter un conteneur ``docker container kill CONTAINER``

- afficher les conteneurs ``docker container ls | docker ps``

- renommer un conteneur ``docker rename CONTAINER NEW_NAME``

- afficher les logs d'un conteneur ``docker logs CONTAINER``

- supprimer les conteneurs éteints ``docker container prune``

### options

- Voir se qu'il se passe dans le contneneur ``-it``

- lancer en détaché (libérer le terminal) ``d``

- nommer le conteneur ``--name``

- Relier un port du conteneur à l'hôte ``-p HostPort:ContainerPort``

## documentation officielle

- [docker image](https://docs.docker.com/engine/reference/commandline/image/)

- [docker container](https://docs.docker.com/engine/reference/commandline/container/)

- [docker volumes](https://docs.docker.com/storage/volumes/)

- [docker network](https://docs.docker.com/network/network-tutorial-host/)