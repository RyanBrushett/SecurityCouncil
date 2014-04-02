# Weighted Team Preference:

- A user has three preferences when signing up for an account. They must pick three different ones and will be warned if they don't.
- Upon creating a simulation, the moderator selects an "ideal" number of participants. This is not a rigid number and can be approximate. This is used later to derive what a full team should be. A good guideline would be class size divided by 15 (num participants / num teams).
- Users joins a simulation by logging in and finding the simulation that they are not a part of. Clicks the simulation and joins. They are assigned a team.

### How it works:

- The system checks his first preference with the number of people in his/her first preference team/country. If the the number of users in the country is less than the ideal number derived from the approx. team size set by the mod, add user to that country, else perform this step again using the the user's second preference (same for third preference)
- If the users can not be placed in his/her third preference, the system iterates through all countries (starting at a random point). If the number of people in that country is less than the ideal number, add user to that team.
- If all countries are full (worst case scenario) add the user to any random country.

- - -

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

### How it works:
- When a user submits their vote, a form submission containing their vote is forwarded to the participant.js route.
- This controller sets the user's ambassador preference and calls country.updateAmbassador().
- The updateAmbassador algorithm checks each users preferences for ambassadors and, once a majority of the team members have preferences, the appropriate user is elected to ambassador.
