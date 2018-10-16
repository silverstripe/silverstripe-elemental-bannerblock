@unsavedChanges
@javascript
Feature: View types of elements in a report
  As a CMS user
  I want to view a list of elements in the CMS
  So that I can see which elements I have used on a page

  Background:
    Given I add an extension "DNADesign\Elemental\Extensions\ElementalPageExtension" to the "Page" class
      And a "image" "Uploads/folder1/file1.jpg"
      And a "image" "Uploads/folder1/file2.jpg"
      And a "page" "Blocks Page" with a "Alice's Block" banner element with "Alice's sample content" content
      And a "page" "Blocks Page" with a "Bob's Block" banner element with "Some content II" content

    Given I am logged in with "ADMIN" permissions
      # Replace with 'And I click "Blocks Page" in the ".breadcrumbs-wrapper" element' once the ElementalArea refreshes,
      # See https://github.com/dnadesign/silverstripe-elemental/issues/320
      And I go to "/admin/pages/edit/show/6"
      And I wait until I see the ".element-editor__element" element
    Then I should see "Alice's Block"

  Scenario: I can see the title and summary of each element
    When I see a list of blocks
    Then I should see a list of blocks
      And I should see "Alice's Block" as the title for block 1
      And I should see "Alice's sample content" as the summary for block 1
      And I should see the thumbnail image for block 1

    Scenario: I can add elements to the page
    When I see a list of blocks
    Then I press the "Add block" button
      And I press the "Banner" button in the add block popover
      And I wait 1 second
      And I fill in "Additional Banner Block" for "Title"
      And I fill in the "Content" HTML field with "<p>Additional sample content</p>"
      And I press the "Add from files" button
      And I select the file named "folder1" in the gallery
      And I click on the file named "file1" in the gallery
      And I press the "Insert" button
      # Sometimes behat can be quicker than the time it takes the JS to remove the modal...
      And I wait 1 second
      And I press the "Create" button
    Then I should see a "Saved banner" message

    When I go to "/admin/pages/edit/show/6"
      And I see a list of blocks
      And I wait 1 second
    Then I should see "Additional Banner Block"
      And I should see the thumbnail image for block 3

    Scenario: I can edit a block
    Given I see a list of blocks
      And I should see block 1
      And I click on block 1
    Then I should see "Alice's Block"
      And the "Content" field for block 1 should contain "Alice's sample content"

    Given I fill in "Eve's Block" for "Title" for block 1
    Given I fill in "<p>New sample content</p>" for "Content" for block 1
      And I wait 1 second
      And I press the "Add from files" button
      And I select the file named "folder1" in the gallery
      And I click on the file named "file2" in the gallery
      And I press the "Insert" button
      # Sometimes behat can be quicker than the time it takes the JS to remove the modal...
      And I wait 1 second
    When I press the "Save" button in the actions menu for block 1
      And I wait 1 second
    Then I should see a "Saved 'Eve's Block' successfully" notice
#

  @modal
  Scenario: I can archive a block
    When I see a list of blocks
      And I press the "View actions" button
    Then I should see the archive button for block 1
    When I press the "Archive" button
      And I see the text "Are you sure you want to send this block to the archive?" in the alert
      And I confirm the dialog
      # Sometimes behat can be quicker than the time it takes the JS to remove the row...
      And I wait 1 second
      And I see a list of blocks
    Then I should see "Bob's Block"
      But I should not see "Alice's Block"

  Scenario: I can see the block type when I hover over an element's icon
    Given I wait until I see the ".element-editor__element" element
    When I hover over the icon of block 1
      # Sometimes behat can be quicker than the time it takes the JS to render the tooltip...
      And I wait 1 second
    Then I should see text matching "Banner"
