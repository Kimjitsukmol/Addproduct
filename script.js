const products = [];

function addProduct() {
    const id = document.getElementById("productId").value.trim();
    const name = document.getElementById("productName").value.trim();
    const sell = parseFloat(document.getElementById("sellPrice").value);
    
    if (!id || !name || isNaN(sell)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    const product = {
        "รหัสสินค้า": id,
        "ชื่อสินค้า": name,
        "ราคาขาย": sell,
    };

    products.push(product);
    updateTable();

    // เคลียร์ช่องกรอก
    document.getElementById("productId").value = '';
    document.getElementById("productName").value = '';
    document.getElementById("sellPrice").value = '';
}

function updateTable() {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = '';
    products.forEach(p => {
        const row = `<tr>
          <td>${p["รหัสสินค้า"]}</td>
          <td>${p["ชื่อสินค้า"]}</td>
          <td>${p["ราคาขาย"]}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function downloadJSON() {
    if (products.length === 0) {
        alert("ยังไม่มีข้อมูลให้บันทึก");
        return;
    }

    const jsonStr = JSON.stringify(products, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    document.body.appendChild(a); // เพิ่มไว้ใน body ชั่วคราว
    a.click();
    document.body.removeChild(a); // เอาออกหลังคลิก
    URL.revokeObjectURL(url);
}