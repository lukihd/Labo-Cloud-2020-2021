# Cours

ceci est l'annexe du cours sur docker.

# Table of Contents

- [Cours](#cours)
- [Table of Contents](#table-of-contents)
  - [Définitions](#définitions)
  - [Le Fonctionnement de docker](#le-fonctionnement-de-docker)
    - [lancement](#lancement)
    - [Navigation](#navigation)

## Définitions

- **Devops:** Une concentration de bonnes pratiques de développement logiciel ainsi que d'administration d'infrastructure ayant pour but d'avoir des cycles de dévelopment plus courts ainsi qu'une haute fréquence de déploiement en livraison continue.

- **Virtualisation:** Consiste à faire tourner sur une machine hôte un système d'exploitation complet dans un environnement isolé.

- **Conteneurisation:** Une forme de virtualisation qui tourne sur une application dans des environnements insolés appelés containers.

- **Docker:** Une plateforme de conteneurisation qui comporte:
  - Un moteur qui assure la gestion des conteneurs.
  - Un daemon qui assure la communication entre l'hôte et les conteneurs.

- **Image Docker:** Un patron pour instancier un conteneur docker. Il définit l’environnement dans lequel l’application réside.

- **Conteneur Docker:** Une instance d'une image docker ceci est l'environnement ou l'application tourne.

- **Dockerfile**: Un fichier Yaml qui dicte les commandes au moteur docker afin de créer une image docker.

- **Dockerhub:** Un dépôt d'images docker accessible sur [www.dockerhub.com](www.dockerhub.com) qui contient toutes les images officielles ainsi que la possibilités de stocker ses propres images dessus.

## Le Fonctionnement de docker

### lancement

- Docker créer une image qui se rapporte a un patron qui définit l'environnement.
par exemple le dockerfile:

  - ```dockerfile
    # tirer l'image docker de base tiré de dockerhub
    FROM python:3.6.12-alpine3.12
    # exposer le port 8888 a docker
    EXPOSE 8888
    # spécifier chemin dans lequel les instructions suivantes seront exécutées
    WORKDIR /python-app
    # copier les fichier de l'application python dans ./app dans /python-app
    COPY ./app /python-app
    # exécuter la commande pip install flask
    RUN pip install flask
    # lancer la commande "python"
    ENTRYPOINT  ["python"]
    # spécifier l'argument du entrypoint donc start de la commande python
    CMD [ "app.py"]
    ```

- l'image avec notre environnement est créé avec la commande ``docker build . -t labocloud20202021:python``

- Ensuite a partir de l'image on instancie un conteneur où l'application tourne.
par la commande:
  - ``docker run --rm -d --name flask -p 8080:8888 labocloud20202021:python``
Qui lance un Conteneur nommé flask avec notre application web en détaché avec le port 8888 de notre conteneur relié au port 8080 de notre hôte qui se s'auto-détruira lors de sa fermeture.

:warning: tout conteneur docker s'éteint automatiquement a la fin de son éxécution donc il faut toujours que quelque chose tourne dedans.

### Navigation

les commandes docker ce divisent en 2 catégories: le moteur docker et le daemon docker.
Pour ce cours nous allons nous intéresser uniquement au moteur.

le moteur se découpe de telle façon:

- un gestionnaire d'image.
- un gestionnaire de conteneur.
- un gestionnaire de réseau.
- un gestionnaire de services.

vous trouverez toutes les commandes dans la cheat [ici](../../ressources/docker/cours/Readme.md).
