import Link from "next/link";
import { usePathname } from "next/navigation";

function BottomNav({
  NavigationTab,
}: {
  NavigationTab: { icon: React.JSX.Element; title: string; path: string }[];
}) {
  const currentPath = usePathname();

  const isLinkActive = (href: string) => currentPath === href;
  return (
    <div className=" h-fit w-full  border-t-2 bg-[#fff] py-1 lg:hidden xlg:hidden ">
      <div className="flex w-full justify-between px-10">
        {NavigationTab?.map(
          (prop: { icon: React.JSX.Element; title: string; path: string }) => (
            <Link
              key={Math.random() * Math.PI}
              className={`${
                isLinkActive(prop.path) ? " font-bold text-[#34A853]" : "none"
              }`}
              href={prop.path}
            >
              <div className="flex flex-col items-center justify-center gap-1 bg-[#fff] pt-2">
                <span className=" h-5">{prop.icon}</span>
                <span className="text-[12px]">{prop.title}</span>
                {isLinkActive(prop.path) && (
                  <div className=" w-full rounded-sm bg-black p-[3px]" />
                )}
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

export default BottomNav;
