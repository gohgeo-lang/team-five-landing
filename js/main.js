const header = document.querySelector(".header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

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
    if (header.classList.contains("fixed")) return; // 메뉴 열려있으면 무시

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
    if (header.classList.contains("fixed")) return; // 메뉴 열려있으면 무시
    if (e.target.closest("#hamburger") || e.target.closest("#navMenu")) return; // 메뉴/버튼 클릭 제외

    header.classList.toggle("show");
    header.classList.toggle("hidden");
});

// 햄버거 버튼 클릭 → 메뉴 열고/닫기
hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        // 메뉴 열림 → 헤더 고정 + 표시
        header.classList.add("show", "fixed");
        header.classList.remove("hidden");
    } else {
        // 메뉴 닫힘 → 고정 해제만 (show는 그대로 둠)
        header.classList.remove("fixed");
        header.classList.add("show");   // ← 항상 보이게 유지
        header.classList.remove("hidden");
    }
});

// 메뉴 링크 클릭 시 닫기
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
        header.classList.remove("fixed");
        header.classList.add("show"); // 헤더는 유지
    });
});

// 오버레이 클릭 시 닫기
overlay.addEventListener("click", () => {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    header.classList.remove("fixed");
    header.classList.add("show"); // 헤더는 유지
});
