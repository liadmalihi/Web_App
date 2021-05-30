# Anomaly Detection WebApp

A Web app server that implements a REST-API for the clients,and a single web-page.
This is a Web application that detects anomaly's in data from one CSV file according to another.
The app allows the user to select Algorithm for detecting anomalies, upload two CSV files - CSV file of a correct data in order to check for anomaly's, and CSV file of the data you want to inspect for anomaly's.

Collaborators:

The program was developed by four second year computer science students at Bar Ilan University, Israel - Ashira Major, Yeheli Frangi, Liad Malihi and Shiraz Ayash.

General Description:

The client open a browser at address 'localhost:8080'. 
A page appears with the title 'Anomaly Detection Server'.
The client selects an anomaly detection algorithm from a drop-down list that includes an algorithm based Regression and hybrid algorithm.
The client selects a valid CSV file without anomalies and a file where there may be anomalies.
When the client clicks on upload, the files are uploaded to the server, where an anomaly will be detected.
The output is a report with the anomalies that the algorithm detected that specifies the columns and exact lines they occurred.

Code Begins:

The Anomaly Detection WebApp programmed with the MVC design using node.js in javaScript for the Server, and the client web-page with html&css.
You can see the division between the view of a feature and its corresponding Controller that is connected to the model of the whole program.

Project structure:

In the main window you can see all the code's files for the app.
Also you can see the UML of the whole project.


How to run the app?:
* Open the CMD shell from the project's folder.
* Get into the Controller folder.
* Run the the following commands:
- npm init —yes
- npm i express
- npm i express-fileupload
* Return to the project's main folder.
* Run the the command:
- npm install smallest-enclosing-circle
* Get into the Controller folder again
* Run the command - node expServer.js.

To run from browser: 
* Open the browser in address 'localhost:8080'
* Upload 2 CSV files - CSV file of a correct data, and CSV file of the data you want to inspect for anomaly's.
Make sure the CSV files have unique names for the columns - it is essential for the algorithms to work. 
* Choose anomaly detection algorithm from a drop-down list.
* Press Detect.

To run from 'PostMan':
* Download the application ['PostMan'](https://www.postman.com/downloads/).
* Open 'API Documentation'
* open POST request with url 'localhost:8080/api/server'
* In the body tab - select 'form-data' option.
* Fill in key 3 parameters:
1. learn_file - file
2. test_file - file
3. Algoritem - text
* Fill the value - upload  2 CSV files, and write the selected algoritem.
* Press send.

Documentation:
![Image of UML](https://github.com/YeheliF/WebApp/blob/master/UML.jpg)
You can see in the UML the MVC architecture.
We have a html file that is the View of the html page.
We have a js file that is the Controller of the html that implement the HTTP commands (post,get) , and it connect between the view and the model.
We have a js file that is the Model of the html that implement the anomaly detection of each algorithem.

[Demo of the app running](https://youtu.be/wTXn-ooOaXc)
Enjoy!
