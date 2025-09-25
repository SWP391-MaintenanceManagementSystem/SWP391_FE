type TagProps = {
  text: string;
  bg: string;
  textColor: string;
};

function format(text?: string) {
  if (!text) return "";
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export default function Tag({ text, bg, textColor }: TagProps) {
  return (
    <div
      style={{ backgroundColor: bg, color: textColor }}
      className="px-4 py-1 rounded-3xl font-inter font-semibold text-[14px]"
    >
      {format(text)}
    </div>
  );
}
