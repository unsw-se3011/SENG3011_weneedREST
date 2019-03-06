## Design Details

### 1. Describe how you intend to develop the API module and provide the ability to run it in Web service mode

The API module will be developed on our local machines using GitHub as a source control tool. GitHub was chosen as the source control to be used as it is formally required in the specification, but is also the most ubiquitous and common source control within the industry. As such, there really wasn't much consideration of any other alternatives, since Github was required and provided everything we needed from the source control system.

In terms of hosting the API for the web service mode, we have chosen to use DigitalOcean. The main reason for this choice is the fact that our team has $50 worth of credit free for DigitalOcean included within our Github Student pack, and as a result makes this a very cost-effective solution for us. This is especially important since our team are all full-time university students, and thus do not have the budget to spend on an expensive hosting solution. Another reason for this choice is the ease and simplicity of use that DigitalOcean offers. Compared to a similar cloud hosting service such as AWS or Microsoft Azure, Digital Ocean seems to be much easier to get started with and has a much smoother learning curve. This point is particularly important, since no one in the group has had significant experience with web hosting on cloud-based services.

Notes (remove later):
* Something about DigitalOcean hosting
* Cost effective with the Github something
* Talk about branching github, workflow, why did you pick Github and DigitalOcean hosting

### 2. Discuss your	current thinking about how parameters	can	be passed to your	module and how results are collected. Show an example	of a possible	interaction.

#### API Endpoints
List all reports
- **[<code>GET</code> reports](https://github.com/)**

Find all reports matching the query values
- **[<code>GET</code> reports?{location}&{key_terms}&{date}](https://github.com/)**

Deletes a report
- **[<code>DELETE</code> reports/\{id\}](https://github.com/)**

Updates an existing report with form data
- **[<code>POST</code> reports/\{id\}](https://github.com/)**

Updates an existing report
- **[<code>PUT</code> reports/\{id\}](https://github.com/)**

Notes (remove later):
* Have a terminal log curl [website] and mark up the expected response
* Justify every api endpoint and explain its use

### 3. Present and justify implementation	language,	development	and	deployment environment (e.g. Linux,	Windows) and specific	libraries	that you plan to use.

Notes  (remove later):
* More stuff needed
* Needs more revision

#### Implementation language

* Flask-Restplus is a lightweight, Python web framework that offers the same minimalistic canvas more suited towards a contained web API that we are designing. It is very simple to use with its fast debugger and offers a comprehensive set of documentation and example code. Furthermore, the amount of time needed for the project is short and the team is experienced with using Flask so less time is spent learning. Flask-Restplus offers automatic swagger API documentation.

* React has been used for the front-end of the application due to its speed and flexibility. React is able to integrate APIs directly into the front-end, which simplifies the development of our application significantly. React is also extremely well documented, which has allowed our team to pick up this relatively new technology quite quickly and be able to use it’s many benefits within our development.

#### Development and deployment environment

* For storage of the outbreak data, we have chosen to use a JSON file instead of storing the data in a database. The main reason for this decision was our groups fairly limited knowledge of databases, which would increase the development time and learning curve without necessarily providing any tangible benefits to our API. This was also recommended by our mentor. As a result, the web scraper will be run manually at a specified interval, with the outbreak data being stored in a JSON file which is subsequently accessed by the API.

#### Specific libraries used

* The Python Scrapy library was used for the initial web scraping application. Scrapy allowed us to quickly and easily set up the web scraper that we used to scrape information from the Global Incident Map website. Since this was only the initial part of our task, it was decided to use this this library in order to avoid us having to spend more time creating it. Scrapy is also a well documented and widely used library that is publically available, which made development significantly easier.
