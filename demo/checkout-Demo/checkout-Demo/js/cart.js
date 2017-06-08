var vm = new Vue({
    el: "#app",
    data: {
        title: "hello",
        productList: [],
        totalMoney: 0,
        checkAllFlag: false,
        delFlag: false,
        curProduct: '',
    },
    filters: {
        formatMoney: function(val) {
            return "￥" + val.toFixed(2)
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.cartView();
        })
    },
    methods: {
        cartView: function() {
            var _this = this;
            this.$http.get("data/cartData.json", { "id": 123 }).then(function(res) {
                _this.productList = res.data.result.list;
                // _this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function(item, way) {
            if (way > 0) {
                item.productQuantity++;
            } else {
                item.productQuantity--;
                if (item.productQuantity < 1) {
                    item.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, "checked", true);
                //this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function(flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function(item, index) {

                if (typeof item.checked == 'undefined') {
                    //Vue.set(item, "checked", true);
                    _this.$set(item, "checked", _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }

            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function() {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },
        delConfirm: function(item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function() {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
});
Vue.filter("money", function(val, type) {
    return "￥" + val.toFixed(2) + type;
})