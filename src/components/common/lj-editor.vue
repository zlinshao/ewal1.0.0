<template>
    <div class="editor">
        <div ref="editor"></div>
    </div>
</template>

<script>
    import Editor from 'wangeditor'
    // import api from '@/request/api'

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
                uptoken: null
            }
        },
        mounted () {
            var editor = new Editor(this.$refs.editor)
            // onchange事件
            editor.customConfig.onchange = (html) => {
                console.log('onchange', html)
                this.$emit('changeContent', html)
            }
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
            ]
            // 自定义字体
            editor.customConfig.fontNames = [
                '宋体',
                '微软雅黑',
                'Arial',
                'Tahoma',
                'Verdana'
            ]
            // 使用 base64 保存图片
            editor.customConfig.uploadImgShowBase64 = false

            // 隐藏“网络图片”tab
            editor.customConfig.showLinkImg = false

            // 允许上传到七牛云存储
            editor.customConfig.qiniu = true

            editor.create()

            // 编辑富文本
            if (this.editorContent) {
                editor.txt.html(this.editorContent)
            }
            // 初始化
            this.uploadInit(editor)
        },
        methods: {
            uploadInit (editor) {
                // 获取相关 DOM 节点的 ID
                var btnId = editor.imgMenuId
                var containerId = editor.toolbarElemId
                var textElemId = editor.textElemId
                // 创建上传对象
                api.upload().then(res => {
                    var uploader = window.Qiniu.uploader({
                        runtimes: 'html5,flash,html4',    //上传模式,依次退化
                        browse_button: btnId,       //上传选择的点选按钮，**必需**
                        uptoken: res.data.data,
                        unique_names: true,
                        domain: 'http://phx1pmugn.bkt.clouddn.com/', //bucket 域名，下载资源时用到，**必需**
                        container: containerId,           //上传区域DOM ID，默认是browser_button的父元素，
                        max_file_size: '100mb',           //最大文件体积限制
                        filters: {
                            mime_types: [
                                //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
                                { title: "图片文件", extensions: "jpg,gif,png,bmp" }
                            ]
                        },
                        max_retries: 3, //上传失败最大重试次数
                        dragdrop: true, //开启可拖曳上传
                        drop_element: textElemId, //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                        chunk_size: '4mb', //分块上传时，每片的体积
                        auto_start: true,  //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                        init: {
                            'FileUploaded': function(up, file, info) {
                                var domain = up.getOption('domain')
                                var res = window.$.parseJSON(info)
                                var sourceLink = domain + res.key //获取上传成功后的文件的Url
                                // 插入图片到editor
                                editor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
                            }
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="less">
    .w-e-toolbar {
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>

<style lang="less" scoped>
    .editor {
        width: 100%;
        height: 100vh;
        /* table 样式 */
        table {
            border-top: 1px solid #ccc;
            border-left: 1px solid #ccc;
        }
        table td,
        table th {
            border-bottom: 1px solid #ccc;
            border-right: 1px solid #ccc;
            padding: 3px 5px;
        }
        table th {
            border-bottom: 2px solid #ccc;
            text-align: center;
        }
        /* blockquote 样式 */
        blockquote {
            display: block;
            border-left: 8px solid #d0e5f2;
            padding: 5px 10px;
            margin: 10px 0;
            line-height: 1.4;
            font-size: 100%;
            background-color: #f1f1f1;
        }
        /* code 样式 */
        code {
            display: inline-block;
            *display: inline;
            *zoom: 1;
            background-color: #f1f1f1;
            border-radius: 3px;
            padding: 3px 5px;
            margin: 0 3px;
        }
        pre code {
            display: block;
        }
        /* ul ol 样式 */
        ul, ol {
            margin: 10px 0 10px 20px;
        }
    }
</style>
