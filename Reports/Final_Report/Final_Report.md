*Team we-need-REST*

# Final Report - EpiWatch Epidemic Tracker #

## Use cases / Requirements ##

Upon beginning the project, we were given the following functions that the end user should be able to perform using our application:

* Ability to integrate data from different sources and present them in a user-friendly way (1)
* Ability to browse news related to a disease outbreak over a period of time/geographically and identify news about outbreak of interest (2)
* Ability to examine social media related posts on disease outbreaks over a period of time and identify particular trends (3)
* Ability to provide advanced analysis facilities such as analysing the impact of an outbreak on residents of the region over a period of time or predicting potential outbreaks based on historical patterns (4)

Within our software solution, we have chosen to address these requirements in the following ways:

Feature | Application implementation
--- | ---
(1) | Using our web scraper, we are able to obtain data from our specified source (Global Incident Map) without any difficult user input. This information is collected into a JSON file by the web scraper, eliminating the need to manually find and input data. The specified source (Global Incident Map) contains the latest reports from a wide variety of websites from different origins and publications, making it an ideal source of information for us to collect from.
(2) | All the data obtained from the primary source (GIM) is provided through our application, which enables the user to filter reports based on time, date, location and keyword (or a combination of these). This allows the user to perform a narrow search for precisely the outbreak they are looking for, or get results matching to their exact query.
(3) | Original plans for the application included integration with the Twitter API in order to examine tweets as part of the dataset we were working with. Unfortunately, this feature was not included in the final application due to time constraints not allowing for us to pursue this idea fully.
(4) | To satisfy this feature, we included both a small-scale and large-scale data analysis feature. In terms of small-scale data analysis, the 'summary' page provides the user with the ability to analyse a number of reports selected using the search feature from the main page, and collate a report which visualises all the reports onto a heat-map together. Additionally, the reports that are part of this summary are analysed using Natural Language Processing. This allows us to extract entities and relevance categories out of each report, giving a better idea of the contextual meaning of each report. For the large-scale data processing, our Machine Learning algorithm is able to analyse environmental and location data, as well as specialised data specific to the area or disease, to make predictions about the possibility of future outbreaks in a certain location. This allows researchers to better analyse large amounts of data by using the alrogithm to process it, instead of having to do lots of manual work to accurately make predictions.

In assessing the functions that needed to be completed, our team decided to nbreak these down into the following requirements, which were completed across the various sprints within the agile process:

* Obtain complete set of reports from Global Incident Map using web scraper
* Save all reports from web scraper into given JSON format for storage
* Data is accessed through a web-hosted API

## System design and implementation ##

### Software Architecture ###

#### Front-end ####

* The web application was built using the React Javascript framework, as well as ReactStrap + Bootstrap for the visual element of the website
* Heatmap visualisation provided through the use of the Google Maps API
* Natural Language Processing provided through the TextRazor API

#### Back-End ####

* The web scraper was built using Python, as well as the Re and BeautifulSoup Python libraries.
* The web API was built using the Python Flask REST-plus framework.
* The machine learning model was built and trained using sklearn, Pillow, numpy, pandas, seaborn libraries.

#### API Endpoints ####
*Return all reports currently in collection*
- **[<code>GET</code> /reports/](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/GET_reports_all.md)** 

*Filter reports*
- **[<code>GET</code> /reports?{params}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/GET_reports_filter.md)** 

*Fetch a singular report*
* **[<code>GET</code> /reports/{id}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/GET_report.md)**

*Deletes a report*
- **[<code>DELETE</code> /reports/{id}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/DELETE_reports.md)**

*Updates an existing report with form data*
- **[<code>POST</code> /reports?{params}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/POST_reports.md)**

