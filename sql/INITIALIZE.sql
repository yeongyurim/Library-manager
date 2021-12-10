insert into user (UNION_ID,passwd,KOREAN_NAME) values ('admin','admin1234','시험용관리자');
insert into member (LIBRARY_ID,NAME,SEC_PASSWORD,SEC_EMAIL,SEC_MOBILE_PHONE1,SEC_MOBILE_PHONE2,SEC_MOBILE_PHONE3) values ('sample1','홍길동','sample1','sample1@naver.com','010','0000','0000');
insert into member (LIBRARY_ID,NAME,SEC_PASSWORD,SEC_EMAIL,SEC_MOBILE_PHONE1,SEC_MOBILE_PHONE2,SEC_MOBILE_PHONE3) values ('sample2','김영희','sample2','sample2@naver.com','010','1111','1111');
insert into member (LIBRARY_ID,NAME,SEC_PASSWORD,SEC_EMAIL,SEC_MOBILE_PHONE1,SEC_MOBILE_PHONE2,SEC_MOBILE_PHONE3) values ('sample3','김철수','sample3','sample3@naver.com','010','2222','2222');
insert into member (LIBRARY_ID,NAME,SEC_PASSWORD,SEC_EMAIL,SEC_MOBILE_PHONE1,SEC_MOBILE_PHONE2,SEC_MOBILE_PHONE3) values ('sample4','연규림','sample4','sample4@naver.com','010','3333','3333');
insert into member (LIBRARY_ID,NAME,SEC_PASSWORD,SEC_EMAIL,SEC_MOBILE_PHONE1,SEC_MOBILE_PHONE2,SEC_MOBILE_PHONE3) values ('sample5','김승원','sample5','sample5@naver.com','010','4444','4444');

insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample1','sam1','samp1','김난도','트렌드 코리아 2022');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample2','sam2','samp2','유시민','거꾸로 읽는 세계사');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample3','sam3','samp3','매트 헤이그','미드나잇 라이브러리');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample4','sam4','samp4','성소라','NET 레볼루션');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample5','sam5','samp5','에릭 와이너','소크라테스 익스프레스');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample6','sam6','samp6','송길영','그냥 하지 말라');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample7','sam7','samp7','켈리 최','웰 씽킹');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample8','sam8','samp8','김호연','불편한 편의점');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample9','sam9','samp9','강환국','거인의 포트폴리오');
insert into book (RECORD_ID,ISBN_CODE,AUTHOR_ID,WRITER_NAME1,TITLE_OF_BOOK) values ('sample10','sam10','samp10','이미예','달러구트 꿈 편의점');


insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values ('sample1','sample1','20211130','20211207');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values ('sample1','sample2','20211130','20211207');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values ('sample1','sample3','20211130','20211207');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values ('sample2','sample4','20211130','20211207');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values ('sample3','sample5','20211130','20211207');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE) values ('sample3','sample6','20211130','20211207');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE,RETURN_DATE) values ('sample4','sample1','20211120','20211127','20211127');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE,RETURN_DATE) values ('sample4','sample2','20211130','20211127','20211127');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE,RETURN_DATE) values ('sample4','sample3','20211130','20211127','20211127');
insert into LENDING (LIBRARY_ID,RECORD_ID,LENDING_DATE,EXPECT_RETURN_DATE,RETURN_DATE) values ('sample5','sample4','20211130','20211127','20211127');
