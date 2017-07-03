/**
 * Created by huanghx on 2017/6/26.
 */
//
import fileService from './fileService'
import apiHelper from './apiHelper'
import serviceHelper from './serviceHelper'
let userService = serviceHelper.requireService('user')
userService.exportExcel = async function () {
    let ret = await userService.getUsersToExcel()
    fileService.downloadTempFile(ret)
}

userService.login = async function (params) {
    params.returnUrlHash = '#!/h'
    let ret = await apiHelper.post('/Account/Login?returnUrl=none', params, {
        contentType: 'application/x-www-form-urlencoded'
    })

    return ret
}

// 重置密码
userService.resetPwd = function (params) {
    return apiHelper.post('/Account/ResetPassword', params, {
        contentType: 'application/x-www-form-urlencoded'
    })
}

// 注册
userService.register = function (params) {
    // IsExternalLogin=False&Name=asda&Surname=asdasd&EmailAddress=asd%40asd.asd&UserName=123asd&Password=asdasd123&PasswordRepeat=asdasd123
    return apiHelper.post('/Account/Register', params)
}

userService.logout = function () {
    apiHelper.get('/Account/Logout')
}
export default userService