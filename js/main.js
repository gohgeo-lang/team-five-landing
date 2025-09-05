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
// =====================
// 사이드 스크롤 인디케이터
// =====================
(function(){
  const sections = Array.from(document.querySelectorAll('section'));
  const dotsContainer = document.getElementById('dotsContainer');
  const progressFill = document.getElementById('progressFill');

  // 섹션별 dot 자동 생성
  sections.forEach((sec, idx) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.dataset.target = sec.id;
    dot.setAttribute('aria-label', `${sec.id} 이동`);

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = sec.querySelector('h2,h1')?.textContent || `Section ${idx+1}`;

    dotsContainer.appendChild(dot);
    dotsContainer.appendChild(label);

    dot.addEventListener('click', () => {
      document.getElementById(dot.dataset.target)
              .scrollIntoView({behavior:'smooth'});
    });
  });

  const dots = Array.from(document.querySelectorAll('.dot'));

  function updateOnScroll(){
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - viewportHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const percent = docHeight <= 0 ? 0 : (scrollTop / docHeight) * 100;
    progressFill.style.height = percent + '%';

    const centerY = scrollTop + viewportHeight/2;
    let activeIndex = 0;
    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      const top = rect.top + scrollTop;
      const bottom = top + rect.height;
      if(centerY >= top && centerY < bottom) activeIndex = i;
    });
    dots.forEach((d,i)=> d.classList.toggle('active', i===activeIndex));
  }

  updateOnScroll();
  window.addEventListener('scroll', () => requestAnimationFrame(updateOnScroll), {passive:true});
  window.addEventListener('resize', updateOnScroll);
})();
