
export const InfoSection = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="flex flex-col gap-2 relative">
        <h3 className="text-2xl font-semibold font-inter">{title}</h3>
        {children}
    </div>
);