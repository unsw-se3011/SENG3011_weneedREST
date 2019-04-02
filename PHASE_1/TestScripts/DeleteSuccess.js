//Note: Tests only work in the "Postman" application and the environment therein
//the syntax in this document is specific to that application

//INPUT PARAMETERS:
// id:49

//Ensure server is refreshed before running test
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Deleted report", function () {
    pm.expect(pm.response.text()).to.include("deleted report ");
});
