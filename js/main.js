// 헤더 관련 스크립트 (전역설정)

const header = document.querySelector(".header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

/* 화면 클릭 시 작동되는 헤더토글 잠금용 변수 */
let lock = false;

// 초기 상태
function initHeader() {
  if (window.scrollY === 0) {
    header.classList.add("show");
    header.classList.remove("hidden");
  } else {
    header.classList.add("hidden");
    header.classList.remove("show");
  }
}
initHeader();

// 스크롤 이벤트
window.addEventListener("scroll", () => {
  if (lock || header.classList.contains("fixed")) return;
  if (window.scrollY === 0) {
    header.classList.add("show");
    header.classList.remove("hidden");
  } else {
    header.classList.add("hidden");
    header.classList.remove("show");
  }
});

// 화면 클릭 → 헤더 토글
document.addEventListener("click", (e) => {
    if (lock || header.classList.contains("fixed")) return; 

    // 햄버거, 메뉴, 검색창, 캐러셀버튼 클릭 시 무시(잠금 조건들)
    if (
        e.target.closest("#hamburger") ||
        e.target.closest("#navMenu") ||
        e.target.closest(".search-box") ||
        e.target.closest("#introCarousel")
    )
        return;

  header.classList.toggle("show");
  header.classList.toggle("hidden");
});

// 햄버거 버튼 클릭
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        // 메뉴 열림 → 헤더 고정
        header.classList.add("show", "fixed");
        header.classList.remove("hidden");
    } else {
        // 메뉴 닫힘 → 고정 해제 + 헤더 보이기
        closeMenu();
    }
});

// 메뉴 링크 클릭 → 닫기
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

// 오버레이 클릭 → 닫기
overlay.addEventListener("click", () => {
    closeMenu();
});

// 메뉴 닫기 함수
function closeMenu() {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    header.classList.remove("fixed");
    header.classList.add("show");
    header.classList.remove("hidden");

    lock = true;
    setTimeout(() => (lock = false), 100);
}
