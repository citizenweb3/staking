
# Oracle Slinky Setup Guide for Warden Protocol

This guide outlines the steps to set up the Slinky service for the Warden Protocol, including downloading the binary, defining the GRPC port, creating a systemd service, and verifying price data.

## Step 1: Download the Slinky Binary

Navigate to your `wardenprotocol` directory and download the Slinky binary file:

```bash
cd $HOME/wardenprotocol
curl -Ls https://github.com/skip-mev/slinky/releases/download/v1.0.5/slinky-1.0.5-linux-amd64.tar.gz > slinky-1.0.5-linux-amd64.tar.gz
tar -xzf slinky-1.0.5-linux-amd64.tar.gz
mv slinky-1.0.5-linux-amd64/slinky $HOME/go/bin/slinky
```

Verify the version:

```bash
slinky version
# Expected output: 1.0.5
```

## Step 2: Define Your GRPC Port

Extract your GRPC port from the configuration file:

```bash
GRPC_PORT=$(grep 'address = ' "$HOME/.warden/config/app.toml" | awk -F: '{print $NF}' | grep '90"#x27; | tr -d '"')
echo $GRPC_PORT
```

## Step 3: Create a systemd Service for Slinky

To run Slinky as a background service, create a `systemd` service file:

```bash
sudo tee /etc/systemd/system/warden-slinky.service > /dev/null <<EOF
[Unit]
Description=Slinky for Warden Protocol service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which slinky) --market-map-endpoint="127.0.0.1:$GRPC_PORT"
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

Reload `systemd`, enable, and start the service:

```bash
systemctl daemon-reload
systemctl enable warden-slinky
systemctl restart warden-slinky && journalctl -u warden-slinky -f -o cat
```

## Step 4: Verify Prices

Verify that the Oracle service is fetching prices:

```bash
curl localhost:8080/slinky/oracle/v1/prices | jq
```

## Additional Notes

- Ensure all dependencies are installed before starting.
- Monitor logs to confirm service status and data retrieval.

This completes the Oracle Slinky setup for the Warden Protocol.
