# Cours 3 : Ansible

## Introduction

Ansible est un outil d'automatisation développé par RedHat. Il permet d'automatiser le déploiement de configurations, d'application, de container ou encore d'infrastructure réseau complexes. Ansible utilise le Yaml pour être Human readable et Machine readable. Le Yaml est le même langage utilisé par Docker et Docker-compose pour leurs configurations.

Ansible est très utilisé dans le Cloud pour déployer des infrastructures Private ou Hybrid Cloud ou encore configurer les applications qui seront disponibles sur l'infrastructure. Grâce à Ansible on peut configurer une multitude de machines en quelques minutes en simultané.

## Glossaire

Utiliser Ansible nécessite de connaître et de comprendre certains mots clés. 

_**Control node**_ : Une machine ayant Ansible installé. Cette machine pilotera le déploiement des scripts Ansible.

_**Managed nodes**_ : Une ou plusieurs machines pilotés par le `Control node`. On les appeles aussi `host`. Ansible n'est pas installés sur ces machines.

_**Inventory**_ : Une liste des `Managed nodes`. Ce fichier contient les adresses IP des machines ainsi que le nom associé.

_**Modules**_ : Les commandes exécutées par Ansible. Chaque `Module` a une action spécifique, par exemple apt installe des pacquet, ping et autre.

_**Tasks**_ : Un ensemble de `Modules` dédiés à une tâche, par exemple : installer apache ou configurer mysql.

_**Playbooks**_ : Une ensemble ordonée de `Tasks`, exécutable et réutilisable.

## Concepts Principaux

### Control Node

Le `Control Node` est la machine permettant d'utiliser Ansible. Cette machine sera celle déployant les configuration sur les `Managed Nodes`. Un `Control Node` est un système UNIX obligatoirement. Ansible n'est pas prévu pour fonctionner sur Windows nativement mais peu avec l'utilisation de WSL.

Pour installer Ansible installés le packet en fonction de votre distribution [ici](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html). 

**Vous devez installer Ansible sur une VM si vous n'avez pas WSL Ubuntu**

La machine doit avoir `Python3` et avoir une paire de clés SSH, utilisez une machine Ubuntu pour plus de simplicité.

### Managed Node

Le `Managed Node`est une machine recevant une configuration par Ansible. Ce peut être une machine ayant un système Unix ou Windows. Ici nous n'utiliserons que des machines Linux Ubuntu. Le node doit avoir python 3 installé et être accessible en `SSH` depuis le `Control Node`. La communication doit se faire par le biai de clés SSH donc assurez vous que la connexion fonctionne.

### Inventory

Un `Inventory` est un recueil de machines appelés `Host` contenant leurs IP ou leurs hostname. Ce fichier est aussi appelé `Hosts`. Un `Inventory` permet de spécifier à Ansible sur quelles machines déployés la configuration.

Un `Inventory` peut être écrite en INI ou en YAML.

```INI
# inventory.ini

# Using Hostname
admin.ynov.com

# Using IP and Hostname
10.0.0.10 web1.ynov.com
10.0.0.11 web2.ynov.com

10.0.0.20 DB1.ynov.com
10.0.0.21 DB2.ynov.com
```

```yaml
# inventory.yaml
---
all:
  hosts:
    # Using Hostname
    admin.ynov.com:  
    # Using IP and Hostname
    web1.ynov.com: 10.0.0.10
    web2.ynov.com: 10.0.0.11 
    DB1.ynov.com: 10.0.0.20
    DB2.ynov.com: 10.0.0.21
```

Le fichier inventory peut aussi contenir des groupes. Ces groupes permettent de spécifier dans les `Playbooks` sur quels machines déployer les `Tasks`. Par défaut toutes les machines appartiennent au groupe `all`. Un groupe contient des hosts.

En INI un groupe est signifié par son nom entre crochets. ex : [web]
En YAML un groupe est signifié en tant qu'enfant du groupe all. (voir exemple sur le yaml).

