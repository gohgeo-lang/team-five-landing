document.addEventListener("DOMContentLoaded", () => {
  // 푸터 제외 섹션 선택
  const sections = document.querySelectorAll("section:not(#footer)");
  const progressFill = document.querySelector(".progress-fill");
  const topNumber = document.querySelector(".section-number.top");
  const bottomNumber = document.querySelector(".section-number.bottom");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 마지막 섹션 끝 기준으로 진행률 계산
    const lastSection = sections[sections.length - 1];
    const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
    const scrollMax = lastSectionBottom - windowHeight;

    const progress = Math.min(scrollY / scrollMax, 1);
    progressFill.style.height = `${progress * 100}%`;

    // 현재 섹션 번호 계산
    let currentIndex = 0;
    sections.forEach((section, index) => {
      if (scrollY + windowHeight / 2 >= section.offsetTop) {
        currentIndex = index;
      }
    });

    const sectionNumber = String(currentIndex + 1).padStart(2, "0");
    topNumber.textContent = sectionNumber;
    bottomNumber.textContent = sectionNumber;
  });
});
