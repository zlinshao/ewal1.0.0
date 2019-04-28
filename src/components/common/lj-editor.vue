<template>
    <div class="editor">
        <div ref="editor" style="text-align: left"></div>
    </div>
</template>

<script>
    import Editor from 'wangeditor'

    export default {
        name: 'lj-editor',
        props: {
            editorContent: { // 富文本内容
                type: String,
                default: ''
            }
        },
        data () {
            return {
                uptoken: null,
            }
        },
        mounted () {
            var editor = new Editor(this.$refs.editor);

            editor.customConfig.onchange = (html) => {// onchange事件
                console.log('onchange', html);
                this.$emit('changeContent', html)
            };
            // 自定义菜单配置
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ];
            // 自定义字体
            editor.customConfig.fontNames = [
                '宋体',
                '微软雅黑',
                'Arial',
                'Tahoma',
                'Verdana'
            ];
            // 使用 base64 保存图片
            editor.customConfig.uploadImgShowBase64 = true;

            // 隐藏“网络图片”tab
            editor.customConfig.showLinkImg = false;

            // 允许上传到七牛云存储
            // editor.customConfig.qiniu = true;

            editor.create();

            // 编辑富文本
            if (this.editorContent) {
                editor.txt.html(this.editorContent)
            }

        },
        methods: {

        }
    }
</script>

