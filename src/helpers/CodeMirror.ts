import { reactive } from 'vue'
import CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/mode/javascript/javascript'

import 'codemirror/addon/comment/comment'

import 'codemirror/addon/selection/active-line'

import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/wrap/hardwrap'
import 'codemirror/keymap/vim'

import 'codemirror/addon/display/autorefresh'

import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/javascript-lint'

import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/fold/comment-fold'

export function codeMirrorEditor() {
    const mjEditor = reactive({
        editor: null,
        configure: {
            height: '350px',
            keymap: 'vim',
            direction: 'ltr',
            rtlMoveVisually: true,
            tabsize: 4,
            styleActiveLine: true, // 显示选中行的样式
            firstLineNumber: 1,
            indentUnit: 4,
            indentWithTabs: true, // 使用制表符进行智能缩进
            matchBrackets: true, // 匹配结束符号，比如"]、}"
            autoCloseBrackets: true, // 自动闭合符号
            autoRefresh: true,
            autofocus: true, // 自动聚焦
            smartIndent: true,
            lineNumbers: true,
            lineWrapping: true,
            readOnly: false,
            // 在行槽中添加行号显示器、折叠器、语法检测器
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"], 
            foldGutter: true, // 启用行槽中的代码折叠
            theme: 'darcula',
            mode: { name: 'javascript', globalVars: true},
        },
    })
    const mjCreateEditor = (elDiv: HTMLElement) => {
        mjEditor.editor = CodeMirror(elDiv, mjEditor.configure);
        console.log('-editor-', mjEditor.editor)
        mjEditor.editor.setSize(600, 600);
        mjEditor.editor.on('change', () => {
            mjEditor.editor.refresh();
        })
    }
    const mjUpdateCode = (value:any) => {
        mjEditor.editor.setValue(value)
        mjEditor.editor.indentLine();
        mjEditor.editor.refresh();
    }
    return {
        mjEditor,
        mjCreateEditor,
        mjUpdateCode,
    }
} 