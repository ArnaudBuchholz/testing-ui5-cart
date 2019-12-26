Feature: Products filters

  Background:
	Given I start my App

  Scenario: Set and remove products filter

    When on the category list: I press on "The Flat Screens category"
	Then on the category product list: I should see a filter button

    When on the category product list: I press the filter button
    When on the product filter dialog: I press the availability filtering option
    When on the product filter dialog: I press the available filter
    When on the product filter dialog: I press the discontinued filter
    When on the product filter dialog: I press OK button
    Then on the category product list: I should see the products "HT-1254", "HT-1137"
    Then on the category product list: I should see an availability info toolbar

    When on the category product list: I press the filter button
    When on the product filter dialog: I press the available filter
    When on the product filter dialog: I press the discontinued filter
    When on the product filter dialog: I press OK button
    Then on the category product list: I should see the products "HT-1254", "HT-1255", "HT-1137"
    Then on the category product list: I should not see an info toolbar

    When on the category product list: I press the filter button
    When on the product filter dialog: I press the out of stock filter
    When on the product filter dialog: I press the back button
    When on the product filter dialog: I press the price filtering option
    When on the product filter dialog: I set price filter values from 200 to 500
    When on the product filter dialog: I press OK button
    Then on the category product list: I should see the products "HT-1255"

    When on the category product list: I press the filter button
    When on the product filter dialog: I set price filter values from 500 to 1000
    When on the product filter dialog: I press CANCEL button
    Then on the category product list: I should see the products "HT-1255"

    When on the category product list: I press the filter button
    When on the product filter dialog: I set price filter values from 0 to 5000
    When on the product filter dialog: I press OK button
    Then on the category product list: I should see the products "HT-1255"

    When on the category product list: I press the filter button
    When on the product filter dialog: I press the back button
    When on the product filter dialog: I press reset button
    When on the product filter dialog: I press OK button
    Then on the category product list: I should see the products "HT-1254", "HT-1255", "HT-1137"
