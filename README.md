[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Ha6DivV4)
[Example Streaming data](https://data.gov.hk/tc-data/dataset/hk-hko-rss-smart-lamppost-weather-data/resource/eae90458-96ef-4b05-9222-b1ee4fff3487)

## Start in Docker

```
docker compose up
```

## Install ans Start scripts for kubernetes
If using AWS, make sure greater than 8 GB storage (Can be 30 GB)

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

# Install OpenFaas (For Mac)
brew install faas-cli
curl -sSL https://get.arkade.dev | sudo -E sh
arkade install openfaas

# Install OpenFaas (For Linux)
curl -sSL https://get.arkade.dev | sudo -E sh
arkade install openfaas
curl -SLsf https://cli.openfaas.com | sudo sh
```

```
# Forward the gateway to your machine
kubectl rollout status -n openfaas deploy/gateway

# Change the port number to 31112
export OPENFAAS_URL=http://127.0.0.1:31112
# export OPENFAAS_URL=http://localhost:31112

sleep 5

# If basic auth is enabled, you can now log into your gateway:
PASSWORD=$(kubectl get secret -n openfaas basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode; echo)
echo -n $PASSWORD | faas-cli login --username admin --password-stdin

echo $PASSWORD

```


## Start the services

```

# Download .yaml
curl -fsSL -o kubernetes.yml https://raw.githubusercontent.com/johnnyip/Cloud-Project/main/kubernetes.yml
curl -fsSL -o openfaas.yml https://raw.githubusercontent.com/johnnyip/Cloud-Project/main/openfaas.yml

kubectl apply -f kubernetes.yml
faas-cli template pull
faas-cli deploy -f openfaas.yml
```
## Show Status
```
minikube service list
kubectl get svc
kubectl get po
```


| Service    | Kafka                              | Kafka-ui        | mongo-ui        |
| ---------- | ---------------------------------- | --------------- | --------------- |
| Docker URL | kafka:9092                         | localhost:8080  | localhost:8081  |
| K8s URL    | kafka.kafka.svc.cluster.local:9092 | <Public_IP>:30000 | <Public_IP>:30001 |



## Kubectl
```
# Remove deployment
kubectl delete -f kubernetes.yaml

# Show logs
kubectl logs <pod name>
```

## OpenFaaS 
```
# Image preparation
faas-cli up -f openfaas.yml

# Show logs
faas-cli logs openfaas
```