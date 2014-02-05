COMP4770 Group 5
# USE CASES

## ALL USERS
### Login

**Primary Actor:** All users
**Description:** Participants and Administrators log into the simulation of United Nation Security Council system.
**Notes:** 
	- Currently, the app does not differentiate between Participant users and Administrator users. With future database implementation, this functionality will be implemented easily.
**Stakeholder and Interests:**
	- _All users:_ The user, either an Administrator or Participant, hopes to gain access to the Council system
**Preconditions:**
	- There is an active network connection to the Council system
	- The participant has a valid username/password
**Postconditions:**
	- The participant logs into the Council system.

**Main Success Scenario:**
1. The user navigates their favourite internet browser to the website of the Council system.
2. The system requests that the participant enter his/her username and password before continuing.
3. The participant enters his/her username and password [Alt 1: The participant does know his/her password].
4. The system validates the username and password entered [Alt 2: The participant enters an invalid username and password combination].
5. The system loads participants’ information and current system data/status.
6. The system adds the participant to the list of people currently logged in.

**Alternate Paths:**
**Alt 1:** The participant does know his/her password //to be developed
1.	The participant clicks the “Forgot password” button on the login page
2.	The system displays the “Find password” page 
3.	The participant gets a password
4.	The participant enters his/her username and password
**Alt 2:** The participant enters an invalid username and password combination 
1.	The system displays "Invalid user name or password" and redirects the participant back to login page.

### View active Councils:
**Primary Actor:** All users
**Description:** The user views the currently active Councils
**Notes:**
	- While this use case takes a user to the list of Councils, it does not guarantee that there _are_ any active Councils. Thus, the user may see the statement “There are no active councils.”
**Stakeholder and Interests:**
	- The user, whether they are an Administrator or a Participant, wants to see a list of the active Councils and their status.
**Preconditions:**
	- There is an active network connection to the Council system
	- The user has logged in (see the “Login” use case)
**Postconditions:**
	- The user is viewing the Councils dashboard

**Main Success Scenario:**
	1. The user selects the “Councils” option from the in-page menu

**Alternate Paths:**
None.

## PARTICIPANTS
### Join a Council:
**Primary Actor:** Participants
**Description:** The user joins an active Council
**Notes:**
	- 
**Stakeholder and Interests:**
	- The Participant wants to join an active Council.
**Preconditions:**
	- There is an active network connection to the Council system
	- The user has logged in (see the “Login” use case)
	- The user is viewing the list of active Councils (see the “View Active Councils” use case)
**Postconditions:**
	- The user has joined a Council and can participate in discussion, view the resolutions, view the current participants, etc.

**Main Success Scenario:**
	1. The user selects “Join this Council” from the Council they want to join.

**Alternate Paths:**
None.

### View the agenda, current motion on the table, or the speaker’s list of the Council:
**Primary Actor:** Participants
**Description:** The user views the agenda, current motion, or speaker’s list of the Council
**Notes:**
	- Note that in the Speaker’s List view, national Ambassadors of the Council are bolded.
**Stakeholder and Interests:**
	- The Participant wants to view the agenda, current motion, or speaker’s list of the Council
**Preconditions:**
	- There is an active network connection to the Council system
	- The user has logged in (see the “Login” use case)
	- The user has joined a Council (see the “Join an Active Council” use case)
**Postconditions:**
	- The user is viewing the agenda, current motion, or speaker’s list of the Council.

**Main Success Scenario:**
	1. In the leftmost column of the Council page, the user selects “Agenda”, “Motion”, or “Speaker’s List” from the available options.

**Alternate Paths:**
None.

### View the past debate or a private conversation of a Council:
**Primary Actor:** Participants
**Description:** The user views the past debate or a specific private conversation of the Council
**Notes:**
	- 
**Stakeholder and Interests:**
	- The Participant wants to review the debate that has taken place in a Council or participate in a private conversation
**Preconditions:**
	- There is an active network connection to the Council system
	- The user has logged in (see the “Login” use case)
	- The user has joined a Council (see the “Join an Active Council” use case)
**Postconditions:**
	- The user has reviewed the debate that has taken place in caucus or has viewed a private conversation

**Main Success Scenario:**
	1. In the middle column of the Council page, the user selects “Caucus” or the specific conversation they’re interested in from the list of conversations they are participating in
	2. In the rightmost column of the page, the user can review past debate, where the most recent speeches and events are at the bottom (in caucus) or can see the chat that has taken place between users (in private conversations)

