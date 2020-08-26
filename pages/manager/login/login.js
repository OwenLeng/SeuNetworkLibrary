getApp();

Page({
    data: {
        percent: 0,
        errorStatus: !1
    },
    formSubmit: function(a) {
        var e = a.detail.value.username, t = a.detail.value.password;
        e ? t ? (wx.showLoading({
            title: "正在登陆...",
            mask: !0,
            success: function(a) {}
        }), wx.request({
            url: getApp().globalData.url + "/BookManagement/Login",
            data: {
                username: e,
                password: t
            },
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                console.log(a.data), a.data ? wx.navigateTo({
                    url: "/pages/manager/admin/addBook"
                }) : wx.showToast({
                    title: "请检查用户名或密码是否正确！",
                    icon: "none",
                    duration: 2e3
                });
            }
        })) : wx.showToast({
            title: "请输入密码",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入用户名",
            icon: "none",
            duration: 2e3
        });
    }
});