CREATE TABLE USER
(
  UNION_ID                  varchar(8 )    NOT NULL PRIMARY KEY,
  passwd                    varchar(20)    NOT NULL,
  KOREAN_NAME               varchar(40 ),
  ENGLISH_NAME              varchar(50 ),
  SEC_RESIDENCE_ID1         varchar(16),
  SEC_RESIDENCE_ID2         varchar(16),
  BELIEVER_BIRTHDAY         varchar(8 ),
  SOLAR_LUNAR_FLAG          varchar(1 ),
  SEX                       varchar(6 ),
  MARRIAGE_FLAG             varchar(1 ),
  SEC_HOME1_PHONE1          varchar(3 ),
  SEC_HOME1_PHONE2          varchar(4 ),
  SEC_HOME1_PHONE3          varchar(4 ),
  HOME2_PHONE1              varchar(3 ),
  HOME2_PHONE2              varchar(4 ),
  HOME2_PHONE3              varchar(4 ),
  SEC_MOBILE_PHONE1         varchar(4 ),
  SEC_MOBILE_PHONE2         varchar(4 ),
  SEC_MOBILE_PHONE3         varchar(4 ),
  ZIP_CODE                  varchar(7 ),
  BELIEVER_ADDRESS1         varchar(200 ),
  BELIEVER_ADDRESS2         varchar(150 ),
  SEC_E_MAIL                varchar(50 ),
  FINAL_SCHOLARSHIP         varchar(6 ),
  DEGREE_SCHOLARSHIP        varchar(30 ),
  GRADATION_DATE            varchar(8 ),
  SCHOOL_NAME               varchar(50 ),
  ACADEMIC_DEGREE           varchar(6 ),
  WORK                      varchar(30 ),
  WORK_NAME                 varchar(50 ),
  WORK_DUTY                 varchar(30 ),
  WORK_PHONE1               varchar(3 ),
  WORK_PHONE2               varchar(4 ),
  WORK_PHONE3               varchar(4 ),
  WORK_PHONE_EXT            varchar(4 ),
  DIRECT_PHONE1             varchar(3 ),
  DIRECT_PHONE2             varchar(4 ),
  DIRECT_PHONE3             varchar(4 ),
  DIRECT_PHONE_EXT          varchar(4 ),
  WORK_ZIP_CODE             varchar(7 ),
  WORK_ADDRESS1             varchar(80 ),
  WORK_ADDRESS2             varchar(150 ),
  PERSONAL_PHOTO_LOGICAL    varchar(100 ),
  PERSONAL_PHOTO_PHYSICAL   varchar(100 ),
  PASTOR_ID                 varchar(6 ),
  EMPLOYEE_ID               varchar(6 ),
  LIBRARY_ID                varchar(8 ),
  BOOKSTORE_ID              varchar(8 ),
  BELIEVER_ID               varchar(8 ),
  NATION_NAME               varchar(40 ),
  DELETE_FLAG               varchar(1 )    DEFAULT 'N',
  INSERT_DATE               DATE,
  INSERT_USER_ID            varchar(20 ),
  UPDATE_DATE               DATE,
  UPDATE_USER_ID            varchar(20 ),
  VOLUNT_ID                 varchar(8 ),
  RETIRE_PLANDATE           varchar(8 ),
  ZIP_CODE_OLD              varchar(7 ),
  PERSONAL_INFO_AGREE_DATE  varchar(8 )
)
