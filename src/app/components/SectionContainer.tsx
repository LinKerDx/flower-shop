export default function SectionContainer({ children, ref, id }: { children: React.ReactNode, ref?: React.Ref<HTMLElement> | undefined, id?: string | undefined }) {
    return (
        <section ref={ref} id={id} className="flex flex-col items-center justify-center w-full h-full pt-16">
            {children}
        </section>
    );
}