#/bin/sh

if [ $1 = "init" ]; then
    echo  "configurando ambiente de desenvolvimento"
    docker volume create spenteasy-vol
    docker compose -f docker/dev/docker-compose.yml build
elif [ $1 = "start" ]; then
    echo "iniciando desenvolvimento!";
    if  [ $2 = "-d" ]; then
        docker compose -f docker/dev/docker-compose.yml up --remove-orphans -d
    else
        docker compose -f docker/dev/docker-compose.yml up --remove-orphans
    fi
fi

