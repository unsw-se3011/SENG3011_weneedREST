# Design Details Report

### 1. Describe how you intend to develop the API module and provide the ability to run it in Web service mode

The API module (as well as the rest of the project) will be developed on our local machines using **GitHub** as a source control tool. Github was chosen as the source control to be used as it is formally required in the specification, but is also the most ubiquitous and common source control within the industry. As such, there really wasn't much consideration of any other alternatives, since Github was required and provided everything we needed from the source control system.

In terms of the Github workflow being used, our team typically relies on a feature-based branch model. This involves setting up a new branch for each new major feature, so that development of different functionality is segregated and protected from bugs or broken code. Once the team members responsible for a particular feature believe it to be done, they will then open a pull request, and it will then get merged to the main branch once it has been checked over. Our team has found this to be a logical system that works for us, since all major features are separated to the best of their ability and can be developed concurrently.

We have also chosen to use **DigitalOcean** to host the API for the web service mode. The main reason for this choice is the fact that our team has $50 worth of credit free for DigitalOcean included within our Github Student pack, and as a result makes this a very cost-effective solution for us. This is especially important since our team are all full-time university students, and thus do not have the budget to spend on an expensive hosting solution. Another reason for this choice is the ease and simplicity of use that DigitalOcean offers. Compared to a similar cloud hosting service such as **AWS** or **Microsoft Azure**, Digital Ocean seems to be much easier to get started with and has a much smoother learning curve. This point is particularly important, since no one in the group has had significant experience with web hosting on cloud-based services.




### 2. Discuss your	current thinking about how parameters can be passed to your module and how results are collected. Show an example of a possible interaction.

#### API Endpoints
*Return all reports currently in collection*
- **[<code>GET</code> /reports/](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/GET_reports_all.md)** 

*Filter reports*
- **[<code>GET</code> /reports/?{parms}...](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/GET_reports_filter.md)** 

*Fetch a singular report*
* **[<code>GET</code> /reports/{id}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/GET_report.md)**

*Deletes a report*
- **[<code>DELETE</code> /reports/{id}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/DELETE_reports.md)**

*Updates an existing report with form data*
- **[<code>POST</code> /reports/?{params}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/POST_reports.md)**

*Updates an existing report*
- **[<code>PUT</code> /reports/{id}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/PUT_reports.md)**


### 3. Present and justify implementation language,	development	and	deployment environment (e.g. Linux,	Windows) and specific	libraries	that you plan to use.

#### Implementation Frameworks and Languages

* **Flask-Restplus** is a lightweight web framework that offers the same minimalistic canvas more suited towards a contained web API similar to what we are designing. It is very simple to use with its fast debugger and offers a comprehensive set of documentation and example code. Since the amount of time needed for the project is short and the team is experienced with using Flask, less time is spent learning new technologies and more time can be spent on project development. Flask-Restplus offers automatic swagger API documentation as well.
  * We chose Flask-Restplus as opposed to **eve** since it offers Swagger documentation, while eve doesn't. This was a major deciding factor in preferring Flask-Restplus over eve and other possible alternatives.
  * Subsequently, we used **Python** as our back-end language since Flask is Python-based. Python was also a language that all members of the team were familiar with, so development on the application was quick without any major learning-curve.

* **React** will be used for the front-end of the application due to its speed and flexibility. React is able to integrate APIs directly into the front-end, which simplifies the development of our application significantly. React is also extremely well documented, which has allowed our team to pick up this relatively new technology quite quickly and be able to use it’s many benefits within our development. 
  * Additionally, it is well known by one of our members, so we preferred it over alternatives like Angular JS primarily for this reason. 
   * Regardless, the languages used for the front-end remain to be **JavaScript**, primarily, along with **HTML** and **CSS** (along with Bootstrap).

#### Development and Deployment Environment

* For our development environment, we have chosen to use a combination of **Mac** and **Linux**. This choice was fairly easy, because these were simply the machines that the team were using as their personal machines. All the development technologies and technologies within our stack were compatible with the machines being used, so we saw no reason to change this arrangement.
We chose these development environments over **Windows** since all of us have experience programming with Mac and Linux, but not Windows, and not all of us have access to a Windows machine.

* We are aiming for the deployment environment to be platform-agnostic, and thus be compatible with all operating systems and browsers. This will therefore need to be tested before final deployment begins. Testing and development is done on **Safari**, **Firefox developers edition**, and **Chrome**.

* For storage of the outbreak data, we have chosen to use a **JSON** file instead of storing the data in a database. The main reason for this decision was because of our group's fairly limited knowledge of databases, which would increase the development time and learning curve without necessarily providing any tangible benefits to our API. This was also recommended by our mentor. As a result, the web scraper will be run manually at a specified interval, with the outbreak data being stored in a JSON file which is subsequently accessed by the API.
JSON files were used over more complex database platforms like **SQL** precisely for its simplicity. Our database requirements are not dynamic and not complicated, so a JSON file seemed much more appropriate.

* **Postman** was used for the testing of our API. Recommended by our mentor, postman allows for team collaboration when writing test cases, as well as an environment for writing, storing and running the test cases. Our current setup includes a team workspace containing all our members and tests, which allows everyone to access the environment as well as keeping it all standardised.
Postman was preferred over **Insomnia** since it provides a documentation service that the latter doesn't offer. This was a major factor in selecting Postman over its alternatives, along with the recommendation of Postman by our mentor.

#### Specific Libraries Used

* Initially, up until the second deliverable, our team was using the Python **Scrapy** library to extract the raw HTML from the Global Incidents Map page. However, as we started developing the web scraper and API, we realised that the library was a bit excessive for what we were using it for. Since our data source has all the data on a single page, we have no need to crawl through many pages, and as such a simple **Pycurl** request would essentially serve the same task for our project. In terms of ease of use, Pycurl has been even easier to use than Scrapy, as there is much less complexity involved and it is a much simpler process. This is evidenced by the fact that we are able to get the same job done in a few lines of code that scrapy required many separate files for. As a result, we have been able to remove al the required folders and files that Scrapy required for use, which has made our program much simpler and efficient. It has also reduced the time it has taken us to get a working prototype.
* In addition to the newly added Pycurl, our group is planning on uring **Beautifulsoup** in order to process the raw html data that we extract using Pycurl. Beautifulsoup will allow us to easily parse this data and extract the information ready for easy insertion into our JSON format.


## Final Design
TODO:
API design and testing details
* Describe final architecture of your API, justify the choice of implementation, challenges addressed and shortcomings.
* Provide the URL of your API specification.

### Platform Design
* The use cases / requirements of the API and the analytics platform
* Software architecture
* How it integrates with your API at a high level, such as how you communicate
with the API, data conversion practice at client web application and any mapping you do between data retrieved and visualized.
* Add any other relevant information to your design i.e. all additional APIs used in your project, algorithms you’ve employed, etc

#### Use Cases and Requirements
//TODO

#### Software Architecture

Our **Primary data source** comes from the Global Incident Map (http://www.globalincidentmap.com/).
* Scraper built using pyCurl and Python RestPlus.
* Python re and BeautifulSoup libraries for HTML parsing and text processing.
* JSON for storage of reports.

**API**
* Hosted on DigitalOcean droplet
U Using Python Flask RestPlus with included Swagger documentation

**Web Application**
* Built using React.js
* Bootstrap and reactstrap library for front-end visuals
* Natural Language Processing is provided via the use of the TextRazor REST API
* Twitter posts integration provided through use of Twitter API
* Google Trends data provided through use of Google Trends API
* Google Maps Heatmap provided through use of Google Maps API
