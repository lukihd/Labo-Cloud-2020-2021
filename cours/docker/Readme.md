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
    FROM centos:centos7
    ENTRYPOINT [ "/bin/sh" ]
    ```

    Créer une machine avec une machine Centos 7 qui execute un shell.

- une image est ensuite instancié pour créer un conteneur où l'application désiré tourne.
par la commande:
  - `` docker run centos:centos7 -it /bin:sh ``
Lance un Conteneur avec l'image centos 7 en interactif (rentre dans le conteneur lors du lancement) et execute un shell

:warning: tout conteneur docker s'éteint automatiquement a la fin de son éxécution donc il faut toujours que quelque chose tourne dedans.

### Navigation

les commandes docker ce divisent en 2 catégories: le moteur docker et le daemon docker.
Pour ce cours nous allons nous intéresser uniquement au moteur.

le moteur se découpe de telle façon:

- un gestionnaire d'image.
- un gestionnaire de conteneur.
- un gestionnaire de log.
- un gestionnaire de réseau.
- un gestionnaire de services.

vous trouverez toutes les commandes dans la cheat [ici](../../ressources/docker/cours/Readme.md).
