@javascript
Feature: Manage banner blocks
  As a CMS user
  I want to manage banner blocks in the CMS
  So that I can add banners to my content block pages

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

  # The "unsaved changes" dialog causes errors unless this is tagged with "@unsavedChanges"
  @unsavedChanges
  Scenario: I can add elements to the page
    When I see a list of blocks
    Then I press the "Add block" button
      And I press the "Banner" button in the add block popover
      And I wait 5 seconds
    Then I should see "Untitled Banner block" as the title for block 1

    Given I click on block 1
      And I fill in "Additional Banner Block" for "Title" for block 1
      And I fill in "<p>Additional sample content</p>" for "Content" for block 1
      # TODO Test adding files to a banner block via inline editing
    When I press the "Save" button in the actions menu for block 1
      And I wait 1 second
    Then I should see a "Saved 'Additional Banner Block' successfully" notice

    When I click on the caret button for block 1
    Then I should see "Additional sample content"

    When I see a list of blocks
      And I wait 1 second
    Then I should see "Additional Banner Block"
    And I should see "Additional sample content"

     # Uncomment the below once inline editing of files is enabled
     # And I should see the thumbnail image for block 1

  # The "unsaved changes" dialog causes errors unless this is tagged with "@unsavedChanges"
  @unsavedChanges
  Scenario: I can edit a block
    Given I see a list of blocks
      And I should see block 1
      And I should see "Alice's Block" as the title for block 1
      And I should see "Alice's sample content" as the summary for block 1
      And I click on block 1
     Then I should see the edit form for block 1

    Given I fill in "Eve's Block" for "Title" for block 1
      And I fill in "<p>New sample content</p>" for "Content" for block 1
      And I wait 1 second
      # TODO Test adding files to a banner block via inline editing
    When I press the "Save" button in the actions menu for block 1
      And I wait 1 second
    Then I should see a "Saved 'Eve's Block' successfully" notice

  @modal
  Scenario: I can archive a block
    When I see a list of blocks
      And I press the "View actions" button
    Then I should see the archive button for block 1
    When I press the "Archive" button
      And I see the text "Are you sure you want to send this block to the archive?" in the alert
      And I confirm the dialog
      # Sometimes Behat can be quicker than the time it takes the JS to remove the element...
      And I wait 1 second
      And I see a list of blocks
    Then I should see "Bob's Block"
      But I should not see "Alice's Block"

  Scenario: I can see the block type when I hover over an element's icon
    Given I wait until I see the ".element-editor__element" element
    When I hover over the icon of block 1
      # Sometimes Behat can be quicker than the time it takes the JS to render the tooltip...
      And I wait 1 second
    Then I should see text matching "Banner"
