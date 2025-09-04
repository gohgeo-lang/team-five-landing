document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const overlay = document.getElementById("overlay");

    // 햄버거 클릭 시 메뉴 + 오버레이 토글
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    // 메뉴 링크 클릭하면 닫기
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            overlay.classList.remove("active");
        });
    });

    // 오버레이 클릭해도 닫기
    overlay.addEventListener("click", () => {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
    });
});
