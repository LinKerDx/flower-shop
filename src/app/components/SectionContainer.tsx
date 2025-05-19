export default function SectionContainer({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col items-center justify-center w-full h-full py-16">
            {children}
        </section>
    );
}