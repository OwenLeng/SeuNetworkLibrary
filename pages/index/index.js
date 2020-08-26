Page({
    data: {
        x: 0,
        y: 0
    },
    gotoMicbooks: function() {
        wx.navigateTo({
            url: "/pages/user/logs/logs"
        });
    },
    gotoManagement: function() {
        wx.navigateTo({
            url: "/pages/manager/login/login"
        });
    }
});