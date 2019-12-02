Feature: Delete a Product

  Background:
    Given I start my App
    When on the category list: I press on "The Flat Screens category"
    When on the category product list: I press on "The first Product"
    When on the product: I add the displayed product to the cart
    When on the product: I toggle the cart
    When on the cart: I press on the edit button
    When on the cart: I press on the delete button of item 0

  Scenario: Cancel delete
    When on the dialog: I press cancel on the confirmation dialog
    Then on the cart: I should see some products in my cart

  Scenario: Delete the product
    When on the dialog: I press delete button on the confirmation dialog
    Then on the cart: I should not see the deleted item "HT-1254" in the cart
