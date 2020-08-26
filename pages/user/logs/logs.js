var n = getApp();

Page({
    data: {
        userInfo: "",
        isShow: !0,
        ifInput: !1,
        nameInput: "",
        nameInputPassword: "",
        ifPassword: !1
    },
    handleClick: function() {
        var n = this.data.userInfo;
        if (console.log(n), n) if (this.data.ifInput) if (this.data.ifPassword) {
            wx.showLoading({
                title: "正在登陆...",
                mask: !0,
                success: function(n) {}
            });
            var t = this.data.nameInput, o = this.data.nameInputPassword;
            wx.request({
                url: getApp().globalData.url + "/BookManagement/userLogin",
                data: {
                    username: t,
                    password: o
                },
                method: "GET",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(n) {
                    console.log(n.data), n.data ? wx.switchTab({
                        url: "/pages/user/main/main"
                    }) : wx.showToast({
                        title: "请检查用户名或密码是否正确！",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        } else wx.showToast({
            title: "请输入密码",
            icon: "none",
            duration: 500
        }); else wx.showToast({
            title: "请输入姓名",
            icon: "none",
            duration: 500
        }); else wx.showToast({
            title: "请授权数据",
            icon: "none",
            duration: 500
        });
    },
    onLoad: function(n) {
        console.log(this), this.getUserInfo();
    },
    handleGetUserInfo: function(n) {
        console.log("用户点击了：" + n), n.detail.rawData && this.getUserInfo();
    },
    getUserInfo: function() {
        var t = this;
        wx.getUserInfo({
            success: function(o) {
                t.setData({
                    userInfo: o.userInfo
                }), n.globalData.userInfo = t.data.userInfo, t.setData({
                    isShow: !1
                });
            },
            fail: function() {
                console.log("获取用户数据失败");
            }
        });
    },
    bindInput: function(n) {
        this.setData({
            nameInput: n.detail.value
        }), this.data.userInfo.nickName = n.detail.value, this.data.ifInput = !0;
    },
    bindInputPassword: function(n) {
        this.setData({
            nameInputPassword: n.detail.value
        }), this.data.ifPassword = !0;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});