*Updates an existing report*
- **[<code>PUT</code> /reports/{id}](https://github.com/unsw-se3011/SENG3011_weneedREST/blob/documentation/Reports/Design%20Details/PUT_reports.md)**

## Team organisation and conclusion/appraisal ##

* A summary of the key benefits/achievements of your project relating back to your design/implementation

## Project Summary ##

* How did the project go in your opinion ?
* **TODO:** discuss limitations (this is probably more about backend than front end)
* any other points of appraisal pls feel free to add

Overall, we are happy with our final product.

Functionality-wise, we are proud to have been able to integrate Machine Learning and Natural Language Processing. We believe these 2 key features separated us from other groups, and the sheer time and effort we invested into them were worth it. We also believe that having the ability to summarise reports and generate graphs and other analytics based on this information was advantageous - it was tied closely to our business goals of automating outbreak report gathering, leaving the user to deal with the more important analysis since our application did all of the information scraping for them.

In saying that, our frontend design can still be improved upon. We believe we were mostly hindered by our lack of React knowledge, and time. Although we were able to visualise our content and features in a simple and easy to digest manner, we were only able to do so on a very basic level with the aid of Bootstrap. In other words, we were not able to exploit the vast number of React libraries and fully realise its capablilites for our project. We believe this came down to a matter of time and priorities, as at the end of the day learning more advanced techniques to utilise in our project would have taken longer than we could afford.

### Key Benefits and Achievements ###

* Major achievements in project

As mentioned previously, we believe our 2 key achievements was the implementation of Machine Learning and Natural Language Processing.

- Machine Learning

One achievement is that any medical professional or field scientist can choose their own image data to feed into the AI with no technical expertise to predict future outbreaks and find new relationships with geographical data and disease outbreaks spreading. Another amazing achievement was applying Spatial Data Analysis to predict outbreak clusters around Singapore on Dengue with 75% accuracy using ArcGIS image data and other non-image features with a Random Forest Classifer model.

**back end boys pls elaborate**

### Issues ###

* We encountered issues with time, being unable to dedicate the time we would have liked to refine our website due to other academic commitments.
* The learning hurdles also presented an issue as we had to learn new languages, techniques and experiment with unfamiliar structures while trying to create our front end and back end, which magnified our time issues since often we would dedicate a lot of time and practically not have achieved very much relative to the task at hand.

#### Backend ####

**back end boys pls write ur problems here**

For web scraping, the description of the report had encoding issues where it would display characters that did not match the UTF-16 character set. For example, characters in the report would display text such as`/X00` in the description.

For machine learning, it was a very difficult task to use the data from the specification to predict future outbreaks. One issue was data quality. There were no features that had a high correlation to disease outbreaks spreading, instead, showing features that measure the impact of the outbreak. Thus, the model had a 10% accuracy *with high variance* and had a *lower accuracy rate* on the training data than the test data. This could be due to the low sample size in the test data. Being able to accurately convert disease cluster locations on an Image to geojson data for the Google Maps API to read was also a difficult task. Another issue was time which was largely spent training the model and debugging. 



#### Frontend ####

There were a litany of problems with the frontend, mainly boiling down to our lack of proficiency with React. More specifically, they revolved around our desire to make the website look a certain way or perform a certain action without being able to realise it with our language of choice. These issues may not have been necessarily drastic in the grand scheme of our project, but were simple details that would have enhanced the user's experience. For example, our website allows for reports to be selected and later be used to generate an aggregate report. To indicate that a report had been selected, we wanted to highlight said report. However, no matter what we tried, we could not find a way to do this, only being able to highlight the first selected report (even though the other selected reports were being correctly added to the set). Eventually, through a lot of trial and error and assistance from a member of the backend sub-team, we were able to achieve what we initially wanted, but at the cost of almost 2 days worth of time. Frontend design, then, became three times more time consuming than we orginally thought.

Another main issue was finding a way to convert the responses we recieved from our API and converting them into a format that we could parse through, extracting the data we needed, or simply changing how the responses were given from the backend in the first place. For example, we chose to use **Axios** to integrate our frontend and backend and part of how Axios works is to add query parameters exactly as they are into the url. This meant that for multi-word queries that involed spaces were added as is. However, having spaces in a url goes against convention and Axios would return an error. By default, Axios would replace spaces with '+', and thus we got around this error by simply changing all the spaces in our parameters through a function in the backend to '+' as well (and vice versa).

Some of our most vexing issues were present in the integration of an additional API into our website to assist in the analysis of data from our report summaries. We experimented with several and continued running into errors that would often seem insurmountable.

### What We Would Do Differently ###

* What kind of skills you wish you had before the workshop (this way we can try include them in other courses)
  * Would you do it any differently now ?
    * I.e. tools, different technology, time management, etc


## Team Organisation ##

* Team organisation and conclusion/appraisal of your work
  * Responsibilities/organization of the team
    * Ultimate breakdown of team composition and responsibilities

Thoughout the development of the project, our team continued to work well together - we frequently communicated via Facebook Messanger, referred to the Kanban board for sprint deliverables and other tasks, and utilised Slack to efficiently separate discussions regarding frontend and backend issues.

As expected, some workload overflow for these teams required the assistance of members from the other sub-teams, however this did not hinder our process in either area. If anything, it prompted us to re-evaluate design decisions and our vision for our final product, prioritising features that were more easily implemented in the limited time that we had. This can be most clearly seen in the frontend, as we unanimously agreed that the backend functionality was more important, and if something in the frontend was taking too long (that was not strictly necessary), then we would leave it and come back to it only if we had time to spare afterwards.

As detailed in the Management Information report, the team was split into 2 main sub-teams: backend and frontend development. As we developed our API, we allocated additional responsibilites to different members. For example, Bailey and Nabil undertook the task of integrating the Google Trends and Twitter API with our own, as well as implementing Natural Language Processing to enable the user to create a detailed report on a certain outbreak; Harry was assigned the responsibility of implementing Machine Learning, which helped identify geographic locations in which outbreaks were detected; Estella and Jacob moved from casual debugging (i.e. simply using our website to check that everything performs as expected) to more formal API testing using Postman and writing reports based on said tests. Overall, our team member contributions were as follows:

|Name|Role|
|----|----------------|
|Bailey Ivancic|<br><ul><li>Team leader</li></ul><ul><li>Backend developer (Python, Flask, API)</li></ul><ul><li>Web crawler and API interface</li></ul><ul><li>Natural Language Processing</li></ul><ul><li>Google Trends and Twitter API integration</li></ul><ul><li>Design Information Report</li></ul>|
|Nabil Shaikh|<br><ul><li>Backend developer (Python, Flask)</li></ul><ul><li>Frontend developer (React)</ul></li><ul><li>Natural Language Processing</li></ul><ul><li>Google Trends and Twitter API integration</li></ul>|
|Harry Tang|<br><ul><li>Backend developer (Python, Flask)</li></ul><ul><li>Web crawler and API interface</ul></li><ul><li>Machine Learning</li></ul><ul><li>Design Information Report</li></ul>|
|Jacob Wahib|<br><ul><li>Frontend developer (React)</li></ul><ul><li>Debugger/Tester</li></ul><ul><li>Management Information Report</li></ul><ul><li>Final Report</li></ul>|
|Estella Arabi|<br><ul><li>Frontend developer (React)</li></ul><ul><li>Debugger/Tester</li></ul><ul><li>Management Information Report</li></ul><ul><li>Final Report</li></ul>|

We are happy with the work that each member contributed to the project and would consider it to be an equal distribution of effort from everyone involved.