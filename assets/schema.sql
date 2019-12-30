* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) 

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30)
  * **salary** -  DECIMAL
  * **department_id** -  INT 
    --hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30)
  * **last_name** - VARCHAR(30)
  * **role_id** - INT 
    --hold reference to role employee has
  * **manager_id** - INT 
    --hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager