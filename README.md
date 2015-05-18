# Code-Exercises-System
Master Thesis - Violeta Veleva 

##Technologies used:
<ul>
	<li>
		<a href="https://nodejs.org/download" target="_blank">Node JS</a>
	</li>
	<li>
		<a href="https://www.mongodb.org/downloads" target="_blank">Mongo DB</a>
	</li>
</ul>

##How to start the system on your computer:
<ul>
	<li>
		1. In the main project folder(the same folder as the "README" file) create a new folder "data"
	</li>
	<li>
		2. Start the database : mongod --dbpath {Project_PATH}/data
	</li>
	<li>
		3. Create new user : 
		<br/>
		cd {MONGODB_DIR} 
		<br/>
		mongo
		<br/>
		use testsystem
		<br/>
		db.users.insert({ username : "admin", password : "123456", role : "admin"})
	</li>
</ul>
##Installation of node_modules
cd {Project_PATH}
<br/>
npm install -save
