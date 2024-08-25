import { Drawer } from "vaul";
import React, { useContext, useRef, useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AppContext } from "../context/Context";

const Vaul: React.FC<{ children: any }> = (props) => {
  const context = useContext(AppContext);

  // -- Code by ChatGPT that handles clicking outside the drawer --
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".ant-select-dropdown")
      ) {
        context?.toggleOpen(false);
      }
    };

    if (context?.open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [context?.open, context]);

  useEffect(() => {
    context?.toggleOpen(context?.open || false);
    // eslint-disable-next-line
  }, [context?.open]);
  // -------------------------- Ends here --------------------------
  return (
    <Drawer.Root
      open={context?.open}
      onRelease={() => context?.toggleOpen(false)}
    >
      <Drawer.Trigger asChild>
        <Button
          onClick={() => {
            console.log("clicked");
            context?.toggleOpen(true);
          }}
          type="text"
          icon={<PlusOutlined />}
        />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          ref={drawerRef}
          className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[80%] mt-24 fixed bottom-0 left-0 right-0"
        >
          <div className="mx-auto mt-3 w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
          <Drawer.Handle />
          {props.children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default Vaul;
