<template>
  <div class="form-group">
    <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="content" :editorToolbar="customToolbar">
    </vue-editor>
  </div>

</template>

<script>
import { VueEditor } from 'vue2-editor';
import * as qiniu from 'qiniu-js'
import { md5 } from '../../../static/js/MD5.js'

export default {
  props: {
    display: {
      type: Boolean
    }
  },
  components: {
    VueEditor,
  },
  data () {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
        //                    ['color','background'],
      ],
      token: '',
      myFiles: [],//附件
      showFile: [],
      content: '',
    }
  },
  created () { },
  mounted () { },
  watch:{
    content(){
      this.$emit('changeContent',this.content)
    }
  },
  methods: {
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append('file', file);
      console.log(file);

      this.myFiles.push(file);
      this.uploadPic(Editor, cursorLocation);
    },
    // 图片地址
    showPhoto (val, type, name) {
      let data = {};
      data.info = {};
      data.uri = val;
      data.info.mime = type;
      data.name = name;
      this.showFile.push(data);
    },
    // 获取token
    uploadPic (Editor, cursorLocation) {
      if (this.token) {
        this.startUpload(Editor);
      } else {
        this.$http.get(globalConfig.upload_sever + 'api/v1/token').then(res => {
          this.token = res.data.data;
          this.startUpload(Editor);
        })
      }
    },
    // 开始上传
    startUpload (Editor, cursorLocation) {
      let that = this;
      let files = this.myFiles;
      for (let file of files) {
        let reader = new FileReader();//构造FileReader对象
        let fileType = '';
        let fileName = file.name;
        let fileSize = file.size;
        let key = "lejia" + md5(fileName + new Date().getTime()).toLowerCase() + "." + fileName.split(".")[1];
        reader.readAsDataURL(file);
        reader.onload = function (event) {
          if (file.type.includes('image') || file.type.includes('video')) {
            if (file.type.includes('image')) {
              fileType = 'image';
              that.showPhoto(event.target.result, 'image', fileName);
            } else {
              fileType = 'video';
              that.showPhoto(event.target.result, 'video', fileName);
            }
          } else {
            if (fileName.includes('.xls')) {
              fileType = 'xls';
              that.showPhoto(event.target.result, 'xls', fileName);
            } else if (fileName.includes('.doc') || fileName.includes('.rtf')) {
              fileType = 'doc';
              that.showPhoto(event.target.result, 'doc', fileName);
            } else if (fileName.includes('.txt')) {
              fileType = 'text';
              that.showPhoto(event.target.result, 'txt', fileName);
            } else if (fileName.includes('.pdf')) {
              fileType = 'pdf';
              that.showPhoto(event.target.result, 'pdf', fileName);
            } else {
              fileType = 'file';
              that.showPhoto(event.target.result, 'file', fileName);
            }
          }
        };
        let putExtra = {
          fname: fileName,
          params: {},
          mimeType: [] || null
        };
        let config = {
          useCdnDomain: true,
        }
        let observable = qiniu.upload(file, key, that.token, putExtra, config);
        let subscription = observable.subscribe({
          next (res) {

          },
          error (err) {
            console.log(err);
          },
          complete (res) {
            console.log(res);
            let data = {};
            data.url = globalConfig.domain + res.key;
            data.name = res.key;
            data.raw_name = res.key;
            data.type = fileType;
            data.size = fileSize;
            that.$http.uploadServer(data).then(res => {
              if (res.code === "110100") {
                console.log(res);
                Editor.insertEmbed(cursorLocation, 'image', res.data.uri);
              }
            })
          }
        })
      }

    }
  }
}
</script>

