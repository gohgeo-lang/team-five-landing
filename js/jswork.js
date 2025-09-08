(function () {
  const sections = document.querySelectorAll(".section");
  let currentIndex = 0;
  let isScrolling = false;
  let wheelDelta = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentIndex = Array.from(sections).indexOf(entry.target);
          entry.target.classList.add("show");

          if (entry.target.id === "footer") {
            map.invalidateSize();
          }
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
      let moved = false;

      if (wheelDelta > 0 && currentIndex < sections.length - 1) {
        currentIndex++;
        moved = true;
      } else if (wheelDelta < 0 && currentIndex > 0) {
        currentIndex--;
        moved = true;
      }

      if (moved) {
        isScrolling = true;

        sections[currentIndex].scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    }
    wheelDelta = 0;
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

document.addEventListener("DOMContentLoaded", () => {
  const visual = document.querySelector(".visual-content");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visual.classList.add("show");
        } else {
          visual.classList.remove("show");
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(visual);
});

// 로고 애니메이션
// const logo = document.querySelector('.logo');
// setInterval(() => {
//   logo.style.transform = 'scale(1.2)';
//   setTimeout(() => logo.style.transform = 'scale(0.8)', 300);
// }, 1000);

// 동영상을 배경으로
const video = document.getElementById("bg-video");

if (video) {
  //video.pause();
  video.play().catch((err) => console.log("동영상 자동재생 실패", err));
}

// 무료 지도 API 표시
const map = L.map("map").setView([37.509208, 127.113694], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.circle([37.509208, 127.113694], {
  color: "red",
  radius: 100,
}).addTo(map);
// 마커 추가
const marker = L.marker([37.509208, 127.113694]).addTo(map);
marker.bindPopup("❣️여기는 브루브루입니다.").openPopup();

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
*/

// 버튼 클릭시 페이지 열기 팝업
const btn = document.getElementById("openReservePopup");

btn.addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  const width = 800;
  const height = 600;
  // 화면 기준 가운데 좌표 계산
  // const left = (window.screen.width - width) / 2;
  // const top = (window.screen.height - height) / 2;
  // 현재 창 기준 가운데 좌표 계산
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;

  window.open(
    url,
    "PopupWindow",
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
});

// 마우스 위치에 따라 변형
// const card = document.querySelector('.detail-item');
// card.addEventListener('mousemove', e => {
//   const x = (window.innerWidth / 2 - e.pageX) / 25;
//   const y = (window.innerHeight / 2 - e.pageY) / 25;
//   card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
// });
// card.addEventListener('mouseleave', () => {
//   card.style.transform = `rotateY(0deg) rotateX(0deg)`;
// });
