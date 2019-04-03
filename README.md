# Apple
A nodejs application

## Docker
1. To run a docker container for the application using the following command with debug mode from VScode IDE

```
docker run -itd --rm --name apple -v e:/Repository/apple:/usr/src/app -w /usr/src/app -p 40000:3000 -p 9229:9229 node
```

2. To run the application using node have added start command in package.json and also edited launch.json for debugging in VSCode IDE

3. To run the application using nodemon use the following command

```
docker exec -it apple npm start
```