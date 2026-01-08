"use client";

export default function TermsAndService() {
  return (
    <div className='w-full p-6 md:p-12'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>Terms and Service</h2>

      <div className='space-y-6 max-w-3xl text-foreground/80'>
        <section>
          <h3 className='text-lg font-semibold mb-3'>1. Acceptance of Terms</h3>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement. If you do not
            agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>2. Use License</h3>
          <p>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on our website for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may
            not:
          </p>
          <ul className='list-disc list-inside space-y-2 mt-2'>
            <li>Modify or copy the materials</li>
            <li>
              Use the materials for any commercial purpose or for any public
              display
            </li>
            <li>
              Attempt to decompile or reverse engineer any software contained on
              the website
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
          </ul>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>3. Disclaimer</h3>
          <p>
            The materials on our website are provided on an &apos;as is&apos;
            basis. We make no warranties, expressed or implied, and hereby
            disclaim and negate all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h3 className='text-lg font-semibold mb-3'>4. Limitations</h3>
          <p>
            In no event shall our company or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on our website.
          </p>
        </section>
      </div>
    </div>
  );
}
