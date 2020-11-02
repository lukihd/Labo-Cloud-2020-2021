FROM node:14.7-alpine3.12
EXPOSE 3000
WORKDIR /app
COPY ./tp/app /app
RUN npm install
ENTRYPOINT ["npm"]
CMD ["start"]