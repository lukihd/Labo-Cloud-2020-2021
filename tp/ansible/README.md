# TP 3 : Ansible

## Objectif

Prendre en main Ansible tout en préparant les machines du prochains cours sur Kubernetes.
Durant ce TP vous devrez configurer des machines virtuelles selon des directives, installer des applicatifs sur un ou plusieurs groupe de machines ainsi que tester le fonctionnement. Vous serez confrontés à l'installation d'un applicatif que vous ne connaissez peut être pas : Kubernetes. N'hésitez pas à vous aider de la documentation officielle de Kubernetes pour une installation avec Ansible. Toutefois vous devrez justifier chaque action effectués par Ansible donc pas de bête copié collé.

Je vous laisse libre cours sur la gestion de vos tasks mais n'oubliez pas qu'une task = une action.
Pour rappel un petit example : 
- task : installation et configuration de Mysql
- task : création d'un utilisateur
- task : mise à jour du système

## Configuration de l'environement

### Control Node

En vous aidans du cours et de la documentation Ansible, vous installerez Ansible sur votre Control Node. Pour rappel cette machine est de préférence Unix. Si vous décidez d'utiliser Ansible sur Windows vous devrez l'installer sur WSL.
Vous pouvez installer Ansible sur une VM minimale Ubuntu, RHEL et autre et piloter en SSH.
Vous aurez aussi besoin d'un Hyperviseur (virtualbox, vmware, qemu ...), openssh et python3 sur votre machine.
Vous devez avoir une paire de clés SSH sur votre machine.
Si vous le souhaitez vous pouvez utiliser Ansible dans un virtual environment. Cette technique permet d'éiter la corruption de vos librairie python. 

### Managed Node

Pour faire ce TP vous aurez besoin des machines suivantes :

- node master
  - 2gb de ram minimum (4gb conseillé)
  - 2 coeur
  - 20gb de disque
  - Réseau privé : 10.0.0.2
  - NAT
- node worker 1
  - 2gb de ram minimum
  - 1 coeur
  - 20gb de disque
  - Réseau privé : 10.0.0.3
  - NAT
- node worker 2
  - 2gb de ram minimum
  - 1 coeur
  - 20gb de disque
  - Réseau privé : 10.0.0.4
  - NAT

Chaque machine doit avoir les paquets :
- python 3
- openssh

Les machines doivent être accessible seulement en SSH par paire de clés RSA. Vous devez donc configurer sshd pour spécifier que les mots de passes ne sont plus acceptés et ne laisser passer que les clés connues. Pour cela allez faire un tour sur la documentation de sshd.

### Arborescence de fichier

Ansible recommande l'utilisation d'une arborescence de fichier particulière comme vu dans le cours. Ici votre arborescence devra comprendre quatres roles :

- common
- docker
- kubernetes master
- kubernetes worker

Donc votre arborecense devra être similaire à celle-ci :

```
# fichier inventory
inventory.ini/yaml 

# playbook principal initialisant les roles
main.yml     

# dossiers de variables si besoin
group_vars/
   group1                 
   group2                 
host_vars/
   hostname1              
   hostname2                          

roles/
  common/              
    # tasks du role
    tasks/            
      main.yml      
    # fichiers utilisés par le role      
    files/            
      bar.txt       
      foo.sh  
    # variables associés au role      
    vars/             
      main.yml
    playbook-common.yml
  docker/              
    # tasks du role
    tasks/            
      main.yml      
    # fichiers utilisés par le role      
    files/            
      bar.txt       
      foo.sh  
    # variables associés au role      
    vars/             
      main.yml
    playbook-docker.yml
  kubernetes_master/              
    # tasks du role
    tasks/            
      main.yml      
    # fichiers utilisés par le role      
    files/            
      bar.txt       
      foo.sh  
    # variables associés au role      
    vars/             
      main.yml
    playbook-master.yml
  kubernetes_worker/              
    # tasks du role
    tasks/            
      main.yml      
    # fichiers utilisés par le role      
    files/            
      bar.txt       
      foo.sh  
    # variables associés au role      
    vars/             
      main.yml
    playbook-worker.yml
       
```

## Inventory

Dans un premier temps vous devrez mettre en place un fichier inventory en INI ou YAML comme vous le souhaitez.

Le fichier inventory doit contenir :
- Un groupe worker contenant l'ip et le nom d'hote des nodes workers
- Un groupe master contenant l'ip et le nom d'hote du node master


## Role common

