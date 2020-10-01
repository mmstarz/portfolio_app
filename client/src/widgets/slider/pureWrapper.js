import React from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
// els
import PureSlide from "./pureSlide";

const PureWrapper = ({
  // data,
  slides,
  touched,
  gallery,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTransitionEnd,
}) => { 

  /* RENDER FUNC */

  const randomColor = () => {
    let res = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return res;
  };

  // API.makeFileURL(postImage[0].thumbnail)

  const handlePlaceholder = () => {
    const width = "100%";
    const height = "100%";
    const bgColor = randomColor(); // "#9e9e9e"
    const textColor = "white";
    const fontSize = "20px";
    const fontFamily =
      "Droid Serif, -apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;";
    const fontWeight = "bold";
    const text = "image not set";

    const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect fill="${bgColor}" width="${width}" height="${height}"/>
    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>
    </svg>`;

    const cleaned = str
      .replace(/[\t\n\r]/gim, "") // Strip newlines and tabs
      .replace(/\s\s+/g, " ") // Condense multiple spaces
      .replace(/'/gim, "\\i"); // Normalize quotes

    const encoded = encodeURIComponent(cleaned)
      .replace(/\(/g, "%28") // Encode brackets
      .replace(/\)/g, "%29");

    return `data:image/svg+xml;charset=UTF-8,${encoded}`;
  };

  const renderDefaultData = () => {
    return slides.map((item) => {
      return (
        <PureSlide key={item._id} imagesrc={handlePlaceholder()} {...item} />
      );
    });
  };

  return (
    <div
      draggable={!gallery}
      className={touched && !gallery ? "screen active" : "screen nonactive"}
      // The following event handlers are for touch compatibility:
      onTouchStart={!gallery ? (e) => handleTouchStart(e) : null}
      onTouchMove={!gallery ? (e) => handleTouchMove(e) : null}
      onTouchEnd={!gallery ? (e) => handleTouchEnd(e) : null}
      // The following event handlers are for mouse compatibility:
      onMouseDown={!gallery ? (e) => handleMouseDown(e) : null}
      onMouseMove={!gallery ? (e) => handleMouseMove(e) : null}
      onMouseUp={!gallery ? () => handleMouseUp() : null}
    >
      <div
        id="slides"
        className={!gallery ? "slides" : "slides gal"}
        // transition events
        // onTransitionEnd={() => handleTransitionEnd()}
      >
        {renderDefaultData()}
      </div>
    </div>
  );
};

PureWrapper.propTypes = {
  slides: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    slides: state.stuff.slides.data,
  };
};

export default connect(mapStateToProps, null)(PureWrapper);
