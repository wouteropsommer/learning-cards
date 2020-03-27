describe('Tests the user login and register mehtods', function() {
    it('app runs', function() {
        cy.visit('http://localhost:4200');
    });

    it("No firstname error", function() {
        cy.visit("/register");
        cy.get("[data-cy=firstname]").clear();
        cy.get("[data-cy=lastname]").click();
        cy.get("[data-cy=firstnameError]").should("be.visible");
      });

      it("No lastname error", function() {
        cy.get("[data-cy=lastname]").clear();
        cy.get("[data-cy=firstname]").click();
        cy.get("[data-cy=lastnameError]").should("be.visible");
      });

      it("No email error", function() {
        cy.get("[data-cy=email]").clear();
        cy.get("[data-cy=firstname]").click();
        cy.get("[data-cy=emailError]").should("be.visible");
      });

      it("No password error", function() {
        cy.get("[data-cy=password]").clear();
        cy.get("[data-cy=firstname]").click();
        cy.get("[data-cy=passwordError]").should("be.visible");
      });

      it("No password confirmation error", function() {
        cy.get("[data-cy=confirmPassword]").clear();
        cy.get("[data-cy=firstname]").click();
        cy.get("[data-cy=confirmPasswordError]").should("be.visible");
      });
      it("wachtwoord komt niet overeen met bevestiging", function() {
        cy.get("[data-cy=password]").type("test123@!");
        cy.get("[data-cy=confirmPassword]").type("test123@!!");
        
        cy.get("[data-cy=passwordConfirmationError]").should("be.visible");
      });

    it("Create new user", function() {
        cy.visit("/register");
        cy.get("[data-cy=firstname]").type("testVoornaam");
        cy.get("[data-cy=lastname]").type("testLastname");
        cy.get("[data-cy=email]").type("testemail@gmail.com");
        cy.get("[data-cy=password]").type("testWachtwoord123!");
        cy.get("[data-cy=confirmPassword]").type("testWachtwoord123!");
        cy.get("[data-cy=register]").click();
        cy.server();
        cy.route({
          method: "POST", 
          url: "/Account/*", 
          response: []
        });
        cy.wait(2000);
        cy.get("[data-cy=logout").click();
        cy.wait(2000);
      });

    it("User can login", function() {
        cy.visit('/login');
        cy.get("[data-cy=email]").type("testemail@gmail.com");
        cy.get("[data-cy=password]").type("testWachtwoord123!");
        cy.get("[data-cy=login]").click();
        cy.wait(2000);
        cy.get("[data-cy=learning]").click();
      });

      it("User can create new folder", function() {
        cy.get("[data-cy=createNewFolder]").click();
        cy.get("[data-cy=insertName]").type("TestFolder");
        cy.get("[data-cy=createFolderButton]").click()
        cy.wait(2000);
      });

  it('mock folder get', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/folder',
      status: 200,
      response: 'fixture:folders.json'
    });
    cy.get('[data-cy=folderTest]').should('have.length', 1);
  });


});