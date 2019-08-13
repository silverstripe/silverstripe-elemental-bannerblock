@javascript
Feature: Add link to banner block
  As a CMS user
  I want to add link to banner blocks
  So that my banners can have calls to actions

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "image" "Uploads/folder1/file1.jpg"
      And a "page" "Blocks Page" with a "Alice's Block" banner element with "Alice's sample content" content
    Given I am logged in with "ADMIN" permissions
      And I go to "/admin/pages/edit/show/6"
      And I wait until I see the ".element-editor__element" element
    Then I should see "Alice's Block"

  Scenario: I can clear and add a call to action link in a banner block
    When I see a list of blocks
      And I should see block 1
      And I click on block 1
    Then I should see the edit form for block 1
      And I should see "Call to action link"
      And I should see "Link to home page"
    When I press the "Clear link" button in the actions menu for call to action link in block 1
      And I press the "Save" button in the actions menu for block 1
      And I wait 1 second
      And I click on block 1
    Then I should see the edit form for block 1
      And I should see "Call to action link"
      And I should see "Add link"

    When I click "Add link" in the ".block-link-field" element
      And I wait 1 second
    Then I should see a modal titled "Call to action link"
      And the "Select a page" field should contain ""
      And the "Link text" field should contain ""
      And the "Link description" field should contain ""
      And the "Open in new window/tab" checkbox should be unchecked

    When I select "About Us" in the "#Form_editorInternalLink_PageID_Holder" tree dropdown
      And I fill in "Click Me" for "Link text"
      And I press the "Insert link" button
    Then I should see "Changes will be visible upon save"

    When I press the "Save" button
      And I wait 1 second
      And I click on block 1
    Then I should see "Click Me"
      And I should see "about-us"
