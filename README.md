# DíaMayor Innova

<!-- <img src="public/images/Greek-filigree-pattern.png" alt="Greek filigree pattern" width="33%" height="50px"/>-->

**DíaMayor Innova**

The project involves the development, by the students of IES El Rincón, of a cross-platform application that will assist students in the Professional Family of Administration and Management with the modules TEB, TUM, EPE, PNG, and COB in carrying out accounting entries. The application will allow the implementation of aids related to accounting accounts, as well as practical examples based on the proposed activities, which will serve as a guide and support in the learning process. The starting point is the spreadsheet created by the project coordinator. The project aims to create an application that will replace this spreadsheet, enabling its functionality on any mobile device, tablet, or PC.

## Getting Started 🚀

See Installation for instructions on how to deploy the project.

### Pre-requisitos 📋

* **[IDE]** - Integrated Development Environment. In our case, we used Visual Studio Code (https://code.visualstudio.com). It can be downloaded from the official website.

* **[Node]** -  A runtime environment that allows developers to run JavaScript on the server side. We can download it from the official website (https://nodejs.org/en/), it's recommended to use the LTS version.

* **[WSL2]** - Windows Subsystem for Linux 2. is a feature in Windows that allows users to run a full Linux kernel and Linux distributions directly on Windows without the need for virtual machines or dual boot setups. <!-- ¿Es un pre-requisito?, yo diría que si -->

### Installation 🔧

* We open PowerShell as administrator and run the following command to install WSL2.

```
wsl --install
```

* We will continue cloning the repository on our local machine.

```
git clone https://github.com/AlbertoGG20/DiaMayorInnova.git
```

* Open VSCode and navigate to the project folder.

```
cd DiaMayorInnova
```

* From the terminal in VSCode, we navigate to the Frontend folder, install the dependencies, and start the project.

```
cd Frontent/
npm install
npm run dev
```

* We open a terminal 'Ubuntu (WSL)' and navigate to the Backend folder, then install the dependencies.

```
cd Backend/
bundler install
```

* Once the dependencies are installed, we must create a '.env' file in our Backend with the following format inside.

```
DATABASE_USERNAME=nombre
DATABASE_PASSWORD=password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```
The host and port should be 'localhost' and '5432'. The username and password should be the username and password of the local database.

* Once the '.env' file is created in our Backend, we will install the gem that allows us to use it.

```
gem install dotenv
```

* We create the database by running the following command.

```
rails db:create
```

* To run the migration for the table in our Database, we will use the following command:

```
rails db:migrate
```
This command will create the necessary tables for our application to function.

* (OPTIONAL) If we want to have test data in our table, we will execute the following command:

```
rails db:seed
```
This command will insert some records into our Database.

* Now we can start the application server:

```
rails s
```

## Running Tests ⚙️

**¡¡In progress!!**
<!-- You can access the application and use it normally.

* Accessing the application:
    - Go to localhost:5173/
    - Página de inicio

* Creating a new record:
    - Click the button in the navigation navbar located at the top right.
    - Fill out the form and add the new record.
    - If there are no errors, you will be redirected to the list of Paintings.

* Deleting a record:
    - From the list of Paintings, click the "Borrar" button.
    - The record will be removed from the list of Paintings.

**In the artistic universe, each data point has its place and meaning. Do not delete them; remember, art is an act of creation, and each element in our list is part of the story we are telling.**

* Editing an existing record:
    - From the list of Paintings, click the "Editar" button.
    - Modify the fields as desired and click "Editar Obra".
    - If there are no errors, you will be redirected to the list of Paintings. -->

## Built With 🛠️

* [ReactJS] - ReactJS is an open-source JavaScript library used for building user interfaces, particularly single-page applications. It was developed by Facebook and focuses on creating reusable components that manage their own state and update efficiently. Its main feature is the use of a Virtual DOM (Document Object Model), which optimizes UI updates without needing to reload the entire page.
* [RubyOnRails] - Ruby on Rails (or Rails) is a web development framework written in the Ruby programming language. It is designed to make building web applications faster and more efficient, emphasizing conventions over configuration and the "Don't Repeat Yourself" (DRY) principle. Rails follows the MVC (Model-View-Controller) architecture pattern and provides built-in tools to manage databases, routes, and views, allowing developers to focus more on business logic and less on repetitive details.
* [ActiveRecord] - ActiveRecord is a Ruby library that is part of the Ruby on Rails framework and is used for database management. It implements the ORM (Object-Relational Mapping) design pattern, which means it maps database tables to Ruby classes and objects.
* [PostgreSQL] - PostgreSQL is an open-source, powerful relational database management system. It is known for its high compliance with SQL standards and for offering advanced features such as ACID transactions, complex queries, support for geospatial data (through extensions like PostGIS), and the ability to handle large volumes of data. PostgreSQL is ideal for applications that require high performance and reliability, and is used in both small-scale applications and large enterprise environments.

## Autores ✒️
* **Alberto Guerrero Gutiérrez** - *Initial Work* - [AlbertoGG20](https://github.com/AlbertoGG20)
* **Juan Carlos Bolaños Ojeda** - *Initial Work* - [jcbo2425](https://github.com/jcbo2425)
* **Echedey Henríquez Hernández** - *Initial Work* - [EchedeyHenr](https://github.com/EchedeyHenr)
* **Andrés Villanueva** - *ReadMe* - [Villanuevand](https://github.com/Villanuevand)

## Licencia 📄

This project is licensed under the (Your License) - see the [LICENSE.md](LICENSE.md) file for details.

---
⌨️ with ❤️ by [AlbertoGG20](https://github.com/AlbertoGG20), [jcbo2425](https://github.com/jcbo2425), [EchedeyHenr](https://github.com/EchedeyHenr) 😊
