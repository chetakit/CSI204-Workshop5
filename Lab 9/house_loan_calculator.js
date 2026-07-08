function calculateLoan() {
  const housePrice = parseFloat(document.getElementById("housePrice").value);
  const downPayment = parseFloat(document.getElementById("downPayment").value);
  const interestRate = parseFloat(
    document.getElementById("interestRate").value,
  );
  const years = parseInt(document.getElementById("years").value);

  // Validation
  if (
    isNaN(housePrice) ||
    isNaN(downPayment) ||
    isNaN(interestRate) ||
    isNaN(years)
  ) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  if (downPayment >= housePrice) {
    alert("เงินดาวน์ต้องน้อยกว่าราคาบ้าน");
    return;
  }

  // วงเงินกู้
  const loanAmount = housePrice - downPayment;

  document.getElementById("loanAmount").value =
    formatMoney(loanAmount) + " บาท";

  // สูตร Effective Rate
  const monthlyRate = interestRate / 100 / 12;
  const months = years * 12;

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  let balance = loanAmount;
  let totalInterest = 0;

  let table = `
    <table>

    <tr>

    <th>งวด</th>
    <th>ค่างวด</th>
    <th>เงินต้น</th>
    <th>ดอกเบี้ย</th>
    <th>คงเหลือ</th>

    </tr>
    `;

  // แสดงอย่างน้อย 12 งวดแรก
  const showRows = Math.min(12, months);

  for (let i = 1; i <= showRows; i++) {
    const interest = balance * monthlyRate;

    const principal = monthlyPayment - interest;

    balance -= principal;

    totalInterest += interest;

    table += `

        <tr>

        <td>${i}</td>

        <td>${formatMoney(monthlyPayment)}</td>

        <td>${formatMoney(principal)}</td>

        <td>${formatMoney(interest)}</td>

        <td>${formatMoney(Math.max(balance, 0))}</td>

        </tr>

        `;
  }

  table += "</table>";

  // คำนวณดอกเบี้ยรวมทั้งสัญญา
  balance = loanAmount;
  totalInterest = 0;

  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;

    const principal = monthlyPayment - interest;

    balance -= principal;

    totalInterest += interest;
  }

  const totalPayment = loanAmount + totalInterest;

  document.getElementById("summary").innerHTML = `

    <div class="summary-grid">

        <div class="summary-card">

            <h3>วงเงินกู้</h3>

            <p>${formatMoney(loanAmount)} บาท</p>

        </div>

        <div class="summary-card">

            <h3>จำนวนงวด</h3>

            <p>${months} งวด</p>

        </div>

        <div class="summary-card">

            <h3>ค่างวดต่อเดือน</h3>

            <p>${formatMoney(monthlyPayment)} บาท</p>

        </div>

        <div class="summary-card">

            <h3>ดอกเบี้ยรวม</h3>

            <p>${formatMoney(totalInterest)} บาท</p>

        </div>

        <div class="summary-card">

            <h3>ยอดชำระทั้งหมด</h3>

            <p>${formatMoney(totalPayment)} บาท</p>

        </div>

    </div>

    `;

  document.getElementById("tableArea").innerHTML = table;
}

// ฟอร์แมตตัวเลข
function formatMoney(number) {
  return Number(number).toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
