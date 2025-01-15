Sample commands to build and run the container. Build:

`docker build -t VictoriaTodd/sit731-week8 .`

Run:

`docker run -d -p 5000:8080 VictoriaTodd/sit731-week8`

Note that the app running in the container will still connect to the local MongoDB database on port 27017.