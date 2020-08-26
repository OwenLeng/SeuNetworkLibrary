Page({
    data: {
        history: [],
        hasData: !1
    },
    onLoad: function(a) {
        var t = this, e = getApp().globalData.userInfo;
        wx.request({
            url: getApp().globalData.url + "/BookManagement/restBook",
            data: {
                userid: e.nickName
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                0 == a.data.length && t.setData({
                    hasData: !0
                }), t.setData({
                    history: a.data
                });
            },
            fail: function() {
                t.setData({
                    hasData: !0
                });
            }
        });
    }
});