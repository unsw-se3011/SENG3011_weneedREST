//Note: Tests only work in the "Postman" application and the environment therein
//the syntax in this document is specific to that application

//INPUT PARAMETERS:
// headline:TANZANIA - Anthrax kills two people in northern Tanzania
// main_text:2 people died and 8 others were hospitalized following an anthrax outbreak...
// disease:death
// event-type:death
// longitude:1566083
// number-affected:Two
// date:2018-12-10T23:50:00
// syndrome:
// comment:
// url:funnny.com
// date_of_publication:2018-12-01T23:20:00
// latitude:1231412
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});
pm.test("Body matches string", function () {
    pm.expect(pm.response.text()).to.include("number of people affected invalid literal for int() with base 10: 'Two'");
});