class Product {
    constructor(pid) {
        this.pid = pid
        this.quantity = 1
    }
}

class Cart {
    constructor() {
        this.products = []
    }

    put(pid, count, badgeid) {
        const product = this.products.find(product => product.pid === pid)
        const index = window.products.findIndex(p => p.pid === pid)
        const badge = document.getElementById(badgeid)
        badge.innerHTML = count
        console.log(count)
        if (product) {
            // 購物車已經有此商品
            if (product.quantity < window.products[index].quantity) {
                product.quantity += 1
                alert(`已購買 ${window.products[index].name}${product.quantity}支`)

            }
            else {
                alert("此商品售罄!!")
            }
        } else {
            // 購物車沒有此商品
            this.products.push(new Product(pid))
            alert('加入購物車')
        }
        console.log(this.products)
    }

    add(pid, count, badgeid) {

        const product = this.products.find(p => p.pid === pid)
        const index = window.products.findIndex(p => p.pid === pid)
        document.getElementById(badgeid).innerHTML = count
        if (product) {
            if (product.quantity < window.products[index].quantity)
                product.quantity += 1
            else {
                alert('此商品賣完了!')
            }
        }
        this.show('cart-items', 'total_price')
        console.log(this.products)


    }

    minus(pid, count, badgeid) {
        const index = this.products.findIndex(p => p.pid === pid)
        document.getElementById(badgeid).innerHTML = count

        if (index !== -1) {
            if (this.products[index].quantity > 1) {
                this.products[index].quantity -= 1
            }
            else {

                if (confirm('你確定要刪除嗎')) {
                    this.products.splice(index, 1)
                }
                else
                    alert('取消刪除!')
            }
        }
        this.show('cart-items', 'total_price')
        console.log(this.products)



    }

    show(htmlCartList, htmltotalid) {

        const cartList = document.getElementById(htmlCartList)
        const total_id = document.getElementById(htmltotalid)
        let total = 0
        let count = 0

        let html = ''
        this.products.forEach(product => {
            let index = window.products.findIndex(p => p.pid === product.pid)
            count += product.quantity
            total += window.products.find(p => p.pid == product.pid).price * product.quantity
            html += `
                <div class="row border">
                    <div class="col-3 d-flex align-items-center justify-content-center border">
                        <img width="80px" src="${window.products[index].image}" alt="">
                    </div>
                    <div class="col-4 d-flex align-items-center justify-content-center d-inline">
                        ${window.products[index].name}
                    </div>
                    <div class="col-2 d-flex align-items-center justify-content-center">
                        $${window.products[index].price}
                    </div>
                    <div class="col-1 d-flex align-items-center justify-content-center">
                        <a href="javascript:void(0)" onclick="cart.minus('${product.pid}',--count,'cart-badge')" class="btn btn-primary btn-sm">-</a>
                    </div>
                    <div class="col-1 d-flex align-items-center justify-content-center">
                        ${product.quantity}
                    </div>
                    <div class="col-1 d-flex align-items-center justify-content-center">
                        <a href="javascript:void(0)" onclick="cart.add('${product.pid}',++count,'cart-badge')" class="btn btn-primary btn-sm">+</a>
                    </div>
                </div>
            `
        })
        html += '</table>'
        total_id.innerHTML = `<h1>商品:${count}件 <br>總計:${total}</h1>
                              <a class="btn btn-primary">結帳</a>                        
        `
        cartList.innerHTML = html

    }

}

