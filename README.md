# WEB102-PROJECT-III
Searching for Books API + Ban List
Author: Trinity Dhillon
Time: 5 hours

Required Features:

The following required functionality is completed:

 Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data

The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a cat API, and display the color, breed, and age in response to an initial API call, subsequent button clicks should also result in the color, breed, and age being displayed)

 Only one item/data from API call response is viewable at a time and at least one image is displayed per API call

A single result of an API call is displayed at a time

Displayed attributes should match the displayed image (i.e., if showing a picture of a Siamese cat and the attribute breed, the displayed breed should be 'Siamese' not 'Ragdoll' or another breed that doesn't match)

There is at least one image per API call

 API call response results should appear random to the user

Clicking on the API call button should generate a seemingly random new result each time

Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
 Clicking on a displayed value for one attribute adds it to a displayed ban list

At least one attribute for each API result should be clickable
Clicking on a clickable attribute not on the ban list, should imnmediately add it to the ban list

Clicking on an attribute in the ban list should immediately remove it from the ban list

 Attributes on the ban list prevent further images/API results with that attribute from being displayed

Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using a cat API, if the ban list includes the value 'Siberian' for the breed attribute, clicking on the Discover button should never result in a Siberian cat being displayed)

Note: More attribute values on the ban list may result in a higher frequency of repeat results

[img src](https://submissions.us-east-1.linodeobjects.com/web102/S9FaGpg6.gif)
