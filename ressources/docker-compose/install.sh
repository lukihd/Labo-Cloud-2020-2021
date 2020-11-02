#!/bin/bash

sudo yum update -y
sudo setenforce 0
sudo firewall-cmd --add-masquerade --zone=public --permanent
sudo systemctl restart firewalld
sudo yum install -y git make ncurses-devel gcc autoconf man yodl vim git 
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io -y
sudo systemctl enable docker
sudo systemctl start docker
sudo groupadd docker
sudo usermod -aG docker paul
newgrp docker
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
echo '10.10.10.10 node1.swarm' | sudo tee -a /etc/hosts
echo '10.10.10.20 node2.swarm' | sudo tee -a /etc/hosts
echo '10.10.10.30 node3.swarm' | sudo tee -a /etc/hosts
#git clone -b zsh-5.7.1 https://github.com/zsh-users/zsh.git /tmp/zsh
#cd /tmp/zsh
#./Util/preconfig
#./configure
#sudo make -j 20 install
#ln -s /usr/local/bin/zsh /bin/zsh
#sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
#git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
cd ~