#!/bin/bash

#installing default dependencies
echo "Installing default dependencies..."

apt update
apt upgrade -y
apt install wget curl ncdu tmux ufw make build-essential screen git gcc libpam-google-authenticator lsof fail2ban tree jq pkg-config smartmontools htop net-tools chrony clang -y

# Ask if user wants to create a new user
read -p "Do you want to create a new user? [y/n] " create_user

if [[ "$create_user" =~ ^[Yy]$ ]]; then
  # Prompt for new user's name
  read -p "Enter the new user's name: " USR

  # Create new user
  sudo adduser "$USR"
  usermod -aG sudo "$USR"

  echo "New user $USR created successfully!"
else
  echo "No new user created..."
fi
# Check if default SSH keys should be added

read -p "Do you want to add the default Citizen Cosmos SSH keys? [y/n]:" answer

if [[ "$answer" =~ ^[Yy]$ ]]; then
    echo "Adding default Citizens SSH keys..."
    echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDATtIkkqM7eYVkTCN2j01zpuq//8wobqq088SobfEfb+tHbPfEbq+0vYHghynkqqWrGKnIj46pCok6WkM6VCuLVtg3pIJyDwJtWnQjtx7ie94bySl7EgfghTt3zElyfvjyN12hggPZRmk+H3Q1CDFkQNxCja8a8hJP0yySbodWNu/ovJdM3MoM3KoF4j63UNSA7i2884Eb+mi6w3bYBI7FV4C4AvmJY2+QdA+/O27Hh366hDTlKFI7n9mGys4tkB9MRKR3F18+SmyHPkSGcDphMz5qHLrRF4io+M65/xjum/UCQQ/ey0wWrZtlzlQ1UK8BKMmnacFS8OeIuvaoXgF2MmumpN88N0pAbD6oZSW9aSqTFPrKFmgUDB9aSd3G2JtuK44bl+vjlJeLOKMfZtq7IEJhNpZTzsqD71LurGdMTCTnHlVvwl6M00/VKEUn1/OYkvEbz7QAuvHkHHPVxBNXepvbYLTL8cyRDplt4j8ecZ6yOFxy5q3huClGZbLbT5c= alex@alex-VirtualBox" >> ~/.ssh/authorized_keys
    echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC8DNFA4MW/KoHRKHl8Jo4s2MCkJZG3u1UcbjkWb+1ykEcUKJQvFjCYJ9nPw3PoxBGI9O9qcGaVVPywCalQ/kx9PT6YaeFGRE4sts8JZM8pOtbx3qaA6WMGUk1ROyBDemJluAzX/RtCKyoCnenVRpR+eUcK9NEKuI427u7MI0CSE1LhSFyV4wWchHp1LYBotBGOglMU2OmNjuhjc/oadfFqTB06HWrAoSRbTkDIrfbC+OIG/D9ca73HpRWdymzb7Fi4FHB3V+PtnkJsybIgXczZMHd9IuvPfIr6d8yq0EfMefbS1s7o46Knv9dEdCh0ZTPCYWAwS8YOiXGdVrlmxDx7bvT3uGqJnVc/uRfg+3ZoN/wK0ygEcGYVPIlNi23u2l5Vl7b8w+K1yTCoN7RaAip/VI8EKQxpNMw73K/Qb7J5mHRQVPwi9YEXWKYE+Fkq4q+ODHVAYMwminrA5CqE1ZlcbZhSRjqtMg3wgp+/c8mt4b7d3YU6RS5D8jx/BPJqv9Xr9LOEFYK9eHE6DESct5BvidDhgU1NT+KL2BisKC4zPDckPE5zRBR29aqT6HQWdD6IJcmQJ7oQ0UlF3Fs0pbMRFCFu9UglyRfBk3Ul4wWA+zZ3L5tP18WwlJWsvEjPCVz2/CVEmE0qgk5sJ72zL7gXzlqY5qEyxd80BJy+9SJoKQ== shafetovarrow@gmail.com" >> ~/.ssh/authorized_keys
    echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDHwOPZFLaFtOclApPsTrCNfiO8H8F0hkcv+kNMbNPrVcoB46QJJMwe67gMdkpA9ZRfAR+Vj4qpdNpTcaM79Fb3EiG8FqvAD//3JSLJ3G4I2ZISZY/L7Ssy3nGTVSsJVys3y6IgmCGOaeaVY4g76+4XU+7H7usV+6RqJ05+gefXPpkIjjwR4AByH+q09BF826MX9+ZGZX7RqQhBYo2g/Gah1qJS6DadCIgP4PHQmVXmQkDSQSYLWw4M8yWij/77ZT5WJgoKSQcE5hlfLTkLSITUb/BM51shWz/tiCOqBCBNxTDMUC31nUpbnGe1qgJltwjPwAXfmNT7bDZLLUgBJ07pJK4VgmQo16sdMoO6o3ZRA1CVrE8crt+R7Q7Oe2FRK0ojb+6Ib70R46K+ylYRGmXAz8zkbO14IrwiCmzJ5KyNFXO+Bqepgm7IIAPWsQA5x/eQVaFd8vEg7rut6HHdE67QOLMR5V6XxkMFwxX2FCiRKZ3a0ICZ92nnmaBAW8W7dyfGs55Znq8WPW2PnHLEF+udK/KsX7MDOukW83ff9EJ4SC+L25qON742xe7uctlscADvFNq6wYoN/laOsiajY2r0SkCLRT7hNDFH4Jxko3MNArpSZ8JDDSHt+dgGhMiW9pBAaRo9SpOhtnIv85bKGGZg0lq2Sy8Zo15rF3ciDEuc/w== kluch" >> ~/.ssh/authorized_keys
    mkdir /home/"$USR"/.ssh
    sudo cp ~/.ssh/authorized_keys /home/"$USR"/.ssh/
    sudo chmod 644 /home/"$USR"/.ssh/authorized_keys
    echo 'auth required pam_google_authenticator.so' >> /etc/pam.d/sshd
    #echo -e "\nPermitRootLogin no \nAllowUsers $USR \nPubkeyAuthentication yes \nPasswordAuthentication no \nChallengeResponseAuthentication yes \nUsePAM yes \nAuthenticationMethods publickey,keyboard-interactive \nX11Forwarding no \nPrintMotd no \nClientAliveInterval 300 \nClientAliveCountMax 2 \nAcceptEnv LANG LC_* \nSubsystem	sftp	/usr/lib/openssh/sftp-server" >> /etc/ssh/sshd_config
    sed -i 's/.*@include common-auth*/#@include common-auth/' /etc/pam.d/sshd
    sudo systemctl reload ssh
    sudo systemctl reload sshd
    echo "Citizen Cosmos keys adds successfuly." 
