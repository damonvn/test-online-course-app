import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Styles for Quill Editor

// import 'highlight.js/styles/monokai-sublime.css';  // Styles for code highlighting
// import 'highlight.js/styles/monokai.css';  // Styles for code highlighting
// import 'highlight.js/styles/vs2015.css';  // Styles for code highlighting
// import 'highlight.js/styles/night-owl.css';  // Styles for code highlighting
// import 'highlight.js/styles/vs.css';  // Styles for code highlighting
// import 'highlight.js/styles/xcode.css';  // Styles for code highlighting
import 'highlight.js/styles/tomorrow-night-blue.css';  // Styles for code highlighting
// import 'highlight.js/styles/tokyo-night-dark.css';  // Styles for code highlighting
// import 'highlight.js/styles/atom-one-dark.css';  // Styles for code highlighting
// import 'highlight.js/styles/rainbow.css';  // Styles for code highlighting
// import 'highlight.js/styles/androidstudio.css';  // Styles for code highlighting
// import 'highlight.js/styles/gradient-dark.css';  // Styles for code highlighting
// import 'highlight.js/styles/color-brewer.css';  // Styles for code highlighting
// import 'highlight.js/styles/night-owl.css';  // Styles for code highlighting

import hljs from 'highlight.js';
import './NewQuill.css';
import CopyIcon from './CopyIcon';


const NewQuill = () => {
    const [content, setContent] = useState('');
    const [feContent, setFeContent] = useState('');
    const refContent = useRef(null)
    const refMarkDown = useRef(null)

    // Function to handle change in Quill Editor
    const handleEditorChange = (value) => {
        setContent(value);
    };

    // Function to highlight code blocks using highlight.js
    const renderHighlightedContent = (content) => {
        const div = document.createElement('div');
        div.innerHTML = content;
        const blocks = div.querySelectorAll('pre code');
        blocks.forEach((block) => {
            hljs.highlightBlock(block);
        });

        const codeBlocks = div.querySelectorAll(".ql-syntax");
        codeBlocks.forEach((block) => {
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.style.position = 'absolute';
            btn.style.top = "6px";
            btn.style.right = "8px";
            btn.textContent = 'Copy code'; // Thêm nhãn cho button
            block.style.position = 'relative';
            block.appendChild(btn)
        });

        return div.innerHTML;
    };

    const addedButtonHTML = () => {
        if (refContent.current) {
            const blocks = refContent.current.editor.root.querySelectorAll(".ql-syntax");
            console.log("check blocks: ", blocks);
            blocks.forEach((block) => {
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.style.position = 'absolute';
                btn.style.top = "6px";
                btn.style.right = "8px";
                btn.style.width = "105px";
                btn.style.height = "26px";
                btn.style.display = "flex";
                btn.style.alignItems = "center";
                btn.style.justifyContent = "center";
                btn.style.borderRadius = "4px";
                const btnIcon = document.createElement('span');
                btnIcon.style.marginRight = "5px";
                btnIcon.style.paddingTop = "2.5px";
                btnIcon.innerHTML = CopyIcon();
                const btnTxt = document.createElement('span');
                btnTxt.textContent = "Copy code";
                btnTxt.style.fontSize = "12px";
                btn.appendChild(btnIcon);
                btn.appendChild(btnTxt);
                block.style.position = 'relative';
                block.appendChild(btn)
            });
            return refContent.current.editor.root.innerHTML;
        } else {
            return '';
        }
    }

    const getContent = () => {
        const hmtl = addedButtonHTML();
        setFeContent(hmtl);
    }

    return (
        <div style={{ maxWidth: "1024px", margin: "auto" }}>
            <ReactQuill
                value={content}
                onChange={handleEditorChange}
                modules={modules}
                formats={formats}
                theme="snow"
                ref={refContent}
            />
            <button
                style={{ margin: "20px", backgroundColor: "green" }}
                onClick={() => getContent()}
            >
                Get Content
            </button>

            {/* Render highlighted content */}
            <div
                ref={refMarkDown}
                className="client-ql-editor"
                dangerouslySetInnerHTML={{ __html: feContent }}
            />
        </div >
    );
};

// Define modules and formats for Quill editor
const modules = {
    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value, // Use highlight.js for syntax highlighting
    },
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
    ],
};

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link', 'code-block'
];

export default NewQuill;
