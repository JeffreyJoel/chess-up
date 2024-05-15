"use client"
import { isValidMove } from "@/utils/Moves";
import { BOARD_CONTENT, BoardContent } from "chess-fen";
import Fen from "chess-fen/dist/Fen";
import { isValidElement, useEffect, useState } from "react";
import BlackBishop from "@/assets/pieces-basic-svg/bishop-b.svg";
import WhiteBishop from "@/assets/pieces-basic-svg/bishop-w.svg";
import BlackKing from "@/assets/pieces-basic-svg/king-b.svg";
import WhiteKing from "@/assets/pieces-basic-svg/king-w.svg";
import BlackKnight from "@/assets/pieces-basic-svg/knight-b.svg";
import WhiteKnight from "@/assets/pieces-basic-svg/knight-w.svg";
import BlackPawn from "@/assets/pieces-basic-svg/pawn-b.svg";
import WhitePawn from "@/assets/pieces-basic-svg/pawn-w.svg";
import BlackQueen from "@/assets/pieces-basic-svg/queen-b.svg";
import WhiteQueen from "@/assets/pieces-basic-svg/queen-w.svg";
import BlackRook from "@/assets/pieces-basic-svg/rook-b.svg";
import WhiteRook from "@/assets/pieces-basic-svg/rook-w.svg";
import Image from "next/image";

export default function Square({ piece, index, draggedElement, setDElement, board, setPieces, boardActions }: { piece: string, index: number, setDElement: (e: [EventTarget, BoardContent, HTMLDivElement] | undefined) => void, draggedElement: [EventTarget, BoardContent, HTMLDivElement] | undefined | [HTMLDivElement, string, HTMLDivElement], board: Fen, setPieces: (e: Fen) => void, boardActions: any }) {
    const [color, setColor] = useState("");
    const [cursor, setCursor] = useState("cursor-grab");
    const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const row = Math.floor((63 - index) / 8) + 1;
    const idNum = index % 8;

    const pieces: any = {
        k: piece === piece.toUpperCase() ? WhiteKing : BlackKing,
        q: piece === piece.toUpperCase() ? WhiteQueen : BlackQueen,
        b: piece === piece.toUpperCase() ? WhiteBishop : BlackBishop,
        n: piece === piece.toUpperCase() ? WhiteKnight : BlackKnight,
        r: piece === piece.toUpperCase() ? WhiteRook : BlackRook,
        p: piece === piece.toUpperCase() ? WhitePawn : BlackPawn
    }

    useEffect(() => {
        if (row % 2 === 0) {
            setColor(index % 2 === 0 ? "bg-[#EAEDD0]" : "bg-[#739552]");
        } else {
            setColor(index % 2 === 0 ? "bg-[#739552]" : "bg-[#EAEDD0]");
        }
    }, [index, row]);


    const setUp = (e: any) => {
        let de = e;
        setDElement([de.target, piece as BoardContent, e.target.parentNode.parentNode]);
    }

    function handleOnDrag(e: any) {
        setUp(e);
        setCursor("cursor-grabbing");
    };
    function handleOnDrop(e: any) {
        e.preventDefault();

        if (draggedElement) {
            boardActions.handleMoves(draggedElement[2].id.split("-")[0], `${rows[idNum]}${row}`);
        }
    }
    function handleOnDragOver(e: any) {
        e.preventDefault();
    }

    return <div id={`${rows[idNum]}${row}-${index}`} onDragOver={handleOnDragOver} onDrop={handleOnDrop} className={` w-[80px] h-[80px] backdrop-blur-2xl z-[-9] ${color} relative`}><div draggable id={`${index}`} onDragStart={handleOnDrag} onDrop={handleOnDrop} className={`${cursor} square -z-10`}>{piece.toLowerCase() !== " " ? <Image src={pieces[piece.toLowerCase()]} alt="piece" width={70} height={70} /> : ""}</div></div>
}