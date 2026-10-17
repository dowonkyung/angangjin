# 구청장동정 게시판

Supabase SQL Editor에서 supabase/activity.sql 전체를 실행합니다. 기존 구보·언론 게시판 설정은 유지됩니다.

activity.html에서 관리자 로그인 후 글쓰기를 누릅니다. 제목, 작성자, 소개글, 본문, 목록 썸네일과 첨부파일을 등록할 수 있습니다. 게시글 수정·삭제와 파일 바로보기는 기존 게시판과 동일합니다.

공개 데이터는 publication_posts의 activity 분류와 기존 publication_assets, publication-files 버킷을 사용합니다. 통합검색에도 자동 반영됩니다.
