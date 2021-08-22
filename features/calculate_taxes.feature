Feature: Calculate taxes   

    The app should calculate freanch taxes

    Scenario: Single person with 32K
    Given a family composed of 1 part and has an income of 32000 
    When he uses the calculator
    Then taxes should be 3617
    
    Scenario: Couple with 2 children and with 55k
    Given a family composed of 3 parts and has an income of 55950
    When he uses the calculator
    Then taxes should be 2833