else
    echo "Citizen Cosmos keys adds was skipped..."
fi

# Prompt user to add SSH keys
while true; do
    read -p "Do you want to add your SSH keys? [y/n]: " add_key
    if [[ "$add_key" =~ ^[Yy]$ ]]; then
        read -p "Enter SSH key: " ssh_key
        echo "$ssh_key" >> ~/.ssh/authorized_keys
        ssh-add -K ~/.ssh/id_rsa
    else
        break
    fi
done

echo "Done adding SSH keys."

#Installing monitoring tools

read -p "Do you want to set up Prometheus? [y/n]:" PROMETHEUS

if [[ "$PROMETHEUS" =~ ^[Yy]$ ]]; then
    echo "Installing Prometheus..."
    #Downloadind and extracting latest version
    PROMETHEUS_VERSION=$(curl -s https://api.github.com/repos/prometheus/prometheus/releases/latest | grep tag_name | cut -d '"' -f 4 | sed 's/v//')
    wget https://github.com/prometheus/prometheus/releases/download/v"$PROMETHEUS_VERSION"/prometheus-"$PROMETHEUS_VERSION".linux-amd64.tar.gz
    tar xzf prometheus-"$PROMETHEUS_VERSION".linux-amd64.tar.gz
    sudo mv prometheus-"$PROMETHEUS_VERSION".linux-amd64/prometheus /usr/local/bin/

    echo "Configuring Prometheus..."
    # Create the Prometheus user and group
    sudo groupadd --system prometheus
    sudo useradd -s /sbin/nologin --system -g prometheus prometheus
    
    sudo mkdir -p /var/lib/prometheus/data
    sudo chown -R prometheus:prometheus /var/lib/prometheus


    # Create the Prometheus configuration directory and copy the example configuration file
    sudo mkdir /etc/prometheus
    sudo cp prometheus-"$PROMETHEUS_VERSION".linux-amd64/prometheus.yml /etc/prometheus/

    # Update the ownership and permissions of the Prometheus files
    sudo chown -R prometheus:prometheus /usr/local/bin/prometheus /etc/prometheus/
    sudo chmod -R 775 /usr/local/bin/prometheus /etc/prometheus/
    sudo chmod 755 /usr/local/bin/prometheus

    # Create the Prometheus systemd service file
    sudo tee /etc/systemd/system/prometheus.service > /dev/null <<EOF
[Unit]
Description=Prometheus Monitoring System
After=network.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
  --config.file /etc/prometheus/prometheus.yml \
  --storage.tsdb.path /var/lib/prometheus/ \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries \
  --web.listen-address="0.0.0.0:8090"
  ExecReload=/bin/kill -HUP $MAINPID

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl start prometheus
    sudo systemctl enable prometheus

echo "Prometheus has been installed successfully!"
else
    echo "Prometheus installation skipped..."
fi

read -p "Do you want to set up Node Exporter? [y/n]:" NODE_EXPORTER

if [[ "$NODE_EXPORTER" =~ ^[Yy]$ ]]; then
    echo "Installing Node Exporter..."
    # Download latest Node Exporter binary
    wget $(curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep "browser_download_url.*linux-amd64.tar.gz" | cut -d '"' -f 4)

    # Extract the binary and move it to /usr/local/bin
    tar xvfz node_exporter-*.tar.gz
    sudo mv node_exporter-*/node_exporter /usr/local/bin/


    echo "Configuring Node Exporter..."
    # Create the Node Exporter service file
    sudo tee /etc/systemd/system/node_exporter.service <<EOF
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl start node_exporter
    sudo systemctl enable node_exporter

    # Display the Node Exporter version
    echo "Node Exporter version: $(/usr/local/bin/node_exporter --version)"
else
    echo "Node Exporter installation skipped..."
fi

# Ask whether to change the default SSH port
read -p "Do you want to change the default SSH port (22)? [y/n]: " choice

if [[ "$choice" =~ ^[Yy]$ ]]
then
    # Ask for the new SSH port number
    read -p "Enter the new SSH port number: " port

    # Update the SSH configuration file
    sudo sed -i "s/#Port 22/Port $port/" /etc/ssh/sshd_config

    # Restart the SSH service
    sudo systemctl restart sshd

    echo "SSH port has been changed to $port"
else
    echo "No changes made to SSH port..."
fi

# Firewall setup
read -p "Do you want to install and setup firewall?: [y/n]" frwl

if [[ "$frwl" =~ ^[Yy]$ ]]
then
    ufw allow "$port"
    ufw allow 26656
    ufw allow 8090
    ufw enable
    ufw reload
else
    echo "Firewall setup denied..."
fi

# Setup for fail2ban
read -p "Do you want to setup fail2ban?: [y/n]" f2b

if [[ "$f2b" =~ ^[Yy]$ ]]
then
    echo "Setting up fail2ban..."
    sed -i 's/.*backend = %(sshd_backend)s*/enabled = true\nbantime = 14400\nfindtime = 3600\nmaxretry = 3/' /etc/fail2ban/jail.conf
    service fail2ban restart
    fail2ban-client status sshd
    echo "fail2ban setuped successfully."
else
    echo "fail2ban setup cancelled..."
fi

# Generate google 2FA
read -p "Do you want to configure google two-factor authentification for created user?: [y/n]" GFA

if [[ "$GFA" =~ ^[Yy]$ ]]
then
    sudo -i -u $USR bash << EOF
echo "execute as $USR"
google-authenticator  -t -D -r 3 -R 30 -w 4 -f -C
EOF
else
    echo "Google 2FA setup cancelled..."
fi    

#installing golang
read -p "Do you want to install Go?: [y/n]" install_go

if [[ "$install_go" =~ ^[Yy]$ ]];
then
    read -p "Which version of Go do you want to install? [e.g., 1.16.3] :" version
    echo "Installing Go version $version..."
    sudo wget https://golang.org/dl/go$version.linux-amd64.tar.gz
    sudo rm -rf /usr/local/go
    sudo tar -C /usr/local -xzf go"$version".linux-amd64.tar.gz
    rm "go$version.linux-amd64.tar.gz"
    echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
    source $HOME/.bash_profile
    echo "Go version installed on this machine: $(go version)"
else 
    echo "Go installation skipped..."
fi