**Alternate Paths:**
None.

### Speak to the Council or a private conversation:
**Primary Actor:** Participants
**Description:** The user submits a speech on the current motion, or messages a private conversation
**Notes:**
	- In future iterations, speaking to a room will depend on preconditions defining the participant’s opportunity/permissions to speak.
**Stakeholder and Interests:**
	- The Participant wants to share their thoughts, opinions, and ideas with the other members of the Security Council in the general caucus or in a private conversation
**Preconditions:**
	- There is an active network connection to the Council system
	- The user has logged in (see the “Login” use case)
	- The user has joined a Council (see the “Join an Active Council” use case)
	- The user is reviewing the debate of a Council or is participating in a private conversation (see the “View the past debate or a private conversation of a Council” use case)
**Postconditions:**
	- The user has submitted a speech for the other members of the Council to read in caucus, or has messaged other members of a private conversation

**Main Success Scenario:**
	1. The user types her/his speech into the text box at the bottom of the rightmost column in the Council view. 
	2. The user selects “Submit”.

**Alternate Paths:**
None.

## ADMINISTRATORS
### Review the status of the Council system:
**Primary Actor:** Administrators
**Description:** The Administrator views the current status of the entire system
**Notes:**
	- 
**Stakeholder and Interests:**
	- The Administrator wants to see the status of the system (e.g., number of rooms, participants, etc.)
**Preconditions:**
	- There is an active network connection to the Council system
	- The Administrator has logged in (see the “Login” use case)
**Postconditions:**
	- The Administrator is viewing the system status

**Main Success Scenario:**
	1. The administrator selects “System Status” from the in-page menu.

**Alternate Paths:**
None.

### Add a new user to the system:
**Primary Actor:** Administrators
**Description:** The Administrator adds a new user to the system
**Notes:**
	- 
**Stakeholder and Interests:**
	- The Administrator wants to add a new user to the system.
**Preconditions:**
	- There is an active network connection to the Council system
	- The Administrator has logged in (see the “Login” use case)
**Postconditions:**
	- The Administrator has added a new user to the system.

**Main Success Scenario:**
	1. The administrator selects “Manage Users” from the in-page menu.
	2. The administrator enters the new user’s Username and Password in the in-page menu, and presses “Accept and Create User”

**Alternate Paths:**
None.

### Manage the active Councils in the system:
**Primary Actor:** Administrators
**Description:** The Administrator views the current Councils of the system in Administrator mode. Here, the Admin can also create new Councils.
**Notes:**
	- 
**Stakeholder and Interests:**
	- The Administrator wants to see the list of active Councils
**Preconditions:**
	- There is an active network connection to the Council system
	- The Administrator has logged in (see the “Login” use case)
**Postconditions:**
	- The Administrator is viewing the Council Management view

**Main Success Scenario:**
	1. The administrator selects “Manage Councils” from the in-page menu.

**Alternate Paths:**
None.

### Create a new Council:
**Primary Actor:** Administrators
**Description:** The Administrator creates a new Council.
**Notes:**
	- Here, the administrator can choose to force users into random teams on joining the Council (“randomly assigned”), or can choose to manually assign members to teams
**Stakeholder and Interests:**
	- The Administrator wants to create a new Council “room”.
**Preconditions:**
	- There is an active network connection to the Council system
	- The Administrator has logged in (see the “Login” use case)
	- The Administrator is in the Council Management view
**Postconditions:**
	- The Administrator has created a new Council that users can join

**Main Success Scenario:**
	1. The administrator enters the Council name and the name of the Administrator responsible in the in-page menu.
	2. The administrator selects the team distribution type for this Council from the available options. 
	3. The administrator selects “Create Council”

**Alternate Paths:**
None.

### View Council status:
**Primary Actor:** Administrators
**Description:** The Administrator views the status of an active Council.
**Notes:**
	- 
**Stakeholder and Interests:**
	- The Administrator wants to view the status of an active Council
**Preconditions:**
	- There is an active network connection to the Council system
	- The Administrator has logged in (see the “Login” use case)
	- The Administrator is in the Council Management view
**Postconditions:**
	- The Administrator is viewing the detailed status of a given Council

**Main Success Scenario:**
	1. The administrator selects the name of the Council they’re interested in.

**Alternate Paths:**
None.

