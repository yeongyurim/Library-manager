CREATE VIEW statis AS
select LENDING_SEQ,BOOK.RECORD_ID,MEMBER.LIBRARY_ID,TITLE_OF_BOOK,NAME,LENDING_DATE,EXPECT_RETURN_DATE
from lending join member on lending.library_id = member.library_id join book on lending.record_id = book.record_id
