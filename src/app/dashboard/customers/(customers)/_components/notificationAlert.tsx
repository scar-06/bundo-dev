import { GreyCancelIcon, SmallNotificationIcon } from "@/assets";

import { Dialog } from "@/components/ui/dialog";

function NotificationAlert() {
  return (
    <div className="mx-auto flex w-full max-w-screen-xxlg flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <div className="mt-4 flex w-[93%] gap-3">
          <SmallNotificationIcon />
          <div className="flex w-full flex-col gap-4 ">
            <span className="text-sm font-medium">Welcome to Bundo!</span>
            <span className="text-[12px] ">
              Congratulations of successfully creating your Bundo account! Start
              discovering new vendors & buying!
            </span>
            <span className="text-[10px]">Nov 16, 2023 1 minute ago</span>
          </div>
        </div>
        <div>
          <GreyCancelIcon />
        </div>
      </div>
      <div className=" w-full border-[0.5px] border-[#C9C2B6] opacity-100 " />
    </div>
  );
}
export default NotificationAlert;
