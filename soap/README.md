# Flight Search
System Integration's - Mandatory Assignment
The program can search for a flight which requires the inputs:
* Fly from country
* Fly to country
* From date
* To date

The search can be done through **SOAP** or **RESTful** webservice.

## Authors' Details
**Arash Vojdani**
* Developer

**Cristian Pandele**
* Developer

**Fleur Andersen**
* Developer

## Summary
#### Application	Development
This Application is developed as a flight finder service.

#### Implementation
|Business Features|Technical Features|
| -----------------|------------------|
| Able to see available flights with:| Able to search available flights through: |
|Departure Time |SOAP Webservice |
|Price |RESTful Webservice |
|Fly Duration | --- |
|Airline | --- |

## Installation
#### Prerequisites
* Node.js from [here](https://nodejs.org/en/download/)
* github ([Desktop](https://desktop.github.com) or from [Git for cmd](https://git-scm.com/downloads))
* MySql Server

#### Steps

1. Start MySql Server. Note Username, Port and Password (_if any_).

2. Clone project from [Github](https://github.com/838/RollCall/tree/webservice%2Fflight).

3. Go to ormconfig.json. Change the **port, username, password** to your own.

4. Open a command prompt, **_make sure Directory is where the project is cloned_**. For example: cloned project folder is in C:Users/Fleur/Documents/RollCall/Code.

5. Run the command `npm install`. Wait for installation to finish.

6. Run the command `npm start`. Wait for setup to be done.

7. Open a browser and go to `localhost:3000`.