Dans le role common vous devrez exécuter des actions généralistes comme mettre à jour la machine ou encore vérifier de leur accès en réseau.

Une fois l'inventory créé, vous devez :
- Exécuter le module ping avec la ligne de commande Ansible.

Puis dans le role common :
- Mettre à jour les dépots de la machines avec le module `apt`.
- Installer les paquets suivant permettant à apt d'être utilisés par de l'HTTPS.
> ```
>apt-transport-https
>ca-certificates
>curl
>gnupg-agent
>software-properties-common
>```

## Role Docker

Dans le role Docker vous devrez installer et configurer Docker afin que celui-ci soit opérationnel pour Kubernetes. Le role docker doit être exécuté sur les trois machines.

Vous devrez donc :
- Installer Docker et ses dépendances sur toutes les machines (Attention le dépot de docker doit être reconnu par apt)
>```
>docker-ce
>docker-cli
>containerd.io
>```
- Ajouter l'utilisateur `ansible` au groupe Docker

## Role Kubernetes master

- Désactiver la SWAP sinon kubelet ne fonctionnera pas.
- Installer Kubernetes et ses dépendances sur toutes les machines (Attention le dépot de Kubernetes doit être reconnu par apt)
>```
>kubelet
>kubeadm
>kubectl
>```
- Spécifier l'IP du node à kubelet (je vous conseille d'utiliser les variables d'Ansible)
- Redémarer Kubelet dans l'état `Restarted`
- Initialiser le cluster avec la commande `kubeadm --init` (je vous conseille de lire la doc de la commande pour utiliser les bon paramètres)
- Configurer le fichier de configuration de kubernetes pour permettre à ansible de gérer le cluster 
(pour cela vous devrez copier le fichier admin.conf de kube et le mettre dans /home/ansible/.kube/config, noubliez pas de donner les droits à ansible sur le dossier .kube)
- Mettre en place le network provider pour kubernetes avec la commande `kubectl create -f https://docs.projectcalico.org/v3.4/getting-started/kubernetes/installation/hosted/calico.yaml`
- Connecter le node au cluster avec la commande `kubeadm token create --print-join-command` (utilisez le paramètre de variable `register` pour stocker l'output de la commande)
- Copier l'output de la commande et l'exporter dans un fichier `join-command` sur le Control Node.

Si cela fonctionne alors vous avez créer votre première machine Kubernetes !
Passons ensuite aux worker qui sont les machines "esclaves" du master.

## Role Kubernetes worker

- Désactiver la SWAP sinon kubelet ne fonctionnera pas.
- Installer Kubernetes et ses dépendances sur toutes les machines (Attention le dépot de Kubernetes doit être reconnu par apt)
>```
>kubelet
>kubeadm
>kubectl
>```
- Spécifier l'IP du node à kubelet (je vous conseille d'utiliser les variables d'Ansible)
- Redémarer Kubelet dans l'état `Restarted`
- Initialiser le cluster avec la commande `kubeadm --init` (je vous conseille de lire la doc de la commande pour utiliser les bon paramètres)
- Configurer le fichier de configuration de kubernetes pour permettre à ansible de gérer le cluster 
(pour cela vous devrez copier le fichier admin.conf de kube et le mettre dans /home/ansible/.kube/config, noubliez pas de donner les droits à ansible sur le dossier .kube)
- Copier le fichier join-command précedement créé par le master dans le worker sous le nom `/tmp/join-command.sh` avec les droits 0777.
- exécuter le script pour ajouter la machine au cluster

Désormais vous devriez avoir un serveur kubernetes fonctionnel. Pour le tester utilisez la commande suivante dans le master ceci vous installera le dashboard officiel kubernetes :
```
kubectl get nodes
```

Pour y accéder aller sur 10.0.0.2:8001
Si vous voyez les 3 nodes alors vous avez réussi.

## Conclusion

Pour ce TP j'attend un rendu respectant les directives suivantes :
- Un dépot git contenant :
  - Votre dossier avec la configuration du projet Ansible fonctionnelle.
  - Un markdown comme rendu
  - Pas d'image que du texte donc inscrivez l'output de commande dans des code block.
  - Une explication pour chaque l'utilisation de chaque module ansi que ce qu'ils font.
- A rendre pour le 08/12/2020 minuit au plus tard (je prendrais le dernier commit à cette date).

/!\ Le TP est plus Hardcore que les derniers donc n'hésitez pas à poser des questions même en dehors du labo mais pas le 8 décembre svp je serais en train d'écrire le tp de kubernetes.
