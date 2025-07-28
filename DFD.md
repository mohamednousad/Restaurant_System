
<!-- 📲 CUSTOMER  -->
[1] Customer sits at table
     ↓
[2] Scans QR code on the table
     ↓
[3] Redirects to web ordering system (specific to table)
     ↓
[4] Customer selects food items + table auto-selected
     ↓
[5] Chooses payment method (Online / Cash)
     ↓
[6] Places Order 
     ↓
[7] System records order with table number & status: "Pending"

<!-- 🧑‍🍳 WAITER -->
[8] Waiter views new order in system (filtered by status: "Pending")
     ↓
[9] Prepares and serves food → Updates status: "Served"
     ↓
[10] After customer finishes eating → Updates status: "Completed"


<!-- 📌 OPTIONAL: USER STATUS TRACKING -->
Customer sees live status:
   - Ordered ✅
   - Being Prepared 👨‍🍳
   - Served 🍽️
   - Completed ✅
