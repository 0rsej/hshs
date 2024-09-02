<?php
// إعداد الاتصال بقاعدة البيانات
$servername = "localhost"; // اسم الخادم (قد يختلف حسب إعداداتك)
$username = "root"; // اسم مستخدم MySQL
$password = ""; // كلمة المرور الخاصة بمستخدم MySQL
$dbname = "my_database"; // اسم قاعدة البيانات

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// استلام البيانات من النموذج
$cardNumber = $_POST['card-number'];
$expiryDate = $_POST['expiry-date'];
$cvv = $_POST['cvv'];

// إعداد SQL لإدخال البيانات
$sql = "INSERT INTO payments (card_number, expiry_date, cvv) VALUES ('$cardNumber', '$expiryDate', '$cvv')";

// تنفيذ SQL والتحقق من النجاح
if ($conn->query($sql) === TRUE) {
    header("Location: confirmation.html"); // إعادة توجيه المستخدم إلى صفحة التأكيد
    exit();
} else {
    echo "حدث خطأ: " . $sql . "<br>" . $conn->error;
}

// إغلاق الاتصال
$conn->close();
?>
