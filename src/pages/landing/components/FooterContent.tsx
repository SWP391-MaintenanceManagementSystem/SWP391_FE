import logoLight from "/logo-light.svg";

export default function FooterContent() {
  return (
    <section className="bg-white/10 backdrop-blur-md w-full h-auto flex flex-col justify-between p-6 sm:p-8 md:p-12 rounded-xl">
      {/* Top */}
      <div className="flex flex-col md:flex-row w-full justify-between gap-8 md:gap-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logoLight} alt="Charged logo light" className="h-8 sm:h-10" />
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:flex md:justify-center gap-8 sm:gap-16 md:gap-28 text-sm sm:text-base">
          <div className="flex flex-col gap-3 text-white/50">
            <span className="mb-2 font-semibold text-white">Company</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>About Us</span>
            <span>Contact</span>
          </div>

          <div className="flex flex-col gap-3 text-white/50">
            <span className="mb-2 font-semibold text-white">Resource</span>
            <span>Blog</span>
            <span>Customer Stories</span>
            <span>Information</span>
            <span>Legal</span>
          </div>

          <div className="flex flex-col gap-3 text-white/50">
            <span className="mb-2 font-semibold text-white">Career</span>
            <span>Jobs</span>
            <span>Hiring</span>
            <span>News</span>
          </div>

          <div className="flex flex-col gap-3 text-white/50">
            <span className="mb-2 font-semibold text-white">Help</span>
            <span>FAQs</span>
            <span>Help Center</span>
            <span>Support</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-white/10" />

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white">
        <span>© 2025</span>
        <div className="space-x-4">
          <span>Term of Service</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </section>
  );
}
