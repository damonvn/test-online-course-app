import React, { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import './QuillEditor.scss';
// import Quill from 'quill';
import Block from 'quill/blots/block';


const QuillEditor = () => {
    const quillRef = useRef(null);
    const [content, setContent] = useState('');  // Thêm state để lưu trữ nội dung

    useEffect(() => {
        quillRef.current = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['code-block'],
                    ['clean'],
                ],
            },
        });
    }, []);

    // Hàm lấy nội dung
    const getContent = () => {
        const content = quillRef.current.root.innerHTML; // Lấy nội dung HTML từ editor
        setContent(content);  // Cập nhật state content
    };

    return (
        <div style={{ marginTop: "60px", width: "100%", border: "1px solid red" }}>
            <div id="editor" style={{ height: '400px' }} />
            <button onClick={getContent}>Lưu Nội Dung</button> {/* Nút để lấy nội dung */}
            <h2 style={{ textAlign: "left" }}>Nội Dung Markdown:</h2>
            <div style={{ textAlign: "left", padding: "15px", border: "3px solid red" }}>
                <pre dangerouslySetInnerHTML={{ __html: content }} />  {/* Hiển thị nội dung từ state */}
            </div>
            <div style={{ height: "2000px" }}></div>
        </div>
    );
};

export default QuillEditor;
