import React, { useRef, useState, useEffect } from 'react';
import './App.scss'
import QuillEditor from './QuillEditor';
import UdemyMenu from './UdemyMenu';
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import NewQuill from './NewQuill'

function App() {
  const [toggle, setToggle] = useState(true)
  const rightMenuRef = useRef(null);
  const leftContentRef = useRef(null);

  const handleToggle = () => {
    setToggle((prev) => {
      if (prev) {
        setToggle(false);
        setTimeout(() => {
          const codeBlocks = document.querySelectorAll('.client-ql-editor .ql-syntax');
          if (codeBlocks.length > 0) {
            codeBlocks.forEach((block, idx) => {
              const copyBtn = block.querySelector(".copy-btn")
              if (copyBtn) {
                if (copyBtn.style.position === "fixed") {
                  const btnWidth = copyBtn.getBoundingClientRect().width;
                  const blockLeft = block.getBoundingClientRect().left;
                  const blockWidth = block.getBoundingClientRect().width;
                  copyBtn.style.left = `${blockLeft + blockWidth - btnWidth - 8}px`;
                  copyBtn.style.right = "auto";
                }
              }
            });
          }
        }, 50);
      } else {
        setToggle(true);
        setTimeout(() => {
          const codeBlocks = document.querySelectorAll('.client-ql-editor .ql-syntax');
          if (codeBlocks.length > 0) {
            codeBlocks.forEach((block, idx) => {
              const copyBtn = block.querySelector(".copy-btn");
              if (copyBtn) {
                if (copyBtn.style.position === "fixed") {
                  const btnWidth = copyBtn.getBoundingClientRect().width;
                  const blockLeft = block.getBoundingClientRect().left;
                  const blockWidth = block.getBoundingClientRect().width;
                  copyBtn.style.left = `${blockLeft + blockWidth - btnWidth - 8}px`;
                  copyBtn.style.right = "auto";
                }
              }
            });
          }
        }, 50);
      }
    })
  }

  const handleClick1 = (event, id) => {
    const rightMenu = rightMenuRef.current;
    if (rightMenu) {
      const scrollPosition = event.target.getBoundingClientRect().top;
      setTimeout(() => {
        if (id === 1) {
          rightMenu.scrollTop += scrollPosition - 60;
        } else if (id === 2) {
          rightMenu.scrollTop += scrollPosition - 61;
        }
      }, 50)
    }
  };

  const handleScroll = () => {
    const leftContent = leftContentRef.current;
    if (leftContent) {
      const codeBlocks = leftContent.querySelectorAll('.client-ql-editor .ql-syntax');
      if (codeBlocks.length > 0) {
        codeBlocks.forEach((block, idx) => {
          const blockTop = block.getBoundingClientRect().top;
          const copyButton = block.querySelector('.copy-btn');
          const bottomPosition = block.getBoundingClientRect().bottom;
          const leftBlock = block.getBoundingClientRect().left;
          const leftWidth = block.getBoundingClientRect().width;

          if (copyButton) {
            const btnWidth = copyButton.getBoundingClientRect().width;
            if (bottomPosition <= 38) {
              if (copyButton.style.visibility !== "hidden") {
                copyButton.style.visibility = "hidden";
              }
            } else {
              if (copyButton.style.visibility !== "visible") {
                copyButton.style.visibility = "visible";
              }
              if (blockTop <= 0) {
                if (copyButton.style.position === "absolute") {
                  copyButton.style.position = "fixed";
                  copyButton.style.left = `${leftBlock + leftWidth - btnWidth - 8}px`;
                  copyButton.style.right = "auto";
                }
              } else {
                if (copyButton.style.position === "fixed") {
                  copyButton.style.position = "absolute";
                  copyButton.style.right = "8px";
                  copyButton.style.left = "auto";
                }
              }
            }
          }
        })
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", height: "4000px" }}>
      <div ref={leftContentRef} style={{ width: toggle ? "70%" : "100%" }}>
        <button
          className="right-toggle-button"
          onClick={(e) => handleToggle(e)}
          style={{ display: !toggle ? "flex" : "none" }}
        >
          <ArrowLeftOutlined style={{ display: "flex", justifyContent: "center" }} />
          <span className='text-content' style={{ fontSize: "16px", fontWeight: "bold", height: "20px", lineHeight: "20px" }}>Course content</span>
        </button>
        {/* <header className='course-header'></header> */}
        <NewQuill />
      </div>
      <div style={{ display: toggle ? "flex" : "none", width: "30%", height: "100vh", overflow: 'auto', position: 'fixed', top: 0, right: 0, borderLeft: "1px solid #e0e0e0", paddingLeft: "1px", backgroundColor: "#f7f9fa" }}>
        <div className='closeRightMenu'><span className='title'>Course content</span> <CloseOutlined className='closeRightMenu-button' onClick={(e) => handleToggle(e)} /></div>
        <div ref={rightMenuRef} style={{ width: "30%", height: "calc(100vh - 60px)", overflow: 'auto', position: 'fixed', top: 60, right: 0 }}>
          <UdemyMenu handleClick={handleClick1} />
        </div>
      </div>
    </div >
  )
}

export default App;