```INI
# inventory.ini

admin.ynov.com

[web]
10.0.0.10 web1.ynov.com
10.0.0.11 web2.ynov.com

[db]
10.0.0.20 DB1.ynov.com
10.0.0.21 DB2.ynov.com
```

```yaml
# inventory.yaml
---
all:
  hosts:
    admin.ynov.com:  
  children:
    web:
      hosts:
        web1.ynov.com: 10.0.0.10
        web2.ynov.com: 10.0.0.11 
    db:
      hosts:
        DB1.ynov.com: 10.0.0.20
        DB2.ynov.com: 10.0.0.21
```

### Modules

Un module permet à Ansible d'exécuter une action. L'action est lié à un applicatif. Ex : apt ou ping. Certains modules nécessitent l'utilisation de droit administrateur. (voir le chapitre `Tips > Devenir Sudo`). Voici un example d'utilisation d'un module.

```
ansible all -m ping
```

Si nous décortiquons la commande :
- ansible : La commande Ansible lancé sur le `Control Node`.
- all : La destination, en l'occurence le groupe de machines all.
- -m : Le paramètre permettant de lancer un module en ligne de commande.
- ping :  Le module à utiliser, en l'occurence le module ping.

La commande va lancer un ping sur toutes les machines et s'il se déroule correctement Ansible retournera le résultat suivant :

```
mail.ynov.com | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    },
    "changed": false,
    "ping": "pong"
}
```

Dans un fichier YAML cette commande sera écrite :

```yaml
- name: Use the ping module
  ping:
```

### Tasks

Une `Task` est un ensemble de `Modules`. On utilise une `Task` pour une tâche réutilisable. Par exemple l'installation et la configuration d'Apache web server. Toutefois nous ne devons pas déployer une stack complète avec une seule `Task` puisqu'elle n'est dédiée qu'à un groupe de machine. Voici un example d'utilisation pour ping le groupe web.

```yaml
---
- name: Ping all web machines
  hosts: web
  tasks:
    - name: Ping all selected machines
      ping:
```

Ici nous précisons sur quels hosts nous déployons ainsi que les modules que nous exécutons dans la `Task`. On ne peux utiliser de `Tasks` sans un `Playbook`.

### Playbooks

Un `Playbook`est un ensemble de `Tasks` permettant de déployer une stack entière en un fichier. En effet, désormais nous avons plusieurs fichier `Tasks`, tous dédiés à une problématique (installer un service, configurer un firewall, ...). Le `Playbook` défini aussi l'ordre dans lequel les `Tasks` se lancerons. Voici un example qui ping toutes les machines de noter stack.

```yaml
---
- name: Ping all web machines
  hosts: web
  tasks:
    - name: Ping all selected machines
      ping:

- name: Ping all db machines
  hosts: db
  tasks:
    - name: Ping all selected machines
      ping:
```

Pour lancer un playbook nous utilisons la commande :

```
ansible-playbook -i inventory.yml monplaybook.yml
```

Si nous décortiquons la commande :
- ansible-playbook : La commande Ansible lancé sur le `Control Node`.
- -i : On indique le fichier d'Inventory.
- inventory.yml : Notre fichier inventory.
- monplaybook.yml :  Le playbook à utiliser.

## Tips

### Devenir Sudo

Pour exécuter des commandes administrateur vous devrez spécifier le paramètre : `become: yes`. Par défaut Ansible vous mettra en root lors de cette commande donc nous rajoutons `become-method: sudo` pour spécifier que nous utilisons sudo. Become peut s'écrire au niveau du playbook. Vous devez utiliser le paramètre `--ask-become-pass`, dans la ligne de commande pour qu'il puisse utiliser sudo.

### Dry-run

Avant de lancer une commande il faut s'assurer qu'elle va fonctionner. Pour cela Ansible dispose de l'argument `--dry-run`. Cette argument permet de lancer le playbook sans que celui-ci n'altère l'état des machines cibles. En effet il va simuler l'exécution du playbook. Si l'exécution est correcte alors vous aurez de grandes chance que votre configuration fonctionne.

