# tirer l'image docker de base tiré de dockerhub
FROM python:3.6.12-alpine3.12
# exposer le port 8888 a docker
EXPOSE 8888
# spécifier chemin dans lequel les instructions suivantes seront exectutées
WORKDIR /python-app
# copier les fichier de l'application python dans ./app dans /python-app
COPY ./app /python-app
# executer la commande pip install flask
RUN pip install flask
# lancer la commande "python" 
ENTRYPOINT  ["python"]
# spécifier l'argument du entrypoint donc start de la commande python
CMD [ "app.py"]