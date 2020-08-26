Page({
    data: {
        userInfo: {},
        username: ""
    },
    onLoad: function() {
        var e = getApp().globalData.userInfo;
        console.log(e), this.setData({
            userInfo: e
        });
    },
    userHistoryBtn: function() {
        wx.navigateTo({
            url: "/pages/user/user-history/user-history"
        });
    },
    userCommentBtn: function() {
        wx.navigateTo({
            url: "/pages/user/user-comment/user-comment"
        });
    },
    exitBtnOnClick: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});