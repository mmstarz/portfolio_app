import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import PropTypes from "prop-types";
import "./pureSlider.css";
// mui
// import { makeStyles } from "@material-ui/core/styles";

// els

import PureWrapper from "./pureWrapper";
import PureActions from "./pureActions";
import PureDots from "./pureDots";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex"
//   },
// }))

const PureSlider = ({ amount }) => {
  // fullwidth -> resizeCorrection -> loadData -> checkIndex

  // instead of data(slides) array length used -> amount
  // only for this case for faster calculating  

  // console.log("slides: ", slides);
  // console.log("count: ", amount);

  const [gallery, setGallery] = useState(false);
  const [size, setSize] = useState(0);

  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState(false);
  const [allowShift, setAllowShift] = useState(true);

  const [start, setStart] = useState(0);
  const [correction, setCorrection] = useState(null);
  const [left, setLeft] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [clonesNum, setClonesNum] = useState(0); // spw correction

  /* MOVE CALC FUCN */

  const slidePortal = useCallback(
    (slider, idx) => {
      slider.classList.remove("shifting");

      // console.log("slide portal");
      // console.log("slide portal idx: ", idx);

      // let size = slideWidth + 2 * sideMargin;
      let clonesLength = clonesNum * size;
      // slider.style.left = -(size - correction) + "px";
      // setLeft(-(size - correction));

      if (idx === -1) {
        // left clone position scenario
        slider.style.left =
          -(amount * size - correction + clonesLength) + "px";
        setCursor(amount - 1);
        setLeft(-(amount * size - correction + clonesLength));
        slider.childNodes[clonesNum + amount].classList.add("current");
      } else if (idx === amount) {
        // right clone position scenario
        slider.style.left = -(size - correction + clonesLength) + "px";
        setCursor(0);
        setLeft(-(size - correction + clonesLength));
        slider.childNodes[clonesNum + 1].classList.add("current");
      } else {
        //
        slider.style.left =
          -(idx * size + size - correction + clonesLength) + "px";
        setCursor(idx);
        setLeft((idx * size + size - correction + clonesLength) * -1);
        slider.childNodes[clonesNum + 1 + idx].classList.add("current");
      }
    },
    [clonesNum, correction, amount, size]
  );

  const slidePrev = useCallback(
    (pos, size, slider) => {
      // console.log("slidePrev started");
      let step = size / 2;
      return new Promise((resolve) => {
        let viewMotion;
        viewMotion = setInterval(() => {
          if (pos + (size * 3) / 4 > slider.offsetLeft) {
            // till 75% dist
            // console.log("motion prev");
            slider.style.left = slider.offsetLeft + step + "px";
            // step += 10;
          } else {
            clearInterval(viewMotion);
            // console.log("portal prev");
            // ((cursor - 1) * slideMargin)
            // slider.style.left = pos + size + "px"; // center view
            // setCursor(cursor - 1);
            // setLeft(pos + size);
            // slidePortal(slider, cursor - 1);
            resolve({ res: true, idx: cursor - 1 });
          }
        }, 100);
        // console.log("prev id: ", viewMotion);
      });
    },
    [cursor]
  );

  const slideNext = useCallback(
    (pos, size, slider) => {
      // console.log("slideNext started");
      let step = size / 2;
      return new Promise((resolve) => {
        let viewMotion;
        viewMotion = setInterval(() => {
          if (pos - (size * 3) / 4 < slider.offsetLeft) {
            // till 75% dist
            // console.log("motion next");
            slider.style.left = slider.offsetLeft - step + "px";
            // step += 10;
          } else {
            clearInterval(viewMotion);
            // console.log("portal next");
            // ((cursor + 1) * slideMargin)
            // slider.style.left = pos - size + "px"; // center view
            // setCursor(cursor + 1);
            // setLeft(pos - size);
            // slidePortal(slider, cursor + 1);
            resolve({ res: true, idx: cursor + 1 });
          }
        }, 100);
        // console.log("next id: ", viewMotion);
      });
    },
    [cursor]
  );

  const renderMotion = useCallback(
    async (dir, pos, size, slider) => {
      // console.log("renderMotion -> slide");

      const prev = slider.querySelector(".current");
      if (prev) prev.classList.remove("current");

      if (dir === "next") {
        const { res, idx } = await slideNext(pos, size, slider);
        if (res) slidePortal(slider, idx);
      }

      if (dir === "prev") {
        const { res, idx } = await slidePrev(pos, size, slider);
        if (res) slidePortal(slider, idx);
      }
    },
    [slidePortal, slideNext, slidePrev]
  );

  const slideTo = useCallback(
    (dir, action) => {
      const slider = document.getElementById("slides");
      // const slideSize = slider.querySelector(".slide").offsetWidth;
      // console.log("slide size: ", slideSize);
      slider.classList.add("shifting");

      // console.log("slideTo -> renderMotion");
      // console.log("slideTo (allowShift): ", allowShift);
      // let size = slideSize + 2 * sideMargin;
      // let size = slideWidth + 2 * sideMargin;

      if (allowShift) {
        if (!action) {
          setLeft(slider.offsetLeft);
        }

        renderMotion(dir, left, size, slider);
      }
    },
    [size, allowShift, left, renderMotion]
  );

  const handleNext = useCallback(() => {
    // console.log("handle next");
    const slider = document.getElementById("slides");
    // const slideSize = slider.querySelector(".slide").offsetWidth;
    slider.classList.add("shifting");
    // let size = slideWidth + 2 * sideMargin;
    // (dir, pos, size, slider)
    renderMotion("next", left, size, slider);
  }, [renderMotion, left, size]);

  const handlePrev = useCallback(() => {
    // console.log("handle prev");
    const slider = document.getElementById("slides");
    // const slideSize = slider.querySelector(".slide").offsetWidth;
    slider.classList.add("shifting");
    // let size = slideWidth + 2 * sideMargin;
    // (dir, pos, size, slider)
    renderMotion("prev", left, size, slider);
  }, [renderMotion, left, size]);

  // console.log("left: ", left);
  // console.log("cursor: ", cursor);

  const checkIndex = useCallback(async () => {
    function main() {
      const slider = document.getElementById("slides");
      // const slides = slider.getElementsByClassName("slide"); // should use data length
      // const slideSize = slider.querySelector(".slide").offsetWidth;
      // console.log("slide size: ", slideSize);
      // console.log("slides length: ", amount);

      slider.classList.remove("shifting");

      // console.log("CHECK INDEX");
      // console.log("CHECK INDEX CURSOR: ", cursor);

      // let size = slideWidth + 2 * sideMargin;
      let clonesLength = clonesNum * size;
      // slider.style.left = -(size - correction) + "px";
      // setLeft(-(size - correction));
      return new Promise((resolve) => {
        if (cursor === -1) {
          // left clone position scenario
          slider.style.left =
            -(amount * size - correction + clonesLength) + "px";
          setCursor(amount - 1);
          setLeft(-(amount * size - correction + clonesLength));
          slider.childNodes[clonesNum + amount].classList.add("current");
          resolve(true);
        } else if (cursor === amount) {
          // right clone position scenario
          slider.style.left = -(size - correction + clonesLength) + "px";
          setCursor(0);
          setLeft(-(size - correction + clonesLength));
          slider.childNodes[clonesNum + 1].classList.add("current");
          resolve(true);
        } else {
          //
          slider.style.left =
            -(cursor * size + size - correction + clonesLength) + "px";
          setLeft((cursor * size + size - correction + clonesLength) * -1);
          slider.childNodes[clonesNum + 1 + cursor].classList.add("current");
          resolve(true);
        }
      });
    }

    let res = await main();
    if (res) {
      setAllowShift(true);
    }
  }, [cursor, amount, correction, clonesNum, size]);

  // Screen → monitor size (screenX/Y)
  // Client → browser viewport (clientX/Y)
  // Page → html document size (pageX/Y)

  const handleStart = (currX) => {
    // console.log("handle start X pos: ", currX);
    const slider = document.getElementById("slides");

    setTouched(true);
    setStart(currX);

    // setLeft(slider.style.left); // string wouldn't work
    setLeft(slider.offsetLeft); // number
  };

  // [0px][-400px][-800px][...][...][...][...][-2800px]

  const handleMove = (currX) => {
    // console.log("handle move x: ", currX);
    if (!touched) return;

    const slider = document.getElementById("slides");

    const prev = slider.querySelector(".current");
    if (prev) prev.classList.remove("current");

    let delta = Math.abs(start - currX);
    // console.log("start: ", start);
    // console.log("delta: ", delta);

    if (start < currX) {
      // console.log("calc left motion");
      slider.style.left = left + delta + "px";
    }

    if (start > currX) {
      // console.log("calc right motion");
      slider.style.left = left - delta + "px";
    }
  };

  const handleEnd = useCallback(() => {
    const slider = document.getElementById("slides");
    // -269.5
    let posFinal = slider.offsetLeft; // -408 -816 -1224
    let threshold = 100;
    // let size = slideWidth + 2 * sideMargin;
    let delta = parseInt((Math.abs(posFinal - left) + threshold) / size); // slides delta

    // console.log("handleEnd distance: ", Math.abs(posFinal - left));
    // console.log("handleEnd distance slides: ", delta);

    if (delta >= 1 && posFinal > left) {
      // going prev
      if (cursor - delta < 0) {
        setCursor(amount - Math.abs(cursor - delta));
      } else {
        setCursor(cursor - delta);
      }
      setAllowShift(false);
    } else if (delta >= 1 && posFinal < left) {
      // going next
      if (cursor + delta > amount - 1) {
        setCursor(cursor + delta - amount);
      } else {
        setCursor(cursor + delta);
      }
      setAllowShift(false);
    } else if (delta < 1 && posFinal - left < -threshold) {
      // going next
      // console.log("handleEnd -> slideTo");
      slideTo("next", "drag");
    } else if (delta < 1 && posFinal - left > threshold) {
      // going prev
      // console.log("handleEnd -> slideTo");
      slideTo("prev", "drag");
    } else {
      // center view
      // console.log("handleEnd -> center view");
      slider.style.left = left + "px";
    }
    setTouched(false);
  }, [size, left, cursor, slideTo, amount]);

  /* TOUCH FUNCTIONS HERE */

  const handleTouchStart = (e) => {
    // e.stopPropagation();
    e.persist();
    handleStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    // e.stopPropagation();
    e.persist();
    handleMove(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    // e.persist();
    handleEnd();
    setTouched(false);
  };

  /* MOUSE FUNCTIONS HERE */

  const handleMouseDown = (e) => {
    // e.preventDefault();
    e.persist();
    handleStart(e.clientX);
    // e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    e.persist();
    handleMove(e.clientX);
    // e.stopPropagation();
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    setTouched(false);
    handleEnd();
  };

  // const renderClonesOld = useCallback((slider) => {
  //   // previous clones remove
  //   let clones = slider.querySelectorAll(".clone");
  //   clones.forEach((clone) => clone.remove());
  //   // assign slides
  //   const slides = slider.childNodes;
  //   // create new clones
  //   let firstSlide = slides[0];
  //   let lastSlide = slides[amount - 1];
  //   let cloneFirst = firstSlide.cloneNode(true);
  //   let cloneLast = lastSlide.cloneNode(true);
  //   // markup clones
  //   cloneFirst.classList.add("clone");
  //   cloneLast.classList.add("clone");
  //   // add new clones to the flow
  //   slider.appendChild(cloneFirst);
  //   slider.insertBefore(cloneLast, firstSlide);
  // }, []);

  const renderClones = useCallback((slider, spw) => {
    // console.log("render clones");
    // remove gallery markup
    let galls = slider.querySelectorAll(".gallery");
    if (galls.length > 0) {
      galls.forEach((node) => node.classList.remove("gallery"));
    }
    // previous clones remove
    let clones = slider.querySelectorAll(".clone");
    clones.forEach((clone) => clone.remove());
    // create new clones groups
    const slides = slider.childNodes;
    let gr1 = document.createDocumentFragment(); // clones for the start
    let gr2 = document.createDocumentFragment(); // clones for the end
    // select -> clone -> add to group1 - first node
    const gr1firstSlide = slides[amount - 1 - spw]; // gr2 first
    const gr1clone1 = gr1firstSlide.cloneNode(true); // make clone
    gr1clone1.classList.add("clone"); // markup
    // this is bcs we need vice versa elements order for the first group
    gr1.appendChild(gr1clone1);
    const gr1first = gr1[0];

    // form groups of clones
    Object.entries(slides).forEach(([key, value]) => {
      if (key <= spw) {
        // console.log("clone from the beggining: ", key);
        const clone = value.cloneNode(true);
        clone.classList.add("clone");
        // appendChild
        // console.log("clone: ", clone);
        gr2.appendChild(clone);
      }
      // [][][][l-1-spw][l - 1]
      if (key >= amount - spw) {
        // console.log("clone from the end: ", key);
        const clone = value.cloneNode(true);
        clone.classList.add("clone");
        // insertBefore
        // console.log("clone: ", clone);
        gr1.insertBefore(clone, gr1first);
      }
    });

    // console.log("gr1: ", gr1);
    // console.log("gr2: ", gr2);
    // add grops of clones to the slider
    slider.appendChild(gr2);
    const firstSlide = slides[0];
    slider.insertBefore(gr1, firstSlide);
  }, [amount]);

  const handleNavDots = useCallback((idx) => {
    // console.log("handle nav dots");
    const slider = document.getElementById("slides");
    const prev = slider.querySelector(".current");
    if (prev) prev.classList.remove("current");

    setCursor(idx);
    setAllowShift(false);
  }, []);

  const loadData = useCallback(() => {
    // console.log("load data");
    const wrapper = document.getElementById("slider");
    const slider = document.getElementById("slides");
    // progress class
    let prev = slider.querySelector(".current");
    if (prev) prev.classList.remove("current");
    wrapper.classList.remove("loaded");
    // get params
    let styles = window.getComputedStyle(slider.childNodes[0]);
    let slideWidth = +styles.width.split("p")[0]; // "330px"
    let sideMargin = +styles.marginLeft.split("p")[0]; // "4px"
    // slide size
    const localSize = slideWidth + 2 * sideMargin;
    // console.log("local size: ", localSize); // 338 -> 348 -> 38 ?
    setSize(localSize);
    // slides per width
    const spw = parseInt(wrapper.offsetWidth / localSize); // slides per width
    setClonesNum(spw);
    // render clones if needed
    // renderClonesOld(slider);
    if (amount > spw) {
      // display mode
      setGallery(false);
      // calc correction delta
      const correction = (wrapper.offsetWidth - localSize) / 2;
      setCorrection(correction);
      // update clones
      renderClones(slider, spw);
      slider.childNodes[spw + 1 + cursor].classList.add("current");
      // view correction
      const pos = (spw + 1) * localSize;
      setLeft(-(pos - correction)); // -(size - correction)
      slider.style.left = -(pos - correction) + "px"; // -(size - correction)
      // finished load
      wrapper.classList.add("loaded");
      setLoading(false);
      // auto correction view from prev params
      handleNavDots(0);
    } else {
      setGallery(true);
      setCorrection(0);
      // clear clones and classes markup
      let clones = slider.querySelectorAll(".clone");
      clones.forEach((clone) => clone.remove());
      let current = slider.querySelector(".current");
      if (current) current.classList.remove("current");
      // add new markup
      slider.childNodes.forEach((node) => node.classList.add("gallery"));
      // set centerview
      setLeft(sideMargin); // (sideMargin - correction = 0)
      slider.style.left = sideMargin + "px"; // (sideMargin - correction = 0)
      // finished
      wrapper.classList.add("loaded");
      setLoading(false);
    }
  }, [renderClones, cursor, amount, handleNavDots]);

  useLayoutEffect(() => {
    function resize() {
      // console.log("resize");
      loadData();
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [loadData, handleNavDots]);

  useEffect(() => {
    let mount = true;

    if (mount && loading) {
      loadData();
    }

    // allowShift vs cursor ?
    if (mount && !allowShift && !loading) {
      checkIndex();
    }

    return () => {
      mount = false;
    };
  }, [loading, loadData, allowShift, checkIndex]);

  // console.log("innerWidth: ", window.innerWidth);

  return (
    <div id="slider" className="slider" onMouseLeave={() => handleMouseLeave()}>
      <PureWrapper
        touched={touched}      
        // data={slides}        
        gallery={gallery}
        // The following event handlers are for touch compatibility:
        handleTouchStart={(e) => handleTouchStart(e)}
        handleTouchMove={(e) => handleTouchMove(e)}
        handleTouchEnd={(e) => handleTouchEnd(e)}
        // The following event handlers are for mouse compatibility:
        handleMouseDown={(e) => handleMouseDown(e)}
        handleMouseMove={(e) => handleMouseMove(e)}
        handleMouseUp={() => handleMouseUp()}
        // handleTransitionEnd={() => checkIndex()}
      />

      {!gallery && (
        <PureActions
          handleNext={(e) => handleNext()}
          handlePrev={(e) => handlePrev()}
          touched={touched}
        />
      )}
      {!gallery && (
        <PureDots
          num={amount}
          cursor={cursor}
          handleNavDots={handleNavDots}
        />
      )}
    </div>
  );
};

PureSlider.propTypes = {
  amount: PropTypes.number.isRequired
}

export default PureSlider;
