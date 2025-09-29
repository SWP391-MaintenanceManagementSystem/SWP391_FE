import footer from "@/assets/footer.jpg";
import FooterContent from "./FooterContent";

export default function Footer() {
  return (
    <div
      style={{ backgroundImage: `url(${footer})` }}
      className="px-4 sm:px-8 md:px-12 w-full min-h-[522px] bg-center bg-cover flex justify-center items-center"
    >
      <FooterContent />
    </div>
  );
}
