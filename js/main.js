//헤더 관련 스크립트입니다.(전역설정)

const header = document.querySelector(".header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

let lock = false; // 잠금 플래그

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
    if (e.target.closest("#hamburger") || e.target.closest("#navMenu")) return;


    if (
        e.target.closest("#hamburger") || 
        e.target.closest("#navMenu") || 
        e.target.closest(".search-box")  
    ) return;


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
        // 메뉴 닫힘 → 고정 해제 + 헤더 강제 보이기
        header.classList.remove("fixed");
        header.classList.add("show");
        header.classList.remove("hidden");

        // 0.1초 동안 다른 이벤트 무시 (사라짐 방지)
        lock = true;
        setTimeout(() => (lock = false), 100);
    }
});

// 메뉴 링크 클릭 → 닫기
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
        header.classList.remove("fixed");
        header.classList.add("show");
        header.classList.remove("hidden");

        lock = true;
        setTimeout(() => (lock = false), 100);
    });
});

// 오버레이 클릭 → 닫기
overlay.addEventListener("click", () => {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    header.classList.remove("fixed");
    header.classList.add("show");
    header.classList.remove("hidden");

    lock = true;
    setTimeout(() => (lock = false), 100);
});
