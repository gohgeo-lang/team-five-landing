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

  (function () {
    const sections = document.querySelectorAll(".section");
    let currentIndex = 0;
    let isScrolling = false;
    let wheelDelta = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionIndex = Array.from(sections).indexOf(entry.target);
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            currentIndex = sectionIndex;
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));

    // 데스크톱 전용 스크롤 초기화
    function initDesktopScroll() {
      if (window.innerWidth <= 768) return; // 모바일이면 실행 안 함

      // 기본 스크롤 기능 막기
      window.addEventListener("wheel", preventDefaultWheel, { passive: false });

      // 한 섹션씩 스크롤
      window.addEventListener("wheel", handleWheelDesktop);
    }

    // 데스크톱용 wheel preventDefault
    function preventDefaultWheel(e) {
      e.preventDefault();
    }

    // 데스크톱용 섹션 스크롤
    function handleWheelDesktop(e) {
      wheelDelta += e.deltaY;

      if (!isScrolling && Math.abs(wheelDelta) > 15) {
        isScrolling = true;

        if (wheelDelta > 0 && currentIndex < sections.length - 1) {
          currentIndex++;
        } else if (wheelDelta < 0 && currentIndex > 0) {
          currentIndex--;
        }

        sections[currentIndex].scrollIntoView({ behavior: "smooth" });
        wheelDelta = 0;

        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    }

    // 창 크기 변경 시 데스크톱 스크롤 적용 여부 재검토
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        // 모바일일 경우 이벤트 제거
        window.removeEventListener("wheel", preventDefaultWheel);
        window.removeEventListener("wheel", handleWheelDesktop);
      } else {
        // 데스크톱일 경우 이벤트 등록
        initDesktopScroll();
      }
    });

    // 초기 실행
    initDesktopScroll();
  })();
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
