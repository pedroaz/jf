# Goal

App for presentation. I will present it in my company weekly.

React app built with next.

So this nextjs app will have different routes.

It will be interactive, meaning that the admin will pop data, things will change on the screen.
The audience will also contribute and things will change.

The setup:
We are doing a new greenfield project, I am going to present the things related to the project.
Like this new way of doing project at BB.
Trying to do spec development
Define / design / test / infrastructure setup
Meanwhile feature requirement
Implement with high automation
Repeat

The project is for FIP (FRÄNKISCHE Industrial Pipes)
Internal ERP system. We are tacling time tracking module first.
Azure, C# all the good stuff.

## Style:
White / Light theme.
Font in black.
Style for components like buttons:
- Yellow: #FBCB12
- Pink: #BB256A
- Blue: #1E11655
- Green: #1A3B40

Need to work both mobile and web


## Route /presentation/1
Showing the title of the presentation in a centralized way. The date 22.10.2025. With a next button top right

## Route /presentation/2
A message of sorry to Maike that I did not use the PPT tempalte.
Next button at top right

## Route /presentation/3
One slide showing the current project setup (What the project is about and which techiniques we are thinking to implement).
Here cards will be added on the screen when I start talking about them. The card appearance will be controlled by the admin screen. 
It will be a grid with two columns.
Top button top right

## Route /presentation/4
A big QR code leading people to the /input page
Button top right to next

## Route presentation/5
Page displaying the inputs from people in cards (with their name on top)
Button top right to next

## Route presentation/6
Animation that will pick one of the inputs from people and display the winner.
A LLM call with the whole context / inputs will be make to define the winner.

## Route admin/
Screen where I will be able to keep making the cards appear. So here I have all the cards and when I click on them they get added to the state

## Route input/
Name, idea for the project

# State management
Every half of second, a call is make to the next backend getting the state.

The state should show
- Which cards to display in the /presentation/6 page
- What is the winner

# Winner
The call will be made on the backend using claude API and an Anthropic key. It should use opus.




