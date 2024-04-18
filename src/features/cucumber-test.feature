Feature: RP Launches API Test with Authorization

  Scenario: Get List of All Launches
    Given I am authorized user with a project "hr_atm_project"
    When I get the list of all launches
    Then I should get a successful response
    And response should be an array

  Scenario: Start Launch Analysis
    Given I am authorized user with a project "hr_atm_project"
    When I start launch analysis for launch number 131
    Then I should get a successful response

  Scenario: Compare launches and ensure response status is 200
    Given I am authorized user with a project "hr_atm_project"
    When I compare two different launches
    Then I should get a successful response

