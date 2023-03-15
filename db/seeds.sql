-- these values are just intended as initial values so that the functionality of the command prompt app can be properly demonstrated.

INSERT INTO departments (name)
VALUES ("Finance"),
       ("Human Relations"),
       ("Sales"),
       ("Executive Management");

INSERT INTO roles (title, salary, dept_id)
VALUES ("Accountant", 60.0, 1),
       ("Financial Manager", 79, 1),
       ("Party Council Chief", 100.3, 2),
       ("Termination Specialist", 45.0, 2),
       ("Sales Specialist", 31.9, 3),
       ("Sales Manager", 32.0, 3),
       ("Chief Financial Officer", 600.7, 4),
       ("CEO", 999.999, 4);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Smith", 5, 2),
       ("George", "Miller", 6, 4),
       ("Bobby", "Borgeousie", 8, NULL),
       ("Barbar", "Elephant", 2, 5),
       ("Gooby", "Goober", 7, 3);