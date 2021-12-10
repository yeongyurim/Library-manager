CREATE TABLE MEMBER
(
  LIBRARY_ID           varchar(8 ) NOT NULL PRIMARY KEY,
  NAME                 varchar(50) NOT NULL,
  SEC_MOBILE_PHONE1    varchar(4)  NOT NULL,
  SEC_MOBILE_PHONE2    varchar(4)  NOT NULL,
  SEC_MOBILE_PHONE3    varchar(4)  NOT NULL,
  SEC_PASSWORD         varchar(20) NOT NULL,
  SEC_EMAIL            varchar(50) NOT NULL,
  MEMBERSHIP_FLAG      varchar(100 ),
  MEMBERSHIP_GROUP     varchar(50 ),
  MEMBERSHIP_LENDWEEK  varchar(2 ),
  REMARK               varchar(1000 ),
  MEMBERSHIP_DELAY     varchar(2 ),
  DELETE_FLAG          varchar(1 ),
  INSERT_DATE          DATE,
  INSERT_USER_ID       varchar(10 ),
  UPDATE_DATE          DATE,
  UPDATE_USER_ID       varchar(10 ),
  FAMILY               varchar(100 )
)
