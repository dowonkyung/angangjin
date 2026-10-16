// 공개용 설정만 넣습니다. secret/service_role 키나 관리자 비밀번호를 넣지 마세요.
// 연결 순서: BOARD_SETUP.md → supabase/schema.sql → 관리자 등록 → 아래 두 값 입력.
window.ANGANGJIN_BOARD_CONFIG = {
  supabaseUrl: '', // https://프로젝트ID.supabase.co
  publishableKey: '', // sb_publishable_... 또는 프로젝트의 공개 anon 키
  bucket: 'news-files'
};
