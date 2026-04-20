import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      {/* Simple Header */}
      <header className="py-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/checkout" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
            <span>←</span> Back to Checkout
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Shopify Consumer Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last Updated: March 2, 2026</p>

        <div className="prose max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Preamble</h2>
            <p className="mb-4">
              1.1 Welcome to Shopify! Shopify helps make it easier for you to shop and manage your purchases and to find products you love. These Terms apply when you access, use or interact with Shopify and our consumer services (collectively, "Shopify Consumer Services"). Shopify Consumer Services include Shopify's shopping mobile and web application ("Shop"), Shopify's accelerated checkout option ("Shop Pay"), Shopify's features and services on Merchants' storefronts or third party sites, integrations between Shopify and your third-party email and shopping providers and other products, features, contents, websites, tools, and services that we provide to you.
            </p>
            <p className="mb-4">
              1.2. These Terms form an agreement between the applicable Shopify entity defined below ("Shopify," "Shop," "we," "our," or "us") and you ("you" or "your") and represent the terms and conditions of your access to and use of the Shopify Consumer Services. The Shopify entity you contract with, and that provides the Shopify Consumer Services to you, together with its affiliates, depends on where you live:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>If you live in the United States or Canada, you are contracting with Shopify Inc., a Canadian corporation, with offices located at 151 O'Connor Street, Ground floor, Ottawa, Ontario, K2P 2L8 and, where the Shopify Consumer Services include payment activities that are regulated under the Canadian Retail Payment Activities Act, Shopify Payment Activities Inc., a Canadian corporation, with offices located at 151 O'Connor Street, Ground floor, Ottawa, Ontario, K2P 2L8.</li>
              <li>If you live in the Asia Pacific region (including Australia, New Zealand, China, Japan, Singapore), you are contracting with Shopify Commerce Singapore Pte. Ltd, a corporation formed under the laws of Singapore, with offices located at 77 Robinson Road, #13-00 Robinson 77, Singapore 068896.</li>
              <li>If you live in the EMEA region or other jurisdictions not listed above, including Europe and Russia, the Middle East, Africa, South America, Caribbean, or Mexico, you are contracting with Shopify International Limited, a private company limited by shares, incorporated in Ireland under registration number 560279, with its registered offices located at 2nd Floor Victoria Buildings, 1-2 Haddington Road, Dublin 4, D04 XN32, Ireland, VAT number IE 3347697KH and its website is at https://www.shopify.com/.</li>
            </ul>
            <p className="mb-4">1.3. By accessing or using any of the Shopify Consumer Services, you agree to be bound by these Terms.</p>
            <p className="mb-4">1.4. Our Consumer Privacy Policy describes how we collect and use your Personal Data to provide the Shopify Consumer Services and is part of these Terms and your agreement with Shopify.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. The Services We Provide To You</h2>
            <p className="mb-4">2.1. We provide the Shopify Consumer Services to further our mission of making shopping better for everyone, including by helping you:</p>
            <p className="mb-4">2.1.1. <strong>Connect with Merchants:</strong> Shopify helps you discover, browse, and shop at merchants that use Shopify's services ("Merchants"). Using Shopify Consumer Services, you can browse products and make purchases easily from Merchants around the globe, from their storefront or from Shop. You can also see and share product ratings with other Shopify users to help you make informed decisions when you shop.</p>
            <p className="mb-4">2.1.2. <strong>Experience a simpler, faster and more streamlined shopping experience:</strong> Shopify makes it easier and faster for you to shop with Merchants in various ways, such as by providing Shop Pay, providing personalized product recommendations based on your purchase and browsing history, and syncing your shopping activity between Shop and Merchant stores.</p>
            <p className="mb-4">2.1.3. <strong>Manage your purchases in one place:</strong> Shopify provides updates about the status of your purchases from Merchants and makes it possible for you to find and manage details about all of your purchases in one place in Shop, such as tracking the location, status, and delivery of items you have purchased, and letting you know when you have received a refund from a Merchant. If you choose to allow Shopify access to third-party email providers and third-party shopping partners you use, Shopify will also provide order updates of items you have purchased, including from non-Merchants.</p>
            <p className="mb-4">2.1.4. <strong>Find products we think you will love:</strong> Shopify customizes your online shopping experience on Shop and on Merchant stores and provides tailored product recommendations to you based on your use of Shopify Consumer Services, including by helping you discover new products, brands, and Merchants.</p>
            <p className="mb-4">2.1.5. <strong>Continuously improve your shopping experience wherever you shop:</strong> Shopify is continuously working to build and improve your shopping experience online and offline and to develop and add new and improved features for you based on how you use our services.</p>
            <p className="mb-4">2.1.6. <strong>Participate in promotions or earn rewards:</strong> Shopify may provide opportunities for you to participate in promotional offers or to earn rewards through our Shop Rewards Program. If you participate in our Shop Rewards Program, the Shop Rewards Terms will apply.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Your Commitments and Use of Shopify Consumer Services</h2>
            <p className="mb-4">3.1. To be eligible to use Shopify Consumer Services, you must be at least eighteen years old or the age of majority in your country of residence. If you are using Shopify Consumer Services, you must be permitted to agree to these Terms under the laws of the country you live in, including having sufficient legal capacity. If you are a parent or guardian who allows your child under 18 to use Shopify Consumer Services on your account, you provide all consents necessary for your child's use of Shopify Consumer Services and agree to be legally responsible for all activity of your child on your account.</p>
            <p className="mb-4">3.2. You agree to provide truthful and accurate information about yourself when registering for and using Shopify Consumer Services, including your name and contact information, and you agree to keep this information updated and current.</p>
            <p className="mb-4">3.3. You agree not to share your Shopify password with others, give access to your Shopify account to others, or transfer your account to anyone else without our permission. If you think someone knows your account login details or has accessed your account without your permission, you should reset your password. You are solely responsible for the unauthorized use of your credentials. In the event of unauthorized access to your account, you must promptly notify Shopify.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Use of Shop Pay</h2>
            <p className="mb-4">4.1. When you choose to use Shop Pay, you are required to provide account and contact information and to link your Shop Pay account to a valid payment method. You warrant and represent that you are the legal owner of all payment accounts you provide and link to Shop Pay, and that all information you provide when signing up for Shop Pay is truthful, current and accurate.</p>
            <p className="mb-4">4.2. Shopify reserves the right to prohibit or restrict your ability to make transactions using Shop Pay at any time for any reason, without notice to you, or to request additional information from you before you can use or continue to use Shop Pay.</p>
            <p className="mb-4">4.3. Installment payments on Shop Pay are supported and managed by Third Party partner Affirm, and if you choose to pay in installments or to purchase and pay later when using Shop Pay, you are contracting with Affirm and eligibility determinations and repayment of your purchase obligation are governed by Affirm's terms of service, which are presented to you during checkout. Shopify is not a party to any agreement between you and Affirm, and expressly disclaims all liability with respect to such agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. License, Prohibitions and Restrictions</h2>
            <p className="mb-4">5.1. Shopify grants you a limited, non-exclusive, non-sublicensable, non-transferable, and revocable license to access and use the Shopify Consumer Services consistent with these Terms. You may not use the Shopify Consumer Services for any other purpose than as authorized. Shopify reserves all rights not expressly granted.</p>
            <p className="mb-4">5.2. In connection with using or accessing Shopify Consumer Services or interacting with Shopify, you agree to comply with these Terms, in addition to any other applicable Shopify terms and policies that may apply to your use of specific Shopify Consumer Services, and to comply with all applicable laws, regulations and rules that apply to your use of Shopify Consumer Services.</p>
            <p className="mb-4">5.3. In addition, you agree not to do (or help others to do) any of the following in connection with your use of Shopify Consumer Services or when shopping with a Merchant:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>5.3.1. You will not purchase or attempt to purchase products and services that are unlawful for you to purchase in your country of residence using Shopify Consumer Services or that breach or circumvent any applicable laws or regulations, including products that require you to be an age that you have not reached.</li>
              <li>5.3.2. You will not infringe or violate someone else's rights under Shopify's terms and policies or applicable laws and regulations, including their intellectual property rights, induce someone to infringe or violate Shopify's terms, or interfere with any person's or third party's use or enjoyment of the Shopify Consumer Services or Shopify's platform.</li>
              <li>5.3.3. You will not submit false, inaccurate, deceptive, or misleading information to Shopify or in connection with your use of the Shopify Consumer Services.</li>
              <li>5.3.4. You will not upload or transmit viruses or malicious code or take any action that would interfere with, disable, overburden, or impair the proper working, security, integrity, operation, appearance, or enjoyment of the Shopify Consumer Services, including by Merchants or other users.</li>
              <li>5.3.5. You will not compromise, interfere with, or circumvent any of the security or authorization access features that are part of the Shopify Consumer Services.</li>
              <li>5.3.6. You will not modify, translate, reverse engineer, disassemble, reconstruct, decompile, copy, or create derivative works of the Shopify Consumer Services.</li>
              <li>5.3.7. You will not use any robot, spider, scraper, data gathering and extraction tools, automatic devices or processes, AI tools (including but not limited to agentic AI) or automated or manual means to access, interact with, copy, or extract the Shopify Consumer Services for any purpose, except with Shopify's prior express permission.</li>
              <li>5.3.8. You will not bypass any robot exclusion headers or other measures we employ to monitor or restrict access to the Shopify Consumer Services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. User Generated Content</h2>
            <p className="mb-4">6.1. You are solely responsible for any content you submit, post, or display on or through the Shopify Consumer Services, including, but not limited to, any Product Reviews (as defined in these Terms), photos, comments, or your name/username (collectively, "UGC"). All UGC must comply with these Terms, applicable policies, laws and regulations. This includes, but is not limited to, laws concerning endorsements and advertising, which require transparent disclosure of any material connection between you and any commercial entity mentioned in your UGC.</p>
            <p className="mb-4">6.2. We encourage you to post feedback, comments and reviews about products you have purchased, which is an important part of the Shopify experience (collectively, "Product Reviews"). You agree that your reviews will be truthful, accurate and based on your actual experience with the product, will comply with our Product Review Policies and will comply with all applicable laws, regulations, and regulatory guidance. As a reminder, our Product Review Policies prohibit you from submitting reviews in exchange for money, discounts, free products or refunds. You agree that you will have no right to any payment or revenue participation from Shopify in connection with any such Product Reviews that you post when using the Shopify Consumer Services.</p>
            <p className="mb-4">6.3. We can take action, including through the use of automated tools, against UGC that violates these Terms, our policies, or where we are permitted or required by law, such as by removing, restricting, or limiting access to, or distribution of, the UGC. While Shopify reserves the right to remove UGC at any time and for any reason, we do not generally verify UGC for accuracy or endorse any opinions expressed therein and we are not responsible or liable to any third party for the content or accuracy of any UGC posted by you or any other user.</p>
            <p className="mb-4">6.4 You grant Shopify a worldwide, nonexclusive, royalty-free, perpetual, irrevocable, transferable, and fully sublicensable right to host, expose, run, use, store, reproduce, modify, adapt, publish, publicly perform and communicate (including by telecommunication), broadcast, make available, translate, copy, create derivative works from, distribute, and display your UGC, and related content, in any media, without limitation. You represent, warrant, and agree that you have all necessary rights to the UGC you submit, post or display to grant this license. You waive, in favor of Shopify, any moral rights you may have in all UGC. This means, for example, your UGC may appear publicly on Shop and may be shared with the Merchant whose product or service you are reviewing, where applicable. Use of your UGC by a Merchant outside of Shop is subject to that Merchant's own terms and policies, not these Terms. Shopify respects the valid intellectual property rights of others and any violative UGC can be removed at our discretion. If you believe that any UGC on Shop infringes your intellectual property rights, you can report it here. You can also learn more about our intellectual property policies here.</p>
          </section>
          
          <section>
            <p className="text-sm italic text-gray-500 mt-8">(Content truncated for brevity. Please refer to the official Shopify website for the complete and legally binding Terms of Service.)</p>
          </section>

        </div>
      </main>
    </div>
  );
}
