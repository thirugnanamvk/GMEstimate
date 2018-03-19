create Database HM_GM ;

Use hm_gm;

CREATE TABLE tbl_ResourceCost (
	Id int not null auto_increment,
	Practice varchar(200) not null,
	Skill varchar(200) not null,
	Competency varchar(200) not null,
	OnsiteCost decimal not null,
	OffsiteCost decimal not null,
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
	OnsiteCost decimal not null,
	OffsiteCost decimal not null,
	CreatedDate datetime not null,
	CreatedBy varchar(200) not null,
	ModifiedDate datetime not null,
	ModifiedBy varchar(200) not null,
	IsActive boolean not null,
    primary key (HistoryId)
 );