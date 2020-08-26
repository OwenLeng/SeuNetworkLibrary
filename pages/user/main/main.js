Page({
    data: {
        inputSel: "",
        listName: "全部分类",
        booklist: [],
        pageSize: 10,
        isShow: !1
    },
    onLoad: function() {
        this.data.pageSize;
        var a = this;
        wx.request({
            url: getApp().globalData.url + "/BookManagement/queryBookList",
            data: {
                success: 0
            },
            header: {
                "content-type": "application/json"
            },
            method: "get",
            success: function(t) {
                if (t.data) {
                    a.setData({
                        isShow: !0
                    });
                    for (var e = 0; e < t.data.length; e++) t.data[e].success = parseInt(t.data[e].success);
                }
                a.setData({
                    booklist: t.data
                }), t.data && a.setData({
                    isShow: !0
                });
            }
        });
    },
    onShow: function() {
        this.data.pageSize;
        var a = this;
        wx.request({
            url: getApp().globalData.url + "/BookManagement/queryBookList",
            data: {
                success: 0
            },
            header: {
                "content-type": "application/json"
            },
            method: "get",
            success: function(t) {
                if (t.data) {
                    a.setData({
                        isShow: !0
                    });
                    for (var e = 0; e < t.data.length; e++) t.data[e].success = parseInt(t.data[e].success);
                }
                a.setData({
                    booklist: t.data
                }), t.data && a.setData({
                    isShow: !0
                });
            }
        });
    },
    searchBook: function() {
        var a = this;
        wx.request({
            url: getApp().globalData.url + "/BookManagement/likeQueryBook",
            data: {
                bookname: a.data.inputSel
            },
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (t.data) {
                    a.setData({
                        isShow: !0
                    });
                    for (var e = 0; e < t.data.length; e++) t.data[e].success = parseInt(t.data[e].success);
                }
                a.setData({
                    booklist: t.data
                }), t.data && a.setData({
                    isShow: !0
                });
            }
        });
    },
    bindInputSel: function(a) {
        this.setData({
            inputSel: a.detail.value
        });
    },
    viewAllList: function() {
        var a = this.data.isShow;
        this.setData({
            isShow: !a
        });
    },
    bookDetail: function(a) {
        var t = a.currentTarget.dataset.msg.isbncode;
        wx.navigateTo({
            url: "/pages/user/books-detail/books-detail?isbncode=" + t
        });
    }
});