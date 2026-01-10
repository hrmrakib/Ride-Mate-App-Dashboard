"use client";

export default function AboutUs() {
  return (
    <div className='w-full p-6 md:p-12'>
      <h2 className='text-2xl md:text-3xl text-[#333] font-bold mb-6'>
        About Us
      </h2>

      <div className='space-y-6 max-w-3xl text-foreground/80'>
        <section>
          <h3 className='text-lg font-semibold mb-3'>Our Mission</h3>
          <p>
            Our mission is to provide exceptional products and services that
            empower our customers to achieve their goals. We are committed to
            innovation, quality, and customer satisfaction in everything we do.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>Who We Are</h3>
          <p>
            Founded in 2020, we are a dedicated team of professionals passionate
            about delivering excellence. Our diverse team brings together
            expertise from various fields to create innovative solutions for our
            customers.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>Our Values</h3>
          <ul className='list-disc list-inside space-y-2'>
            <li>
              <strong>Integrity:</strong> We conduct our business with honesty
              and transparency
            </li>
            <li>
              <strong>Innovation:</strong> We continually seek new ways to
              improve and evolve
            </li>
            <li>
              <strong>Customer Focus:</strong> Your satisfaction is our top
              priority
            </li>
            <li>
              <strong>Excellence:</strong> We strive for the highest quality in
              all aspects of our work
            </li>
            <li>
              <strong>Collaboration:</strong> We believe in the power of
              teamwork and partnership
            </li>
          </ul>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>Our Team</h3>
          <p>
            Our team consists of experienced professionals who are dedicated to
            helping you succeed. Whether you have questions, need support, or
            want to collaborate, we are here to help.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>Get In Touch</h3>
          <p>
            Have questions or want to learn more about what we do? We&apos;d
            love to hear from you! Feel free to reach out through our contact
            form or email us directly.
          </p>
        </section>
      </div>
    </div>
  );
}
