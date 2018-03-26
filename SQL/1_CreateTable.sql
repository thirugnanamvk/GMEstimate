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
	Contengency decimal(10,2) not null,
	HoursInDay decimal(10,2) not null,
	DaysInWeek decimal(10,2) not null,
	DaysInMonth decimal(10,2) not null,
	WeeksInMonth decimal(10,2) not null,
	DollarValueInINR decimal(10,2) not null,
	IsActive boolean not null,
    primary key (Id)
 );
 
 INSERT INTO tbl_GM_Defaults (Contengency, HoursInDay ,DaysInWeek, DaysInMonth, WeeksInMonth, DollarValueInINR, IsActive) VALUES ('15','8.75','5','21','4.2','65', True);
 
 CREATE TABLE tbl_useraccess (
	Id int(11) NOT NULL AUTO_INCREMENT,
	Username varchar(100) NOT NULL,
	IsAdmin tinyint(4) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8; 