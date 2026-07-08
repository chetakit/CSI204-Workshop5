function createProducts() {
  const count = parseInt(document.getElementById("count").value);

  if (isNaN(count) || count <= 0) {
    alert("กรุณากรอกจำนวนสินค้า");

    return;
  }

  let html = `

<table>

<tr>

<th>สินค้า</th>

<th>ราคา</th>

<th>จำนวน</th>

</tr>

`;

  for (let i = 1; i <= count; i++) {
    html += `

<tr>

<td>

<input type="text"

id="name${i}"

placeholder="สินค้า ${i}">

</td>

<td>

<input type="number"

id="price${i}"

placeholder="ราคา">

</td>

<td>

<input type="number"

id="qty${i}"

placeholder="จำนวน">

</td>

</tr>

`;
  }

  html += `

</table>

<button onclick="calculate(${count})">

คำนวณยอดขาย

</button>

`;

  document.getElementById("productArea").innerHTML = html;
}

function calculate(count) {
  let subtotal = 0;

  let i = 1;

  // ---------- while ----------

  while (i <= count) {
    let price = parseFloat(document.getElementById(`price${i}`).value) || 0;

    let qty = parseInt(document.getElementById(`qty${i}`).value) || 0;

    subtotal += price * qty;

    i++;
  }

  // ---------- if ----------

  let discount = 0;

  if (subtotal >= 1000) {
    discount = subtotal * 0.1;
  } else if (subtotal >= 500) {
    discount = subtotal * 0.05;
  }

  // ---------- do while ----------

  let vat = 0;

  let run = false;

  do {
    vat = (subtotal - discount) * 0.07;

    run = true;
  } while (!run);

  let total = subtotal - discount + vat;

  document.getElementById("summary").innerHTML = `

ยอดรวมสินค้า :

${subtotal.toFixed(2)} บาท

<br>

ส่วนลด :

${discount.toFixed(2)} บาท

<br>

VAT 7% :

${vat.toFixed(2)} บาท

<br>

ยอดสุทธิ :

${total.toFixed(2)} บาท

`;
}
