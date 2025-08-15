import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../../../store/slices/cartSlice";
import {
  addOrder,
  createOrderRazorpay,
  updateTable,
  verifyPaymentRazorpay,
} from "../../../../services";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { removeAllItems } from "../../../../store/slices/cartSlice";
import { removeCustomer } from "../../../../store/slices/customerSlice";
import Invoice from "../../invoice";
import { motion }  from 'framer-motion'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Bill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", {
        variant: "warning",
      });

      return;
    }

    if (paymentMethod === "Online") {
      // load the script
      try {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
            variant: "warning",
          });
          return;
        }

        // create order

        const reqData = {
          amount: totalPriceWithTax.toFixed(2),
        };

        const { data } = await createOrderRazorpay(reqData);

        const options = {
          key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "RESTRO",
          description: "Secure Payment for Your Meal",
          order_id: data.order.id,
          handler: async function (response) {
            const verification = await verifyPaymentRazorpay(response);
            console.log(verification);
            enqueueSnackbar(verification.data.message, { variant: "success" });

            // Place the order
            const orderData = {
              customerDetails: {
                name: customerData.customerName,
                phone: customerData.customerPhone,
                guests: customerData.guests,
              },
              orderStatus: "In Progress",
              bills: {
                total: total,
                tax: tax,
                totalWithTax: totalPriceWithTax,
              },
              items: cartData,
              table: customerData.table.tableId,
              paymentMethod: paymentMethod,
              paymentData: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              },
            };

            setTimeout(() => {
              orderMutation.mutate(orderData);
            }, 1500);
          },
          prefill: {
            name: customerData.name,
            email: "",
            contact: customerData.phone,
          },
          theme: { color: "#025cca" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Payment Failed!", {
          variant: "error",
        });
      }
    } else {
      // Place the order
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: "In Progress",
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table.tableId,
        paymentMethod: paymentMethod,
      };
      orderMutation.mutate(orderData);
      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
    }
  };

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;
      console.log(data);

      setOrderInfo(data);

      // Update Table
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };

      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed!", {
        variant: "success",
      });
      setShowInvoice(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log(resData);
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.log(error);
    },
  });
 return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Subtotal</p>
        <p className="text-gray-800 font-medium">Rs.{total.toFixed(2)}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Tax (5.25%)</p>
        <p className="text-gray-800 font-medium">Rs.{tax.toFixed(2)}</p>
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700">Total</p>
        <p className="text-lg font-bold text-gray-900">
          Rs. {totalPriceWithTax.toFixed(2)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPaymentMethod("Cash")}
          className={`px-4 py-3 rounded-lg font-medium transition-all ${
            paymentMethod === "Cash"
              ? "border-2 border-yellow-500 text-yellow-600 bg-yellow-50"
              : "border border-gray-300 text-gray-600 hover:border-gray-400"
          }`}
        >
          Cash
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setPaymentMethod("Online")}
          className={`px-4 py-3 rounded-lg font-medium transition-all ${
            paymentMethod === "Online"
              ? "border-2 border-yellow-500 text-yellow-600 bg-yellow-50"
              : "border border-gray-300 text-gray-600 hover:border-gray-400"
          }`}
        >
          Online
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-medium transition-colors"
        >
          Print Receipt
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePlaceOrder}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg font-medium transition-colors"
        >
          Place Order
        </motion.button>
      </div>

      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </motion.div>
  );
};

export default Bill;
