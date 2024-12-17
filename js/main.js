document.addEventListener('DOMContentLoaded', function() {
  // ハンバーガーメニューの制御
  const hamburger = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-nav');

  hamburger?.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    nav?.classList.toggle('active');
  });

  // カルーセルの制御
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (track && slides.length > 0 && dotsContainer) {
    let currentIndex = 0;

    // ドットの生成
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    // スライド移動関数を修正
    function goToSlide(index) {
      const slideWidth = track.clientWidth;  // コンテナの幅を基準に
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    // ウィンドウリサイズ時の処理を追加
    window.addEventListener('resize', () => {
      goToSlide(currentIndex);
    });

    // 自動スライド
    setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 5000);
  }

  // モーダルウィンドウの制御
  const modal = document.getElementById('modal');
  const modalDescription = document.getElementById('modal-description');
  const closeBtn = document.querySelector('.close');
  const imgLinks = document.querySelectorAll('.img-link');

  imgLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const description = this.getAttribute('data-description');
      if (modal && modalDescription) {
        modalDescription.innerHTML = marked.parse(description);
        modal.style.display = 'block';
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // スクロールアニメーション
  const scrollElements = document.querySelectorAll('.mainli');

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });

  // ヘッダースクロール制御を追加
  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール方向を検知
    if (currentScroll > lastScroll && currentScroll > 100) {
      // 下スクロール
      header.style.transform = 'translateY(-100%)';
    } else {
      // 上スクロール
      header.style.transform = 'translateY(0)';
      header.classList.add('scroll-show');
    }

    // スクロール位置に応じてヘッダーの背景を変更
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
});
