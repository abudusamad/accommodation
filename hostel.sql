CREATE TABLE Rooms (
  RoomID serial PRIMARY KEY,
  "1_in_a_Room" int,
  "2_in_a_Room" int,
  "3_in_a_Room" int,
  "4_in_a_Room" int,
  Hostel_ID serial
);

CREATE TABLE Manager (
  ManagerID serial PRIMARY KEY,
  Username varchar(10),
  Password varchar(10)
);

CREATE TABLE Admin (
  AdminID serial PRIMARY KEY,
  Username varchar(10),
  Password varchar(10)
);

CREATE TABLE Student (
  studentID serial PRIMARY KEY,
  Username varchar(100),
  Password varchar(100)
);

CREATE INDEX Student_Username_Password ON Student (Username, Password);

CREATE TABLE "User" (
  UserID serial PRIMARY KEY,
  Password boolean,
  ManagerID serial,
  AdminID serial,
  studentID serial,
  CONSTRAINT FK_User_ManagerID
    FOREIGN KEY (ManagerID)
      REFERENCES Manager(ManagerID),
  CONSTRAINT FK_User_AdminID
    FOREIGN KEY (AdminID)
      REFERENCES Admin(AdminID),
  CONSTRAINT FK_User_studentID
    FOREIGN KEY (studentID)
      REFERENCES Student(studentID)
);

CREATE INDEX User_UserID_Password_ManagerID_AdminID_studentID ON "User" (UserID, Password, ManagerID, AdminID, studentID);

CREATE TABLE Manager_Info (
  manager_email varchar(30) PRIMARY KEY,
  First_name varchar(20),
  Last_name varchar(20),
  phone_number varchar(20)
);

CREATE TABLE Hostel (
  Hostel_ID serial PRIMARY KEY,
  Name varchar(30),
  Location point,
  Type varchar(7),
  Description text,
  Price float,
  Contact_info varchar(20),
  ModeID serial,
  ManagerID serial,
  FOREIGN KEY (ModeID)
    REFERENCES Mode_of_Payment(ModeID),
  FOREIGN KEY (ManagerID)
    REFERENCES Manager(ManagerID)
);

CREATE TABLE Mode_of_Payment (
  ModeID serial PRIMARY KEY,
  Bank_Account varchar(30),
  Momo_MTN varchar(10),
  Momo_Vodafone varchar(10),
  Paypal varchar(10),
  Cash int
);

CREATE TABLE Price (
  PriceID serial PRIMARY KEY,
  "1_in_a_Room" float,
  "2_in_a_Room" float,
  "3_in_a_Room" float,
  "4_in_a_Room" float
);

CREATE INDEX Price_PriceID_1_in_a_Room_2_in_a_Room_3_in_a_Room_4_in_a_Room ON Price (PriceID, "1_in_a_Room", "2_in_a_Room", "3_in_a_Room", "4_in_a_Room");

CREATE TABLE Entity (
  RoomID serial,
  PriceID serial,
  CONSTRAINT FK_Entity_RoomID
    FOREIGN KEY (RoomID)
      REFERENCES Rooms(RoomID),
  CONSTRAINT FK_Entity_PriceID
    FOREIGN KEY (PriceID)
      REFERENCES Price(PriceID)
);
