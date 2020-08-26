Page({
    data: {
        bookMsg: {}
    },
    onLoad: function(o) {
        getApp().globalData.authorization;
        var a = this;
        wx.request({
            url: getApp().globalData.url + "/BookManagement/getDetailByBookId",
            data: {
                isbncode: o.isbncode
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                console.log(o.data.data), o.data.success ? a.setData({
                    bookMsg: o.data.data
                }) : (wx.showToast({
                    title: "书库暂无此书，请核对ISBN码",
                    icon: "none",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3));
            }
        });
    },
    borrowBtn: function() {
        var o = this, a = getApp().globalData.userInfo;
        console.log(a.nickName, o.data.bookMsg.isbncode), wx.request({
            url: getApp().globalData.url + "/BookManagement/borrowBook",
            data: {
                userid: a.nickName,
                isbncode: o.data.bookMsg.isbncode,
                author: o.data.bookMsg.author,
                bookname: o.data.bookMsg.bookname,
                bookcode: o.data.bookMsg.bookcode
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                o.data.success && (wx.showToast({
                    title: "借书成功",
                    icon: "success",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3)), o.data.success || wx.showToast({
                    title: "借书失败",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    }
});