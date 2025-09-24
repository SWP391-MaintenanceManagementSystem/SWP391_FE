import logoLight from "/logo-light.svg";

export default function FooterContent() {
  return (
    <section className=" bg-white/10 backdrop-blur-md w-full h-[422px] flex flex-col justify-between p-12">
      <div className="flex w-full justify-between">
        <div>
          <img src={logoLight} alt="Charged logo light" />
        </div>
        <div className="flex justify-center gap-28 ">
          <div className="flex flex-col gap-4 text-white/50">
            <span className="mb-2 text-white ">Company</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>About Us</span>
            <span>Contact</span>
            <span>Pricing</span>
          </div>

          <div className="flex flex-col gap-4 text-white/50">
            <span className="mb-2 text-white ">Resource</span>
            <span>Blog</span>
            <span>Customer Stories</span>
            <span>Information</span>
            <span>Legal</span>
            <span>Payments</span>
          </div>

          <div className="flex flex-col gap-4 text-white/50">
            <span className="mb-2 text-white ">Career</span>
            <span>Jobs</span>
            <span>Hiring</span>
            <span>News</span>
            <span>Tips & Tricks</span>
          </div>

          <div className="flex flex-col gap-4 text-white/50">
            <span className="mb-2 text-white ">Help</span>
            <span>FAQs</span>
            <span>Help Center</span>
            <span>Support</span>
          </div>
        </div>
      </div>
      <hr className="border-white/10"/>
      <div className="flex justify-between text-white ">
        <span>© 2025</span>
        <div className="space-x-5">
          <span>Term of Service</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </section>
  );
}
