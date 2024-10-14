import Quill from 'quill';
import Block from 'quill/blots/block';

const QuillCustom = () => {
    class CustomCodeBlock extends Block {
        static create(value) {
            let pre = document.createElement('pre');
            let code = document.createElement('code');
            code.className = 'language-javascript';  // Bạn có thể thay đổi class này tùy theo ngôn ngữ nếu cần
            code.textContent = value || ''; // Thêm nội dung vào code nếu có value
            pre.appendChild(code);
            return pre;
        }

        static formats(value) {
            return value || true; // Trả về giá trị của block nếu có
        }

        format(name, value) {
            if (name === 'code-block' && value) {
                this.domNode.firstChild.textContent = value;
            } else {
                super.format(name, value);
            }
        }
    }
    CustomCodeBlock.blotName = 'code-block';
    CustomCodeBlock.tagName = 'pre';
    CustomCodeBlock.className = 'ql-code-block';

    // Đăng ký custom blot
    Quill.register(CustomCodeBlock, true);
    return Quill;
}
