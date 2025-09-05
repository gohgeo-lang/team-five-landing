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
  document.querySelectorAll(".nav-link").forEach((link) => {
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

  // 모바일 사이즈에서는 애니메이션 막아 놓음
  if (window.innerWidth > 768) {
    window.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
      },
      { passive: false }
    );

    const sections = document.querySelectorAll(".section");
    let currentIndex = 0;
    let isScrolling = false;
    let wheelDelta = 0;

    // IntersectionObserver: fade-in/out + currentIndex 갱신
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionIndex = Array.from(sections).indexOf(entry.target);

          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            currentIndex = sectionIndex; // 현재 화면에 보이는 섹션 갱신
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.3 } // 화면 30% 이상 섹션이 들어왔을 때
    );

    sections.forEach((section) => observer.observe(section));

    // Wheel 이벤트: 한 섹션씩 스크롤
    window.addEventListener("wheel", (event) => {
      wheelDelta += event.deltaY;

      // threshold를 상황에 맞게 낮추면 트랙패드에서도 자연스럽게 동작
      if (!isScrolling && Math.abs(wheelDelta) > 50) {
        isScrolling = true;

        if (wheelDelta > 0 && currentIndex < sections.length - 1) {
          currentIndex++;
        } else if (wheelDelta < 0 && currentIndex > 0) {
          currentIndex--;
        }

        // 현재 섹션으로 부드럽게 스크롤
        sections[currentIndex].scrollIntoView({ behavior: "smooth" });

        // wheelDelta 초기화
        wheelDelta = 0;

        // 잠금 시간 (다음 스크롤 입력 방지)
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    });
  }
});

// 모달 및 팝업 사용할 경우 필요한 부분 주석 해제
/*
// 버튼 클릭시 이미지 모달
const imageModal = document.getElementById("modalImageFrame"); // 이미지 프레임(div)
const modalImage = document.getElementById("modalImage"); // 이미지 넣을 곳(img)

imageModal.addEventListener("show.bs.modal", function (event) {
  let button = event.relatedTarget; // 어떤 버튼에서 이벤트 발생했는지
  let imgSrc = button.getAttribute("data-bs-image"); // 버튼에 있는 data-bs-image 값 가져오기
  modalImage.src = imgSrc; // 모달 이미지 변경
});

// 버튼 클릭시 같은 화면위에 페이지 모달
const modalPageFrame = document.getElementById("modalPageFrame"); // page 프레임(div)
const modalPage = document.getElementById("modalPage"); // 페이지 넣을 곳(iframe)

modalPageFrame.addEventListener("show.bs.modal", function (event) {
  let button = event.relatedTarget;
  let url = button.getAttribute("data-bs-url");
  modalPage.src = url;
});

modalPageFrame.addEventListener("hidden.bs.modal", function () {
  modalPage.src = "";
});

// 버튼 클릭시 페이지 열기 팝업
const btn = document.getElementById("popupButton");

btn.addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  const width = 800;
  const height = 600;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  window.open(
    url,
    "PopupWindow",
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
});
*/
