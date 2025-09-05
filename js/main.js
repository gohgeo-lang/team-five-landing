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

      // 부드러운 이동, 링크요소에 data-index 추가해줘야 됨. 예) data-index="0"
      // 효과가 있는지 잘 모르겠음, 효과 없으면 지워도 되요
      const index = parseInt(link.dataset.index, 10);
      //scrollToSection(index);
    });
  });

  // 오버레이 클릭해도 닫기
  overlay.addEventListener("click", () => {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  });

  // 버튼 클릭으로 섹션 이동시 부드럽게 이동시키고자 할 때 버튼 이벤트에 등록하면 됨
  function scrollToSection(index) {
    console.log("sections size", sections.length);
    sections[index].scrollIntoView({ behavior: "smooth" });
  }
  // 한 섹션씩 스크롤
  const sections = document.querySelectorAll(".section");
  let currentIndex = 0;
  let isScrolling = false;

  // 모바일 사이즈에서는 막아 놓음
  if (window.innerWidth > 768) {
    window.addEventListener("wheel", (event) => {
      if (isScrolling) return; // 중복 실행 방지
      isScrolling = true;

      console.log("section currentIndex", currentIndex);
      if (event.deltaY > 0) {
        // 아래로 스크롤
        if (currentIndex < sections.length - 1) {
          currentIndex++;
        }
      } else {
        // 위로 스크롤
        if (currentIndex > 0) {
          currentIndex--;
        }
      }

      sections[currentIndex].scrollIntoView({
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling = false;
      }, 1000); // 스크롤 잠금 시간
    });
  }

  /* 스크롤 시 fade-in 효과 사용하기 위해서 CSS에 추가 필요 */
  // .scroll-section {
  //     opacity: 0;
  //     transform: translateY(50px); // 필셀값 조절해서 적당한 값 찾을 필요있음
  //     transition: all 0.8s ease;
  // }
  // .scroll-section.show {
  //     opacity: 1;
  //     transform: translateY(0); // 필셀값 조절해서 적당한 값 찾을 필요있음
  // }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show"); // 화면 안 → fade-in
        } else {
          entry.target.classList.remove("show"); // 화면 밖 → fade-out
        }
      });
    },
    { threshold: 0.3 } // 섹션의 몇 프로가 화면에 들어왔을 때 보이기 시작할지
  );

  document
    .querySelectorAll(".section")
    .forEach((element) => observer.observe(element));
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
