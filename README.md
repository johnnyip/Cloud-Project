[Example Streaming data](https://data.gov.hk/tc-data/dataset/hk-hko-rss-smart-lamppost-weather-data/resource/eae90458-96ef-4b05-9222-b1ee4fff3487)

## Start in Docker

```
docker compose up
```

## Install ans Start scripts for kubernetes

```
# Install Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Docker
sudo apt-get update && sudo apt-get install docker.io -y

# Install conntrack
sudo apt-get install -y conntrack

# Install httping
sudo apt-get install -y httping

# Install helm
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh

sudo -i
```

```
minikube start --kubernetes-version=v1.22.0 HTTP_PROXY=https://minikube.sigs.k8s.io/docs/reference/networking/proxy/ --extra-config=apiserver.service-node-port-range=6000-32767 disk=20000MB --vm=true --driver=none

# Download .yaml
curl -fsSL -o kubernetes.yaml https://raw.githubusercontent.com/johnnyip/Cloud-Project/main/kubernetes.yaml

kubectl apply -f kubernetes.yaml
```

| Service    | Kafka                              | Kafka-ui       | mongo-ui       |
| ---------- | ---------------------------------- | -------------- | -------------- |
| Docker URL | kafka:9092                         | localhost:8080 | localhost:8081 |
| K8s URL    | kafka.kafka.svc.cluster.local:9092 | localhost:8080 |                |
