/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import checkmate from "../../../public/images/checkmate.jpg";

interface CheckmateModalProps {
  level: String;
}

const CheckmateModal = ({ isOpen }: { isOpen?: boolean }) => {
    const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-foreground text-background">
        <DialogHeader>
        </DialogHeader>
        <h3 className="text-3xl text-center">Checkmate!!!</h3>
        <div className="py-4">
          <Image src={checkmate} alt="" priority/>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckmateModal;
