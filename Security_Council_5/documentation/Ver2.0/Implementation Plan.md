# IMPLEMENTATION PLAN
## (Ver2.0)

### Overview
While Version 1.0 was focused on a “proof of concept” for this app, Version 2.0 focused on shoring up our foundations: simplifying and restructuring the backend to facilitate a resilient software design moving forward. 

### Process
Group 5’s iteration 2 plan involves fortifying the foundation we’ve already built, fully implementing the proof-of-concept features we implemented in iteration 1, and preparing to build on top of this with administrator reporting and insights, more polished design, and more robust debate functionality in future versions.

It also involved development of the software requirements (1-9) set out by Dr. Anderson. See below. 

### Tasks
The group completed the following tasks for version 2.0:

#### BACKEND:
	- Implementing a database-oriented design and refining the user/administrator/Council model with these APIs
	- Refining the simulation room model
	- Developing the nation teams model (enabling moderators to select ambassadors based on their own decision-making or participants’ elections)
	- Refining the resolution model with extended support for amendments
	- Refining the user experience: simplifying and building consistency across pages

#### FRONTEND:
//The following requirements adapted from Dr. Anderson’s task descriptions
1. Moderator creates a Security Council Simulation Space (SCSS) - beginning of semester!
2. Simulation participants register for SCSS - couple of days!
3. Moderator designates a Security Council Chairman (the Chair)!
		- Could be a TA, moderator or one of the registered participants!
4. Once the registration deadline passes, participants are divided into teams - couple of days!
		- Participants can indicate their preference for the top three countries!
		- System generates the initial partitioning of participants and forwards it to the moderator.!
		- The moderator can override system's selection!
5. After approval by the moderator, participants are notified about their teams and comembers of their teams!
	- Each team selects an ambassador - day or two!
		- Could be appointed by the moderator!
		- Team members could elect the ambassador!
		- The position of ambassador could rotate among team members!
6. Moderator puts forward a draft resolution, which includes several sub articles - first or second week in the semester!
	Countries/teams prepare internally a position paper to be submitted to the Chair - week or two!
7. Moderator can provide a set of directives to some of the teams!
8. After the deadline passes, position papers are made available to all teams!
		- Moderator and Chair can view the position papers before the deadline!
9.  Teams debate internally and prepare amendments to some/all articles of the resolution - few weeks!