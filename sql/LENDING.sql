CREATE TABLE LENDING
(
  LENDING_SEQ         int                  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  LIBRARY_ID          VARCHAR(8 )          NOT NULL,
  RECORD_ID           VARCHAR(11 )         NOT NULL,
  LENDING_DATE        VARCHAR(8 )          NOT NULL,
  RETURN_DATE         VARCHAR(8 ),
  EXPECT_RETURN_DATE  VARCHAR(8 ),
  LENDING_FLAG        VARCHAR(2 )          DEFAULT NULL,
  INSERT_DATE         DATE,
  INSERT_USER_ID      VARCHAR(10 ),
  UPDATE_DATE         DATE,
  UPDATE_USER_ID      VARCHAR(10 ),
  EXPECT_FLAG         VARCHAR(1 )          DEFAULT 'N',
  FOREIGN KEY (LIBRARY_ID) REFERENCES MEMBER(LIBRARY_ID),
  FOREIGN KEY (RECORD_ID) REFERENCES BOOK(RECORD_ID)
)
