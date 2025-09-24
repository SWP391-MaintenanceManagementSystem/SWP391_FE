import footer from "@/assets/footer.jpg";
import FooterContent from "./FooterContent";

 
 export default function Footer() {
   return (
     <div style={{backgroundImage: `url(${footer})`}} className=" px-12 w-full h-[522px] bg-center bg-cover flex justify-center items-center ">
        <FooterContent />
     </div>
   )
 }
 