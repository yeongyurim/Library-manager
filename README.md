# graduation
1. https://github.com/zxc991019/graduation zip파일 다운로드
2. https://dev.mysql.com/downloads/windows/installer/8.0.html node.js 설치
3. https://www.mysql.com/downloads/ mysql 설치
****설치시 
port 3333
root계정 비밀번호는 123456 사용

3. 압축해제 후 커맨드 창으로 해당 폴더 이동 
4. npm install 하여 패키지 설치
5. mysql/bin 폴더에서 mysql -u root -p 명령어 실행 -> 비밀번호 123456
6. 명령어 create database nbook;
7. 명령어 use nbook; 
8-1.     source 명령어로 프로젝트 폴더에 동봉되어 있는 sql 폴더 내에 sql 문들 삽입 
	순서는 BOOK,HOLIDAY,MEMBER,USER 삽입후
	LENDING->STATIS 순으로 sql 삽입
	INITIALIZE.sql sql 파일 문제로 메모장으로 열어서 전체 복사 후 커맨드 창에 붙여넣기하여 삽입
	다른 sql 파일들도 오류 시 복사하여 붙여넣기

8-2.    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456'; 로그인 설정하		기 위해

9. npm start
10. localhost

예상 오류 
sql 삽입시 오류 -> 8번 참고 하여 sql문 순서대로 하거나 복사하여 붙여넣기
npm start 시 mysql 오류 -> 
3번의 port를 잘못 설정했을때 router 폴더의 모든 파일에 mysql 선언 부분에서 port를 맞춰줘야 함
혹은 8-2 미수행
