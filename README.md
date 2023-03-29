## Artist search application 

## Description
<p>This application is built on the NestJS framework with the csv-writer library integrated 
to simplify working with csv files. The application takes the artist's name and desired file name from the user.
Then, the application uses the public API from last.fm to retrieve all artists that match the name query.
The application then generates a CSV file that includes the following data: name, mbid, url, image_small, image for 
each artist that matches the client's query.
</p>

## Features
<p><li>If any field (for example, image_small) is missing in the response from last.fm, the CSV file will write the string "not found".</li>
<li>If the user does not provide a filename, the application will create a file with the default name "test".</li>
<li>The file with the recorded data is saved in the root folder of the project</li>
<li>If user does not provide a query string, the application will return an error with code 400.</li></p>


## Installation
<p>Clone this repository:</p>

```bash
git clone https://github.com/semon307/artist-search-to-csv.git
```

<p>Install dependencies</p>

```bash
cd artist-search-to-csv
```

```bash
npm install
```

## Running the app

```bash
# development
npm start
```
Open the web-browser and go to http://localhost:3000/artist/ARTIST_NAME/DESIRED_FILE_NAME

## Test
<p>
  The application is covered by end-to-end tests. For testing, please run:
</p>

```bash

# e2e tests
npm run test:e2e
```

## Stay in touch

- Author - Semen Kozhin
- LinkedIn - https://www.linkedin.com/in/semen-kozhin-4a1a22127/
- Telegram - @apostol3007

