create Database HM_GM ;

Use hm_gm;

CREATE TABLE tbl_ResourceCost (
	Id int not null auto_increment,
	Practice varchar(200) not null,
	Skill varchar(200) not null,
	Competency varchar(200) not null,
	OnsiteCost decimal(10,2) not null,
	OffshoreCost decimal(10,2) not null,
	CreatedDate datetime not null,
	CreatedBy varchar(200) not null,
	IsActive boolean not null,
    primary key (Id)
 );

 CREATE TABLE tbl_ResourceCost_History (
	HistoryId int not null auto_increment,
	Practice varchar(200) not null,
	Skill varchar(200) not null,
	Competency varchar(200) not null,
	OnsiteCost decimal(10,2) not null,
	OffshoreCost decimal(10,2) not null,
	CreatedDate datetime not null,
	CreatedBy varchar(200) not null,
	ModifiedDate datetime not null,
	ModifiedBy varchar(200) not null,
	IsActive boolean not null,
    primary key (HistoryId)
 );
 
 
 CREATE TABLE tbl_GM_Defaults (
	
	Id int not null auto_increment,
	
	PropertyName varchar(200) not null,
	
	PropertyValue varchar(200) not null,
	
	IsActive boolean not null,
 
	primary key (Id)
 
);
 
INSERT INTO tbl_GM_Defaults (PropertyName ,PropertyValue ,IsActive) values ("Contengency","15",1);
 
INSERT INTO tbl_GM_Defaults (PropertyName ,PropertyValue ,IsActive) values ("HoursPerDayOffShore" ,"8.75",1);
 
INSERT INTO tbl_GM_Defaults (PropertyName ,PropertyValue ,IsActive) values ("HoursPerDayOnSite" ,"8",1);
 
INSERT INTO tbl_GM_Defaults (PropertyName ,PropertyValue ,IsActive) values ("DaysPerWeek", "5",1);
 
INSERT INTO tbl_GM_Defaults (PropertyName ,PropertyValue ,IsActive) values ("DaysPerMonth", "21",1);
 
INSERT INTO tbl_GM_Defaults (PropertyName ,PropertyValue ,IsActive) values ("WeeksPerMonth", "4.2",1);
 
INSERT INTO tbl_GM_Defaults (PropertyName ,PropertyValue ,IsActive) values ("DollarValueInINR", "65",1); 

 
 CREATE TABLE tbl_useraccess (
	Id int(11) NOT NULL AUTO_INCREMENT,
	Username varchar(100) NOT NULL,
	IsAdmin tinyint(4) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8; 