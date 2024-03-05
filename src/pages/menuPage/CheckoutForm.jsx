import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is not a number or less than 1");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    //created a card elements
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("Success!");
      //console.log('[PaymentMethod]', paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.error("Error confirming payment:", confirmError);
      // Handle error accordingly
    } else {
      console.log("PaymentIntent:", paymentIntent);
      // Payment successful, handle success accordingly
    }
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent.id);
      setCardError(`Your TransactionId is: ${paymentIntent.id}`);
      //payment info data
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };
      console.log(paymentInfo)
      //send info to the backend
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        alert("Payment Successful!");
       navigate('/order')
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-start items-start gap-8">
      {/* left side */}
      <div className="md:w-1/2 w-full space-y-3 bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p className="text-gray-600">Total Price: ${price}</p>
        <p className="text-gray-600">Number of Items: {cart.length}</p>
      </div>
      {/* right side */}
      <div className="md:w-1/3 w-full space-y-5 card shrink-0 max-w-sm shadow-lg bg-gray-100 px-4 py-8 hover:shadow-xl transition duration-300">
        <h4 className="text-lg font-semibold">Process your payment</h4>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h5 className="font-medium">Credit/Debit Card</h5>
         
          {/* stripe form */}

          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe}
              className="btn btn-sm mt-5 btn-primary w-full  text-white"
            >
              Pay
            </button>
          </form>
          {cardError ? (
            <p className="text-red italic text-xs">{cardError}</p>
          ) : (
            ""
          )}
        </div>

        {/** paypal */}
        <div className="mt-5 text-center">
          <hr className="border-gray-300" />
          <button
            type="submit"
            className="btn btn-sm mt-5 bg-yellow-500 text-white flex items-center justify-center"
          >
            <FaPaypal className="mr-2" /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
