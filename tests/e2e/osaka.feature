Feature: DuckGoGo Search
  Scenario: Search for Osaka
    Given I visit "https://duckduckgo.com"
    When I type "Osaka" into "q"
    And I click "button[type='submit']"
    Then I should see "大阪"
