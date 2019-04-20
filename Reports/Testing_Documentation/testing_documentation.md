# Testing Information

## Testing Process

## Technologies Used within Testing (Testing Environment, Tools and Limitations)

**Postman** was the environment the team decided to use for testing. Postman is a collaborative API testing and development environment, and was suggested to us for use by our Mentor. Upon research of the application, it seemed to perfectly suit our requirements for what we needed the application for. Postman allows the team to work cooperatively to write tests for the API, and all the tests and outputs for the API are contained in a single workspace. 
Another alternative we were considering was **SoapUI** which has most of the same functionality as Postman, however Postman appeared to be the easier to use of the two, having a smaller, more focused set of features that better suited our project and it's timeline. The team has been very happy with Postman so far, and it has integrated well into our workflow and project.

## Overview of Test Cases, Test Data and Test Results

### API Testing

We used a broad spectrum of errors in our tests for the API, via the resources made available to us by Postman. We were able to fetch and analyse the responses from our API using simple javascript scripts and Postman would allow us to easily generate, categorise and view test results. We sorted the tests function-by-function, and within each of these subsets we first tested the success case for each function (i.e. How we intended for them to be used), and then a variety of failed test cases according to what we thought would be prudent to test. For each test, due to the consistency of our API functions' structures, we tested generic cases for each function. These cases included the results when certain parameters were omitted or when queries had invalid paramaters.

When we tested, we searched for server response codes and keywords in the JSON response that would only have appeared if the test had given the desired results. Thus our tests for the successful cases could be quite long-winded as they ensured each JSON value matched the correct input parameter, and the fail tests were much shorter by comparison since they only searched for the desired error message.

One of our major limitations was our inability to manipulate the testing environemnt as we wished. This was prominent when we tested "get" and quite inconvenient when we tested "delete". The "get" test ideally would have involved the manual creation of one or more specific reports (using the "create" function) which we would then retrieve, however Postman made it quite difficult to incorporate multiple API fetches while testing, so we were limited to retrieving a random pre-existing report with an arbitrary ID, as opposed to one we could have modified ourselves. With "delete", since we were unable to create a new report in this test, we had to again use a random report to test on, however this was quite problematic as we could only test each report once before it was deleted (on the successful tests of delete), and thus we either needed to constantly modify the test to delete a new report before it worked, or we had to create a new report with that same ID. This test ultimately was not self-contained, and thus became quite tedious to maintain as a result of our limitations.

As a result of our testing, we discovered a few mistakes with some of our error outputs, namely some spelling errors and some messages being attributed to the wrong errors, which we were able to rapidly rectify. Additionally, the API was frequently returning an "Internal Server Error" which illuminated an error with a null access in the back end that was then fixed.

### Platform Testing

We rigorously tested our platform on-site rather than creating specific test scripts for them to follow. This was largely due to the fact that with each consequent error, the changes we made to fix them would often lead to such a large-scale change in our code or overall website structure, especially on the front-end, that we didn't think any meaningful scripts would remain relevant for any significant period of time.

A large portion of our testing was concentrated on ensuring successful interaction with the front end and back end, and these tests informed us of several issues involving CORS, as well as the format of some our paramaters in our API queries. We had initially organised the queries to accept spaces, however REACT, which comprised our front end, refused to pass them in without encoding them to either '+' or '%20', and thus we needed to decode these inputs on the front end in order to successfully call the API.
