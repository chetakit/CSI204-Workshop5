function generateTable() {
  let loanAmount = parseFloat(document.getElementById("loanAmount").value);

  let interestRate =
    parseFloat(document.getElementById("interestRate").value) / 100 / 12;

  let months = parseInt(document.getElementById("months").value);

  if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(months)) {
    alert("กรุณากรอกข้อมูลให้ครบ");

    return;
  }

  // สูตรคำนวณค่างวด

  let monthlyPayment =
    (loanAmount * interestRate * Math.pow(1 + interestRate, months)) /
    (Math.pow(1 + interestRate, months) - 1);

  let html = `

<table>

<tr>

<th>งวด</th>

<th>ค่างวด</th>

<th>ดอกเบี้ย</th>

<th>เงินต้น</th>

<th>คงเหลือ</th>

</tr>

`;

  let remain = loanAmount;

  let totalInterest = 0;

  for (let i = 1; i <= months; i++) {
    let interest = remain * interestRate;

    let principal = monthlyPayment - interest;

    remain -= principal;

    totalInterest += interest;

    html += `

<tr>

<td>${i}</td>

<td>${monthlyPayment.toFixed(2)}</td>

<td>${interest.toFixed(2)}</td>

<td>${principal.toFixed(2)}</td>

<td>${Math.max(0, remain).toFixed(2)}</td>

</tr>

`;
  }

  html += "</table>";

  document.getElementById("amortizationTable").innerHTML = html;

  document.getElementById("summary").innerHTML = `

ยอดผ่อนต่อเดือน :

${monthlyPayment.toFixed(2)} บาท<br>

ดอกเบี้ยรวม :

${totalInterest.toFixed(2)} บาท<br>

ยอดชำระทั้งหมด :

${(loanAmount + totalInterest).toFixed(2)} บาท

`;
}
