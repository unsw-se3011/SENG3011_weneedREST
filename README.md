# Sleepy API - UNSW Software Engineering Major Project #3
# Epidemic tracking and analytics application

## Disclaimer: 
This Repository contains code for the third project completed within Software Engineering. This project was completed in 19T1. This was completed as a group assignment, and remains the work of the individuals listed below. You are free to view, use, run and modify this application in any way you like. **Please do not use any of the work contained within this project without explicitly attributing the original authors, otherwise you are plagiarising.** We assume no responsibility for any damage, harm or other effects that arise from using this software.

### Group members:
- Bailey Ivancic
- Harry Tang
- Estella Arabi
- Jacob Wahib
- Nabil Shaikh

## Project brief:
The original specification for the project was to create an application used by the UNSW Epiwatch team. The aim of the application was to automate the data collection the team manually performed, as well as helping the team analyse and visualise the information for more efficient tracking and predicition. Additionally, the Epiwatch team consists mainly of medical professionals as well as other personnel. This meant that the functions within the application should be intuitive and easy to use, as well as require minimal technical knowledge.

## Project details:
The application aims to fulfil the brief by combining the following features:
- Automated web scraper/HTML parser which obtains reports from the specified target destination
- Web-based API for accessing report data, featuring intuitive Swagger documentation and interface
  - Delete function
  - Update function
  - Create function
  - Search function
- Web application which allows viewing of selected report data in visual, intuitive way
  - Heatmap showing all locations of all reports in summary
  - Natural language processing for all reports in summary
- Large-scale data analysis through the use of Machine Learning algorithm

Our application attempted to solve the problem we were presented with by using a dual-approach to data analysis. 
For analysing small amounts of report data, we used a combination of NAtural Language Processing comgined with a heatmap visualisation of all the reports. The text processing allows the user to gain contextual information on the reports included in their summary, allowing their search/investigation to be expended into relevant categories as identified by the processor. This allows the application to be a more complete too for the researcher, in terms of bringing all information together which may be important in idenaifying an outbreak or epidemic. The heatmap plots the attached location of each report onto a live map, allowing the user to see any clusters that may be forming, as well as potential future spreads.

### Tech stack:
The application is split into three parts: the web-scraper, Rest web API and the user application.

**Web Scraper**
- Built using Python
- Python Re library used for regex for HTML searching
- Python pyCurl library used for HTML scraping
- Python BeautifulSoup library used for HTML parsing

**Rest web API**
- Built using Python Flask RestPlus
- Documentation and interface for API automatically generated through Swagger documentation
- Hosted on private DigitalOcean droplet

**Application**
- The application front-end was built using React, in combination with Bootstrap and Reactstrap for the styling
- Natural Language Processing used through TextRazor API
- Heatmap visualisation used through Google Maps API

---

For more information on the project, please have a look at the report documentation included inside the repo, or download and run the source code.


## How to use and run SleepyAPI:
For the development and presentation of the application, our Rest API was hosted using a DigitalOcean droplet which allowed us access to the JSON data. This droplet has been closed, and as such the aspplication will not work initially. The source code for the scraper and for the rest API must be downloaded and run (either locally or elsewhere) and then this new address must be accessed. Similarly, API keys (for TextRazor and other APIs used in the application) have been taken out of the code, so these will also need to be replaced to properly run the application.


**This project has now been completed and closed, as of 2/6/19.**
