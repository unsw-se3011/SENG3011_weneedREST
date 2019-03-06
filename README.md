# API Report and Documentation

## Introduction

This RESTful API provides access to a list of disease reports in the form of JSON data.

<br><br>

## Design Details

### 1. Describe how you intend to develop the API module and provide the ability to run it in Web service mode

The API module will be developed on our local machines using GitHub as a source control tool. GitHub was chosen as the source control to be used as it is formally required in the specification, but is also the most ubiquitous and common source control within the industry.

Notes (remove later):
* Something about DigitalOcean hosting
* Cost effective with the Github something
* Talk about branching github, workflow, why did you pick Github and DigitalOcean hosting

### 2. Discuss your	current thinking about how parameters	can	be passed to your	module and how results are collected. Show an example	of a possible	interaction.

Notes (remove later):
* Have a terminal log curl [website] and mark up the expected response
* Justify every api endpoint and explain its use

### 3. Present and justify implementation	language,	development	and	deployment environment (e.g. Linux,	Windows) and specific	libraries	that you plan to use.

Notes  (remove later):
* More stuff needed

#### Implementation language

* Flask-Restplus is a lightweight, Python web framework that offers the same minimalistic canvas more suited towards a contained web API that we are designing. It is very simple to use with its fast debugger and offers a comprehensive set of documentation and example code. Furthermore, the amount of time needed for the project is short and the team is experienced with using Flask so less time is spent learning. Flask-Restplus offers automatic swagger API documentation.

* React has been used for the front-end of the application due to its speed and flexibility. React is able to integrate APIs directly into the front-end, which simplifies the development of our application significantly. React is also extremely well documented, which has allowed our team to pick up this relatively new technology quite quickly and be able to use it’s many benefits within our development.

#### Development and deployment environment

* For storage of the outbreak data, we have chosen to use a JSON file instead of storing the data in a database. The main reason for this decision was our groups fairly limited knowledge of databases, which would increase the development time and learning curve without necessarily providing any tangible benefits to our API. This was also recommended by our mentor. As a result, the web scraper will be run manually at a specified interval, with the outbreak data being stored in a JSON file which is subsequently accessed by the API.

#### Specific libraries used

* The Python Scrapy library was used for the initial web scraping application. Scrapy allowed us to quickly and easily set up the web scraper that we used to scrape information from the Global Incident Map website. Since this was only the initial part of our task, it was decided to use this this library in order to avoid us having to spend more time creating it. Scrapy is also a well documented and widely used library that is publically available, which made development significantly easier.

<br><br>

## Management Information

### Communication and Agile Development Workflow
Our team has been working together for 2 years now and as such have a firm grasp on our strengths and weaknesses. In that time we have developed strategies for effective communication, delegation of responsibilities and overall workflow.

We communicate regularly via *Facebook Messenger* to discuss our next steps and update each other on our progress. We also have weekly in-person meetings separate to our mentoring sessions which occur immediately after our mentoring timeslot, specifically Wednesday 10:20 am-12:00 pm. In this time, we work together on any tasks from the week before that have yet to be completed, and try to get a headstart on the workload for the week ahead.

As we will be using *GitHub* for our project, tasks relating to functionality are posted in the *Issues* section of our repository. There is also a Kanban board in use under the *GitHub Projects* tab, that will be used for keeping track of agile sprint tasks as well as project and sprint backlogs. Other tasks relating to the reports will be written in the report document itself as a checklist. Task delegation will be handled according to our respective roles within the team, and overflow in that section will thus be delegated accordingly. 

### Roles and Responsibilities
#### Meet the team
Our team prefers to work with semi-rigid roles in place, meaning that if the overflow for a particular section of the project becomes too large, team members will be pulled off other sections to balance out the overflow workload.

|Name|Role|
|----|----------------|
|Bailey Ivancic|<br><ul><li>Team leader</li></ul><ul><li>Backend developer (Python, Flask)</li></ul><ul><li>Web crawler and API interface</li></ul><ul><li>Design Information Report</li></ul>|
|Nabil Shaikh|<br><ul><li>Backend developer (Python, Flask)</li></ul><ul><li>Frontend developer (React)</ul></li>
|Harry Tang|<br><ul><li>Backend developer (Python, Flask)</li></ul><ul><li>Web crawler and API interface</ul></li><ul><li>Design Information Report</li></ul>
|Jacob Wahib|<br><ul><li>Frontend developer (React)</li></ul><ul><li>Debugger</li></ul><ul><li>Management Information Report</li></ul>|
|Estella Arabi|<br><ul><li>Frontend developer (React)</li></ul><ul><li>Debugger</li></ul><ul><li>Management Information Report</li></ul>|

#### Why These Roles?

Bailey is recognised as the team leader due to his ability to manage and organise the team and the delegation of their tasks effectively. His experience with Python and Flask from previous projects makes him an ideal member to assign the responsibility of developing the back-end for our API. As part of this responsibility, he will also work to integrate our API with our chosen web crawler, and set the foundations of our API interface - Bailey is the one that initially started working on the web crawler, and thus is the most knowledgeable of its usage. Following from this, he is therefore the best person (along with Harry) to be writing the Design Information report.

Nabil is a flexible team member with skills in both backend and frontend development. In the past, he was also a core member of the backend subteam, setting up and managing the Flask framework of our projects. However he has recently been committed to learning React, and has encouraged the team to use it in place of HTML and CSS as a frontend tool. He will thus be assigned the role of backend development, before leading the frontend development with his knowledge of React later on in the development timeline.

Harry specialises in backend development, having been part of the backend subteam for past projects as well. He is focused on the gritty details other members tend to overlook, and is committed to asking all the right questions to ensure our API performs as seamlessly as possible, adhering to the project specifications. Since he is a core backend developer, he will work with Bailey on the Design Information Report, as they are the ones who have planned and will implement the core functionality of the API, thus knowing how it will work best.

Jacob has been known to switch between frontend and backend subteams depending on need and circumstance, however he leans towards the front-end based on preference. As such, he will assist Estella in the design of the project website interface, balancing this with the writing and maintenance of any and all reports required. He is also thorough in his testing methods and is often the one who reports bugs within the project if he cannot resolve them himself.

Estella’s development preferences lie within the visual design of the project and is adept at cleaning up the basic template started by the backend team into a user friendly interface. For this reason she has been assigned the role of the frontend developer and report writer. Since she will be spending a lot of time using the website, it is inevitable that she will encounter bugs regarding its performance, and consequently report them to the backend subteam if she cannot fix them herself.
