# Contenerisation et Virtualisation

## intro

### les besoin des entreprises d'avoir un service informatique soit disponible tout le temps et évolutif.

premierement on achetais plus de serveurs et remetre l'application sur le meme serveur

ensuite la Virtualisation avec VMware

permetant d'avoir plusieurs OS sur une meme machine

moins de couts et moins de perte de ressources sur chaque serveur acheté

mais c toujours cher: chaque instance c un mini pc donc il faut lui allouer un  OS de la ram, un espace de stockage etc...

ensuite viens docker: un mélange entre une platforme de dévelopment et une technologie de virtualisation

docker permet de faire tourner chaque application dans son propre environement conteneurisé

presque comme la contenerisation apart que docker est plus rapide léger et portable
puisque contraiment a la virtualisation on ne fait pas tourner un OS entier pour chaque instance


## la difference entre la virtualisation et la coneneurisation

- la virtualisation

  contient un hyperviseur

  qui est gère un des OS

  qui contienent une application


- la conteneurisation

  contient un moteur de conteneurisation (docker ici)

  qui gère des conteneurs (un conteneur c'est un environement ou ton application tourne)

  qui contienent une application


comme on le voit on saute la partie OS/ kernel

donc docker permet de tourner beaucoup plus rapidement et est beaucoup plus léger. de plus chaque conteneur tourne sur une platforme (docker) donc elle facilement portable assurant que ton application tourne de la meme façon qu'importe sur quelle machine il tourne

## Docker

### comment marche Docker

docker comme dit précedament on a pas d'hyperviseur on a quelque chose qui s'appel le docker daemon qui le remplace

le docker daemon va gérer des instance de docker image (imaginez ça comme le daemon ssh
il gère les instances ssh)

une docker image c'est un patron qui contiendra ton environement (node python c java) ou reposera ton application

on pourra trouver ceci sur dockerhub

(point sur dockerhub)

l'image docker sera ensuite utilisé pour créer un conteneur docker

le conteneur docker est une instance de l'image docker avec l'application dedans

### le Dockerfile

le dockerfile est un fichier YAML de configuration pour une image docker
il doit contenir au minimum un ``FROM`` et un ``CMD``


- FROM est un point de départ généralement trouvé sur dockerhub par example: ubuntu debian centos mais aussi un envrironement plus avancé tel que mysql node java python ect...

- CMD est la commande a executer lorsque l'on fait tourner notre image dans un conteneur


## les Commandes Docker

biensur docker est bien plus puissant que ça.

le Daemon docker gère la communiquation entre les conteneurs et l'os mais aussi la la communication




