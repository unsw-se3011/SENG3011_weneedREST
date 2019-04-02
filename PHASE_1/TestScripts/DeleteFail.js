//Note: Tests only work in the "Postman" application and the environment therein
//the syntax in this document is specific to that application

//INPUT PARAMETERS:
// id:31114


pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});
//EDIT THIS LATER TO REFLECT APPROPRIATE ERROR
pm.test("Body matches string", function () {
    pm.expect(pm.response.text()).to.include("No report to be found");
});