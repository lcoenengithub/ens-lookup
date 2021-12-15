const PORT =
  Cypress.env("TEST_TARGET_PORT") || Cypress.env("PROJECT_PORT_NUMBER");
const TARGET = `http://localhost:${PORT}`;

const EXAMPLE_DOMAIN = "among.eth";
const EXAMPLE_ADDRESS = "0xec886201a7bcd0d26dd036dda4fe07bb4943d1de";

context("Homepage", () => {
  it("should allow ENS lookup", () => {
    cy.visit(`${TARGET}/`).wait(2000);
    cy.get("[data-testid=query]")
      .should("be.visible")
      .click()
      .type(EXAMPLE_DOMAIN);

    cy.get("[data-testid=lookup-button]").should("be.visible").click();

    cy.get("[data-testid=loading]").should("be.visible");

    cy.get("[data-testid=look-up] [data-testid=domain-name]").contains(EXAMPLE_DOMAIN);
    cy.get("[data-testid=look-up] [data-testid=registrant]").contains(EXAMPLE_ADDRESS);
    cy.get("[data-testid=look-up] [data-testid=registration-date]").should('be.visible')
    cy.get("[data-testid=look-up] [data-testid=expiry-date]").should('be.visible')
  });

  it.only('should show history', () => {
    cy.visit(`${TARGET}/`).wait(2000);

    cy.get("[data-testid=registration-stream] [data-testid=domain-name]").should('be.visible')
    cy.get("[data-testid=registration-stream] [data-testid=registrant]").should('be.visible')
    cy.get("[data-testid=registration-stream] [data-testid=registration-date]").should('be.visible')
    cy.get("[data-testid=registration-stream] [data-testid=expiry-date]").should('be.visible')

	cy.get('[data-testid=current-page]').contains('Page 1').should('be.visible');
	cy.get('[data-testid=next-page]').click();
    cy.get("[data-testid=loading]").should("be.visible");
	cy.get('[data-testid=current-page]').contains('Page 2').should('be.visible');
	cy.get('[data-testid=previous-page]').click();
	cy.get('[data-testid=current-page]').contains('Page 1').should('be.visible');

  })

  it("should allow reverse ENS lookup", () => {
    cy.visit(`${TARGET}/`).wait(2000);
    cy.get("[data-testid=query]")
      .should("be.visible")
      .click()
      .type(EXAMPLE_ADDRESS);

    cy.get("[data-testid=lookup-button]").should("be.visible").click();

    cy.get("[data-testid=loading]").should("be.visible");

    cy.get("[data-testid=look-up] [data-testid=domain-name]").contains(EXAMPLE_DOMAIN);
    cy.get("[data-testid=look-up] [data-testid=registrant]").contains(EXAMPLE_ADDRESS);
    cy.get("[data-testid=look-up] [data-testid=registration-date]").should('be.visible')
    cy.get("[data-testid=look-up] [data-testid=expiry-date]").should('be.visible')
  });
});
