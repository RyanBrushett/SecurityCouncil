# Users Vote on Ambassador:
- A user logs into the system and navigates to the SCSS to which they are registered.
- They locate their team in the list and select it.
- On their team page, they are given the option to vote on an ambassador.
- Other users that are part of that country log in, go to their Country view, and select an ambassador preference.
- When a majority of members of that country select a particular person to be their "preferred" ambassador, that person becomes the ambassador. 
### For example:
- ryanb // password logs in, navigates to Political Science 2200, and selects his team, Argentina. He votes for ryanb.
- gwyn // password logs in, navigates to Political Science 2200, and selects her team, Argentina. She votes for reedb.
- reedb // password logs in,  navigates to Political Science 2200, and selects his team, Argentina. He votes for ryanb.
- ryanb is now the ambassador of the SCSS.
### How it Works:
- When a user submits their vote, a form submission containing their vote is forwarded to the participant.js route.
- This controller sets the user's ambassador preference and calls country.updateAmbassador().
- The updateAmbassador algorithm checks each users preferences for ambassadors and, once a majority of the team members have preferences, the appropriate user is elected to ambassador.

# Users Selecting Team Preferences:
- TODO: