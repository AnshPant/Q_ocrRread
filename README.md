# Problem Statement

- Develop an application that utilizes Optical Character Recognition (OCR) to analyze thai id cards and extract relevant data. This app should integrate with Google Vision API for OCR processing and then parse the response to interpret the OCR results, returning the final data in JSON format.
- Along with this we would like you to choose a database of your choice and save the results in the db. We would need a CRUD api to create the ocr data, if needed we can modify some data, filter them or delete certain id cards(soft delete).


# Solution to Problem: Thai ID OCR App

This React application uses Tesseract.js for OCR (Optical Character Recognition) of Thai ID cards. It allows users to upload an image of a Thai ID card, extract the relevant information, and save it to a database. The app also includes a filter feature to search for specific OCR records.

Website Link:

#https://q-ocr-rread-fsjw.vercel.app/

# Demo Link Video
 Please see the demo link:
 

## API used

Both Firebase and GoogleVision APIs are used for the successful deployment of this project.

## Prerequisites

- Node.js and npm
- GoogleVision API
- Firebase/Storage (Cloud Bucket)
- Firebase/FireStore
- ImageJS (version 2 or higher)
- Libaries like imageJS, sweetAlert, etc.

## Setup

1. Clone the repository.
   
2. Go to the root folder and install the dependencies:   
npm install

3. Run the Next app: 
npm run dev


## How to Use

1. Select an image of a Thai ID by browsing it via imageSelect component (Browse) and click on Upload button.
2. Then wait few seconds click on Extract image button to start the image processing. Click this button until you see fetching results. Click fetch button for the last time to send api request to googleVision and fetch data.
3. The extracted fields will be displayed both in JSON stringigy format and fetched format.
4. Click the "Upload" button to upload the extracted data to the database(firestore).
6. You can also filter the OCR history by DateOfIssue and Ident identification number.

Other Features:-

#Get Data 
In this you will be seeing all the data already in databse. You can manualy filter the OCR history via Identity number and Date Of Issue.
You can also view all the data records sorted by Identification Number.


# OCR API with Express and MongoDB

Proper Server Side rendering for the google Vision API has been done. Stored as TypeScript file in the API folder.
(This is NEXT.js format for creating server side API)

## Prerequisites

- Node.js and npm installed


## Database Setup

No need to setup data.
Its always on :)

## API Routes

The API provides the following routes:

FileSystem based routing has been implemented in whole project.

The API will respond with a JSON object containing the result of the operation. 

