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

    // 섹션 시작 기준 누적 높이 계산
    let totalHeight = 0;
    sections.forEach(sec => totalHeight += sec.offsetHeight);

    let filledHeight = 0;
    let currentSectionIndex = 0;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollY + windowHeight / 2 >= sectionTop) {
        currentSectionIndex = index;
        filledHeight = 0;

        // 이전 섹션 누적
        for (let i = 0; i < index; i++) {
          filledHeight += sections[i].offsetHeight;
        }

        // 현재 섹션에서 진행된 높이
        filledHeight += Math.min(scrollY - sectionTop + windowHeight/2, sectionHeight);
      }
    });

    // 게이지 높이 % 계산
    const fillPercent = (filledHeight / totalHeight) * 100;
    progressFill.style.height = `${fillPercent}%`;

    // 섹션 번호 업데이트
    const sectionNumber = String(currentSectionIndex + 1).padStart(2, '0');
    topNumber.textContent = sectionNumber;
    bottomNumber.textContent = sectionNumber;
  });
});
