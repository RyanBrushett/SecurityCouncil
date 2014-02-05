# IMPLEMENTATION PLAN
## (Ver1.0)
### Overview
Council is an app  that facilitates critical debate between different stakeholders about different topics. It provides an effective digital simulation of United Nations Security Council meetings. Administrators create and maintain different Councils, while Participants engage in debate about different resolutions with different people in these Councils. 

### Process
To set the foundation for this application, we selected a feature-based approach for this iteration. This is because the basic use cases users of this software would take were highly coupled with the architecture necessary for these use cases to be executed, and as such it was inefficient for each individual team member to take on development of specific use cases.

We set out by focusing on the clients. Incorporating the answers we’ve received to our questions with user experience analysis and design thinking, we drafted a model design for the app’s core functionality: the virtual Council “rooms” themselves. The result of this process was the three-column view you see when you log in and select a room. This user Council Dashboard view selectively displays all relevant data to a member of the Security Council’s negotiating team. This design resulted in clean separations for our team: several members took on the task of developing the chat room itself while the rest developed the system that would manage these Councils for participants and administrators.

Thus, development began, in pursuit of having the following features fully implemented by the Ver1.0 release:
	- Administrators can view and manage ongoing Councils with different user participants
	- Administrators can create a new Council
	- Users can view ongoing Councils
	- Users can join a Council room
	- Users can review the speeches previously made at the Council
	- Users can speak to the Council room on the current Resolution
	- Users can create private conversations with specific other users

The Group 5 development team firmly believes that these features, combined with the user-centred design we developed, provide a powerful foundation for building a highly functional and sophisticated application simulating Security Council debate and negotiations — most importantly, an application that fully satisfies our clients. We are happy to report that each of these features is implemented, and we were able to implement additional functionality in addition. The specific use cases administrators and users can do in Version 1.0 are described fully in “Use Cases”.