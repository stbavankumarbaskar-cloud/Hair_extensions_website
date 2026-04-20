"use client";
import React, { useState } from "react";
import Link from "next/link";

const initialItems = [
  {
    id: 1,
    name: "Premium Wavy Clip-In Hair Extensions 160",
    variant: "Black / 55 CM / Wavy",
    details: "Grams 7 Sets • Buy Now Pay Later",
    price: 685,
    qty: 1,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=120&h=120&fit=crop",
  }
];

export default function CheckoutPage() {
  const [items] = useState(initialItems);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [billingAddress, setBillingAddress] = useState("same");
  const [discountCode, setDiscountCode] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [expressCheckoutView, setExpressCheckoutView] = useState<'default' | 'shop'>('default');
  const [isGPayModalOpen, setIsGPayModalOpen] = useState(false);
  const [isPayPalModalOpen, setIsPayPalModalOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = discountApplied ? subtotal * 0.9 : subtotal;

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "ONELOVE10") {
      setDiscountApplied(true);
      setDiscountError("");
    } else {
      setDiscountApplied(false);
      setDiscountError("Enter a valid discount code or gift card");
    }
  };

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto min-h-screen">

        {/* LEFT COLUMN: Checkout Form */}
        <div className="w-full lg:w-[55%] p-6 lg:pr-12 lg:pl-6 lg:pt-10 flex flex-col">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <Link href="/" className="cursor-pointer flex flex-col items-center">
              <svg className="w-16 h-16 text-[#CAA45D] mb-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C8 1.5 3.5 4.5 3.5 9c0 4.5 8.5 9.5 8.5 9.5s8.5-5 8.5-9.5C20.5 4.5 16 1.5 12 4.5Z" opacity="0.9" />
                <path d="M12 18.5C12 18.5 11 14 9 10" stroke="white" strokeWidth="1.2" fill="none" />
                <path d="M12 18.5C12 18.5 13 14 15 10" stroke="white" strokeWidth="1.2" fill="none" />
                <path d="M12 18.5L12 9" stroke="white" strokeWidth="1.2" fill="none" />
              </svg>
              <span className="font-serif text-[11px] tracking-[0.2em] text-[#CAA45D]">ONE LOVE HAIR</span>
            </Link>
          </div>

          {isOrderComplete ? (
            <div className="flex flex-col items-center pt-6 px-4 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[28px] font-semibold text-gray-900 mb-2">Thank you!</h2>
              <p className="text-[15px] text-gray-500 mb-10">Your order has been confirmed.</p>

              <div className="border border-gray-200 rounded-lg p-8 w-full max-w-[550px] text-left mb-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#005bd3]"></div>
                <h3 className="font-bold text-gray-900 mb-5 pb-5 border-b border-gray-100 text-lg">Order #10243</h3>
                <p className="text-gray-600 text-[14px] mb-6 leading-relaxed">We've accepted your order, and we're getting it ready. Come back to this page for updates on your shipment status.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-[14px] text-gray-600">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1.5">Contact information</p>
                      <p>{email || "guest@example.com"}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1.5">Payment method</p>
                      <p className="capitalize">{paymentMethod.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1.5">Shipping address</p>
                      <p>One Love Hair GmbH<br />Uferweg 1<br />3400 Burgdorf<br />Switzerland</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1.5">Billing address</p>
                      <p>{billingAddress === 'same' ? 'Same as shipping address' : 'Alternative address provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/" className="bg-[#005bd3] hover:bg-[#004bb0] text-white px-10 py-[18px] rounded-md font-bold transition shadow-sm text-[15px]">
                Continue shopping
              </Link>
            </div>
          ) : expressCheckoutView === 'default' ? (
            <>
              {/* Express Checkout */}
              <div className="text-center text-[13px] text-gray-500 mb-3">Express checkout</div>
              <div className="flex gap-3 mb-6">
                <button onClick={() => setExpressCheckoutView('shop')} className="flex-1 bg-[#5a31f4] hover:bg-[#4d28d6] text-white py-3 rounded-md flex justify-center items-center transition shadow-sm">
                  <span className="font-bold text-xl tracking-tighter">shop</span>
                </button>
                <button onClick={() => setIsPayPalModalOpen(true)} className="flex-1 bg-[#ffc439] hover:bg-[#f4bb33] text-black py-3 rounded-md flex justify-center items-center transition shadow-sm">
                  <span className="font-bold italic text-blue-900 text-lg">PayPal</span>
                </button>
                <button onClick={() => setIsGPayModalOpen(true)} className="flex-1 bg-black hover:bg-gray-900 text-white py-3 rounded-md flex justify-center items-center transition shadow-sm">
                  <span className="font-bold text-lg">G<span className="text-gray-300 font-normal">Pay</span></span>
                </button>
              </div>

              <div className="flex items-center text-gray-500 mb-6 text-[13px]">
                <div className="flex-1 border-t border-gray-200"></div>
                <div className="px-3 uppercase">OR</div>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Contact */}
              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <h2 className="text-xl font-medium">Contact</h2>
                  <Link href="/signin" className="text-blue-600 hover:underline text-sm">Sign in</Link>
                </div>
                <div className="relative mb-3">
                  <input
                    type="text"
                    id="email"
                    className="block w-full border border-gray-300 rounded-md px-[14px] pb-[6px] pt-[22px] text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition peer bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-gray-500 duration-200 transform -translate-y-3 scale-75 top-[16px] z-10 origin-[0] left-[14px] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[16px] peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none"
                  >
                    Email or mobile phone number
                  </label>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-[18px] h-[18px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm text-gray-700">Email me with news and offers</span>
                </label>
              </div>

              {/* Delivery */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-4">Delivery</h2>
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <label className="absolute text-[11px] text-gray-500 left-[14px] top-[6px] pointer-events-none">Country/Region</label>
                    <select defaultValue="United States" className="w-full border border-gray-300 rounded-md pl-[14px] pr-10 pt-[22px] pb-[6px] text-[15px] appearance-none bg-transparent outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                      <option>Finland</option>
                      <option>France</option>
                      <option>Germany</option>
                      <option>Ireland</option>
                      <option>Italy</option>
                      <option>Latvia</option>
                      <option>Lithuania</option>
                      <option>Luxembourg</option>
                      <option>Monaco</option>
                      <option>Netherlands</option>
                      <option>Norway</option>
                      <option>Poland</option>
                      <option>Portugal</option>
                      <option>Slovakia</option>
                      <option>Slovenia</option>
                      <option>Spain</option>
                      <option>Sweden</option>
                      <option>Switzerland</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
                  </div>

                  <div className="flex gap-3">
                    <input type="text" placeholder="First name" className="flex-1 border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <input type="text" placeholder="Last name" className="flex-1 border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  <div className="relative">
                    <input type="text" placeholder="Address" className="w-full border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</div>
                  </div>

                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input type="text" placeholder="Postal code" className="flex-1 border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <input type="text" placeholder="City" className="flex-1 border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>

                  <div className="relative">
                    <input type="text" placeholder="Phone (optional)" className="w-full border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-xs">?</div>
                  </div>
                </div>
              </div>

              {/* Shipping method */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-4">Shipping method</h2>
                <div className="bg-gray-50 p-4 rounded-md text-[14px] text-gray-500 text-center border border-gray-100">
                  Enter your shipping address to view available shipping methods.
                </div>
              </div>

              {/* Payment */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-1">Payment</h2>
                <p className="text-[13px] text-gray-500 mb-4">All transactions are secure and encrypted.</p>

                <div className="border border-gray-300 rounded-md overflow-hidden bg-white">

                  {/* Credit Card */}
                  <label className={`flex flex-col cursor-pointer border-b border-gray-200 ${paymentMethod === 'credit_card' ? 'bg-[#f4f8fd]' : ''}`}>
                    <div className="p-[14px] flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'credit_card'}
                          onChange={() => setPaymentMethod('credit_card')}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                        />
                        <span className="text-[15px] font-medium">Credit card</span>
                      </div>
                      <div className="flex gap-1">
                        {["VISA", "MC", "AMEX", "UnionPay"].map(p => (
                          <span key={p} className="bg-white border border-gray-200 text-[10px] px-1 py-[2px] rounded text-gray-600 font-bold">{p}</span>
                        ))}
                      </div>
                    </div>
                    {paymentMethod === 'credit_card' && (
                      <div className="p-4 pt-0 flex flex-col gap-3">
                        <div className="relative">
                          <input type="text" placeholder="Card number" className="w-full border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</div>
                        </div>
                        <div className="flex gap-3">
                          <input type="text" placeholder="Expiration date (MM / YY)" className="flex-1 border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                          <div className="flex-1 relative">
                            <input type="text" placeholder="Security code" className="w-full border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-10" />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-xs">?</div>
                          </div>
                        </div>
                        <input type="text" placeholder="Name on card" className="w-full border border-gray-300 rounded-md p-[14px] text-[15px] outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                        <label className="flex items-center gap-2 mt-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-[18px] h-[18px] border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer" />
                          <span className="text-sm text-gray-700">Use shipping address as billing address</span>
                        </label>
                      </div>
                    )}
                  </label>

                  {/* PayPal */}
                  <label className={`flex justify-between items-center p-[14px] cursor-pointer border-b border-gray-200 hover:bg-gray-50 ${paymentMethod === 'paypal' ? 'bg-[#f4f8fd]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer" />
                      <span className="text-[15px] font-medium">PayPal</span>
                    </div>
                    <span className="text-[#003087] font-bold italic text-[15px]">PayPal</span>
                  </label>

                  {/* Pay by Invoice */}
                  <label className={`flex justify-between items-center p-[14px] cursor-pointer border-b border-gray-200 hover:bg-gray-50 ${paymentMethod === 'invoice' ? 'bg-[#f4f8fd]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'invoice'} onChange={() => setPaymentMethod('invoice')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer" />
                      <span className="text-[15px] font-medium">Pay by Invoice</span>
                    </div>
                    <span className="text-[20px]">🧾</span>
                  </label>

                  {/* Klarna */}
                  <label className={`flex justify-between items-center p-[14px] cursor-pointer border-b border-gray-200 hover:bg-gray-50 ${paymentMethod === 'klarna' ? 'bg-[#f4f8fd]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'klarna'} onChange={() => setPaymentMethod('klarna')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer" />
                      <span className="text-[15px] font-medium">Klarna - Flexible payments</span>
                    </div>
                    <span className="bg-[#ffb3c7] text-black text-[10px] px-1 py-[2px] rounded font-bold">Klarna.</span>
                  </label>

                  {/* TWINT */}
                  <label className={`flex justify-between items-center p-[14px] cursor-pointer border-b border-gray-200 hover:bg-gray-50 ${paymentMethod === 'twint' ? 'bg-[#f4f8fd]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'twint'} onChange={() => setPaymentMethod('twint')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer" />
                      <span className="text-[15px] font-medium">TWINT</span>
                    </div>
                    <span className="bg-black text-white text-[10px] px-1 py-[2px] rounded font-bold tracking-widest">TWINT</span>
                  </label>

                  {/* PostFinance */}
                  <label className={`flex justify-between items-center p-[14px] cursor-pointer border-b border-gray-200 hover:bg-gray-50 ${paymentMethod === 'postfinance' ? 'bg-[#f4f8fd]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'postfinance'} onChange={() => setPaymentMethod('postfinance')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer" />
                      <span className="text-[15px] font-medium">PostFinance</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="bg-[#ffcc00] text-black text-[10px] px-1 py-[2px] rounded font-bold">PF Pay</span>
                    </div>
                  </label>

                  {/* HeyLight */}
                  <label className={`flex justify-between items-center p-[14px] cursor-pointer hover:bg-gray-50 ${paymentMethod === 'heylight' ? 'bg-[#f4f8fd]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'heylight'} onChange={() => setPaymentMethod('heylight')} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer" />
                      <span className="text-[15px] font-medium">HEYLIGHT - Pay monthly (0% interest)</span>
                    </div>
                    <span className="text-[12px] font-bold text-gray-500">HeyLight</span>
                  </label>
                </div>
              </div>

              {/* Save my info */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-4">Save my information for a faster checkout</h2>
                <div className="border border-gray-300 rounded-md p-[14px] flex gap-3 items-center bg-white">
                  <span className="text-gray-400">📱</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-500">Mobile phone (optional)</span>
                    <span className="text-[15px]">+31</span>
                  </div>
                </div>
                <p className="text-[13px] text-gray-500 mt-4 leading-relaxed">
                  By providing your phone number, you agree to create a Shop account subject to Shop's <a href="https://www.shopify.com/in/legal/privacy/consumers" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Terms</a> and <button onClick={() => setIsPrivacyModalOpen(true)} className="text-blue-600 hover:underline">Privacy Policy</button>.
                </p>
              </div>

              {/* Billing address */}
              <div className="mt-8 mb-8">
                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">Billing address</h2>
                <div className="flex flex-col">
                  <label className={`border rounded-t-md p-4 flex items-center cursor-pointer ${billingAddress === 'same' ? 'border-[#005bd3] bg-[#f4f8fd] z-10' : 'border-gray-300 border-b-0'}`}>
                    <input type="radio" checked={billingAddress === 'same'} onChange={() => setBillingAddress('same')} className="w-4 h-4 text-[#005bd3] focus:ring-[#005bd3] cursor-pointer" />
                    <span className="ml-3 text-[14px]">Same as shipping address</span>
                  </label>

                  <div className={`border ${billingAddress === 'different' ? 'border-[#005bd3] bg-[#f4f8fd] rounded-b-md z-10' : 'border-gray-300 rounded-b-md'}`}>
                    <label className="p-4 flex items-center cursor-pointer">
                      <input type="radio" checked={billingAddress === 'different'} onChange={() => setBillingAddress('different')} className="w-4 h-4 text-[#005bd3] focus:ring-[#005bd3] cursor-pointer" />
                      <span className="ml-3 text-[14px]">Use a different billing address</span>
                    </label>

                    {billingAddress === 'different' && (
                      <div className="p-4 pt-0 bg-[#f4f8fd] rounded-b-md">
                        <div className="border border-gray-300 rounded-md bg-white shadow-sm overflow-hidden">
                          <select className="w-full p-[14px] text-[14px] bg-transparent outline-none border-b border-gray-200 text-gray-700">
                            <option>United States</option>
                            <option>Switzerland</option>
                          </select>
                          <div className="flex border-b border-gray-200">
                            <input type="text" placeholder="First name" className="w-1/2 p-[14px] text-[14px] outline-none border-r border-gray-200" />
                            <input type="text" placeholder="Last name" className="w-1/2 p-[14px] text-[14px] outline-none" />
                          </div>
                          <input type="text" placeholder="Address" className="w-full p-[14px] text-[14px] outline-none border-b border-gray-200" />
                          <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-[14px] text-[14px] outline-none border-b border-gray-200" />
                          <div className="flex border-b border-gray-200">
                            <input type="text" placeholder="City" className="w-1/3 p-[14px] text-[14px] outline-none border-r border-gray-200" />
                            <input type="text" placeholder="State" className="w-1/3 p-[14px] text-[14px] outline-none border-r border-gray-200" />
                            <input type="text" placeholder="ZIP code" className="w-1/3 p-[14px] text-[14px] outline-none" />
                          </div>
                          <input type="text" placeholder="Phone" className="w-full p-[14px] text-[14px] outline-none" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pay now */}
              <button onClick={() => setIsOrderComplete(true)} className="w-full bg-[#005bd3] hover:bg-[#004bb0] transition text-white py-[18px] rounded-md font-bold text-[17px] mb-8 shadow-sm">
                Pay now
              </button>

              {/* Footer links */}
              <div className="flex flex-wrap gap-4 text-[13px] text-blue-600 border-t border-gray-200 pt-6 pb-10">
                <button onClick={() => setIsRefundModalOpen(true)} className="hover:underline">Refund policy</button>
                <button onClick={() => setIsShippingModalOpen(true)} className="hover:underline">Shipping</button>
                <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:underline">Privacy policy</button>
                <button onClick={() => setIsTermsModalOpen(true)} className="hover:underline">Terms of service</button>
                <button onClick={() => setIsLegalModalOpen(true)} className="hover:underline">Legal notice</button>
                <button onClick={() => setIsContactModalOpen(true)} className="hover:underline">Contact</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center pt-10">
              <h2 className="text-[28px] font-semibold text-gray-900 mb-1">Sign in</h2>
              <p className="text-[15px] text-gray-500 mb-6">Or create an account</p>

              <div className="w-full max-w-[400px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-4 py-[14px] text-[15px] outline-none focus:border-[#5a31f4] focus:ring-1 focus:ring-[#5a31f4] transition mb-4 shadow-sm"
                  autoFocus
                />

                <button className="w-full bg-[#5a31f4] hover:bg-[#4d28d6] transition text-white py-[14px] rounded-md font-bold text-[15px] mb-4 shadow-sm">
                  Continue with shop
                </button>

                <button className="w-full bg-transparent hover:bg-gray-50 transition text-gray-900 py-[14px] rounded-md font-bold text-[14px] mb-6 flex items-center justify-center gap-2 border border-transparent">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                  Use a passkey
                </button>

                <p className="text-[11px] text-gray-500 text-center leading-relaxed mb-8 px-4">
                  By continuing, you agree to Shop's <button onClick={() => setIsTermsModalOpen(true)} className="underline hover:text-gray-700">terms</button>, <button onClick={() => setIsPrivacyModalOpen(true)} className="underline hover:text-gray-700">privacy policy</button>, and to sharing your name and email with One Love Hair GmbH. See their <button onClick={() => setIsTermsModalOpen(true)} className="underline hover:text-gray-700">terms</button> and <button onClick={() => setIsPrivacyModalOpen(true)} className="underline hover:text-gray-700">privacy policy</button>.
                </p>

                <div className="flex justify-center">
                  <button onClick={() => setExpressCheckoutView('default')} className="text-[#5a31f4] hover:underline text-[14px] font-medium">
                    Back
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-center gap-4 text-[13px] text-blue-600 border-t border-gray-200 mt-20 pt-6 pb-10">
                <button onClick={() => setIsRefundModalOpen(true)} className="hover:underline">Refund policy</button>
                <button onClick={() => setIsShippingModalOpen(true)} className="hover:underline">Shipping</button>
                <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:underline">Privacy policy</button>
                <button onClick={() => setIsTermsModalOpen(true)} className="hover:underline">Terms of service</button>
                <button onClick={() => setIsLegalModalOpen(true)} className="hover:underline">Legal notice</button>
                <button onClick={() => setIsContactModalOpen(true)} className="hover:underline">Contact</button>
              </div>
            </div>
          )}

        </div>


        {/* RIGHT COLUMN: Order Summary */}
        <div className="w-full lg:w-[45%] bg-[#fafafa] p-6 lg:pl-12 lg:pr-6 lg:pt-10 border-l border-gray-200 relative hidden md:block">

          <div className="sticky top-10 flex flex-col gap-6">

            {/* Items */}
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 bg-white">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[11px] w-5 h-5 flex items-center justify-center rounded-full font-medium">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center max-w-[200px]">
                      <span className="text-[14px] font-medium leading-snug">{item.name}</span>
                      <span className="text-[12px] text-gray-500 mt-[2px]">{item.details}</span>
                      <span className="text-[12px] text-gray-500">{item.variant}</span>
                    </div>
                  </div>
                  <span className="text-[14px] font-medium">{fmt(item.price * item.qty)}</span>
                </div>
              ))}

              {/* Discount Code */}
              <div className="flex flex-col mb-2">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value);
                      if (discountError) setDiscountError("");
                    }}
                    placeholder="Discount code or gift card"
                    className={`flex-1 border rounded-md p-3 text-[14px] outline-none transition ${discountError ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                  />
                  <button
                    onClick={handleApplyDiscount}
                    disabled={!discountCode.trim()}
                    className={`px-4 rounded-md font-medium text-[14px] transition ${discountCode.trim() ? 'bg-[#c8c8c8] text-gray-800 hover:bg-[#b0b0b0]' : 'bg-[#f0f0f0] text-gray-400 cursor-not-allowed'}`}
                  >
                    Apply
                  </button>
                </div>
                {discountError && (
                  <p className="text-[#dd1d1d] text-[13px] mt-2 font-medium">{discountError}</p>
                )}
                {discountApplied && (
                  <div className="flex items-center mt-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-medium flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                      ONELOVE10
                      <button onClick={() => { setDiscountApplied(false); setDiscountCode(""); }} className="text-gray-400 hover:text-gray-600 ml-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Subtotals */}
            <div className="flex flex-col gap-2 text-[14px]">
              <div className="flex justify-between text-[14px] text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">{fmt(subtotal)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[14px] text-blue-600">
                  <span>Discount (ONELOVE10)</span>
                  <span className="font-medium">-{fmt(subtotal * 0.1)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-1">Shipping <span className="text-gray-400 border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-[10px] cursor-help">?</span></span>
                <span className="text-[13px] text-gray-500">Enter shipping address</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
              <span className="text-[17px] font-medium">Total</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-500">USD</span>
                <span className="text-[22px] font-medium">{fmt(subtotal)}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Refund Policy Modal Overlay */}
      {isRefundModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[85vh] flex flex-col relative animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Refund policy</h2>
              <button onClick={() => setIsRefundModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 overflow-y-auto text-[14px] text-gray-800 space-y-4">
              <p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.</p>

              <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.</p>

              <p>To start a return, you can contact us at <a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a>. Please note that returns will need to be sent to the following address:</p>

              <p>
                One Love hair GmbH<br />
                Uferweg 1<br />
                3400 Burgdorf
              </p>

              <p>You can always contact us for any return question at <a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a>.</p>

              <p className="font-bold pt-2">Damages and issues:</p>
              <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>

              <p className="font-bold pt-2">Exchanges:</p>
              <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>

              <p className="font-bold pt-2">European Union 14 day cooling off period:</p>
              <p>Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.</p>

              <p className="font-bold pt-2">Hygiene-Sealed Human Hair Products</p>
              <p>Our products are made from 100% real human hair, which is a highly sensitive hygiene-related product. For health protection and hygiene reasons, all hair extensions and wigs are delivered in sealed packaging. If the hygiene seal is opened or removed after delivery, the product is no longer eligible for return in accordance with Article 16(e) of the EU Consumer Rights Directive.</p>

              <p className="font-bold pt-2">Sale & Discount Items:</p>
              <p>Products purchased during sales, promotions, or with discount codes are not eligible for cash refunds. These items are eligible for exchange or store credit<br />
                If such items are returned in accordance with our return policy, customers will receive store credit in the form of a voucher for the full purchase amount.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Customers will receive 100% store credit (full value of the product)</li>
                <li>No deductions, restocking fees, or additional charges will be applied</li>
                <li>The voucher will be valid for 12 months from the date of issue</li>
                <li>Store credit can be used for any product on our website</li>
              </ul>
              <p>In addition, we will provide an extra 10% bonus Store credit as a goodwill gesture.</p>
              <p>Store credit cannot be exchanged for cash.<br />
                The store credit will be valid for 12 months (1 year) from the date of issue.</p>

              <p className="font-bold pt-2">Refunds:</p>
              <p>We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 15 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.<br />
                If more than 15 business days have passed since we've approved your return, please contact us at <a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a>.</p>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Policy Modal Overlay */}
      {isShippingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[85vh] flex flex-col relative animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Shipping</h2>
              <button onClick={() => setIsShippingModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 overflow-y-auto text-[14px] text-gray-800 space-y-4">
              <p className="font-bold pt-2">ORDER PROCESSING & CUT-OFF TIME</p>
              <p>At One Love Hair GmbH, we ensure fast and reliable shipment of all premium hair products. Please review the processing and shipping terms below.</p>

              <p className="font-bold pt-2">Cut-Off Time:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Orders placed before 12 PM (EST) ship the same day.</li>
                <li>Orders placed after 12 PM (EST) ship the next business day.</li>
              </ul>

              <p className="font-bold pt-2">Processing Schedule:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Orders placed Monday–Friday before 12 PM EST → shipped the same day.</li>
                <li>Orders placed after 12 PM EST → shipped next business day.</li>
                <li>No processing, shipping, or deliveries on weekends or holidays.</li>
                <li>Overnight shipments dispatched on Friday will arrive Monday (not Saturday).</li>
                <li>During high-volume periods, processing may take slightly longer. We appreciate your patience.</li>
                <li>Once an order is submitted, no modifications are allowed — including changes to product selection, shipping method, delivery address, or cancellation.</li>
              </ul>

              <p className="font-bold pt-2">SIGNATURE ON DELIVERY</p>
              <p>Your shipment may require a signature upon delivery.<br />
                If you are unavailable, you may request carrier pickup at a nearby location.</p>

              <p className="font-bold pt-2">SHIPPING CARRIERS & DELAYS</p>
              <p>We ship using FedEx and DHL as our primary carriers.</p>
              <p>Please note:<br />
                If your package is delayed, please contact the carrier directly and open a case before contacting us.</p>
              <p>For further support, email <a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a>.</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal Overlay */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[85vh] flex flex-col relative animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Privacy policy</h2>
              <button onClick={() => setIsPrivacyModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 overflow-y-auto text-[14px] text-gray-800 space-y-4">
              <p className="text-gray-500">Last updated: March 27, 2026</p>

              <p>One Love Hair GmbH operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). One Love Hair GmbH is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.</p>

              <p>Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.</p>

              <h3 className="font-bold text-base pt-2">Personal Information We Collect or Process</h3>
              <p>When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contact details including your name, address, billing address, shipping address, phone number, and email address.</li>
                <li>Financial information including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.</li>
                <li>Account information including your username, password, security questions, preferences and settings.</li>
                <li>Transaction information including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
                <li>Communications with us including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
                <li>Device information including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
                <li>Usage information including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">Personal Information Sources</h3>
              <p>We may collect personal information from the following sources:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Directly from you including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;</li>
                <li>Automatically through the Services including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;</li>
                <li>From our service providers including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;</li>
                <li>From our partners or other third parties.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">How We Use Your Personal Information</h3>
              <p>Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Provide, Tailor, and Improve the Services.</strong> We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you, such as recommending products related to your purchases. This may include using your personal information to better tailor and improve the Services.</li>
                <li><strong>Marketing and Advertising.</strong> We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services.</li>
                <li><strong>Security and Fraud Prevention.</strong> We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password or other access details with anyone else.</li>
                <li><strong>Communicating with You.</strong> We use your personal information to provide you with customer support, to be responsive to you, to provide effective services to you and to maintain our business relationship with you.</li>
                <li><strong>Legal Reasons.</strong> We use your personal information to comply with applicable law or respond to valid legal process, including requests from law enforcement or government agencies, to investigate or participate in civil discovery, potential or actual litigation, or other adversarial legal proceedings, and to enforce or investigate potential violations of our terms or policies.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">How We Disclose Personal Information</h3>
              <p>In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
                <li>With business and marketing partners to provide marketing services and advertise to you. For example, we use Shopify to support personalized advertising with third-party services based on your online activity with different merchants and websites. Our business and marketing partners will use your information in accordance with their own privacy notices. Depending on where you reside, you may have a right to direct us not to share information about you to show you targeted advertisements and marketing based on your online activity with different merchants and websites. You can exercise your rights to opt-out of those uses here.</li>
                <li>When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations.</li>
                <li>With our affiliates or otherwise within our corporate group.</li>
                <li>In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service or policies, and to protect or defend the Services, our rights, and the rights of our users or others.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">Relationship with Shopify</h3>
              <p>The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in countries other than where you reside, in order to provide and improve the Services for you. In addition, to help protect, grow, and improve our business, we use certain Shopify enhanced features that incorporate data and information obtained from your interactions with our Store, along with other merchants and with Shopify. To provide these enhanced features, Shopify may make use of personal information collected about your interactions with our store, along with other merchants, and with Shopify. In these circumstances, Shopify is responsible for the processing of your personal information, including for responding to your requests to exercise your rights over use of your personal information for these purposes. To learn more about how Shopify uses your personal information and any rights you may have, you can visit the Shopify Consumer Privacy Policy. Depending on where you live, you may exercise certain rights with respect to your personal information here Shopify Privacy Portal Link.</p>

              <h3 className="font-bold text-base pt-2">Third Party Websites and Links</h3>
              <p>The Services may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.</p>

              <h3 className="font-bold text-base pt-2">Children's Data</h3>
              <p>The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority in your jurisdiction. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted. As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we "share" or "sell" (as those terms are defined in applicable law) personal information of individuals under 16 years of age.</p>

              <h3 className="font-bold text-base pt-2">Security and Retention of Your Information</h3>
              <p>Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.</p>
              <p>How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.</p>

              <h3 className="font-bold text-base pt-2">Your Rights and Choices</h3>
              <p>Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Right to Access / Know.</strong> You may have a right to request access to personal information that we hold about you.</li>
                <li><strong>Right to Delete.</strong> You may have a right to request that we delete personal information we maintain about you.</li>
                <li><strong>Right to Correct.</strong> You may have a right to request that we correct inaccurate personal information we maintain about you.</li>
                <li><strong>Right of Portability.</strong> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.</li>
                <li><strong>Right to Opt out of Sale or Sharing for Targeted Advertising.</strong> Depending on where you reside, you may have a right to opt out of the "sale" or "share" of your personal information or to opt out of the processing of your personal information for purposes considered to be "targeted advertising", as defined in applicable privacy laws. You can exercise your rights to opt-out of those uses here. Please note that if you visit our website with the Global Privacy Control opt-out preference signal enabled, depending on where you are, we will automatically treat this as a request to opt-out for the device and browser that you use to visit the website. If we are able to associate the device sending the signal to a Shopify account, we will apply the opt out request to the account as well. To learn more about Global Privacy Control, you can visit https://globalprivacycontrol.org/. Other than the Global Privacy Control, we do not recognize other "Do Not Track" signals that may be sent from your web browser or device.</li>
                <li><strong>Managing Communication Preferences.</strong> We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.</li>
              </ul>

              <p>If you reside in the UK or European Economic Area, and subject to exceptions and limitations provided by local law, you may exercise the following rights in addition to the rights outlined above:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Objection to Processing and Restriction of Processing:</strong> You may have the right to ask us to stop or restrict our processing of personal information for certain purposes.</li>
                <li><strong>Withdrawal of Consent:</strong> Where we rely on consent to process your personal information, you have the right to withdraw this consent. If you withdraw your consent, this will not affect the lawfulness of any processing based on your consent before its withdrawal.</li>
              </ul>

              <p>You may exercise any of these rights where indicated on the Services or by contacting us using the contact details provided below. To learn more about how Shopify uses your personal information and any rights you may have, including rights related to data processed by Shopify, you can visit https://privacy.shopify.com/en.</p>
              <p>We will not discriminate against you for exercising any of these rights. We may need to verify your identity before we can process your requests, as permitted or required under applicable law. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law.</p>

              <h3 className="font-bold text-base pt-2">Complaints</h3>
              <p>If you have complaints about how we process your personal information, please contact us using the contact details provided below. Depending on where you live, you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority. For the EEA, you can find a list of the responsible data protection supervisory authorities here.</p>

              <h3 className="font-bold text-base pt-2">International Transfers</h3>
              <p>Please note that we may transfer, store and process your personal information outside the country you live in.</p>
              <p>If we transfer your personal information out of the European Economic Area or the United Kingdom, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.</p>

              <h3 className="font-bold text-base pt-2">Changes to This Privacy Policy</h3>
              <p>We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on this website, update the "Last updated" date and provide notice as required by applicable law.</p>

              <h3 className="font-bold text-base pt-2">Contact</h3>
              <p>Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at <a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a> or contact us at Uferweg 1, Burgdorf, 3400, CH. For the purpose of applicable data protection laws, we are the data controller of your personal information.</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal Overlay */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[85vh] flex flex-col relative animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Terms of service</h2>
              <button onClick={() => setIsTermsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 overflow-y-auto text-[14px] text-gray-800 space-y-4">
              <h3 className="font-bold text-base">OVERVIEW</h3>
              <p>Welcome to One Love Hair GmbH! The terms "we", "us" and "our" refer to One Love Hair GmbH. One Love Hair GmbH operates this store and website, including all related information, content, features, tools, products and services in order to provide you, the customer, with a curated shopping experience (the "Services"). One Love Hair GmbH is powered by Shopify, which enables us to provide the Services to you.</p>
              <p>The below terms and conditions, together with any policies referenced herein (these "Terms of Service" or "Terms") describe your rights and responsibilities when you use the Services.</p>
              <p>Please read these Terms of Service carefully, as they include important information about your legal rights and cover areas such as warranty disclaimers and limitations of liability.</p>
              <p>By visiting, interacting with or using our Services, you agree to be bound by these Terms of Service and our Privacy Policy [LINK]. If you do not agree to these Terms of Service or Privacy Policy, you should not use or access our Services.</p>

              <h3 className="font-bold text-base pt-2">SECTION 1 - ACCESS AND ACCOUNT</h3>
              <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, and you have given us your consent to allow any of your minor dependents to use the Services on devices you own, purchase or manage.</p>
              <p>To use the Services, including accessing or browsing our online stores or purchasing any of the products or services we offer, you may be asked to provide certain information, such as your email address, billing, payment, and shipping information. You represent and warrant that all the information you provide in our stores is correct, current and complete and that you have all rights necessary to provide this information.</p>
              <p>You are solely responsible for maintaining the security of your account credentials and for all of your account activity. You may not transfer, sell, assign, or license your account to any other person.</p>

              <h3 className="font-bold text-base pt-2">SECTION 2 - OUR PRODUCTS</h3>
              <p>We have made every effort to provide an accurate representation of our products and services in our online stores. However, please note that colors or product appearance may differ from how they may appear on your screen due to the type of device you use to access the store and your device settings and configuration.</p>
              <p>We do not warrant that the appearance or quality of any products or services purchased by you will meet your expectations or be the same as depicted or rendered in our online stores.</p>
              <p>All descriptions of products are subject to change at any time without notice at our sole discretion. We reserve the right to discontinue any product at any time and may limit the quantities of any products that we offer to any person, geographic region or jurisdiction, on a case-by-case basis.</p>

              <h3 className="font-bold text-base pt-2">SECTION 3 - ORDERS</h3>
              <p>When you place an order, you are making an offer to purchase. One Love Hair GmbH reserves the right to accept or decline your order for any reason at its discretion. Your order is not accepted until One Love Hair GmbH confirms acceptance. We must receive and process your payment before your order is accepted. Please review your order carefully before submitting, as One Love Hair GmbH may be unable to accommodate cancellation requests after an order is accepted. In the event that we do not accept, make a change to, or cancel an order, we will attempt to notify you by contacting the e-mail, billing address, and/or phone number provided at the time the order was made.</p>
              <p>Your purchases are subject to return or exchange solely in accordance with our Refund Policy [LINK].</p>
              <p>You represent and warrant that your purchases are for your own personal or household use and not for commercial resale or export.</p>

              <h3 className="font-bold text-base pt-2">SECTION 4 - PRICES AND BILLING</h3>
              <p>Prices, discounts and promotions are subject to change without notice. The price charged for a product or service will be the price in effect at the time the order is placed and will be set out in your order confirmation email. Unless otherwise expressly stated, posted prices do not include taxes, shipping, handling, customs or import charges.</p>
              <p>Prices posted in our online stores may be different from prices offered in physical stores or in online or other stores operated by third parties. We may offer, from time to time, promotions on the Services that may affect pricing and that are governed by terms and conditions separate from these Terms. If there is a conflict between the terms for a promotion and these Terms, the promotion terms will govern.</p>
              <p>You agree to provide current, complete and accurate purchase, payment and account information for all purchases made at our stores. You agree to promptly update your account and other information, including your email address, credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</p>
              <p>You represent and warrant that (i) the credit card information you provide is true, correct, and complete, (ii) you are duly authorized to use such credit card for the purchase, (iii) charges incurred by you will be honored by your credit card company, and (iv) you will pay charges incurred by you at the posted prices, including shipping and handling charges and all applicable taxes, if any.</p>

              <h3 className="font-bold text-base pt-2">SECTION 5 - SHIPPING AND DELIVERY</h3>
              <p>We are not liable for shipping and delivery delays. All delivery times are estimates only and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs processing, or events outside our control. Once we transfer products to the carrier, title and risk of loss passes to you.</p>

              <h3 className="font-bold text-base pt-2">SECTION 6 - INTELLECTUAL PROPERTY</h3>
              <p>Our Services, including but not limited to all trademarks, brands, text, displays, images, graphics, product reviews, video, and audio, and the design, selection, and arrangement thereof, are owned by One Love Hair GmbH, its affiliates or licensors and are protected by U.S. and foreign patent, copyright and other intellectual property laws.</p>
              <p>These Terms permit you to use the Services for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on the Services without our prior written consent. Except as expressly provided herein, nothing in these Terms grants or shall be construed as granting a license or other rights to you under any patent, trademark, copyright, or other intellectual property of One Love Hair GmbH, Shopify or any third party. Unauthorized use of the Services may be a violation of federal and state intellectual property laws. All rights not expressly granted herein are reserved by One Love Hair GmbH.</p>
              <p>One Love Hair GmbH's names, logos, product and service names, designs, and slogans are trademarks of One Love Hair GmbH or its affiliates or licensors. You must not use such trademarks without the prior written permission of One Love Hair GmbH. Shopify's name, logo, product and service names, designs and slogans are trademarks of Shopify. All other names, logos, product and service names, designs, and slogans on the Services are the trademarks of their respective owners.</p>

              <h3 className="font-bold text-base pt-2">SECTION 7 - OPTIONAL TOOLS</h3>
              <p>You may be provided with access to customer tools offered by third parties as part of the Services, which we neither monitor nor have any control nor input.</p>
              <p>You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.</p>
              <p>Any use by you of the optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</p>
              <p>We may also, in the future, offer new features through the Services (including the release of new tools and resources). Such new features shall also be deemed part of the Services and are subject to these Terms of Service.</p>

              <h3 className="font-bold text-base pt-2">SECTION 8 - THIRD-PARTY LINKS</h3>
              <p>The Services may contain materials and hyperlinks to websites provided or operated by third parties (including any embedded third party functionality). We are not responsible for examining or evaluating the content or accuracy of any third-party materials or websites you choose to access. If you decide to leave the Services to access these materials or third party sites, you do so at your own risk.</p>
              <p>We are not liable for any harm or damages related to your access of any third-party websites, or your purchase or use of any products, services, resources, or content on any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products and services should be directed to the third-party.</p>

              <h3 className="font-bold text-base pt-2">SECTION 9 - RELATIONSHIP WITH SHOPIFY</h3>
              <p>One Love Hair GmbH is powered by Shopify, which enables us to provide the Services to you. However, any sales and purchases you make in our Store are made directly with One Love Hair GmbH. By using the Services, you acknowledge and agree that Shopify is not responsible for any aspect of any sales between you and One Love Hair GmbH, including any injury, damage, or loss resulting from purchased products and services. You hereby expressly release Shopify and its affiliates from all claims, damages, and liabilities arising from or related to your purchases and transactions with One Love Hair GmbH.</p>

              <h3 className="font-bold text-base pt-2">SECTION 10 - PRIVACY POLICY</h3>
              <p>All personal information we collect through the Services is subject to our Privacy Policy, which can be viewed here [LINK], and certain personal information may be subject to Shopify's Privacy Policy, which can be viewed here. By using the Services, you acknowledge that you have read these privacy policies.</p>
              <p>Because the Services are hosted by Shopify, Shopify collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in other countries than where you reside, in order to provide services to you. Review our privacy policy [LINK] for more details on how we, Shopify, and our partners use your personal information.</p>

              <h3 className="font-bold text-base pt-2">SECTION 11 - FEEDBACK</h3>
              <p>If you submit, upload, post, email, or otherwise transmit any ideas, suggestions, feedback, reviews, proposals, plans, or other content (collectively, "Feedback"), you grant us a perpetual, worldwide, sublicensable, royalty-free license to use, reproduce, modify, publish, distribute and display such Feedback in any medium for any purpose, including for commercial use. We may, for example, use our rights under this license to operate, provide, evaluate, enhance, improve and promote the Services and to perform our obligations and exercise our rights under the Terms of Service.</p>
              <p>You also represent and warrant that: (i) you own or have all necessary rights to all Feedback; (ii) you have disclosed any compensation or incentives received in connection with your submission of Feedback; and (iii) your Feedback will comply with these Terms. We are and shall be under no obligation (1) to maintain your Feedback in confidence; (2) to pay compensation for your Feedback; or (3) to respond to your Feedback.</p>
              <p>We may, but have no obligation to, monitor, edit or remove Feedback that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.</p>
              <p>You agree that your Feedback will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your Feedback will not contain libelous or otherwise unlawful, abusive or obscene Feedback, or contain any computer virus or other malware that could in any way affect the operation of the Services or any related website. You may not use a false email address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any Feedback. You are solely responsible for any Feedback you make and its accuracy. We take no responsibility and assume no liability for any Feedback posted by you or any third-party.</p>

              <h3 className="font-bold text-base pt-2">SECTION 12 - ERRORS, INACCURACIES AND OMISSIONS</h3>
              <p>Occasionally there may be information on or in the Services that contain typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information is inaccurate at any time without prior notice (including after you have submitted your order).</p>

              <h3 className="font-bold text-base pt-2">SECTION 13 - PROHIBITED USES</h3>
              <p>You may access and use the Services for lawful purposes only. You may not access or use the Services, directly or indirectly: (a) for any unlawful or malicious purpose; (b) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (c) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (d) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or harm any of our employees or any other person; (e) to transmit false or misleading information; (f) to send, knowingly receive, upload, download, use, or re-use any material that does not comply with the these Terms; (g) to transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation; (h) to impersonate or attempt to impersonate any other person or entity; or (i) to engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services, or which, as determined by us, may harm One Love Hair GmbH, Shopify or users of the Services, or expose them to liability.</p>
              <p>In addition, you agree not to: (a) upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Services; (b) reproduce, duplicate, copy, sell, resell or exploit any portion of the Services; (c) collect or track the personal information of others; (d) spam, phish, pharm, pretext, spider, crawl, or scrape; or (e) interfere with or circumvent the security features of the Services or any related website, other websites, or the Internet. We reserve the right to suspend, disable, or terminate your account at any time, without notice, if we determine that you have violated any part of these Terms.</p>

              <h3 className="font-bold text-base pt-2">SECTION 14 - TERMINATION</h3>
              <p>We may terminate this agreement or your access to the Services (or any part thereof) in our sole discretion at any time without notice, and you will remain liable for all amounts due up to and including the date of termination.</p>
              <p>The following sections will continue to apply following any termination: Intellectual Property, Feedback, Termination, Disclaimer of Warranties, Limitation of Liability, Indemnification, Severability, Waiver; Entire Agreement, Assignment, Governing Law, Privacy Policy, and any other provisions that by their nature should survive termination.</p>

              <h3 className="font-bold text-base pt-2">SECTION 15 - DISCLAIMER OF WARRANTIES</h3>
              <p>The information presented on or through the Services is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other visitor to the Services, or by anyone who may be informed of any of its contents.</p>
              <p className="uppercase text-xs">EXCEPT AS EXPRESSLY STATED BY One Love Hair GmbH, THE SERVICES AND ALL PRODUCTS OFFERED THROUGH THE SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE' FOR YOUR USE, WITHOUT ANY REPRESENTATION, WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, MERCHANTABLE QUALITY, FITNESS FOR A PARTICULAR PURPOSE, DURABILITY, TITLE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE, REPRESENT OR WARRANT THAT YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE. SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES SO THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU.</p>

              <h3 className="font-bold text-base pt-2">SECTION 16 - LIMITATION OF LIABILITY</h3>
              <p className="uppercase text-xs">TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO CASE SHALL One Love Hair GmbH, OUR PARTNERS, DIRECTORS, OFFICERS, EMPLOYEES, AFFILIATES, AGENTS, CONTRACTORS, SERVICE PROVIDERS OR LICENSORS, OR THOSE OF SHOPIFY AND ITS AFFILIATES, BE LIABLE FOR ANY INJURY, LOSS, CLAIM, OR ANY DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING, WITHOUT LIMITATION, LOST PROFITS, LOST REVENUE, LOST SAVINGS, LOSS OF DATA, REPLACEMENT COSTS, OR ANY SIMILAR DAMAGES, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, ARISING FROM YOUR USE OF ANY OF THE SERVICES OR ANY PRODUCTS PROCURED USING THE SERVICES, OR FOR ANY OTHER CLAIM RELATED IN ANY WAY TO YOUR USE OF THE SERVICES OR ANY PRODUCT, INCLUDING, BUT NOT LIMITED TO, ANY ERRORS OR OMISSIONS IN ANY CONTENT, OR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SERVICES OR ANY CONTENT (OR PRODUCT) POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES, EVEN IF ADVISED OF THEIR POSSIBILITY.</p>

              <h3 className="font-bold text-base pt-2">SECTION 17 - INDEMNIFICATION</h3>
              <p>You agree to indemnify, defend and hold harmless One Love Hair GmbH, Shopify, and our affiliates, partners, officers, directors, employees, agents, contractors, licensors, and service providers from any losses, damages, liabilities or claims, including reasonable attorneys' fees, payable to any third party due to or arising out of (1) your breach of these Terms of Service or the documents they incorporate by reference, (2) your violation of any law or the rights of a third party, or (3) your access to and use of the Services.</p>
              <p>We will notify you of any indemnifiable claim, provided that a failure to promptly notify will not relieve you of your obligations unless you are materially prejudiced. We may control the defense and settlement of such claim at your expense, including choice of counsel, but will not settle any claim requiring non-monetary obligations from you without your consent (not to be unreasonably withheld). You will cooperate in the defense of indemnified claims, including by providing relevant documents.</p>

              <h3 className="font-bold text-base pt-2">SECTION 18 - SEVERABILITY</h3>
              <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</p>

              <h3 className="font-bold text-base pt-2">SECTION 19 - WAIVER; ENTIRE AGREEMENT</h3>
              <p>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</p>
              <p>These Terms of Service and any policies or operating rules posted by us on this site or in respect to the Service constitutes the entire agreement and understanding between you and us and governs your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</p>
              <p>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</p>

              <h3 className="font-bold text-base pt-2">SECTION 20 - ASSIGNMENT</h3>
              <p>You may not delegate, transfer or assign this Agreement or any of your rights or obligations under these Terms without our prior written consent, and any such attempt will be null and void. We may transfer, assign, or delegate these Terms and our rights and obligations without consent or notice to you.</p>

              <h3 className="font-bold text-base pt-2">SECTION 21 - GOVERNING LAW</h3>
              <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the federal and state or territorial courts in the jurisdiction where One Love Hair GmbH is headquartered. You and One Love Hair GmbH consent to venue and personal jurisdiction in such courts.</p>

              <h3 className="font-bold text-base pt-2">SECTION 22 - HEADINGS</h3>
              <p>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>

              <h3 className="font-bold text-base pt-2">SECTION 23 - CHANGES TO TERMS OF SERVICE</h3>
              <p>You can review the most current version of the Terms of Service at any time on this page.</p>
              <p>We reserve the right, in our sole discretion, to update, change, or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. We will notify you of any material changes to these Terms in accordance with applicable law, and such changes will be effective on the date specified in the notice. Your continued use of or access to the Services following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>

              <h3 className="font-bold text-base pt-2">SECTION 24 - CONTACT INFORMATION</h3>
              <p>Questions about the Terms of Service should be sent to us at <a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a>.</p>
              <p>Our contact information is posted below:<br />
                One Love Hair GmbH<br />
                info@onelovehair.ch<br />
                Uferweg 1 3400 Burgdorf Switzerland<br />
                +41 76 539 5386<br />
                UID- CHE:225.580.483</p>
            </div>
          </div>
        </div>
      )}

      {/* Legal Notice Modal Overlay */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[85vh] flex flex-col relative animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Legal notice</h2>
              <button onClick={() => setIsLegalModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 overflow-y-auto text-[14px] text-gray-800 space-y-4">
              <h3 className="font-bold text-base">1. Company Information</h3>
              <p>
                One Love Hair GmbH<br />
                Uferweg 1<br />
                3400 Burgdorf<br />
                Switzerland<br />
                Email: <a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a><br />
                Phone: +41 76 539 53 86
              </p>

              <h3 className="font-bold text-base pt-2">2. Use of Website</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must be at least 18 years old to purchase our products.</li>
                <li>You agree not to misuse the website or copy any content.</li>
                <li>We reserve the right to refuse service or cancel orders that appear suspicious or fraudulent.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">3. Products</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>We sell 100% cuticle-aligned premium Indian Remy hair extensions.</li>
                <li>Product photos and descriptions are for guidance only.</li>
                <li>Since hair is a natural product, color, curl pattern, and texture may vary slightly.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">4. Prices and Payment</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Prices are displayed in CHF/EUR/USD depending on your region.</li>
                <li>Prices may change at any time without prior notice.</li>
                <li>Payment must be completed before order processing.</li>
                <li>We accept credit/debit cards and online payment methods available on our website.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">5. Shipping</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Orders are processed Monday to Friday.</li>
                <li>Delivery time depends on the destination.</li>
                <li>Customers are responsible for providing accurate shipping information.</li>
                <li>Once an order is shipped, we cannot change or redirect the package.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">6. Returns and Refunds</h3>
              <p>Returns are accepted only if:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The product is unused, unopened, and in its original packaging.</li>
                <li>The return request is made within 14 days of delivery.</li>
                <li>The customer pays all return shipping costs.</li>
              </ul>
              <p>Full details are available in our Refund Policy.</p>

              <h3 className="font-bold text-base pt-2">7. Cancellation</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Orders cannot be cancelled after they are processed or shipped.</li>
                <li>Pre-orders cannot be cancelled once payment is made.</li>
              </ul>

              <h3 className="font-bold text-base pt-2">8. Liability</h3>
              <p>One Love Hair GmbH is not responsible for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Delays caused by couriers or customs</li>
                <li>Incorrect installation of hair</li>
                <li>Allergic reactions to hair products</li>
                <li>Lost or delayed packages due to incorrect addresses provided by the customer</li>
              </ul>

              <h3 className="font-bold text-base pt-2">9. Intellectual Property</h3>
              <p>All website content including product descriptions, text, images, and logos is the property of One Love Hair GmbH.<br />
                No content may be copied or reused without written permission.</p>

              <h3 className="font-bold text-base pt-2">10. Privacy</h3>
              <p>We collect and process customer information according to Swiss data protection laws.<br />
                Please refer to our Privacy Policy for full details.</p>

              <h3 className="font-bold text-base pt-2">11. Governing Law</h3>
              <p>These Terms & Conditions are governed by the laws of Switzerland.<br />
                Any disputes will be resolved in Swiss courts.</p>

              <h3 className="font-bold text-base pt-2">12. Contact</h3>
              <p>For questions or support, please contact:<br />
                <a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a></p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal Overlay */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[85vh] flex flex-col relative animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="flex justify-between items-center p-6 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Contact</h2>
              <button onClick={() => setIsContactModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 overflow-y-auto text-[14px] text-gray-800 space-y-4">
              <h3 className="font-bold text-base">One Love Hair GmbH</h3>
              <p>Address: Uferweg 1, 3400 Burgdorf</p>
              <p>Phone: +41765395386</p>
              <p><a href="mailto:info@onelovehair.ch" className="text-blue-600 hover:underline">info@onelovehair.ch</a></p>
            </div>
          </div>
        </div>
      )}

      {/* GPay Modal Overlay */}
      {isGPayModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[450px] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
            {/* Fake browser header */}
            <div className="bg-[#f1f3f4] flex justify-between items-center px-4 py-2 border-b border-gray-200">
              <span className="text-gray-700 text-sm flex items-center gap-2">
                <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                pay.google.com
              </span>
              <button onClick={() => setIsGPayModalOpen(false)} className="text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setIsGPayModalOpen(false)} className="text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h2 className="text-[18px] font-medium text-gray-900">Add credit or debit card</h2>
              </div>

              <div className="space-y-5">
                <div className="flex gap-2 items-center">
                  <div className="border border-gray-300 rounded p-[14px] flex-1 flex items-center hover:border-gray-400 focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] transition">
                    <svg className="w-6 h-6 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                    <input type="text" placeholder="Card number" className="w-full outline-none text-[15px]" />
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>

                <div className="flex gap-3">
                  <div className="border border-gray-300 rounded p-[14px] flex-1 hover:border-gray-400 focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] transition">
                    <input type="text" placeholder="MM/YY" className="w-full outline-none text-[15px]" />
                  </div>
                  <div className="flex gap-2 flex-1 items-center">
                    <div className="border border-gray-300 rounded p-[14px] flex-1 hover:border-gray-400 focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] transition">
                      <input type="text" placeholder="CVV" className="w-full outline-none text-[15px]" />
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>

                <div className="border border-gray-300 rounded p-[14px] relative mt-2 hover:border-gray-400 focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] transition">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500">Cardholder name</label>
                  <input type="text" className="w-full outline-none text-[15px] text-gray-900" />
                </div>

                <div className="border border-gray-300 rounded p-[14px] relative mt-2 hover:border-gray-400 focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] transition cursor-pointer">
                  <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-gray-500">Country/region</label>
                  <select className="w-full outline-none text-[15px] bg-transparent appearance-none cursor-pointer">
                    <option>India</option>
                    <option>United States</option>
                    <option>Switzerland</option>
                  </select>
                  <div className="absolute right-3 top-[18px] pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                <div className="border border-gray-300 rounded p-[14px] hover:border-gray-400 focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] transition">
                  <input type="text" placeholder="Street address" className="w-full outline-none text-[15px]" />
                </div>

                <div className="border border-gray-300 rounded p-[14px] hover:border-gray-400 focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] transition">
                  <input type="text" placeholder="Apt, suite, etc. (optional)" className="w-full outline-none text-[15px]" />
                </div>

              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button onClick={() => setIsGPayModalOpen(false)} className="text-[#1a73e8] font-medium px-4 py-2 hover:bg-[#f1f3f4] rounded transition text-[14px]">Cancel</button>
                <button onClick={() => setIsGPayModalOpen(false)} className="bg-[#1a73e8] text-white font-medium px-6 py-2 rounded hover:bg-[#1557b0] transition shadow-sm text-[14px]">Save</button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PayPal Modal Overlay */}
      {isPayPalModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-[460px] h-[750px] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
            {/* Fake browser header */}
            <div className="bg-[#e6e8eb] flex flex-col border-b border-gray-300">
              <div className="flex justify-between items-center px-4 py-2">
                <span className="text-gray-800 text-[12px] flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-900" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" /></svg>
                  Log in to your PayPal account - Google Chrome
                </span>
                <div className="flex gap-4">
                  <button className="text-gray-600 hover:text-black hover:bg-gray-300 px-2 py-1 transition">—</button>
                  <button className="text-gray-600 hover:text-black hover:bg-gray-300 px-2 py-1 transition">□</button>
                  <button onClick={() => setIsPayPalModalOpen(false)} className="text-gray-600 hover:text-white hover:bg-red-500 px-2 py-1 transition">✕</button>
                </div>
              </div>
              <div className="bg-white mx-2 mb-2 p-1.5 rounded flex items-center text-[12px] text-gray-700 shadow-sm border border-gray-200">
                <svg className="w-3 h-3 text-gray-500 mr-2 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                paypal.com/checkoutnow?token=55L95656D5254050G...
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto flex flex-col bg-white">
              <div className="pt-10 pb-6 px-10 flex flex-col items-center flex-1">
                <span className="font-bold italic text-[#003087] text-[28px] mb-8 tracking-tight">PayPal</span>

                <h2 className="text-[17px] text-gray-800 mb-8 font-medium">Let's check out with One Love Hair GmbH</h2>

                <div className="w-full space-y-4">
                  <div className="border border-blue-600 rounded p-3 relative shadow-[0_0_0_1px_#2563eb]">
                    <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-blue-600 font-medium">Email or mobile number</label>
                    <input type="text" className="w-full outline-none text-[15px]" autoFocus />
                  </div>

                  <div className="text-left">
                    <button className="text-[#005bd3] font-bold text-[14px] hover:underline">Forgot email?</button>
                  </div>

                  <button className="w-full bg-[#005bd3] hover:bg-[#004bb0] text-white font-bold py-3.5 rounded-[50px] transition mt-6 text-[15px]">
                    Next
                  </button>

                  <button className="w-full bg-white border border-black hover:bg-gray-50 text-black font-bold py-3.5 rounded-[50px] transition flex items-center justify-center gap-2 text-[15px]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                    Log in with Passkey
                  </button>

                  <div className="flex items-center text-gray-400 my-6">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <div className="px-4 text-[13px]">or</div>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>

                  <button className="w-full bg-white border border-black hover:bg-gray-50 text-black font-bold py-3.5 rounded-[50px] transition text-[15px]">
                    Pay with Debit or Credit Card
                  </button>
                </div>
              </div>

              <div className="bg-white flex flex-col items-center py-6 px-10 text-center text-[13px] border-t border-gray-100">
                <button onClick={() => setIsPayPalModalOpen(false)} className="text-[#005bd3] font-bold mb-3 hover:underline">Cancel and return to One Love Hair GmbH</button>
                <div className="flex gap-2 text-gray-500 mb-8">
                  <span className="font-bold text-gray-800">English</span> <span className="text-gray-300">|</span>
                  <button className="hover:underline">Français</button> <span className="text-gray-300">|</span>
                  <button className="hover:underline">Español</button> <span className="text-gray-300">|</span>
                  <button className="hover:underline">中文</button>
                </div>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-gray-500 font-medium w-full max-w-[300px]">
                  <button className="hover:underline">Contact Us</button>
                  <button className="hover:underline">Privacy</button>
                  <button className="hover:underline">Legal</button>
                  <button className="hover:underline">Policy Updates</button>
                  <button className="hover:underline">Worldwide</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
