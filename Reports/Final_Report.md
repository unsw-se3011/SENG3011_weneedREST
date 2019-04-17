# Final Report #

* A summary of the key benefits/achievements of your project relating back to your
design/implementation


## Project Summary 
 * How did the project go in your opinion ?
 * **TODO:** discuss limitations (this is probably more about backend than front end)
 * any other points of appraisal pls feel free to add
 
Overall, we are happy with our final product.

Functionality-wise, we are proud to have been able to integrate Machine Learning and Natural Language Processing. We believe these 2 key features separated us from other groups, and the sheer time and effort we invested into them were worth it. We also believe that having the ability to summarise reports and generate graphs and other analytics based on this information was advantageous - it was tied closely to our business goals of automating outbreak report gathering, leaving the user to deal with the more important analysis since our application did all of the information scraping for them.

In saying that, our frontend design can still be improved upon. We believe we were mostly hindered by our lack of React knowledge. Although we were able to visualise our content in a simple and easy to digest manner, we were only able to do so on a very basic level with the aid of Bootstrap. In other words, we were not able to exploit the vast number of React libraries and fully realise its capablilites for our project. We believe this came down to a matter of time and priorities, as at the end of the day learning more advanced techniques to implement in our code would have taken longer than we could afford.

      
### Key Benefits and Achievements 
* Major achievements in project

As mentioned previously, we believe our 2 key achievements was the implementation of Machine Learning and Natural Language Processing.

**back end boys pls elaborate**


### Issues
* Issues/problems encountered

#### Backend
**back end boys pls write ur problems here**


#### Frontend
There were a litany of problems with the frontend, mainly boiling down to our lack of proficiency with React. More specifically, they revolved around our want to make the website look a certain way or perform a certain action without being able to realise it with our language of choice. These issues may not have been necessarily drastic in the grand scheme of our project, but were simple details that would have enhanced the user's experience. For example, our website allows for reports to be selected and later be used to generate an aggregate report. To indicate that a report had been selected, we wanted to highlight said report. However, no matter what we tried, we could not find a way to do this, only being able to highlight the first selected report (even though the other selected reports were being correctly added to the set). Eventually, through a lot of trial and error and assistance from a member of the backend sub-team, we were able to achieve what we initially wanted, but at the cost of almost 2 days worth of time. Frontend design, then, became three times more time consuming than we orginally thought.

Another main issue was finding a way to convert the responses we recieved from our API and converting them into a format that we could parse through, extracting the data we needed, or simply changing how the responses were given from the backend in the first place. For example, we chose to use **Axios** to integrate our frontend and backend and part of how Axios works is to add query parameters exactly as they are into the url. This meant that for multi-word queries that involed spaces were added as is. However, having spaces in a url goes against convention and Axios would return an error. By default, Axios would replace spaces with '+', and thus we got around this error by simply changing all the spaces in our parameters through a function in the backend to '+' as well (and vice versa).


### What We Would Do Differently
* What kind of skills you wish you had before the workshop (this way we can try include them in other courses)
    * Would you do it any differently now ?
      * I.e. tools, different technology, time management, etc
      

## Team Organisation

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

We are happy with the work that each member contributed to the project and would consider it to be an equal distribution of effort from everyone involed.
