<template>
  <div class="register-page page-wrapper d-flex flex-column flex-center">
    <div class="container">
      <div class="row d-flex flex-center">
        <div class="col-md-6 text-center pt-3 pb-5">
          <p class="h1 text--black">Register now</p>
          <el-card
            v-loading="loading"
            class="py-3 px-3">
            <div class="row">
              <div class="col-md-12">
                <el-form
                  @keyup.enter.native.prevent="validateForm('registerForm')"
                  :model="form"
                  :rules="rules"
                  ref="registerForm">
                  <el-form-item
                    label="Email"
                    prop="email" >
                    <el-input
                      suffix-icon="fa fa-at"
                      placeholder="john@example.com"
                      v-model="form.email"/>
                  </el-form-item>
                  <el-form-item
                    label="Password"
                    prop="password">
                    <el-input
                      suffix-icon="fa fa-asterisk"
                      placeholder="Enter your password"
                      v-model="form.password"
                      type="password"
                      auto-complete="off"/>
                  </el-form-item>
                  <el-form-item
                    class="mt-3"
                    label="Confirm Password"
                    prop="rePassword">
                    <el-input
                      suffix-icon="fa fa-asterisk"
                      placeholder="Enter your password again"
                      v-model="form.rePassword"
                      type="password"
                      auto-complete="off"/>
                  </el-form-item>
                  <div class="my-5"/>
                  <el-form-item>
                    <el-button
                      icon="fa fa-address-card-o"
                      class="w-50"
                      type="primary"
                      @click="validateForm('registerForm')">Sign up</el-button>
                    <el-button
                      icon="fa fa-undo"
                      @click="resetForm('registerForm')">Reset</el-button>
                  </el-form-item>
                </el-form>
                <div class="row social-signup d-flex flex-center">
                  <div class="col-10">
                    <el-button round><i
                      class="fa fa-google-plus-square mr-3 h8"
                      aria-hidden="true"/> Sign up with Google</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formActions from '../mixins/formActions'
export default {
  mixins: [formActions],
  data () {
    return {
      loading: false,
      form: {
        email: '',
        password: '',
        rePassword: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input a valid email address', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: 'Please input your password', trigger: 'blur' },
          { validator: this.validatePassword, trigger: 'blur' },
          { min: 6, trigger: 'blur', message: 'Password may not be less than 6 characters' }
        ],
        rePassword: [
          { required: true, message: 'Please verify your password', trigger: 'blur' },
          { validator: this.validateRePassword, trigger: 'blur' },
          { min: 6, trigger: 'blur', message: 'Password may not be less than 6 characters' }
        ]
      }
    }
  },
  methods: {
    validatePassword (rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.form.rePassword !== '') {
          this.$refs.registerForm.validateField('rePassword')
        }
        callback()
      }
    },
    validateRePassword (rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error(`Passwords don't match!`))
      } else {
        callback()
      }
    },
    submitForm () {
      this.loading = true
      this.$store.dispatch('registerUser', this.form)
      .then((res) => {
        console.log(res)
        this.loading = false
        this.$message.success(`User registered successfully`)
        this.$router.push({name: 'Home'})
      })
      .catch((error) => {
        this.loading = false
        this.$message.error(`${error}`)
      })
    }
  }
}
</script>
