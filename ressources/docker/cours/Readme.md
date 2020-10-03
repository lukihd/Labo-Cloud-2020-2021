# Cours

ceci est l'anexe de du cours sur docker.

## Définitions
* **Devops:** Une concentration de bonnes pratiques de développement logicel ainsi que d'administration d'infrastructure ayant pour but d'avoir des cycles de dévelopment plus courts ainsi qu'une haute fréquence de déploiement en livraison continue.
#
* **Virtualisation:** Consiste à faire tourner sur une machine hôte un système d'exploitation complet dans un environement isolé.
#
* **Conteneurisation:** Une forme de virtualisation qui tourne sur une application dans des environements insolés appelés containers.
#
* **Docker:** Une platforme de conteneurisation qui comporte:
  * Un moteur qui assure la gestion des conteneurs.
  * Un daemon qui assure la communication entre l'hôte et les conteneurs.
#
* **Image Docker:** Un patron pour instancier un conteneur docker. Il définit l’environement dans lequel l’application réside.
#
* **Conteneur Docker:** Une instance d'une image docker ceci est l'environement ou l'application tourne.
#
* **Dockerfile**: Un fichier Yaml qui dicte les commandes au moteur docker afin de créer une image docker.
#
* **Dockerhub:** Un dépôt d'images docker accésible sur [www.dockerhub.com](www.dockerhub.com) qui contient toutes les images officielles ainsi que le possibilitée de stocker ses propres images dessus. 

## Le Fonctionement de docker

``` mermaid 
graph LR

Host((hôte)) --> Docker
Docker -- contient  --> Engine(moteur docker)
Engine -- gère/créée --> image
image -- instancie --> container[conteneur docker]
image((image docker))


```