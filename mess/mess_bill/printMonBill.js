var monthly_bill = `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<title>Example 1</title>
<link rel="stylesheet" href="monthly_bill.css" media="all" />
<script src="bill.js"></script>
</head>

<body>
<header class="clearfix">
    <div id="logo">
    <img src="../login_page/logo.png">
    </div>
    <h1>Student Invoice</h1>
    <div id="student-info">
    <h2>
        <div><span>NAME</span> Shubham Verma</div>
    </h2>
    <h2>
        <div><span>ROLL NO</span> MCA/10012/23</div>
    </h2>
    <h2>
        <div><span>ADDRESS</span> HZB</div>
    </h2>
    <h2>
        <div><span>EMAIL</span>xyz@gmail.com</div>
    </h2>
    <h2>
        <div><span>DATE</span> 31/01/2024</div>
    </h2>
    </div>
</header>
<main>
    <table>
    <thead>
        <tr>
        <th class="service">BILL NO.</th>
        <th class="desc">HOSTEL</th>
        <th>AMOUNT</th>
        <th>REMARKS</th>
        <th>DATE</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td class="billno">123893782</td>
        <td class="hostel">5</td>
        <td class="amount" id="feb-bill"></td>
        <td class="remarks" id="mname"></td>
        <td class="date">31/01/2024</td>
        </tr>
        <tr>
        <td colspan="4" class="grand total">GRAND TOTAL</td>
        <td class="grand total">192.00</td>
        </tr>
    </tbody>
    </table>
    <div id="notices">
</main>
<footer>
    This is an auto generated invoice.
</footer>
</body>
</html>        
`

function printUserData() {
    var printWindow = window.open("", "_blank");
    printWindow.document.write(monthly_bill)
    printWindow.document.close();
    printWindow.print();

}


