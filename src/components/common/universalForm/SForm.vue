<template>
  <div class="json-form">
    <el-form ref="form" :rules="rules" :model="formModel" label-width="80px">
      <el-form-item v-if="isField" :prop="schema.prop" :label="schema.label">
        <component v-bind="schema.props"
                   :is="schema.component"
                   v-model="formModel[schema.prop]"
                   :schema="schema"
        />
      </el-form-item>
      <template v-else>
        <el-form-item v-for="(val, key) in schema"
                      :key="key"
                      :prop="key"
                      :label="val.label">
          <component v-bind="val.props"
                     :is="val.component"
                     v-model="formModel[key]"
                     :schema="val"
          />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
  import {equals, clone} from "ramda";

  const defaultOptions = {
    ui: "element-ui"
  };
  export default {
    name: "SForm",
    model: {
      prop: "model",
      event: "change"
    },
    props: {
      model: null,
      schema: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        default() {
          return {
            ...defaultOptions
          };
        }
      }
    },
    computed: {
      isField() {
        return this.schema.type && this.schema.prop;
      },
      rules() {
        if (this.isField) {
          return {
            [this.schema.prop]: this.schema.rules
          };
        } else {
          return Object.keys(this.schema).reduce((rules, key) => {
            const val = this.schema[key];
            if (val.rules) {
              rules[key] = val.rules;
            }
            return rules;
          }, {});
        }
      }
    },
    /**双向数据绑定 */
    watch: {
      model: {
        deep: true,
        immediate: true,
        handler() {
          if (this.isField) {
            if (!equals(this.formModel[this.schema.prop], this.model)) {
              this.$set(this.formModel, this.schema.prop, clone(this.model));
            }
          } else {
            if (!equals(this.formModel, this.model)) {
              this.formModel = clone(this.model);
            }
          }
        }
      },
      formModel: {
        deep: true,
        handler() {
          if (this.isField) {
            this.$emit("change", this.formModel[this.schema.prop]);
          } else {
            this.$emit("change", this.formModel);
          }
        }
      }
    },
    data() {
      return {
        formModel: {}
      }
    },
    methods: {
      submit() {
        return new Promise((resolve, reject) =>
          this.$refs.form.validate((ok, error) => {
            if (ok) {
              resolve({...this.formModel});
            } else {
              reject(error);
            }
          })
        );
      }
    }
  }
</script>

<style scoped>

</style>
