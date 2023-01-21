import React from "react";
import "./header.css";
import InfiniteLooper from "./InfiniteLooper.tsx";
import demo1 from '../res/demo1.png'
import demo2 from '../res/demo2.png'
import demo3 from '../res/demo3.png'
import deco1 from '../res/deco1.gif';
import deco2 from '../res/deco2.gif';
import deco3 from '../res/deco3.gif';
const Header = () => {
  return (
    <header className="intro">
      <div className="top-header">
        <p className="pitch">Put an end to misogyny in <br/> your <span className="workplace-text">Workplace</span></p>
      </div>
      <div className="bottom-header">

      </div>
      <InfiniteLooper speed="15" direction="right">
        <div className="contentBlock contentBlock--one">
          <img src={demo1} className="scroller-photo"/>
        </div>
        <div className="contentBlock contentBlock--one">
          <img src={demo2} className="scroller-photo"/>
        </div>
        <div className="contentBlock contentBlock--one">
          <img src={deco1} className="scroller-photo"/>
        </div>
        <div className="contentBlock contentBlock--one">
          <img src={demo3} className="scroller-photo"/>
        </div>
        <div className="contentBlock contentBlock--one">
          <img src={deco2} className="scroller-photo"/>
        </div>
    </InfiniteLooper>
    </header>
    
    
  );
};

export default Header;
