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
// 사이드 네비게이션
const sections = document.querySelectorAll("section"); // footer 제외
const navDots = document.querySelectorAll(".scroll-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navDots.forEach(dot => {
    dot.classList.remove("active");
    if (dot.getAttribute("href") === `#${current}`) {
      dot.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section:not(#footer)");
  const progressFill = document.querySelector(".progress-fill");
  const topNumber = document.querySelector(".section-number.top");
  const bottomNumber = document.querySelector(".section-number.bottom");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 🔥 마지막 섹션 끝까지만 기준으로 잡음
    const lastSection = sections[sections.length - 1];
    const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
    const scrollMax = lastSectionBottom - windowHeight;

    // 현재 스크롤 진행도 (0 ~ 1)
    const progress = Math.min(scrollY / scrollMax, 1);

    // 게이지 채우기
    progressFill.style.height = `${progress * 100}%`;

    // 현재 섹션 번호 업데이트
    let currentSectionIndex = 0;
    sections.forEach((section, index) => {
      if (scrollY + windowHeight / 2 >= section.offsetTop) {
        currentSectionIndex = index;
      }
    });

    const sectionNumber = String(currentSectionIndex + 1).padStart(2, "0");
    topNumber.textContent = sectionNumber;
    bottomNumber.textContent = sectionNumber;
  });
});
