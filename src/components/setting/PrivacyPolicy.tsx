"use client";

export default function PrivacyPolicy() {
  return (
    <div className='w-full p-6 md:p-12'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>
        Privacy and Policy
      </h2>

      <div className='space-y-6 max-w-3xl text-foreground/80'>
        <section>
          <h3 className='text-lg font-semibold mb-3'>Privacy Policy</h3>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, disclose, and otherwise handle your information.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, make a purchase, or contact us for support. This
            may include your name, email address, postal address, phone number,
            and payment information.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>
            How We Use Your Information
          </h3>
          <p>We use the information we collect to:</p>
          <ul className='list-disc list-inside space-y-2 mt-2'>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Respond to your comments and questions</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures
            designed to protect personal information against unauthorized
            access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>Your Rights</h3>
          <p>
            You have the right to access, modify, or delete your personal
            information. You may also opt-out of receiving promotional
            communications at any time.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the date at the top.
          </p>
        </section>
      </div>
    </div>
  );
}
