//Note: Tests only work in the "Postman" application and the environment therein
//the syntax in this document is specific to that application

//INPUT PARAMETERS:
// n:5
// location:1566083
// key_terms:death, hello
// date:2018-12-07

pm.test("Lookup for username", function () {
    pm.expect(pm.response.text()).to.include("username");
});
pm.test("Lookup for disease", function () {
    pm.expect(pm.response.text()).to.include("disease");
});
pm.test("Lookup for date", function () {
    pm.expect(pm.response.text()).to.include("date");
});
pm.test("Lookup for location", function () {
    pm.expect(pm.response.text()).to.include("location");
});
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
