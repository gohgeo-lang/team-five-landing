document.addEventListener("DOMContentLoaded", () => {
  // 푸터 제외한 섹션만 선택
  const sections = document.querySelectorAll("section:not(#footer)");
  const progressFill = document.querySelector(".progress-fill");
  const topNumber = document.querySelector(".section-number.top");
  const bottomNumber = document.querySelector(".section-number.bottom");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  let ticking = false;
  let disableSectionScroll = false; // 섹션 단위 스크롤 잠금

  // 🔹 섹션 전체 높이 계산 (푸터는 제외)
  const totalSectionsHeight = Array.from(sections)
    .reduce((acc, sec) => acc + sec.offsetHeight, 0);

  const updateProgress = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 🔹 게이지는 섹션만 기준으로 계산
    const progress = Math.min(scrollY / (totalSectionsHeight - windowHeight), 1);
    progressFill.style.height = `${progress * 100}%`;

    // 🔹 현재 섹션 번호 업데이트
    let currentIndex = 0;
    sections.forEach((section, index) => {
      if (scrollY + windowHeight / 2 >= section.offsetTop) {
        currentIndex = index;
      }
    });
    const sectionNumber = String(currentIndex + 1).padStart(2, "0");
    topNumber.textContent = sectionNumber;
    bottomNumber.textContent = sectionNumber;
  };

  // 스크롤 이벤트
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (!disableSectionScroll) {
          updateProgress();
          // 👉 여기서 섹션 단위 스크롤 이벤트 (fullpage scroll) 붙이면 됨
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // 맨 위로 버튼
  scrollToTopBtn.addEventListener("click", () => {
    disableSectionScroll = true;                   // 섹션 단위 스크롤 잠금
    window.scrollTo({ top: 0, behavior: "auto" }); // 즉시 맨 위로
    updateProgress();                               // 진행바 & 번호 초기화

    setTimeout(() => {
      disableSectionScroll = false;
    }, 50);
  });

  // 초기 진행바 상태
  updateProgress();
});
