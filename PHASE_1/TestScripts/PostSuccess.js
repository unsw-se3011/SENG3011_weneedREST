//Note: Tests only work in the "Postman" application and the environment therein
//the syntax in this document is specific to that application

//INPUT PARAMETERS:
// headline:TANZANIA - Anthrax kills two people in northern Tanzania
// main_text:2 people died and 8 others were hospitalized following an anthrax outbreak...
// disease:death
// event-type:death
// longitude:1566083
// number-affected:2
// date:2018-12-10T23:50:00
// syndrome:
// comment:
// url:funnny.com
// date_of_publication:2018-12-01T23:20:00
// latitude:1231412
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Correct headline", function () {
    pm.response.to.be.ok;
    pm.expect(pm.response.text()).to.include("TANZANIA - Anthrax kills two people in northern Tanzania");
});
pm.test("Correct main_text", function () {
    pm.response.to.be.ok;
    pm.expect(pm.response.text()).to.include("2 people died and 8 others were hospitalized following an anthrax outbreak...");
});
pm.test("Correct disease", function () {
    pm.response.to.be.ok;
    pm.expect(pm.response.text()).to.include("death");
});
pm.test("Correct event-type", function () {
    pm.response.to.be.ok;
   pm.expect(pm.response.text()).to.include('death');
});
pm.test("Correct longitude/latitude", function () {
    pm.response.to.be.ok;
    pm.expect(pm.response.text()).to.include(1566083);
    pm.expect(pm.response.text()).to.include(1231412);
});
pm.test("Correct number-affected", function () {
    pm.response.to.be.ok;
    pm.expect(pm.response.text()).to.include(2);
});
pm.test("Correct date", function () {
    pm.response.to.be.ok;
    pm.expect(pm.response.text()).to.include("2018-12-01T23:20:00");
});
pm.test("Correct url", function () {
    pm.response.to.be.ok;
    pm.expect(pm.response.text()).to.include("funnny.com");
});