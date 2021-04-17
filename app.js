function init() {
  //Variables and Selectors
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    `radial-gradient(#2b3760, #0b1023)`,
    `radial-gradient(#986344, #392E25)`,
    `radial-gradient(#392E25, #233239)`,
  ];
  //Page Trackers
  let currentPagecount = 0;
  let scrollSlide = 0;
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      changeDots(this);
      changePage(index);
      scrollSlide = index;
    });
  });

  function changeDots(dot) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }
  function changePage(PageNo) {
    const nextPage = pages[PageNo];
    const currentPage = pages[currentPagecount];
    //Selecting Page Elements For Animation
    const nextLeft = nextPage.querySelector(".hero .model-left");
    const nextRight = nextPage.querySelector(".hero .model-right");
    const currentLeft = currentPage.querySelector(".hero .model-left");
    const currentRight = currentPage.querySelector(".hero .model-right");
    const nextText = nextPage.querySelector(".details");
    const portfolio = document.querySelector(".portfolio");

    const t1 = new TimelineMax({
      onStart: function () {
        slides.forEach((slide) => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function () {
        slides.forEach((slide) => {
          slide.style.pointerEvents = "all";
        });
      },
    });

    t1.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
      .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
      .to(portfolio, 0.3, { backgroundImage: backgrounds[PageNo] })
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" },
        "-=0.7"
      )
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" })
      .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.2")
      .fromTo(nextText, 0.3, { opacity: 0, y: "30" }, { opacity: 1, y: 0 })
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });

    currentPagecount = PageNo;
  }

  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchmove", throttle(scrollChange, 1500));

  function switchDots(dotNum) {
    const activePage = document.querySelectorAll(".slide")[dotNum];

    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    activePage.classList.add("active");
  }

  function scrollChange(Event) {
    if (Event.deltaY > 0) {
      scrollSlide++;
    } else {
      scrollSlide--;
    }

    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide);
    changePage(scrollSlide);
  }

  function throttle(funct, timeLimit) {
    let inThrottle;

    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        funct.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), timeLimit);
      }
    };
  }

  //Menu
  const hamburger = document.querySelector(".menu");
  const hamburgerLines = document.querySelectorAll(".menu line");
  const navOpen = document.querySelector(".nav-open");
  const contact = document.querySelector(".contact");
  const logo = document.querySelector(".logo");
  const social = document.querySelector(".social");

  const t1 = new TimelineMax({ paused: true, reversed: true });
  t1.to(navOpen, 0.5, { y: 0 })
    .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
    .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
    .fromTo(logo, 0.2, { color: "white" }, { color: "black" }, "-=1")
    .fromTo(
      hamburgerLines,
      0.2,
      { stroke: "white" },
      { stroke: "black" },
      "-=0.1"
    );

  hamburger.addEventListener("click", () => {
    t1.reversed() ? t1.play() : t1.reverse();
  });
}

init();
