Feature: RP Launches API Test with Authorization

  Background:
    Given I am authorized user with a project "hr_atm_project"

  Scenario: Get List of All Launches
    When I get the list of all launches
    Then I should get a successful response
    And response should be an array

  Scenario Outline: Start Launch Analysis
    When I start launch analysis for launch number <launch_number>
    Then I should get a successful response

    Examples:
      | launch_number |
      | 131 |
      | 132 |
      | 133 |

    @process-demo-data
  Scenario: Compare launches and ensure response status is 200
    When I compare two different launches
    Then I should get a successful response

