# TP1 Une introduction a Docker

Ce TP a pour but de prendre en main l'outil docker, sans rentrer dans les détails de son implémentation ou de son écosystème.

L'objectif est de vous fammiliariser avec Docker et et les Dockerfiles sans trop rentrer dans les détails.




- [TP1 Une introduction a Docker](#tp1-une-introduction-a-docker)
- [I. Prise en Main de Docker](#i-prise-en-main-de-docker)
  - [lancer votre premier conteneur docker:](#lancer-votre-premier-conteneur-docker)
  - [Prendre en main les commandes Docker](#prendre-en-main-les-commandes-docker)
- [II. Prise en Main du Dockerfile](#ii-prise-en-main-du-dockerfile)
- [III. faire communiquer des containeurs entre eux](#iii-faire-communiquer-des-containeurs-entre-eux)

le rendu sera sous forme d'un ficher .md ou vous remplirez les instructions pour chaque :triangular_flag_on_post: 

:warning: Si vous avez du mal n'hesitez pas a consulter la cheatcheat du cours et [l'example presenté en cours](../../ressources/docker/cours). :warning:

# I. Prise en Main de Docker

## lancer votre premier conteneur docker:

* Sur dockerhub téléchargez l'image docker ``tumtum/hello-world``.

* faites tourner l'image dans un conteneur docker helloworld avec le port 80 exposé. (lisez la doc sur dockerhub)

* :triangular_flag_on_post: prennez une capture d'écran de la page web tumtum hello-world sur ``127.0.0.1``

## Prendre en main les commandes Docker

* lancez un conteneur que vous nommerez hello-world avec l'image ``tumtum/hello-world`` en détataché.

* :triangular_flag_on_post: affichez la liste des images docker sur votre hôte.

* :triangular_flag_on_post: affichez la liste des conteneurs.

* attachez un shell au conteneur.

* :triangular_flag_on_post: affichez tou les fichers dans ``/www``.

* :triangular_flag_on_post: arretez le conteneur.

* :triangular_flag_on_post: affichez la liste des conteneurs docker avec leurs status.

* :triangular_flag_on_post: supprimez le conteneur nommé hello-world.

# II. Prise en Main du Dockerfile

vous allez conteneriser votre premiere application web.

* faites un pull de l'image ``node:14.7-alpine3.12``.

* créez un dockerfile a partir de l'image node qui:
  * expose le port 3000 du conteneur.
  * copie l'application node [trouvée ici](../../ressources/docker/tp/app) dans /app.
  * lance la commande ``npm install`` dans /app.
  * et lance la commande ``npm start`` dans /app.

* :triangular_flag_on_post: faites un build du dockerfile et donnez un tag a l'image.

* lancez un conteneur avec avec l'image que vous avez crée en redirigeant le port 3000 exposé du conteneur vers le port 80 de votre hôte.

* :triangular_flag_on_post: faites une capture d'écran de la la page web qui tourne sur 127.0.0.1 avec l'url inclus.

# III. faire communiquer des containeurs entre eux

* créez une image mysql ou mariadb nommé ``mysql-container`` qui contient:
  * une base de données nommée ``mysqldb``.
  * un utilisateur nommé ``user`` avec pour mot de passe ``password``.

* lancez un conteneur node avec l'application node.js crée précedament.

* lancez le conteneur mysql crée précedament.

* trouvez une façon pour faire communiquer les deux conteneurs entre eux.
  * naviguez sur la page /bonus de l'application web pour vérifier la connection.


* :triangular_flag_on_post: faites une capture d'écran de la page /bonus de l'application web node avec son id de connection à la base de données.


* :bulb: vous trouverez tout les outils pour faire communiquer les conteneur [ici](https://docs.docker.com/engine/reference/commandline/run/#connect-a-container-to-a-network---network) pensez que c'est un probleme de réseau. :wink: