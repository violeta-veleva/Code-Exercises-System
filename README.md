# Code-Exercises-System
Дипломна работа на Виолета Велева(ЗИКСМ)

##Технологии
<ul>
	<li>
		<a href="https://nodejs.org/download" target="_blank">Node JS</a>
	</li>
	<li>
		<a href="https://www.mongodb.org/downloads">Mongo DB</a>
	</li>
</ul>

##Регистрация на тестов потребител
	<ul>
		<li>
			1. Стартирайте базата : mongod --dbpath {Project_PATH}/data
		</li>
		<li>
			2. Създайте нов потребител : 
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
