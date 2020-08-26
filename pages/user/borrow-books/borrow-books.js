Page(function(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}({
    data: {
        isShow: !1,
        isbncode: ""
    },
    scanBtnOnClick: function() {
        wx.scanCode({
            success: function(e) {
                console.log("isbn" + e.result), wx.navigateTo({
                    url: "/pages/user/books-detail/books-detail?isbncode=" + e.result
                });
            }
        });
    },
    inputBtn: function() {
        this.setData({
            isShow: !0
        });
    },
    makeSure: function() {
        this.setData({
            isShow: !1
        });
    },
    cancelBtn: function() {
        this.setData({
            isShow: !1
        });
    },
    bindIsbncode: function(e) {
        this.setData({
            isbncode: e.detail.value
        });
    }
}, "makeSure", function() {
    var e = this.data.isbncode;
    e ? (wx.navigateTo({
        url: "/pages/user/books-detail/books-detail?isbncode=" + e
    }), this.setData({
        isShow: !1
    })) : wx.showToast({
        title: "请先输入ISBN码",
        icon: "none",
        duration: 2e3
    });
}));