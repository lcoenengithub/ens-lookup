const PORT =
  Cypress.env("TEST_TARGET_PORT") || Cypress.env("PROJECT_PORT_NUMBER");
const TARGET = `http://localhost:${PORT}`;

const EXAMPLE_DOMAIN = "among.eth";
const EXAMPLE_ADDRESS = "0xec886201a7bcd0d26dd036dda4fe07bb4943d1de";
const EXAMPLE_REGISTRANT = "0xec886201a7bcd0d26dd036dda4fe07bb4943d1de";

context("Homepage", () => {
  it("should allow ENS lookup", () => {
    cy.visit(`${TARGET}/`).wait(2000);
    cy.get("[data-testid=query]")
      .should("be.visible")
      .click()
      .type(EXAMPLE_DOMAIN);

    cy.get("[data-testid=lookup-button]").should("be.visible").click();

    cy.get("[data-testid=loading]").should("be.visible");

    cy.get("[data-testid=address]").contains(EXAMPLE_ADDRESS);
    cy.get("[data-testid=registrant]").contains(EXAMPLE_REGISTRANT);
    cy.get("[data-testid=registration-date]").should('be.visible')
    cy.get("[data-testid=expiry-date]").should('be.visible')
  });
});
